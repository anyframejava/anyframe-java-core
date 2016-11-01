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

import java.io.BufferedReader;

import org.anyframe.util.scripts.DefaultScriptExecutor;
import org.anyframe.util.scripts.OsType;
import org.hyperic.sigar.ProcExe;
import org.hyperic.sigar.ProcUtil;
import org.hyperic.sigar.SigarException;
import org.hyperic.sigar.cmd.Ls;
import org.hyperic.sigar.cmd.Netstat;
import org.hyperic.sigar.cmd.Nfsstat;
import org.hyperic.sigar.cmd.Who;
import org.hyperic.sigar.cmd.Win32Service;
import org.junit.Before;
import org.junit.Test;

/**
 * Developed so that it can be executed in test case format to easily check the
 * java implementation execution example (org.hyperic.sigar.cmd package child
 * class-not TestCase but general java class, will execute main method) that has
 * a similar function to the command line command provided in Sigar.
 * 
 * @author ByungHun Woo
 * 
 */
public class SigarCmdTest {

	@Before
	public void init() {
		String javaLibPath = System.getProperty("java.library.path");
		System.setProperty("java.library.path", javaLibPath + ";" + SigarAccessor.DEFAULT_SIGAR_LIB_PATH);
	}

	@Test
	public void testLs() throws Exception {
		Ls.main(new String[] { "." });
	}

	@Test
	public void testTop() throws Exception {
		new Thread() {
			public void run() {
				long[] tempPidList;
				try {
					tempPidList = SigarAccessor.getInstance().getSigar().getProcList();

					int length = tempPidList.length;
					String[] args = new String[length];
					for (int i = 0; i < length; i++) {
						args[i] = String.valueOf(tempPidList[i]);
					}
					// Top.main(args);
					String concat = "";
					for (String concatTemp : args) {
						concat += " " + concatTemp;
					}
					String command = "java -classpath \"sigar-bin/lib/sigar.jar\" org.hyperic.sigar.cmd.Top" + concat;
					TempScriptExecutor.justPrint(command.split(" "));
				}
				catch (SigarException e) {
					e.printStackTrace();
				}
			}
		}.start();
	}

	private static class TempScriptExecutor extends DefaultScriptExecutor {
		public static void justPrint(String[] commandArr) {
			processShell(commandArr, new ShellScriptCallback<Object>() {
				public Object doInProcessShell(BufferedReader br) throws Exception {
					String presentLine;
					while ((presentLine = br.readLine()) != null) {
						System.out.println(presentLine);
					}
					return null;
				}
			});
		}
	}

	@Test
	public void testCpuInfo() throws Exception {
		org.hyperic.sigar.cmd.CpuInfo.main(new String[] {});
	}

	@Test
	public void testDf() throws Exception {
		org.hyperic.sigar.cmd.Df.main(new String[] {});
	}

	@Test
	public void testDu() throws Exception {
		org.hyperic.sigar.cmd.Du.main(new String[] { "." });
	}

	@Test
	public void testFree() throws Exception {
		org.hyperic.sigar.cmd.Free.main(new String[] {});
	}

	@Test
	public void testIfconfig() throws Exception {
		org.hyperic.sigar.cmd.Ifconfig.main(new String[] {});
	}

	@Test
	public void testIostat() throws Exception {
		org.hyperic.sigar.cmd.Iostat.main(new String[] {});
	}

	// @Test
	// public void testMemWatch() throws Exception {
	// new Thread() {
	// public void run() {
	// try {
	// org.hyperic.sigar.cmd.MemWatch.main(new String[] { getTopPid() });
	// }
	// catch (Exception e) {
	// e.printStackTrace();
	// }
	// }
	// }.start();
	// }

	@Test
	public void testKill() throws Exception {
		// kill Top executed as a special process above
		String topPid = getTopPid();

		// org.hyperic.sigar.cmd.Kill.main(new String[] {
		// ManagementFactory.getRuntimeMXBean().getName()
		// .replaceAll("\\D", "") });
		org.hyperic.sigar.cmd.Kill.main(new String[] { topPid });
	}

	public String getTopPid() throws SigarException {
		String topPid = "";
		ProcExe procExe = null;
		for (long pid : SigarAccessor.getInstance().getSigar().getProcList()) {
			try {
				procExe = SigarAccessor.getInstance().getSigar().getProcExe(pid);
				if (procExe.getName().contains("java")) {
					if (ProcUtil.getDescription(SigarAccessor.getInstance().getSigar(), pid).contains(
							"org.hyperic.sigar.cmd.Top")) {
						topPid = String.valueOf(pid);
						break;
					}
				}
			}
			// to pass when exception occurs while searching process information such as incops
			catch (Exception e) {
				System.out.println("pid:" + pid + " excecption occurred - " + e.getMessage());
			}
		}
		return topPid;
	}

	@Test
	public void testNetInfo() throws Exception {
		org.hyperic.sigar.cmd.NetInfo.main(new String[] {});
	}

	@Test
	public void testNetstat() throws Exception {
		// org.hyperic.sigar.cmd.Netstat.main(new String[] { });
		Netstat netstat = new Netstat();
		netstat.output(new String[] {});
		netstat.flush();
	}

	@Test
	public void testNfsstat() throws Exception {
		Nfsstat nfsstat = new Nfsstat();
		nfsstat.output(new String[] {});
	}

	@Test
	public void testProcInfo() throws Exception {
		org.hyperic.sigar.cmd.ProcInfo.main(new String[] {});
	}

	@Test
	public void testProcModuleInfo() throws Exception {
		org.hyperic.sigar.cmd.ProcModuleInfo.main(new String[] {});
	}

	@Test
	public void testProcPs() throws Exception {
		org.hyperic.sigar.cmd.Ps.main(new String[] {});
	}

	@Test
	public void testRoute() throws Exception {
		org.hyperic.sigar.cmd.Route.main(new String[] {});
	}

	@Test
	public void testVersion() throws Exception {
		org.hyperic.sigar.cmd.Version.main(new String[] {});
	}

	// @Test
	// public void testWatch() throws Exception {
	// org.hyperic.sigar.cmd.Watch.main(new String[] { });
	// }

	@Test
	public void testWho() throws Exception {
		// org.hyperic.sigar.cmd.Who.main(new String[] { });
		Who who = new Who();
		who.output(new String[] {});
		who.flush();
	}

	@Test
	public void testWin32Service() throws Exception {
		if (DefaultScriptExecutor.getOs().is(OsType.Windows)) {
			Win32Service win32Service = new Win32Service();
			win32Service.output(new String[] { "Alerter" });
			// Service service = new Service("ClipSrv");
			// service.list(System.out);
		}
	}

}
