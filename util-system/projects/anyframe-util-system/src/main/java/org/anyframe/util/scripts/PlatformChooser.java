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
 * automatically search shell script execution handling module by platform
 * implementing ScriptExecutor according to OsType.
 * 
 * @author ByungHun Woo
 * 
 */
public class PlatformChooser {

	/**
	 * return ScriptExecutor implementation according to the current OS.
	 * @return ScriptExecutor implementation according to the current OS.
	 */
	public static ScriptExecutor getScriptExecutor() {
		return getScriptExecutor(DefaultScriptExecutor.getOs());
	}

	/**
	 * return ScriptExecutor implementation according to OsType.
	 * @param osType os type
	 * @return ScriptExecutor implementation according to OsType.
	 */
	public static ScriptExecutor getScriptExecutor(OsType osType) {
		ScriptExecutor scriptExecutor = null;
		switch (osType) {

		case Windows:
		case Windows95:
		case Windows98:
		case WindowsMe:
		case WindowsNT:
		case WindowsNTServer:
		case WindowsNTWorkstation:
		case Windows2000:
		case Windows2000Server:
		case Windows2000Workstation:
		case WindowsXp:
		case WindowsVista:
		case Windows2003:
		case Windows7:
			scriptExecutor = WindowsScriptExecutor.getInstance();
			break;

		case Linux:
			scriptExecutor = LinuxScriptExecutor.getInstance();
			break;

		case MacOsX:
			scriptExecutor = MacOsXScriptExecutor.getInstance();
			break;

		default:
			scriptExecutor = DefaultScriptExecutor.getInstance();
			break;
		}

		return scriptExecutor;
	}

}
