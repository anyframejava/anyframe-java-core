/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.scheduling.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.anyframe.exception.InvalidPropertyException;
import org.anyframe.scheduling.JobInfo;
import org.anyframe.scheduling.TriggerInfo;
import org.anyframe.scheduling.exception.SchedulingException;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * This class parses a spring bean configuration files related to Quartz. When
 * application is shutting down, reflects the changes.
 * 
 * @author Sujeong Lee
 */
public class JobFileManager {
	// context-scheduling.xml file parsing, CRUD

	private String schedulingFile = this.getClass().getResource("/").getPath()
			+ "spring/" + "context-scheduling.xml";
	private Document document;
	// jobList transfered from service implemantation class
	private List<JobInfo> jobList;
	// parsing Trigger List
	private List<TriggerInfo> triggerInfoList;
	private JobDBManager jobDBManager;

	/**
	 * @param jobList
	 * @param jobContextDao
	 */
	public JobFileManager(List<JobInfo> jobList, JobDBManager jobDBManager) {
		this.jobList = jobList;
		this.jobDBManager = jobDBManager;
	}

	/**
	 * Compared with the job in memory, changed job are saved in context file.
	 * 
	 * @return an array of job info with insert to Database.
	 * @throws SchedulingException
	 */
	@SuppressWarnings("unchecked")
	public List<JobInfo> reflectChanges() {
		try {
			// refrect to XML Builder, remained Job List(reflect to DB) return
			// 1. parse - context-scheduling.xml
			parseFile();
			// 2. get - trigger bean list
			getTriggerBeanList();
			// 3. compare - trigger bean : job list
			// return remaining job list after reflect to xml
			// 3-1. Y - replace xml
			// 3-2. N - break;
			Map<String, List<?>> xmlJobMap = compareJobListWithXml();
			// 4. check the usage of DB
			// 4-1. N - insert other jobs in xml
			// 4.2. N - remove jobs in xml
			if (jobDBManager == null) {
				                          
			}

			// 5. save file
			exportContextDocument();

			return (List<JobInfo>) xmlJobMap.get("insert");
		} catch (Exception ex) {
			throw new SchedulingException("Fail to change job in context file", ex);
		}
	}

	private void parseFile() throws ParserConfigurationException, SAXException,
			IOException {
		File f = new File(schedulingFile);
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		document = builder.parse(f);
	}

	private void getTriggerBeanList() throws ClassNotFoundException {
		// get list of bean class is instance of trigger
		triggerInfoList = new ArrayList<TriggerInfo>();
		NodeList list = document.getElementsByTagName("bean");

		for (int i = 0; i < list.getLength(); i++) {
			Node node = list.item(i);
			NamedNodeMap attr = node.getAttributes();
			if (attr.getNamedItem("id") != null) {
				String beanId = attr.getNamedItem("id").getNodeValue();
				Class<?> beanClass = Class.forName(attr.getNamedItem("class")
						.getNodeValue());

				TriggerInfo trigger = new TriggerInfo();
				trigger.setId(beanId);
				trigger.setTriggerClass(beanClass);
				if (beanClass.equals(Class
						.forName(SimpleTriggerFactoryBean.class.getName()))) {
					trigger.setType("simple");
					getTriggerSchedule(trigger, node);
				} else if (beanClass.equals(Class
						.forName(CronTriggerFactoryBean.class.getName()))) {
					trigger.setType("cron");
					getTriggerSchedule(trigger, node);
				} else {
					trigger = null;
				}

				if (trigger != null) {
					// get jobDetail in child
					NodeList childNodeList = node.getChildNodes();
					for (int n = 0; n < childNodeList.getLength(); n++) {
						Node childNode = childNodeList.item(n);
						NamedNodeMap childAttr = childNode.getAttributes();
						if (childNode.getNodeName()
								.equalsIgnoreCase("property")) {
							String jobDetail = childAttr.getNamedItem("name")
									.getNodeValue();
							if (jobDetail.equalsIgnoreCase("jobDetail")) {
								trigger.setJobDetail(childAttr.getNamedItem(
										"ref").getNodeValue());
							}
						}
					}

					triggerInfoList.add(trigger);
				}
			}
		}
	}

