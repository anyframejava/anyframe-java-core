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
package org.anyframe.plugin.mobile.moviefinder.web;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.mobile.domain.JsonObjectVO;
import org.anyframe.plugin.mobile.domain.Movie;
import org.anyframe.plugin.mobile.moviefinder.service.MovieFinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * This MovieFinderController class is a Controller class to provide movie list
 * functionality.
 * 
 * @author Jongpil Park
 */
@RestController
@RequestMapping("/movies")
public class MovieFinderController {

	@Inject
	@Named("mobileMovieFinder")
	private MovieFinder movieFinder;

	@RequestMapping(method=RequestMethod.POST)
	public JsonObjectVO list(@RequestBody Movie movie) throws Exception {

		int pageIndex = 1;
		Page resultPage = movieFinder.getPagingList(movie, pageIndex);

		JsonObjectVO jsonObjectVO = new JsonObjectVO();

		jsonObjectVO.setPage(String.valueOf(resultPage.getCurrentPage()));
		jsonObjectVO.setRecords(String.valueOf(resultPage.getTotalCount()));
		jsonObjectVO.setRows(resultPage.getList());
		jsonObjectVO.setTotal(String.valueOf(resultPage.getMaxPage()));

		return jsonObjectVO;
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public List<?> list2(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws Exception {

		int pageIndex = 1;
		Page resultPage = movieFinder.getPagingListWithDate(startDate, endDate, pageIndex);

		return resultPage.getList();
	}
	
	@RequestMapping(value="/{movieId}",method=RequestMethod.GET)
	public Movie get(@PathVariable("movieId") String movieId)
			throws Exception {
		Movie movie = movieFinder.get(movieId);

		return movie;
	}


}
