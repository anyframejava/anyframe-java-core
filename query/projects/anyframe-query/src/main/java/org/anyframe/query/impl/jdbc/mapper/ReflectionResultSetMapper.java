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

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.anyframe.exception.InstanceCreationException;
import org.anyframe.query.MappingInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.ResultSetMapper;
import org.anyframe.query.RowMetadataCallbackHandler;
import org.anyframe.query.SqlLoader;
import org.anyframe.query.impl.Pagination;
import org.anyframe.query.impl.util.ColumnUtil;
import org.anyframe.query.impl.util.ReflectionHelp;
import org.anyframe.query.impl.util.SQLTypeTransfer;
import org.anyframe.query.impl.util.Tree;
import org.apache.commons.collections.map.ListOrderedMap;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * By extracting search result from ReseultSet, it is transformed into a
 * specific object format. By extracting search result from ReseultSet, it is
 * transferred into a specific object format.
 * 
 * @author SOOYEON PARK
 */
public class ReflectionResultSetMapper<T> extends AbstractResultSetMapperSupport implements RowMapper<T>, RowMetadataCallbackHandler {
	/**
	 * Special array value used by <code>mapColumnsToFields</code> that
	 * indicates there is no object field that matches a column from a
	 * <code>ResultSet</code>.
	 */
	protected static final int PROPERTY_NOT_FOUND = -1;

	protected List<Class<T>> targetClasses;

//	private List aggregateClasses = new ArrayList();

	private final Map<Class<?>, ResultSetMappingConfiguration> classConfigMap = new HashMap<Class<?>, ResultSetMappingConfiguration>();

	private final MappingInfo mappingInfo;

	protected SqlLoader sqlLoader = null;

	protected String queryId;

	// 2009.01.15 - custom resultset mapper
	protected ResultSetMapper customResultSetMapper = null;

	@SuppressWarnings("unchecked")
	protected List objects = new ArrayList();

	protected boolean initialized = false;

	protected boolean needColumnInfo = false;

	protected Class<?> targetClass = null;

	// 2008.8.21 CamelCase Option Addition
	// private boolean isCamelCase = false;

	// 2009.05.28
	protected String mappingStyle = null;

	protected ResultSetMappingConfiguration mappingConfiguration;

	public void setSqlLoader(SqlLoader sqlLoader) {
		this.sqlLoader = sqlLoader;
	}

	public void setQueryId(String queryId) {
		this.queryId = queryId;
	}

	// 2009.01.15 - custom resultset mapper
	public void setCustomResultSetMapper(ResultSetMapper customResultSetMapper) {
		this.customResultSetMapper = customResultSetMapper;
	}

	/**
	 * Object list with search return value is transferred.
	 * 
	 * @return the objects
	 */
	@SuppressWarnings("unchecked")
	public List getObjects() {
		return objects;
	}

	/**
	 * Entered target class is stored in ArrayList.
	 * 
	 * @param targetClass
	 */
	@SuppressWarnings("unchecked")
	public ReflectionResultSetMapper(Class<T> targetClass, MappingInfo mappingInfo, Map<String, String> nullchecks, LobHandler lobHandler) {
		super(nullchecks, lobHandler);
		this.mappingInfo = mappingInfo;
		targetClasses = new ArrayList();
		targetClasses.add(targetClass);
	}

//	public void setAggregateTargets(List aggregateTargetClasses) {
//		this.aggregateClasses = aggregateTargetClasses;
//	}

	public MappingInfo getMappingInfo() {
		return mappingInfo;
	}

	/**
	 * 2008.07.17 - added for meta data, processMetaData must be called within
	 * extractData of ResultSetExtractor(Anyframe extended) just delegate to
	 * makeMeta
	 * 
	 * @throws SQLException
	 */
	public void processMetaData(ResultSet resultSet) throws SQLException {
		if (!this.initialized) {
			this.makeMeta(resultSet);
		}
	}

