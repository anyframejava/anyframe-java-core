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
package org.anyframe.np.query.impl.jdbc.mapper;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;

import org.anyframe.query.QueryService;
import org.anyframe.query.ria.RiaCallableStatementCallback;
import org.anyframe.np.query.impl.jdbc.mapper.NPCallableStatementCallbackHandler;
import org.anyframe.np.query.impl.jdbc.mapper.NPCallbackSupport;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.support.lob.LobHandler;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.DataTypes;

/**
 * Callback Handler Class for CallableStatement
 * 
 * @author Youngmin Jo
 */
public class NPCallableStatementCallbackHandler extends NPCallbackSupport
		implements RiaCallableStatementCallback {

	public NPCallableStatementCallbackHandler() {
		
	}

	private List<SqlParameter> sqlParams;

	@SuppressWarnings("unused")
	private LobHandler lobHandler;
	
	public void setSQLParams(List<SqlParameter> sqlParams) {
		this.sqlParams = sqlParams;
	}

	public void setLobHandler(LobHandler lobHandler) {
		this.lobHandler = lobHandler;
	}
	
	public Object doInCallableStatement(CallableStatement cs)
			throws SQLException {

		ResultSet rs = null;
		cs.execute();
		DataSetList dataSetList = new DataSetList();

		for(int i = 0 ; i < sqlParams.size() ; i++){
			if(sqlParams.get(i) instanceof SqlOutParameter) {
				SqlOutParameter outParams = (SqlOutParameter) sqlParams.get(i);
				int sqlType = outParams.getSqlType();
				String paramName = outParams.getName();
				
				if(sqlType == NPCallableStatementCallbackHandler.CUSOR) {
					rs = (ResultSet) cs.getObject(i + 1);
					dataSetList.add(setResultDataSet(paramName, rs));
				} else {
					Object obj = cs.getObject(i + 1);
					DataSet outDs = new DataSet(paramName);
					outDs.addColumn(paramName, getDsType(sqlType), 1);
					
					outDs.newRow();
					outDs.set(0, paramName, obj);
					
					dataSetList.add(outDs);
				}
			}
		}
	
		return dataSetList;
	}

	public DataSet setResultDataSet(String datasetId, ResultSet rs) {
		DataSet dataset = new DataSet(datasetId);
		try {
			ResultSetMetaData rsmd = rs.getMetaData();

			int columnCount = rsmd.getColumnCount();
			int[] columnTypes = new int[columnCount];
			String[] fieldNames = new String[columnCount];

			for (int i = 0; i < columnCount; i++) {
				String fieldName = getMappingStylekey(queryInfo, rsmd
						.getColumnName(i + 1));
				int colPrecision = rsmd.getPrecision(i + 1);
				dataset.addColumn(fieldName, getDsType(rsmd
						.getColumnType(i + 1)), colPrecision);

				columnTypes[i] = rsmd.getColumnType(i + 1);
				fieldNames[i] = fieldName;
			}

			dataset.addColumn("_chk", DataTypes.STRING, 256);

			int rowCount = 0;

			while (rs.next()) {
				dataset.newRow();
				for (int i = 1; i <= columnCount; i++) {
					dataset.set(rowCount, fieldNames[i - 1], getValues(rs, i,
							columnTypes[i - 1]));
				}
				rowCount++;
			}
		} catch (SQLException e) {
			QueryService.LOGGER.error(
					"NPCallableStatment Can not convert Result to DataSet.", e);
		}
		return dataset;
	}
}