	private void getTriggerSchedule(TriggerInfo trigger, Node node) {
		NodeList childNodeList = node.getChildNodes();
		for (int j = 0; j < childNodeList.getLength(); j++) {
			Node child = childNodeList.item(j);
			if (child.getNodeName().equals("property")) {
				NamedNodeMap propertyAttr = child.getAttributes();
				String name = propertyAttr.getNamedItem("name").getNodeValue();
				if (trigger.getType().equals("simple")
						&& name.equals("repeatInterval")
						|| trigger.getType().equals("cron")
						&& name.equals("cronExpression")) {
					trigger.setSchedule(propertyAttr.getNamedItem("value")
							.getNodeValue());
				}
			}
		}
	}

	private Map<String, List<?>> compareJobListWithXml() {
		// check the joblist is in trigger list
		// return the job which is in trigger list(removeList)
		// return the job which is not in trigger list(insertList)

		Map<String, List<?>> resultMap = new HashMap<String, List<?>>();

		List<TriggerInfo> removeList = new ArrayList<TriggerInfo>();
		List<JobInfo> insertList = new ArrayList<JobInfo>();

		removeList.addAll(triggerInfoList);
		Iterator<JobInfo> jobItr = jobList.iterator();
		while (jobItr.hasNext()) {
			boolean isInXml = false;
			JobInfo jobInfo = jobItr.next();
			String triggerName = jobInfo.getTriggerName();

			Iterator<TriggerInfo> triggerInfoItr = triggerInfoList.iterator();
			while (triggerInfoItr.hasNext()) {
				TriggerInfo triggerInfo = triggerInfoItr.next();
				if (triggerInfo.getId().equals(triggerName)) {
					isInXml = true;
					replaceTriggerInfo(triggerName, jobInfo);
					removeList.remove(triggerInfo);
					break;
				}
			}
			if (!isInXml) {
				insertList.add(jobInfo);
			}
		}
		resultMap.put("insert", insertList);
		resultMap.put("remove", removeList);

		return resultMap;
	}

