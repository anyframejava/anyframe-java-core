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
package org.anyframe.query.impl.jdbc.setter;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.StringTokenizer;

import org.anyframe.query.DynamicSqlParameterSource;
import org.anyframe.query.impl.util.NameConverter;
import org.springframework.jdbc.core.SqlTypeValue;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class DefaultDynamicSqlParameterSource extends MapSqlParameterSource
		implements DynamicSqlParameterSource {
	public DefaultDynamicSqlParameterSource() {
	}

	@SuppressWarnings("unchecked")
	public DefaultDynamicSqlParameterSource(Map properties) {
		super(properties);
	}

	/**
	 * Input parameter(paramName) property value is extracted from Map or
	 * relevant object. In the case where there is no extracted return value,
	 * property value extraction is once tried with VariableUtil.
	 */
	public Object getValue(String paramName) {
		Object value = getVariableFromContext(paramName);
		// In the case where Value is null,
		// Logic to extract Value is removed by using
		// VariableUtil.getValueString().
		// This considers the case where query statement includes strings such
		// as
		// '%||searchKeyword||%'. Therefore, even in the case where added logic
		// or actual
		// input value is NULL, this losic allows format.
		// For details, please refer to VariableUtil.getValueString() method.
		return value;
	}

	public Object[] getKeys() {
		Map<String, Object> values = getValues();
		Object[] keys = new Object[values.size()];

		if (keys.length != 0) {
			int i = 0;
			Iterator<String> keyIterator = values.keySet().iterator();
			if (keyIterator != null) {
				keys[i++] = keyIterator.next();
			}
		}
		return keys;
	}

	private Object getVariableFromContext(String variable) {
		Object valuesMap = getValues();
		String[] strArray = convertDelimitedStringToStringArray(variable, ".");

		for (int i = 0; i < strArray.length; i++) {
			String str = strArray[i];
			try {
				valuesMap = getProperty(valuesMap, str);
			} catch (Exception e) {
				valuesMap = null;
			}
		}
		return valuesMap;
	}

//	2009.08.21 : prefix -> get~(), is~()
	@SuppressWarnings("unchecked")
	public static Object getProperty(Object obj, String propertyName)
			throws NoSuchMethodException, IllegalAccessException,
			InvocationTargetException {
		if (obj instanceof Map) {
			return ((Map) obj).get(propertyName);
		}

		Class<?>[] paramTypes = new Class[0];
		Object[] args = new Object[0];
		Object result = null;

		String methodName = buildPropertyGetterName("get", propertyName);

		Method method = null;
		try {
			method = obj.getClass().getMethod(methodName, paramTypes);
		} catch (NoSuchMethodException ne) {
			methodName = buildPropertyGetterName("is", propertyName);
			method = obj.getClass().getMethod(methodName, paramTypes);
		}

		result = method.invoke(obj, args);
		return result;
	}

//	2009.08.21 : prefix -> get~(), is~()
	protected static String buildPropertyGetterName(String prefix,
			String propertyName) {
		if (propertyName.endsWith("()"))
			return propertyName.substring(0, propertyName.length() - 2);
		return buildPropertyMethodName(prefix, propertyName);
	}

	protected static String buildPropertySetterName(String propertyName) {
		return buildPropertyMethodName("set", propertyName);
	}

	protected static String buildPropertyMethodName(String prefix,
			String propertyName) {
		StringBuilder strBuffer = new StringBuilder(prefix);
		strBuffer.append(NameConverter.capitalise(propertyName));
		return strBuffer.toString();
	}

	public static String[] convertDelimitedStringToStringArray(String str,
			String delimiter) {
		StringTokenizer strTokenizer = new StringTokenizer(str, delimiter);
		int length = strTokenizer.countTokens();

		String[] strArray = new String[length];
		int i = 0;
		while (strTokenizer.hasMoreTokens()) {
			strArray[i] = strTokenizer.nextToken().trim();
			i++;
		}

		return strArray;
	}

// {jira:AF-376|anyframe jira2}
//		private final Map<String, Integer> sqlTypes = new HashMap<String, Integer>();

	/**
	 * Register a SQL type for the given parameter.
	 * 
	 * @param paramName
	 *            the name of the parameter
	 * @param sqlType
	 *            the SQL type of the parameter
	 */
	public void addSqlType(String paramName, int sqlType) {
// {jira:AF-376|anyframe jira2}
//		this.sqlTypes.put(paramName, new Integer(sqlType));
		registerSqlType(paramName, new Integer(sqlType));
	}

	/**
	 * Return the SQL type for the given parameter, if registered.
	 * 
	 * @param paramName
	 *            the name of the parameter
	 * @return the SQL type of the parameter, or <code>TYPE_UNKNOWN</code> if
	 *         not registered
	 */
	public int getSqlType(String paramName) {
// {jira:AF-376|anyframe jira2}
//		Integer sqlType = this.sqlTypes.get(paramName);
//		if (sqlType != null) {
//			return sqlType.intValue();
//		} else {
//			return SqlTypeValue.TYPE_UNKNOWN;
//		}
		Integer sqlType = super.getSqlType(paramName);
		if (sqlType != null) {
			return sqlType.intValue();
		} else {
			return SqlTypeValue.TYPE_UNKNOWN;
		}
	}
}
