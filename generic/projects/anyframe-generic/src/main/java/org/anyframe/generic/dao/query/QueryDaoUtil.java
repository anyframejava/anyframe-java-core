/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.generic.dao.query;

import java.lang.reflect.Method;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EmbeddedId;
import javax.persistence.Id;

import org.hibernate.annotations.common.reflection.XClass;
import org.hibernate.annotations.common.reflection.XProperty;
import org.hibernate.annotations.common.reflection.java.JavaReflectionManager;
import org.hibernate.util.ReflectHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ClassUtils;

/**
 * General QueryService Utilities class with rules for primary keys. The
 * original code of this class comes from Appfuse framework.
 * 
 * @author Bobby Diaz, Bryan Noll
 * @author modified by SooYeon Park
 */
public final class QueryDaoUtil {
	/**
	 * Log variable for all child classes. Uses
	 * LoggerFactory.getLogger(getClass()) from Slf4j
	 */
	protected static final Logger logger = LoggerFactory
			.getLogger(QueryDaoUtil.class);

	private static Map<String, XProperty> primaryKeyPropertyMap = new HashMap<String, XProperty>();

	/**
	 * Checkstyle rule: utility classes should not have public constructor
	 */
	private QueryDaoUtil() {
	}

	/**
	 * Get primary key property from object
	 * 
	 * @param o
	 *            the object to examine
	 * @return the primary key property
	 */
	protected static XProperty getPrimaryKeyProperty(Object o) {
		String clazzName = o.getClass().getCanonicalName();

		if (primaryKeyPropertyMap.get(clazzName) != null) {
			return primaryKeyPropertyMap.get(clazzName);
		}
		try {
			JavaReflectionManager reflectionManager = new JavaReflectionManager();
			Class<?> loadedClass = ReflectHelper.classForName(clazzName);
			XClass persistentXClass = reflectionManager.toXClass(loadedClass);
			List<XProperty> properties = persistentXClass
					.getDeclaredProperties("property");

			for (XProperty property : properties) {

				if (property.isAnnotationPresent(Id.class)
						|| property.isAnnotationPresent(EmbeddedId.class)) {
					primaryKeyPropertyMap.put(clazzName, property);
					return property;
				}
			}
		} catch (Exception e) {
			logger.error("Could not find primary key of {} ",
					new Object[] { clazzName });
		}

		return null;
	}

	/**
	 * Get primary key field name from object.
	 * 
	 * @param o
	 *            the object to examine
	 * @return the fieldName
	 */
	protected static String getPrimaryKeyFieldName(Object o) {
		return getPrimaryKeyProperty(o).getName();
	}

	/**
	 * Get the value of the primary key using reflection.
	 * 
	 * @param o
	 *            the object to examine
	 * @return the value as an Object
	 */
	protected static Object getPrimaryKeyValue(Object o) {
		// Use reflection to find the first property
		String fieldName = getPrimaryKeyFieldName(o);
		String getterMethod = "get"
				+ Character.toUpperCase(fieldName.charAt(0))
				+ fieldName.substring(1);

		try {
			Method getMethod = o.getClass().getMethod(getterMethod,
					(Class[]) null);
			return getMethod.invoke(o, (Object[]) null);
		} catch (Exception e) {
			logger.error("Could not invoke method '{}' on {}", new Object[] {
					getterMethod, ClassUtils.getShortName(o.getClass()) });
		}
		return null;
	}

	/**
	 * Sets the primary key's value
	 * 
	 * @param o
	 *            the object to examine
	 * @param clazz
	 *            the class type of the primary key
	 * @param value
	 *            the value of the new primary key
	 */
	@SuppressWarnings("rawtypes")
	protected static void setPrimaryKey(Object o, Class clazz, Object value) {
		String fieldName = getPrimaryKeyFieldName(o);
		String setMethodName = "set"
				+ Character.toUpperCase(fieldName.charAt(0))
				+ fieldName.substring(1);

		try {
			Method setMethod = o.getClass().getMethod(setMethodName, clazz);
			if (value != null) {
				setMethod.invoke(o, value);
			}
		} catch (Exception e) {
			logger.error(MessageFormat.format(
					"Could not set ''{}.{} with value {}", new Object[] {
							ClassUtils.getShortName(o.getClass()), fieldName,
							value }));

		}
	}

}
