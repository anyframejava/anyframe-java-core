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
package org.anyframe.query.impl.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.util.Assert;

/**
 * Helper methods for named parameter parsing. Only intended for internal use
 * within Spring's JDBC framework. We changed
 * org.springframework.jdbc.core.namedparam.NamedParameterUtils Class into
 * org.anyframe.query.impl.util.NamedParameterUtils Class in Anyframe.
 * 
 * @since 2.0
 * @author Thomas Risberg
 * @author Juergen Hoeller
 * @author modified by JongHoon Kim
 */
public abstract class NamedParameterUtil {

	private NamedParameterUtil() {
		super();
	}

	/**
	 * Set of characters that qualify as parameter separators, indicating that a
	 * parameter name in a SQL String has ended.
	 */
	private static final char[] PARAMETER_SEPARATORS = new char[] { '(', ')',
			',', '=' };

	private static final int BLOCK_COMMENTS = 1;
	private static final int LINE_COMMENTS = 2;

	/**
	 * Parse the SQL statement and locate any placeholders or named parameters.
	 * Named parameters are substituted for a JDBC placeholder.
	 * 
	 * @param sql
	 *            the SQL statement
	 * @return the parsed statement, represented as ParsedSql instance
	 */
	public static ParsedSql parseSqlStatement(String sql) {
		Assert.notNull(sql, "SQL must not be null");

		List parameters = new ArrayList();
		Map namedParameters = new HashMap();
		ParsedSql parsedSql = new ParsedSql(sql);

		char[] statement = sql.toCharArray();
		StringBuilder newSql = new StringBuilder();
		boolean withinQuotes = false;
		char currentQuote = '-';
		int namedParameterCount = 0;
		int unnamedParameterCount = 0;
		int totalParameterCount = 0;

		int i = 0;
		while (i < statement.length) {
			char c = statement[i];
			// comments 처리 start
			char nextC = new Character(' ').charValue();
			if (i < statement.length - 1)
				nextC = statement[i + 1];

			int commentsType = isCommentsOpen(c, nextC);
			if (commentsType > 0) {
				while (!isCommentsClose(commentsType, statement.length, i, c,
						nextC)) {
					newSql.append(c);
					c = statement[++i];
					if (i < statement.length - 1)
						nextC = statement[i + 1];
					else
						nextC = new Character(' ').charValue();
				}
				newSql.append(c);
				newSql.append(nextC);
				i = i + 2;
				continue;
			}
			// comments 처리 end

			if (withinQuotes) {
				if (c == currentQuote) {
					withinQuotes = false;
					currentQuote = '-';
				}
				newSql.append(c);
			} else {
				if (c == '"' || c == '\'') {
					withinQuotes = true;
					currentQuote = c;
					newSql.append(c);
				} else {
					if (c == ':' || c == '&') {
						int j = i + 1;
						while (j < statement.length
								&& !isParameterSeparator(statement[j])) {
							j++;
						}
						if (j - i > 1) {
							String parameter = sql.substring(i + 1, j);
							if (!namedParameters.containsKey(parameter)) {
								namedParameters.put(parameter, parameter);
								namedParameterCount++;
							}
							newSql.append("?");
							parameters.add(parameter);
							totalParameterCount++;
						} else {
							newSql.append(c);
						}
						i = j - 1;
					} else {
						newSql.append(c);
						if (c == '?') {
							unnamedParameterCount++;
							totalParameterCount++;
						}
					}
				}
			}
			i++;
		}
		parsedSql.setNewSql(newSql.toString());
		parsedSql.setParameterNames((String[]) parameters
				.toArray(new String[parameters.size()]));
		parsedSql.setNamedParameterCount(namedParameterCount);
		parsedSql.setUnnamedParameterCount(unnamedParameterCount);
		parsedSql.setTotalParameterCount(totalParameterCount);
		return parsedSql;
	}

	/**
	 * Convert a Map of named parameter values to a corresponding array. This is
	 * necessary in order to reuse existing methods on JdbcTemplate. Any named
	 * parameters are placed in the correct position in the Object array based
	 * on the parsed SQL statement info.
	 * 
	 * @param parsedSql
	 *            the parsed SQL statement
	 * @param paramSource
	 *            the source for named parameters
	 */
	public static Object[] buildValueArray(ParsedSql parsedSql,
			SqlParameterSource paramSource) {
		Object[] paramArray = new Object[parsedSql.getTotalParameterCount()];
		if (parsedSql.getNamedParameterCount() > 0
				&& parsedSql.getUnnamedParameterCount() > 0) {
			throw new InvalidDataAccessApiUsageException(
					"You can't mix named and traditional ? placeholders. You have "
							+ parsedSql.getNamedParameterCount()
							+ " named parameter(s) and "
							+ parsedSql.getUnnamedParameterCount()
							+ " traditonal placeholder(s) in ["
							+ parsedSql.getSql() + "]");
		}
		String[] paramNames = parsedSql.getParameterNames();
		for (int i = 0; i < paramNames.length; i++) {
			String paramName = paramNames[i];
			try {
				paramArray[i] = paramSource.getValue(paramName);
			} catch (IllegalArgumentException ex) {
				throw new InvalidDataAccessApiUsageException(
						"No value supplied for the SQL parameter '" + paramName
								+ "': " + ex.getMessage());
			}
		}
		return paramArray;
	}

