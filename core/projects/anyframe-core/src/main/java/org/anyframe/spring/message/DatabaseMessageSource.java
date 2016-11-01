/*
 * Copyright 2002-2008 the original author or authors.
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

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.List;
import java.util.Locale;
import java.util.Properties;

import javax.sql.DataSource;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.context.support.AbstractMessageSource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

/**
 * {@link org.springframework.context.MessageSource} implementation that
 * accesses resource bundles in db using dataSource.
 * <p>
 * In contrast to {@link ResourceBundleMessageSource}, this class supports
 * reading resource bundles in a specified table. This class cache messages
 * loaded from the db through cache configuration using Ehcache.
 * 
 * <p>
 * Note that the table must have key column(for message id), text column(for
 * message), language/country column (for locale). If this class can't find a
 * message, try to find a message with default locale.
 * 
 * DatabaseMessageSource Configuration Example :
 * 
 * <pre>
 * &lt;bean name="messageSource" class="org.anyframe.spring.message.DatabaseMessageSource"&gt;
 * 		&lt;property name="dataSource" ref="dataSource"/&gt;
 * 		&lt;property name="messageTable"&gt;
 * 			&lt;props&gt;
 * 			&lt;prop key="table"&gt;SAMPLE_MESSAGE_SOURCE&lt;/prop&gt;
 * 		&lt;/props&gt;
 *      &lt;/property&gt;
 * 		&lt;property name="defaultLanguage" value="ko"/&gt;
 * 		&lt;property name="defaultCountry" value="KR"/&gt;
 * 		&lt;property name="cacheConfiguration" value="classpath:/spring/ehcache.xml"/&gt;
 * &lt;/bean&gt;
 * </pre>
 * 
 * @author SoYon Lim
 */