	/**
	 * A specific object including search return value is saved in Objects.
	 * processRow must be called within extractData of ResultSetExtractor.
	 * 
	 * @param resultSet
	 *            Search result
	 * @exception SQLException
	 *                In the case where search result mapping fails
	 */
	@SuppressWarnings("unchecked")
	public void processRow(ResultSet resultSet) throws SQLException {
		objects.add(this.mapRow(resultSet, 9999));
	}

	/**
	 * By extracting Column values consisting of searched each Row, transfers
	 * these values in the format of target class instance.
	 * 
	 * @param resultSet
	 *            One of search result is Row
	 * @return Target class instance of search result
	 * @throws SQLException 
	 */
	@SuppressWarnings("unchecked")
	public T mapRow(ResultSet resultSet) throws SQLException {
		Object object = null;
		Iterator<Class<T>> targetClassIterator = targetClasses.iterator();
		while (targetClassIterator.hasNext() && object == null) {
			Class<T> targetClass = targetClassIterator.next();
			// ?�정 ?�래?��? ?�이블의 매핑 ?�보 추출 Mapping information extraction on specific
			// class and table
			ResultSetMappingConfiguration config = getConfig(targetClass, resultSet.getMetaData());
			object = toObject(resultSet, targetClass, config);
		}
		return (T) object;
	}

	/**
	 * By extracting Column values consisting of searched each Row, it is
	 * transferred in the format of target class.
	 * 
	 * @param resultSet
	 *            Search Result
	 * @param targetClass
	 *            Class to save search result
	 * @return
	 * @throws InstanceCreationException
	 */
	protected Object toObject(ResultSet resultSet, Class<?> targetClass, ResultSetMappingConfiguration config) {

		Object object;
		try {
			object = createObject(resultSet, targetClass, config);
		} catch (Exception ex) {
			throw new InstanceCreationException("Query Service : Cannot create " + targetClass.getName() + ", Reason : " + ex.getMessage());
		}

		// 2009.03.17 - start
		// In the case where result class has not Primitive type but Custom
		// CLsss Type property and search return value should be mapped on
		// relevant return value

		if (!config.getCompositeObjMap().isEmpty()) {
			setCompositeObject(resultSet, targetClass, config, object);
		}
		// 2009.03.17 - end
		return object;
	}

	private void setCompositeObject(ResultSet resultSet, Class<?> targetClass, ResultSetMappingConfiguration config, Object object) {
		Map<String, ResultSetMappingConfiguration> compositeObjMap = config.getCompositeObjMap();
		Set<String> keySet = compositeObjMap.keySet();
		Iterator<String> keyItr = keySet.iterator();
		while (keyItr.hasNext()) {
			String attribute = keyItr.next();
			ResultSetMappingConfiguration subconfiguration = config.getCompositeObjMap().get(attribute);
			// Create instance of Custom Class Type Result Class has and set
			// up lower property value

			// Instance of Custom Class Type
			Object compositeObj;
			try {
				compositeObj = createObject(resultSet, subconfiguration.getResultClass(), subconfiguration);
			} catch (Exception ex) {
				throw new InstanceCreationException("Query Service : Cannot create " + subconfiguration.getClass().getName() + ", Reason : " + ex.getMessage());
			}

			try {
				// Setting the custom object to result class.
				subconfiguration.getCompositeClassSetter().invoke(object, new Object[] { compositeObj });
			} catch (Exception ex) {
				QueryService.LOGGER.warn("Query Service : Fail to invoke setter['{}'] of target class['{}'].", new Object[] {
						subconfiguration.getCompositeClassSetter().getName(), targetClass.getName() }, ex);
			}
			if (!subconfiguration.getCompositeObjMap().isEmpty()) {
				setCompositeObject(resultSet, subconfiguration.getResultClass(), subconfiguration, compositeObj);
			}
		}
	}

