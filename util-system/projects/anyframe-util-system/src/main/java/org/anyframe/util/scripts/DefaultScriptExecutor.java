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

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.anyframe.exception.BaseRuntimeException;
import org.anyframe.util.system.ScriptPropertiesLoader;
import org.anyframe.util.system.SystemInfoUtil.MemRegion;
import org.anyframe.util.system.SystemUtilBase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * default implementation of ScriptExecutor which defines the function to be
 * executed by Shell Script. default implementation was written by Unix command
 * execution.
 *
 * @author ByungHun Woo 
 *
 */
public class DefaultScriptExecutor extends SystemUtilBase implements ScriptExecutor {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DefaultScriptExecutor.class);

	private static final DefaultScriptExecutor INSTANCE = new DefaultScriptExecutor();

	public static ScriptExecutor getInstance() {
		return INSTANCE;
	}

	private static OsType os;

	private static Properties scripts = new Properties();

	// TODO : improve setting way
	private static boolean isUserSpecified;

	static {

		// properties loading
		ScriptPropertiesLoader loader = new ScriptPropertiesLoader();
		loader.load();
		if (loader.isLoaded()) {
			scripts = loader.getScripts();
		}

		isUserSpecified = scripts.getProperty("userSpecifiedOS") != null;

		// OS check
		String osName = System.getProperty("os.name");
		// when defining OsType, only alphabet and numeric were used and there
		// is no space.
		// therefore, removed the following \W (Not an alpha numeric).
		osName = osName.replaceAll("\\W", "");
		if (osName == null) {
			os = OsType.Other;
		}
		else if (isUserSpecified) {
			os = OsType.UserSpecified;
		}
		else {
			for (OsType osType : OsType.values()) {
				if (osName.equalsIgnoreCase(osType.toString())) {
					os = osType;
					break;
				}
			}
			if (os == null) {
				if(osName.toLowerCase().contains("windows")) {
					os = OsType.Windows;
				} else {
					os = OsType.Other;
				}
			}
		}
	}

	/**
	 * template method for shell script
	 * @param <T>
	 * @param commandArr array of commands
	 * @param action shell script callback class
	 * @return the console output result
	 */
	public final static <T> T processShell(String[] commandArr, ShellScriptCallback<T> action) {
		InputStream inputStream = null;
		BufferedReader br = null;
		PrintWriter out = null;
		Process p = null;
		try {
			p = Runtime.getRuntime().exec(os.is(OsType.Windows) ? commandArr : new String[] { "/bin/sh" });
			inputStream = new DataInputStream(p.getInputStream());
			if (os.is(OsType.Windows)) {
				br = new BufferedReader(new InputStreamReader(inputStream, "EUC-KR"));
			}
			else {
				br = new BufferedReader(new InputStreamReader(inputStream));
			}

			if (!os.is(OsType.Windows)) {
				out = new PrintWriter(p.getOutputStream());
				out.println(concatStrArray(commandArr));
				out.close();
			}

			return action.doInProcessShell(br);

		}
		catch (IOException e) {
			throw new BaseRuntimeException("processShell IOException occured : " + e.getMessage(), e);
		}
		catch (RuntimeException re) {
			throw re;
		}
		catch (Exception e) {
			throw new BaseRuntimeException("processShell IOException occured : " + e.getMessage(), e);
		}
		finally {
			if (inputStream != null)
				try {
					inputStream.close();
				}
				catch (IOException e) {
					LOGGER.error("processShell Exception occured : " + e.getMessage(), e);
				}
			if (br != null)
				try {
					br.close();
				}
				catch (IOException e) {
					LOGGER.error("processShell Exception occured : " + e.getMessage(), e);
				}
			if (out != null) {
				out.close();
			}
			if (p != null) {
				p.destroy();
			}
		}
	}

	/**
	 * shell script Callback interface. when executing shell script, implement
	 * individual main logic to doInProcessShell.
	 *
	 * @author woos41
	 *
	 * @param <T>
	 */
	public interface ShellScriptCallback<T> {
		public T doInProcessShell(BufferedReader reader) throws Exception;
	}

	/**
	 * return the basic console output result executing shell script in
	 * List<String> format.
	 * @param commandArr array of commands
	 * @return the basic console output result
	 */
	protected static List<String> getDirectResult(String[] commandArr) {
		final List<String> result = new ArrayList<String>();

		return processShell(commandArr, new ShellScriptCallback<List<String>>() {
			public List<String> doInProcessShell(BufferedReader br) throws Exception {
				String presentLine;
				while ((presentLine = br.readLine()) != null) {
					result.add(presentLine);
				}
				return result;
			}
		});
	}

	/**
	 * current system OS (enum type)
	 * @return type of os
	 */
	public static OsType getOs() {
		return os;
	}

	public static void setOs(OsType os) {
		DefaultScriptExecutor.os = os;
	}

	/**
	 * set Properties which loaded scripts.propertis files.
	 * @param scripts scripts
	 */
	public static void setScripts(Properties scripts) {
		DefaultScriptExecutor.scripts = scripts;
	}

	public static Properties getScripts() {
		return DefaultScriptExecutor.scripts;
	}

	/**
	 * get shell script execution command which is divided into key and value in
	 * scripts.properties.
	 * @param key the key of property
	 * @return shell script execution command
	 */
	public static String getProperty(String key) {
		if (scripts.containsKey(key)) {
			return scripts.getProperty(key);
		}
		else {
			throw new IllegalStateException("property key [" + key + "] does not exists");
		}
	}

	/**
	 * reusage method block which provides script execution and result handling
	 * by getting shell script execution command and regular expression
	 * (searching first back reference group)
	 *
	 * @param commandArr array of commands
	 * @param patternStr regular expression pattern
	 * @return the console output result
	 */
	protected String processShellFirstMatcher(String[] commandArr, final String patternStr) {
		return processShell(commandArr, new ShellScriptCallback<String>() {
			public String doInProcessShell(BufferedReader br) throws Exception {
				String presentLine;
				Pattern pattern = Pattern.compile(patternStr);

				Matcher matcher = null;
				while ((presentLine = br.readLine()) != null) {
					matcher = pattern.matcher(presentLine);
					if (matcher.matches()) {
						return matcher.group(1);
					}
				}
				return "unknown";
			}
		});
	}

	/**
	 * reusage method block which provides (created to limit the result of pipe
	 * line, awk combination, etc. on execution command exactly)script execution
	 * and result handling.
	 *
	 * @param commandArr array of commands
	 * @return the console output result
	 */
	protected String processShellExactResult(String[] commandArr) {
		return processShell(commandArr, new ShellScriptCallback<String>() {
			public String doInProcessShell(BufferedReader br) throws Exception {
				String presentLine;
				while ((presentLine = br.readLine()) != null) {
					if (presentLine != null) {
						return presentLine;
					}
				}
				return "unknown";
			}
		});
	}

	/**
	 * return the execution result of 1s command on targetDir received as a
	 * parameter.
	 * @param targetDir target directory
	 * @return the execution result of ls command
	 */
	public List<String> getDirInformation(String targetDir) {
		String[] commandArr = getProperty("unix.getDirInformation").replaceAll("\\$1", targetDir).split(" ");

		return getDirectResult(commandArr);
	}

	/**
	 * return the execution result of du command under targetDir received as a
	 * parameter.
	 * @param targetDir target directory
	 * @return the execution result of du command
	 */
	public String getDirSizeStr(String targetDir) {

		String[] commandArr = getProperty("unix.getDirSizeStr").replaceAll("\\$1", targetDir).split(" ");

		List<String> result = getDirectResult(commandArr);
		if (!result.isEmpty()) {
			String totalSizeStr = result.get(result.size() - 1);
			return totalSizeStr.split("\\s+")[0];
		}
		return "unknown";
	}

	/**
	 * by analyzing the execution result of ifconfig return mac address of the
	 * current system.
	 * @return mac address of the current system
	 */
	public String getMacAddress() {
		String[] commandArr = getProperty("unix.getMacAddress").split(" ");

		String macAddressPattern = ".*?(\\p{XDigit}{2}:\\p{XDigit}{2}:\\p{XDigit}{2}:\\p{XDigit}{2}:\\p{XDigit}{2}:\\p{XDigit}{2}).*";
		return processShellFirstMatcher(commandArr, macAddressPattern);
	}

	/**
	 * return the execution result of netstat.
	 * @return the execution result of netstat.
	 */
	public List<String> getPortScan() {
		String[] commandArr = getProperty("unix.getPortScan").split(" ");

		return getDirectResult(commandArr);
	}

	/**
	 * return the current Total/Used/Free memory information according to the
	 * enum type received as a parameter.
	 * @param memRegion the region of memory
	 * @return return the current Total/Used/Free memory information
	 */
	public float getMemoryCapacity(MemRegion memRegion) {
		switch (memRegion) {
		case Total:
			return getMemoryCapacityTotal();
		case Used:
			return getMemoryCapacityUsed();
		case Free:
			return getMemoryCapacityFree();
		}
		return 0;
	}

	/**
	 * by analyzing the execution result of vmstat, return the Total memory
	 * information.
	 * @return the Total memory information.
	 */
	public float getMemoryCapacityTotal() {
		String[] commandArr = getProperty("unix.getMemoryCapacityTotal").split(" ");

		return Float.parseFloat(processShellExactResult(commandArr));
	}

	/**
	 * by analyzing the execution result of vmstat, return the Used memory
	 * information.
	 * @return the Used memory information.
	 */
	public float getMemoryCapacityUsed() {
		String[] commandArr = getProperty("unix.getMemoryCapacityUsed").split(" ");

		return Float.parseFloat(processShellExactResult(commandArr));
	}

	/**
	 * by analyzing the execution result of vmstat, return the Free memory
	 * information.
	 * @return the Free memory information.
	 */
	public float getMemoryCapacityFree() {
		String[] commandArr = getProperty("unix.getMemoryCapacityFree").split(" ");

		return Float.parseFloat(processShellExactResult(commandArr));
	}

}
