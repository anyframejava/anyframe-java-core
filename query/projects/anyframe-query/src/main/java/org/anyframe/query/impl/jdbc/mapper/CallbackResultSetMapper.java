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
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.anyframe.query.MappingInfo;
import org.anyframe.query.impl.util.AbstractNameMatcher;
import org.anyframe.query.impl.util.ColumnUtil;
import org.anyframe.query.impl.util.SQLTypeTransfer;
import org.anyframe.query.impl.util.Tree;
import org.anyframe.util.StringUtil;
import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.util.LinkedCaseInsensitiveMap;

/**
 * @author SOOYEON PARK
 */
public class CallbackResultSetMapper<T> extends DefaultReflectionResultSetMapper<T> {

	// 2009.05.28
	public CallbackResultSetMapper(Class<T> targetClass,
			MappingInfo mappingInfo, LobHandler lobHandler,
			Map<String, String> nullchecks, String mappingStyle) {
		super(targetClass, mappingInfo, nullchecks, lobHandler);
		this.targetClass = targetClass;
		this.mappingStyle = mappingStyle;
		setNameMatcher(new InternalNameMatcher());
	}

	/**
	 * 2008.8.21 CamelCase Option Addition <br/>
	 * In the case where class to save search result is Map type, search result
	 * is saved. Otherwise, search return value is saved and transferred into a
	 * specific object.
	 * 
	 * @param resultSet
	 *            One Row out of search result
	 * @param rowNum
	 *            Current Row Number
	 */
	@SuppressWarnings("unchecked")
	public T mapRow(ResultSet resultSet, int rowNum) throws SQLException {
		// 2009.01.15 - custom resultset mapper
		if (customResultSetMapper != null) {
			return (T)customResultSetMapper.mapRow(resultSet);
		}
		return (T)this.mapRow(resultSet);
	}

	@SuppressWarnings("unchecked")
	public T mapRow(ResultSet resultSet) throws SQLException {
		// 2009.01.15 - custom resultset mapper
		if (Map.class.isAssignableFrom(targetClass)) {
			return (T)generateMap(resultSet);
		} else {
			// Handling by calling for mapRow of ReflectionResultSetMapper
			return (T)super.mapRow(resultSet);
		}
	}

	/**
	 * Search return value is saved and transferred into Map. In this case, key
	 * value is expressed in column name.
	 * 
	 * @param resultSet
	 *            Search result
	 * @return Map saving @return search result
	 */
	public Object generateMap(ResultSet resultSet) throws SQLException {
		// In the case using Extractor defined internally within QueryService,
		// processMetaData() is called for once in the beginning.
		// Otherwise, (In the case where Extractor provided at Spring as
		// default),
		// logic to read ResultSetMetaData is needed.

		if (!initialized)
			makeMeta(resultSet);
		Map<String, Object> mapOfColValues = createColumnMap(mappingConfiguration
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
	 * Column information is saved in Map and transferred.
	 * 
	 * @return Map saving column information
	 */
	@SuppressWarnings("unchecked")
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
	 * @see org.springframework.util.LinkedCaseInsensitiveMap
	 */
	protected Map<String, Object> createColumnMap(int initialCapacity) {
		// return CollectionFactory
		// .createLinkedCaseInsensitiveMapIfPossible(initialCapacity);
		return new LinkedCaseInsensitiveMap<Object>(initialCapacity);
	}

	/**
	 * NameMatcher class used internally to map Field name of a specific class
	 * and column name of table at CallbackResultSetMapper
	 */
	class InternalNameMatcher extends AbstractNameMatcher {

		/**
		 * In the case where there is table mapping information, Field name
		 * serving as Column name entered based on mapping information is
		 * checked. In the case where there is no table mapping information,
		 * Column name is changed into CalmelCase and the match between
		 * CamelCase and relevant Field name is checked. Capital letter and
		 * small letter are differently recognized.
		 */
		public boolean isMatching(String attributeName, String columnName,
				String parentAttributeName) {
			// 2009.03.17 - start
			String mappedAttribute = null;

			// check if mapping information exists
			if (getMappingInfo() != null) {
				mappedAttribute = getMappingInfo().getMappingInfoAsMap().get(
						columnName.toLowerCase());

				if (!StringUtil.isEmpty(mappedAttribute))
					return mappedAttribute.equals(attributeName);

				// In the case where parentAttributeName exists
				// without property information mapped within relevant
				// column, namely, mapping information on lower properties
				// excluding Primitive type among properties defined within
				// Result Class is reviewed.
				if (parentAttributeName != null) {
					// Based on mapping XML definition, Columns and attributes
					// are mapped according to their order.
					String[] columns = getMappingInfo()
							.getCompositeColumnNames().get(parentAttributeName);
					Tree<String> attributes = getMappingInfo()
							.getCompositeFieldNames().getTree(parentAttributeName);
					for (int i = 0; i < columns.length; i++) {
						if (columnName.equals(columns[i])) {

							if(attributes.getTree(attributeName) != null)
								return true;
							else
								return false;
						}
					}
				}
			}
			// If mappedAttribute is not found via above process,
			// relevant column name is changed according to mappingStyle.

			mappedAttribute = ColumnUtil.changeColumnName(mappingStyle,
					columnName);

			// If mappedAttribute is not found via above process,
			// it is handled as no mapping information.
			return mappedAttribute.equals(attributeName);
			// 2009.03.17 - end
		}

		public Field isMatching(Map<String, Field> attributeMap,
				String columnName, String parentAttributeName, Field[] parentAttributes) {
			// 2009.03.17 - start
			String mappedAttribute = null;

			// check if mapping information exists
			if (getMappingInfo() != null) {
				mappedAttribute = getMappingInfo().getMappingInfoAsMap().get(
						columnName.toLowerCase());

				if (!StringUtil.isEmpty(mappedAttribute) && attributeMap.get(mappedAttribute)!=null && (parentAttributeName == null || "".equals(parentAttributeName)))
					return attributeMap.get(mappedAttribute);

				// In the case where parentAttributeName exists without
				// property information mapped within relevant column, namely,
				// mapping information on lower properties excluding Primitive
				// type among properties defined within Result Class is
				// reviewed.
				if (parentAttributeName != null) {
					// Based on mapping XML definition, Columns and attributes
					// are mapped according to their order.
					
					String[] columns = getMappingInfo()
							.getCompositeColumnNames().get(parentAttributeName);
					
					Tree<String> attributes = getMappingInfo()
							.getCompositeFieldNames().getTree(parentAttributeName);
					
					List<Tree<String>> col = (List<Tree<String>>)attributes.getSubTrees();
					
					for (int i = 0; i < columns.length; i++) {
						Tree<String> subTree = col.get(i);
						if (columnName.equals(columns[i]) && subTree != null) {
							return attributeMap.get(subTree.getHead());
						}
					}
				}
			}
			
			// 2009.05.28 If mappedAttribute is not found via above process,
			// relevant column name is changed according to mappingStype
			// property.
			mappedAttribute = ColumnUtil.changeColumnName(mappingStyle,
					columnName);
			if (mappedAttribute != null ) {
				for (int i = 0; i < parentAttributes.length; i++) {
					if (parentAttributes[i] != null && mappedAttribute.equals(parentAttributes[i].getName())) {
						return null;
					}
				}
			}
			// If mappedAttribute is not found via above process, it is handled
			// as no mapping information.
			return attributeMap.get(mappedAttribute);
		}

		public void setFieldPrefix(String fieldPrefix) {
		}

		public void setFieldSuffix(String fieldSuffix) {
		}
	}
}