	/**
	 * By extracting all property information within a specific class, create
	 * mapping information on relvated table column. After that, target class
	 * once handled in classConfigMap saves classConfigMap. Therefore, from the
	 * second round, use the saved information.
	 * 
	 * @param targetClass
	 *            Class to save search result
	 * @param resultSetMetaData
	 *            Meta information of search result
	 * @return Mapping information of @return specific class and table
	 * @throws SQLException
	 *             In the case Meta information fails to be extracted form
	 *             ResultSetMetaData
	 */
	protected ResultSetMappingConfiguration getConfig(Class<?> targetClass, ResultSetMetaData resultSetMetaData) throws SQLException {
		ResultSetMappingConfiguration mappingConfiguration;

		if (classConfigMap.containsKey(targetClass)) {
			// In the case target class information transferred as entered
			// parameter at classConfigMap is saved
			mappingConfiguration = classConfigMap.get(targetClass);
		} else {
			// In the case target class information transferred as entered
			// parameter at classConfigMap is not saved
			Map<String, Field> attributeMap = ReflectionHelp.getAllDeclaredFields(targetClass);

			// AccessibleObject.setAccessible(attributes, true);

			// Define a specific table column an class filed mapping information
			// and save them at classConfigMap
			// 2009.03.17 - start
			// Define field mapping information of a specific table column and
			// class and save it on classConfigMap.
			// In the case property which is not Primitive Type within Result
			// Class exists, modification takes place because of NameMatcher API
			// change occurring in order to add function to reflect search
			// return value on relevant Custom object.

			mappingConfiguration = mapColumnsToAttributes(targetClass, resultSetMetaData, attributeMap, null, null, false);
			// 2009.03.17 - start
			classConfigMap.put(targetClass, mappingConfiguration);
		}
		return mappingConfiguration;
	}

