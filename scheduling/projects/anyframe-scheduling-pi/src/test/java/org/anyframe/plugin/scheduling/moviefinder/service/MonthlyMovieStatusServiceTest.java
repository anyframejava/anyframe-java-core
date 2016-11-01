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
package org.anyframe.plugin.scheduling.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This monthlyMovieStatusService class is a Test Case class for
 * MonthlyMovieStatusService.
 * 
 * @author hyunjung jeong
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class MonthlyMovieStatusServiceTest {
	@Inject
	@Named("schedulingMonthlyMovieStatusService")
	private MonthlyMovieStatusService monthlyMovieStatusService;

	@Inject
	@Named("dataSource")
	private DataSource dataSource;

	@SuppressWarnings("unchecked")
	@Test
	public void findMonthlyMovieStatusList() throws Exception {
		Collection monthlyMovieStatusList = monthlyMovieStatusService.getList();

		assertEquals("fail to fetch monthly movie status list", 10,
				monthlyMovieStatusList.size());

		Iterator itr = monthlyMovieStatusList.iterator();
		while (itr.hasNext()) {
			Map monthlyMovieStatus = (Map) itr.next();
			if (monthlyMovieStatus.get("genreId").equals("GR-01")) {
				assertEquals("fail to execute scheduling job", "0",
						monthlyMovieStatus.get("janCount").toString());
			}
		}

		addNewMovie();
		Thread.sleep(60000);

		monthlyMovieStatusList = monthlyMovieStatusService.getList();
		itr = monthlyMovieStatusList.iterator();
		while (itr.hasNext()) {
			Map monthlyMovieStatus = (Map) itr.next();
			if (monthlyMovieStatus.get("genreId").equals("GR-01")) {
				assertEquals("fail to execute scheduling job", "1",
						monthlyMovieStatus.get("janCount").toString());
			}
		}
	}

	@After
	public void deleteMovie() throws Exception {
		try {
			Connection conn = dataSource.getConnection();
			Statement statement = null;
			try {
				statement = conn.createStatement();

				statement
						.executeUpdate("DELETE FROM MOVIE WHERE MOVIE_ID = 'MV-99999'");
			} finally {
				statement.close();
				conn.close();
			}
		} catch (SQLException e) {
			fail("Unable to initialize database for test. " + e);
		}
	}

	private void addNewMovie() throws Exception {
		try {
			Connection conn = dataSource.getConnection();
			Statement statement = null;
			try {
				statement = conn.createStatement();

				statement
						.executeUpdate("INSERT INTO MOVIE VALUES('MV-99999','GR-01','Alice in Wonderland','Tim Burton','Johnny Depp',110,'2011-01-04',8000,'','Y')");
			} finally {
				statement.close();
				conn.close();
			}
		} catch (SQLException e) {
			fail("Unable to initialize database for test. " + e);
		}
	}
}
