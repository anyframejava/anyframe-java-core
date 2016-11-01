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
package org.anyframe.query.impl.config.loader;

import java.util.HashMap;
import java.util.Map;

import org.anyframe.exception.MissingRequiredPropertyException;
import org.anyframe.query.MappingInfo;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

/**
 * @author Soyon Lim
 */
public class DefaultMappingInfo implements MappingInfo {
	private String className = null;

	private String tableName = null;

	private String[] columnNames = new String[0];

	private String[] fieldNames = new String[0];

	// 2009.03.17 - start
	private Map<String, String[]> compositeColumnNames = new HashMap<String, String[]>();

	private Map<String, String[]> compositeFieldNames = new HashMap<String, String[]>();
	// 2009.03.17 - end
	private String[] primaryKeyColumnNames = new String[0];

	// private static Map mappingInfos = new HashMap();

	private String selectByPrimaryKeyQuery = null;

	private String insertQuery = null;

	private String deleteQuery = null;

	private String updateQuery = null;

	public void configure(Element table) {
		className = table.getAttribute("class");
		checkRequiredAttribute("table", "class", className);

		tableName = table.getAttribute("name");
		checkRequiredAttribute("table", "name", tableName);

		NodeList mappings = table.getElementsByTagName("field-mapping");
		hasMultipleElements("table", "field-mapping", mappings.getLength());

		columnNames = new String[mappings.getLength()];
		fieldNames = new String[mappings.getLength()];
		for (int i = 0; i < mappings.getLength(); i++) {
			NodeList dbmsColumn = ((Element) mappings.item(i))
					.getElementsByTagName("dbms-column");
			hasOnlyOneElements("field-mapping", "dbms-column", dbmsColumn
					.getLength());
			columnNames[i] = dbmsColumn.item(0).getTextContent();

			NodeList classAttribute = ((Element) mappings.item(i))
					.getElementsByTagName("class-attribute");
			hasOnlyOneElements("field-mapping", "class-attribute",
					classAttribute.getLength());
			fieldNames[i] = classAttribute.item(0).getTextContent();
		}

		NodeList primarykeys = table.getElementsByTagName("primary-key");
		hasOnlyOneElements("table", "primary-key", primarykeys.getLength());

		NodeList primaryKeyColumns = ((Element) primarykeys.item(0))
				.getElementsByTagName("dbms-column");
		hasMultipleElements("primary-key", "dbms-column", primaryKeyColumns
				.getLength());

		primaryKeyColumnNames = new String[primaryKeyColumns.getLength()];
		for (int i = 0; i < primaryKeyColumns.getLength(); i++) {
			primaryKeyColumnNames[i] = ((Element) primaryKeyColumns.item(i))
					.getTextContent();
		}
	}

	/**
	 * SELECT statement for single item search including Named Parameter is
	 * created based on table mapping information. (Named Parameter is
	 * 'Anyframe.related class property name')
	 */
	public String getSelectByPrimaryKeyQuery() {
		if (selectByPrimaryKeyQuery == null) {
			StringBuilder sql = new StringBuilder("SELECT ");

			for (int i = 0, size = columnNames.length; i < size; i++) {
				sql.append(columnNames[i]);
				if (i < size - 1)
					sql.append(" , ");
			}

			sql.append(" FROM ");
			sql.append(tableName);
			if (primaryKeyColumnNames.length > 0) {
				sql.append(" WHERE ");
				for (int i = 0, size = primaryKeyColumnNames.length; i < size; i++) {
					if (i != 0)
						sql.append(" AND ");
					sql.append(primaryKeyColumnNames[i]);
					sql
							.append(" = :anyframe."
									+ getFieldNameCorrespondingToColumnName(primaryKeyColumnNames[i]));
				}
			}

			selectByPrimaryKeyQuery = sql.toString();
		}
		return selectByPrimaryKeyQuery;
	}

	/**
	 * INSERT statement including Named Parameter is created based on table
	 * mapping information. (Named Parameter is 'Anyframe.related class property
	 * name')
	 * 
	 */
	public String getInsertQuery() {
		if (insertQuery == null) {
			StringBuilder sql = new StringBuilder("INSERT INTO " + tableName
					+ " (");

			for (int i = 0, size = columnNames.length; i < size; i++) {
				sql.append(columnNames[i]);
				if (i < size - 1)
					sql.append(" , ");
			}

			sql.append(" ) ");
			sql.append(" VALUES ( ");
			for (int i = 0, size = columnNames.length; i < size; i++) {
				sql
						.append(" :anyframe."
								+ getFieldNameCorrespondingToColumnName(columnNames[i]));
				if (i != size - 1)
					sql.append(" , ");
			}
			sql.append(" ) ");
			insertQuery = sql.toString();
		}
		return insertQuery;
	}