	/**
	 * By saving order of target class field mapped on a specific column based
	 * on ResultSetMetaData, transfer it. (one-off execution in the early stage)
	 * 
	 * @param resultSetMetaData
	 *            Meta information of search result
	 * @param fields
	 *            All field list consisting of a specific target class
	 * @return All order list of target class field mapped in @return specific
	 *         column
	 * @throws SQLException
	 *             In the case Meta information fails to be extracted from
	 *             ResultSetMetaData
	 */
	private ResultSetMappingConfiguration mapColumnsToAttributes(Class<?> targetClass, ResultSetMetaData resultSetMetaData, Map<String, Field> attributeMap,
			Tree<String> compositeFields, String parentAttribute, boolean isComposite) throws SQLException {
		int totalCols = resultSetMetaData.getColumnCount();
		Field[] attributes = new Field[totalCols];
		String[] columnNames = new String[totalCols];
		int[] columnTypes = new int[totalCols];
		Method[] setters = new Method[totalCols];
		// 2009.03.17 - start
		// Map to save information on Custom Object defined within Result Class
		Map<String, ResultSetMappingConfiguration> compositeObjMap = new HashMap<String, ResultSetMappingConfiguration>();
		// 2009.03.17 - end

		Arrays.fill(columnTypes, PROPERTY_NOT_FOUND);

		/*
		 * <result-mapping/>??attribute 값으�?�?��?�는 composite 객체?�이 같�? ?�름???�성??
		 * 갖을 ??매핑??�?��?��? ?��? 컬럼?�에??불구?�고 값이 ??��?�는 ?�니?�레??버그�??�결?�기 ?�한 코드
		 */
		Map compositeColumnNames = this.mappingInfo.getCompositeColumnNames();
		String[] compositeColumns = null;
		if (compositeColumnNames != null && !compositeColumnNames.isEmpty()) {
			compositeColumns = (String[]) compositeColumnNames.get(parentAttribute);
		}
		// --------------------------------------------------------------------------------------------

		if (compositeFields == null) {
			compositeFields = this.mappingInfo.getCompositeFieldNames();
		}

		PropertyDescriptor[] descriptors = null;
		try {
			BeanInfo info = Introspector.getBeanInfo(targetClass, Introspector.USE_ALL_BEANINFO);
			descriptors = info.getPropertyDescriptors();
		} catch (IntrospectionException ex) {
			QueryService.LOGGER.warn(
					"Query Service : Fail to find a property descriptor of target class['{}']. So, set a PropertyDescriptor array with size 0.",
					targetClass.getName());
			descriptors = new PropertyDescriptor[0];
		}

		boolean hasCompositeField = false;
		if (compositeFields != null) {
			List<Tree<String>> subTrees = (List<Tree<String>>) compositeFields.getSubTrees();
			for (int i = 0; i < subTrees.size(); i++) {
				Tree<String> childField = subTrees.get(i);
				if (childField.getSubTrees().size() > 0) {
					hasCompositeField = true;
				}
			}
		}

		if (hasCompositeField) {
			compositeObjMap = makeCompositeObjMap(targetClass, descriptors, resultSetMetaData, compositeFields, attributeMap);
		}

		for (int idx = 0; idx < totalCols; idx++) {
			String columnName = resultSetMetaData.getColumnLabel(idx + 1);
			int columnType = resultSetMetaData.getColumnType(idx + 1);

			// --------------------------------------------------------------------------------------------
//			if (compositeColumns != null && compositeColumns.length > 0 && columnName != null) {
//				String[] tempCompositeColumns = null;
//				String tempColumnName = null;
//				tempCompositeColumns = new String[compositeColumns.length];
//				for (int i = 0; i < compositeColumns.length; i++) {
//					tempCompositeColumns[i] = compositeColumns[i].toLowerCase();
//				}
//				tempColumnName = columnName.toLowerCase();
//				if (isComposite && compositeColumns != null && ArrayUtils.indexOf(tempCompositeColumns, tempColumnName) < 0) {
//					continue;
//				}
//			} else {
				if (isComposite && compositeColumns != null && ArrayUtils.indexOf(compositeColumns, columnName) < 0) {
					String lowerColumnName = new String(columnName);
					lowerColumnName= lowerColumnName.toLowerCase();
					if (isComposite && compositeColumns != null && ArrayUtils.indexOf(compositeColumns, lowerColumnName) < 0) {
						continue;
					}
				}
//			}
			// --------------------------------------------------------------------------------------------

			Field attribute = getNameMatcher().isMatching(attributeMap,
					columnName, parentAttribute, attributes);
			if (attribute != null) {
				attributes[idx] = attribute;
				columnNames[idx] = columnName;

				int dataType = SQLTypeTransfer.getSQLType(attribute.getType());
				if (!((dataType == Types.VARCHAR && columnType == Types.CLOB) || (dataType == Types.VARBINARY && columnType == Types.BLOB))) {
					if (dataType != SQLTypeTransfer.UNDEFINED)
						columnType = dataType;
				}

				columnTypes[idx] = columnType;
				setters[idx] = findSetter(descriptors, targetClass.getName(), attribute.getName());
			}
		}

		// 2009.03.17 - start
		// Save information on Custom object along with it
		return new ResultSetMappingConfiguration(columnNames, columnTypes, attributes, setters, compositeObjMap);
		// 2009.03.17 - end
	}

