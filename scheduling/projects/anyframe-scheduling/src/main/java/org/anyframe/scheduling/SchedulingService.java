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

import java.util.ArrayList;
import java.util.List;

import org.quartz.JobKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
 * &lt;property name=&quot;jobResultPath&quot; value=&quot;C:/Anyframe&quot; /&gt;
 * </pre>
 * 
 * </p>
 * 
 * @author Sujeong Lee
 */
public interface SchedulingService {

	Logger logger = LoggerFactory.getLogger(SchedulingService.class);

	/**
	 * Execute to add job to quartz scheduler. However, job is added in memory.
	 * 
	 * @param jobInfo
	 *            Object including the information about add to quartz as a job
	 * @throws Exception
	 */
	void create(JobInfo jobInfo) throws Exception;

	/**
	 * Execute to get list jobs in quartz scheduler.
	 * 
	 * @return Array including the object about jobs
	 * @throws Exception
	 */
	ArrayList<JobInfo> getList() throws Exception;

	/**
	 * Execute to get list jobs which job group name is input value in quartz
	 * scheduler.
	 * 
	 * @param jobGroupName
	 *            quartz job group name
	 * @return List including the object about jobs
	 * @throws Exception
	 */
	ArrayList<JobInfo> getList(String jobGroupName) throws Exception;

	/**
	 * Execute to get job which job key is input value in quartz scheduler.
	 * 
	 * @param jobKey
	 *            job key
	 * @return the JobInfo object containing the quartz job information
	 * @throws Exception
	 */
	JobInfo get(JobKey jobKey) throws Exception;

	/**
	 * Execute to delete job which job key is input value in quartz scheduler.
	 * However, job is removed in memory.
	 * 
	 * @param jobKey
	 *            job key
	 * @throws Exception
	 */
	void delete(JobKey jobKey) throws Exception;

	/**
	 * Execute to delete all jobs included in the input list. However, jobs are
	 * removed in memory.
	 * 
	 * @param jobKeys
	 *            array including the
	 * @throws Exception
	 */
	void deleteAll(ArrayList<JobKey> jobKeys) throws Exception;

	/**
	 * Execute to add job to quartz scheduler. However, job is updated in
	 * memory.
	 * 
	 * @param jobInfo
	 *            Object including the information about update to quartz as a
	 *            job
	 * @throws Exception
	 */
	void update(JobInfo jobInfo) throws Exception;

	/**
	 * Execute to run job which job key is input value in quartz scheduler
	 * regardless of the schedule.
	 * 
	 * @param jobKey
	 *            job key
	 * @throws Exception
	 */
	void run(JobKey jobKey) throws Exception;

	/**
	 * Execute to stop the running job which job key is input value in quartz
	 * scheduler.
	 * 
	 * @param jobKey
	 *            job key
	 * @throws Exception
	 */
	void stop(JobKey jobKey) throws Exception;

	/**
	 * Execute to get list job results which JobResultInfo information is input
	 * object.
	 * 
	 * @param jobResultInfo
	 *            Object including the information about get result list
	 * @return List including the object about job results
	 * @throws Exception
	 */
	public List<JobResultInfo> getResultList(JobResultInfo jobResultInfo)
			throws Exception;

	/**
	 * Execute to get job result which JobResultInfo informtation is input
	 * object.
	 * 
	 * @param jobResultInfo
	 *            Object including the information about get result
	 * @return the JobResultInfo object containing the job result information
	 * @throws Exception
	 */
	public JobResultInfo getResult(JobResultInfo jobResultInfo)
			throws Exception;
}
