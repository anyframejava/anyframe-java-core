/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.plugin.scheduling.job;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.plugin.scheduling.domain.Genre;
import org.anyframe.plugin.scheduling.moviefinder.service.GenreService;
import org.anyframe.query.QueryService;
import org.anyframe.util.StringUtil;

/**
 * This MovieStatusSummaryJob class is a job class to provide movie status summary functionality.
 * 
 * @author hyunjung jeong
 */
public class MovieStatusSummaryJob {
	private GenreService genreService;
	private QueryService queryService; 
	private Map monthMap = new HashMap();

	public MovieStatusSummaryJob() {
	}

	public MovieStatusSummaryJob(GenreService genreService,
			QueryService queryService) {
		this.genreService = genreService;
		this.queryService = queryService;
	}

	public void initialize() throws Exception {
		monthMap.put(Calendar.JANUARY, "jan");
		monthMap.put(Calendar.FEBRUARY, "feb");
		monthMap.put(Calendar.MARCH, "mar");
		monthMap.put(Calendar.APRIL, "apr");
		monthMap.put(Calendar.MAY, "may");
		monthMap.put(Calendar.JUNE, "jun");
		monthMap.put(Calendar.JULY, "jul");
		monthMap.put(Calendar.AUGUST, "aug");
		monthMap.put(Calendar.SEPTEMBER, "sep");
		monthMap.put(Calendar.OCTOBER, "oct");
		monthMap.put(Calendar.NOVEMBER, "nov");
		monthMap.put(Calendar.DECEMBER, "dec");
	}

	public void execute() throws Exception {
		removeAllMonthlyMovieStatus();
		insertMonthlyMovieStatus();
	}

	private void removeAllMonthlyMovieStatus() throws Exception {
		queryService.remove("removeMonthlyMovieStatus", new Object[] {});
	}

	private void insertMonthlyMovieStatus() throws Exception {
		List genreList = genreService.getList();

		List paramList = new ArrayList();
		for (int i = 0; i < genreList.size(); i++) {
			Genre genre = (Genre) genreList.get(i);
			String genreId = genre.getGenreId();

			Map params = new HashMap();
			params.put("genreId", genreId);

			for (int j = 0; j < 12; j++) {
				Calendar calendar = Calendar.getInstance();
				calendar.set(Calendar.YEAR, calendar.get(Calendar.YEAR));
				calendar.set(Calendar.MONTH, j);

				Collection results = queryService.find(
						"countMovieListByMonth", setQueryParams(genreId,
								calendar));

				Integer count = new Integer(0);
				if (!results.isEmpty()) {
					count = new Integer(((Map) results.iterator().next())
							.get("totalCount").toString()).intValue();
				}

				params.put(monthMap.get(j) + "Count", count);
			}
			paramList.add(params);
		}

		queryService.batchUpdate("createMonthlyMovieStatus", paramList);
	}

	private Object[] setQueryParams(String genreId, Calendar calendar) {
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		int lastDay = calendar.getActualMaximum(Calendar.DATE);
		calendar.set(Calendar.DATE, lastDay);

		String startDay = StringUtil.integer2string(year)
				+ "-"
				+ StringUtil.fillString(StringUtil.integer2string(month), '0',
						2) + "-"
				+ StringUtil.fillString(StringUtil.integer2string(1), '0', 2);

		String endDay = StringUtil.integer2string(year)
				+ "-"
				+ StringUtil.fillString(StringUtil.integer2string(month), '0',
						2)
				+ "-"
				+ StringUtil.fillString(StringUtil.integer2string(calendar
						.get(Calendar.DATE)), '0', 2);

		Object[] params = new Object[3];
		params[0] = "genreId=" + genreId;
		params[1] = "startDay=" + startDay;
		params[2] = "endDay=" + endDay;

		return params;
	}
}
