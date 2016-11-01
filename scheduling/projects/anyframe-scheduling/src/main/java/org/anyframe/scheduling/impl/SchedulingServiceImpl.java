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

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.anyframe.exception.InitializationException;
import org.anyframe.exception.InvalidPropertyException;
import org.anyframe.scheduling.JobInfo;
import org.anyframe.scheduling.JobResultInfo;
import org.anyframe.scheduling.SchedulingService;
import org.anyframe.scheduling.exception.SchedulingException;
import org.anyframe.scheduling.impl.listener.SchedulingJobListener;
import org.anyframe.scheduling.impl.result.JobResultWriter;
import org.anyframe.util.StringUtil;
import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.quartz.impl.JobDetailImpl;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.matchers.GroupMatcher;
import org.quartz.impl.matchers.KeyMatcher;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean;

/**
 * This service enable quartz jobs to manage jobs with quartz API.
 * 
 * <p>
 * SchedulingService Configuration Example:
 * 
 * <pre>
 * &lt;property name=&quot;scheduler&quot; ref=&quot;schedulerFactoryBean&quot; /&gt;
 * &lt;property name=&quot;jobResultCollector&quot; ref=&quot;schedulingJobListener&quot; /&gt;
 * &lt;property name=&quot;scheduler&quot; value=&quot;database&quot; /&gt;
 * &lt;property name=&quot;jobResultPath&quot; value=&quot;/Anyframe/schedule/&quot; /&gt;
 * </pre>
 * 
 * </p>
 * 
 * @author Sujeong Lee
 */
