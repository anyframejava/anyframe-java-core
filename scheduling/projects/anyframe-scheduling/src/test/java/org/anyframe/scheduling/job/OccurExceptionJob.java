package org.anyframe.scheduling.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

public class OccurExceptionJob implements Job {

	public void execute(JobExecutionContext context)
			throws JobExecutionException {
		throw new JobExecutionException("Occur the Exception!!");
	}
}
