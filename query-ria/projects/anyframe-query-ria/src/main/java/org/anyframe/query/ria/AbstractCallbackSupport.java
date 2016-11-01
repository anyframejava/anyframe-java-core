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
package org.anyframe.query.ria;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Map;

import org.anyframe.exception.NotSupportedColumnTypeException;
import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.impl.Pagination;
import org.anyframe.query.impl.util.ColumnUtil;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * @author Soyon Lim
 * @author JongHoon Kim
 */
public abstract class AbstractCallbackSupport {

	protected QueryInfo queryInfo = null;
	protected Pagination pagination;
	private Map<String, String> nullchecks;
	private LobHandler lobHandler;
	protected boolean needColumnInfo = true;

	public void setQueryInfo(QueryInfo queryInfo) {
		this.queryInfo = queryInfo;
	}

	public void processMetaData(ResultSet rs) throws SQLException {
	}

	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}

	public boolean isNeedColumnInfo() {
		return needColumnInfo;
	}

	public void setNeedColumnInfo(boolean needColumnInfo) {
		this.needColumnInfo = needColumnInfo;
	}

	protected abstract short getDsType(int rsType);// throws SQLException;

	protected Object getValues(ResultSet rs, int count, int columnType) {
		Object obj;
		try {
			switch (columnType) {
			case Types.VARCHAR:
				obj = rs.getString(count);
				if (obj == null && nullchecks.size() != 0)
					obj = changeNullValue("varchar", obj);
				return obj;
			case Types.INTEGER:
				return new Integer(rs.getInt(count));
			case Types.TIME:
				return rs.getTime(count);
			case Types.FLOAT:
				return new Double(rs.getDouble(count));
			case Types.BINARY:
				return rs.getBytes(count);
			case Types.CHAR:
				obj = rs.getString(count);
				if (obj == null && nullchecks.size() != 0)
					obj = changeNullValue("char", obj);
				return obj;
			case Types.DATE:
				return rs.getDate(count);
			case Types.ARRAY:
				throw new NotSupportedColumnTypeException(
						"Query Service : Not supported SQL type.");
			case Types.BIGINT:
				return new Long(rs.getLong(count));
			case Types.BIT:
				return new Boolean(rs.getBoolean(count));
			case Types.CLOB:
				return lobHandler.getClobAsString(rs, count);
			case Types.BLOB:
				return lobHandler.getBlobAsBytes(rs, count);
			case Types.DECIMAL:
				return rs.getBigDecimal(count);
			case Types.DISTINCT:
				throw new NotSupportedColumnTypeException(
						"Query Service : Not supported SQL type.");
			case Types.DOUBLE:
				return new Double(rs.getDouble(count));
			case Types.JAVA_OBJECT:
				throw new NotSupportedColumnTypeException(
						"Query Service : Not supported SQL type.");
			case Types.LONGVARBINARY:
				return rs.getBytes(count);
			case Types.LONGVARCHAR:
				obj = rs.getString(count);
				if (obj == null && nullchecks.size() != 0)
					obj = changeNullValue("longvarchar", obj);
				return obj;
			case Types.NULL:
				throw new NotSupportedColumnTypeException(
						"Query Service : Not supported SQL type.");
			case Types.NUMERIC:
				return rs.getBigDecimal(count);
			case Types.OTHER:
				throw new NotSupportedColumnTypeException(
						"Query Service : Not supported SQL type.");
			case Types.REAL:
				return new Float(rs.getFloat(count));
			case Types.REF:
				throw new NotSupportedColumnTypeException(
						"Query Service : Not supported SQL type.");
			case Types.SMALLINT:
				return new Short(rs.getShort(count));
			case Types.STRUCT:
				throw new NotSupportedColumnTypeException(
						"Query Service : Not supported SQL type.");
			case Types.TIMESTAMP:
				return rs.getTimestamp(count);
			case Types.TINYINT:
				return new Byte(rs.getByte(count));
			case Types.VARBINARY:
				return rs.getBytes(count);
			default:
				return rs.getString(count);
			} // swich
		} catch (Exception e) {
			QueryService.LOGGER.error(
					"Query Service : Not supported SQL type.", e);
		}
		return null;
	}

	private Object changeNullValue(String type, Object obj) {
		if (nullchecks.containsKey(type)) {
			return nullchecks.get(type);
		} else
			return null;
	}

	/**
	 * @param lobHandler
	 *            the lobHandler to set
	 */
	public void setLobHandler(LobHandler lobHandler) {
		this.lobHandler = lobHandler;
	}

	public void setNullCheckInfos(Map<String, String> nullCheckInfos) {
		this.nullchecks = nullCheckInfos;
	}

	public String getMappingStylekey(QueryInfo queryInfo, String key) {
		return ColumnUtil.changeColumnName(queryInfo.getMappingStyle(), key);
	}
}
