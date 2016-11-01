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
package org.anyframe.query;

import java.util.Map;

/**
 * This is a class for the role of saving the mapping
 * info of the defined table inside the query mapping
 * XML file.
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public interface MappingInfo {

    /**
     * Transmits the Primary Key columns defined in the
     * mapping info of the arbitrary table
     * @return Primary Key columns
     */
    String[] getPrimaryKeyColumns();

    /**
     * Transmits the table name defined inside the
     * arbitrary table mapping info
     * @return table name
     */
    String getTableName();

    /**
     * Transmits the related class name in defined in
     * the arbitrary table mapping info
     * @return related class name
     */
    String getClassName();

    /**
     * Tranmits the property name of the mapping class,
     * arbitrary table's column name
     * @return The column mapping info of the arbitrary
     *         table
     */
    Map getMappingInfoAsMap();

    /**
     * Based on the arbitrary mapping info, transmits
     * by creating SELECT query statement including the
     * Named Parameter. The appropriate SELECT
     * statement is created by using the defined
     * PRIMARY KEY. (Named Parameter is "anyframe." +
     * "related class's property name")
     * @return SELECT query statement
     */
    String getSelectByPrimaryKeyQuery();

    /**
     * Tranmits by creating the INSERT query statement
     * including the Named Parameter based on the
     * arbitrary table mapping info. (Named Parameter
     * is "anyframe." + "related class's property
     * name")
     * @return INSERT query statement
     */
    String getInsertQuery();

    /**
     * Tranmits by creating the UPDATE query statement
     * including the Named Paremter based on the
     * arbitrary table mapping info (Named Parameter is
     * "anyframe." + "related class's property name")
     * @return UPDATE query statement
     */
    String getUpdateQuery();

    /**
     * Based on the arbitrary mapping info, trasmits by
     * creating the DELETE query statement including
     * hte Named Parameter based on the arbitrary
     * mapping info (Named Parameter is "anyframe." +
     * "related class's property name")
     * @return DELETE query statement
     */
    String getDeleteQuery();

    // 2009.03.17 - start
    Map getCompositeColumnNames();

    Map getCompositeFieldNames();
    // 2009.03.17 - end    

}
