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
import org.quartz.Trigger;
import org.quartz.Trigger.CompletedExecutionInstruction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanNameAware;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class TriggerListener implements org.quartz.TriggerListener,
		BeanNameAware {
	Logger logger = LoggerFactory.getLogger(TriggerListener.class);
	
	private String name;

	public TriggerListener() {

	}

	public String getName() {
		return name;
	}

	public void triggerFired(Trigger trigger, JobExecutionContext context) {

		String triggerName = trigger.getKey().getName();
		logger.info(triggerName + " was fired");
	}

	public boolean vetoJobExecution(Trigger trigger, JobExecutionContext context) {

		String triggerName = trigger.getKey().getName();
		logger.info(triggerName + " was not vetoed");
		return true;
	}

	public void triggerMisfired(Trigger trigger) {
		String triggerName = trigger.getKey().getName();
		logger.info(triggerName + " misfired");
	}

	public void triggerComplete(Trigger trigger, JobExecutionContext context,
			CompletedExecutionInstruction triggerInstructionCode) {
		String triggerName = trigger.getKey().getName();
		logger.info(triggerName + " is complete");
	}
	
	public void setBeanName(String name) {
		this.name = name;
	}
}