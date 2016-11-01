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

import org.anyframe.query.exception.PagingSQLCreationException;

/**
 * ALTIBASE implements of PagingSQLGenerator
 * 
 * @author Soyon Lim
 */
public class AltibasePagingSQLGenerator extends AbstractPagingSQLGenerator {

	/**
	 * Generate sql for paging 
	 * 
	 * @param originalSql
	 *            original SQL
	 * @param originalArgs
	 *            original arguments
	 * @param first
	 *            first row number to select
	 * @param pageSize
	 *            result size
	 * @return generated SQL
	 */
	public String getPaginationSQL(String originalSql, Object[] originalArgs,
			int[] originalArgTypes, int pageIndex, int pageSize) {
		if (pageIndex < 1 || pageSize < 1) {
			throw new PagingSQLCreationException(
					"Query Service : Can't generate paging SQL under Altibase. Because page number or page size is smaller than 1. [current page number = "
							+ pageIndex + ", page size = " + pageSize + "]");
		}
		StringBuilder sql = new StringBuilder(originalSql);
		sql.append(" limit ?, ?");

		return sql.toString();
	}

	public Object[] setQueryArgs(Object[] originalArgs, int pageIndex,
			int pageSize) {
		Object[] args = new Object[originalArgs.length + 2];
		
		System.arraycopy(originalArgs, 0, args, 0, originalArgs.length);

		args[originalArgs.length] = new Long(((pageIndex - 1) * pageSize) + 1);
		args[originalArgs.length + 1] = new Long(pageSize);

		return args;
	}

	public int[] setQueryArgTypes(int[] originalArgTypes) {
		int[] argTypes = new int[originalArgTypes.length + 2];

		System.arraycopy(originalArgTypes, 0, argTypes, 0, originalArgTypes.length);
		argTypes[originalArgTypes.length] = Types.BIGINT;
		argTypes[originalArgTypes.length + 1] = Types.BIGINT;

		return argTypes;
	}
}
