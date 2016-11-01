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
package org.anyframe.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.anyframe.exception.BaseRuntimeException;
import org.apache.commons.beanutils.PropertyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ReflectionUtils;

/**
 * java reflection api helpers
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class ObjectUtil {

	private ObjectUtil() {
		throw new AssertionError();
	}

	/**
	 * Logger for this class
	 */
	private static Logger logger = LoggerFactory.getLogger(ObjectUtil.class);

	private static Map<String, Class<?>> classCache = new HashMap<String, Class<?>>();

	public static Class<?> loadClass(String className) {
		return loadClass(className, null); 
	}

	/**
	 * Loads a class with the URLUtil's classpath.
	 * 
	 * @param className
	 *            The name of the class to load
	 * @param loader
	 *            The ClassLoader to su
	 * @return The requested class
	 * @throws RuntimeException
	 */
	public static Class<?> loadClass(String className, ClassLoader loader) {

		Class<?> theClass;

		if (loader == null)
			loader = Thread.currentThread().getContextClassLoader();

		try {
			theClass = loader.loadClass(className);
		} catch (Exception e) {
			theClass = (Class<?>) classCache.get(className);
			if (theClass == null) {
				synchronized (ObjectUtil.class) {
					theClass = (Class<?>) classCache.get(className);
					if (theClass == null
							|| !classCache.containsValue(className)) {
						try {
							theClass = Class.forName(className);
						} catch (ClassNotFoundException e1) {
							throw new BaseRuntimeException("Class is not found. ["
									+ className + "]");
						}
						if (theClass != null) {
							logger.info("Loaded Class: {}",
									new Object[] { theClass.getName() });
							classCache.put(className, theClass);
						}
					}
				}
			}
		}

		return theClass;
	}

	/**
	 * Get an instance of the given class name.
	 * 
	 * @param className
	 *            the String to get ClassName
	 * @return an instance of the given class
	 * @throws RuntimeException
	 */
	public static Object getObject(String className) {
		Class<?> clazz;
		try {
			clazz = loadClass(className);
			return clazz.newInstance();
		} catch (InstantiationException e) {
			logger.error("{} : Class is cant instantialized.",
					new Object[] { className });
			throw new BaseRuntimeException(className
					+ " : Class is cant instantialized.");
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.",
					new Object[] { className });
			throw new BaseRuntimeException(className + " : Class is not accessed.");
		}
	}

	/**
	 * Check the input object has null properties only
	 * 
	 * @param object
	 * @return true if all the properties are null or empty String.
	 * @throws RuntimeException
	 * @deprecated Use {@link #isEmptyObject(Object)}
	 */
	@Deprecated
	@SuppressWarnings("unchecked")
	public static boolean isEmpty(Object object) {
		if (object == null)
			return true;
		PropertyDescriptor[] propertyDescriptors = PropertyUtils
				.getPropertyDescriptors(object.getClass());

		for (int i = 0; i < propertyDescriptors.length; i++) {
			String name = propertyDescriptors[i].getName();
			Class type = propertyDescriptors[i].getPropertyType();
			if (type.getName().equals("java.lang.String")
					|| type.getName().equals("java.lang.Integer")
					|| type.getName().equals("java.lang.Long")
					|| type.getName().equals("java.lang.Double")
					|| type.getName().equals("java.util.Date")) {
				try {
					Object value = PropertyUtils.getProperty(object, name);
					if (value != null && !value.equals("")) {
						return false;
					}
				} catch (IllegalAccessException e) {
					logger.error("{} : Class is not accessed.",
							new Object[] { name });
					throw new BaseRuntimeException(name
							+ " : Class is not accessed.");
				} catch (InvocationTargetException e) {
					logger.error("{} : Invocation error.",
							new Object[] { name });
					throw new BaseRuntimeException(name + " : Invocation error.");
				} catch (NoSuchMethodException e) {
					logger.error("{} : Class has no such method.",
							new Object[] { name });
					throw new BaseRuntimeException(name
							+ " : Class has no such method.");
				}
			}
		}
		return true;
	}

	/**
	 * Check the input object has null properties only
	 * 
	 * @param object
	 * @return true if the object is null or all the properties are null or
	 *         empty String.
	 * @throws RuntimeException
	 * 
	 */
	public static boolean isEmptyObject(Object object) {
		if (object == null)
			return true;
		PropertyDescriptor[] propertyDescriptors = PropertyUtils
				.getPropertyDescriptors(object.getClass());

		for (int i = 0; i < propertyDescriptors.length; i++) {
			String name = propertyDescriptors[i].getName();
			Class<?> type = propertyDescriptors[i].getPropertyType();
			if (type.getName().equals("java.lang.String")
					|| type.getName().equals("java.lang.Integer")
					|| type.getName().equals("java.lang.Long")
					|| type.getName().equals("java.lang.Double")
					|| type.getName().equals("java.util.Date")) {
				try {
					Object value = PropertyUtils.getProperty(object, name);
					if (value != null && !value.equals("")) {
						return false;
					}
				} catch (IllegalAccessException e) {
					logger.error("{} : Class is not accessed.",
							new Object[] { name });
					throw new BaseRuntimeException(name
							+ " : Class is not accessed.");
				} catch (InvocationTargetException e) {
					logger.error("{} : Invocation error.",
							new Object[] { name });
					throw new BaseRuntimeException(name + " : Invocation error.");
				} catch (NoSuchMethodException e) {
					logger.error("{} : Class has no such method.",
							new Object[] { name });
					throw new BaseRuntimeException(name
							+ " : Class has no such method.");
				}
			}
		}
		return true;
	}

	/**
	 * Copy original object's properties value to destination object
	 * 
	 * @param destObject
	 *            the object to be copied
	 * @param origObject
	 *            the object to copy
	 * @throws RuntimeException
	 */
	public static void copyProperties(Object destObject, Object origObject) {
		PropertyDescriptor[] propertyDescriptors = PropertyUtils
				.getPropertyDescriptors(destObject.getClass());
		for (int i = 0; i < propertyDescriptors.length; i++) {
			String name = propertyDescriptors[i].getName();
			Class<?> type = propertyDescriptors[i].getPropertyType();
			if ("class".equals(name)) {
				continue; // No point in trying to set an object's class
			}

			if (hasProperty(origObject, name)) {
				Object origValue;
				try {
					origValue = PropertyUtils.getProperty(origObject, name);
				} catch (IllegalAccessException e) {
					logger.error("{} : Class is not accessed.",
							new Object[] { name });
					throw new BaseRuntimeException(name
							+ " : Class is not accessed.");
				} catch (InvocationTargetException e) {
					logger.error("{} : Invocation error.",
							new Object[] { name });
					throw new BaseRuntimeException(name + " : Invocation error.");
				} catch (NoSuchMethodException e) {
					logger.error("{} : Class has no such method.",
							new Object[] { name });
					throw new BaseRuntimeException(name
							+ " : Class has no such method.");
				}
				setProperty(destObject, name, origValue, type.getName());

			}
		}
	}

	/**
	 * Checks if the input object has the field
	 * 
	 * @param object
	 *            the object to be checked
	 * @param name
	 *            property name to check
	 * @return true if the object has the property
	 * @throws RuntimeException
	 */
	private static boolean hasProperty(Object object, String name) {
		try {
			Field field = object.getClass().getDeclaredField(name);
			if (field != null) {
				return true;
			}
		} catch (SecurityException e) {
			logger.error("{} : Class is not Security.", new Object[] { name });
			throw new BaseRuntimeException(name + " : Class is not Security.");
		} catch (NoSuchFieldException e) {
			return false;
		}
		return false;
	}

	/**
	 * Get object from original object by property name
	 * 
	 * @param object
	 *            the object to get property
	 * @param name
	 *            the String property name
	 * @return object from original object by property name
	 * @throws RuntimeException
	 */
	public static Object getProperty(Object object, String name) {
		try {
			return PropertyUtils.getProperty(object, name);
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.", new Object[] { name });
			throw new BaseRuntimeException(name + " : Class is not accessed.");
		} catch (InvocationTargetException e) {
			logger.error("{} : Invocation error.", new Object[] { name });
			throw new BaseRuntimeException(name + " : Invocation error.");
		} catch (NoSuchMethodException e) {
			logger.error("{} : Class has no such method.",
					new Object[] { name });
			throw new BaseRuntimeException(name + " : Class has no such method.");
		}
	}

	/**
	 * Set property by property type
	 * 
	 * @param object
	 * @param name
	 *            the String propert name.
	 * @param value
	 *            the object property value
	 * @param propertyType
	 *            the String property type
	 * @throws RuntimeException
	 */
	public static void setProperty(Object object, String name, Object value,
			String propertyType) {
		String origType = null;
		if (value != null) {
			origType = value.getClass().getName();
			if (origType.indexOf("Date") != -1) {
				value = DateUtil.dateToString((Date) value);
			}
			if (origType.indexOf("Timestamp") != -1) {
				value = DateUtil.timestampToString((Timestamp) value);
			}
		}
		try {
			if (propertyType.indexOf("String") != -1 && !isNull(value)) {
				PropertyUtils.setProperty(object, name, value.toString());
			} else if (propertyType.indexOf("Long") != -1 && !isNull(value)) {
				value = new Long(value.toString());
				PropertyUtils.setProperty(object, name, value);
			} else if (propertyType.indexOf("Integer") != -1 && !isNull(value)) {
				value = new Integer(value.toString());
				PropertyUtils.setProperty(object, name, value);
			} else if (propertyType.indexOf("Double") != -1 && !isNull(value)) {
				value = new Double(value.toString());
				PropertyUtils.setProperty(object, name, value);
			} else if (propertyType.indexOf("Date") != -1 && !isNull(value)) {
				value = DateUtil.stringToDate((String) value);
				PropertyUtils.setProperty(object, name, value);
			}
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.", new Object[] { name });
			throw new BaseRuntimeException(name + " : Class is not accessed.");
		} catch (InvocationTargetException e) {
			logger.error("{} : Invocation error.", new Object[] { name });
			throw new BaseRuntimeException(name + " : Invocation error.");
		} catch (NoSuchMethodException e) {
			logger.error("{} : Class has no such method.",
					new Object[] { name });
			throw new BaseRuntimeException(name + " : Class has no such method.");
		}
	}

	/**
	 * Set value to object's property named propName
	 * 
	 * @param object
	 * @param propName
	 *            property name
	 * @param value
	 *            property value
	 * @throws RuntimeException
	 */
	public static void setProperty(Object object, String propName, Object value) {
		try {
			PropertyUtils.setProperty(object, propName, value);
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.",
					new Object[] { propName });
			throw new BaseRuntimeException(propName + " : Class is not accessed.");
		} catch (InvocationTargetException e) {
			logger.error("{} : Invocation error.");
			throw new BaseRuntimeException(propName + " : Invocation error.");
		} catch (NoSuchMethodException e) {
			logger.error("{} : Class has no such method.",
					new Object[] { propName });
			throw new BaseRuntimeException(propName
					+ " : Class has no such method.");
		}
	}

	/**
	 * Set value to object's member variable named fieldName
	 * 
	 * @param object
	 * @param fieldName
	 * @param value
	 */
	public static void setField(Object object, String fieldName, Object value) {
		Field field = ReflectionUtils.findField(object.getClass(), fieldName);
		ReflectionUtils.makeAccessible(field);
		ReflectionUtils.setField(field, object, value);
	}

	/**
	 * Get the given fieldName java.lang.reflect.Field object
	 * 
	 * @param object
	 * @param fieldName
	 * @return
	 */
	public static Field getField(Object object, String fieldName) {
		Field field = null;
		try {
			field = object.getClass().getDeclaredField(fieldName);
		} catch (NoSuchFieldException e) {
			logger.error("{} : Class has no such Field. {}", new Object[] {
					fieldName, e.toString() });
			throw new BaseRuntimeException(fieldName
					+ " : Class has no such field.");
		}
		return field;
	}

	/**
	 * Find the object's method object
	 * 
	 * @param object
	 *            the object
	 * @param name
	 *            method name
	 * @param args
	 *            method parameter types
	 * @return the java.lang.reflect.Method object
	 */
	public static Method getMethod(Object object, String name, Class<?>[] args) {
		Method method = null;
		try {
			method = object.getClass().getDeclaredMethod(name, args);
		} catch (SecurityException e) {
			logger.error("{} : Security! {}",
					new Object[] { name, e.toString() });
		} catch (NoSuchMethodException e) {
			logger.error("{} : Class has no such method. {}", new Object[] {
					name, e.toString() });
		}

		return method;
	}

	/**
	 * Checks whether the input object is null or not.
	 * 
	 * @param object
	 *            the Object to be checked
	 * @return true if the input object is null
	 */
	public static boolean isNull(Object object) {
		if (object == null) {
			return true;
		}
		return false;
	}

	/**
	 * Copies spring form object.
	 * 
	 * @param formObject
	 * @return model
	 * @deprecated Use {@link #isEmptyObject(Object)}
	 */
	@Deprecated
	public static Object getModel(Object formObject) {
		String className = (String) getProperty(formObject, "className");
		Object destObj = getObject(className);
		if (destObj != null)
			copyProperties(destObj, formObject);
		return destObj;
	}

	/**
	 * Copies spring model object.
	 * 
	 * @param modelObject
	 *            the spring model object to copy
	 * @return copied object
	 */
	public static Object copyModelObject(Object modelObject) {
		String className = (String) getProperty(modelObject, "className");
		Object destObj = getObject(className);
		if (destObj != null)
			copyProperties(destObj, modelObject);
		return destObj;
	}

	/**
	 * Invokes add method
	 * 
	 * @param object
	 * @param name
	 * @param value
	 * @deprecated Use {@link #invokdeAddPropertyValueMethod(Object)}
	 */
	@Deprecated
	@SuppressWarnings("unchecked")
	public static void addProperty(Object object, String name, Object value) {
		String methodName = "add" + StringUtil.swapFirstLetterCase(name);
		Class[] classes = new Class[] { value.getClass() };
		Method method = getMethod(object, methodName, classes);
		try {
			method.invoke(object, new Object[] { value });
		} catch (IllegalArgumentException e) {
			logger.error("Argument is illegal.");
			throw new BaseRuntimeException("Argument is illegal.");
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.", new Object[] { name });
			throw new BaseRuntimeException(name + " : Class is not accessed.");
		} catch (InvocationTargetException e) {
			logger.error("{} : Invocation error.", new Object[] { name });
			throw new BaseRuntimeException(name + " : Invocation error.");
		}
	}

	/**
	 * Invokes add property method
	 * 
	 * @param object
	 * @param name
	 * @param value
	 */
	public static void invokdeAddPropertyValueMethod(Object object,
			String name, Object value) {
		String methodName = "add" + StringUtil.toUpperCaseFirstLetter(name);
		Class<?>[] classes = new Class[] { value.getClass() };
		Method method = getMethod(object, methodName, classes);
		try {
			method.invoke(object, new Object[] { value });
		} catch (IllegalArgumentException e) {
			logger.error("Argument is illegal.");
			throw new BaseRuntimeException("Argument is illegal.");
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.", new Object[] { name });
			throw new BaseRuntimeException(name + " : Class is not accessed.");
		} catch (InvocationTargetException e) {
			logger.error("{} : Invocation error.", new Object[] { name });
			throw new BaseRuntimeException(name + " : Invocation error.");
		}
	}
}