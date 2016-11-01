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
 * This ProcessExeInfo class is a Value Object class for process information.
 * 
 * @author ByungHun Woo
 */
public class ProcessInfo implements Serializable {

	private static final long serialVersionUID = 12347612312167378L;

	private ProcessCpuInfo processCpuInfo;

	private ProcessExeInfo processExeInfo;

	private ProcessStateInfo processStateInfo;

	private ProcessMemoryInfo processMemoryInfo;

	public ProcessCpuInfo getProcessCpuInfo() {
		return processCpuInfo;
	}

	public void setProcessCpuInfo(ProcessCpuInfo processCpuInfo) {
		this.processCpuInfo = processCpuInfo;
	}

	public ProcessExeInfo getProcessExeInfo() {
		return processExeInfo;
	}

	public void setProcessExeInfo(ProcessExeInfo processExeInfo) {
		this.processExeInfo = processExeInfo;
	}

	public ProcessStateInfo getProcessStateInfo() {
		return processStateInfo;
	}

	public void setProcessStateInfo(ProcessStateInfo processStateInfo) {
		this.processStateInfo = processStateInfo;
	}

	public ProcessMemoryInfo getProcessMemoryInfo() {
		return processMemoryInfo;
	}

	public void setProcessMemoryInfo(ProcessMemoryInfo processMemoryInfo) {
		this.processMemoryInfo = processMemoryInfo;
	}
}
