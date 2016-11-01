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
 * This ProcessMemoryInfo class is a Value Object class for process memory information.
 * 
 * @author ByungHun Woo
 */
public class ProcessMemoryInfo implements Serializable {

	private static final long serialVersionUID = 345091023L;

	private String size;

	private String resident;

	private String share;

	private String minorFaults;

	private String majorFaults;

	private String pageFaults;

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getResident() {
		return resident;
	}

	public void setResident(String resident) {
		this.resident = resident;
	}

	public String getShare() {
		return share;
	}

	public void setShare(String share) {
		this.share = share;
	}

	public String getMinorFaults() {
		return minorFaults;
	}

	public void setMinorFaults(String minorFaults) {
		this.minorFaults = minorFaults;
	}

	public String getMajorFaults() {
		return majorFaults;
	}

	public void setMajorFaults(String majorFaults) {
		this.majorFaults = majorFaults;
	}

	public String getPageFaults() {
		return pageFaults;
	}

	public void setPageFaults(String pageFaults) {
		this.pageFaults = pageFaults;
	}
}
