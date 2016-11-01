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
