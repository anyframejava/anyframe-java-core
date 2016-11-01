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
package org.anyframe.query.impl.jdbc.mapper;

import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

import org.anyframe.query.MappingInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.impl.util.ColumnUtil;
import org.anyframe.query.impl.util.AbstractNameMatcher;
import org.anyframe.query.impl.util.SQLTypeTransfer;
import org.anyframe.util.StringUtil;
import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.core.CollectionFactory;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * @author SOOYEON PARK
 */
public class CallbackResultSetMapper extends DefaultReflectionResultSetMapper {

	private Class targetClass = null;

	// 2008.8.21 CamelCase Option Addition
	// private boolean isCamelCase = false;

	// 2009.05.28
	private String mappingStyle = null;

	protected boolean initialized = false;

	ResultSetMappingConfiguration mappingConfiguration;

	// 2009.05.28
	public CallbackResultSetMapper(Class targetClass, MappingInfo mappingInfo,
			LobHandler lobHandler, Map nullchecks, String mappingStyle) {
		super(targetClass, mappingInfo, nullchecks, lobHandler);
		this.targetClass = targetClass;
		this.mappingStyle = mappingStyle;
		setNameMatcher(new InternalNameMatcher());
	}

	/**
	 * 2008.8.21 CamelCase Option Addition <br/>
	 * 조회 결과를 저장할 클래스가 Map 유형인 경우 Map에 조회 결과값을 저장하고 그렇지 않은 경우 특정 객체에 조회 결과값을
	 * 저장하여 전달한다.
	 * 
	 * @param resultSet
	 *            조회 결과 중 하나의 Row
	 * @param rowNum
	 *            Current Row Number
	 */
	public Object mapRow(ResultSet resultSet, int rowNum) throws SQLException {
		// 2009.01.15 - custom resultset mapper
		if (customResultSetMapper != null) {
			return customResultSetMapper.mapRow(resultSet);
		}
		return this.mapRow(resultSet);
	}
	
	public Object mapRow(ResultSet resultSet) throws SQLException {
		// 2009.01.15 - custom resultset mapper
		if (Map.class.isAssignableFrom(targetClass)) {
			return generateMap(resultSet);
		} else {
			// ReflectionResultSetMapper의 mapRow 호출을 통해
			// 처리
			return super.mapRow(resultSet);
		}
	}

	/**
	 * ResultSet으로부터 Meta 정보를 읽어서 조회 결과값 셋팅을 위한 기본 정보를 추출한다. (초기에 한번 수행)
	 * 
	 * @param resultSet
	 *            조회 결과
	 * @throws SQLException
	 *             ResultSetMetaData로부터 정보 추출에 실패하였을 경우
	 */
	protected void makeMeta(ResultSet resultSet) throws SQLException {
		ResultSetMetaData resultSetMetaData = resultSet.getMetaData();

		int columnCount = resultSetMetaData.getColumnCount();
		String[] columnKeys = new String[columnCount];
		String[] columnNames = new String[columnCount];
		int[] columnTypes = new int[columnCount];

		// 2008.04.15 - added -
		// add for Gauce (2008-04-15)
		int[] columnPrecisions = new int[columnCount];
		// add for Gauce (2008-04-15)
		int[] columnScales = new int[columnCount];

		// 2009.05.28 특정 쿼리에 대해 mappingStyle이 'camel'인 경우 CamelCase 적용,
		// mappingStyle이 'lower'인 경우 소문자로 변경, mappingStyle이 'upper'인 경우 대문자로 변경
		for (int i = 0; i < columnCount; i++) {
			String columnName = resultSetMetaData.getColumnLabel(i + 1);
			int columnType = resultSetMetaData.getColumnType(i + 1);

			columnNames[i] = columnName;
			// 2008.8.21 CamelCase Option Addition

			// 2009.05.28
			columnKeys[i] = ColumnUtil.changeColumnName(this.mappingStyle,
					columnName);

			int dataType = SQLTypeTransfer.UNDEFINED;
			try {
				if (!(columnName == null
						|| (this.targetClass == null || this.targetClass
								.equals(HashMap.class)) || getMappingInfo() == null)) {
					// 테이블 매핑 정보를 이용하여 특정 칼럼과 매핑되는
					// Field를 추출한다.
					String attributeName = (String) getMappingInfo()
							.getMappingInfoAsMap().get(columnName.toLowerCase());

					// 페이징 처리시 ROW NUMBER 칼럼에 대해서는 매핑되는
					// 속성명이 존재하지 않음.
					if (attributeName == null)
						continue;
					Field attribute = this.targetClass
							.getDeclaredField(attributeName);

					// target class 특정 Field의 클래스 타입을
					// 기준으로 이와 매핑되는 SQL Type을
					// 추출한다.
					dataType = SQLTypeTransfer.getSQLType(attribute.getType());
				}
			} catch (NoSuchFieldException e) {
				QueryService.LOGGER
						.warn("Query Service : Fail to find a mapping attribute with '"
								+ columnName
								+ "' column in a target class ["
								+ this.targetClass + ".]");
			}

			// ResultSet을 이용하여 target class에 값을 셋팅할때,
			// DB 칼럼 타입이 아닌 target class
			// attribute의 타입을 기준으로 셋팅하도록 함. 단, target
			// class의 attribute가
			// java.lang.String이면서 DB 칼럼 타입이 CLOB인 경우와
			// target class의 attribute가
			// byte[]이면서 DB 칼럼 타입이 BLOB인 경우에는 DB 칼럼 타입을
			// 기준으로 셋팅함.
			if (!((dataType == Types.VARCHAR && columnType == Types.CLOB) || (dataType == Types.VARBINARY && columnType == Types.BLOB))) {
				if (dataType != SQLTypeTransfer.UNDEFINED)
					columnType = dataType;
			}

			// 2008.8.21 CamelCase Option Addition
			columnTypes[i] = columnType;
			// add for Gauce (2008-04-15)
			try {
				columnPrecisions[i] = resultSetMetaData.getPrecision(i + 1);
			} catch (NumberFormatException e) {
				// oracle 8i인 경우 CLOB, BLOB 타입의 칼럼에 대해
				// Precision 조회할 때
				// NumberFormatException이 발생함.
				columnPrecisions[i] = 0;
			}
			// add for Gauce (2008-04-15)
			columnScales[i] = resultSetMetaData.getScale(i + 1);
		}

		this.mappingConfiguration = new ResultSetMappingConfiguration(
				columnCount, columnKeys, columnNames, columnTypes,
				columnPrecisions, columnScales);
		initialized = true;
	}