	/**
	 * UPDATE statement including Named Parameter is created based on table
	 * mapping information. (Named Parameter is 'Anyframe.related class property
	 * name')
	 */
	public String getUpdateQuery() {
		if (updateQuery == null) {
			StringBuilder sql = new StringBuilder("UPDATE " + tableName
					+ " SET ");

			for (int i = 0, size = columnNames.length; i < size; i++) {
				sql.append(columnNames[i]);
				sql.append(" = ");
				sql
						.append(" :anyframe."
								+ getFieldNameCorrespondingToColumnName(columnNames[i]));
				if (i < size - 1)
					sql.append(" , ");
			}

			if (primaryKeyColumnNames.length > 0) {
				sql.append(" WHERE ");
				for (int i = 0, size = primaryKeyColumnNames.length; i < size; i++) {
					if (i != 0)
						sql.append(" AND ");
					sql.append(primaryKeyColumnNames[i]);
					sql
							.append(" = :anyframe."
									+ getFieldNameCorrespondingToColumnName(primaryKeyColumnNames[i]));
				}
			}
			updateQuery = sql.toString();
		}
		return updateQuery;
	}

	/**
	 * DELETE statement including Named Parameter is created based on table
	 * mapping information. (Named Parameter is 'Anyframe.related class property
	 * name')
	 */
	public String getDeleteQuery() {
		if (deleteQuery == null) {
			StringBuilder sql = new StringBuilder("DELETE ");

			sql.append(" FROM ");
			sql.append(tableName);
			if (primaryKeyColumnNames.length > 0) {
				sql.append(" WHERE ");
				for (int i = 0, size = primaryKeyColumnNames.length; i < size; i++) {
					if (i != 0)
						sql.append(" AND ");
					sql.append(primaryKeyColumnNames[i]);
					sql
							.append(" = :anyframe."
									+ getFieldNameCorrespondingToColumnName(primaryKeyColumnNames[i]));
				}
			}
			deleteQuery = sql.toString();
		}
		return deleteQuery;
	}

	protected String getFieldNameCorrespondingToColumnName(String columnName) {
		for (int i = 0, size = columnNames.length; i < size; i++) {
			if (columnNames[i].equals(columnName)) {
				return fieldNames[i];
			}
		}
		return null;
	}

	public String getClassName() {
		return className;
	}

	public String[] getPrimaryKeyColumns() {
		return primaryKeyColumnNames;
	}

	public void setColumnNames(String[] columnNames) {
		this.columnNames = columnNames;
	}

	public void setFieldNames(String[] fieldNames) {
		this.fieldNames = fieldNames;
	}

	public String getTableName() {
		return tableName;
	}

	public Map<String, String> getMappingInfoAsMap() {
		Map<String, String> rtMap = new HashMap<String, String>();
		for (int i = 0, size = columnNames.length; i < size; i++) {
			rtMap.put(columnNames[i].toLowerCase(), fieldNames[i]);
		}
		return rtMap;
	}

	// 2009.03.17 - start
	// In the case where Custom Class Type is defined within Result Class,
	// mapping information needed for setting search return value on relevant
	// object.

	public Map<String, String[]> getCompositeColumnNames() {
		return compositeColumnNames;
	}

	public void setCompositeColumnNames(
			Map<String, String[]> compositeColumnNames) {
		this.compositeColumnNames = compositeColumnNames;
	}

	public Map<String, String[]> getCompositeFieldNames() {
		return compositeFieldNames;
	}

	public void setCompositeFieldNames(Map<String, String[]> compositeFieldNames) {
		this.compositeFieldNames = compositeFieldNames;
	}

	// 2009.03.17 - end

	private void checkRequiredAttribute(String element, String name,
			String value) {
		if (value.equals("")) {
			throw new MissingRequiredPropertyException("Query Service : "
					+ name + " is essential attribute in a <" + element + ">.");
		}
	}

	private void hasMultipleElements(String parentElement, String childElement,
			int length) {
		if (length == 0) {
			throw new MissingRequiredPropertyException(
					"Query Service : must have <" + childElement
							+ "> over one in a <" + parentElement + ">.");
		}
	}

	private void hasOnlyOneElements(String parentElement, String childElement,
			int length) {
		if (length == 0 || length > 1) {
			throw new MissingRequiredPropertyException(
					"Query Service : must have one <" + childElement
							+ "> in a <" + parentElement + ">.");
		}
	}
}
