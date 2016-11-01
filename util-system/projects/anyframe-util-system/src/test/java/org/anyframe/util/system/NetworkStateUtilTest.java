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

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.anyframe.util.system.sigar.NetworkInfo;
import org.anyframe.util.system.sigar.SigarAccessor;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.hyperic.sigar.SigarException;
import org.hyperic.sigar.shell.ShellCommandExecException;
import org.hyperic.sigar.shell.ShellCommandUsageException;
import org.junit.Before;
import org.junit.Test;

/**
 * TestCase for NetworkStateUtil
 * 
 * @author ByungHun Woo
 *
 */
public class NetworkStateUtilTest {

	@Before
	public void init() throws SigarException, IOException, ShellCommandUsageException, ShellCommandExecException {
		SigarAccessor.gatherSysInfo();
	}

	@Test
	public void testTestPing() {
		assertTrue(NetworkStateUtil.testPing("localhost", 6000));
	}

	@Test
	public void testGetNetworkInfoList() {
		assertNotNull(NetworkStateUtil.getNetworkInfoList());
		Map<String, NetworkInfo> networkInfoMap = NetworkStateUtil.getNetworkInfoList();
		Set<String> keySet = networkInfoMap.keySet();
		Iterator<String> iterator = keySet.iterator();

		while (iterator.hasNext()) {
			String key = iterator.next();
			NetworkInfo processInfo = networkInfoMap.get(key);
			System.out.println(ReflectionToStringBuilder
					.reflectionToString(processInfo, ToStringStyle.MULTI_LINE_STYLE));
		}
	}

	@Test
	public void testGetNetworkInfo() {
		NetworkInfo networkInfo = NetworkStateUtil.getMyIPInfo();
		System.out.println(ReflectionToStringBuilder.reflectionToString(networkInfo, ToStringStyle.MULTI_LINE_STYLE));
		assertNotNull(networkInfo);
	}

	@Test
	public void testGetMyIPList() {
		List<String> ips = NetworkStateUtil.getMyIPList();
		for (String ip : ips) {
			System.out.println(ip);
		}
		assertNotNull(ips);
	}

	@Test
	public void testGetMyIPInfo() {
		NetworkInfo networkInfo = NetworkStateUtil.getMyIPInfo();
		System.out.println(ReflectionToStringBuilder.reflectionToString(networkInfo, ToStringStyle.MULTI_LINE_STYLE));
		assertNotNull(networkInfo);
	}

	@Test
	public void testGetMyMacAddressList() {
		List<String> macs = NetworkStateUtil.getMyMacAddressList();
		for (String mac : macs) {
			System.out.println(mac);
		}
		assertNotNull(macs);
	}

	@Test
	public void testGetPortScan() {
		List<String> portScan = NetworkStateUtil.getPortScan();
		// System.out.print(join(portScan, 5));
		for (String line : portScan) {
			System.out.println(line);
		}
		assertNotNull(portScan);
		assertTrue(portScan.size() > 2);
	}

	@Test
	public void testGetRoute() {
		List<String> routes = NetworkStateUtil.getRoute();
		for (String line : routes) {
			System.out.println(line);
		}
		assertNotNull(routes);
	}

}