	public Map<String, ResultSetMappingConfiguration> makeCompositeObjMap(Class<?> targetClass, PropertyDescriptor[] descriptors,
			ResultSetMetaData resultSetMetaData, Tree<String> compositeFields, Map<String, Field> attributeMap) throws SQLException {

		Collection<Tree<String>> compositeFieldList = compositeFields.getSubTrees();

		Set<String> keySet = new HashSet<String>();
		Iterator<Tree<String>> itr = compositeFieldList.iterator();

		while (itr.hasNext()) {
			Tree<String> field = itr.next();
			if (field.getSubTrees().size() > 0) {
				keySet.add(field.getHead());
			}
		}

		Iterator<String> keyItr = keySet.iterator();

		Map<String, ResultSetMappingConfiguration> compositeObjMap = new HashMap<String, ResultSetMappingConfiguration>();

		while (keyItr.hasNext()) {
			String key = keyItr.next();
			if (attributeMap.containsKey(key)) {
				Field attribute = attributeMap.get(key);
				// In the case of composite key type
				Method compositeClassSetter = null;
				// Check whether Setter on relevant property exists. if it
				// doesn?�t, don?�t process it.
				compositeClassSetter = findSetter(descriptors, targetClass.getName(), key);

				if (compositeClassSetter == null)
					continue;

				// Search lower property information that relevant property
				// class owns
				Map<String, Field> childAttributeMap = ReflectionHelp.getAllDeclaredFields(attribute.getType());
				// AccessibleObject.setAccessible(childAttributes, true);

				// To save class information of relevant property, call for
				// mapColumnsToAttributes
				ResultSetMappingConfiguration subconfigurations = mapColumnsToAttributes(attribute.getType(), resultSetMetaData, childAttributeMap,
						compositeFields.getTree(key), attribute.getName(), true);
				// Save class information of relevant property
				subconfigurations.setResultClass(attribute.getType());
				// Save Setter information in order to set up relevant property
				// value of Result object.
				subconfigurations.setCompositeClassSetter(compositeClassSetter);
				// Save information on Custom object
				compositeObjMap.put(attribute.getName(), subconfigurations);
			}
		}

		return compositeObjMap;
	}

	/**
	 * Setter on Field transferred as input parameter of a specific class is
	 * found and transferred.
	 * 
	 * @param targetClass
	 *            Target Class
	 * @param field
	 *            Target Field
	 * @return Setter Method
	 */
	private Method findSetter(PropertyDescriptor[] descriptors, String className, String attributeName) {

		Method setter = null;
		for (int i = 0; i < descriptors.length; i++) {
			PropertyDescriptor descriptor = descriptors[i];
			if (descriptor.getDisplayName().equals(attributeName)) {
				setter = descriptor.getWriteMethod();
				break;
			}
		}

		if (setter == null) {
			QueryService.LOGGER.warn("Query Service : Fail to find a setter method of attribute ['{}'] from target class['{}'].", new Object[] { attributeName,
					className });
		}
		return setter;
	}

	/**
	 * Creates a new object and initialises its fields from the ResultSet.
	 * 
	 * @param resultSet
	 *            Search result
	 * @param targetClass
	 *            Target class
	 * @param config
	 *            Configuration to save mapping information between a specific
	 *            class and table
	 * @return Object to map search result
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * @throws InvocationTargetException
	 */
	private Object createObject(ResultSet resultSet, Class<?> targetClass, ResultSetMappingConfiguration config) throws InstantiationException,
			IllegalAccessException, InvocationTargetException {
		Object object = ReflectionHelp.newInstance(targetClass);

		String[] columnNames = config.getColumnNames();
		int[] columnTypes = config.getColumnTypes();
		Field[] attributes = config.getAttributes();
		Method[] setters = config.getSetters();

		for (int i = 0; i < attributes.length; i++) {
			if (columnTypes[i] == PROPERTY_NOT_FOUND) {
				continue;
			}

			int columnType = columnTypes[i];

			Object value = getValue(resultSet, columnType, columnNames[i], i + 1);

			setValue(attributes[i], setters[i], object, value);

		}

		return object;
	}

	/**
	 * By calling for Setter method of a specific object, entered value is set.
	 * In the case there is no Setter method, By calling for setFieldValue
	 * method of ReflectionHelp, set up by itself.
	 * 
	 * @param field
	 *            Field to map search result
	 * @param object
	 *            Object to map search result
	 * @param value
	 *            Search result value
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 */
	private void setValue(Field field, Method setter, Object object, Object value) throws IllegalAccessException, InvocationTargetException {
		boolean valueSet = false;

		if (setter != null) {
			setter.invoke(object, new Object[] { value });
			valueSet = true;
		}

		if (!valueSet) {
			// Set the field directly
			ReflectionHelp.setFieldValue(field, object, value);
		}
	}

