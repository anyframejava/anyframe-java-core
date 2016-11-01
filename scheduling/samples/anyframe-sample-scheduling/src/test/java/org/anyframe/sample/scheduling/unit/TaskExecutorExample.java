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
package org.anyframe.sample.scheduling.unit;

import org.springframework.core.task.TaskExecutor;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class TaskExecutorExample {

	private class MessagePrinterTask implements Runnable {

		private String message;

		public MessagePrinterTask(String message) {
			this.message = message;
		}

		public void run() {
			// System.out.println(message);
		}

	}

	private TaskExecutor taskExecutor;

	public TaskExecutorExample(TaskExecutor taskExecutor) {
		this.taskExecutor = taskExecutor;
	}

	public void callME() {
		// System.out.println("AAAAAAAAAAAAAAAAA");
		// for(int i = 0; i < 25; i++) {
		// taskExecutor.execute(new MessagePrinterTask("Message" + i));
		// }
	}

	public TaskExecutor getTaskExecutor() {
		return taskExecutor;
	}
}