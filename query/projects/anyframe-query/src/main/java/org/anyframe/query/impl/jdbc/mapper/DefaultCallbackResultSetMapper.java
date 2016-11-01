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
package org.anyframe.query.impl.jdbc.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.anyframe.query.MappingInfo;
import org.springframework.jdbc.support.lob.LobHandler;


public class DefaultCallbackResultSetMapper extends CallbackResultSetMapper {
	// 2009.05.28
	public DefaultCallbackResultSetMapper(Class targetClass,
			MappingInfo mappingInfo, LobHandler lobHandler, Map nullchecks,
			String mappingStyle) {
		super(targetClass, mappingInfo, lobHandler, nullchecks, mappingStyle);
	}

	/**
	 * Once mapped query statement should be managed by queryResultMapping of SQLLoader.
	 * Search return value is saved and Map and transferred. In this case, key value is 
	 * expressed in colmnname.  
	 * 
	 * @param resultSet
	 *            Search result
	 * @return Map saving search result
	 */
	public Object generateMap(ResultSet resultSet) throws SQLException {
		if (sqlLoader.getQueryResultMappings().containsKey(queryId)) {
			mappingConfiguration = (ResultSetMappingConfiguration) sqlLoader
					.getQueryResultMappings().get(queryId);
		} else {
			if (!initialized)
				makeMeta(resultSet);
			sqlLoader.getQueryResultMappings().put(queryId, mappingConfiguration);
		}

		Map mapOfColValues = createColumnMap(mappingConfiguration.getColumnCount());
		for (int i = 1; i <= mappingConfiguration.getColumnCount(); i++) {
			String key = mappingConfiguration.getColumnKeys()[i - 1];
			Object obj = getValue(resultSet,
					mappingConfiguration.getColumnTypes()[i - 1], mappingConfiguration
							.getColumnNames()[i - 1], i);
			mapOfColValues.put(key, obj);
		}
		return mapOfColValues;
	}
}
