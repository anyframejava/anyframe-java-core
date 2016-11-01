package org.anyframe.scheduling.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

public class PrintCommentJob implements Job{

	public void execute(JobExecutionContext context)
	throws JobExecutionException {
		System.out.println("job ");
	}
}
