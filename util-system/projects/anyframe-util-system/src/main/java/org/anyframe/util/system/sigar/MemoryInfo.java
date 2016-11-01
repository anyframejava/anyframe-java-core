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
 * This MemoryInfo class is a Value Object class for memory information.
 * 
 * @author ByungHun Woo
 */
public class MemoryInfo implements Serializable {

	private static final long serialVersionUID = -359467076937539463L;

	private long memTotal;

	private long memUsed;

	private long memFree;

	private long actualUsed;

	private long actualFree;

	private long swapTotal;

	private long swapUsed;

	private long swapFree;

	private long ram;

	public long getMemTotal() {
		return memTotal;
	}

	public void setMemTotal(long memTotal) {
		this.memTotal = memTotal;
	}

	public long getMemUsed() {
		return memUsed;
	}

	public void setMemUsed(long memUsed) {
		this.memUsed = memUsed;
	}

	public long getMemFree() {
		return memFree;
	}

	public void setMemFree(long memFree) {
		this.memFree = memFree;
	}

	public long getActualUsed() {
		return actualUsed;
	}

	public void setActualUsed(long actualUsed) {
		this.actualUsed = actualUsed;
	}

	public long getActualFree() {
		return actualFree;
	}

	public void setActualFree(long actualFree) {
		this.actualFree = actualFree;
	}

	public long getSwapTotal() {
		return swapTotal;
	}

	public void setSwapTotal(long swapTotal) {
		this.swapTotal = swapTotal;
	}

	public long getSwapUsed() {
		return swapUsed;
	}

	public void setSwapUsed(long swapUsed) {
		this.swapUsed = swapUsed;
	}

	public long getSwapFree() {
		return swapFree;
	}

	public void setSwapFree(long swapFree) {
		this.swapFree = swapFree;
	}

	public long getRam() {
		return ram;
	}

	public void setRam(long ram) {
		this.ram = ram;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
