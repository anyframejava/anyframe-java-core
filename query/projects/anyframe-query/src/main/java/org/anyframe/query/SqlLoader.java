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
package org.anyframe.query;

import java.util.Map;

import org.anyframe.query.impl.jdbc.mapper.ResultSetMappingConfiguration;

/**
 * This is a class for the role of loading the mapping infomration. QueryService
 * finds and executes the query statement using query id based on the mapping
 * information.
 * 
 * @author SoYon Lim
 */
public interface SqlLoader {
	/**
	 * Checks whether this loader has given query identifier.
	 * 
	 * @param queryId
	 *            identifier of query statement which defined in query mappings
	 * @return true if this loader has given query identifier
	 */
	boolean hasQuery(String queryId);

	/**
	 * Find all table-class mapping information which defined in query mappings.
	 * 
	 * @return list of table-class mapping information includes result class,
	 *         related table to result class, mappings between attributes and
	 *         columns, etc.)
	 */
	Map<String, MappingInfo> getMappingInfos();

	/**
	 * Find all query information which defined in query mappings.
	 * 
	 * @return list of query information includes queryId, query statement,
	 *         result class, result maaping style, query params, max fetch size,
	 *         etc.)
	 */
	Map<String, QueryInfo> getQueryInfos();

	/**
	 * Tramsmits the size of result operated for the appropriate query
	 * statement.
	 * 
	 * @param queryId
	 *            identifier of query statement which defined in query mappings
	 * @return size of the result which is defined as the attribute of an
	 *         arbitrary query statement
	 */
	int getFetchCountPerQuery(String queryId);

	/**
	 * Find all defined values to be converted when null value is returned
	 * because there is no DB column value.
	 * 
	 * @return map consist of column type and defined default value
	 */
	Map<String, String> getNullCheck();

	/**
	 * Count all queries which defined in query mappings.
	 * 
	 * @return number of queries
	 */
	int countQuery();

	/**
	 * Find mapping information between table and a specific class be defined.
	 * 
	 * @param queryId
	 *            identifier of query statement which defined in query mappings
	 * @return table-class mapping information includes result class, related
	 *         table to result class, mappings between attributes and columns,
	 *         etc.)
	 */
	MappingInfo getMappingInfo(String queryId);

	/**
	 * Find all result mapping information based on attributes of result class
	 * and result columns.
	 * 
	 * @return list of mapping information for query execution result includes
	 *         attributes, table-columns, setters of result class, etc.)
	 */
	Map<String, ResultSetMappingConfiguration> getQueryResultMappings();

	/**
	 * Transmits the defined query statement.
	 * 
	 * @param queryId
	 *            identifier of query statement which defined in query mappings
	 * @return query statement
	 */
	String getQueryStatement(String queryId);

	/**
	 * Checks whether the appropriate query statement is dynamic query.
	 * 
	 * @param queryId
	 *            identifier of query statement which defined in query mappings
	 * @return isDynamic's value which is defined in the arbitrary query's
	 *         configuration (default=true)
	 */
	boolean isDynamicQueryStatement(String queryId);
}
