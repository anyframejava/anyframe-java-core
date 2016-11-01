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
package org.anyframe.query.impl.jdbc.generator;

import java.sql.Types;

/**
 * DB2 implements of PagingSQLGenerator
 * @author SoYon Lim
 */
public class DB2PagingSQLGenerator extends AbstractPagingSQLGenerator {

    /**
     * Generate sql for paging
     * @param originalSql
     *        original SQL
     * @param originalArgs
     *        original arguments
     * @param first
     *        first row number to select
     * @param pageSize
     *        result size
     * @return generated SQL
     */
    public String getPaginationSQL(String originalSql, Object[] originalArgs,
            int[] originalArgTypes, int pageIndex, int pageSize) {
        originalSql = originalSql.trim();

        StringBuilder sql = new StringBuilder("SELECT * FROM ( ");
        sql.append("SELECT rownumber() over() as ROW_SEQ, ");

        if (isDistinct(originalSql)) {
            sql.append("row_.* FROM (");
            sql.append(originalSql.substring(0));
            sql.append(") AS row_ ");
            sql.append(") AS INNER_TABLE WHERE ROW_SEQ BETWEEN ? AND ?");

            return sql.toString();
        }
        if (isOrderBy(originalSql) || isAll(originalSql)) {
            sql.append("INNER_TABLE.* FROM (");
            sql.append(originalSql.substring(0));
            sql.append(") AS INNER_TABLE ) WHERE ROW_SEQ BETWEEN ? AND ?");

            return sql.toString();
        }

        sql.append(originalSql.substring(6));
        sql.append(") AS INNER_TABLE WHERE ROW_SEQ BETWEEN ? AND ?");

        return sql.toString();
    }

    public Object[] setQueryArgs(Object[] originalArgs, int pageIndex,
            int pageSize) {
        Object[] args = new Object[originalArgs.length + 2];

        for (int i = 0; i < originalArgs.length; i++) {
            args[i] = originalArgs[i];
        }
        args[originalArgs.length] = new Long((pageIndex - 1) * pageSize + 1);
        args[originalArgs.length + 1] = new Long(pageIndex * pageSize);

        return args;
    }

    public int[] setQueryArgTypes(int[] originalArgTypes) {
        int[] argTypes = new int[originalArgTypes.length + 2];

        for (int i = 0; i < originalArgTypes.length; i++) {
            argTypes[i] = originalArgTypes[i];
        }

        argTypes[originalArgTypes.length] = Types.BIGINT;
        argTypes[originalArgTypes.length + 1] = Types.BIGINT;
        
        return argTypes;
    }

    /**
     * Check if original SQL includes DISTINCT
     * @param sql
     *        trimmed original SQL
     * @return if original SQL includes DISTINCT,
     *         return true. else return false.
     */
    public boolean isDistinct(String sql) {
        String others = sql.substring(6);
        return others.toUpperCase().trim().startsWith("DISTINCT");
    }

    /**
     * Check if original SQL includes *
     * @param sql
     *        trimmed original SQL
     * @return if original SQL includes *, return true.
     *         else return false.
     */
    public boolean isAll(String sql) {
        String others = sql.substring(6);
        return others.trim().startsWith("*");
    }

    /**
     * Check if original SQL includes ORDER BY. <br/>
     * We don't permit a column name like 'ORDERBY'.
     * @param sql
     *        trimmed original SQL
     * @return if original SQL includes ORDER BY,
     *         return true. else return false.
     */
    public boolean isOrderBy(String sql) {
        sql = sql.toUpperCase().replaceAll(" ", "");
        int orderbyIdx = sql.indexOf("ORDERBY");
        return (orderbyIdx != -1);
    }
}
