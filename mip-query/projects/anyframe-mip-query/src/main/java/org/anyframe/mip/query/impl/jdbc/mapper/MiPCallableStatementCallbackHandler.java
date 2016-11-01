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
package org.anyframe.mip.query.impl.jdbc.mapper;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;

import org.anyframe.query.QueryService;
import org.anyframe.query.ria.RiaCallableStatementCallback;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.support.lob.LobHandler;

import com.tobesoft.platform.data.ColumnInfo;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.Variant;

/**
 * Callback Handler Class for CallableStatement
 * 
 * @author youngmin.jo
 */
public class MiPCallableStatementCallbackHandler extends MiPCallbackSupport
		implements RiaCallableStatementCallback {

	public MiPCallableStatementCallbackHandler() {
	}

	private List<SqlParameter> sqlParams;
	private LobHandler lobHandler;

	public void setSQLParams(List<SqlParameter> sqlParams) {
		this.sqlParams = sqlParams;
	}

	public void setLobHandler(LobHandler lobHandler) {
		this.lobHandler = lobHandler;
	}

	/**
	 * @return
	 */
	public LobHandler getLobHandler() {
		return this.lobHandler;
	}

	public Object doInCallableStatement(CallableStatement cs)
			throws SQLException {

		ResultSet rs = null;
		cs.execute();
		Dataset dataset = null;

		for (int i = 0; i < sqlParams.size(); i++) {
			if (sqlParams.get(i) instanceof SqlOutParameter) {
				SqlOutParameter outParams = (SqlOutParameter) sqlParams.get(i);
				int sqlType = outParams.getSqlType();
				String paramName = outParams.getName();

				if (sqlType == MiPCallableStatementCallbackHandler.CUSOR) {
					rs = (ResultSet) cs.getObject(i + 1);
					dataset = setResultDataset(paramName, rs);
				} else {
					Object obj = cs.getObject(i + 1);
					dataset = new Dataset(paramName);
					dataset.addColumn(paramName, getDsType(sqlType), 1);
					dataset.appendRow();

					Variant variant = new Variant();
					variant.setObject(obj);
					dataset.setColumn(0, paramName, variant);
				}

			}
		}
		return dataset;
	}

	public Dataset setResultDataset(String datasetId, ResultSet rs)
			throws SQLException {
		Dataset dataset = new Dataset(datasetId);
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

			dataset.addColumn("_chk", ColumnInfo.COLTYPE_STRING, 256);

			int rowCount = 0;

			while (rs.next()) {
				dataset.appendRow();
				for (int i = 1; i <= columnCount; i++) {
					Variant variant = new Variant();
					variant.setObject(getValues(rs, i, columnTypes[i - 1]));
					dataset.setColumn(rowCount, fieldNames[i - 1], variant);
				}
				rowCount++;
			}
		} catch (SQLException e) {
			QueryService.LOGGER
					.error(
							"MiPCallableStatment Can not convert Result to Dataset.",
							e);
		}
		return dataset;
	}
}