	private void replaceTriggerInfo(String triggerName, JobInfo jobInfo) {
		NodeList list = document.getElementsByTagName("bean");

		for (int i = 0; i < list.getLength(); i++) {
			Node node = list.item(i);
			NamedNodeMap attr = node.getAttributes();
			if (attr.getNamedItem("id") != null) {
				NodeList childNodeList = node.getChildNodes();

				String beanId = attr.getNamedItem("id").getNodeValue();
				if (!beanId.equals("") && beanId.equalsIgnoreCase(triggerName)) {
					if (jobInfo.getFlagScheduleType().equals("simple")) {
						// if update result is simple trigger
						((Element) node).setAttribute("class",
								SimpleTriggerFactoryBean.class
										.getCanonicalName());

						for (int n = 0; n < childNodeList.getLength(); n++) {
							Node childNode = childNodeList.item(n);
							NamedNodeMap childAttr = childNode.getAttributes();
							if (childNode.getNodeName().equalsIgnoreCase(
									"property")) {
								String schedule = childAttr
										.getNamedItem("name").getNodeValue();
								if (schedule.equalsIgnoreCase("repeatInterval")) {
									// if, from simple trigger -> modify only
									// repeatInterval value
									((Element) childNode).setAttribute("value",
											jobInfo.getJobSchedule());
								} else if (schedule
										.equalsIgnoreCase("cronExpression")) {
									// if, from cron trigger -> modify property
									// to repeatInterval
									((Element) childNode).setAttribute("name",
											"repeatInterval");
									((Element) childNode).setAttribute("value",
											jobInfo.getJobSchedule());
								} else if (schedule
										.equalsIgnoreCase("startTime")) {
									// modify startDate
									((Element) childNode).setAttribute("value",
											jobInfo.getStartDate().toString());
								}
							}
						}

					} else if (jobInfo.getFlagScheduleType().equals("cron")) {
						// if update result is cron trigger
						((Element) node)
								.setAttribute("class",
										CronTriggerFactoryBean.class
												.getCanonicalName());

						for (int n = 0; n < childNodeList.getLength(); n++) {
							Node childNode = childNodeList.item(n);
							NamedNodeMap childAttr = childNode.getAttributes();
							if (childNode.getNodeName().equalsIgnoreCase(
									"property")) {
								String schedule = childAttr
										.getNamedItem("name").getNodeValue();
								if (schedule.equalsIgnoreCase("cronExpression")) {
									// if, from cron trigger -> modify only
									// cronExpression value
									((Element) childNode).setAttribute("value",
											jobInfo.getJobSchedule());
								} else if (schedule
										.equalsIgnoreCase("repeatInterval")) {
									// if, from simple trigger -> modify
									// property to cronExpression
									((Element) childNode).setAttribute("name",
											"cronExpression");
									((Element) childNode).setAttribute("value",
											jobInfo.getJobSchedule());
								} else if (schedule
										.equalsIgnoreCase("startTime")) {
									// modify startDate
									((Element) childNode).setAttribute("value",
											jobInfo.getStartDate().toString());
								}
							}
						}

					} else {
						throw new InvalidPropertyException(
								"invalid schedule type");
					}
				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	private void reflectJobChanges(Map<String, List<?>> map) {
		// map : execpt updated jobs in xml which jobs in memory.(insert,
		// remove)
		List<JobInfo> insertList = (List<JobInfo>) map.get("insert");
		List<TriggerInfo> removeList = (List<TriggerInfo>) map
				.get("remove");

		Iterator<JobInfo> insertItr = insertList.iterator();
		while (insertItr.hasNext()) {
			JobInfo jobInfo = insertItr.next();
			insert(jobInfo);
		}
		Iterator<TriggerInfo> removeItr = removeList.iterator();
		while (removeItr.hasNext()) {
			TriggerInfo triggerInfo = removeItr.next();
			remove(triggerInfo);
		}
	}

	private void insert(JobInfo jobInfo) {
		insertJobBean(jobInfo);
		insertTriggerBean(jobInfo);
		insertTriggerInScheduler(jobInfo);
	}

	private void insertTriggerInScheduler(JobInfo jobInfo) {
		NodeList list = document.getElementsByTagName("bean");
		for (int i = 0; i < list.getLength(); i++) {
			Node node = list.item(i);
			NamedNodeMap attr = node.getAttributes();

			if (attr.getNamedItem("class").getNodeValue().equals(
					SchedulerFactoryBean.class.getName())) {
				NodeList beanChildList = node.getChildNodes();
				for (int n = 0; n < beanChildList.getLength(); n++) {
					Node propertyNode = beanChildList.item(n);
					if (propertyNode.getNodeName().equalsIgnoreCase("property")) {
						NodeList propertyChildList = propertyNode
								.getChildNodes();
						for (int m = 0; m < propertyChildList.getLength(); m++) {
							Node listNode = propertyChildList.item(m);
							if (listNode.getNodeName().equalsIgnoreCase("list")) {

								Element refTrigger = document
										.createElement("ref");
								refTrigger.setAttribute("bean", jobInfo
										.getTriggerName());

								listNode.appendChild(refTrigger);

							}
						}
					}
				}
			}
		}
	}

	private void insertTriggerBean(JobInfo jobInfo) {
		NodeList nodeList = document.getElementsByTagName("beans");

		Element triggerBean = document.createElement("bean");
		triggerBean.setAttribute("id", jobInfo.getTriggerName());

		Element triggerSchedule = document.createElement("property");

		if (jobInfo.getFlagScheduleType().equals("simple")) {
			triggerBean.setAttribute("class", SimpleTriggerFactoryBean.class
					.getName());
			triggerSchedule.setAttribute("name", "repeatInterval");
		} else {
			triggerBean.setAttribute("class", CronTriggerFactoryBean.class
					.getName());
			triggerSchedule.setAttribute("name", "cronExpression");
		}

		triggerSchedule.setAttribute("value", jobInfo.getJobSchedule());

		Element targetObject = document.createElement("property");
		targetObject.setAttribute("name", "jobDetail");
		targetObject.setAttribute("ref", jobInfo.getJobName());

		triggerBean.appendChild(targetObject);
		triggerBean.appendChild(triggerSchedule);

		nodeList.item(nodeList.getLength() - 1).appendChild(triggerBean);
	}

	private void insertJobBean(JobInfo jobInfo) {
		NodeList nodeList = document.getElementsByTagName("beans");

		Element jobBean = document.createElement("bean");
		jobBean.setAttribute("id", jobInfo.getJobName());
		jobBean.setAttribute("class", JobDetailFactoryBean.class.getName());

		Element jobClass = document.createElement("property");
		jobClass.setAttribute("name", "jobClass");
		jobClass.setAttribute("value", jobInfo.getJobTarget());

		jobBean.appendChild(jobClass);
		nodeList.item(nodeList.getLength() - 1).appendChild(jobBean);
	}

	private void remove(TriggerInfo triggerInfo) {
		NodeList list = document.getElementsByTagName("bean");

		for (int i = list.getLength() - 1; i > -1; i--) {
			Node node = list.item(i);
			NamedNodeMap attr = node.getAttributes();
			if (attr.getNamedItem("id") != null) {

				String beanId = attr.getNamedItem("id").getNodeValue();
				// job
				if (beanId.equals(triggerInfo.getJobDetail())) {
					node.getParentNode().removeChild(node);
				}
				// trigger
				if (beanId.equals(triggerInfo.getId())) {
					node.getParentNode().removeChild(node);
					removeTriggerInScheduler(beanId);
				}
			}
		}
	}

	private void removeTriggerInScheduler(String beanId) {
		NodeList list = document.getElementsByTagName("bean");
		for (int i = 0; i < list.getLength(); i++) {
			Node node = list.item(i);
			NamedNodeMap attr = node.getAttributes();

			if (attr.getNamedItem("class").getNodeValue().equals(
					SchedulerFactoryBean.class.getName())) {
				NodeList beanChildList = node.getChildNodes();
				for (int n = 0; n < beanChildList.getLength(); n++) {
					Node propertyNode = beanChildList.item(n);
					if (propertyNode.getNodeName().equalsIgnoreCase("property")) {
						NodeList propertyChildList = propertyNode
								.getChildNodes();
						for (int m = 0; m < propertyChildList.getLength(); m++) {
							Node listNode = propertyChildList.item(m);
							if (listNode.getNodeName().equalsIgnoreCase("list")) {
								NodeList listChildList = listNode
										.getChildNodes();
								for (int l = 0; l < listChildList.getLength(); l++) {
									Node refNode = listChildList.item(l);
									if (refNode.getNodeName().equalsIgnoreCase(
											"ref")) {
										NamedNodeMap refAttr = refNode
												.getAttributes();
										String ref = refAttr.getNamedItem(
												"bean").getNodeValue();
										if (ref.equals(beanId)) {
											refNode.getParentNode()
													.removeChild(refNode);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	private void exportContextDocument() throws UnsupportedEncodingException,
			FileNotFoundException, TransformerException {
		Source source = new DOMSource(document);
		Result result = new StreamResult(new OutputStreamWriter(
				new FileOutputStream(schedulingFile), "utf-8"));
		TransformerFactory tf = TransformerFactory.newInstance();
		tf.setAttribute("indent-number", new Integer(4));
		Transformer xformer = tf.newTransformer();
		xformer.setOutputProperty(OutputKeys.INDENT, "yes");
		xformer.transform(source, result);
	}

}
