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
package org.anyframe.query.impl.config.loader;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.impl.util.SQLTypeTransfer;
import org.apache.avalon.framework.configuration.Configuration;
import org.apache.avalon.framework.configuration.ConfigurationException;
import org.springframework.jdbc.core.SqlTypeValue;
import org.springframework.util.StringUtils;


/**
 * @author Soyon Lim
 */
public class DefaultQueryInfo implements QueryInfo {
	protected static final String PROPERTY_NOT_SETTING = "";
	protected static final String CAMEL_CASE = "camel";
	protected static final String LOWER_CASE = "lower";

	private String queryId = null;
	private String queryString = null;
	private String resultClass = null;
	// 2009.01.15 - custom resultset mapper
	private String resultMapper = null;
	private DefaultMappingInfo localMappingInfo = null;
	private boolean isDynamic = true;
	private boolean isCamelCase = true;
	private String lobStatement = null;
	private String[] lobParamTypes = null;
	private int length = 0;
	// 2009.05.28
	private String mappingStyle = null;

	private String[] paramTypeNames = null;
	private String[] paramBindingTypes = null;
	private String[] paramBindingNames = null;
	private List sqlParameterList = null;
	private Map paramMap = new HashMap();

	public void configure(Configuration queryConfig)
			throws ConfigurationException {
		queryId = queryConfig.getAttribute("id", "");
		if (queryId.equals(""))
			throw new ConfigurationException(
					"Query Service : id is essential attribute in a <query>.");

		queryString = queryConfig.getChild("statement").getValue();
		isDynamic = queryConfig.getAttributeAsBoolean("isDynamic", true);
		// 2008.11.27 change default value (false ->
		// true)
		isCamelCase = queryConfig.getAttributeAsBoolean("isCamelCase", true);
		// 2009.05.28
		mappingStyle = queryConfig.getAttribute("mappingStyle", null);
		// TODO - will be deprecated when isCamelCase is substituted by
		// mappingStyle.
		checkMappingStyle();

		Configuration results = queryConfig.getChild("result", false);

		if (results != null) {
			resultClass = results.getAttribute("class", null);
			// 2009.01.15 - custom resultset mapper
			resultMapper = results.getAttribute("mapper", null);
			length = results.getAttributeAsInteger("length", 0);
			Configuration[] resultMappings = results
					.getChildren("result-mapping");
			if (resultMappings.length > 0) {
				localMappingInfo = new DefaultMappingInfo();
				ArrayList columns = new ArrayList();
				ArrayList fields = new ArrayList();

				Map compositeColumnMap = new HashMap();
				Map compositeFieldMap = new HashMap();
				for (int i = 0; i < resultMappings.length; i++) {
					// 정의된 local result mapping에서
					// column, attribute 값 추출
					String column = resultMappings[i].getAttribute("column");
					String field = resultMappings[i].getAttribute("attribute");

					// column의 값이 ,를 구분자로 여러 개가 정의된 경우
					if (isComposite(column) && isComposite(field)) {
						// attribute, column의 값을 ,로
						// 구분하여 분리
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
											.warn("Query Service : This mapping information is ignored. Property name is different. If you want to handle properties of user defined type, attribute should start with same property name. Please check result mapping (queryId ='"
													+ queryId + "')");
								compositeField = tempField;
								compositeFieldes[j] = compositeFieldName
										.substring(compositeFieldName
												.indexOf(".") + 1);
							}

							// compositeFieldMap,
							// compositeColumnMap에 관련
							// 속성명을 키값으로 하여, 매핑 정보 저장

							compositeFieldMap.put(compositeField,
									compositeFieldes);
							compositeColumnMap.put(compositeField,
									compositeColumns);
						} else {
							QueryService.LOGGER
									.warn("Query Service : This mapping information is ignored. If you want to handle properties of user defined type, the number of column should be same as that of attribute. Please check result mapping (queryId ='"
											+ queryId + "')");
						}
					} else {
						columns.add(column);
						fields.add(field);
					}

				}

				localMappingInfo.setColumnNames((String[]) columns
						.toArray(new String[columns.size()]));
				localMappingInfo.setFieldNames((String[]) fields.toArray(new String[fields.size()]));
				localMappingInfo.setCompositeColumnNames(compositeColumnMap);
				localMappingInfo.setCompositeFieldNames(compositeFieldMap);
				// 2009.03.17 - end
			}
		}

		Configuration[] params = queryConfig.getChildren("param");
		paramTypeNames = new String[params.length];
		paramBindingTypes = new String[params.length];
		paramBindingNames = new String[params.length];

		for (int i = 0, size = params.length; i < size; i++) {
			paramTypeNames[i] = params[i].getAttribute("type");
			paramBindingTypes[i] = params[i].getAttribute("binding", "");
			paramBindingNames[i] = params[i].getAttribute("name", "");
			if (isDynamic())
				paramMap.put(paramBindingNames[i], new Integer(SQLTypeTransfer
						.getSQLType(paramTypeNames[i].toUpperCase())));
		}

		// 2008.05.08 - update for Handling Lob of
		// Oracle 8i
		Configuration lobConfig = queryConfig.getChild("lobStatement");
		lobStatement = lobConfig.getChild("statement").getValue(null);
		Configuration[] lobParams = lobConfig.getChildren("param");
		lobParamTypes = new String[lobParams.length];
		for (int i = 0; i < lobParams.length; i++) {
			lobParamTypes[i] = lobParams[i].getAttribute("type");
		}
	}

	// 2009.05.28
	private void checkMappingStyle() {
		if (mappingStyle == null) {
			if (isCamelCase)
				mappingStyle = CAMEL_CASE;
			else
				mappingStyle = LOWER_CASE;
		}
	}

	private boolean isComposite(String str) {
		if (str.startsWith("{") && str.endsWith("}"))
			return true;
		return false;
	}

	public List getSqlParameterList() {
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
		return queryString;
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

	// 2008.8.20 add
	// 2009.05.28 - removed
	// public boolean isCamelCase() {
	// return isCamelCase;
	// }

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
}
