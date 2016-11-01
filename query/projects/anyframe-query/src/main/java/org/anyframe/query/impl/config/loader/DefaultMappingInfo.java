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
package org.anyframe.query.impl.config.loader;

import java.util.HashMap;
import java.util.Map;

import org.anyframe.query.MappingInfo;
import org.apache.avalon.framework.configuration.Configuration;
import org.apache.avalon.framework.configuration.ConfigurationException;


/**
 * @author Soyon Lim
 */
public class DefaultMappingInfo implements MappingInfo {
    private String className = null;

    private String tableName = null;

    private String[] columnNames = new String[0];

    private String[] fieldNames = new String[0];

    // 2009.03.17 - start
    private Map compositeColumnNames = new HashMap();

    private Map compositeFieldNames = new HashMap();
    // 2009.03.17 - end
    private String[] primaryKeyColumns = new String[0];

    // private static Map mappingInfos = new HashMap();

    private String selectByPrimaryKeyQuery = null;

    private String insertQuery = null;

    private String deleteQuery = null;

    private String updateQuery = null;

    public void configure(Configuration configuration)
            throws ConfigurationException {
        className = configuration.getAttribute("class", null);

        if (configuration.getAttribute("name", "").equals(""))
            throw new ConfigurationException(
                "Query Service : name is essential attribute in a <table>.");
        tableName = configuration.getAttribute("name");

        Configuration[] mappings = configuration.getChildren("field-mapping");
        if (mappings.length == 0)
            throw new ConfigurationException(
                "Query Service : must have <field-mapping> over one in a <table>.");

        columnNames = new String[mappings.length];
        fieldNames = new String[mappings.length];
        for (int k = 0; k < mappings.length; k++) {
            columnNames[k] = (mappings[k].getChild("dbms-column")).getValue();
            fieldNames[k] =
                (mappings[k].getChild("class-attribute")).getValue();
        }

        Configuration[] primarykeysConfig =
            (configuration.getChild("primary-key")).getChildren("dbms-column");

        primaryKeyColumns = new String[primarykeysConfig.length];

        for (int k = 0; k < primarykeysConfig.length; k++) {
            primaryKeyColumns[k] = primarykeysConfig[k].getValue();
        }
    }

    /**
     * 테이블 매핑 정보를 기반으로 Named Parameter를 포함한 단건 조회용
     * SELECT문을 생성한다. (Named Parameter는 'anyframe.관련
     * 클래스의 속성명')
     */
    public String getSelectByPrimaryKeyQuery() {
        if (selectByPrimaryKeyQuery == null) {
            StringBuffer sql = new StringBuffer("SELECT ");

            for (int i = 0, size = columnNames.length; i < size; i++) {
                sql.append(columnNames[i]);
                if (i < size - 1)
                    sql.append(" , ");
            }

            sql.append(" FROM ");
            sql.append(tableName);
            if (primaryKeyColumns.length > 0) {
                sql.append(" WHERE ");
                for (int i = 0, size = primaryKeyColumns.length; i < size; i++) {
                    if (i != 0)
                        sql.append(" AND ");
                    sql.append(primaryKeyColumns[i]);
                    sql
                        .append(" = :anyframe."
                            + getFieldNameCorrespondingToColumnName(primaryKeyColumns[i]));
                }
            }

            selectByPrimaryKeyQuery = sql.toString();
        }
        return selectByPrimaryKeyQuery;
    }

    /**
     * 테이블 매핑 정보를 기반으로 Named Parameter를 포함한 INSERT문을
     * 생성한다. (Named Parameter는 'anyframe.관련 클래스의 속성명')
     */
    public String getInsertQuery() {
        if (insertQuery == null) {
            StringBuffer sql =
                new StringBuffer("INSERT INTO " + tableName + " (");

            for (int i = 0, size = columnNames.length; i < size; i++) {
                sql.append(columnNames[i]);
                if (i < size - 1)
                    sql.append(" , ");
            }

            sql.append(" ) ");
            sql.append(" VALUES ( ");
            for (int i = 0, size = columnNames.length; i < size; i++) {
                sql.append(" :anyframe."
                    + getFieldNameCorrespondingToColumnName(columnNames[i]));
                if (i != size - 1)
                    sql.append(" , ");
            }
            sql.append(" ) ");
            insertQuery = sql.toString();
        }
        return insertQuery;
    }

