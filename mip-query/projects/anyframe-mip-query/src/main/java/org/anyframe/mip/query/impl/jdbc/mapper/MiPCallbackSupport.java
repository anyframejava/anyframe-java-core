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

import java.sql.Types;

import org.anyframe.exception.NotSupportedColumnTypeException;
import org.anyframe.query.ria.AbstractCallbackSupport;

import com.tobesoft.platform.data.ColumnInfo;
import com.tobesoft.platform.data.Dataset;

/**
 * Callback support class
 * 
 * @author Soyon Lim
 * @author JongHoon Kim
 */
public class MiPCallbackSupport extends AbstractCallbackSupport {

	protected Dataset dataSet = null;

	public void setDataSet(Dataset dataSet) {
		this.dataSet = dataSet;
	}

	protected short getDsType(int rsType) {
		short type = ColumnInfo.COLTYPE_STRING;
		switch (rsType) {
		case Types.ARRAY:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.BIGINT:
			type = ColumnInfo.COLTYPE_LONG;
			break;
		case Types.BINARY:
			type = ColumnInfo.COLTYPE_BLOB;
			break;
		case Types.BIT:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.CHAR:
			type = ColumnInfo.COLTYPE_STRING;
			break;
		case Types.CLOB:
			type = ColumnInfo.COLTYPE_STRING;
			break;
		case Types.BLOB:
			type = ColumnInfo.COLTYPE_BLOB;
			break;
		case Types.DATE:
			type = ColumnInfo.COLTYPE_DATE;
			break;
		case Types.DECIMAL:
			type = ColumnInfo.COLTYPE_DECIMAL;
			break;
		case Types.DISTINCT:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.DOUBLE:
			type = ColumnInfo.COLTYPE_DECIMAL;
			break;
		case Types.FLOAT:
			type = ColumnInfo.COLTYPE_DECIMAL;
			break;
		case Types.INTEGER:
			type = ColumnInfo.COLTYPE_INT;
			break;
		case Types.JAVA_OBJECT:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.LONGVARBINARY:
			type = ColumnInfo.COLTYPE_UNKNOWN;
			break;
		case Types.LONGVARCHAR:
			type = ColumnInfo.COLTYPE_STRING;
			break;
		case Types.NULL:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.NUMERIC:
			type = ColumnInfo.COLTYPE_DECIMAL;
			break;
		case Types.OTHER:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.REAL:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.REF:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.SMALLINT:
			type = ColumnInfo.COLTYPE_INT;
			break;
		case Types.STRUCT:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.TIME:
			type = ColumnInfo.COLTYPE_UNKNOWN;
			break;
		case Types.TIMESTAMP:
			type = ColumnInfo.COLTYPE_UNKNOWN;
			break;
		case Types.TINYINT:
			type = ColumnInfo.COLTYPE_UNKNOWN;
			break;
		case Types.VARBINARY:
			type = ColumnInfo.COLTYPE_UNKNOWN;
			break;
		case Types.VARCHAR:
			type = ColumnInfo.COLTYPE_STRING;
			break;
		default:
			type = ColumnInfo.COLTYPE_STRING;
			break;
		}
		return type;
	}
}
