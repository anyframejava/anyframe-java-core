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
package org.anyframe.query.impl.jdbc.setter;

import java.sql.CallableStatement;
import java.sql.SQLException;

import org.anyframe.query.impl.jdbc.OraclePagingJdbcTemplate;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

/**
 * Oracle-style Batch update callback interface about callable statement used by
 * the {@link OraclePagingJdbcTemplate} class.
 * 
 * @author SoYon Lim
 * @see OraclePagingJdbcTemplate#batchUpdate(String,
 *      BatchCallableStatementSetter)
 * @see BatchPreparedStatementSetter
 */
public interface BatchCallableStatementSetter {
	/**
	 * Set parameter values on the given CallableStatement.
	 * 
	 * @param ps
	 *            the CallableStatement to invoke setter methods on
	 * @param i
	 *            index of the statement we're issuing in the batch, starting
	 *            from 0
	 * @throws SQLException
	 *             if a SQLException is encountered (i.e. there is no need to
	 *             catch SQLException)
	 */
	void setValues(CallableStatement cs, int i) throws SQLException;

	/**
	 * Return the size of the batch.
	 * 
	 * @return the number of statements in the batch
	 */
	int getBatchSize();
}
