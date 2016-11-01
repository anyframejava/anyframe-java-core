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
package org.anyframe.plugin.xplatform.moviefinder.web;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.plugin.xplatform.domain.Movie;
import org.anyframe.plugin.xplatform.moviefinder.service.MovieService;
import org.anyframe.xplatform.web.XPRequestHandlerUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tobesoft.xplatform.tx.PlatformType;

/**
 * The MovieController class is a controller class to provide CRUD functions
 * related with Movie domain object.
 * 
 * @author Youngmin Jo
 * 
 */
@Controller
@RequestMapping("/xplatformMovie.do")
public class MovieController {

	@Inject
	@Named("xplatformMovieService")
	private MovieService movieService;

	private String contentType = PlatformType.CONTENT_TYPE_XML;

	private String charset = PlatformType.DEFAULT_CHAR_SET;

	@RequestMapping(params = "method=getList")
	public void getList(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		XPRequestHandlerUtil xpHandlerUtil = new XPRequestHandlerUtil(request,
				response, contentType, charset);
		try {
			List<Map<String, Object>> resultList = movieService
					.getList(xpHandlerUtil.getDataSetAsMap("dsSearch").get(0));

			xpHandlerUtil.setMapListToDataSetListWithCheck("dsGrdMovie",
					resultList);
			xpHandlerUtil.setResultMsg(0, "save successed");
		} catch (Exception e) {
			String errorMsg = e.getMessage();
			if ("".equals(errorMsg)) {
				errorMsg = "Fail to process client.";
			}
			xpHandlerUtil.setResultMsg(-1, errorMsg);
		} finally {
			xpHandlerUtil.sendData();
		}
	}

	@RequestMapping(params = "method=saveAll")
	public void saveAll(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		XPRequestHandlerUtil xpHandlerUtil = new XPRequestHandlerUtil(request,
				response, contentType, charset);

		try {
			movieService.saveAll(xpHandlerUtil.getDataSetAsVoList("dsGrdMovie",
					Movie.class, true));
			xpHandlerUtil.setResultMsg(0, "save successed");
		} catch (Exception e) {
			String errorMsg = e.getMessage();
			if ("".equals(errorMsg)) {
				errorMsg = "Fail to process client.";
			}
			xpHandlerUtil.setResultMsg(-1, errorMsg);
		} finally {
			xpHandlerUtil.sendData();
		}
	}
}
