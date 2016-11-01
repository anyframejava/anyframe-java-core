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

import junit.framework.Test;
import junit.framework.TestResult;
import junit.framework.TestSuite;

import org.hyperic.sigar.test.TestCpu;
import org.hyperic.sigar.test.TestCpuInfo;
import org.hyperic.sigar.test.TestFQDN;
import org.hyperic.sigar.test.TestFileInfo;
import org.hyperic.sigar.test.TestFileSystem;
import org.hyperic.sigar.test.TestHumidor;
import org.hyperic.sigar.test.TestInvoker;
import org.hyperic.sigar.test.TestLoadAverage;
import org.hyperic.sigar.test.TestLog;
import org.hyperic.sigar.test.TestMem;
import org.hyperic.sigar.test.TestNetIf;
import org.hyperic.sigar.test.TestNetInfo;
import org.hyperic.sigar.test.TestNetRoute;
import org.hyperic.sigar.test.TestNetStat;
import org.hyperic.sigar.test.TestNetStatPort;
import org.hyperic.sigar.test.TestNfsClientV2;
import org.hyperic.sigar.test.TestNfsClientV3;
import org.hyperic.sigar.test.TestNfsServerV2;
import org.hyperic.sigar.test.TestNfsServerV3;
import org.hyperic.sigar.test.TestPTQL;
import org.hyperic.sigar.test.TestProcArgs;
import org.hyperic.sigar.test.TestProcEnv;
import org.hyperic.sigar.test.TestProcExe;
import org.hyperic.sigar.test.TestProcFd;
import org.hyperic.sigar.test.TestProcList;
import org.hyperic.sigar.test.TestProcMem;
import org.hyperic.sigar.test.TestProcModules;
import org.hyperic.sigar.test.TestProcStat;
import org.hyperic.sigar.test.TestProcState;
import org.hyperic.sigar.test.TestProcTime;
import org.hyperic.sigar.test.TestResourceLimit;
import org.hyperic.sigar.test.TestSignal;
import org.hyperic.sigar.test.TestSwap;
import org.hyperic.sigar.test.TestTcpStat;
import org.hyperic.sigar.test.TestThreadCpu;
import org.hyperic.sigar.test.TestUptime;
import org.hyperic.sigar.test.TestVMware;
import org.hyperic.sigar.test.TestWho;

/**
 * TestCase provided in Sigar is developed so that it can be executed in
 * TestSuite format. In this case, a simple log is shown to separate the start
 * and end of TestCase.
 * 
 * @author ByungHun Woo
 *
 */
public class SigarCmdTestSuite extends TestSuite {

	@Override
	public void runTest(Test test, TestResult result) {
		System.out.println("\n===" + test.toString() + " start ===");
		super.runTest(test, result);
		System.out.println("===" + test.toString() + " end ===");
	}

	public static Test suite() {
		String javaLibPath = System.getProperty("java.library.path");
		System.setProperty("java.library.path", javaLibPath + ";" + "sigar-bin/lib");
		System.setProperty("sigar.testVerbose", "true");

		// ExtTestSuite suite = new
		// ExtTestSuite(SigarCmdTestSuite.class.getName());
		SigarCmdTestSuite suite = new SigarCmdTestSuite();
		// $JUnit-BEGIN$
		suite.addTestSuite(TestNetIf.class);
		suite.addTestSuite(TestProcExe.class);
		suite.addTestSuite(TestLog.class);
		suite.addTestSuite(TestVMware.class);
		suite.addTestSuite(TestCpu.class);
		suite.addTestSuite(TestUptime.class);
		suite.addTestSuite(TestPTQL.class);
		suite.addTestSuite(TestSwap.class);
		suite.addTestSuite(TestNetRoute.class);
		suite.addTestSuite(TestFQDN.class);
		suite.addTestSuite(TestProcMem.class);
		suite.addTestSuite(TestNetStat.class);
		suite.addTestSuite(TestHumidor.class);
		suite.addTestSuite(TestProcTime.class);
		suite.addTestSuite(TestWho.class);
		suite.addTestSuite(TestNetInfo.class);
		suite.addTestSuite(TestCpuInfo.class);
		suite.addTestSuite(TestFileInfo.class);
		suite.addTestSuite(TestProcList.class);
		suite.addTestSuite(TestProcEnv.class);
		suite.addTestSuite(TestProcState.class);
		suite.addTestSuite(TestInvoker.class);
		suite.addTestSuite(TestProcArgs.class);
		suite.addTestSuite(TestFileSystem.class);
		suite.addTestSuite(TestMem.class);
		suite.addTestSuite(TestProcModules.class);
		suite.addTestSuite(TestLoadAverage.class);
		suite.addTestSuite(TestNfsClientV2.class);
		suite.addTestSuite(TestResourceLimit.class);
		// suite.addTestSuite(TestThreads.class);
		suite.addTestSuite(TestProcFd.class);
		suite.addTestSuite(TestTcpStat.class);
		suite.addTestSuite(TestNfsClientV3.class);
		suite.addTestSuite(TestThreadCpu.class);
		suite.addTestSuite(TestNfsServerV2.class);
		suite.addTestSuite(TestProcStat.class);
		suite.addTestSuite(TestSignal.class);
		suite.addTestSuite(TestNetStatPort.class);
		suite.addTestSuite(TestNfsServerV3.class);
		// $JUnit-END$
		return suite;
	}

}
