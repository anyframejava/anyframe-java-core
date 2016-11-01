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

import java.sql.ResultSet;
import java.sql.Types;
import java.util.Map;

import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.anyframe.query.ResultSetMapper;
import org.anyframe.query.impl.util.ClassValidator;
import org.anyframe.query.impl.util.DefaultObjectValidator;
import org.anyframe.query.impl.util.NameConverter;
import org.anyframe.query.impl.util.AbstractNameMatcher;
import org.anyframe.query.impl.util.ObjectValidator;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * By extracting search result from Resultset, it is transformed into a specific
 * object format.
 * 
 * @author SOOYEON PARK
 * @author Byunghun Woo
 */
public abstract class AbstractResultSetMapperSupport implements ResultSetMapper {
	private static AbstractNameMatcher defaultNameMatcher = new NameConverter();

	private static ObjectValidator defaultObjectValidator = new DefaultObjectValidator();

	private AbstractNameMatcher nameMatcher;

	private ObjectValidator objectValidator;

	protected Map nullchecks;

	protected LobHandler lobHandler;

	/**
	 * DefaultObjectValidator and NameConverter are set as objectValidator and
	 * nameMatcher.
	 */
	public AbstractResultSetMapperSupport(Map nullchecks, LobHandler lobHandler) {
		super();
		this.nullchecks = nullchecks;
		this.lobHandler = lobHandler;
		this.objectValidator = defaultObjectValidator;
		this.nameMatcher = defaultNameMatcher;
	}

	/**
	 * NameMatcher for table column name and mapping property name of a specific
	 * object is set.
	 * 
	 * @param nameMatcher
	 *            the nameMatcher to set
	 */
	public final void setNameMatcher(AbstractNameMatcher nameMatcher) {
		this.nameMatcher = nameMatcher;
	}

	/**
	 * Set the <code>ObjectValidator</code> - this will decide whether the
	 * constructed object should be retained.
	 * 
	 * @param objectValidator
	 *            The objectValidator to set
	 */
	public final void setObjectValidator(ObjectValidator objectValidator) {
		this.objectValidator = objectValidator;
	}

	public AbstractNameMatcher getNameMatcher() {
		return nameMatcher;
	}

	public ObjectValidator getObjectValidator() {
		return objectValidator;
	}

	public Map getNullchecks() {
		return nullchecks;
	}

	public LobHandler getLobHandler() {
		return lobHandler;
	}

	/**
	 * RIA
	 * 
	 * @param lobHandler
	 *            the lobHandler to set
	 */
	public void setLobHandler(LobHandler lobHandler) {
		this.lobHandler = lobHandler;
	}

	/**
	 * RIA
	 */
	public void setNullCheckInfos(Map nullCheckInfos) {
		this.nullchecks = nullCheckInfos;
	}

	/**
	 * Validity of entered object is checked with Validator. In the case where
	 * relevant object is implementation of IClassValidator, validity is checked
	 * by calling for isValid method within object. Otherwise, validity is
	 * checked by calling for isValid method of DefaultObjectValidator.
	 * 
	 * @param object
	 *            Object to save search result
	 * @return whether valid
	 */
	protected boolean isValid(Object object) {
		if (object instanceof ClassValidator) {
			return ((ClassValidator) object).isValid();
		}
		return objectValidator.isValid(object);
	}

	/**
	 * @param resultSet
	 *            Search result
	 * @param columnType
	 *            DBMS Column Type of a specific column
	 * @param columnName
	 *            A specific column name
	 * @return A specific column value extracted from @return search result
	 */
	protected Object getValue(ResultSet resultSet, int columnType,
			String columnName, int columnIndex) {
		Object obj;
		try {
			switch (columnType) {
			case Types.ARRAY:
				throw new QueryServiceException(
						"Query Service : Not supported SQL type. Column Type - ARRAY. Column Name - "
								+ columnName + ".");
			case Types.BIGINT:
				return new Long(resultSet.getLong(columnIndex));
			case Types.BINARY:
				return resultSet.getBytes(columnIndex);
			case Types.BIT:
				return new Boolean(resultSet.getBoolean(columnIndex));
			case Types.CHAR:
				obj = resultSet.getString(columnIndex);
				if (obj == null && nullchecks.size() != 0)
					obj = changeNullValue("char");
				return obj;
			case Types.CLOB:
				return lobHandler.getClobAsString(resultSet, columnIndex);
			case Types.BLOB:
				return lobHandler.getBlobAsBytes(resultSet, columnIndex);
			case Types.DATE:
				return resultSet.getDate(columnIndex);
			case Types.DECIMAL:
				return resultSet.getBigDecimal(columnIndex);
			case Types.DISTINCT:
				throw new QueryServiceException(
						"Query Service : Not supported SQL type. Column Type - DISTINCT. Column Name - "
								+ columnName + ".");
			case Types.DOUBLE:
				return new Double(resultSet.getDouble(columnIndex));
			case Types.FLOAT:
				return new Double(resultSet.getDouble(columnIndex));
			case Types.INTEGER:
				return new Integer(resultSet.getInt(columnIndex));
			case Types.JAVA_OBJECT:
				throw new QueryServiceException(
						"Query Service : Not supported SQL type. Column Type - JAVA_OBJECT. Column Name - "
								+ columnName + ".");
			case Types.LONGVARBINARY:
				return resultSet.getBytes(columnIndex);
			case Types.LONGVARCHAR:
				obj = resultSet.getString(columnIndex);
				if (obj == null && nullchecks.size() != 0)
					obj = changeNullValue("longvarchar");
				return obj;
			case Types.NULL:
				throw new QueryServiceException(
						"Query Service : Not supported SQL type. Column Type - NULL. Column Name - "
								+ columnName + ".");
			case Types.NUMERIC:
				return resultSet.getBigDecimal(columnIndex);
			case Types.OTHER:
				throw new QueryServiceException(
						"Query Service : Not supported SQL type. Column Type - OTHER. Column Name - "
								+ columnName + ".");
			case Types.REAL:
				return new Float(resultSet.getFloat(columnIndex));
			case Types.REF:
				throw new QueryServiceException(
						"Query Service : Not supported SQL type. Column Type - REF. Column Name - "
								+ columnName + ".");
			case Types.SMALLINT:
				return new Short(resultSet.getShort(columnIndex));
			case Types.STRUCT:
				throw new QueryServiceException(
						"Query Service : Not supported SQL type. Column Type - STRUCT. Column Name - "
								+ columnName + ".");
			case Types.TIME:
				return resultSet.getTime(columnIndex);
			case Types.TIMESTAMP:
				return resultSet.getTimestamp(columnIndex);
			case Types.TINYINT:
				return new Byte(resultSet.getByte(columnIndex));
			case Types.VARBINARY:
				return resultSet.getBytes(columnIndex);
			case Types.VARCHAR:
				obj = resultSet.getString(columnIndex);
				if (obj == null && nullchecks.size() != 0)
					obj = changeNullValue("varchar");
				return obj;
			default:
				return resultSet.getString(columnIndex);
			} // swich
		} catch (Exception e) {
			QueryService.LOGGER
					.error(
							"Query Service : Not supported SQL type. Column Name - {}.",
							columnName, e);
		}
		return null;
	}

	/**
	 * In the case where value to replace a specific column type with NULL value
	 * is defined, replacement value is transferred.
	 * 
	 * @param type
	 *            a specific column's type
	 * @return Value to replace
	 */
	protected Object changeNullValue(String type) {
		if (nullchecks.containsKey(type)) {
			return nullchecks.get(type);
		} else
			return null;
	}
}
