/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.sample.scheduling.task.executor;

import java.util.Date;

import org.springframework.core.task.TaskExecutor;

public class PrintTaskExecutor {
	private TaskExecutor executor;

	public PrintTaskExecutor(TaskExecutor taskExecutor) {
		this.executor = taskExecutor;
	}

	public void print() {
		for (int i = 0; i < 3; i++) {
			executor.execute(new Task(i));
		}
	}

	private class Task implements Runnable {
		private int no;

		public Task(int no) {
			this.no = no;
		}

		public void run() {
			System.out.println("execute a Task" + no + " at " + new Date()
					+ " with TaskExecutor");
		}
	}
}
