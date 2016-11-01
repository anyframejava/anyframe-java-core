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
package org.anyframe.scheduling;

import java.io.Serializable;
import java.util.Date;

import org.quartz.Scheduler;

/**
 * This JobInfo class contains attributes for quartz job and trigger information
 * and getter, setter methods of them. And it contains toString method for
 * logging.
 * 
 * @author Sujeong Lee
 */
public class JobInfo implements Serializable { 

	private static final long serialVersionUID = 1L;

	private String jobName;
	private String jobGroup = Scheduler.DEFAULT_GROUP;
	private String jobTarget;
	private String jobTargetMethod = "";
	private String jobSchedule;
	private String triggerName;

	private Date startDate;

	private Date endDate;

	String description = "";

	private boolean inXml = false;

	private String flagScheduleType; // simple, cron

	public String getJobName() {
		return jobName;
	}

	/**
	 * Set a job name value.
	 * 
	 * @param jobName
	 *            The value of job name
	 */
	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	/**
	 * Get a job group value.
	 * 
	 * @return The value of job group
	 */
	public String getJobGroup() {
		return jobGroup;
	}

	/**
	 * Set a job group value.
	 * 
	 * @param jobGroup
	 *            The value of job group. Default = DEFAULT
	 */
	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}

	/**
	 * Get a job target class value.
	 * 
	 * @return The value of job target class
	 */
	public String getJobTarget() {
		return jobTarget;
	}

	/**
	 * Set a job target class value.
	 * 
	 * @param jobTarget
	 *            The value of job target class
	 */
	public void setJobTarget(String jobTarget) {
		this.jobTarget = jobTarget;
	}

	/**
	 * Get a job schedule value.
	 * 
	 * @return The value of job schedule
	 */
	public String getJobSchedule() {
		return jobSchedule;
	}

	/**
	 * Set a job schedule value.
	 * 
	 * @param jobSchedule
	 *            The value of job schedule
	 */
	public void setJobSchedule(String jobSchedule) {
		this.jobSchedule = jobSchedule;
	}

	/**
	 * Get a job trigger name value.
	 * 
	 * @return The value of job trigger name
	 */
	public String getTriggerName() {
		return triggerName;
	}

	/**
	 * Set a job trigger name value.
	 * 
	 * @param triggerName
	 *            The value of job trigger name
	 */
	public void setTriggerName(String triggerName) {
		this.triggerName = triggerName;
	}

	/**
	 * Get a job start date value.
	 * 
	 * @return The value of job start date
	 */
	public Date getStartDate() {
		return startDate;
	}

	/**
	 * Set a job start date value.
	 * 
	 * @param startDate
	 *            The value of job start date
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	/**
	 * Get a job end date value.
	 * 
	 * @return The value of job end date
	 */
	public Date getEndDate() {
		return endDate;
	}

	/**
	 * Set a job end date value.
	 * 
	 * @param endDate
	 *            The value of job end date
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	/**
	 * Get a description value.
	 * 
	 * @return The value of description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Set a description value.
	 * 
	 * @param description
	 *            The value of description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Get a boolean value of job saved in xml file
	 * 
	 * @return The boolean value of job saved in xml file
	 */
	public boolean isInXml() {
		return inXml;
	}

	/**
	 * Set a boolean value of job saved in xml file
	 * 
	 * @param isInXml
	 *            The boolean value of job saved in xml file
	 */
	public void setInXml(boolean inXml) {
		this.inXml = inXml;
	}

	/**
	 * Get a job target method value.
	 * 
	 * @return The value of job target method
	 */
	public String getJobTargetMethod() {
		return jobTargetMethod;
	}

	/**
	 * Set a job target method value.
	 * 
	 * @param jobTargetMethod
	 *            The value of job target method
	 */
	public void setJobTargetMethod(String jobTargetMethod) {
		this.jobTargetMethod = jobTargetMethod;
	}

	/**
	 * Get a flag value of schedule type.
	 * 
	 * @return The flag value of schedule type
	 */
	public String getFlagScheduleType() {
		return flagScheduleType;
	}

	/**
	 * Set a flag value of schedule type.
	 * 
	 * @param jobName
	 *            The flag value of schedule type
	 */
	public void setFlagScheduleType(String flagScheduleType) {
		this.flagScheduleType = flagScheduleType;
	}

	/**
	 * 
	 */
	@Override
	public String toString() {
		return "[jobName=" + jobName + ", jobGroup=" + jobGroup
				+ ", jobTarget=" + jobTarget + ", jobTargetMethod="
				+ jobTargetMethod + ", jobSchedule=" + jobSchedule
				+ ", startDate=" + startDate + ", endDate=" + endDate
				+ ", description=" + description + ", isInXml=" + inXml
				+ ", flagScheduleType=" + flagScheduleType + "]";
	}
}
