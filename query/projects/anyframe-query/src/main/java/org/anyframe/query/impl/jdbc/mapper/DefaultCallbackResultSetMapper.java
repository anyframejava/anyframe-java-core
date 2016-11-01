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
	 * 한번 매핑 처리된 쿼리문은 SQLLoader의 queryResultMapping에 의해 관리되도록 한다. 조회 결과값을 Map에
	 * 저장하여 전달한다. 이때 키값은 칼럼명으로 한다.
	 * 
	 * @param resultSet
	 *            조회 결과
	 * @return 조회 결과를 저장한 Map
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