    /**
     * 테이블 매핑 정보를 기반으로 Named Parameter를 포함한 UPDATE문을
     * 생성한다. (Named Parameter는 'anyframe.관련 클래스의 속성명')
     */
    public String getUpdateQuery() {
        if (updateQuery == null) {
            StringBuffer sql =
                new StringBuffer("UPDATE " + tableName + " SET ");

            for (int i = 0, size = columnNames.length; i < size; i++) {
                sql.append(columnNames[i]);
                sql.append(" = ");
                sql.append(" :anyframe."
                    + getFieldNameCorrespondingToColumnName(columnNames[i]));
                if (i < size - 1)
                    sql.append(" , ");
            }

            if (primaryKeyColumns.length > 0) {
                sql.append(" WHERE ");
                for (int i = 0, size = primaryKeyColumns.length; i < size; i++) {
                    if (i != 0)
                        sql.append(" AND ");
                    sql.append(primaryKeyColumns[i]);
                    sql
                        .append(" = :anyframe."
                            + getFieldNameCorrespondingToColumnName(primaryKeyColumns[i]));
                }
            }
            updateQuery = sql.toString();
        }
        return updateQuery;
    }

    /**
     * 테이블 매핑 정보를 기반으로 Named Parameter를 포함한 DELETE문을
     * 생성한다. (Named Parameter는 'anyframe.관련 클래스의 속성명')
     */
    public String getDeleteQuery() {
        if (deleteQuery == null) {
            StringBuffer sql = new StringBuffer("DELETE ");

            sql.append(" FROM ");
            sql.append(tableName);
            if (primaryKeyColumns.length > 0) {
                sql.append(" WHERE ");
                for (int i = 0, size = primaryKeyColumns.length; i < size; i++) {
                    if (i != 0)
                        sql.append(" AND ");
                    sql.append(primaryKeyColumns[i]);
                    sql
                        .append(" = :anyframe."
                            + getFieldNameCorrespondingToColumnName(primaryKeyColumns[i]));
                }
            }
            deleteQuery = sql.toString();
        }
        return deleteQuery;
    }

    protected String getFieldNameCorrespondingToColumnName(String columnName) {
        for (int i = 0, size = columnNames.length; i < size; i++) {
            if (columnNames[i].equals(columnName)) {
                return fieldNames[i];
            }
        }
        return null;
    }

    public String getClassName() {
        return className;
    }

    public String[] getPrimaryKeyColumns() {
        return primaryKeyColumns;
    }

    public void setColumnNames(String[] columnNames) {
        this.columnNames = columnNames;
    }

    public void setFieldNames(String[] fieldNames) {
        this.fieldNames = fieldNames;
    }

    public String getTableName() {
        return tableName;
    }

    public Map getMappingInfoAsMap() {
        Map rtMap = new HashMap();
        for (int i = 0, size = columnNames.length; i < size; i++) {
            rtMap.put(columnNames[i].toLowerCase(), fieldNames[i]);
        }
        return rtMap;
    }

    // 2009.03.17 - start
    // Result Class내에 Custom Class Type의 속성이 정의되어 있는 경우
    // 해당 객체에 조회 결과값을 셋팅하기 위해 필요한 매핑 정보 (compositeColumnNames, compositeFieldNames)
    public Map getCompositeColumnNames() {
        return compositeColumnNames;
    }

    public void setCompositeColumnNames(Map compositeColumnNames) {
        this.compositeColumnNames = compositeColumnNames;
    }

    public Map getCompositeFieldNames() {
        return compositeFieldNames;
    }

    public void setCompositeFieldNames(Map compositeFieldNames) {
        this.compositeFieldNames = compositeFieldNames;
    }
    // 2009.03.17 - end
}
