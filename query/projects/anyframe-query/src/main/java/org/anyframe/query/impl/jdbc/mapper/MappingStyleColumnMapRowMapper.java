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
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Map;

import org.anyframe.query.QueryInfo;
import org.anyframe.query.impl.config.loader.SQLLoader;
import org.anyframe.query.impl.util.ColumnUtil;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.support.JdbcUtils;


/**
 * extend from Spring's ColumnMapRowMapper, with query mapping style info.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class MappingStyleColumnMapRowMapper extends ColumnMapRowMapper {

	protected QueryInfo queryInfo = null;

	protected SQLLoader sqlLoader = null;

	public MappingStyleColumnMapRowMapper(SQLLoader sqlLoader,
			QueryInfo queryInfo) {
		this.sqlLoader = sqlLoader;
		this.queryInfo = queryInfo;
	}

	public Map<String,Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
		ResultSetMetaData rsmd = rs.getMetaData();
		int columnCount = rsmd.getColumnCount();
		Map mapOfColValues = createColumnMap(columnCount);
		for (int i = 1; i <= columnCount; i++) {
			String key = getColumnKey(JdbcUtils.lookupColumnName(rsmd, i));
			Object obj = getColumnValue(rs, i);
			mapOfColValues.put(getMappingStylekey(key), obj);
		}
		return mapOfColValues;
	}

	public String getMappingStylekey(String key) {
		return ColumnUtil.changeColumnName(queryInfo.getMappingStyle(),
				key);
	}
}
