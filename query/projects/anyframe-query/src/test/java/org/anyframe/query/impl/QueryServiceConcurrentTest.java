/*
 * Copyright 2002-2010 the original author or authors.
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
package org.anyframe.query.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.anyframe.query.QueryService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * TestCase Name : QueryServiceConcurrentTest <br>
 * <br>
 * [Description] : Thread is used and QueryService method is executed
 * simultaneously. And its result value is verified.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Query statement is executed through
 * findWithRowCount() of QueryService and its result value is verified.</li>
 */
public class QueryServiceConcurrentTest extends
		AbstractDependencyInjectionSpringContextTests {
	private QueryService queryService = null;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	protected String[] getConfigLocations() {
		setAutowireMode(AbstractDependencyInjectionSpringContextTests.AUTOWIRE_BY_NAME);
		return new String[] { "classpath*:/spring/context-*.xml" };
	}

	/**
	 * Table TB_RESERVATION is created for test.
	 */
	public void onSetUp() throws Exception {
		System.out.println("Attempting to drop old table");
		try {
			queryService.updateBySQL("DROP TABLE TB_CONCURRENT",
					new String[] {}, new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}

		queryService.updateBySQL("CREATE TABLE TB_CONCURRENT ( "
				+ "COL1 NUMBER(38) NOT NULL, " + "COL2 NUMBER(38) NOT NULL, "
				+ "CONDITION varchar2(2), " + "PRIMARY KEY (COL1))",
				new String[] {}, new Object[] {});

		queryService.updateBySQL("INSERT INTO TB_CONCURRENT VALUES (1,1,'A')",
				new String[] {}, new Object[] {});
		queryService.updateBySQL("INSERT INTO TB_CONCURRENT VALUES (2,2,'A')",
				new String[] {}, new Object[] {});
		queryService.updateBySQL("INSERT INTO TB_CONCURRENT VALUES (3,3,'A')",
				new String[] {}, new Object[] {});
		queryService.updateBySQL("INSERT INTO TB_CONCURRENT VALUES (4,4,'B')",
				new String[] {}, new Object[] {});
	}

	/**
	 * [Flow #-1] Positive Case : Query statement is executed through
	 * findWithRowCount() of QueryService and its result value is verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testConcurrentExecution() throws Exception {
		// make race condition situation
		// THREAD #1
		new TestThread(1, "A", 1, 5).start();
		new TestThread(2, "B", 1, 3).start();
		new TestThread(3, "A", 1, 3).start();

		// waiting..... threads
		Thread.sleep(1000);
	}

	public class TestThread extends Thread {
		private int threadNum;
		private String condition;
		private int pageIndex;
		private int pageSize;

		public TestThread(int threadNum, String condition, int pageIndex,
				int pageSize) {
			this.threadNum = threadNum;
			this.condition = condition;
			this.pageIndex = pageIndex;
			this.pageSize = pageSize;
		}

		@Override
		public void run() {
			worker(this.condition, this.pageIndex, this.pageSize);
		}

		public int getThreadNum() {
			return threadNum;
		}
	}

	private void worker(String condition, int pageIndex, int pageSize) {
		try {

			System.out.println(Thread.currentThread()
					+ "][Location:TESTCASE][pageIndex:" + pageIndex
					+ "][pageSize:" + pageSize + "][condition:" + condition
					+ "]");

			TestThread currentThread = (TestThread) Thread.currentThread();
			if (currentThread.getThreadNum() == 1
					|| currentThread.getThreadNum() == 3) {
				assertEquals("Fail to compare condition.", "A", condition);
			} else {
				assertEquals("Fail to compare condition.", "B", condition);
			}

			Map result = queryService.findWithRowCount("findWithConcurrent",
					new Object[] { new Object[] { "condition", condition } },
					pageIndex, pageSize);

			Set set = result.keySet();
			Iterator itr = set.iterator();

			while (itr.hasNext()) {
				String key = (String) itr.next();
				System.out.println(Thread.currentThread()
						+ "][Location:TESTCASE][KEY:" + key + "][VALUE:"
						+ result.get(key) + "]");

				if (currentThread.getThreadNum() == 1 && key.equals("LIST")) {
					assertEquals("Fail to compare condition.", "A",
							((Map) ((List) result.get("LIST")).get(0))
									.get("condition"));
				}

				if (currentThread.getThreadNum() == 2 && key.equals("LIST")) {
					assertEquals("Fail to compare condition.", "B",
							((Map) ((List) result.get("LIST")).get(0))
									.get("condition"));
				}
			}

		} catch (Exception e) {
			fail("throw exception : " + e.getMessage());
		}
	}
}
