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

/**
 * as a ScirptExecutor implementation on Linux platform, extends
 * DefaultScriptExecutor, default Unix implementation.
 * 
 * @author ByungHun Woo
 *
 */
public class LinuxScriptExecutor extends DefaultScriptExecutor {

	private static LinuxScriptExecutor instance = new LinuxScriptExecutor();

	public static ScriptExecutor getInstance() {
		return instance;
	}

	/**
	 * return Total memory information by analyzing Free execution result.
	 * @return Total memory information.
	 */
	public float getMemoryCapacityTotal() {
		String[] commandArr = getProperty("linux.getMemoryCapacity").split(" ");

		String memPattern = "^Mem:\\s+?(\\d+?)\\s+?.*$";
		return Float.parseFloat(processShellFirstMatcher(commandArr, memPattern));
	}

	/**
	 * analyze Free execution result and return the current Used memory
	 * information.
	 * @return the current Used memory information.
	 */
	public float getMemoryCapacityUsed() {
		String[] commandArr = getProperty("linux.getMemoryCapacity").split(" ");

		String memPattern = "^Mem:\\s+?(?:\\d+?)\\s+?(\\d+?)\\s+?.*$";
		return Float.parseFloat(processShellFirstMatcher(commandArr, memPattern));
	}

	/**
	 * analyze free execution result and return the current Free memory
	 * information.
	 * @return the current Free memory information.
	 */
	public float getMemoryCapacityFree() {
		String[] commandArr = getProperty("linux.getMemoryCapacity").split(" ");

		String memPattern = "^Mem:\\s+?(?:\\d+?)\\s+?(?:\\d+?)\\s+?(\\d+?)\\s+?.*$";
		return Float.parseFloat(processShellFirstMatcher(commandArr, memPattern));
	}

}
