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
package org.anyframe.query.impl.config.loader;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.anyframe.query.MappingInfo;
import org.anyframe.query.QueryInfo;
import org.anyframe.query.SqlLoader;
import org.anyframe.query.impl.jdbc.mapper.ResultSetMappingConfiguration;
import org.anyframe.query.impl.util.Tree;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

/**
 * This is a Abstract class in order to implement SqlLoader easily. Each
 * sqlLoader is implemented by inheriting this class and must implement
 * loadMappings(). Table mappings and query mappings are accumulated through
 * calling putQueryMappingInfo() or putTableMappingInfo() in loadMappings().
 * QueryService uses accumulated table-mappings and query-mappings to execute
 * specified query statement.
 * 
 * @author Soyon Lim 
 * 
 */
public abstract class AbstractSqlLoader implements SqlLoader, InitializingBean,
		DisposableBean {

	private boolean skipError = false;

	private int dynamicReload = 0;

	private final Map<String, String> nullchecks = new HashMap<String, String>();

	private final Map<String, QueryInfo> queryInfos = new HashMap<String, QueryInfo>();

	private final Map<String, MappingInfo> tableMappings = new HashMap<String, MappingInfo>();

	private final Map<String, ResultSetMappingConfiguration> queryResultMappings = new HashMap<String, ResultSetMappingConfiguration>();

	private int registeredQueryCount = 0;

	public abstract void loadMappings();

	public void afterPropertiesSet() {
		loadMappings();
	}

	public void destroy() {
		clearMappings();
		getNullchecks().clear();
	}

	public int countQuery() {
		return registeredQueryCount;
	}

	public boolean hasQuery(String queryId) {
		return queryInfos.get(queryId) != null;
	}

	public String getQueryStatement(String queryId) {
		return queryInfos.get(queryId).getQueryString();
	}

	public boolean isDynamicQueryStatement(String queryId) {
		return queryInfos.get(queryId).isDynamic();
	}

	public int getFetchCountPerQuery(String queryId) {
		return queryInfos.get(queryId).getFetchCountPerQuery();
	}

	public String getTableFromClassName(String className) {
		return tableMappings.get(className).getTableName();
	}

	public Map<String, String> getNullCheck() {
		return nullchecks;
	}

	public String[] getPrimaryKeysFromClassName(String className) {
		return tableMappings.get(className).getPrimaryKeyColumns();
	}

	public Map<String, QueryInfo> getQueryInfos() {
		return queryInfos;
	}

	public Map<String, MappingInfo> getMappingInfos() {
		return tableMappings;
	}

	public MappingInfo getMappingInfo(String queryId) {
		if (!hasQuery(queryId))
			return null;
		final DefaultQueryInfo queryInfo = (DefaultQueryInfo) queryInfos
				.get(queryId);

		DefaultMappingInfo mappingInfo = queryInfo.getLocalMappingInfo();
		String resultClass = queryInfo.getResultClass();

		if (mappingInfo != null)
			return mappingInfo;

		mappingInfo = (DefaultMappingInfo) tableMappings.get(resultClass);

		if (resultClass == null || mappingInfo == null)
			return new MappingInfo() {

				public String getInsertQuery() {
					return null;
				}

				public String getDeleteQuery() {
					return null;
				}

				// 2009.03.17 - start
				// Operation added to IMappingInfo is implemented.

				public Map<String, String[]> getCompositeColumnNames() {
					return null;
				}

				public Tree<String> getCompositeFieldNames() {
					return null;
				}

				// 2009.03.17 - end

				public Map<String, String> getMappingInfoAsMap() {
					return new HashMap<String, String>() {

						private static final long serialVersionUID = 1L;

						public void clear() {
						}

						public boolean containsKey(Object key) {
							return true;
						}

						public boolean containsValue(Object value) {
							return true;
						}

						public Set<Map.Entry<String, String>> entrySet() {
							return null;
						}

						// 2009.05.28
						@SuppressWarnings("unused")
						public String get(String key) {
							return null;
							// return
							// ColumnUtil.changeColumnName(queryInfo.getMappingStyle(),
							// (String)key);
						}

						public boolean isEmpty() {
							return false;
						}

						public Set<String> keySet() {
							return null;
						}

						public String put(String key, String value) {
							return null;
						}

						public void putAll(Map<? extends String, ? extends String> t) {
						}

						@SuppressWarnings("unused")
						public String remove(String key) {
							return null;
						}

						public int size() {
							return 0;
						}

						public Collection<String> values() {
							return null;
						}
					};
				}

				public String[] getPrimaryKeyColumns() {
					return null;
				}

				public String getSelectByPrimaryKeyQuery() {
					return null;
				}

				public String getTableName() {
					return null;
				}

				public String getClassName() {
					return null;
				}

				public String getUpdateQuery() {
					return null;
				}

			};
		else
			return mappingInfo;
	}

	/******* Setter & Getters ***********/
	public void setRegisteredQueryCount(int registeredQueryCount) {
		this.registeredQueryCount = registeredQueryCount;
	}

	public void setDynamicReload(int dynamicReload) {
		this.dynamicReload = dynamicReload;
	}

	public void setSkipError(boolean skipError) {
		this.skipError = skipError;
	}

	public void setNullchecks(Map<String, String> nullchecks) {
		Iterator<String> itr = nullchecks.keySet().iterator();
		while (itr.hasNext()) {
			String key = itr.next();
			String value = nullchecks.get(key);
			
			this.nullchecks.put(key.toLowerCase(), value);
		}
	}

	public int getDynamicReload() {
		return dynamicReload;
	}

	public boolean isSkipError() {
		return skipError;
	}

	public Map<String, String> getNullchecks() {
		return nullchecks;
	}

	public Map<String, ResultSetMappingConfiguration> getQueryResultMappings() {
		return queryResultMappings;
	}

	/******* Protected Methods ***********/
	void putQueryMappingInfo(String queryId, QueryInfo queryInfo) {
		this.queryInfos.put(queryId, queryInfo);
	}

	void putTableMappingInfo(String className, MappingInfo mappingInfo) {
		this.tableMappings.put(className, mappingInfo);
	}

	void incrementQueryCount() {
		++registeredQueryCount;
	}

	void clearMappings() {
		queryInfos.clear();
		tableMappings.clear();
		this.registeredQueryCount = 0;
	}
}