	/**
	 * 조회 결과값을 Map에 저장하여 전달한다. 이때 키값은 칼럼명으로 한다.
	 * 
	 * @param resultSet
	 *            조회 결과
	 * @return 조회 결과를 저장한 Map
	 */
	public Object generateMap(ResultSet resultSet) throws SQLException {
		// QueryService 내부적으로 정의한 Extractor를 사용하는 경우에는
		// processMetaData()가 처음에 한
		// 번 호출됨. 그렇지 않은 경우(Spring에서 기본 제공하는 Extractor를
		// 사용할 경우)에는
		// ResultSetMetaData 정보를 읽어주는 로직이 필요함.
		if (!initialized)
			makeMeta(resultSet);
		Map mapOfColValues = createColumnMap(mappingConfiguration
				.getColumnCount());
		for (int i = 1; i <= mappingConfiguration.getColumnCount(); i++) {
			String key = mappingConfiguration.getColumnKeys()[i - 1];
			Object obj = getValue(resultSet, mappingConfiguration
					.getColumnTypes()[i - 1], mappingConfiguration
					.getColumnNames()[i - 1], i);
			mapOfColValues.put(key, obj);
		}
		return mapOfColValues;
	}

	/**
	 * 칼럼 정보를 Map에 담아 전달한다.
	 * 
	 * @return 칼럼 정보를 저장한 Map
	 */
	public Map getColumnInfo() {
		ListOrderedMap colInfo = new ListOrderedMap();
		for (int i = 0; i < mappingConfiguration.getColumnCount(); i++)
			colInfo.put(mappingConfiguration.getColumnKeys()[i],
					SQLTypeTransfer.getSQLTypeName(mappingConfiguration
							.getColumnTypes()[i])
							+ ":"
							+ mappingConfiguration.getColumnPrecisions()[i]
							+ ":" + mappingConfiguration.getColumnScales()[i]);
		return colInfo;
	}

	/**
	 * Create a linked case-insensitive Map if possible: if Commons Collections
	 * 3.x is available, a CaseInsensitiveMap with ListOrderedMap decorator will
	 * be created. Else, a JDK {@link java.util.LinkedHashMap} will be used.
	 * 
	 * @param initialCapacity
	 *            the initial capacity of the Map
	 * @return the new Map instance
	 * @see org.springframework.core.CollectionFactory
	 */
	protected Map createColumnMap(int initialCapacity) {
		return CollectionFactory
				.createLinkedCaseInsensitiveMapIfPossible(initialCapacity);
	}

