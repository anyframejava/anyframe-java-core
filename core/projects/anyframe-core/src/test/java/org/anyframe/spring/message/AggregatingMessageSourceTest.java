/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.spring.message;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what AggregatingMessageSource supports, there are some
 * test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/message/context-aggregating-message.xml" })
public class AggregatingMessageSourceTest {
	@Inject
	private DataSource dataSource;

	@Inject
	@Named("messageSource")
	private MessageSource messageSource;

	/**
	 * initialize message table
	 */
	@Before
	public void initialize() throws Exception {
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				// 1. Try to drop the table. It may not exist and throw an
				// exception.
				try {
					statement.executeUpdate("DROP TABLE TEST_MESSAGE_SOURCE");
				} catch (SQLException e) {
					// The table was probably just not there. Ignore this.
				}

				// 2. Create the table that we will use in this test. Different
				// depending on the db.
				// Please add new statements as new databases are tested.
				statement.executeUpdate("CREATE TABLE TEST_MESSAGE_SOURCE"
						+ " ( " + "KEY varchar(50) NOT NULL, "
						+ "LANGUAGE varchar(2) NOT NULL, "
						+ "COUNTRY varchar(2) NOT NULL, "
						+ "TEXT varchar(1000) NOT NULL, "
						+ "PRIMARY KEY (KEY, LANGUAGE, COUNTRY))");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('error.moviefinderimpl.getpaginglist','en','US','Movie List not displayed')");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('error.moviefinderimpl.getpaginglist','ko','KR','영화 목록 조회에 실패하였습니다.')");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('movie.title','en','US','Title')");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('movie.title','ko','KR','제목')");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('movie.actors','en','US','Actors')");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('movie.actors','ko','KR','배우')");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('movie.releaseDate','en','US','Release Date')");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('movie.releaseDate','ko','KR','개봉일')");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('error.moviefinderimpl.get','en','US','Movie[{0}] details of  specified movie identifier not displayed')");
				statement
						.executeUpdate("INSERT INTO TEST_MESSAGE_SOURCE VALUES('error.moviefinderimpl.get','ko','KR','영화[{0}] 정보 조회에 실패하였습니다.')");

			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * [Flow #-1] Positive Case : try to get message in db or file.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void getMessage() throws Exception {
		// 1. get message in table based messagesource
		assertEquals(
				"Fail to get message (message id = 'error.moviefinderimpl.getpaginglist', locale = 'en_US')",
				"Movie List not displayed", messageSource.getMessage(
						"error.moviefinderimpl.getpaginglist", new Object[] {},
						new Locale("en", "US")));
		assertEquals(
				"Fail to get message (message id = 'error.moviefinderimpl.getpaginglist', locale = 'ko_KR')",
				"영화 목록 조회에 실패하였습니다.", messageSource.getMessage(
						"error.moviefinderimpl.getpaginglist", new Object[] {},
						new Locale("ko", "KR")));

		// 2. get message in file based messagesource bundle
		assertEquals(
				"Fail to get message (message id = 'error.base.msg1', locale = 'en_US')",
				"message1", messageSource.getMessage("error.base.msg1",
						new Object[] {}, new Locale("en", "US")));

		// 3. get undefined message
		try {
			System.out.println(messageSource.getMessage("undefined.message",
					new Object[] {}, new Locale("en", "US")));
			fail("fail to process undefined messageKey");
		} catch (Exception e) {
			assertTrue("fail to check exception",
					e instanceof NoSuchMessageException);
		}

		// 4. get undefined message with default message
		assertEquals("Fail to get default message", "default message",
				messageSource.getMessage("undefined.message", new Object[] {},
						"default message", new Locale("en", "US")));
	}
}
