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

import java.lang.reflect.Field;
import java.net.URL;
import java.net.URLClassLoader;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;

import junit.framework.TestCase;

import org.anyframe.util.sample.User;

/**
 * For testing functions what ObjectUtil supports, there are some test scenarios
 * in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class ObjectUtilTest extends TestCase {

	public void testLoadClassString() {

		Class<?> clazz = ObjectUtil.loadClass("org.anyframe.util.ObjectUtil",
				new URLClassLoader(new URL[] {}, null));
		clazz = ObjectUtil.loadClass("org.anyframe.util.ObjectUtil");
		assertEquals(ObjectUtil.class.getName(), clazz.getName());
		try {
			ObjectUtil.loadClass("org.anyframe.util.NonObjectUtil");
			fail();
		} catch (Exception e) {
		}
	}

	public void testLoadClassStringClassLoader() {
		Class<?> clazz = ObjectUtil.loadClass("org.anyframe.util.ObjectUtil",
				this.getClass().getClassLoader());
		assertEquals(ObjectUtil.class, clazz);
	}

	public void testGetObject() {
		Object loader = ObjectUtil.getObject("org.anyframe.util.sample.User");
		assertEquals(User.class.getName(), loader.getClass().getName());
		try {
			ObjectUtil.getObject("org.anyframe.common.Repository");
			fail();
		} catch (Exception e) {

		}

		try {
			ObjectUtil.getObject(BadConstructorHello.class.getName());
			fail();
		} catch (Exception e) {

		}
		try {
			ObjectUtil.getObject(PrivateConstructorHello.class.getName());
			fail();
		} catch (Exception e) {

		}
	}

	public void testIsEmptyObject() {
		assertTrue(ObjectUtil.isEmptyObject(new Hello()));

		try {
			ObjectUtil.isEmptyObject(new BadHello());
			fail();
		} catch (Exception e) {

		}
	}

	public void testCopyProperties() {
		Hello source = new Hello();
		source.setAttribute("attribute");
		Hello target = new Hello();
		ObjectUtil.copyProperties(target, source);
		assertEquals(source.getAttribute(), target.getAttribute());

		try {
			BadHello badTarget = new BadHello();
			ObjectUtil.copyProperties(badTarget, source);
			fail();
		} catch (Exception e) {

		}

	}

	public void testGetProperty() {
		Hello source = new Hello();
		BadHello bad = new BadHello();
		source.setAttribute("attribute");
		assertEquals("attribute", ObjectUtil.getProperty(source, "attribute"));

		try {
			ObjectUtil.getProperty(source, "attributeNon");
			fail();
		} catch (Exception e) {

		}
		try {
			ObjectUtil.getProperty(bad, "privateMethod");
			fail();
		} catch (RuntimeException e) {

		}
		try {
			ObjectUtil.getProperty(bad, "exceptionMethod");
			fail();
		} catch (RuntimeException e) {

		}
	}

	public void testSetPropertyObjectStringObjectString() {
		BadHello bad = new BadHello();
		try {
			ObjectUtil.setProperty(bad, "attributeNon", "");
			fail();
		} catch (Exception e) {

		}
		try {
			ObjectUtil.setProperty(bad, "privateMethod", "");
			fail();
		} catch (RuntimeException e) {

		}
		try {
			ObjectUtil.setProperty(bad, "exceptionMethod", "");
			fail();
		} catch (RuntimeException e) {

		}

		try {
			ObjectUtil.setProperty(bad, "attributeNon", "", "String");
			fail();
		} catch (Exception e) {

		}
		try {
			ObjectUtil.setProperty(bad, "privateMethod", "", "String");
			fail();
		} catch (RuntimeException e) {

		}
		try {
			ObjectUtil.setProperty(bad, "exceptionMethod", "", "String");
			fail();
		} catch (RuntimeException e) {

		}

		Hello source = new Hello();
		ObjectUtil.setProperty(source, "attribute", "attribute", "String");
		assertEquals("attribute", source.getAttribute());

		ObjectUtil.setProperty(source, "intValue", "1", "Integer");
		assertEquals(1, source.getIntValue());

		ObjectUtil.setProperty(source, "doubleValue", "1.0D", "Double");
		assertEquals(1.0D, source.getDoubleValue(), 0.0D);

		ObjectUtil.setProperty(source, "longValue", "1", "Long");
		assertEquals(1L, source.getLongValue());

		ObjectUtil.setProperty(source, "date", "2007-05-02", "Date");
		assertEquals(DateUtil.stringToDate("2007-05-02"), source.getDate());

		ObjectUtil.setProperty(source, "date", DateUtil
				.stringToDate("2007-05-02"), "Date");
		assertEquals(DateUtil.stringToDate("2007-05-02"), source.getDate());

		ObjectUtil.setProperty(source, "date", DateUtil.stringToTimestamp(
				"2007-05-02 12:12:12", "yyyy-MM-dd HH:mm:ss"), "Date");
		// 현재 ObjectUtil 의 Date 필드 setProperty 시 시각을 제외한 날짜 영역만 설정하고 있음. 확인필요!
		// assertEquals(DateUtil.string2Date("2007-05-02 12:12:12"),
		// source.getDate());
		assertEquals(DateUtil.stringToDate("2007-05-02"), source.getDate());
	}

	public void testSetPropertyObjectStringObject() {
		Hello source = new Hello();
		ObjectUtil.setProperty(source, "date", DateUtil
				.stringToDate("2007-05-02"));
		assertEquals(DateUtil.stringToDate("2007-05-02"), source.getDate());
	}

	public void testGetField() throws Exception {
		Hello source = new Hello();
		ObjectUtil.setProperty(source, "date", DateUtil
				.stringToDate("2007-05-02"));
		Field field = ObjectUtil.getField(source, "date");
		field.setAccessible(true);
		assertEquals(DateUtil.stringToDate("2007-05-02"), field.get(source));

		try {
			ObjectUtil.getField(source, "date222");
			fail();
		} catch (RuntimeException e) {

		}
	}

	public void testGetMethod() throws Exception {
		Hello source = new Hello();
		ObjectUtil.getMethod(source, "setDate", new Class[] { Date.class })
				.invoke(source,
						new Object[] { DateUtil.stringToDate("2007-05-02") });
		Field field = ObjectUtil.getField(source, "date");
		field.setAccessible(true);
		assertEquals(DateUtil.stringToDate("2007-05-02"), field.get(source));
	}

	public void testIsNull() {
		assertTrue(ObjectUtil.isNull(null));
	}

	public void testGetModel() {
		Hello source = new Hello();
		source.setClassName(HashMap.class.getName());
		source.setAttribute("attribute");
		Object target = ObjectUtil.copyModelObject(source);
		assertEquals(HashMap.class, target.getClass());
	}

	public void testAddProperty() {
		Hello source = new Hello();
		ObjectUtil.invokdeAddPropertyValueMethod(source, "intValue",
				new Integer(10));
		assertEquals(10, source.getIntValue());

		BadHello badsource = new BadHello();
		try {
			ObjectUtil.invokdeAddPropertyValueMethod(badsource,
					"privateMethod", "");
			fail();
		} catch (RuntimeException e) {

		}
		try {
			ObjectUtil.invokdeAddPropertyValueMethod(badsource,
					"exceptionMethod", "");
			fail();
		} catch (RuntimeException e) {

		}
	}

	public class Hello {
		private String attribute = null;

		private long longValue = 0L;

		private int intValue = 0;

		private double doubleValue = 0.0;

		private Date date = null;

		private Timestamp timestamp = null;

		private String className = null;

		public void addIntValue(Integer intValue) {
			this.intValue = +intValue.intValue();
		}

		public String getAttribute() {
			return attribute;
		}

		public void setAttribute(String attribute) {
			this.attribute = attribute;
		}

		public String getClassName() {
			return className;
		}

		public void setClassName(String className) {
			this.className = className;
		}

		public double getDoubleValue() {
			return doubleValue;
		}

		public void setDoubleValue(double doubleValue) {
			this.doubleValue = doubleValue;
		}

		public int getIntValue() {
			return intValue;
		}

		public void setIntValue(int intValue) {
			this.intValue = intValue;
		}

		public long getLongValue() {
			return longValue;
		}

		public void setLongValue(long longValue) {
			this.longValue = longValue;
		}

		public Date getDate() {
			return date;
		}

		public void setDate(Date date) {
			this.date = date;
		}

		public Timestamp getTimestamp() {
			return timestamp;
		}

		public void setTimestamp(Timestamp timestamp) {
			this.timestamp = timestamp;
		}

	}

	public class BadHello {

		public String getAttribute() {
			throw new RuntimeException();
		}

		public String getExceptionMethod() {
			throw new RuntimeException();
		}

		public void setExceptionMethod(String a) {
			throw new RuntimeException();
		}

		public void addExceptionMethod(String a) {
			throw new RuntimeException();
		}
	}

	public class BadConstructorHello {
		BadConstructorHello(String a) {

		}
	}

	public static class PrivateConstructorHello {
		private PrivateConstructorHello() {

		}
	}

}
