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

/**
 * as a ScirptExecutor implementation on Windows platform, extends
 * DefaultScriptExecutor, default Unix implementation.
 * 
 * @author ByungHun Woo
 *
 */
public class WindowsScriptExecutor extends DefaultScriptExecutor {

	private static WindowsScriptExecutor instance = new WindowsScriptExecutor();

	public static ScriptExecutor getInstance() {
		return instance;
	}

	/**
	 * return the execution result of dir command on targetDir received as a
	 * parameter.
	 * @param targetDir target directory
	 * @return the execution result of ls command
	 */
	public List<String> getDirInformation(String targetDir) {
		String[] commandArr = getProperty("windows.getDirInformation").replaceAll("\\$1", targetDir).split(" ");

		return getDirectResult(commandArr);
	}

	/**
	 * by analyzing dir /s command execution result, get the total size under targetDir (Note that is it text!)
	 * @param targetDir target directory
	 * @return the total size under targetDir
	 */
	public String getDirSizeStr(String targetDir) {

		String[] commandArr = getProperty("windows.getDirSizeStr").replaceAll("\\$1", targetDir).split(" ");

		List<String> result = getDirectResult(commandArr);
		if (!result.isEmpty()) {
			String totalSizeStr = result.get(result.size() - 2);
			return totalSizeStr.split("\\s+")[3];
		}
		return "unknown";
	}
	
	/**
	 * by analyzing the execution result of ipconfig /all command, and get mac address.
	 * @return mac address
	 */
	public String getMacAddress() {
		String[] commandArr = getProperty("windows.getMacAddress").split(" ");

		String macAddressPattern = ".*?(\\p{XDigit}{2}-\\p{XDigit}{2}-\\p{XDigit}{2}-\\p{XDigit}{2}-\\p{XDigit}{2}-\\p{XDigit}{2})";
		return processShellFirstMatcher(commandArr, macAddressPattern);
	}

	/**
	 * return the execution result of netstat command.
	 * @return the execution result of netstat command
	 */
	public List<String> getPortScan() {
		String[] commandArr = getProperty("windows.getPortScan").split(" ");

		return getDirectResult(commandArr);
	}

	/**
	 * by analyzing the execution result of systeminfo command and return the Total memory information.
	 * @return the Total memory information.
	 */
	public float getMemoryCapacityTotal() {
		String[] commandArr = getProperty("windows.getMemoryCapacity").split(" ");

		List<String> result = getDirectResult(commandArr);
		for (String tmp : result) {
			if (tmp.indexOf("총 실제 메모리") >= 0) {
				if (tmp.indexOf("MB") > 0) {
					return Float.parseFloat(tmp.replaceAll("\\D", "")) * 1024 * 1024;
				}
				else if (tmp.indexOf("GB") > 0) {
					return Float.parseFloat(tmp.replaceAll("\\D", "")) * 1024 * 1024 * 1024;
				}
			}
		}

		return -1;
	}

	/**
	 * Total - Free memory size = return Used memory information.
	 * @return the Used memory information.
	 */
	public float getMemoryCapacityUsed() {
		return getMemoryCapacityTotal() - getMemoryCapacityFree();
	}

	/**
	 * By analyzing the execution result of systeminfo command, return the current Used memory information.
	 */
	/**
	 * By analyzing the execution result of systeminfo command, return the current Used memory information.
	 * @return the current Used memory information.
	 */
	public float getMemoryCapacityFree() {
		String[] commandArr = getProperty("windows.getMemoryCapacity").split(" ");

		List<String> result = getDirectResult(commandArr);
		for (String tmp : result) {
			if (tmp.indexOf("사용 가능한 실제 메모리") >= 0) {
				if (tmp.indexOf("MB") > 0) {
					return Float.parseFloat(tmp.replaceAll("\\D", "")) * 1024 * 1024;
				}
				else if (tmp.indexOf("GB") > 0) {
					return Float.parseFloat(tmp.replaceAll("\\D", "")) * 1024 * 1024 * 1024;
				}
			}
		}

		return -1;
	}

}
