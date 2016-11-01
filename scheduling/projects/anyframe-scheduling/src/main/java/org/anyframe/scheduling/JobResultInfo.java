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

/**
 * This JobResultInfo class contains attributes for quartz job result
 * information and getter, setter methods of them. And it contains toString
 * method for logging.
 * 
 * @author Sujeong Lee
 */
public class JobResultInfo implements Serializable {

	private static final long serialVersionUID = 1L;

	private String jobName;
	private String jobGroup;

	private boolean isSuccess;

	private Date startDate = new Date();

	private Date endDate = new Date();
	private String exception;

	/**
	 * Get a job name value.
	 * 
	 * @return The value of job name
	 */
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
	 *            The value of job group
	 */
	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}

	/**
	 * Get a boolean value of job is success or fail.
	 * 
	 * @return The boolean value of is success or fail
	 */
	public boolean getIsSuccess() {
		return isSuccess;
	}

	/**
	 * Set a boolean value of job is success or fail.
	 * 
	 * @param isSuccess
	 *            TThe boolean value of is success or fail
	 */
	public void setIsSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
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
	 * Get a job result exception value.
	 * 
	 * @return The value of job result exception
	 */
	public String getException() {
		return exception;
	}

	/**
	 * Set a job result exception value.
	 * 
	 * @param jobName
	 *            The value of job result exception
	 */
	public void setException(String exception) {
		this.exception = exception;
	}

	@Override
	public String toString() {
		return "[jobName=" + jobName + ", jobGroup=" + jobGroup
				+ ", isSuccess=" + isSuccess + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", exception=" + exception + "]";
	}
}
