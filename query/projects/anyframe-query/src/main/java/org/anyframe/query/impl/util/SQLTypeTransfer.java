/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.query.impl.util;

import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.anyframe.query.QueryService;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;


/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class SQLTypeTransfer {
	private static HashMap sqltypenames = new HashMap();

	private static HashMap sqltypes = new HashMap();

	private static HashMap userdefinedtypes = new HashMap();

	private static HashMap javatypes = new HashMap();

	public static int UNDEFINED = -1;

	private SQLTypeTransfer() {
		super();
	}

	static {
		javatypes.put(java.lang.String.class, new Integer(Types.VARCHAR));
		javatypes.put(java.math.BigDecimal.class, new Integer(Types.NUMERIC));
		javatypes.put(boolean.class, new Integer(Types.BIT));
		javatypes.put(byte.class, new Integer(Types.TINYINT));
		javatypes.put(short.class, new Integer(Types.SMALLINT));
		javatypes.put(int.class, new Integer(Types.INTEGER));
		javatypes.put(long.class, new Integer(Types.BIGINT));
		javatypes.put(float.class, new Integer(Types.REAL));
		javatypes.put(double.class, new Integer(Types.DOUBLE));
		javatypes.put(byte[].class, new Integer(Types.VARBINARY));
		javatypes.put(java.sql.Date.class, new Integer(Types.DATE));
		javatypes.put(java.sql.Time.class, new Integer(Types.TIME));
		javatypes.put(java.sql.Timestamp.class, new Integer(Types.TIMESTAMP));
		javatypes.put(Double.class, new Integer(Types.DOUBLE));
		javatypes.put(Long.class, new Integer(Types.BIGINT));
		javatypes.put(Character.class, new Integer(Types.CHAR));
		javatypes.put(Short.class, new Integer(Types.SMALLINT));
		javatypes.put(Integer.class, new Integer(Types.INTEGER));
		javatypes.put(Float.class, new Integer(Types.REAL));
		javatypes.put(java.util.Date.class, new Integer(Types.DATE));
		javatypes.put(Byte.class, new Integer(Types.TINYINT));
		javatypes.put(Boolean.class, new Integer(Types.BIT));

		sqltypes.put("BIGINT", new Integer(Types.BIGINT));
		sqltypes.put("BINARY", new Integer(Types.BINARY));
		sqltypes.put("BIT", new Integer(Types.BIT));
		sqltypes.put("BLOB", new Integer(Types.BLOB));
		sqltypes.put("CHAR", new Integer(Types.CHAR));
		sqltypes.put("CLOB", new Integer(Types.CLOB));
		sqltypes.put("DATE", new Integer(Types.DATE));
		sqltypes.put("DECIMAL", new Integer(Types.DECIMAL));
		sqltypes.put("DOUBLE", new Integer(Types.DOUBLE));
		sqltypes.put("FLOAT", new Integer(Types.FLOAT));
		sqltypes.put("INTEGER", new Integer(Types.INTEGER));
		sqltypes.put("LONGVARBINARY", new Integer(Types.LONGVARBINARY));
		sqltypes.put("LONGVARCHAR", new Integer(Types.LONGVARCHAR));
		sqltypes.put("NULL", new Integer(Types.NULL));
		sqltypes.put("NUMERIC", new Integer(Types.NUMERIC));
		sqltypes.put("OTHER", new Integer(Types.OTHER));
		sqltypes.put("REAL", new Integer(Types.REAL));
		sqltypes.put("SMALLINT", new Integer(Types.SMALLINT));
		sqltypes.put("TIME", new Integer(Types.TIME));
		sqltypes.put("TIMESTAMP", new Integer(Types.TIMESTAMP));
		sqltypes.put("TINYINT", new Integer(Types.TINYINT));
		sqltypes.put("VARBINARY", new Integer(Types.VARBINARY));
		sqltypes.put("VARCHAR", new Integer(Types.VARCHAR));

		sqltypes.put("ROWID", new Integer(-8));
		sqltypes.put("CURSOR", new Integer(-10));
		sqltypes.put("JAVA_STRUCT", new Integer(2008));
		sqltypes.put("PLSQL_INDEX_TABLE", new Integer(-14));
		sqltypes.put("FIXED_CHAR", new Integer(999));
		sqltypes.put("DATALINK", new Integer(70));

		sqltypes.put("DISTINCT", new Integer(Types.DISTINCT));
		sqltypes.put("STRUCT", new Integer(Types.STRUCT));
		sqltypes.put("JAVA_OBJECT", new Integer(Types.JAVA_OBJECT));
		sqltypes.put("ARRAY", new Integer(Types.ARRAY));
		sqltypes.put("REF", new Integer(Types.REF));

		userdefinedtypes.put("DISTINCT", new Integer(Types.DISTINCT));
		userdefinedtypes.put("STRUCT", new Integer(Types.STRUCT));
		userdefinedtypes.put("JAVA_OBJECT", new Integer(Types.JAVA_OBJECT));
		userdefinedtypes.put("ARRAY", new Integer(Types.ARRAY));
		userdefinedtypes.put("REF", new Integer(Types.REF));

		sqltypenames.put(new Integer(Types.ARRAY), "ARRAY");
		sqltypenames.put(new Integer(Types.BIGINT), "BIGINT");
		sqltypenames.put(new Integer(Types.BINARY), "BINARY");
		sqltypenames.put(new Integer(Types.BIT), "BIT");
		sqltypenames.put(new Integer(Types.BLOB), "BLOB");
		sqltypenames.put(new Integer(Types.CHAR), "CHAR");
		sqltypenames.put(new Integer(Types.CLOB), "CLOB");
		sqltypenames.put(new Integer(Types.DATE), "DATE");
		sqltypenames.put(new Integer(Types.DECIMAL), "DECIMAL");
		sqltypenames.put(new Integer(Types.DISTINCT), "DISTINCT");
		sqltypenames.put(new Integer(Types.DOUBLE), "DOUBLE");
		sqltypenames.put(new Integer(Types.FLOAT), "FLOAT");
		sqltypenames.put(new Integer(Types.INTEGER), "INTEGER");
		sqltypenames.put(new Integer(Types.JAVA_OBJECT), "JAVA_OBJECT");
		sqltypenames.put(new Integer(Types.LONGVARBINARY), "LONGVARBINARY");
		sqltypenames.put(new Integer(Types.LONGVARCHAR), "LONGVARCHAR");
		sqltypenames.put(new Integer(Types.NULL), "NULL");
		sqltypenames.put(new Integer(Types.NUMERIC), "NUMERIC");
		sqltypenames.put(new Integer(Types.OTHER), "OTHER");
		sqltypenames.put(new Integer(Types.REAL), "REAL");
		sqltypenames.put(new Integer(Types.REF), "REF");
		sqltypenames.put(new Integer(Types.SMALLINT), "SMALLINT");
		sqltypenames.put(new Integer(Types.STRUCT), "STRUCT");
		sqltypenames.put(new Integer(Types.TIME), "TIME");
		sqltypenames.put(new Integer(Types.TIMESTAMP), "TIMESTAMP");
		sqltypenames.put(new Integer(Types.TINYINT), "TINYINT");
		sqltypenames.put(new Integer(Types.VARBINARY), "VARBINARY");
		sqltypenames.put(new Integer(Types.VARCHAR), "VARCHAR");
		sqltypenames.put(new Integer(-8), "ROWID");
		sqltypenames.put(new Integer(-10), "CURSOR");
		sqltypenames.put(new Integer(2008), "JAVA_STRUCT");
		sqltypenames.put(new Integer(2000), "JAVA_OBJECT");
		sqltypenames.put(new Integer(-14), "PLSQL_INDEX_TABLE");
		sqltypenames.put(new Integer(999), "FIXED_CHAR");
		sqltypenames.put(new Integer(70), "DATALINK");
	}

	public static int getSQLType(final String typeName) {
		int retValue = -1;

		if (sqltypes.containsKey(typeName)) {
			try {
				retValue = ((Integer) (sqltypes.get(typeName))).intValue();
			} catch (Exception e) {
				QueryService.LOGGER
						.error("Query Service : Not supported sql type. ["
								+ typeName + "]" + e.getStackTrace().toString());
			}
		}
		return retValue;

	}

	public static int getSQLType(final Class clazz) {
		int retValue = UNDEFINED;

		if (javatypes.containsKey(clazz)) {
			try {
				retValue = ((Integer) (javatypes.get(clazz))).intValue();
			} catch (Exception e) {
				QueryService.LOGGER
						.error("Query Service : Not supported java type. ["
								+ clazz.getName() + "]"
								+ e.getStackTrace().toString());
			}
		}
		return retValue;
	}

	public static List getSqlParameterList(String[] paramTypeNames,
			String[] paramBindingTypes, String[] paramBindingNames) {
		ArrayList list = new ArrayList();
		for (int i = 0; i < paramTypeNames.length; i++) {

			int type = SQLTypeTransfer.getSQLType(paramTypeNames[i]
					.toUpperCase());
			if ("IN".equals(paramBindingTypes[i].toUpperCase())) {
				list.add(new SqlParameter(paramBindingNames[i], type,
						paramTypeNames[i]));
			} else if ("OUT".equals(paramBindingTypes[i].toUpperCase())) {
				if ("CURSOR".equals(paramTypeNames[i].toUpperCase())
						|| "OTHER".equals(paramTypeNames[i].toUpperCase())) {
					list.add(new SqlOutParameter(paramBindingNames[i], type,
							new ColumnMapRowMapper()));
				} else {
					if (userdefinedtypes.containsKey(paramTypeNames[i])) {
						list.add(new SqlOutParameter(paramBindingNames[i],
								type, paramTypeNames[i]));
					} else {
						list
								.add(new SqlOutParameter(paramBindingNames[i],
										type));
					}
				}
			} else if ("INOUT".equals(paramBindingTypes[i].toUpperCase())) {
				if ("CURSOR".equals(paramTypeNames[i].toUpperCase())
						|| "OTHER".equals(paramTypeNames[i].toUpperCase())) {
					list.add(new SqlOutParameter(paramBindingNames[i], type,
							new ColumnMapRowMapper()));
				} else {
					if (userdefinedtypes.containsKey(paramTypeNames[i])) {
						list.add(new SqlOutParameter(paramBindingNames[i],
								type, paramTypeNames[i]));
					} else {
						list
								.add(new SqlOutParameter(paramBindingNames[i],
										type));
					}
				}
			} else {
				list.add(new SqlParameter(paramBindingNames[i], type,
						paramTypeNames[i]));
			}

		}
		return list;
	}

	public static String getSQLTypeName(final int type) {
		String retValue = "";

		if (sqltypenames.containsKey(new Integer(type))) {
			try {
				retValue = (String) sqltypenames.get(new Integer(type));
			} catch (Exception e) {
				QueryService.LOGGER
						.error("Query Service : Not supported sql type. ["
								+ type + "]" + e.getStackTrace().toString());
			}
		}
		return retValue;
	}
}
