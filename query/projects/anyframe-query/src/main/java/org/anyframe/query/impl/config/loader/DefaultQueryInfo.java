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
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.anyframe.exception.MissingRequiredPropertyException;
import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.impl.util.SQLTypeTransfer;
import org.anyframe.query.impl.util.Tree;
import org.anyframe.util.StringUtil;
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
	private boolean dynamic = true;
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
	private final Map<String, Integer> paramMap = new HashMap<String, Integer>();

	public void configure(Element query) {
		queryId = query.getAttribute("id");
		checkRequiredAttribute("query", "id", queryId);

		NodeList statements = query.getElementsByTagName("statement");

		Element statementElement = null;
		int statementLength = 0;
		for (int i = 0; i < statements.getLength(); i++) {
			Element temporaryElement = (Element) statements.item(i);

			String parentNode = temporaryElement.getParentNode().getNodeName();
			if ("query".equals(parentNode)) {
				statementElement = temporaryElement;
				statementLength++;
			}
		}

		hasOnlyOneElements("query", "statement", statementLength);
		statement = statementElement.getTextContent();

		String isDynamicValue = query.getAttribute("isDynamic");
		dynamic = "".equals(isDynamicValue) ? true
				: new Boolean(isDynamicValue).booleanValue();
		String mappingStyleValue = query.getAttribute("mappingStyle");
		mappingStyle = "".equals(mappingStyleValue) ? "camel"
				: mappingStyleValue;

		String maxFetchSizeValue = query.getAttribute("maxFetchSize");
		maxFetchSize = "".equals(maxFetchSizeValue) ? -1 : new Integer(
				maxFetchSizeValue).intValue();

		NodeList results = query.getElementsByTagName("result");

		if (results.getLength() > 0) {
			hasOnlyOneElements("query", "result", results.getLength());
			Element result = (Element) results.item(0);

			resultClass = result.getAttribute("class");
			if ("".equals(resultClass)) {
				resultClass = null;
			}
			resultMapper = result.getAttribute("mapper");
			if ("".equals(resultMapper)) {
				resultMapper = null;
			}

			String lengthValue = result.getAttribute("length");
			length = "".equals(lengthValue) ? 0 : new Integer(lengthValue)
					.intValue();

			NodeList resultMappings = result
					.getElementsByTagName("result-mapping");
			if (resultMappings.getLength() > 0) {
				localMappingInfo = new DefaultMappingInfo();
				List<String> columns = new ArrayList<String>();
				List<String> fields = new ArrayList<String>();

				Map<String, String[]> compositeColumnMap = new HashMap<String, String[]>();
				Tree<String> compositeFiledTree = new Tree<String>("compositeFiledTree");
				
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
							Map<String, List<String>> tmpColumnMap = new HashMap<String, List<String>>();
							for (int j = 0; j < compositeFieldes.length; j++) {
								String compositeFieldName = compositeFieldes[j];
								String key = compositeFieldName.substring(0,
										compositeFieldName.indexOf("."));
								Tree<String> child;
								
								if(compositeFiledTree.getTree(key)!=null){
									child = compositeFiledTree.getTree(key);
								}else{
									child = compositeFiledTree.addLeaf(key);
								}
									
								if (i != 0 && !key.equals(compositeField))
									QueryService.LOGGER
											.warn("Query Service : This mapping information is ignored. Property name is different. If you want to handle properties of user defined type, attribute should start with same property name. Please check result mapping (queryId ='{}')",
													queryId);
								String[] fieldNames = compositeFieldName
										.substring(compositeFieldName
												.indexOf(".") + 1).split("\\.");
								Tree<String> lvnChild;
								compositeField = key;
//								if(child.getTree(fieldNames[0])!=null){
//									lvnChild = child.getTree(fieldNames[0]);
//								}else{
//									lvnChild = child.addLeaf(fieldNames[0]);
//								}
								lvnChild = child.addLeaf(fieldNames[0]);
								
								if (fieldNames.length > 1) {
									for (int k=1; k < fieldNames.length; k++) {
										lvnChild = lvnChild.addLeaf(fieldNames[k]);
										compositeField = fieldNames[k-1];
									}
								}
								List<String> attrs  = new ArrayList<String>();
								if(tmpColumnMap.get(compositeField)!=null && tmpColumnMap.get(compositeField).size() > 0){
									attrs = tmpColumnMap.get(compositeField);
								}
								attrs.add(compositeColumns[j]);
								tmpColumnMap.put(compositeField, attrs);

							}
							Set<String> keySet = tmpColumnMap.keySet();
							Iterator<String> keyItr = keySet.iterator();
							while(keyItr.hasNext()){
								String colKey = keyItr.next();
								List<String> colList = tmpColumnMap.get(colKey);
								String[] colValues = new String[colList.size()];
								for(int l=0; l < colList.size(); l++){
									colValues[l] = colList.get(l);
								}
								compositeColumnMap.put(colKey, colValues);
							}
							
						} else {
							QueryService.LOGGER
									.warn("Query Service : This mapping information is ignored. If you want to handle properties of user defined type, the number of column should be same as that of attribute. Please check result mapping (queryId ='{}')",
											queryId);
						}
					} else {
						columns.add(column);
						fields.add(field);
					}
				}

				localMappingInfo.setColumnNames(columns
						.toArray(new String[columns.size()]));
				localMappingInfo.setFieldNames(fields.toArray(new String[fields
						.size()]));
				localMappingInfo.setCompositeColumnNames(compositeColumnMap);
				localMappingInfo.setCompositeFieldNames(compositeFiledTree);
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
				paramMap.put(
						paramBindingNames[i],
						new Integer(SQLTypeTransfer
								.getSQLType(paramTypeNames[i].toUpperCase())));
		}

		// for Handling Lob of Oracle 8i
		NodeList lobHandlings = query.getElementsByTagName("lobStatement");

		if (lobHandlings.getLength() > 0) {
			hasOnlyOneElements("query", "lobStatement",
					lobHandlings.getLength());
			Element lobHandling = (Element) lobHandlings.item(0);

			NodeList lobStatements = lobHandling
					.getElementsByTagName("statement");
			hasOnlyOneElements("lobStatement", "statement",
					lobStatements.getLength());
			lobStatement = lobStatements.item(0).getTextContent();
			if ("".equals(lobStatement)) {
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
		Integer sqlType = paramMap.get(paramTypeName);
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
		return dynamic;
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
			String value) {
		if (StringUtil.isEmpty(value)) {
			throw new MissingRequiredPropertyException("Query Service : "
					+ name + " is essential attribute in a <" + element + ">.");
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
