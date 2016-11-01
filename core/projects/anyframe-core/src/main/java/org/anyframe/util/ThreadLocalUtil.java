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
 * java ThreadLocal API helpers
 * 
 * @author Youngmin Jo
 * 
 */
public class ThreadLocalUtil {

	private ThreadLocalUtil() {
		throw new AssertionError();
	}

	private static ThreadLocal<Map<Object, Object>> threadLocal = new ThreadLocal<Map<Object, Object>>();

	/**
	 * Gets the thread local variable.
	 * 
	 * @return thread local object
	 */
	public static Map<Object, Object> getThreadLocal() {
		if (threadLocal.get() == null) {
			Map<Object, Object> sharedInfo = new HashMap<Object, Object>();
			threadLocal.set(sharedInfo);
		}
		return threadLocal.get();
	}

	/**
	 * Puts an object to thread local with a key.
	 * 
	 * @param key
	 *            the key object to be stored in threadLocal
	 * @param value
	 *            the value object to be stored in threadLocal
	 */
	public static void add(Object key, Object object) {
		getThreadLocal().put(key, object);
	}

	/**
	 * Gets an object in the thread local with a key.
	 * 
	 * @param key
	 *            the key to search
	 * @return the value Object
	 */
	public static Object get(Object key) {
		return getThreadLocal().get(key);
	}

	/**
	 * Checks if thread local contains an object with a key.
	 * 
	 * @param key
	 *            the key to search
	 * @return true if thread local contains an object with a key, false if not.
	 */
	public static boolean isExist(Object key) {
		Object object = getThreadLocal().get(key);
		if (object != null) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Clears thread local variable.
	 */
	public static void clearSharedInfo() {
		getThreadLocal().clear();
		threadLocal.set(null);
	}

	/**
	 * Gets keys in the thread local variable.
	 * 
	 * @return array of keys.
	 */
	public static Object[] getThreadLocalKeys() {
		Object[] arrKeys = new String[getThreadLocal().size()];
		Iterator<Object> keyIter = getThreadLocal().keySet().iterator();
		int i = 0;
		while (keyIter.hasNext()) {
			arrKeys[i] = keyIter.next();
			i++;
		}
		return arrKeys;
	}

	/**
	 * Gets size of the thread local variable.
	 * 
	 * @return size of the thread local variable.
	 */
	public static int size() {
		return getThreadLocal().size();
	}

	/**
	 * Gets values in the thread local variable.
	 * 
	 * @return array of values.
	 */
	public static Object[] getThreadLocalValues() {

		int size = size();

		Object[] arrKeys = getThreadLocalKeys();
		Object[] values = new Object[size];

		for (int i = 0; i < size; i++) {
			values[i] = getThreadLocal().get(arrKeys[i]);
		}
		return values;
	}

	/**
	 * Prints string values of the thread local variable.
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
	 * Prints string values of the thread local variable.
	 */
	public static void printThreadLocal() {
		int size = size();

		StringBuffer str = new StringBuffer();
		Object[] keys = getThreadLocalKeys();
		Object[] values = getThreadLocalValues();

		for (int i = 0; i < size; i++) {
			str.append("  " + keys[i] + " = " + values[i] + " \n");
		}
		System.out.println(str.toString());
	}
}
