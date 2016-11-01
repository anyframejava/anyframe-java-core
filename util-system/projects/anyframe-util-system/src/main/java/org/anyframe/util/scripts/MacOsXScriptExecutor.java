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
 * as a ScirptExecutor implementation on Mac OS x platform, extends
 * DefaultScriptExecutor, default Unix implementation.
 * 
 * @author ByungHun Woo
 *
 */
public class MacOsXScriptExecutor extends DefaultScriptExecutor {

	private static MacOsXScriptExecutor instance = new MacOsXScriptExecutor();

	public static ScriptExecutor getInstance() {
		return instance;
	}

	/**
	 * return Total memory information by analyzing sysctl execution result.
	 * @return Total memory information.
	 */
	public float getMemoryCapacityTotal() {
		String[] commandArr = getProperty("macosx.getMemoryCapacityTotal").split(" ");

		return Float.parseFloat(processShellExactResult(commandArr).replaceAll("\\D", ""));
	}

	/**
	 * Total - Free memory size = return Used memory information.
	 * @return Used memory information.
	 */
	public float getMemoryCapacityUsed() {
		return getMemoryCapacityTotal() - getMemoryCapacityFree();
	}

	/**
	 * return current Free memory information by analyzing vm_stat execution result.
	 * @return current Free memory information.
	 */
	public float getMemoryCapacityFree() {
		String[] commandArr = getProperty("macosx.getMemoryCapacityFree").split(" ");

		return Float.parseFloat(processShellExactResult(commandArr));
	}

}
