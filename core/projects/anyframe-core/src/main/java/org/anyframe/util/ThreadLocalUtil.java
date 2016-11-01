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

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * JAVA ThreadLocal API helpers. If isInheritable value set true, then using
 * {@link InheritableThreadLocal} instead of {@link ThreadLocal}.
 * 
 * <p>Inheritable thread-local variables are used in preference to ordinary
 * thread-local variables when the per-thread-attribute being maintained in the
 * variable (e.g., User ID, Transaction ID) must be automatically transmitted to
 * any child threads that are created. (ref. JDK API
 * {@link InheritableThreadLocal})
 * 
 * <p><b>WARNING : </b>Note that there are the possibility of Thread interference
 * in case of using {@link InheritableThreadLocal}, since {@link Map} called by
 * references.
 * 
 * @author Youngmin Jo
 */
public class ThreadLocalUtil {

	private ThreadLocalUtil() {
		throw new AssertionError();
	}

	private static ThreadLocal<Map<Object, Object>> threadLocal = new ThreadLocal<Map<Object, Object>>();
	private static InheritableThreadLocal<Map<Object, Object>> inheritableThreadLocal = new InheritableThreadLocal<Map<Object, Object>>();

	/**
	 * Get the thread local variable.
	 * 
	 * @return thread local object
	 * @deprecated Use {@link #getAll()}
	 */
	@Deprecated
	public static Map<Object, Object> getThreadLocal() {
		if (threadLocal.get() == null) {
			Map<Object, Object> sharedInfo = new HashMap<Object, Object>();
			threadLocal.set(sharedInfo);
		}
		return threadLocal.get();
	}

	/**
	 * Get the thread local variable
	 * 
	 * @return Thread local object
	 */
	public static Map<Object, Object> getAll() {
		return getAll(false);
	}

	/**
	 * Get the thread local variable. If isInheritable value set true, then
	 * using {@link InheritableThreadLocal}.
	 * @param isInheritable
	 * @return Thread local object
	 */
	public static Map<Object, Object> getAll(boolean isInheritable) {
		if (isInheritable) {
			if (inheritableThreadLocal.get() == null) {
				Map<Object, Object> sharedInfo = new HashMap<Object, Object>();
				inheritableThreadLocal.set(sharedInfo);
			}
			return inheritableThreadLocal.get();
		} else {
			if (threadLocal.get() == null) {
				Map<Object, Object> sharedInfo = new HashMap<Object, Object>();
				threadLocal.set(sharedInfo);
			}
			return threadLocal.get();
		}
	}

	/**
	 * Put an object to thread local with a key.
	 * 
	 * @param key
	 *            the key object to be stored in threadLocal
	 * @param object
	 *            the value object to be stored in threadLocal
	 */
	public static void add(Object key, Object object) {
		add(key, object, false);
	}

	/**
	 * Put an object to thread local with a key. If isInheritable value set
	 * true, then using {@link InheritableThreadLocal}.
	 * 
	 * @param key
	 *            the key object to be stored in threadLocal
	 * @param value
	 *            the value object to be stored in threadLocal
	 * @param isInheritable            
	 */
	public static void add(Object key, Object object, boolean isInheritable) {
		getAll(isInheritable).put(key, object);
	}

	/**
	 * Get an object in the thread local with a key.
	 * 
	 * @param key
	 *            the key to search
	 * @return the value Object
	 */
	public static Object get(Object key) {
		return get(key, false);
	}

	/**
	 * Get an object in the thread local with a key. If isInheritable value set
	 * true, then using {@link InheritableThreadLocal}.
	 * 
	 * @param key
	 *            the key to search
	 * @param isInheritable            
	 * @return the value Object
	 */
	public static Object get(Object key, boolean isInheritable) {
		return getAll(isInheritable).get(key);
	}

	/**
	 * Check if thread local contains an object with a key.
	 * 
	 * @param key
	 *            the key to search
	 * @return true if thread local contains an object with a key, false if not.
	 */
	public static boolean isExist(Object key) {
		return isExist(key, false);
	}

