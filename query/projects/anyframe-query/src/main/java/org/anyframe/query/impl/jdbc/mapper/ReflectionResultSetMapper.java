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
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.anyframe.query.MappingInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.ResultSetMapper;
import org.anyframe.query.RowMetadataCallbackHandler;
import org.anyframe.query.impl.Pagination;
import org.anyframe.query.impl.config.loader.SQLLoader;
import org.anyframe.query.impl.util.ReflectionHelp;
import org.anyframe.query.impl.util.SQLTypeTransfer;
import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.lob.LobHandler;


/**
 * ResultSet에서 조회 결과를 꺼내 특정 객체 형태로 변환한다.
 * 
 * @author SOOYEON PARK
 */
public class ReflectionResultSetMapper extends AbstractResultSetMapperSupport implements
		RowMapper, RowMetadataCallbackHandler {
	/**
	 * Special array value used by <code>mapColumnsToFields</code> that
	 * indicates there is no object field that matches a column from a
	 * <code>ResultSet</code>.
	 */
	protected static final int PROPERTY_NOT_FOUND = -1;

	protected List targetClasses;

	private List aggregateClasses = new ArrayList();

	private HashMap classConfigMap = new HashMap();

	private MappingInfo mappingInfo = null;

	protected SQLLoader sqlLoader = null;

	protected String queryId;

	// 2009.01.15 - custom resultset mapper
	protected ResultSetMapper customResultSetMapper = null;

	protected List objects = new ArrayList();

	public void setSqlLoader(SQLLoader sqlLoader) {
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
	 * 조회 결과값을 가진 객체 목록을 전달한다.
	 * 
	 * @return the objects
	 */
	public List getObjects() {
		return objects;
	}

	/**
	 * 입력된 target class를 ArrayList에 담아 저장한다.
	 * 
	 * @param targetClass
	 */
	public ReflectionResultSetMapper(Class targetClass,
			MappingInfo mappingInfo, Map nullchecks, LobHandler lobHandler) {
		super(nullchecks, lobHandler);
		this.mappingInfo = mappingInfo;
		targetClasses = new ArrayList();
		targetClasses.add(targetClass);
	}

	public void setAggregateTargets(List aggregateTargetClasses) {
		this.aggregateClasses = aggregateTargetClasses;
	}

	public MappingInfo getMappingInfo() {
		return mappingInfo;
	}

	/**
	 * 2008.07.17 - added for meta data, processMetaData must be called within
	 * extractData of ResultSetExtractor(Anyframe extended) just delegate to
	 * makeMeta
	 */
	public void processMetaData(ResultSet resultSet) throws SQLException {
	}

	/**
	 * 특정 객체에 조회 결과값을 담아 objects 객체에 저장한다. processRow must be called within
	 * extractData of ResultSetExtractor.
	 * 
	 * @param resultSet
	 *            조회 결과
	 * @exception SQLException
	 *                조회 결과 매핑에 실패하였을 경우
	 */
	public void processRow(ResultSet resultSet) throws SQLException {
		objects.add(this.mapRow(resultSet, 9999));
	}

	/**
	 * 조회된 각 Row를 구성하는 Column의 값들을 추출하여 target class의 인스턴스에 담아 전달한다.
	 * 
	 * @param resultSet
	 *            조회 결과 중 하나의 Row
	 * @return 조회 결과를 담은 target class의 인스턴스
	 */
	public Object mapRow(ResultSet resultSet) throws SQLException {
		Object object = null;
		Iterator targetClassIterator = targetClasses.iterator();
		while (targetClassIterator.hasNext() && object == null) {
			Class targetClass = (Class) targetClassIterator.next();
			// 특정 클래스와 테이블의 매핑 정보 추출
			ResultSetMappingConfiguration config = getConfig(targetClass,
					resultSet.getMetaData());
			object = toObject(resultSet, targetClass, config);
		}
		return object;
	}

	/**
	 * 조회된 각 Row를 구성하는 Column의 값들을 추출하여 target class의 인스턴스에 담아 전달한다.
	 * 
	 * @param resultSet
	 *            조회 결과
	 * @param targetClass
	 *            조회 결과를 저장할 클래스
	 * @return
	 * @throws SQLException
	 */
	protected Object toObject(ResultSet resultSet, Class targetClass,
			ResultSetMappingConfiguration config) throws SQLException {

		Object object = createObject(resultSet, targetClass, config);

		// 2009.03.17 - start
		// result class가 Primitive Type이 아닌 Custom
		// Class Type의 속성을 가지고 있고, 조회 결과값을 해당 객체에 매핑해야
		// 하는 경우
		if (!config.getCompositeObjMap().isEmpty()) {
			Map compositeObjMap = config.getCompositeObjMap();
			Set keySet = compositeObjMap.keySet();
			Iterator keyItr = keySet.iterator();
			while (keyItr.hasNext()) {
				String attribute = (String) keyItr.next();
				ResultSetMappingConfiguration subconfiguration = (ResultSetMappingConfiguration) config
						.getCompositeObjMap().get(attribute);
				// Result Class가 가진 Custom Class Type의
				// 속성의 인스턴스 생성 및 하위 속성 값 셋팅
				Object compositeObj = createObject(resultSet, subconfiguration
						.getResultClass(), subconfiguration);

				try {
					// Result Class에 해당 Custom Object
					// 셋팅
					subconfiguration.getCompositeClassSetter().invoke(object,
							new Object[] { compositeObj });
				} catch (Exception e) {
					QueryService.LOGGER.warn(
							"Query Service : Fail to invoke setter['"
									+ subconfiguration
											.getCompositeClassSetter()
											.getName() + "'] of target class['"
									+ targetClass.getName() + "'].", e);
				}
			}
		}
		// 2009.03.17 - end
		return object;
	}

	/**
	 * 특정 클래스 내에 정의된 모든 속성 정보를 추출하여 관련 테이블의 칼럼에 대한 매핑 정보를 생성한 후, classConfigMap에
	 * 담는다. 한 번 처리한 target class는 classConfigMap에 저장되므로 두번째부터는 저장된 정보를 이용한다.
	 * 
	 * @param targetClass
	 *            조회 결과를 저장할 클래스
	 * @param resultSetMetaData
	 *            조회 결과의 Meta 정보
	 * @return 특정 클래스와 테이블의 매핑 정보
	 * @throws SQLException
	 *             ResultSetMetaData로부터 Meta 정보 추출에 실패한 경우
	 */
	protected ResultSetMappingConfiguration getConfig(Class targetClass,
			ResultSetMetaData resultSetMetaData) throws SQLException {
		ResultSetMappingConfiguration mappingConfiguration;

		if (classConfigMap.containsKey(targetClass)) {
			// classConfigMap에 입력 인자로 전달된 target class의
			// 정보가 저장되어 있는 경우
			mappingConfiguration = (ResultSetMappingConfiguration) classConfigMap
					.get(targetClass);
		} else {
			// classConfigMap에 입력 인자로 전달된 target class의
			// 정보가 저장되어 있지 않은 경우
			Map attributeMap = ReflectionHelp
					.getAllDeclaredFields(targetClass);
			
//			AccessibleObject.setAccessible(attributes, true);

			// 특정 테이블의 칼럼과 클래스의 필드 매핑 정보를 정의하고
			// classConfigMap에 저장한다.
			// 2009.03.17 - start
			// Result Class 내에 Primitive Type이 아닌 속성이
			// 존재할 경우 해당 Custom 객체에 조회 결과값을 반영하는 기능을
			// 추가하기 위해 발생한 NameMatcher API 변경으로 인해 변경이
			// 발생함.
			mappingConfiguration = mapColumnsToAttributes(targetClass,
					resultSetMetaData, attributeMap, null, false);
			// 2009.03.17 - start
			classConfigMap.put(targetClass, mappingConfiguration);
		}
		return mappingConfiguration;
	}

	/**
	 * ResultSetMetaData를 기반으로 특정 column에 매핑되는 target class field의 순번을 저장하여
	 * 전달한다. (초기에 한번 수행)
	 * 
	 * @param resultSetMetaData
	 *            조회 결과의 Meta 정보
	 * @param fields
	 *            특정 target class를 구성하는 모든 field 목록
	 * @return 특정 column에 매핑되는 target class field의 순번 목록
	 * @throws SQLException
	 *             ResultSetMetaData로부터 Meta 정보 추출에 실패한 경우
	 */
	private ResultSetMappingConfiguration mapColumnsToAttributes(
			Class targetClass, ResultSetMetaData resultSetMetaData,
			Map attributeMap, String parentAttribute, boolean isComposite) throws SQLException {
		int totalCols = resultSetMetaData.getColumnCount();
		Field[] attributes = new Field[totalCols];
		String[] columnNames = new String[totalCols];
		int[] columnTypes = new int[totalCols];
		Method[] setters = new Method[totalCols];
		// 2009.03.17 - start
		// Result Class 내에 정의된 Custom 객체에 대한 정보를 저장하기
		// 위한 Map
		Map compositeObjMap = new HashMap();
		// 2009.03.17 - end

		Arrays.fill(columnTypes, PROPERTY_NOT_FOUND);

		Map compositeFields = this.mappingInfo.getCompositeFieldNames();

		PropertyDescriptor[] descriptors = null;
		try {
			BeanInfo info = Introspector.getBeanInfo(targetClass,
					Introspector.USE_ALL_BEANINFO);
			descriptors = info.getPropertyDescriptors();
		} catch (IntrospectionException e) {
			QueryService.LOGGER
					.warn("Query Service : Fail to find a property descriptor of target class['"
							+ targetClass.getName()
							+ "']. So, set a PropertyDescriptor array with size 0.");
			// TODO Auto-generated catch block
			descriptors = new PropertyDescriptor[0];
		}

		if (compositeFields != null)
			compositeObjMap = makeCompositeObjMap(targetClass, descriptors, resultSetMetaData,
					compositeFields, attributeMap);
		
		for (int idx = 0; idx < totalCols; idx++) {
			String columnName = resultSetMetaData.getColumnLabel(idx + 1);
			int columnType = resultSetMetaData.getColumnType(idx + 1);

			Field attribute = getNameMatcher().isMatching(attributeMap,
					columnName, parentAttribute);
			
			if (attribute!=null) {
				attributes[idx] = attribute;
				columnNames[idx] = columnName;

				int dataType = SQLTypeTransfer.getSQLType(attribute
						.getType());
				if (!((dataType == Types.VARCHAR && columnType == Types.CLOB) || (dataType == Types.VARBINARY && columnType == Types.BLOB))) {
					if (dataType != SQLTypeTransfer.UNDEFINED)
						columnType = dataType;
				}

				columnTypes[idx] = columnType;
				setters[idx] = findSetter(descriptors, targetClass
						.getName(), attribute.getName());
			}			
		}
		
		// 2009.03.17 - start
		// Custom 객체에 대한 정보도 함께 저장
		return new ResultSetMappingConfiguration(
				columnNames, columnTypes, attributes, setters, compositeObjMap);
		// 2009.03.17 - end
	}

	public Map makeCompositeObjMap(Class targetClass,
			PropertyDescriptor[] descriptors,
			ResultSetMetaData resultSetMetaData, Map compositeFields,
			Map attributeMap) throws SQLException {
		Set keySet = compositeFields.keySet();
		Iterator keyItr = keySet.iterator();

		Map compositeObjMap = new HashMap();

		while (keyItr.hasNext()) {
			String key = (String) keyItr.next();
			if (attributeMap.containsKey(key)) {
				Field attribute = (Field) attributeMap.get(key);
				// 복합키 형태인 경우
				Method compositeClassSetter = null;
				// 해당 속성에 대한 Setter가 존재하는지 체크,
				// 없으면 처리하지 않음.
				compositeClassSetter = findSetter(descriptors, targetClass
						.getName(), key);

				if (compositeClassSetter == null)
					continue;

				// 해당 속성의 클래스가 가진 하위 속성 정보들을 조회
				Map childAttributeMap = ReflectionHelp
						.getAllDeclaredFields(attribute.getType());
//				AccessibleObject.setAccessible(childAttributes, true);

				// 해당 속성의 클래스에 대한 정보를 저장해두기 위해
				// mapColumnsToAttributes 호출
				ResultSetMappingConfiguration subconfigurations = mapColumnsToAttributes(
						attribute.getType(), resultSetMetaData,
						childAttributeMap, attribute.getName(), true);
				// 해당 속성의 클래스 정보 저장
				subconfigurations.setResultClass(attribute.getType());
				// 이후에 Result 객체에 해당 속성의 값을 셋팅하기 위해
				// Setter 정보 저장
				subconfigurations.setCompositeClassSetter(compositeClassSetter);
				// Custom 객체에 대한 정보 저장
				compositeObjMap.put(attribute.getName(), subconfigurations);
			}
		}

		return compositeObjMap;
	}

	/**
	 * 특정 클래스로부터 입력 인자로 전달된 Field에 대한 Setter를 찾아 전달한다.
	 * 
	 * @param targetClass
	 *            대상 클래스
	 * @param field
	 *            대상이 되는 Field
	 * @return Setter Method
	 */
	private Method findSetter(PropertyDescriptor[] descriptors,
			String className, String attributeName) {

		Method setter = null;
		for (int i = 0; i < descriptors.length; i++) {
			PropertyDescriptor descriptor = descriptors[i];
			if (descriptor.getDisplayName().equals(attributeName)) {
				setter = descriptor.getWriteMethod();
				break;
			}
		}

		if (setter == null)
			QueryService.LOGGER
					.warn("Query Service : Fail to find a setter method of attribute ['"
							+ attributeName
							+ "'] from target class['"
							+ className + "'].");
		return setter;
	}

	/**
	 * Creates a new object and initialises its fields from the ResultSet.
	 * 
	 * @param resultSet
	 *            조회 결과
	 * @param targetClass
	 *            대상 클래스
	 * @param config
	 *            특정 클래스와 테이블 사이의 매핑 정보를 저장하기 위한 Configuration
	 * @return 조회 결과를 매핑한 객체
	 * @throws SQLException
	 *             조회 결과 매핑에 실패한 경우
	 */
	private Object createObject(ResultSet resultSet, Class targetClass,
			ResultSetMappingConfiguration config) throws SQLException {
		Object object = (Object) ReflectionHelp.newInstance(targetClass);

		String[] columnNames = config.getColumnNames();
		int[] columnTypes = config.getColumnTypes();
		Field[] attributes = config.getAttributes();
		Method[] setters = config.getSetters();

		for (int i = 0; i < attributes.length; i++) {
			if (columnTypes[i] == PROPERTY_NOT_FOUND) {
				continue;
			}

			int columnType = columnTypes[i];

			Object value = getValue(resultSet, columnType, columnNames[i],
					i + 1);

			setValue(attributes[i], setters[i], object,
					value);
		}

		return object;
	}

	/**
	 * 특정 객체의 Setter 메소드를 호출하여 입력된 값을 셋팅한다. Setter 메소드가 없을 경우에는 ReflectionHelp의
	 * setFieldValue 메소드를 호출하여 직접 셋팅한다.
	 * 
	 * @param field
	 *            조회 결과를 매핑할 Field
	 * @param object
	 *            조회 결과를 매핑할 객체
	 * @param value
	 *            조회 결과 값
	 */
	private void setValue(Field field, Method setter, Object object,
			Object value) {
//		if (value != null) { // if column value is null, set property value to null
			boolean valueSet = false;
			try {
				if (setter != null) {
					setter.invoke(object, new Object[] { value });
					valueSet = true;
				}
			} catch (IllegalAccessException e) {
				throw new RuntimeException(
						"Query Service : Fail to invoke a setter method ['"
								+ setter.getName() + "'. Reason : "
								+ e.getMessage(), e);
			} catch (InvocationTargetException e) {
				throw new RuntimeException(
						"Query Service : Fail to invoke a setter method ['"
								+ setter.getName() + "'. Reason : "
								+ e.getMessage(), e);
			}
			if (!valueSet) {
				// Set the field directly
				ReflectionHelp.setFieldValue(field, object, value);
			}
//		}
	}

	public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
		// TODO Auto-generated method stub
		return this.mapRow(rs);
	}

	public Map getColumnInfo() {
		return new ListOrderedMap();
	}

	/**
	 * Metadata에 total count값과 같은 paging 관련 정보를 세팅 할 때 paginationVO에서 값을 얻기 위해
	 * 사용한다.
	 */
	// 2009.06.18일 추가
	public void setPagination(Pagination paginationVO) {
		// TODO Auto-generated method stub
	}
}