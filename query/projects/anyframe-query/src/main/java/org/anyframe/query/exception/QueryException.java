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
package org.anyframe.query.exception;

import org.anyframe.exception.PersistenceException;

/**
 * This is an exception class for query execution
 * 
 * @author Jongpil Park
 * 
 * @since 1.5.0
 */
public class QueryException extends PersistenceException {

	private static final long serialVersionUID = 1L;

	private String sqlErrorCode = "";
	private String sqlErrorMessage = "";

	public QueryException(String message) {
		super(message);
	}

	/**
	 * Constructor with a message and an exception.
	 * 
	 * @param message
	 *            the message of this exception
	 * @param exception
	 *            the exception that is wrapped in this exception
	 */
	public QueryException(String message, Throwable exception) {
		super(message, exception);
	}

	/**
	 * Transmit the SQL error code occurred in executing the query.
	 * 
	 * @return SQL error code occurred in executing the query
	 */
	public String getSqlErrorCode() {
		return sqlErrorCode;
	}

	/**
	 * Set the SQL error code occurred in executing the query.
	 * 
	 * @param sqlErrorCode
	 *            the SQL error code occurred in executing the query
	 */
	public void setSqlErrorCode(String sqlErrorCode) {
		this.sqlErrorCode = sqlErrorCode;
	}

	/**
	 * Transmit the SQL error message occurred in executing the query.
	 * 
	 * @return SQL error message occurred in executing the query
	 */
	public String getSqlErrorMessage() {
		return sqlErrorMessage;
	}

	/**
	 * Set the SQL error message occurred in executing the query.
	 * 
	 * @param sqlErrorMessage
	 *            the SQL error message occurred in executing the query
	 */
	public void setSqlErrorMessage(String sqlErrorMessage) {
		this.sqlErrorMessage = sqlErrorMessage;
	}
}
