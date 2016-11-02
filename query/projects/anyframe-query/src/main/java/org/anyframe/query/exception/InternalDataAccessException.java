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

import org.springframework.dao.DataAccessException;

/**
 * @author SOOYEON PARK
 */
public class InternalDataAccessException extends DataAccessException {
	
	private static final long serialVersionUID = 1L;
	
	private String sqlErrorCode = "";
	private String sqlErrorMessage = "";

	public InternalDataAccessException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	/**
	 * @return the sqlErrorCode
	 */
	public String getSqlErrorCode() {
		return sqlErrorCode;
	}

	/**
	 * @param sqlErrorCode
	 *            the sqlErrorCode to set
	 */
	public void setSqlErrorCode(String sqlErrorCode) {
		this.sqlErrorCode = sqlErrorCode;
	}

	/**
	 * @return the sqlErrorMessage
	 */
	public String getSqlErrorMessage() {
		return sqlErrorMessage;
	}

	/**
	 * @param sqlErrorMessage
	 *            the sqlErrorMessage to set
	 */
	public void setSqlErrorMessage(String sqlErrorMessage) {
		this.sqlErrorMessage = sqlErrorMessage;
	}
}
