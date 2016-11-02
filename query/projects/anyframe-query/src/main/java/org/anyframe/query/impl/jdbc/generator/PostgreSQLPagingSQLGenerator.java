/**
 * 
 */
package org.anyframe.query.impl.jdbc.generator;

import java.sql.Types;

/**
 * @author Alex
 *
 */
public class PostgreSQLPagingSQLGenerator extends AbstractPagingSQLGenerator {

	/**
	 * Generate sql for counting total size of result rows
	 * 
	 * @param originalSql
	 *            original SQL
	 * @return generated SQL
	 */
	@Override
	public String getCountSQL(String originalSql) {
		StringBuilder sql = new StringBuilder("SELECT count(*) FROM ( ");
		sql.append(originalSql);
		sql.append(" ) AS CNT ");
		return sql.toString();
	}

	public String getPaginationSQL(String originalSql, Object[] originalArgs,
			int[] originalArgTypes, int pageIndex, int pageSize) {
		StringBuilder sql = new StringBuilder(
				" SELECT * FROM ( SELECT   INNER_TABLE.* , ROW_NUMBER() OVER() AS ROW_SEQ FROM ( \n");
		sql.append(originalSql);

		sql.append(" ) INNER_TABLE LIMIT ? ) AS TAB  WHERE ROW_SEQ BETWEEN ? AND ?");

		return sql.toString();
	}

	public Object[] setQueryArgs(Object[] originalArgs, int pageIndex,
			int pageSize) {
		Object[] args = new Object[originalArgs.length + 3];

		for (int i = 0; i < originalArgs.length; i++) {
			args[i] = originalArgs[i];
		}

		args[originalArgs.length] = String.valueOf(new Long(pageIndex
				* pageSize));
		args[originalArgs.length + 1] = String.valueOf(new Long((pageIndex - 1)
				* pageSize + 1));
		args[originalArgs.length + 2] = String.valueOf(new Long(pageIndex
				* pageSize));

		return args;
	}

	public int[] setQueryArgTypes(int[] originalArgTypes) {
		int[] argTypes = new int[originalArgTypes.length + 3];

		for (int i = 0; i < originalArgTypes.length; i++) {
			argTypes[i] = originalArgTypes[i];
		}

		argTypes[originalArgTypes.length] = Types.BIGINT;
		argTypes[originalArgTypes.length + 1] = Types.BIGINT;
		argTypes[originalArgTypes.length + 2] = Types.BIGINT;

		return argTypes;
	}

}