	public T mapRow(ResultSet rs, int rowNum) throws SQLException {
		return this.mapRow(rs);
	}

	@SuppressWarnings("unchecked")
	public Map getColumnInfo() {
		return new ListOrderedMap();
	}

	/**
	 * When paging-related information similar to total count value on Metadata
	 * is set, it is used to extract value from paginationVO.
	 */
	// added at 2009.06.18
	public void setPagination(Pagination paginationVO) {
	}

	/**
	 * After reading Meta information from ResultSet, extract basic information
	 * for search return value setup. (one-off execution in the early stage)
	 * 
	 * @param resultSet
	 *            Search result
	 * @throws SQLException
	 *             In the case information fails to be extracted from
	 *             ResultSetMetaData
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

		Map<String, Field> attributeMap = new HashMap<String, Field>();
		if (this.targetClass != null && !this.targetClass.equals(HashMap.class)) {
			attributeMap = ReflectionHelp.getAllDeclaredFields(this.targetClass);
		}

		// 2009.05.28 In the case mappingStyple on a specific query is ?�camel??
		// apply CamelCase.
		// In the case mappingStype is ?�lower?? modify it into small letter. In
		// the case maapingStype is ?�upper?? modify it into Capital letter.

		for (int i = 0; i < columnCount; i++) {
			String columnName = resultSetMetaData.getColumnLabel(i + 1);
			int columnType = resultSetMetaData.getColumnType(i + 1);

			columnNames[i] = columnName;
			// 2008.8.21 CamelCase Option Addition

			// 2009.05.28
			columnKeys[i] = ColumnUtil.changeColumnName(this.mappingStyle, columnName);

			int dataType = SQLTypeTransfer.UNDEFINED;
			if (!(columnName == null || (this.targetClass == null || this.targetClass.equals(HashMap.class)) || getMappingInfo() == null)) {
				// Extract Field. And this field is mapped on a specific column
				// by using table mapping information.
				String attributeName = getMappingInfo().getMappingInfoAsMap().get(columnName.toLowerCase());

				if (attributeName == null) {
					attributeName = ColumnUtil.changeColumnName(this.mappingStyle, columnName);
				}

				Field attribute = attributeMap.get(attributeName);

				// In the case of paging process, property name mapped at ROW
				// NUMBER column does not exist.
				if (attribute == null) {
					continue;
				}
				// Class type of target class specific Field is set as standard.
				// Extract SQL Type matching it.
				dataType = SQLTypeTransfer.getSQLType(attribute.getType());
			}

			// When value is set on target class by using ResultSet, Not DB
			// column type but target class attribute type should be set.
			// However, in the case where target class attribute is
			// java.lang.String and DB column type is CLOB type, and target
			// class attribute is byte[] and DB column type is BLOB, DB column
			// type is set as default.
			if (!((dataType == Types.VARCHAR && columnType == Types.CLOB) || (dataType == Types.VARBINARY && columnType == Types.BLOB))) {
				if (dataType != SQLTypeTransfer.UNDEFINED)
					columnType = dataType;
			}

			// 2008.8.21 CamelCase Option Addition
			columnTypes[i] = columnType;
			// add for Gauce (2008-04-15)
			try {
				columnPrecisions[i] = resultSetMetaData.getPrecision(i + 1);
			} catch (NumberFormatException ex) {
				// In the case of oracle 8i, when Precision is searched on CLOB
				// and BLOB type column, NumberFormatException takes place.
				columnPrecisions[i] = 0;
			}
			// add for Gauce (2008-04-15)
			columnScales[i] = resultSetMetaData.getScale(i + 1);
		}

		this.mappingConfiguration = new ResultSetMappingConfiguration(columnCount, columnKeys, columnNames, columnTypes, columnPrecisions, columnScales);
		initialized = true;
	}

	public boolean isNeedColumnInfo() {
		return needColumnInfo;
	}

	public void setNeedColumnInfo(boolean needColumnInfo) {
		this.needColumnInfo = needColumnInfo;
	}
}
