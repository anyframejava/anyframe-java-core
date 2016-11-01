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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.query.ConfigurationException;
import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.impl.util.SQLTypeTransfer;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.SqlTypeValue;
import org.springframework.util.StringUtils;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

/**
 * @author Soyon Lim
 */
public class DefaultQueryInfo implements QueryInfo {
	protected static final String PROPERTY_NOT_SETTING = "";
	protected static final String CAMEL_CASE = "camel";
	protected static final String LOWER_CASE = "lower";

	private String queryId = null;
	private String statement = null;
	private String resultClass = null;
	// 2009.01.15 - custom resultset mapper
	private String resultMapper = null;
	private DefaultMappingInfo localMappingInfo = null;
	private boolean isDynamic = true;
	private String lobStatement = null;
	private String[] lobParamTypes = null;
	private int length = 0;
	// 2009.05.28
	private String mappingStyle = null;
	// 2011.05.03 - maxFetchSize
	private int maxFetchSize = -1;

	private String[] paramTypeNames = null;
	private String[] paramBindingTypes = null;
	private String[] paramBindingNames = null;
	private List<SqlParameter> sqlParameterList = null;
	private Map<String, Integer> paramMap = new HashMap<String, Integer>();

	public void configure(Element query) throws ConfigurationException {
		queryId = query.getAttribute("id");
		checkRequiredAttribute("query", "id", queryId);

		NodeList statements = query.getElementsByTagName("statement");

		Element statementElement = null;
		int statementLength = 0;
		for (int i = 0; i < statements.getLength(); i++) {
			Element temporaryElement = (Element) statements.item(i);

			String parentNode = temporaryElement.getParentNode().getNodeName();
			if (parentNode.equals("query")) {
				statementElement = temporaryElement;
				statementLength++;
			}
		}

		hasOnlyOneElements("query", "statement", statementLength);
		statement = statementElement.getTextContent();

		String isDynamicValue = query.getAttribute("isDynamic");
		isDynamic = isDynamicValue.equals("") ? true : new Boolean(
				isDynamicValue).booleanValue();
		String mappingStyleValue = query.getAttribute("mappingStyle");
		mappingStyle = mappingStyleValue.equals("") ? "camel"
				: mappingStyleValue;

		String maxFetchSizeValue = query.getAttribute("maxFetchSize");
		maxFetchSize = maxFetchSizeValue.equals("") ? -1 : new Integer(
				maxFetchSizeValue).intValue();

		NodeList results = query.getElementsByTagName("result");

		if (results.getLength() > 0) {
			hasOnlyOneElements("query", "result", results.getLength());
			Element result = (Element) results.item(0);

			resultClass = result.getAttribute("class");
			if (resultClass.equals("")) {
				resultClass = null;
			}
			resultMapper = result.getAttribute("mapper");
			if (resultMapper.equals("")) {
				resultMapper = null;
			}

			String lengthValue = result.getAttribute("length");
			length = lengthValue.equals("") ? 0 : new Integer(lengthValue)
					.intValue();

			NodeList resultMappings = result
					.getElementsByTagName("result-mapping");
			if (resultMappings.getLength() > 0) {
				localMappingInfo = new DefaultMappingInfo();
				ArrayList<String> columns = new ArrayList<String>();
				ArrayList<String> fields = new ArrayList<String>();

				Map<String, String[]> compositeColumnMap = new HashMap<String, String[]>();
				Map<String, String[]> compositeFieldMap = new HashMap<String, String[]>();

				for (int i = 0; i < resultMappings.getLength(); i++) {
					Element resultMapping = (Element) resultMappings.item(i);

					// extract column, attribute from local result mapping
					String column = resultMapping.getAttribute("column");
					String field = resultMapping.getAttribute("attribute");

					// if column includes separator ','
					if (isComposite(column) && isComposite(field)) {
						column = column.substring(1, column.length() - 1);
						field = field.substring(1, field.length() - 1);
						String[] compositeColumns = StringUtils
								.trimAllWhitespace(column).split(",");
						String[] compositeFieldes = StringUtils
								.trimAllWhitespace(field).split(",");

						if (compositeColumns.length == compositeFieldes.length) {
							String compositeField = "";

							for (int j = 0; j < compositeFieldes.length; j++) {
								String compositeFieldName = compositeFieldes[j];
								String tempField = compositeFieldName
										.substring(0, compositeFieldName
												.indexOf("."));
								if (i != 0 && !tempField.equals(compositeField))
									QueryService.LOGGER
											.warn(
													"Query Service : This mapping information is ignored. Property name is different. If you want to handle properties of user defined type, attribute should start with same property name. Please check result mapping (queryId ='{}')",
													queryId);
								compositeField = tempField;
								compositeFieldes[j] = compositeFieldName
										.substring(compositeFieldName
												.indexOf(".") + 1);
							}

							compositeFieldMap.put(compositeField,
									compositeFieldes);
							compositeColumnMap.put(compositeField,
									compositeColumns);
						} else {
							QueryService.LOGGER
									.warn(
											"Query Service : This mapping information is ignored. If you want to handle properties of user defined type, the number of column should be same as that of attribute. Please check result mapping (queryId ='{}')",
											queryId);
						}
					} else {
						columns.add(column);
						fields.add(field);
					}
				}

				localMappingInfo.setColumnNames((String[]) columns
						.toArray(new String[columns.size()]));
				localMappingInfo.setFieldNames((String[]) fields
						.toArray(new String[fields.size()]));
				localMappingInfo.setCompositeColumnNames(compositeColumnMap);
				localMappingInfo.setCompositeFieldNames(compositeFieldMap);
			}
		}

		NodeList params = query.getElementsByTagName("param");
		paramTypeNames = new String[params.getLength()];
		paramBindingTypes = new String[params.getLength()];
		paramBindingNames = new String[params.getLength()];

		for (int i = 0, size = params.getLength(); i < size; i++) {
			Element param = (Element) params.item(i);
			paramTypeNames[i] = param.getAttribute("type");
			paramBindingTypes[i] = param.getAttribute("binding");
			paramBindingNames[i] = param.getAttribute("name");

			if (isDynamic())
				paramMap.put(paramBindingNames[i], new Integer(SQLTypeTransfer
						.getSQLType(paramTypeNames[i].toUpperCase())));
		}

		// for Handling Lob of Oracle 8i
		NodeList lobHandlings = query.getElementsByTagName("lobStatement");

		if (lobHandlings.getLength() > 0) {
			hasOnlyOneElements("query", "lobStatement", lobHandlings
					.getLength());
			Element lobHandling = (Element) lobHandlings.item(0);

			NodeList lobStatements = lobHandling
					.getElementsByTagName("statement");
			hasOnlyOneElements("lobStatement", "statement", lobStatements
					.getLength());
			lobStatement = lobStatements.item(0).getTextContent();
			if (lobStatement.equals("")) {
				lobStatement = null;
			}

			NodeList lobParams = lobHandling.getElementsByTagName("param");
			lobParamTypes = new String[lobParams.getLength()];
			for (int i = 0; i < lobParams.getLength(); i++) {
				lobParamTypes[i] = ((Element) lobParams.item(i))
						.getAttribute("type");
			}
		}
	}

