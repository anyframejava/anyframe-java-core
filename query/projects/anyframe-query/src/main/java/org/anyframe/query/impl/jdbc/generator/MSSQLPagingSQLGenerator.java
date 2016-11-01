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

/**
 * MSSQL implements of PagingSQLGenerator
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 * @since 1.1.3
 */
public class MSSQLPagingSQLGenerator extends AbstractPagingSQLGenerator {

	public String getPaginationSQL(String originalSql, Object[] originalArgs,
			int[] originalArgTypes, int pageIndex, int pageSize) {
		int topNum = pageIndex * pageSize;

		originalSql = originalSql.trim();
		originalSql = originalSql.replaceFirst("(?i)SELECT ".toLowerCase(), "SELECT top " + topNum +" ");

		StringBuffer sql = new StringBuffer("SELECT * FROM( ");
		sql.append("SELECT ORIGIN_SQL.*, ROW_NUMBER() ");
		sql.append("OVER(ORDER BY (select 0)) AS rownum ");
		sql.append("FROM (");
		sql.append(originalSql);
		sql.append(" )ORIGIN_SQL \n" + ")INNER_TABLE \n"
				+ "WHERE INNER_TABLE.rownum BETWEEN ? AND ?");

		return sql.toString();
	}

	public Object[] setQueryArgs(Object[] originalArgs, int pageIndex,
			int pageSize) {
		Object[] args = new Object[originalArgs.length + 2];

		System.arraycopy(originalArgs, 0, args, 0, originalArgs.length);
		args[originalArgs.length + 0] = new Long((pageIndex - 1)
				* pageSize + 1);
		args[originalArgs.length + 1] = new Long(pageIndex * pageSize);

		return args;
	}

	public int[] setQueryArgTypes(int[] originalArgTypes) {
		int[] argTypes = new int[originalArgTypes.length + 2];

		System.arraycopy(originalArgTypes, 0, argTypes, 0, originalArgTypes.length);
		argTypes[originalArgTypes.length + 0] = Types.INTEGER;
		argTypes[originalArgTypes.length + 1] = Types.INTEGER;

		return argTypes;
	}

	/**
	 * Generate sql for counting total size of result rows
	 * 
	 * @param originalSql
	 *            original SQL
	 * @return generated SQL
	 */
	public String getCountSQL(String originalSql) {
		
		originalSql = originalSql.replaceFirst("(?i)SELECT ", "SELECT top 100 percent ");
		StringBuffer sql = new StringBuffer("SELECT count(*) FROM (");
		sql.append(originalSql);
		sql.append(" )INNER_TABLE ");
		return sql.toString();
	}
}
