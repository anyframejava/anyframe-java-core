/*
 * Copyright 2002-2009 the original author or authors.
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

import java.util.Date;
import java.util.concurrent.Future;

import org.anyframe.sample.scheduling.task.async.AsyncPrintTask;
import org.anyframe.sample.scheduling.task.executor.PrintTaskExecutor;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Spring Scheduler를 테스트하기 위한 샘플 코드
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=anyframe.sample.scheduling.Main
 */
public class Main {
	/**
	 * 테스트 수행을 위한 main
	 */
	public static void main(String[] args) throws Exception {
		Main main = new Main();

		// 1. test
		main.runTaskExecutor();
		main.runTaskScheduler();
		main.runAnnotatedTask();
		main.runAsyncTask();
	}

	public void runTaskExecutor() throws Exception {
		String[] locations = new String[] { "classpath:spring/context-executor.xml" };
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
				locations, false);
		context.refresh();

		PrintTaskExecutor taskExecutor = (PrintTaskExecutor) context
				.getBean("task");
		// waiting for executing scheduled task
		System.out.println("start runTaskExecutor()");
		taskExecutor.print();
		Thread.sleep(10000);
		System.out.println("end runTaskExecutor()");

		context.close();
	}

	public void runTaskScheduler() throws Exception {
		String[] locations = new String[] { "classpath:spring/context-scheduler.xml" };
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
				locations, false);
		context.refresh();

		// waiting for executing scheduled task
		System.out.println("start runTaskScheduler()");
		Thread.sleep(30000);
		System.out.println("end runTaskScheduler()");

		context.close();
	}

	public void runAnnotatedTask() throws Exception {
		String[] locations = new String[] { "classpath:spring/context-annotation.xml" };
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
				locations, false);
		context.refresh();

		// waiting for executing scheduled task
		System.out.println("start runAnnotatedTask()");
		Thread.sleep(30000);
		System.out.println("end runAnnotatedTask()");

		context.close();
	}

	public void runAsyncTask() throws Exception {
		String[] locations = new String[] { "classpath:spring/context-async.xml" };
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
				locations, false);
		context.refresh();

		AsyncPrintTask asyncTask = (AsyncPrintTask) context
				.getBean("asyncPrintTask");
		System.out.println("start runAsyncTask()");
		Future<String> future = asyncTask.returnVal(0);
		System.out.println("after calling returnVal() at " + new Date()
				+ " asynchronously");
		System.out.println("return value : " + future.get());
		System.out.println("end runAsyncTask()");

		context.close();
	}
}
