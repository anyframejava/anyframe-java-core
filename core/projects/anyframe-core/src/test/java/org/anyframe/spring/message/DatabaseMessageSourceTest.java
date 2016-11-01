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
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what DatabaseMessageSource supports, there are some
 * test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/spring/message/context-message.xml" })
public class DatabaseMessageSourceTest {

	@Inject
	private ApplicationContext context;

	@Inject
	private DataSource dataSource;

	@Inject
	@Named("messageSource")
	private MessageSource messageSource;

	@Inject
	@Named("messageSourceWithDefaultLocale")
	private MessageSource messageSourceWithDefaultLocale;

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
	 * clear cache
	 */
	@After
	public void destroy() throws Exception {
		((DatabaseMessageSource) this.messageSource).destroy();
	}

	/**
	 * [Flow #-1] Positive Case : try to get message in db. check the size of
	 * cached data.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void getMessage() throws Exception {
		// 1. get message without arguments
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

		// 2. get message with arguments
		assertEquals(
				"Fail to get message (message id = 'error.moviefinderimpl.get', locale = 'en_US')",
				"Movie[Schrek] details of  specified movie identifier not displayed",
				messageSource.getMessage("error.moviefinderimpl.get",
						new Object[] { "Schrek" }, new Locale("en", "US")));

		// 3. check cache size
		assertTrue("Fail to check memory size of cache.",
				getCacheSize((DatabaseMessageSource) messageSource) == 3);

		// 4. sleep for expiring cached data
		Thread.sleep(2000);

		// 5. get message with arguments
		assertEquals(
				"Fail to get message (message id = 'error.moviefinderimpl.get', locale = 'ko_KR')",
				"영화[슈렉] 정보 조회에 실패하였습니다.", messageSource.getMessage(
						"error.moviefinderimpl.get", new Object[] { "슈렉" },
						new Locale("ko", "KR")));

		// 6. check cache size
		assertTrue("Fail to check memory size of cache.",
				getCacheSize((DatabaseMessageSource) messageSource) == 1);
	}

	/**
	 * [Flow #-2] Positive Case : In case of lazyLoad is false, try to get
	 * message in db. When this service started, this service put all messages
	 * into cache.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void getEarlyLoadedMessage() throws Exception {
		// 1. lookup messageSource which lazyLoad is false
		MessageSource lazyLoadingMessageSource = (MessageSource) context
				.getBean("lazyLoadingMessageSource");

		// 2. sleep for expiring cached data
		Thread.sleep(2000);

		// 3. check cache size
		assertTrue(
				"Fail to check memory size of cache.",
				getCacheSize((DatabaseMessageSource) lazyLoadingMessageSource) == 10);

		// 4. get message with arguments
		assertEquals(
				"Fail to get message (message id = 'error.moviefinderimpl.get', locale = 'en_US')",
				"Movie[Schrek] details of  specified movie identifier not displayed",
				lazyLoadingMessageSource.getMessage(
						"error.moviefinderimpl.get", new Object[] { "Schrek" },
						new Locale("en", "US")));
	}

	/**
	 * [Flow #-3] Positive Case : try to get message in db with undefined
	 * locale. In this case, returned a message with defined Fdefault locale.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void getMessageWithUndefinedLocale() throws Exception {
		// 1. get message with undefined locale
		assertEquals(
				"Fail to get message (message id = 'error.moviefinderimpl.getpaginglist', locale = 'ko_KR')",
				"영화 목록 조회에 실패하였습니다.", messageSourceWithDefaultLocale
						.getMessage("error.moviefinderimpl.getpaginglist",
								new Object[] {}, new Locale("fr", "FR")));

		// 2. get message with defined locale
		assertEquals(
				"Fail to get message (message id = 'error.moviefinderimpl.getpaginglist', locale = 'ko_KR')",
				"영화 목록 조회에 실패하였습니다.", messageSourceWithDefaultLocale
						.getMessage("error.moviefinderimpl.getpaginglist",
								new Object[] {}, new Locale("ko", "KR")));
	}

	/**
	 * [Flow #-4] Negative Case : try to get message in db with undefined
	 * message key. Exception is thrown. And try to import and export messages.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void importAndExportMessages() throws Exception {
		// 1. try to get undefined message
		try {
			messageSourceWithDefaultLocale.getMessage(
					"error.moviefinderimpl.undefined", new Object[] {},
					new Locale("ko", "KR"));
			fail("fail to process undefined messageKey");
		} catch (Exception e) {
			assertTrue("fail to check exception",
					e instanceof NoSuchMessageException);
		}

		// 2. try to import undefined message
		List<Message> messages = new ArrayList<Message>();
		Message message = new Message("error.moviefinderimpl.undefined", "ko",
				"KR", "정의되지 않은 메시지입니다.");
		messages.add(message);

		((DatabaseMessageSource) messageSourceWithDefaultLocale)
				.importMessages(messages);

		assertEquals("Fail to import messages", "정의되지 않은 메시지입니다.",
				messageSourceWithDefaultLocale.getMessage(
						"error.moviefinderimpl.undefined", new Object[] {},
						new Locale("ko", "KR")));

		// 3. try to export all messages
		List<Message> exportedMessages = ((DatabaseMessageSource) messageSourceWithDefaultLocale)
				.exportMessages();
		assertEquals("Fail to exort messages", 11, exportedMessages.size());
	}

	private int getCacheSize(DatabaseMessageSource messageSource) {
		net.sf.ehcache.Cache nativeCache = (net.sf.ehcache.Cache) (messageSource
				.getCache().getNativeCache());
		return nativeCache.getKeysWithExpiryCheck().size();
	}
}
