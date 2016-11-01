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
package org.anyframe.query.impl.jdbc.setter;

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
public class DefaultDynamicSqlParameterSource extends MapSqlParameterSource implements
		DynamicSqlParameterSource {
	public DefaultDynamicSqlParameterSource() {
	}

	public DefaultDynamicSqlParameterSource(Map properties) {
		super(properties);
	}

	/**
	 * Map 또는 해당 객체로부터 입력 인자(paramName)의 속성값을 추출한다. 추출한 결과값이 존재하지 않을 경우
	 * VariableUtil을 이용하여 속성값 추출을 재시도한다.
	 */
	public Object getValue(String paramName) {
		Object value = getVariableFromContext(paramName);
		// value가 null일 경우
		// VariableUtil.getValueString()를 이용하여 value
		// 추출하는 로직 제거함.
		// 이는 쿼리문에 '%||searchKeyword||%'와 같은 문자열이 포함된
		// 경우를 고려하여
		// 추가된 로직이나 실제 입력된 값이 NULL인 경우에도 이 로직을 통해 ''
		// 형태가 되고 있었음.
		// 자세한 내용은 VariableUtil.getValueString() 메소드
		// 참고할 것.
		return value;
	}

	public Object[] getKeys() {
		Map values = getValues();
		Object[] keys = new Object[values.size()];

		if (keys.length != 0) {
			int i = 0;
			Iterator keyIterator = values.keySet().iterator();
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

	// 2009.08.21 : prefix -> get~(), is~()
	public static Object getProperty(Object obj, String propertyName)
			throws Exception {
		if (obj instanceof Map) {
			return ((Map) obj).get(propertyName);
		}

		Class[] paramTypes = new Class[0];
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

	// 2009.08.21 : prefix -> get~(), is~()
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

	private final Map sqlTypes = new HashMap();

	/**
	 * Register a SQL type for the given parameter.
	 * 
	 * @param paramName
	 *            the name of the parameter
	 * @param sqlType
	 *            the SQL type of the parameter
	 */
	public void addSqlType(String paramName, int sqlType) {
		this.sqlTypes.put(paramName, new Integer(sqlType));
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
		Integer sqlType = (Integer) this.sqlTypes.get(paramName);
		if (sqlType != null) {
			return sqlType.intValue();
		} else {
			return SqlTypeValue.TYPE_UNKNOWN;
		}
	}

}
