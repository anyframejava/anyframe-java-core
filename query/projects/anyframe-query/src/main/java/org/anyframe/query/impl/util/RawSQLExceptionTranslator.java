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

import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.support.SQLExceptionTranslator;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class RawSQLExceptionTranslator implements SQLExceptionTranslator {

	public DataAccessException translate(String task, String sql,
			SQLException sqlEx) {
		InternalDataAccessException dataAccessException = new InternalDataAccessException(
				"sql", sqlEx);
		dataAccessException.setSqlErrorCode(Integer.toString(sqlEx
				.getErrorCode()));
		dataAccessException.setSqlErrorMessage(getSqlState(sqlEx));
		return dataAccessException;
	}

	private String getSqlState(SQLException ex) {
		String sqlState = ex.getMessage();
		if (sqlState == null) {
			SQLException nestedEx = ex.getNextException();
			if (nestedEx != null) {
				sqlState = nestedEx.getMessage();
			}
		}
		return sqlState;
	}
}
