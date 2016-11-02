/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.struts.util.mip;

import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

/**
 * @author Warren Mayocchi
 * 
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim
 */
@SuppressWarnings("unchecked")
public class ReflectionHelp {

	/**
	 * Get all declared fields - helpful for retrieving all the fields of an
	 * object, including those inherited from parent classes.
	 * 
	 * @param target
	 *            The class to examine.
	 * @return Array of fields.
	 */

	public static Field[] getAllDeclaredFields(Class target) {
		// Recursing
		List temporary = new LinkedList();
		if (target.getSuperclass() != null) {
			Field[] allFields = getAllDeclaredFields(target.getSuperclass());
			temporary.addAll(Arrays.asList(allFields));
		}

		// Fetching all class fields
		Field[] currentFields = target.getDeclaredFields();
		temporary.addAll(Arrays.asList(currentFields));
		return (Field[]) temporary.toArray(new Field[temporary.size()]);
	}

	/**
	 * Get all declared fields - helpful for retrieving all the fields of an
	 * object, including those inherited from parent classes.
	 * 
	 * @param bean
	 *            The object to examine.
	 * @return List of all the fields.
	 */
	public static List getFields(Object bean) {
		Field[] fields = getAllDeclaredFields(bean.getClass());
		AccessibleObject.setAccessible(fields, true);
		List fieldList = Arrays.asList(fields);
		return fieldList;
	}

	/**
	 * Set a field's value.
	 * 
	 * @param field
	 *            The class field to set.
	 * @param bean
	 *            The specific object that contains the field.
	 * @param value
	 *            The value that will be applied to the field.
	 */
	public static void setField(Field field, Object bean, Object value) {
		try {
			if (value != null) {
				field.set(bean, value);
			}
		} catch (IllegalArgumentException e) {
			throw new RuntimeException("Cannot set " + field.getName() + " = (" + value + ") Error: " + e.getMessage());
		} catch (IllegalAccessException e) {
			throw new RuntimeException("Cannot set " + field.getName() + " = (" + value + ") Error: " + e.getMessage());
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
			throw new RuntimeException("Cannot get " + field.getName() + " Error: " + e.getMessage());
		} catch (IllegalAccessException e) {
			throw new RuntimeException("Cannot get " + field.getName() + " Error: " + e.getMessage());
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
			throw new RuntimeException("Cannot create " + createClass.getName() + ": " + e.getMessage());

		} catch (IllegalAccessException e) {
			throw new RuntimeException("Cannot create " + createClass.getName() + ": " + e.getMessage());
		}
	}
}
