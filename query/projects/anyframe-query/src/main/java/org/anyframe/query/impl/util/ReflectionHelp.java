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
package org.anyframe.query.impl.util;

import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
 * This class either extracts Filed information defined at a specific target
 * class or creates instance of relevant class. 
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class ReflectionHelp {

	private ReflectionHelp() {
		super();
	}

	/**
	 * Get all declared fields - helpful for retrieving all the fields of an
	 * object, including those inherited from parent classes.
	 * 
	 * @param target
	 *            The class to examine.
	 * @return Array of fields.
	 */
	public static Map getAllDeclaredFields(Class target){
		Map fieldMap = new HashMap();
		
		if (target.getSuperclass() != null) {
			Map superFieldMap = getAllDeclaredFields(target.getSuperclass());
			fieldMap.putAll(superFieldMap);
		}		
		
		Field[] currentFields = target.getDeclaredFields();
		AccessibleObject.setAccessible(currentFields, true);
		for(int i=0; i<currentFields.length; i++){
			fieldMap.put(currentFields[i].getName(), currentFields[i]);
		}
		
		return fieldMap;
	}

	/**
	 * Set a field's value.
	 * 
	 * @param field
	 *            The class field to set.
	 * @param obj
	 *            The specific object that contains the field.
	 * @param value
	 *            The value that will be applied to the field.
	 */
	public static void setFieldValue(Field field, Object obj, Object value) {
		try {
			if (value != null)
				field.set(obj, value);
		} catch (IllegalAccessException e) {
			throw new RuntimeException("Query Service : Cannot set "
					+ field.getName() + " = (" + value + ") Reason : "
					+ e.getMessage());
		}
	}

	/**
	 * Get a field's value.
	 * 
	 * @param field
	 *            The class field.
	 * @param bean
	 *            The specific object to examine.
	 * @return The value of the field.
	 */
	public static Object getFieldValue(Field field, Object bean) {
		try {
			return field.get(bean);
		} catch (IllegalArgumentException e) {
			throw new RuntimeException("Query Service : Cannot get "
					+ field.getName() + ", Reason : " + e.getMessage());
		} catch (IllegalAccessException e) {
			throw new RuntimeException("Query Service : Cannot get "
					+ field.getName() + ", Reason : " + e.getMessage());
		}
	}

	/**
	 * Factory method that returns a new instance of the given Class.
	 * 
	 * @param createClass
	 *            The Class to create an object from.
	 * @return A newly created object of the Class.
	 */
	public static Object newInstance(Class createClass) {
		try {
			return createClass.newInstance();
		} catch (InstantiationException e) {
			throw new RuntimeException("Query Service : Cannot create "
					+ createClass.getName() + ", Reason : " + e.getMessage());

		} catch (IllegalAccessException e) {
			throw new RuntimeException("Query Service : Cannot create "
					+ createClass.getName() + ", Reason : " + e.getMessage());
		}
	}
}