	/**
	 * Parse the SQL statement and locate any placeholders or named parameters.
	 * Named parameters are substituted for a JDBC placeholder and any select
	 * list is expanded to the required number of placeholders.
	 * <p>
	 * The parameter values passed in are used to determine the number of
	 * placeholder to be used for a select list. Select lists should be limited
	 * to 100 or fewer elements. A larger number of elements is not guaramteed
	 * to be supported by the database and is strictly vendor-dependent.
	 * 
	 * @param sql
	 *            the SQL statement
	 * @param paramSource
	 *            the source for named parameters
	 * @return the SQL statement with substituted parameters
	 */
	public static String substituteNamedParameters(String sql,
			SqlParameterSource paramSource) {
		Assert.notNull(sql, "SQL must not be null");

		char[] statement = sql.toCharArray();
		StringBuilder newSql = new StringBuilder();
		boolean withinQuotes = false;
		char currentQuote = '-';

		int i = 0;
		while (i < statement.length) {
			char c = statement[i];

			// comments 처리 start
			char nextC = new Character(' ').charValue();
			if (i < statement.length - 1)
				nextC = statement[i + 1];

			int commentsType = isCommentsOpen(c, nextC);
			if (commentsType > 0) {
				while (!isCommentsClose(commentsType, statement.length, i, c,
						nextC)) {
					newSql.append(c);
					c = statement[++i];
					if (i < statement.length - 1)
						nextC = statement[i + 1];
					else
						nextC = new Character(' ').charValue();

				}
				newSql.append(c);
				newSql.append(nextC);
				i = i + 2;
				continue;
			}
			// comments 처리 end

			if (withinQuotes) {
				if (c == currentQuote) {
					withinQuotes = false;
					currentQuote = '-';
				}
				newSql.append(c);
			} else {
				if (c == '"' || c == '\'') {
					withinQuotes = true;
					currentQuote = c;
					newSql.append(c);
				} else {
					if (c == ':' || c == '&') {
						int j = i + 1;
						while (j < statement.length
								&& !isParameterSeparator(statement[j])) {
							j++;
						}
						if (j - i > 1) {
							String paramName = sql.substring(i + 1, j);
							if (paramSource != null
									&& paramSource.hasValue(paramName)) {
								Object value = paramSource.getValue(paramName);
								if (value instanceof Collection) {
									Collection entries = (Collection) value;
									for (int k = 0; k < entries.size(); k++) {
										if (k > 0) {
											newSql.append(", ");
										}
										newSql.append("?");
									}
								} else {
									newSql.append("?");
								}
							} else {
								newSql.append("?");
							}
						} else {
							newSql.append(c);
						}
						i = j - 1;
					} else {
						newSql.append(c);
					}
				}
			}
			i++;
		}
		return newSql.toString();
	}

	/**
	 * Convert a Map of parameter types to a corresponding int array. This is
	 * necessary in order to reuse existing methods on JdbcTemplate. Any named
	 * parameter types are placed in the correct position in the Object array
	 * based on the parsed SQL statement info.
	 * 
	 * @param parsedSql
	 *            the parsed SQL statement
	 * @param paramSource
	 *            the source for named parameters
	 */
	public static int[] buildSqlTypeArray(ParsedSql parsedSql,
			SqlParameterSource paramSource) {
		int[] sqlTypes = new int[parsedSql.getTotalParameterCount()];
		String[] paramNames = parsedSql.getParameterNames();
		for (int i = 0; i < paramNames.length; i++) {
			sqlTypes[i] = paramSource.getSqlType(paramNames[i]);
		}
		return sqlTypes;
	}

	/**
	 * Determine whether a parameter name ends at the current position, that is,
	 * whether the given character qualifies as a separator.
	 */
	private static boolean isParameterSeparator(char c) {
		if (Character.isWhitespace(c)) {
			return true;
		}
		for (int i = 0; i < PARAMETER_SEPARATORS.length; i++) {
			if (c == PARAMETER_SEPARATORS[i]) {
				return true;
			}
		}
		return false;
	}

	private static int isCommentsOpen(char c, char nextC) {
		if (c == '/' && nextC == '*')
			return BLOCK_COMMENTS;
		if (c == '-' && nextC == '-')
			return LINE_COMMENTS;
		return -1;
	}

	private static boolean isCommentsClose(int commentsType, int length,
			int idx, char c, char nextC) {
		if (commentsType == BLOCK_COMMENTS && c == '*' && nextC == '/')
			return true;
		if (commentsType == LINE_COMMENTS && (c == '\n' || idx == (length - 1)))
			return true;
		return false;
	}

	/**
	 * Parse the SQL statement and locate any placeholders or named parameters.
	 * Named parameters are substituted for a JDBC placeholder.
	 * 
	 * @param sql
	 *            the SQL statement
	 */
	public static String parseSqlStatementIntoString(String sql) {
		return parseSqlStatement(sql).getNewSql();
	}

	/**
	 * Convert a Map of named parameter values to a corresponding array.
	 * <p>
	 * This is necessary in order to reuse existing methods on JdbcTemplate. See
	 * below for additional info.
	 * 
	 * @param sql
	 *            the SQL statement
	 * @param paramMap
	 *            the Map of parameters
	 */
	public static Object[] buildValueArray(String sql, Map paramMap) {
		ParsedSql parsedSql = parseSqlStatement(sql);
		return buildValueArray(parsedSql, new MapSqlParameterSource(paramMap));
	}

}
