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

import java.util.List;

import javax.inject.Inject;

import org.anyframe.scheduling.JobResultInfo;
import org.anyframe.scheduling.SchedulingService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Sujeong Lee
 */
@Controller("schedulingResultServiceDemoController")
@RequestMapping("/schedulingResult.do")
public class SchedulingResultServiceDemoController {
	
	@Inject
	SchedulingService schedulingService;
	
	@RequestMapping(params = "method=list")
	public String list(JobResultInfo jobResultInfo, Model model) throws Exception {
		
		List<JobResultInfo> resultList = schedulingService.getResultList(jobResultInfo);
		model.addAttribute("jobResultInfo", jobResultInfo);
		
		model.addAttribute("results", resultList);

		return "scheduling/result/list";
	}
	
	@RequestMapping(params = "method=get")
	public String get(JobResultInfo jobResultInfo, Model model)
			throws Exception {
		JobResultInfo returnJobResultInfo = schedulingService.getResult(jobResultInfo);
		
		if (returnJobResultInfo == null) {
			throw new Exception("Resource not found " + returnJobResultInfo);
		}
		model.addAttribute(returnJobResultInfo);

		return "scheduling/result/form";
	}
	
}
