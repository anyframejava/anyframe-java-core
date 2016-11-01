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

import static org.junit.Assert.assertFalse;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.hyperic.sigar.FileWatcherThread;
import org.hyperic.sigar.SigarException;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * TestCase for FileMonitor that provides directory monitoring function. Is
 * executed through a special Thread handling to check test execution or
 * results.
 * 
 * @author ByungHun Woo
 * 
 */
public class FileMonitorTest {

	// @Before
	// public void init() throws IOException {
	// FileUtils.deleteQuietly(new File("test"));
	// FileUtils.writeStringToFile(new File("test/default.txt"),
	// "test 試験 てすと テスト ﾃｽﾄ 테스트\n", "UTF-8");
	// }

	private void init(String targetDir) throws IOException {
		// init
		FileUtils.deleteQuietly(new File(targetDir));
		FileUtils.writeStringToFile(new File(targetDir, "default.txt"),
				"test 試験 てすと テスト ﾃｽﾄ 테스트\n", "UTF-8");
	}

	@Test
	public void testFileMonitorFailure() {
		String targetDir = "notexist";
		// Returns false when defining a Directory that does not exist.
		// Note that FileWatcher Thread does not start
		assertFalse(FileMonitor.startSingleton(targetDir, 5000));
	}

	@Test
	public void testFileMonitorSingleton() throws IOException,
			InterruptedException {
		String targetDir = "test";
		init(targetDir);

		FileMonitor.startSingleton(targetDir, 5000);

		someFileProcessing(targetDir);

		Thread.sleep(20 * 1000);

		FileMonitor.stopSingleton();
	}

	@Test
	public void testFileMonitorSingletonDefault() throws InterruptedException,
			IOException {
		String targetDir = "test2";
		init(targetDir);

		// FileWatcherThread.DEFAULT_INTERVAL == 300000
		FileMonitor.startSingleton(targetDir);
		// ended right after starting without special file handling or sleep
		// time
		FileMonitor.stopSingleton();
	}

	@Test
	public void testFileMonitorSingletonWithLog() throws InterruptedException,
			IOException {
		String targetDir = "test3";
		init(targetDir);

		// when directly returning logger - the logger name in the below console
		// is shown as
		// [org.anyframe.util.system.FileMonitorTest]
		Logger logger = LoggerFactory.getLogger(this.getClass());
		FileMonitor.startSingleton(logger, targetDir, 5000);

		someFileProcessing(targetDir);

		Thread.sleep(11 * 1000);

		FileMonitor.stopSingleton(logger);
	}

	private void someFileProcessing(final String targetDir) {
		new Thread() {
			public void run() {
				try {
					Thread.sleep(3 * 1000);

					File defaultFile = new File(targetDir, "default2.txt");
					FileUtils.copyFile(new File(targetDir, "default.txt"),
							defaultFile);

					Thread.sleep(3 * 1000);
					FileUtils.copyFile(defaultFile, new File(targetDir,
							"default3.txt"));
					FileUtils.writeStringToFile(defaultFile,
							"changed content\n", "UTF-8");

					Thread.sleep(3 * 1000);
					FileUtils.copyFile(defaultFile, new File(targetDir,
							"default4.txt"));
					FileUtils.copyFile(defaultFile, new File(targetDir,
							"default5.txt"));

					Thread.sleep(3 * 1000);
					FileUtils
							.deleteQuietly(new File(targetDir, "default3.txt"));
					FileUtils
							.deleteQuietly(new File(targetDir, "default5.txt"));
					FileUtils.writeStringToFile(new File(targetDir,
							"default4.txt"), "another changed content\n",
							"UTF-8");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}.start();
	}

	@Test
	public void testFileMonitorNewMonitoringThread() throws SigarException,
			IOException, InterruptedException {
		String targetDir = "test4";
		init(targetDir);

		Logger logger = LoggerFactory.getLogger("fileMonitorLogger1");
		FileWatcherThread fileWatcherThread = FileMonitor.start(logger,
				targetDir, 5000);

		someFileProcessing(targetDir);

		Thread.sleep(20 * 1000);

		FileMonitor.stop(logger, fileWatcherThread);
	}
}
