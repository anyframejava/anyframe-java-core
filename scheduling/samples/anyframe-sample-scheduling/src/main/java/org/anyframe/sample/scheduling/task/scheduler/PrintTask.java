package org.anyframe.sample.scheduling.task.scheduler;

import java.util.Date;

public class PrintTask {
	public void printWithFixedDelay() throws Exception {
		System.out.println("execute printWithFixedDelay() of PrintTask at "
				+ new Date() + " with TaskScheduler");
	}

	public void printWithFixedRate() throws Exception {
		System.out.println("execute printWithFixedRate() of PrintTask at "
				+ new Date() + " with TaskScheduler");
	}

	public void printWithCron() throws Exception {
		System.out.println("execute printWithCron() of PrintTask at "
				+ new Date() + " with TaskScheduler");
	}
}
