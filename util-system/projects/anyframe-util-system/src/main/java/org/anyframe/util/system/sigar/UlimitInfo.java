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
 * This UlimitInfo class is a Value Object class for ulimit information.
 * 
 * @author ByungHun Woo
 */
public class UlimitInfo implements Serializable {

	private static final long serialVersionUID = -26830638113571501L;

	private String coreFileSize;

	private String dataSegSize;

	private String fileSize;

	private String pipeSize;

	private String memory;

	private String openFiles;

	private String stackSize;

	private String cpuTime;

	private String maxUserProcesses;

	private String virtualMemory;

	public String getCoreFileSize() {
		return coreFileSize;
	}

	public void setCoreFileSize(String coreFileSize) {
		this.coreFileSize = coreFileSize;
	}

	public String getDataSegSize() {
		return dataSegSize;
	}

	public void setDataSegSize(String dataSegSize) {
		this.dataSegSize = dataSegSize;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}

	public String getPipeSize() {
		return pipeSize;
	}

	public void setPipeSize(String pipeSize) {
		this.pipeSize = pipeSize;
	}

	public String getMemory() {
		return memory;
	}

	public void setMemory(String memory) {
		this.memory = memory;
	}

	public String getOpenFiles() {
		return openFiles;
	}

	public void setOpenFiles(String openFiles) {
		this.openFiles = openFiles;
	}

	public String getStackSize() {
		return stackSize;
	}

	public void setStackSize(String stackSize) {
		this.stackSize = stackSize;
	}

	public String getCpuTime() {
		return cpuTime;
	}

	public void setCpuTime(String cpuTime) {
		this.cpuTime = cpuTime;
	}

	public String getMaxUserProcesses() {
		return maxUserProcesses;
	}

	public void setMaxUserProcesses(String maxUserProcesses) {
		this.maxUserProcesses = maxUserProcesses;
	}

	public String getVirtualMemory() {
		return virtualMemory;
	}

	public void setVirtualMemory(String virtualMemory) {
		this.virtualMemory = virtualMemory;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
