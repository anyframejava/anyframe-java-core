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
package org.anyframe.util.scripts;

import java.util.List;

import org.anyframe.util.system.SystemInfoUtil.MemRegion;

/**
 * define the function to be executed with Shell Script.
 * 
 * @author ByungHun Woo
 *
 */
public interface ScriptExecutor {

	/**
	 * return the execution result of dir command on targetDir.
	 * @param targetDir target directory
	 * @return the execution result of ls command
	 */
	public List<String> getDirInformation(String targetDir);

	/**
	 * return the directory size under targetDir received as a
	 * parameter.
	 * @param targetDir target directory
	 * @return the directory size under targetDir
	 */
	public String getDirSizeStr(String targetDir);

	/**
	 * return mac address of the current system.
	 * @return mac address of the current system.
	 */
	public String getMacAddress();

	/**
	 * return the execution result of port scanning.
	 * @return the execution result of port scanning.
	 */
	public List<String> getPortScan();

	/**
	 * return the current Total/Used/Free memory information according to the
	 * enum type received as a parameter.
	 * @param memRegion the region of memory
	 * @return return the current Total/Used/Free memory information.
	 */
	public float getMemoryCapacity(MemRegion memRegion);

}
