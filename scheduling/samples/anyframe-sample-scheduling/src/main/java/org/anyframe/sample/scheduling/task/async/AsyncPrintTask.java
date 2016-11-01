package org.anyframe.sample.scheduling.task.async;

import java.util.Date;
import java.util.concurrent.Future;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Component;

@Component
public class AsyncPrintTask {

	@Async
	public void printWithAsync() throws Exception {
		System.out.println("execute printWithAsync() of AsyncPrintTask at "
				+ new Date());
		Thread.sleep(5000);
	}

	@Async
	public void printWithArg(int i) throws Exception {
		System.out.println("execute printWithArg(" + i
				+ ") of AsyncPrintTask at " + new Date());
		Thread.sleep(5000);
	}

	@Async
	public Future<String> returnVal(int i) throws Exception {
		System.out.println("execute returnVal() of AsyncPrintTask");
		Date current = new Date();
		Thread.sleep(5000);
		return new AsyncResult<String>(current.toString());
	}
}