	/**
	 * Check if thread local contains an object with a key. If isInheritable
	 * value set true, then using {@link InheritableThreadLocal}.
	 * 
	 * @param key
	 *            the key to search
	 * @param isInheritable            
	 * @return true if thread local contains an object with a key, false if not.
	 */
	public static boolean isExist(Object key, boolean isInheritable) {
		Object object = getAll(isInheritable).get(key);
		if (object != null) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Clear thread local variable.
	 * 
	 * @deprecated Use {@link #clear()}
	 */
	@Deprecated
	public static void clearSharedInfo() {
		getAll().clear();
		threadLocal.set(null);
	}

	/**
	 * Clear thread local variable.
	 */
	public static void clear() {
		threadLocal.remove();
		inheritableThreadLocal.remove();
	}

	/**
	 * Get keys in the thread local variable.
	 * 
	 * @return array of keys.
	 */
	public static Object[] getThreadLocalKeys() {
		return getThreadLocalKeys(false);
	}

	/**
	 * Get keys in the thread local variable. If isInheritable value set true,
	 * then using {@link InheritableThreadLocal}.
	 * 
	 * @param isInheritable
	 * @return array of keys.
	 */
	public static Object[] getThreadLocalKeys(boolean isInheritable) {
		Object[] arrKeys = new String[getAll(isInheritable).size()];
		Iterator<Object> keyIter = getAll(isInheritable).keySet().iterator();
		int i = 0;
		while (keyIter.hasNext()) {
			arrKeys[i] = keyIter.next();
			i++;
		}
		return arrKeys;
	}

	/**
	 * Get size of the thread local variable.
	 * 
	 * @return size of the thread local variable.
	 */
	public static int size() {
		return size(false);
	}

	/**
	 * Get size of the thread local variable. If isInheritable value set true,
	 * then using {@link InheritableThreadLocal}.
	 * 
	 * @param isInheritable
	 * @return size of the thread local variable.
	 */
	public static int size(boolean isInheritable) {
		return getAll(isInheritable).size();
	}

	/**
	 * Get values in the thread local variable.
	 * 
	 * @return array of values.
	 */
	public static Object[] getThreadLocalValues() {
		return getThreadLocalValues(false);
	}

	/**
	 * Get values in the thread local variable. If isInheritable value set true,
	 * then using {@link InheritableThreadLocal}.
	 * 
	 * @param isInheritable
	 * @return array of values.
	 */
	public static Object[] getThreadLocalValues(boolean isInheritable) {

		int size = size();

		Object[] arrKeys = getThreadLocalKeys(isInheritable);
		Object[] values = new Object[size];

		for (int i = 0; i < size; i++) {
			values[i] = getAll(isInheritable).get(arrKeys[i]);
		}
		return values;
	}

	/**
	 * Print string values of the thread local variable.
	 * 
	 * @deprecated Use {@link #printThreadLocal()}
	 */
	@Deprecated
	public static void toPrintString() {

		int size = size();

		StringBuffer str = new StringBuffer();
		Object[] keys = getThreadLocalKeys();
		Object[] values = getThreadLocalValues();

		for (int i = 0; i < size; i++) {
			str.append("  " + keys[i] + " = " + values[i] + " \n");
		}
		System.out.println(str.toString());
	}

	/**
	 * Print string values of the thread local variable.
	 * 
	 * @deprecated Use {@link #getThreadLocalValuesToString()}
	 */
	@Deprecated
	public static void printThreadLocal() {
		System.out.println(getValuesToString());
	}

	/**
	 * Return String values of the ThreadLocal variable.
	 * 
	 * @return String
	 */
	public static String getValuesToString() {
		return getValuesToString(false);
	}

	/**
	 * Return String values of the ThreadLocal variable. If isInheritable value
	 * set true, then using {@link InheritableThreadLocal}.
	 * 
	 * @param isInheritable
	 * @return String
	 */
	public static String getValuesToString(boolean isInheritable) {
		int size = size();

		StringBuffer str = new StringBuffer();
		Object[] keys = getThreadLocalKeys(isInheritable);
		Object[] values = getThreadLocalValues(isInheritable);

		for (int i = 0; i < size; i++) {
			str.append("  " + keys[i] + " = " + values[i] + " \n");
		}

		return str.toString();
	}

}
