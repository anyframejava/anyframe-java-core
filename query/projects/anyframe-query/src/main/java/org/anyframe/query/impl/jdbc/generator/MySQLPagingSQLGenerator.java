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
package org.anyframe.query.impl.jdbc.generator;

import java.sql.Types;

import org.anyframe.query.impl.jdbc.generator.AbstractPagingSQLGenerator;


public class MySQLPagingSQLGenerator extends AbstractPagingSQLGenerator {

	public String getCountSQL(String originalSql) {
		StringBuilder sql = new StringBuilder("SELECT count(*) FROM ( ");
		sql.append(originalSql);
		sql.append(" ) COUNT_TABLE ");
		return sql.toString();
	}

	public String getPaginationSQL(String originalSql, Object[] originalArgs,
			int[] originalArgTypes, int pageIndex, int pageSize) {
		String sql = new StringBuilder(originalSql.length() + 20).append(
				originalSql).append(" limit ?, ?").toString();

		return sql.toString();
	}

	public Object[] setQueryArgs(Object[] originalArgs, int pageIndex,
			int pageSize) {
		Object[] args = new Object[originalArgs.length + 2];

		for (int i = 0; i < originalArgs.length; i++) {
			args[i] = originalArgs[i];
		}

		args[originalArgs.length] = String.valueOf(new Long((pageIndex - 1)
				* pageSize));
		args[originalArgs.length + 1] = String.valueOf(new Long(pageSize));
		
		return args;
	}

	public int[] setQueryArgTypes(int[] originalArgTypes) {
		int[] argTypes = new int[originalArgTypes.length + 2];

		for (int i = 0; i < originalArgTypes.length; i++) {
			argTypes[i] = originalArgTypes[i];
		}

		argTypes[originalArgTypes.length] = Types.INTEGER;
		argTypes[originalArgTypes.length + 1] = Types.INTEGER;
		
		return argTypes;
	}
}
