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

	@SuppressWarnings("unchecked")
	private static Map classCache = new HashMap();

	@SuppressWarnings("unchecked")
	public static Class loadClass(String className) {
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
	 * @throws ClassNotFoundException
	 */
	@SuppressWarnings("unchecked")
	public static Class loadClass(String className, ClassLoader loader) {

		Class theClass;

		// if (loader == null) loader = URLUtil.classpath.getClassLoader();
		if (loader == null)
			loader = Thread.currentThread().getContextClassLoader();

		try {
			theClass = loader.loadClass(className);
		} catch (Exception e) {
			theClass = (Class) classCache.get(className);
			if (theClass == null) {
				synchronized (ObjectUtil.class) {
					theClass = (Class) classCache.get(className);
					if (theClass == null
							|| !classCache.containsValue(className)) {
						try {
							theClass = Class.forName(className);
						} catch (ClassNotFoundException e1) {
							throw new RuntimeException("Class is not found. ["
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
	 * @return an instance of the given class
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	public static Object getObject(String className) {
		Class clazz;
		try {
			clazz = loadClass(className);
			return clazz.newInstance();
		} catch (InstantiationException e) {
			logger.error("{} : Class is cant instantialized.",
					new Object[] { className });			throw new RuntimeException(className
					+ " : Class is cant instantialized.");
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.",
					new Object[] { className });
			throw new RuntimeException(className + " : Class is not accessed.");
		}
	}

	/**
	 * 
	 * @param bean
	 * @return true or false
	 */
	@SuppressWarnings("unchecked")
	public static boolean isEmpty(Object bean) {
		if (bean == null)
			return true;
		PropertyDescriptor[] propertyDescriptors = PropertyUtils
				.getPropertyDescriptors(bean.getClass());

		for (int i = 0; i < propertyDescriptors.length; i++) {
			String propertyName = propertyDescriptors[i].getName();
			Class type = propertyDescriptors[i].getPropertyType();
			if (type.getName().equals("java.lang.String")
					|| type.getName().equals("java.lang.Integer")
					|| type.getName().equals("java.lang.Long")
					|| type.getName().equals("java.lang.Double")
					|| type.getName().equals("java.util.Date")) {
				try {
					Object value = PropertyUtils
							.getProperty(bean, propertyName);
					if (value != null && !value.equals("")) {
						return false;
					}
				} catch (IllegalAccessException e) {
					logger.error("{} : Class is not accessed.",
							new Object[] { propertyName });					throw new RuntimeException(propertyName
							+ " : Class is not accessed.");
				} catch (InvocationTargetException e) {
					logger.error("{} : Invocation error.",
							new Object[] { propertyName });
					throw new RuntimeException(propertyName
							+ " : Invocation error.");
				} catch (NoSuchMethodException e) {
					logger.error("{} : Class has no such method.",
							new Object[] { propertyName });
					throw new RuntimeException(propertyName
							+ " : Class has no such method.");
				}
			}
		}
		return true;
	}

	/**
	 * @param destObj
	 * @param origObj
	 */
	@SuppressWarnings("unchecked")
	public static void copyProperties(Object destObj, Object origObj) {
		PropertyDescriptor[] propertyDescriptors = PropertyUtils
				.getPropertyDescriptors(destObj.getClass());
		for (int i = 0; i < propertyDescriptors.length; i++) {
			String propertyName = propertyDescriptors[i].getName();
			Class type = propertyDescriptors[i].getPropertyType();
			if ("class".equals(propertyName)) {
				continue; // No point in trying to set an object's class
			}

			if (hasProperty(origObj, propertyName)) {
				Object origValue;
				try {
					origValue = PropertyUtils
							.getProperty(origObj, propertyName);
				} catch (IllegalAccessException e) {
					logger.error("{} : Class is not accessed.",
							new Object[] { propertyName });					throw new RuntimeException(propertyName
							+ " : Class is not accessed.");
				} catch (InvocationTargetException e) {
					logger.error("{} : Invocation error.",
							new Object[] { propertyName });
					throw new RuntimeException(propertyName
							+ " : Invocation error.");
				} catch (NoSuchMethodException e) {
					logger.error("{} : Class has no such method.",
							new Object[] { propertyName });
					throw new RuntimeException(propertyName
							+ " : Class has no such method.");
				}
				setProperty(destObj, propertyName, origValue, type.getName());

			}
		}
	}

	/**
	 * @param bean
	 * @param propertyName
	 * @return
	 */
	private static boolean hasProperty(Object bean, String propertyName) {
		try {
			Field field = bean.getClass().getDeclaredField(propertyName);
			if (field != null) {
				return true;
			}
		} catch (SecurityException e) {
			logger.error("{} : Class is not Security.",
					new Object[] { propertyName });
			throw new RuntimeException(propertyName
					+ " : Class is not Security.");
		} catch (NoSuchFieldException e) {
			return false;
		}
		return false;
	}

	/**
	 * get object from original object by property name
	 * 
	 * @param object
	 * @param name
	 * @return object from original object by property name
	 */
	public static Object getProperty(Object object, String name) {
		try {
			return PropertyUtils.getProperty(object, name);
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.", new Object[] { name });			throw new RuntimeException(name + " : Class is not accessed.");
		} catch (InvocationTargetException e) {
			logger.error("{} : Invocation error.", new Object[] { name });
			throw new RuntimeException(name + " : Invocation error.");
		} catch (NoSuchMethodException e) {
			logger.error("{} : Class has no such method.",
					new Object[] { name });
			throw new RuntimeException(name + " : Class has no such method.");
		}
	}

	/**
	 * set property by property type
	 * 
	 * @param object
	 * @param name
	 * @param value
	 * @param type
	 */
	public static void setProperty(Object object, String name, Object value,
			String type) {
		String origType = null;
		if (value != null) {
			origType = value.getClass().getName();
			if (origType.indexOf("Date") != -1) {
				value = DateUtil.date2String((Date) value);
			}
			if (origType.indexOf("Timestamp") != -1) {
				value = DateUtil.timestamp2String((Timestamp) value);
			}
		}
		try {
			if (type.indexOf("String") != -1 && !isNull(value)) {
				PropertyUtils.setProperty(object, name, value.toString());
			} else if (type.indexOf("Long") != -1 && !isNull(value)) {
				value = new Long(value.toString());
				PropertyUtils.setProperty(object, name, value);
			} else if (type.indexOf("Integer") != -1 && !isNull(value)) {
				value = new Integer(value.toString());
				PropertyUtils.setProperty(object, name, value);
			} else if (type.indexOf("Double") != -1 && !isNull(value)) {
				value = new Double(value.toString());
				PropertyUtils.setProperty(object, name, value);
			} else if (type.indexOf("Date") != -1 && !isNull(value)) {
				value = DateUtil.string2Date((String) value);
				PropertyUtils.setProperty(object, name, value);
			}
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.", new Object[] { name });
			throw new RuntimeException(name + " : Class is not accessed.");
		} catch (InvocationTargetException e) {
			logger.error("{} : Invocation error.", new Object[] { name });
			throw new RuntimeException(name + " : Invocation error.");
		} catch (NoSuchMethodException e) {
			logger.error("{} : Class has no such method.",
					new Object[] { name });
			throw new RuntimeException(name + " : Class has no such method.");
		}
	}

	/**
	 * @param object
	 * @param name
	 *            property name
	 * @param value
	 *            property value
	 */
	public static void setProperty(Object object, String name, Object value) {
		try {
			PropertyUtils.setProperty(object, name, value);
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.", new Object[] { name });
			throw new RuntimeException(name + " : Class is not accessed.");
		} catch (InvocationTargetException e) {
			logger.error("{} : Invocation error.");
			throw new RuntimeException(name + " : Invocation error.");
		} catch (NoSuchMethodException e) {
			logger.error("{} : Class has no such method.",
					new Object[] { name });
			throw new RuntimeException(name + " : Class has no such method.");
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

	public static Field getField(Object object, String fieldName) {
		Field field = null;
		try {
			field = object.getClass().getDeclaredField(fieldName);
		} catch (NoSuchFieldException e) {
			logger.error("{} : Class has no such Field. {}", new Object[] {
					fieldName, e.toString() });
			throw new RuntimeException(fieldName
					+ " : Class has no such field.");
		}
		return field;
	}

	@SuppressWarnings("unchecked")
	public static Method getMethod(Object object, String methodName,
			Class[] argClasses) {
		Method method = null;
		try {
			method = object.getClass()
					.getDeclaredMethod(methodName, argClasses);
		} catch (SecurityException e) {
			logger.error("{} : Security! {}",
					new Object[] { methodName, e.toString() });
		} catch (NoSuchMethodException e) {
			logger.error("{} : Class has no such method. {}", new Object[] {
					methodName, e.toString() });
		}

		return method;
	}

	/**
	 * object is not String
	 * 
	 * @param object
	 * @return true or false
	 */
	public static boolean isNull(Object object) {
		if (object == null) {
			return true;
		}
		return false;
	}

	/**
	 * @param formObject
	 * @return model
	 */
	public static Object getModel(Object formObject) {
		String className = (String) getProperty(formObject, "className");
		Object destObj = getObject(className);
		if (destObj != null)
			copyProperties(destObj, formObject);
		return destObj;
	}

	/**
	 * @param destObject
	 * @param property
	 * @param value
	 */
	@SuppressWarnings("unchecked")
	public static void addProperty(Object destObject, String property,
			Object value) {
		String methodName = "add" + StringUtil.swapFirstLetterCase(property);
		Class[] classes = new Class[] { value.getClass() };
		Method method = getMethod(destObject, methodName, classes);
		try {
			method.invoke(destObject, new Object[] { value });
		} catch (IllegalArgumentException e) {
			logger.error("Argument is illegal.");
			throw new RuntimeException("Argument is illegal.");
		} catch (IllegalAccessException e) {
			logger.error("{} : Class is not accessed.",
					new Object[] { property });
			throw new RuntimeException(property + " : Class is not accessed.");
		} catch (InvocationTargetException e) {
			logger.error("{} : Invocation error.", new Object[] { property });
			throw new RuntimeException(property + " : Invocation error.");
		}
	}
}