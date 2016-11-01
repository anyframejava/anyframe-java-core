/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.plugin.scheduling.demo.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.anyframe.scheduling.JobInfo;
import org.anyframe.scheduling.SchedulingService;
import org.anyframe.util.DateUtil;
import org.apache.taglibs.standard.tag.el.sql.DateParamTag;
import org.quartz.JobKey;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;

/**
 * @author Sujeong Lee
 */
@Controller("schedulingServiceDemoController")
@RequestMapping("/scheduling.do")
public class SchedulingServiceDemoController {

	private static final String DATE_PATTERN = "yyyy-MM-dd hh:MM";

	@Inject
	SchedulingService schedulingService;

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		DateFormat df = new SimpleDateFormat(DATE_PATTERN);
		CustomDateEditor dateEdit = new CustomDateEditor(df, true);
		binder.registerCustomEditor(Date.class, dateEdit);
	}

	@RequestMapping(params = "method=createView")
	public String createView(Model model) throws Exception {
		model.addAttribute(new JobInfo());

		return "scheduling/job/form";
	}

	@RequestMapping(params = "method=create")
	public String create(JobInfo jobInfo, BindingResult result, SessionStatus status,
			HttpSession session) throws Exception {
		if(result.hasErrors()){
			return "scheduling/job/form";
		}
		schedulingService.create(jobInfo);
		status.setComplete();

		return "redirect:/scheduling.do?method=list";
	}

	@RequestMapping(params = "method=init")
	public String init(JobInfo jobInfo, SessionStatus status,
			HttpSession session) throws Exception {
		jobInfo = getInitJobInfo();

		schedulingService.create(jobInfo);
		status.setComplete();

		return "redirect:/scheduling.do?method=list";
	}

	@RequestMapping(params = "method=list")
	public String list(
			@RequestParam(value = "jobGroup", required = false) String jobGroup,
			JobInfo jobInfo, Model model) throws Exception {

		List<JobInfo> resultList = schedulingService.getList(jobGroup);

		model.addAttribute("jobInfo", jobInfo);
		model.addAttribute("schedules", resultList);

		return "scheduling/job/list";
	}

	@RequestMapping(params = "method=get")
	public String get(@RequestParam("jobName") String jobName,
			@RequestParam("jobGroup") String jobGroup, Model model)
			throws Exception {
		JobInfo jobInfo = schedulingService.get(new JobKey(jobName, jobGroup));
		if (jobInfo == null) {
			throw new Exception("Resource not found " + jobInfo);
		}
		model.addAttribute(jobInfo);

		return "scheduling/job/form";
	}

	@RequestMapping(params = "method=update")
	public String update(JobInfo jobInfo, BindingResult result,
			SessionStatus status) throws Exception {
		if (result.hasErrors()) {
			return "scheduling/job/form";
		}
		
		schedulingService.update(jobInfo);
		status.setComplete();

		return "redirect:/scheduling.do?method=list";
	}

	@RequestMapping(params = "method=remove")
	public String remove(@RequestParam("jobName") String jobName,
			@RequestParam("jobGroup") String jobGroup) throws Exception {
		schedulingService.delete(new JobKey(jobName, jobGroup));
		return "redirect:/scheduling.do?method=list";
	}

	@RequestMapping(params = "method=run")
	public String run(@RequestParam("jobName") String jobName,
			@RequestParam("jobGroup") String jobGroup) throws Exception {
		schedulingService.run(new JobKey(jobName, jobGroup));
		return "redirect:/scheduling.do?method=list";
	}

	@RequestMapping(params = "method=stop")
	public String stop(@RequestParam("jobName") String jobName,
			@RequestParam("jobGroup") String jobGroup) throws Exception {
		schedulingService.stop(new JobKey(jobName, jobGroup));
		return "redirect:/scheduling.do?method=list";
	}

	private JobInfo getInitJobInfo() {
		JobInfo jobInfo = new JobInfo();

		jobInfo.setJobName("movieCountJob");
		jobInfo.setJobTarget("org.anyframe.plugin.scheduling.job.MovieCountJob");
		jobInfo.setJobSchedule("0 0/1 * * * ?");
		jobInfo.setFlagScheduleType("cron");
		jobInfo.setDescription("This is sample job for test.");
		jobInfo.setStartDate(DateUtil.stringToDate(DateUtil.getCurrentDate(DATE_PATTERN), DATE_PATTERN));

		return jobInfo;
	}

}
