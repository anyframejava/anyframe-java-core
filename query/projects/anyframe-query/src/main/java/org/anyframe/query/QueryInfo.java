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

import java.util.List;

/**
 * This is a class for the role of saving the info about query statement defined
 * in the query mapping xml file.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public interface QueryInfo {

	/**
	 * Transmits the defined query statement.
	 * 
	 * @return query statement
	 */
	String getQueryString();

	/**
	 * Transmits the identifier of the appropriate query statement.
	 * 
	 * @return identifier of query statement
	 */
	String getQueryId();

	/**
	 * Transmits the class for saving the executed results of the appropriate
	 * query statement.
	 * 
	 * @return result class
	 */
	String getResultClass();

	/**
	 * Checks whether to map in an arbitray class the execution results of
	 * appropriate query statement.
	 * 
	 * @return In case of the result class is defined, then true, else false
	 */
	boolean doesNeedColumnMapping();

	/**
	 * Checks whether the appropriate query statement is dynamic query.
	 * 
	 * @return isDynamic's value which is defined in the arbitrary query's
	 *         configuration (default=true)
	 */
	boolean isDynamic();

	// 2008.8.20 add
	/**
	 * 해당 쿼리문 수행 결과를 Map 또는 별도 정의된 클래스에 매핑할 때 CamelCase를 적용할 것인지 여부를 체크한다.
	 * 
	 * @return 특정 쿼리문의 속성인 isCamelCase의 value (default=true)
	 */

	// 2009.05.28
	/**
	 * When mapping in the defined class or Map for the appropriate query's
	 * execution results, check for whether to apply CamelCase
	 * 
	 * @return isCamelCase's value which is defined in the arbitrary query's
	 *         configuration (default=true)
	 */
	// boolean isCamelCase();
	// 2009.05.28
	/**
	 * When mapping in the defined class or Map for the appropriate query's
	 * execution results, check mapping style (must be one of CamelCase,
	 * LowerCase, UpperCase)
	 * 
	 * @return mappingStyle's value which is defined in the arbitrary query's
	 *         configuration (default='camel')
	 */
	String getMappingStyle();

	// 2008.8.20 add
	/**
	 * Tramsmits the size of result operated for the appropriate query
	 * statement.
	 * 
	 * @return size of the result which is defined as the child element of an
	 *         arbitrary query statement
	 */
	int getFetchCountPerQuery();

	/**
	 * Transmits the SqlParameter list including the variable type, type name,
	 * etc. for replacing in the appropriate query statement.
	 * 
	 * @return SqlParameter list
	 */
	List getSqlParameterList();

	/**
	 * Transmits the variable's sql types defined in the arbitrary order among
	 * the variables for replacing in the appropriate query statement
	 * 
	 * @param pos
	 *            Order of the arbitrary variable
	 * @return variable's sql type of the arbitrary place
	 */
	int getSqlType(int pos);

	/**
	 * Transmits the variable's sql types for replacing in the appropriate query
	 * statement
	 * 
	 * @return sql type list of variables
	 */
	int[] getSqlTypes();

	/**
	 * Transmits the variable's sql types defined as arbitray name among the
	 * variables for replacing in the appropropriate query statement
	 * 
	 * @param name
	 *            name of the arbitrary variable
	 * @return variable's sql type of the arbitrary name
	 */
	int getSqlType(String name);

	/**
	 * Transmits the statement (for Oracle 8i) in the case where an arbitrary
	 * lobStatement is defined for handling the LOB type data
	 * 
	 * @return lob statement for LOB handling
	 */
	String getLobStatement();

	/**
	 * Transmits the defined Parameter (for Oracle 8i) in the case where a
	 * separate lobStatement is defined for handling the LOB type
	 * 
	 * @return lob parameter for handling a LOB
	 */
	String[] getLobParamTypes();

	// 2009.01.15 - custom resultset mapper
	/**
	 * Transmits the defined resultset mapper class.
	 * 
	 * @return resultset mapper class name
	 */
	String getResultMapper();
}