	/**
	 * CallbackResultSetMapper 에서 특정 클래스의 Field명과 테이블의 칼럼명을 매핑하기 위해 내부적으로 사용할
	 * NameMatcher 클래스
	 */
	class InternalNameMatcher extends AbstractNameMatcher {

		/**
		 * 테이블 매핑 정보가 있는 경우 매핑 정보를 기반으로 입력된 Column명에 해당하는 Field명이 있는지 체크한다. 테이블
		 * 매핑 정보가 없는 경우에는 Column명을 CamelCase로 바꾼 후 해당 Field명과 일치하는지 체크한다. 대소문자
		 * 구분함.
		 */
		public boolean isMatching(String attributeName, String columnName,
				String parentAttributeName) {
			// 2009.03.17 - start
			String mappedAttribute = null;

			// check if mapping information exists
			if (getMappingInfo() != null) {
				mappedAttribute = (String) getMappingInfo()
						.getMappingInfoAsMap().get(columnName.toLowerCase());
				
				if (!StringUtil.isEmpty(mappedAttribute))
					return mappedAttribute.equals(attributeName);

				// 해당하는 칼럼에 매핑된 속성 정보가 존재하지 않고
				// parentAttributeName이 존재하는 경우 즉,
				// Result Class 내에 정의된 속성들 중 Primitive
				// Type이 아닌 속성이 가진 하위 속성들에 대한 매핑 정보를
				// 검토함.
				if (parentAttributeName != null) {
					// 매핑 XML 정의를 기반으로 columns와
					// attributes는 순서대로 매핑됨
					String[] columns = (String[]) getMappingInfo()
							.getCompositeColumnNames().get(parentAttributeName);
					String[] attributes = (String[]) getMappingInfo()
							.getCompositeFieldNames().get(parentAttributeName);

					for (int i = 0; i < columns.length; i++) {
						if (columnName.equals(columns[i])) {
							mappedAttribute = attributes[i];
							return mappedAttribute.equals(attributeName);
						}
					}
				}
			}
			// 2009.05.28 위 과정을 통해서 mappedAttribute를 찾지 못했다면
			// mappingStyle 속성에 따라 해당 칼럼명을 변경

			mappedAttribute = ColumnUtil.changeColumnName(mappingStyle,
					columnName);

			// 위 과정을 통해서 mappedAttribute를 찾지 못했다면 매핑 정보
			// 없음으로 처리함.
			return mappedAttribute.equals(attributeName);
			// 2009.03.17 - end
		}

		public Field isMatching(Map attributeMap, String columnName,
				String parentAttributeName) {
			// 2009.03.17 - start
			String mappedAttribute = null;

			// check if mapping information exists
			if (getMappingInfo() != null) {
				mappedAttribute = (String) getMappingInfo()
						.getMappingInfoAsMap().get(columnName.toLowerCase());
				
				if (!StringUtil.isEmpty(mappedAttribute))
					return (Field)attributeMap.get(mappedAttribute);

				// 해당하는 칼럼에 매핑된 속성 정보가 존재하지 않고
				// parentAttributeName이 존재하는 경우 즉,
				// Result Class 내에 정의된 속성들 중 Primitive
				// Type이 아닌 속성이 가진 하위 속성들에 대한 매핑 정보를
				// 검토함.
				if (parentAttributeName != null) {
					// 매핑 XML 정의를 기반으로 columns와
					// attributes는 순서대로 매핑됨
					String[] columns = (String[]) getMappingInfo()
							.getCompositeColumnNames().get(parentAttributeName);
					String[] attributes = (String[]) getMappingInfo()
							.getCompositeFieldNames().get(parentAttributeName);

					for (int i = 0; i < columns.length; i++) {
						if (columnName.equals(columns[i])) {
							mappedAttribute = attributes[i];
							return (Field)attributeMap.get(mappedAttribute);
						}
					}
				}
			}
			// 2009.05.28 위 과정을 통해서 mappedAttribute를 찾지 못했다면
			// mappingStyle 속성에 따라 해당 칼럼명을 변경

			mappedAttribute = ColumnUtil.changeColumnName(mappingStyle,
					columnName);

			// 위 과정을 통해서 mappedAttribute를 찾지 못했다면 매핑 정보
			// 없음으로 처리함.
			return (Field)attributeMap.get(mappedAttribute);
		}

		public void setFieldPrefix(String fieldPrefix) {
		}

		public void setFieldSuffix(String fieldSuffix) {
		}
	}
}
