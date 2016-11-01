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
package org.anyframe.util.system;

import java.io.IOException;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.anyframe.util.system.sigar.NetworkInfo;
import org.anyframe.util.system.sigar.SigarAccessor;
import org.hyperic.sigar.SigarException;
import org.hyperic.sigar.shell.ShellCommandExecException;
import org.hyperic.sigar.shell.ShellCommandUsageException;

/**
 * Network State Utility Class <br>
 * Network state or basic function search
 * 
 * @author HyunJung Jeong
 * @author ByungHun Woo
 * 
 */
public class NetworkStateUtil extends SystemUtilBase {

	/**
	 * Check network state.
	 * @param destHost ip address
	 * @param timeout test time for arriving on time in milliseconds
	 * @return if arrived on time, <code>true</code> or <code>false</code>
	 * @see InetAddress#getByName(String)
	 * @see InetAddress#isReachable(int)
	 */
	public static boolean testPing(final String destHost, final int timeout) {
		return processIO(new IOCallback<Boolean>() {
			public Boolean doInProcessIO() throws IOException {
				return InetAddress.getByName(destHost).isReachable(timeout);
			}
		});
	}

	/**
	 * Search ip, mac, network mask, etc. for entire network list
	 * 
	 * @return network information
	 */
	public static Map<String, NetworkInfo> getNetworkInfoList() {
		return processIO(new IOCallback<Map<String, NetworkInfo>>() {
			public Map<String, NetworkInfo> doInProcessIO() throws IOException, SigarException {
				return SigarAccessor.getSysInfo().getNetworkInfoMap();
			}
		});
	}

	/**
	 * Return information that has the same format as NetInfo execution result
	 * 
	 * @return network information
	 */
	public static NetworkInfo getMyIPInfo() {
		return processIO(new IOCallback<NetworkInfo>() {
			public NetworkInfo doInProcessIO() throws IOException, SigarException {
				return SigarAccessor.getSysInfo().getNetworkInfo();
			}
		});
	}

	/**
	 * ip list for entire network list
	 * 
	 * @return ip list
	 */
	public static List<String> getMyIPList() {
		return processIO(new IOCallback<List<String>>() {
			public List<String> doInProcessIO() throws IOException, SigarException {
				Map<String, NetworkInfo> networkInfoMap = SigarAccessor.getSysInfo().getNetworkInfoMap();
				List<String> myIPList = new ArrayList<String>();

				Set<String> keySet = networkInfoMap.keySet();
				Iterator<String> iterator = keySet.iterator();

				while (iterator.hasNext()) {
					String key = iterator.next();
					NetworkInfo networkInfo = networkInfoMap.get(key);

					myIPList.add(networkInfo.getAddress());
				}
				return myIPList;
			}
		});
	}

	/**
	 * Mac Address list for entire network list
	 * 
	 * @return Mac Address list
	 */
	public static List<String> getMyMacAddressList() {
		return processIO(new IOCallback<List<String>>() {
			public List<String> doInProcessIO() throws IOException, SigarException {
				Map<String, NetworkInfo> networkInfoMap = SigarAccessor.getSysInfo().getNetworkInfoMap();
				List<String> myIPList = new ArrayList<String>();

				Set<String> keySet = networkInfoMap.keySet();
				Iterator<String> iterator = keySet.iterator();

				while (iterator.hasNext()) {
					String key = iterator.next();
					NetworkInfo networkInfo = networkInfoMap.get(key);

					myIPList.add(networkInfo.getHwaddr());
				}
				return myIPList;
			}
		});
	}

	/**
	 * Return information that has the same format as NetStat execution result
	 * @return
	 */
	public static List<String> getPortScan() {
		return getPortScan(new String[] { "a", "p" });
	}
	
	/**
	 * Return information that has the same format as NetStat execution result
	 * 
	 * @param args Netstat option supported in Sigar ("l", "a", "n", "p", "s", "t", "u",
	 * "w", "x")
	 * @return netstat information
	 */
	public static List<String> getPortScan(final String[] args) {
		return processIO(new IOCallback<List<String>>() {
			public List<String> doInProcessIO() throws IOException, SigarException, Exception {
				return SigarAccessor.getNetStat(args);
			}
		});
	}

	/**
	 * Return information that has the same format as Route execution result
	 * 
	 * @return route list
	 */
	public static List<String> getRoute() {
		return processIO(new IOCallback<List<String>>() {
			public List<String> doInProcessIO() throws IOException, SigarException, ShellCommandUsageException,
					ShellCommandExecException {
				return SigarAccessor.getNetworkRouteInfo();
			}
		});
	}

}
