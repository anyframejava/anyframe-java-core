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

import org.anyframe.plugin.xplatform.moviefinder.service.GenreService;
import org.anyframe.xplatform.web.XPRequestHandlerUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tobesoft.xplatform.tx.PlatformType;

/**
 * The GenreController class is a controller class to provide a DataSet including
 * Genre information to UI.
 * 
 * @author Youngmin Jo
 *
 */
@Controller
@RequestMapping("/xplatformGenre.do")
public class GenreController {

	@Inject
	@Named("xplatformGenreService")
	private GenreService genreService;

	private String contentType = PlatformType.CONTENT_TYPE_XML;

	private String charset = PlatformType.DEFAULT_CHAR_SET;

	@RequestMapping(params = "method=getList")
	public void getList(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		XPRequestHandlerUtil xpHandlerUtil = new XPRequestHandlerUtil(request,
				response, contentType, charset);
		try {
			List<Map<String, Object>> resultList = genreService.getList();

			xpHandlerUtil.setMapListToDataSetList("dsGrdGenre", resultList);
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
