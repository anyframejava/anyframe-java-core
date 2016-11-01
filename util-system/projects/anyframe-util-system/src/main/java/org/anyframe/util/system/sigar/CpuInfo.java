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
 * This CpuInfo class is a Value Object class for Cpu information.
 * 
 * @author ByungHun Woo
 */
public class CpuInfo implements Serializable {

	private static final long serialVersionUID = -179811367165929651L;

	private String vendor;

	private String model;

	private int mhz;

	private int totalCpus;

	private int physicalCpus;

	private int coresPerCpu;

	private long cacheSize;

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getMhz() {
		return mhz;
	}

	public void setMhz(int mhz) {
		this.mhz = mhz;
	}

	public int getTotalCpus() {
		return totalCpus;
	}

	public void setTotalCpus(int totalCpus) {
		this.totalCpus = totalCpus;
	}

	public int getPhysicalCpus() {
		return physicalCpus;
	}

	public void setPhysicalCpus(int physicalCpus) {
		this.physicalCpus = physicalCpus;
	}

	public int getCoresPerCpu() {
		return coresPerCpu;
	}

	public void setCoresPerCpu(int coresPerCpu) {
		this.coresPerCpu = coresPerCpu;
	}

	public long getCacheSize() {
		return cacheSize;
	}

	public void setCacheSize(long cacheSize2) {
		this.cacheSize = cacheSize2;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
