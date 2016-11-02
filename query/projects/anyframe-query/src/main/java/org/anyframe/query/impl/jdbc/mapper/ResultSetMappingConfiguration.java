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
package org.anyframe.query.impl.jdbc.mapper;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Map;

public class ResultSetMappingConfiguration {
	private final String[] columnNames;
	private final int[] columnTypes;
	private Field[] attributes;
	private Method[] setters;
	// 2009.03.17 - start
	private Map<String, ResultSetMappingConfiguration> compositeObjMap;
	private Class<?> resultClass;
	private Method compositeClassSetter;
	private int columnCount = 0;
	private String[] columnKeys = null;
	// add for Gauce (2008-04-15)
	private int[] columnPrecisions = null; 
	private int[] columnScales = null;

	public ResultSetMappingConfiguration(String[] columnNames,
			int[] columnTypes, Field[] attributes, Method[] setters,
			Map<String, ResultSetMappingConfiguration> compositeObjMap) {
		this.columnNames = columnNames;
		this.columnTypes = columnTypes;
		this.attributes = attributes;
		this.setters = setters;
		// 2009.03.17 - start
		this.compositeObjMap = compositeObjMap;
		// 2009.03.17 - end
	}

	public ResultSetMappingConfiguration(int columnCount, String[] columnKeys,
			String[] columnNames, int[] columnTypes, int[] columnPrecisions,
			int[] columnScales) {
		this.columnCount = columnCount;
		this.columnKeys = columnKeys;
		this.columnTypes = columnTypes;
		this.columnNames = columnNames;
		this.columnPrecisions = columnPrecisions;
		this.columnScales = columnScales;
	}

	public void setResultClass(Class<?> resultClass) {
		this.resultClass = resultClass;
	}

	public void setCompositeClassSetter(Method compositeClassSetter) {
		this.compositeClassSetter = compositeClassSetter;
	}

	public String[] getColumnNames() {
		return columnNames;
	}

	public int[] getColumnTypes() {
		return columnTypes;
	}

	public Field[] getAttributes() {
		return attributes;
	}

	public Method[] getSetters() {
		return setters;
	}

	public Map<String, ResultSetMappingConfiguration> getCompositeObjMap() {
		return compositeObjMap;
	}

	public Class<?> getResultClass() {
		return resultClass;
	}

	public Method getCompositeClassSetter() {
		return compositeClassSetter;
	}

	public int getColumnCount() {
		return columnCount;
	}

	public String[] getColumnKeys() {
		return columnKeys;
	}

	public int[] getColumnPrecisions() {
		return columnPrecisions;
	}

	public int[] getColumnScales() {
		return columnScales;
	}
}
