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
package org.anyframe.sample.scheduling;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.listeners.JobListenerSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanNameAware;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class QuartzListener extends JobListenerSupport implements BeanNameAware {
	Logger logger = LoggerFactory.getLogger(QuartzListener.class);

	private int preExecutionCount;

	private int executionCount;

	private int vetoedCount;

	private String name;

	public String getName() {
		return name;
	}

	public void jobToBeExecuted(JobExecutionContext context) {
		preExecutionCount++;
		String jobName = context.getJobDetail().getKey().getName();
		logger.info(jobName + " is about to be executed");
	}

	public void jobExecutionVetoed(JobExecutionContext context) {
		vetoedCount++;
		String jobName = context.getJobDetail().getKey().getName();
		logger.info(jobName + " was vetoed and not executed()");
	}

	public void jobWasExecuted(JobExecutionContext context,
			JobExecutionException jobException) {
		executionCount++;
		String jobName = context.getJobDetail().getKey().getName();
		logger.info(jobName + " was executed");
	}

	public void setBeanName(String name) {
		this.name = name;
	}

	public int getExecutionCount() {
		return executionCount;
	}

	public int getPreExecutionCount() {
		return preExecutionCount;
	}

	public int getVetoedCount() {
		return vetoedCount;
	}

}
