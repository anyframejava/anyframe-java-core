/*
 * Copyright 2002-2008 the original author or authors.
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

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.List;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.hyperic.sigar.SigarException;
import org.hyperic.sigar.SigarLoader;
import org.hyperic.sigar.shell.ShellCommandExecException;
import org.hyperic.sigar.shell.ShellCommandUsageException;
import org.junit.Test;
import org.springframework.util.ReflectionUtils;

/**
 * TestCase for SigarAccessor 
 * 
 * @author ByungHun Woo
 *
 */
public class SigarAccessorTest {

	@SuppressWarnings("unchecked")
	@Test
	public void testGatherSysInfo() throws SigarException, IOException, ShellCommandUsageException,
			ShellCommandExecException {
		SysInfo sysInfo = SigarAccessor.gatherSysInfo();
		// SysInfo sysInfo = SigarAccessor.getSysInfo();
		// assertTrue(sysInfo.getNativeInfo().getCurrentFqdn().matches("[\\w|\\.]+"));
		for (Method method : ReflectionUtils.getAllDeclaredMethods(SysInfo.class)) {
			if (method.getName().startsWith("get")) {
				Object obj = ReflectionUtils.invokeMethod(method, sysInfo);
				if (method.getName().equalsIgnoreCase("getFileSystems")) {
					System.out.println("\n== FileSystems start ==");
					for (Object element : (List<Object>) obj) {
						System.out.println(ReflectionToStringBuilder.reflectionToString(element,
								ToStringStyle.MULTI_LINE_STYLE));
					}
					System.out.println("== FileSystems end ==\n");
				}
				else {
					System.out.println(ReflectionToStringBuilder
							.reflectionToString(obj, ToStringStyle.MULTI_LINE_STYLE));
				}
			}
		}
	}

	@Test
	public void testDirectRun() throws Exception {
		// df,du,ls,iostat,free,pargs,penv,pfile,pmodules,pinfo,cpuinfo,ifconfig,uptime,ps,pidof,kill,netstat,netinfo,nfsstat,route,version,mps,sysinfo,time,ulimit,who,service,fversion
		SigarAccessor.directRun("df", new String[] {});
		SigarAccessor.directRun("du", new String[] { "." });
		SigarAccessor.directRun("ls", new String[] { "." });
		SigarAccessor.directRun("iostat", new String[] {});
		SigarAccessor.directRun("free", new String[] {});
		SigarAccessor.directRun("pargs", new String[] {});
		SigarAccessor.directRun("penv", new String[] {});
		SigarAccessor.directRun("pfile", new String[] {});
		SigarAccessor.directRun("pmodules", new String[] {});
		SigarAccessor.directRun("pinfo", new String[] {});
		SigarAccessor.directRun("cpuinfo", new String[] {});
		SigarAccessor.directRun("ifconfig", new String[] {});
		SigarAccessor.directRun("uptime", new String[] {});
		SigarAccessor.directRun("ps", new String[] {});

		SigarCmdTest sigarCmdTest = new SigarCmdTest();
		sigarCmdTest.testTop();
		Thread.sleep(500);
		String topPid = sigarCmdTest.getTopPid();

		SigarAccessor.directRun("pidof", new String[] { topPid });
		SigarAccessor.directRun("kill", new String[] { topPid });

		SigarAccessor.directRun("netstat", new String[] {});
		SigarAccessor.directRun("netinfo", new String[] {});
		SigarAccessor.directRun("nfsstat", new String[] {});
		SigarAccessor.directRun("route", new String[] {});
		SigarAccessor.directRun("version", new String[] {});

		// PTQL
		SigarAccessor.directRun("mps", new String[] { "State.Name.eq=java" });

		SigarAccessor.directRun("sysinfo", new String[] {});
		SigarAccessor.directRun("time", new String[] { "ps" });
		SigarAccessor.directRun("ulimit", new String[] {});
		SigarAccessor.directRun("who", new String[] {});
		if (SigarLoader.IS_WIN32) {
			SigarAccessor.directRun("service", new String[] { "Alerter", "state" });
			SigarAccessor.directRun("fversion", new String[] { "C:\\WINDOWS\\winhelp.exe" });
		}

	}

}