	public List<SqlParameter> getSqlParameterList() {
		if (sqlParameterList == null) {
			sqlParameterList = SQLTypeTransfer.getSqlParameterList(
					paramTypeNames, paramBindingTypes, paramBindingNames);
		}
		return sqlParameterList;
	}

	public int[] getSqlTypes() {
		int[] types = new int[paramTypeNames.length];
		for (int i = 0; i < paramTypeNames.length; i++) {
			types[i] = getSqlType(i);
		}

		return types;
	}

	public int getSqlType(int pos) {
		if (pos < paramTypeNames.length)
			return SQLTypeTransfer
					.getSQLType(paramTypeNames[pos].toUpperCase());
		else
			return SqlTypeValue.TYPE_UNKNOWN;
	}

	public int getSqlType(String paramTypeName) {
		Integer sqlType = ((Integer) paramMap.get(paramTypeName));
		if (sqlType == null)
			return SqlTypeValue.TYPE_UNKNOWN;
		else
			return sqlType.intValue();
	}

	public String getQueryId() {
		return queryId;
	}

	public String getQueryString() {
		return statement;
	}

	public String getResultClass() {
		return resultClass;
	}

	public boolean doesNeedColumnMapping() {
		return resultClass != null;
	}

	public boolean isDynamic() {
		return isDynamic;
	}

	public int getFetchCountPerQuery() {
		return length;
	}

	// 2009.05.28
	public String getMappingStyle() {
		return mappingStyle;
	}

	public DefaultMappingInfo getLocalMappingInfo() {
		return localMappingInfo;
	}

	public String[] getParamBindingNames() {
		return paramBindingNames;
	}

	public void setParamBindingNames(String[] paramBindingNames) {
		this.paramBindingNames = paramBindingNames;
	}

	public String getLobStatement() {
		return lobStatement;
	}

	public String[] getLobParamTypes() {
		return lobParamTypes;
	}

	// 2009.01.15 - custom resultset mapper
	public String getResultMapper() {
		return resultMapper;
	}

	public int getMaxFetchSize() {
		return maxFetchSize;
	}

	private boolean isComposite(String str) {
		if (str.startsWith("{") && str.endsWith("}"))
			return true;
		return false;
	}

	private void checkRequiredAttribute(String element, String name,
			String value) throws ConfigurationException {
		if (value.equals("")) {
			throw new ConfigurationException("Query Service : " + name
					+ " is essential attribute in a <" + element + ">.");
		}
	}

	private void hasOnlyOneElements(String parentElement, String childElement,
			int length) throws ConfigurationException {
		if (length == 0 || length > 1) {
			throw new ConfigurationException("Query Service : must have one <"
					+ childElement + "> in a <" + parentElement + ">.");
		}
	}
}
