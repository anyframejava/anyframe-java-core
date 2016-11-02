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

/**
 * This TriggerInfo class contains attributes for spring scheduling trigger bean information
 * and getter, setter methods of them. And it contains toString method for
 * logging.
 * 
 * @author Sujeong Lee
 */
public class TriggerInfo {
	private String id;
	private Class<?> triggerClass;
	private String jobDetail;
	private String type; // simple, cron
	private String schedule; // repeatInterval, cronExpression

	/**
	 * Get a trigger id value.
	 * 
	 * @return The value of trigger id
	 */
	public String getId() {
		return id;
	}

	/**
	 * Set a trigger id value.
	 * 
	 * @param id The value of trigger id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Get a trigger class value.
	 * 
	 * @return The value of trigger class
	 */
	public Class<?> getTriggerClass() {
		return triggerClass;
	}

	/**
	 * Set a trigger class value.
	 * 
	 * @param triggerClass The value of trigger class
	 */
	public void setTriggerClass(Class<?> triggerClass) {
		this.triggerClass = triggerClass;
	}

	/**
	 * Get a trigger type value.
	 * 
	 * @return The value of trigger type
	 */
	public String getType() {
		return type;
	}

	/**
	 * Set a trigger type value.
	 * 
	 * @param type The value of trigger type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * Get a trigger schedule value.
	 * 
	 * @return The value of trigger schedule
	 */
	public String getSchedule() {
		return schedule;
	}

	/**
	 * Set a trigger schedule value.
	 * 
	 * @param schedule The value of trigger schedule
	 */
	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}

	/**
	 * Set a trigger id value.
	 * 
	 * @param jobDetail The value of trigger jobDetail
	 */
	public void setJobDetail(String jobDetail) {
		this.jobDetail = jobDetail;
	}

	/**
	 * Get a trigger jobDetail value.
	 * 
	 * @return The value of trigger jobDetail
	 */
	public String getJobDetail() {
		return jobDetail;
	}

	@Override
	public String toString() {
		return "[id=" + id + ", triggerClass=" + triggerClass
				+ ", jobDetail=" + jobDetail + ", type=" + type + ", schedule="
				+ schedule + "]";
	}

}
