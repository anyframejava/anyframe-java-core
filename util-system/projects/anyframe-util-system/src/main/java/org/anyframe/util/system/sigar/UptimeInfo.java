/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.util.system.sigar;

import java.io.Serializable;

/**
 * This UptimeInfo class is a Value Object class for uptime information.
 * 
 * @author ByungHun Woo
 */
public class UptimeInfo implements Serializable {

	private static final long serialVersionUID = 5926436871334759737L;

	private String infoAll;

	private String currentTime;

	private String uptime;

	private double uptimeSeconds;

	private String loadAverage;

	public String getInfoAll() {
		return infoAll;
	}

	public void setInfoAll(String infoAll) {
		this.infoAll = infoAll;
	}

	public String getCurrentTime() {
		return currentTime;
	}

	public void setCurrentTime(String currentTime) {
		this.currentTime = currentTime;
	}

	public String getUptime() {
		return uptime;
	}

	public void setUptime(String uptime) {
		this.uptime = uptime;
	}

	public double getUptimeSeconds() {
		return uptimeSeconds;
	}

	public void setUptimeSeconds(double uptimeSeconds) {
		this.uptimeSeconds = uptimeSeconds;
	}

	public String getLoadAverage() {
		return loadAverage;
	}

	public void setLoadAverage(String loadAverage) {
		this.loadAverage = loadAverage;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
