package org.anyframe.scheduling;

import static org.junit.Assert.*;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.util.DateUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.quartz.JobKey;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/spring/context-scheduling-file.xml" })
public class SchedulingServiceFileTest {

	@Inject
	@Named("schedulingService")
	SchedulingService schedulingService;

	private static final String DATE_PATTERN = "yyyy-MM-dd HH:mm";
	
	/**
	 * [Flow #-1] Positive Case : try to create job to schedule in memory.
	 * Running that job for a while, and get a job info.
	 * 
	 * @throws InterruptedException
	 *             fail to test
	 */
	@Test
	public void testManageJobInfo() throws InterruptedException {
		JobInfo info = createJobInfo();

		// 1. create job with schedulingService
		schedulingService.create(info);

		// 2. sleep for job running
		Thread.sleep(3000);

		// 3. get job info
		JobInfo getInfo = schedulingService.get(new JobKey(info.getJobName(),
				info.getJobGroup()));
		assertEquals(info.getJobName(), getInfo.getJobName());
		assertEquals(info.getJobGroup(), getInfo.getJobGroup());
	}

	/**
	 * [Flow #-2] Positive Case : try to get list of result. In this case,
	 * returned a list of all results.
	 */
	@Test
	public void testManageJobResultInfo() {
		JobResultInfo info = createJobResultInfo();

		List<JobResultInfo> resultList = schedulingService.getResultList(info);

		assertTrue(resultList.size() > 0);
	}

	private JobInfo createJobInfo() {
		JobInfo info = new JobInfo();
		info.setJobName("occurExceptionJob");
		info.setJobGroup("DEFAULT");
		info.setJobTarget("org.anyframe.scheduling.job.OccurExceptionJob");
		info.setJobSchedule("*/1 * * * * ?");
		info.setFlagScheduleType("cron");
		info.setStartDate(DateUtil.stringToDate(DateUtil.getCurrentDate(DATE_PATTERN),DATE_PATTERN));

		return info;
	}

	private JobResultInfo createJobResultInfo() {
		JobResultInfo info = new JobResultInfo();
		info.setJobName("occurExceptionJob");
		info.setJobGroup("DEFAULT");
		return info;
	}
}