public class DatabaseMessageSource extends AbstractMessageSource implements
		InitializingBean, ResourceLoaderAware, DisposableBean {
	private DataSource dataSource;

	private Properties messageTable;

	private String defaultLanguage = "en";

	private String defaultCountry = "US";

	private boolean lazyLoad = true;

	private String cacheConfiguration;

	private static String TABLE = "MESSAGE_SOURCE";
	private static String KEY = "KEY";
	private static String LANGUAGE = "LANGUAGE";
	private static String COUNTRY = "COUNTRY";
	private static String TEXT = "TEXT";
	private static String UNDEFINED = "UNDEFINED";

	private Locale defaultLocale;

	private JdbcTemplate jdbcTemplate;

	private Cache cache;

	private ResourceLoader resourceLoader = null;

	private String tableName;
	private String keyColumn;
	private String languageColumn;
	private String countryColumn;
	private String textColumn;

	/**
	 * initialize databaseMessageSource.
	 * <ol>
	 * <li>set jdbcTemplate for connecting to db and reading data.</li>
	 * <li>create cache instance.</li>
	 * <li>set default locale.</li>
	 * <li>in case of lazyLoad, read db messages.</li>
	 * </ol>
	 */
	public void afterPropertiesSet() throws Exception {
		try {
			// 1. get jdbcTemplate for finding db messages
			this.jdbcTemplate = new JdbcTemplate(dataSource);

			// 2. get cache
			CacheManager cacheManager = null;
			if (cacheConfiguration != null) {
				// Can only load single resources by absolute URL.
				Resource resource = resourceLoader
						.getResource(cacheConfiguration);
				cacheManager = new CacheManager(resource.getInputStream());
			} else {
				// configuring ehcache from ehcache-failsafe.xml in default
				cacheManager = new CacheManager();
			}

			cacheManager.addCache("MessageCache");
			cache = cacheManager.getCache("MessageCache");

			// 3. set default locale
			defaultLocale = new Locale(defaultLanguage, defaultCountry);

			// 4. get table information
			tableName = this.messageTable.getProperty("table", TABLE);
			keyColumn = this.messageTable.getProperty("key.column", KEY);
			languageColumn = this.messageTable.getProperty("language.column",
					LANGUAGE);
			countryColumn = this.messageTable.getProperty("country.column",
					COUNTRY);
			textColumn = this.messageTable.getProperty("text.column", TEXT);

			if (!lazyLoad) {
				// eternal attribute, when set to "true", overrides timeToLive
				// and
				// timeToIdle so that no expiration can take place.
				cache.getCacheConfiguration().setEternal(true);
				// maxElementsInMemory to 0 so that it stores unlimited objects
				// in
				// the memory
				cache.getCacheConfiguration().setMaxElementsInMemory(0);
				readMessages(true);
			}
		} catch (Exception e) {
			throw e;
		}
	}

	public void destroy() throws Exception {
		this.cache.removeAll();
	}

	/**
	 * Resolves the given message code as key in the retrieved bundles, using a
	 * cached MessageFormat instance per message code.
	 * 
	 * @param code
	 *            the code of the message to resolve
	 * @param locale
	 *            the Locale to resolve the code for
	 * @return the MessageFormat for the message, or <code>null</code> if not
	 *         found
	 */
	@Override
	protected MessageFormat resolveCode(String code, Locale locale) {
		String result = resolveCodeWithoutArguments(code, locale);

		if (result != null) {
			return createMessageFormat(result, locale);
		}

		return null;
	}

	/**
	 * Resolves the given message code as key in the retrieved bundles,
	 * returning the value found in the bundle as-is (without MessageFormat
	 * parsing).
	 * 
	 * @param code
	 *            the code of the message to resolve
	 * @param locale
	 *            the Locale to resolve the code for
	 * @return the message String, or <code>null</code> if not found
	 */
	@Override
	protected String resolveCodeWithoutArguments(String code, Locale locale) {
		// 1. read message based on locale
		String cacheKey = code + "_" + locale.getLanguage() + "_"
				+ locale.getCountry();

		String result = readMessage(code, locale, cacheKey);

		if (result == null || result.equals(UNDEFINED)) {
			// 2. read message based on default locale
			cacheKey = code + "_" + defaultLocale.getLanguage() + "_"
					+ defaultLocale.getCountry();
			result = readMessage(code, defaultLocale, cacheKey);
		}

		if (result != null && result.equals(UNDEFINED)) {
			return null;
		}
		return result;
	}

	/**
	 * refresh cache
	 */
	@SuppressWarnings("unchecked")
	public void refresh() {
		synchronized (this.cache) {
			this.cache.removeAll();
			if (!lazyLoad) {
				// 1. reload all messages if lazyLoad is false
				readMessages(true);
			}
		}
	}

	public void importMessages(final List<Message> messages) {
		StringBuilder sql = new StringBuilder();
		sql.append("INSERT INTO ").append(tableName).append("(");
		sql.append(keyColumn).append(", ");
		sql.append(languageColumn).append(", ");
		sql.append(countryColumn).append(", ");
		sql.append(textColumn).append(") ");
		sql.append("VALUES (?, ?, ?, ?)");

		jdbcTemplate.batchUpdate(sql.toString(),
				new BatchPreparedStatementSetter() {
					public void setValues(PreparedStatement ps, int i)
							throws SQLException {
						Message message = messages.get(i);
						ps.setString(1, message.getKey());
						ps.setString(2, message.getLanguage());
						ps.setString(3, message.getCountry());
						ps.setString(4, message.getText());

						if (!lazyLoad) {
							cache.put(new Element(message.getKey() + "_"
									+ message.getLanguage() + "_"
									+ message.getCountry(), message.getText()));
						}
					}

					public int getBatchSize() {
						return messages.size();
					}
				});
	}

	public List<Message> exportMessages() {
		return readMessages(false);
	}

	/**
	 * read all messages from table and put messages into cache.
	 */
	private List<Message> readMessages(final boolean caching) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT ");
		sql.append(keyColumn).append(" as key, ");
		sql.append(languageColumn).append(" as language, ");
		sql.append(countryColumn).append(" as country, ");
		sql.append(textColumn).append(" as text ");
		sql.append("FROM ").append(tableName);

		List<Message> messages = jdbcTemplate.query(sql.toString(),
				new RowMapper<Message>() {
					public Message mapRow(ResultSet rs, int idx)
							throws SQLException {
						String keyValue = rs.getString("key");
						String languageValue = rs.getString("language");
						String countryValue = rs.getString("country");
						String textValue = rs.getString("text");

						if (caching) {
							Element element = new Element(keyValue + "_"
									+ languageValue + "_" + countryValue,
									textValue);
							cache.put(element);
						}

						return new Message(keyValue, languageValue,
								countryValue, textValue);
					}
				});

		return messages;
	}

	/**
	 * read a message from table and put a message into cache.
	 * 
	 * @param code
	 *            the code of the message to resolve
	 * @param locale
	 *            the Locale to resolve the code for
	 * @return the message String, or <code>null</code> if not found
	 */
	private String readMessage(String code, Locale locale) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT ");
		sql.append(keyColumn).append(" as key, ");
		sql.append(languageColumn).append(" as language, ");
		sql.append(countryColumn).append(" as country, ");
		sql.append(textColumn).append(" as text ");
		sql.append("FROM ").append(tableName + " ");
		sql.append("WHERE ");
		sql.append(keyColumn).append("=? AND ");
		sql.append(languageColumn).append("=? AND ");
		sql.append(countryColumn).append("=?");

		String result = null;
		try {
			result = jdbcTemplate.queryForObject(sql.toString(), new Object[] {
					code, locale.getLanguage(), locale.getCountry() },
					new RowMapper<String>() {
						public String mapRow(ResultSet rs, int idx)
								throws SQLException {
							String keyValue = rs.getString("key");
							String languageValue = rs.getString("language");
							String countryValue = rs.getString("country");
							String textValue = rs.getString("text");

							Element element = new Element(keyValue + "_"
									+ languageValue + "_" + countryValue,
									textValue);
							cache.put(element);
							return textValue;
						}
					});
		} catch (EmptyResultDataAccessException e) {
			Element element = new Element(code + "_" + locale.getLanguage()
					+ "_" + locale.getCountry(), UNDEFINED);
			cache.put(element);
			return UNDEFINED;
		}

		return result;
	}

	/**
	 * read a message from cache. try to read a message from table if not found.
	 * 
	 * @param code
	 *            the code of the message to resolve
	 * @param locale
	 *            the Locale to resolve the code for
	 * @param cacheKey
	 *            key of cache, (given message code + "_" + language + "_" +
	 *            country)
	 * @return the message String, or <code>null</code> if not found
	 */
	private String readMessage(String code, Locale locale, String cacheKey) {
		String result = null;

		Element element = cache.get(cacheKey);
		if (element != null) {
			result = (String) element.getValue();
			return result;
		}

		if (lazyLoad) {
			result = readMessage(code, locale);
		}

		return result;
	}

	/****************************/
	/** GETTER, SETTER METHODS **/
	/****************************/

	public void setResourceLoader(ResourceLoader resourceLoader) {
		this.resourceLoader = resourceLoader;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public void setMessageTable(Properties messageTable) {
		this.messageTable = messageTable;
	}

	public void setLazyLoad(boolean lazyLoad) {
		this.lazyLoad = lazyLoad;
	}

	public void setDefaultLanguage(String defaultLanguage) {
		this.defaultLanguage = defaultLanguage;
	}

	public void setDefaultCountry(String defaultCountry) {
		this.defaultCountry = defaultCountry;
	}

	public void setCacheConfiguration(String cacheConfiguration) {
		this.cacheConfiguration = cacheConfiguration;
	}

	// for test
	public Cache getCache() {
		return cache;
	}
}
