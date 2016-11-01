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
