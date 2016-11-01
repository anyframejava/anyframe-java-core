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
package org.anyframe.sample.scheduling;

import junit.framework.TestCase;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class QuartzSchedulerTest extends TestCase {
	public void testMultipleSchedulers() throws Exception {
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(
				"META-INF/spring/context-scheduling-multipleSchedulers.xml");

		try {
			Scheduler scheduler1 = (Scheduler) ctx.getBean("scheduler1");
			Scheduler scheduler2 = (Scheduler) ctx.getBean("scheduler2");

			assertNotSame(scheduler1, scheduler2);
			assertFalse(scheduler1.getSchedulerName().equals(
					scheduler2.getSchedulerName()));
		} finally {
			ctx.close();
		}
	}

	public void testWithTwoAnonymousMethodInvokingJobDetailFactoryBeans()
			throws InterruptedException, SchedulerException {
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(
				"META-INF/spring/context-scheduling-multipleAnonymousMethodInvokingJobDetailFB.xml");

		Thread.sleep(3000);

		try {
			QuartzTestBean exportService = (QuartzTestBean) ctx
					.getBean("exportService");
			QuartzTestBean importService = (QuartzTestBean) ctx
					.getBean("importService");
			QuartzListener exportListener = (QuartzListener) ctx
					.getBean("exportListener");
			QuartzListener importListener = (QuartzListener) ctx
					.getBean("importListener");

			assertEquals("doImport called exportService", 0, exportService
					.getImportCount());
			assertEquals("doExport not called on exportService", 2,
					exportService.getExportCount());
			assertEquals("doImport not called on importService", 0,
					importService.getImportCount());
			assertEquals("doExport called on importService", 0, importService
					.getExportCount());
			assertEquals(2, exportListener.getExecutionCount());
			assertEquals(2, exportListener.getPreExecutionCount());
			assertEquals(0, importListener.getExecutionCount());
			assertEquals(0, importListener.getPreExecutionCount());
			assertEquals(2, importListener.getVetoedCount());

		} finally {
			ctx.close();
		}
	}
}
