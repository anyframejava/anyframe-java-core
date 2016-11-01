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
package org.anyframe.xp.query.impl.jdbc.mapper;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.anyframe.query.QueryInfo;
import org.anyframe.query.ria.RiaRowCallback;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataTypes;

/**
 * DataSet Callback Handler Class
 * 
 * @author Soyon Lim
 */
public class XPDataSetCallbackHandler extends XPCallbackSupport implements
		RiaRowCallback {

	private int rowCount;

	private int columnCount;

	private int[] columnTypes;

	private String[] fieldNames;

	// Default Constructor
	public XPDataSetCallbackHandler() {

	}

	public void setDataSet(Object dataSet) {
		this.dataSet = (DataSet) dataSet;
	}

	public XPDataSetCallbackHandler(DataSet dataSet, QueryInfo queryInfo) {
		this.dataSet = dataSet;
		this.queryInfo = queryInfo;
	}

	public void processMetaData(ResultSet rs) throws SQLException {
		ResultSetMetaData rsmd = rs.getMetaData();
		this.columnCount = rsmd.getColumnCount();
		this.columnTypes = new int[this.columnCount];
		this.fieldNames = new String[this.columnCount];
		dataSet.setChangeStructureWithData(true);
		dataSet.addColumn("_chk", DataTypes.STRING, 256);

		if (pagination.isPaging()) {
			dataSet
					.addConstantColumn("totalCount", pagination
							.getRecordCount());
			dataSet.addConstantColumn("pageIndex", pagination.getPageIndex());
			dataSet.addConstantColumn("pageCount", pagination.getPageCount());
			dataSet.addConstantColumn("pageSize", pagination.getPageSize());
		}

		for (int i = 0; i < this.columnCount; i++) {
			String fieldName = getMappingStylekey(queryInfo, rsmd
					.getColumnLabel(i + 1));

			int colPrecision = rsmd.getPrecision(i + 1);

			if (colPrecision == -1) {
				dataSet.addColumn(fieldName, getDsType(rsmd
						.getColumnType(i + 1)));
			} else {
				dataSet.addColumn(fieldName, getDsType(rsmd
						.getColumnType(i + 1)), colPrecision);
			}

			this.columnTypes[i] = rsmd.getColumnType(i + 1);
			this.fieldNames[i] = fieldName;
		}
	}

	public void processRow(ResultSet rs) throws SQLException {

		dataSet.newRow();
		for (int i = 1; i <= columnCount; i++) {
			dataSet.set(rowCount, fieldNames[i - 1], getValues(rs, i,
					columnTypes[i - 1]));
		}
		rowCount++;
	}
}
