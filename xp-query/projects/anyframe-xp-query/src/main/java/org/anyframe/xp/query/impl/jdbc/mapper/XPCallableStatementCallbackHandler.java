package org.anyframe.xp.query.impl.jdbc.mapper;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;

import org.anyframe.query.QueryService;
import org.anyframe.query.ria.RiaCallableStatementCallback;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.support.lob.LobHandler;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataTypes;

public class XPCallableStatementCallbackHandler extends XPCallbackSupport
		implements RiaCallableStatementCallback {

	public XPCallableStatementCallbackHandler() {
	}

	private ArrayList sqlParams;
	private LobHandler lobHandler;

	public void setSQLParams(ArrayList sqlParams) {
		this.sqlParams = sqlParams;
	}

	public void setLobHandler(LobHandler lobHandler) {
		this.lobHandler = lobHandler;
	}

	public Object doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {

		ResultSet rs = null;
		cs.execute();
		DataSet dataset = null;

		for (int i = 0; i < sqlParams.size(); i++) {
			if (sqlParams.get(i) instanceof SqlOutParameter) {
				SqlOutParameter outParams = (SqlOutParameter) sqlParams.get(i);
				int sqlType = outParams.getSqlType();
				String paramName = outParams.getName();

				if (sqlType == this.CUSOR) {
					rs = (ResultSet) cs.getObject(i + 1);
					ResultSetMetaData rsMeta = rs.getMetaData();
					dataset = setResultDataSet(paramName, rs);
				}
				else {
					Object obj = cs.getObject(i + 1);
					dataset = new DataSet(paramName);
					dataset.addColumn(paramName, getDsType(sqlType), 1);
					dataset.newRow();

					dataset.set(0, paramName, obj);
				}

			}
		}
		return dataset;
	}

	public DataSet setResultDataSet(String datasetId, ResultSet rs) throws SQLException {
		DataSet dataset = new DataSet(datasetId);
		try {
			ResultSetMetaData rsmd = rs.getMetaData();

			int columnCount = rsmd.getColumnCount();
			int[] columnTypes = new int[columnCount];
			String[] fieldNames = new String[columnCount];

			for (int i = 0; i < columnCount; i++) {
				String fieldName = getMappingStylekey(queryInfo, rsmd.getColumnName(i + 1));
				int colPrecision = rsmd.getPrecision(i + 1);
				dataset.addColumn(fieldName, getDsType(rsmd.getColumnType(i + 1)), colPrecision);

				columnTypes[i] = rsmd.getColumnType(i + 1);
				fieldNames[i] = fieldName;
			}

			dataset.addColumn("_chk", DataTypes.STRING, 256);

			int rowCount = 0;

			while (rs.next()) {
				dataset.newRow();
				for (int i = 1; i <= columnCount; i++) {
					dataset.set(rowCount, fieldNames[i - 1], getValues(rs, i, columnTypes[i - 1]));
				}
				rowCount++;
			}
		}
		
		catch (Exception e) {
			QueryService.LOGGER.error("XPCallableStatment Can not convert Result to DataSet.", e);
		}
		return dataset;
	}
}