public class SchedulingServiceImpl implements SchedulingService,
		ApplicationContextAware {

	private ApplicationContext applicationContext;
	private Scheduler scheduler;
	private JobDBManager jobDBManager;
	private SchedulingJobListener schedulingJobListener;
	private JobResultWriter jobResultWriter;
	private String jobResultPath;
	private String jobRepository;

	public void setApplicationContext(ApplicationContext applicationContext) {
		this.applicationContext = applicationContext;
	}

	public void setScheduler(Scheduler scheduler) {
		this.scheduler = scheduler;
	}

	public void setJobRepository(String jobRepository) {
		this.jobRepository = jobRepository;
	}

	public void setJobResultCollector(SchedulingJobListener jobResultCollector) {
		this.schedulingJobListener = jobResultCollector;
	}

	public void setJobResultPath(String jobResultPath) {
		this.jobResultPath = jobResultPath;
	}

	@SuppressWarnings("unused")
	private void init() {
		this.jobResultWriter = new JobResultWriter();

		if (jobResultPath != null) {
			jobResultWriter.setResultPath(jobResultPath);
			schedulingJobListener.setJobResultWriter(jobResultWriter);
		}

		if ("database".equals(jobRepository)) {
			this.jobDBManager = (JobDBManager) applicationContext
					.getBean("jobDBManager");
		} else {
			LOGGER.debug("'jobRepository' values can be 'database' or 'file'.");
		}

		// 1. check scheduler is exist in context-scheduling.xml => make new
		// scheduler
		try {
			if (scheduler == null) {
				scheduler = new StdSchedulerFactory().getScheduler();
			}
			scheduler.pauseAll();
			addListenerToXMLJobs();
		} catch (SchedulerException ex) {
			LOGGER.error("Fail to init scheduler. Cause : " + ex.getCause());
			throw new InitializationException("Fail to init scheduler.", ex);
		}

		// 2. check db is exist => add jobs to scheduler
		if (jobDBManager != null) {
			LOGGER.debug("Job information is included in the DB. "
					+ jobDBManager);
			List<JobInfo> dbJobList = jobDBManager.getList();
			Iterator<JobInfo> itrJob = dbJobList.iterator();
			while (itrJob.hasNext()) {
				JobInfo jobInfo = itrJob.next();
				create(jobInfo);
			}
		}

		try {
			scheduler.resumeAll();
		} catch (SchedulerException ex) {
			LOGGER.error("Fail to resume all jobs.");
			throw new InitializationException("Fail to resume all jobs.", ex);
		}
	}

	@SuppressWarnings("unused")
	private void destroy() {
		List<JobInfo> jobList = getList();

		// 1. xml
		// return job list to JobFilManager for compare, write
		JobFileManager jobFileManagaer = new JobFileManager(jobList);
		// refrect to XML Builder, remained Job List(reflect to DB) return
		jobList = jobFileManagaer.reflectChanges();
		LOGGER.debug("Job List to be saved in the DB size is " + jobList.size()
				+ ".");

		// 2. db
		if (jobDBManager != null) {
			// return job list to JobDBManager for compare, CUD
			jobDBManager.reflectChanges(jobList);
		}

		try {
			scheduler.shutdown(true);
			Thread.sleep(1000);
		} catch (Exception ex) {
			LOGGER.error("Fail to init scheduler. Cause : " + ex.getCause());
			throw new SchedulingException("Fail to shutdown quartz scheduler.",
					ex);
		}
	}

	/**
	 * Execute to add job to quartz scheduler. However, job is added in memory.
	 * 
	 * @param jobInfo
	 *            Object including the information about add to quartz as a job
	 * @throws SchedulingException
	 */
	public void create(JobInfo jobInfo) {
		String validateMessage = validateJobInfo(jobInfo);

		if ("valid".equals(validateMessage)) {
			try {
				addJob(jobInfo);
			} catch (Exception ex) {
				throw processException("Fail to create job : "
						+ validateMessage, new Exception());
			}
		} else {
			throw processException("Fail to create job : " + validateMessage,
					new Exception());
		}

	}

	/**
	 * Execute to get list jobs in quartz scheduler.
	 * 
	 * @return Array including the object about jobs
	 * @throws SchedulingException
	 */
	public List<JobInfo> getList() {
		List<JobInfo> resultList = new ArrayList<JobInfo>();

		// 1. added job list
		try {
			List<String> jobGroups = scheduler.getJobGroupNames();

			for (int i = 0; i < jobGroups.size(); i++) {
				String jobGroupName = jobGroups.get(i);
				resultList.addAll(getList(jobGroupName));
			}
		} catch (Exception ex) {
			throw processException("Fail to get list job", ex);
		}

		return resultList;
	}

	/**
	 * Execute to get list jobs which job group name is input value in quartz
	 * scheduler.
	 * 
	 * @param jobGroupName
	 *            quartz job group name
	 * @return List including the object about jobs
	 * @throws SchedulingException
	 */
	public List<JobInfo> getList(String jobGroupName) {
		List<JobInfo> resultList = new ArrayList<JobInfo>();

		try {
			if (isEmpty(jobGroupName)) {
				// get all job list without job group
				resultList = getList();
			} else {
				// get all job list with job group
				Set<JobKey> jobKeys = scheduler.getJobKeys(GroupMatcher
						.<JobKey> groupEquals(jobGroupName));
				Iterator<JobKey> itr = jobKeys.iterator();
				while (itr.hasNext()) {
					JobDetail jobDetail = scheduler.getJobDetail(itr.next());
					JobInfo jobInfo = getJob(jobDetail);
					resultList.add(jobInfo);
				}
			}
		} catch (SchedulerException ex) {
			throw processException("Fail to get list job", ex);
		}

		return resultList;
	}

	/**
	 * Execute to get job which job key is input value in quartz scheduler.
	 * 
	 * @param jobKey
	 *            job key
	 * @return the JobInfo object containing the quartz job information
	 * @throws SchedulingException
	 */
	public JobInfo get(JobKey jobKey) {
		JobInfo jobInfo = new JobInfo();
		try {
			JobDetail jobDetail = scheduler.getJobDetail(jobKey);
			jobInfo = getJob(jobDetail);
		} catch (SchedulerException ex) {
			throw processException("Fail to get job", ex);
		}
		return jobInfo;
	}

	/**
	 * Execute to delete job which job key is input value in quartz scheduler.
	 * However, job is removed in memory.
	 * 
	 * @param jobKey
	 *            job key
	 * @throws SchedulingException
	 */
	public void delete(JobKey jobKey) {
		try {
			scheduler.deleteJob(jobKey);
		} catch (SchedulerException ex) {
			throw processException("Fail to delete job", ex);
		}
	}

	/**
	 * Execute to delete all jobs included in the input list. However, jobs are
	 * removed in memory.
	 * 
	 * @param jobKeys
	 *            array including the
	 * @throws SchedulingException
	 */
	public void deleteAll(List<JobKey> jobKeys) {
		try {
			scheduler.deleteJobs(jobKeys);
		} catch (SchedulerException ex) {
			throw processException("Fail to delete job", ex);
		}
	}

	/**
	 * Execute to add job to quartz scheduler. However, job is updated in
	 * memory.
	 * 
	 * @param jobInfo
	 *            Object including the information about update to quartz as a
	 *            job
	 * @throws SchedulingException
	 */
	public void update(JobInfo jobInfo) {
		try {
			scheduler.pauseAll();
			delete(new JobKey(jobInfo.getJobName(), jobInfo.getJobGroup()));
			addJob(jobInfo);
			scheduler.resumeAll();
		} catch (Exception ex) {
			throw processException("Fail to update job", ex);
		}
	}

	/**
	 * Execute to run job which job key is input value in quartz scheduler
	 * regardless of the schedule.
	 * 
	 * @param jobKey
	 *            job key
	 * @throws SchedulingException
	 */
	public void run(JobKey jobKey) {
		try {
			scheduler.triggerJob(jobKey);
		} catch (SchedulerException ex) {
			throw processException("Fail to run job", ex);
		}
	}

	/**
	 * Execute to stop the running job which job key is input value in quartz
	 * scheduler.
	 * 
	 * @param jobKey
	 *            job key
	 * @throws SchedulingException
	 */
	public void stop(JobKey jobKey) {
		try {
			scheduler.pauseJob(jobKey);
		} catch (SchedulerException ex) {
			throw processException("Fail to stop job", ex);
		}
	}

	/**
	 * Execute to get list job results which JobResultInfo information is input
	 * object.
	 * 
	 * @param jobResultInfo
	 *            Object including the information about get result list
	 * @return List including the object about job results
	 * @throws SchedulingException
	 */
	public List<JobResultInfo> getResultList(JobResultInfo jobResultInfo) {
		return jobResultWriter.getList(jobResultInfo);
	}

	/**
	 * Execute to get job result which JobResultInfo informtation is input
	 * object.
	 * 
	 * @param jobResultInfo
	 *            Object including the information about get result
	 * @return the JobResultInfo object containing the job result information
	 * @throws SchedulingException
	 */
	public JobResultInfo getResult(JobResultInfo jobResultInfo) {
		return jobResultWriter.get(jobResultInfo);
	}

	private void addListenerToXMLJobs() throws SchedulerException {
		List<String> jobGroups = scheduler.getJobGroupNames();

		for (int i = 0; i < jobGroups.size(); i++) {
			String jobGroupName = jobGroups.get(i);
			Set<JobKey> jobKeys = scheduler.getJobKeys(GroupMatcher
					.<JobKey> groupEquals(jobGroupName));
			Iterator<JobKey> itr = jobKeys.iterator();
			while (itr.hasNext()) {
				scheduler.getListenerManager()
						.addJobListener(schedulingJobListener,
								KeyMatcher.keyEquals(itr.next()));
			}
		}
	}

	private JobInfo getJob(JobDetail jobDetail) throws SchedulerException {
		JobInfo jobInfo = new JobInfo();

		jobInfo.setJobName(jobDetail.getKey().getName());
		jobInfo.setJobGroup(jobDetail.getKey().getGroup());
		jobInfo.setDescription(jobDetail.getDescription());

		List<?> list = scheduler.getTriggersOfJob(jobDetail.getKey());

		for (int i = 0; i < list.size(); i++) {
			Trigger trigger = (Trigger) list.get(i);
			jobInfo.setTriggerName(trigger.getKey().getName());

			if (trigger instanceof SimpleTrigger) {
				SimpleTrigger simpleTrigger = (SimpleTrigger) trigger;
				jobInfo.setJobSchedule(String.valueOf(simpleTrigger
						.getRepeatInterval()));
				jobInfo.setFlagScheduleType("simple");
			} else if (trigger instanceof CronTrigger) {
				CronTrigger cronTrigger = (CronTrigger) trigger;
				jobInfo.setJobSchedule(cronTrigger.getCronExpression());
				jobInfo.setFlagScheduleType("cron");
			}

			jobInfo.setStartDate(trigger.getStartTime());
			jobInfo.setEndDate(trigger.getEndTime());
			jobInfo.setInXml(false);
		}

		Package jobPackage = jobDetail.getJobClass().getPackage();

		try {
			// XML
			jobInfo.setInXml(true);
			if (jobPackage.toString().indexOf("org.springframework.scheduling") == -1) {// JobDetailFactoryBean
				jobInfo.setJobTarget(jobDetail.getJobClass().getName());
			} else {// MethodInvoingJobDetailFactoryBean
				Object methodInvokeBean = applicationContext.getBean(jobDetail
						.getKey().getName());
				JobDetail impl = (JobDetail) methodInvokeBean;
				MethodInvokingJobDetailFactoryBean methodInvokerClass = (MethodInvokingJobDetailFactoryBean) impl
						.getJobDataMap().get("methodInvoker");

				jobInfo.setJobTarget(methodInvokerClass.getTargetClass()
						.getName());
				jobInfo
						.setJobTargetMethod(methodInvokerClass
								.getTargetMethod());
			}
		} catch (NoSuchBeanDefinitionException e) {
			// DB
			jobInfo.setJobTarget(jobDetail.getJobClass().getName());
		}

		return jobInfo;
	}

	@SuppressWarnings("unchecked")
	private void addJob(JobInfo jobInfo) throws ClassNotFoundException,
			SchedulerException {
		String jobName = jobInfo.getJobName();
		String jobGroup = jobInfo.getJobGroup();

		JobDetailImpl jobDetail = null;

		if (scheduler.checkExists(new JobKey(jobName, jobGroup))) {
			throw new SchedulerException("Job name is already exist.");
		} else {
			jobDetail = new JobDetailImpl();
			jobDetail.setName(jobName);
			jobInfo.setJobGroup(jobGroup);
			jobDetail.setGroup(jobGroup);
			jobDetail.setDescription(jobInfo.getDescription());

			jobDetail.setJobClass((Class<? extends Job>) Class.forName(jobInfo
					.getJobTarget()));

			Trigger trigger = generateTrigger(jobInfo);

			scheduler.getListenerManager().addJobListener(schedulingJobListener);
			scheduler.addJob(jobDetail, true);
			scheduler.scheduleJob(trigger);
			scheduler.resumeJob(new JobKey(jobName, jobGroup));
		}
	}

	private Trigger generateTrigger(JobInfo jobInfo) {
		if (jobInfo.getFlagScheduleType().equals("simple")) {
			SimpleTrigger trigger = (SimpleTrigger) newTrigger().withIdentity(
					"TRIGGER-" + jobInfo.getJobName(),
					"TRIGGER-" + jobInfo.getJobGroup()).startAt(
					jobInfo.getStartDate()).endAt(jobInfo.getEndDate())
					.withSchedule(
							simpleSchedule().withIntervalInMilliseconds(
									Integer.parseInt(jobInfo.getJobSchedule()))
									.repeatForever()).forJob(
							jobInfo.getJobName(), jobInfo.getJobGroup())
					.build();
			return trigger;
		} else if ("cron".equals(jobInfo.getFlagScheduleType())) {
			CronTrigger trigger = newTrigger().withIdentity(
					"TRIGGER-" + jobInfo.getJobName(),
					"TRIGGER-" + jobInfo.getJobGroup()).startAt(
					jobInfo.getStartDate()).endAt(jobInfo.getEndDate())
					.withSchedule(cronSchedule(jobInfo.getJobSchedule()))
					.forJob(jobInfo.getJobName(), jobInfo.getJobGroup())
					.build();
			return trigger;
		} else {
			LOGGER
					.error("Fail to generate Trigger. Cause : Input schedule type is not invalid. Only \"cron\" or \"simple\".");
			throw new InvalidPropertyException(
					"Fail to generate Trigger. Cause : Input schedule type is not invalid. Only \"cron\" or \"simple\".");
		}
	}

	private String validateJobInfo(JobInfo jobInfo) {
		String result = "";
		boolean valid = true;

		if (isEmpty(jobInfo.getJobName())) {
			result += "'job name' ";
			valid = false;
		}

		if (isEmpty(jobInfo.getJobTarget())) {
			result += "'job target' ";
			valid = false;
		}

		if (isEmpty(jobInfo.getJobSchedule())
				&& isEmpty(jobInfo.getFlagScheduleType())) {
			result += "'job schedule or schedule type' ";
			valid = false;
		}

		if (valid) {
			return "valid";
		} else {
			result += "is(are) invalid.";
			return result;
		}
	}

	private boolean isEmpty(String parameter) {
		if (StringUtil.isEmpty(parameter)) {
			return true;
		} else {
			return false;
		}
	}

	private SchedulingException processException(String actionName, Exception ex) {
		LOGGER.error("Scheduling Service : " + actionName + " Reason : "
				+ ex.getMessage());
		return new SchedulingException("Scheduling Service : " + actionName
				+ ".\n Reason = " + ex.getMessage(), ex);
	}
}
