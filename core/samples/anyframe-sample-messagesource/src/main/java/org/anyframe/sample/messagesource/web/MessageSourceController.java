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
package org.anyframe.sample.messagesource.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.datatype.SearchVO;
import org.anyframe.pagination.Page;
import org.anyframe.sample.messagesource.domain.MessageSource;
import org.anyframe.sample.messagesource.service.MessageSourceService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.support.SessionStatus;

/**
 * Controller for MessageSource
 */
@Controller
@RequestMapping("/messageSource.do")
public class MessageSourceController {

	@Inject
	@Named("messageSourceService")
	private MessageSourceService messageSourceService;

	public void setMessageSourceService(
			MessageSourceService messageSourceService) {
		this.messageSourceService = messageSourceService;
	}

	@RequestMapping(params = "method=createView")
	public String createView(Model model) throws Exception {
		model.addAttribute(new MessageSource());
		return "messagesource/form";
	}

	@RequestMapping(params = "method=create")
	public String create(MessageSource messageSource, BindingResult results,
			SessionStatus status) throws Exception {

		if (results.hasErrors()) {
			return "messagesource/form";
		}

		messageSourceService.create(messageSource);
		status.setComplete();

		return "redirect:/messageSource.do?method=list";
	}

	@RequestMapping(params = "method=get")
	public String get(
			@ModelAttribute("messageSource") MessageSource messageSource,
			Model model) throws Exception {
		MessageSource resultMessageSource = messageSourceService
				.get(messageSource);

		model.addAttribute("messageSource", resultMessageSource);
		return "messagesource/form";
	}

	@RequestMapping(params = "method=update")
	public String update(MessageSource messageSource, BindingResult results,
			SessionStatus status) throws Exception {

		if (results.hasErrors()) {
			return "messagesource/form";
		}

		messageSourceService.update(messageSource);
		status.setComplete();

		return "redirect:/messageSource.do?method=list";
	}

	@RequestMapping(params = "method=list")
	public String list(@ModelAttribute("searchVO") SearchVO searchVO,
			Model model) throws Exception {

		Page resultPage = messageSourceService.getPagingList(searchVO);

		model.addAttribute("messageSourceList", resultPage.getList());
		model.addAttribute("resultPage", resultPage);

		return "messagesource/list";
	}

	@RequestMapping(params = "method=remove")
	public String remove(MessageSource messageSource) throws Exception {

		messageSourceService.remove(messageSource);

		return "redirect:/messageSource.do?method=list";
	}

	@RequestMapping(params = "method=refresh")
	public String refresh() throws Exception {

		messageSourceService.refresh();

		return "redirect:/messageSource.do?method=list";
	}
}
