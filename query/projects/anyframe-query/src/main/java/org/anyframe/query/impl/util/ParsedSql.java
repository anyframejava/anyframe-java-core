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

/**
 * Holds information for parsed SQL statements. We changed
 * org.springframework.jdbc.core.namedparam.ParsedSql Class into
 * anyframe.core.query.impl.util.ParsedSql Class in Anyframe.
 * 
 * @since 2.0
 * @author Thomas Risberg
 * @author modified by JongHoon Kim
 */
public class ParsedSql {

	private String sql;

	private String newSql;

	private String[] parameterNames;

	private int namedParameterCount;

	private int unnamedParameterCount;

	private int totalParameterCount;

	/**
	 * Creates a new instance of the {@link ParsedSql} class.
	 */
	public ParsedSql() {
	}

	/**
	 * Creates a new instance of the {@link ParsedSql} class.
	 * 
	 * @param sql
	 *            the SQL statement that is being (or is to be) parsed
	 */
	public ParsedSql(String sql) {
		this.sql = sql;
	}

	/**
	 * Set the SQL statement that is being (or is to be) parsed.
	 */
	public void setSql(String sql) {
		this.sql = sql;
	}

	/**
	 * Get the SQL statement that is being (or is to be) parsed.
	 */
	public String getSql() {
		return sql;
	}

	/**
	 * Set the new (parsed) SQL.
	 */
	public void setNewSql(String newSql) {
		this.newSql = newSql;
	}

	/**
	 * Get the new (parsed) SQL.
	 */
	public String getNewSql() {
		return newSql;
	}

	/**
	 * Set the parameters (bind variables) in the parsed SQL statement. Repeated
	 * occurences of the same parameter name are included here.
	 */
	public void setParameterNames(String[] parameterNames) {
		this.parameterNames = parameterNames;
	}

	/**
	 * Get all of the parameters (bind variables) in the parsed SQL statement.
	 * Repeated occurences of the same parameter name are included here.
	 */
	public String[] getParameterNames() {
		return parameterNames;
	}

	/**
	 * Set the count of named parameters in the SQL statement. Each parameter
	 * name counts once; repeated occurences do not count here.
	 */
	public void setNamedParameterCount(int namedParameterCount) {
		this.namedParameterCount = namedParameterCount;
	}

	/**
	 * Get the count of named parameters in the SQL statement. Each parameter
	 * name counts once; repeated occurences do not count here.
	 */
	public int getNamedParameterCount() {
		return namedParameterCount;
	}

	/**
	 * Set the count of all of the unnamed parameters in the SQL statement.
	 */
	public void setUnnamedParameterCount(int unnamedParameterCount) {
		this.unnamedParameterCount = unnamedParameterCount;
	}

	/**
	 * Gets the count of all of the unnamed parameters in the SQL statement.
	 */
	public int getUnnamedParameterCount() {
		return unnamedParameterCount;
	}

	/**
	 * Set the total count of all of the parameters in the SQL statement.
	 * Repeated occurences of the same parameter name do count here.
	 */
	public void setTotalParameterCount(int totalParameterCount) {
		this.totalParameterCount = totalParameterCount;
	}

	/**
	 * Get the total count of all of the parameters in the SQL statement.
	 * Repeated occurences of the same parameter name do count here.
	 */
	public int getTotalParameterCount() {
		return totalParameterCount;
	}

}
