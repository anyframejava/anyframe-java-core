package org.anyframe.sample.scheduling.task.annotation;

import java.util.Date;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PrintTask {
	
	@Scheduled(fixedDelay=5000)
	public void printWithFixedDelay() {
		System.out.println("execute printWithFixedDelay() of Annotated PrintTask at " + new Date());
	}
	
	@Scheduled(fixedRate=10000)
	public void printWithFixedRate() {
		System.out.println("execute printWithFixedRate() of Annotated PrintTask at " + new Date());
	}	
	
	@Scheduled(cron="*/8 * * * * MON-FRI")
	public void printWithCron() {
		System.out.println("execute printWithCron() of Annotated PrintTask at " + new Date());
	}
}
