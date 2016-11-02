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

import java.sql.Types;

import org.anyframe.exception.NotSupportedColumnTypeException;
import org.anyframe.query.ria.AbstractCallbackSupport;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataTypes;

/**
 * Callback support class
 * 
 * @author Soyon Lim
 * @author JongHoon Kim
 */
public class NPCallbackSupport extends AbstractCallbackSupport {

	protected DataSet dataSet = null;

	public void setDataSet(DataSet dataSet) {
		this.dataSet = dataSet;
	}

	protected short getDsType(int rsType) {
		short type = DataTypes.STRING;
		switch (rsType) {
		case Types.ARRAY:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.BIGINT:
			type = DataTypes.LONG;
			break;
		case Types.BINARY:
			type = DataTypes.BLOB;
			break;
		case Types.BIT:
			type = DataTypes.BOOLEAN;
			break;
		case Types.CHAR:
			type = DataTypes.STRING;
			break;
		case Types.CLOB:
			type = DataTypes.STRING;
			break;
		case Types.BLOB:
			type = DataTypes.BLOB;
			break;
		case Types.DATE:
			type = DataTypes.DATE;
			break;
		case Types.DECIMAL:
			type = DataTypes.BIG_DECIMAL;
			break;
		case Types.DISTINCT:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.DOUBLE:
			type = DataTypes.DOUBLE;
			break;
		case Types.FLOAT:
			type = DataTypes.FLOAT;
			break;
		case Types.INTEGER:
			type = DataTypes.INT;
			break;
		case Types.JAVA_OBJECT:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.LONGVARBINARY:
			type = DataTypes.BLOB;
			break;
		case Types.LONGVARCHAR:
			type = DataTypes.STRING;
			break;
		case Types.NULL:
			type = DataTypes.NULL;
			break;
		case Types.NUMERIC:
			type = DataTypes.BIG_DECIMAL;
			break;
		case Types.OTHER:
			type = DataTypes.BIG_DECIMAL;
			break;
		case Types.REAL:
			type = DataTypes.BIG_DECIMAL;
			break;
		case Types.REF:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.SMALLINT:
			type = DataTypes.INT;
			break;
		case Types.STRUCT:
			throw new NotSupportedColumnTypeException(
					"Query Service : Not supported SQL type.");
		case Types.TIME:
			type = DataTypes.TIME;
			break;
		case Types.TIMESTAMP:
			type = DataTypes.UNDEFINED;
			break;
		case Types.TINYINT:
			type = DataTypes.INT;
			break;
		case Types.VARBINARY:
			type = DataTypes.BLOB;
			break;
		case Types.VARCHAR:
			type = DataTypes.STRING;
			break;
		default:
			type = DataTypes.STRING;
			break;
		}
		return type;
	}
}
