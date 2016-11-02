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
package org.anyframe.scheduling.impl.listener;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;

import org.anyframe.scheduling.JobResultInfo;
import org.anyframe.scheduling.SchedulingService;
import org.anyframe.scheduling.impl.result.JobResultWriter;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.listeners.JobListenerSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Support to make a result file with each job is executed.
 * Result contains start time, end time, success or failure and exception stackstrace.
 * 
 * @author Sujeong Lee
 */
public class SchedulingJobListener extends JobListenerSupport{

	String name;
	Logger logger = LoggerFactory.getLogger(SchedulingService.class);
	private JobResultWriter jobResultWriter;
	
	public void setJobResultWriter(JobResultWriter jobResultWriter) {
		this.jobResultWriter = jobResultWriter;
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.quartz.JobListener#getName()
	 */
	public String getName() {
		this.name = "SchedulingJobListener";
		return name;
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.quartz.listeners.JobListenerSupport#jobToBeExecuted(org.quartz.JobExecutionContext)
	 */
	public void jobToBeExecuted(JobExecutionContext context) {
		JobResultInfo jobResultInfo = new JobResultInfo();
		JobDetail jobDetail = context.getJobDetail();
		jobResultInfo.setJobName(jobDetail.getKey().getName());
		jobResultInfo.setJobGroup(jobDetail.getKey().getGroup());
		jobResultInfo.setStartDate(new Date());

		context.setResult(jobResultInfo);
	}

	/*
	 * (non-Javadoc)
	 * @see org.quartz.listeners.JobListenerSupport#jobWasExecuted(org.quartz.JobExecutionContext, org.quartz.JobExecutionException)
	 */
	public void jobWasExecuted(JobExecutionContext context,
			JobExecutionException exception) {
		JobResultInfo jobResultInfo = (JobResultInfo) context
				.getResult();
		if (jobResultInfo == null) {
			jobResultInfo = new JobResultInfo();

			JobDetail jobDetail = context.getJobDetail();
			jobResultInfo.setJobName(jobDetail.getKey().getName());
			jobResultInfo.setJobGroup(jobDetail.getKey().getGroup());
			jobResultInfo.setStartDate(new Date());
		}
		jobResultInfo.setEndDate(new Date());

		try {
			if (exception == null) {
				// Success
				jobResultInfo.setIsSuccess(true);
				jobResultInfo.setException(null);
			} else {
				// Fail
				StringWriter sw = new StringWriter();
				exception.printStackTrace(new PrintWriter(sw));
				String stacktrace = sw.toString();
				
				jobResultInfo.setIsSuccess(false);
				jobResultInfo.setException(stacktrace);
			}
			jobResultWriter.create(jobResultInfo);
		} catch (Exception e) {
			logger.error("Fail to create job execution result.", e);
		}

	}
	
	/*
	 * (non-Javadoc)
	 * @see org.quartz.listeners.JobListenerSupport#jobExecutionVetoed(org.quartz.JobExecutionContext)
	 */
	public void jobExecutionVetoed(JobExecutionContext context) {
	}

}
