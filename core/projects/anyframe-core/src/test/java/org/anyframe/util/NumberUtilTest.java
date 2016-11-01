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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.math.BigDecimal;
import java.util.Locale;

import org.junit.Test;

/**
 * For testing functions what NumberUtilTest supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class NumberUtilTest {

	@Test
	public void testGetRandomNumber() {
		assertNotNull(NumberUtil.getRandomNumber(Integer.class));
		System.out.println(NumberUtil.getRandomNumber(Integer.class));
		assertNotNull(NumberUtil.getRandomNumber(Long.class));
		System.out.println(NumberUtil.getRandomNumber(Long.class));
		assertNotNull(NumberUtil.getRandomNumber(Float.class));
		System.out.println(NumberUtil.getRandomNumber(Float.class));
		assertNotNull(NumberUtil.getRandomNumber(Double.class));
		System.out.println(NumberUtil.getRandomNumber(Double.class));

		assertEquals(null, NumberUtil.getRandomNumber(Byte.class));
		assertEquals(null, NumberUtil.getRandomNumber(BigDecimal.class));
	}

	@Test
	public void testGetRandomNumberNegative() {
		assertNotNull(NumberUtil.getRandomNumber(Integer.class, false));
		System.out.println(NumberUtil.getRandomNumber(Integer.class, false));
		assertNotNull(NumberUtil.getRandomNumber(Long.class, false));
		System.out.println(NumberUtil.getRandomNumber(Long.class, false));
		assertNotNull(NumberUtil.getRandomNumber(Float.class, false));
		System.out.println(NumberUtil.getRandomNumber(Float.class, false));
		assertNotNull(NumberUtil.getRandomNumber(Double.class, false));
		System.out.println(NumberUtil.getRandomNumber(Double.class, false));
	}

	@Test
	public void testGetRandomNumberFixedLength() {
		assertNotNull(NumberUtil.getRandomNumber(Integer.class, 10));
		System.out.println(NumberUtil.getRandomNumber(Integer.class, 10));
		assertNotNull(NumberUtil.getRandomNumber(Long.class, 19));
		System.out.println(NumberUtil.getRandomNumber(Long.class, 19));
		assertNotNull(NumberUtil.getRandomNumber(Float.class, 39));
		System.out.println(NumberUtil.getRandomNumber(Float.class, 39));
		assertNotNull(NumberUtil.getRandomNumber(Double.class, 309));
		System.out.println(NumberUtil.getRandomNumber(Double.class, 309));

		assertEquals(null, NumberUtil.getRandomNumber(Byte.class, -1));
	}

	@Test
	public void testGetRandomNumberMinMax() {
		assertNotNull(NumberUtil.getRandomNumber(Integer.class, 10, 100));
		System.out.println(NumberUtil.getRandomNumber(Integer.class, 10, 100));
		assertNotNull(NumberUtil.getRandomNumber(Integer.class, 10, 2147483643));
		System.out.println(NumberUtil.getRandomNumber(Integer.class, 10,
				2147483643));
		assertNotNull(NumberUtil.getRandomNumber(Long.class, 1000l,
				214748364300l));
		System.out.println(NumberUtil.getRandomNumber(Long.class, 1000l,
				214748364300l));
		assertNotNull(NumberUtil.getRandomNumber(Float.class, 1000.12f,
				214748364300.345234f));
		System.out.println(NumberUtil.getRandomNumber(Float.class, 1000.12f,
				214748364300.345234f));
		assertNotNull(NumberUtil.getRandomNumber(Double.class,
				1001231232340.12890, 21474836430023423.34523423423412));
		System.out.println(NumberUtil.getRandomNumber(Double.class,
				1001231232340.12890, 21474836430023423.34523423423412));

	}

	@Test
	public void testHasNumber() {
		assertTrue(NumberUtil.hasNumber("str1ing"));
		assertFalse(NumberUtil.hasNumber(""));
	}

	@Test
	public void testIntToString() {
		assertEquals("150", NumberUtil.intToString(150));
	}

	@Test
	public void testStringToInt() {
		assertEquals(150, NumberUtil.stringToInt("150"));
		assertEquals(150, NumberUtil.stringToInt("150 "));
		assertEquals(150, NumberUtil.stringToInt(" 150"));
		assertEquals(150, NumberUtil.stringToInt(" 150 "));
		assertEquals(0, NumberUtil.stringToInt(""));
	}

	@Test
	public void testFormatNumberByLocale() {
		assertEquals("￦3,527,900", NumberUtil.formatNumberByLocale(3527900,
				Locale.KOREA));
		assertEquals("$3,527,900.00", NumberUtil.formatNumberByLocale(3527900,
				Locale.US));
	}

	@Test
	public void testFormatNumber() {
		assertEquals("1,023,412", NumberUtil.formatNumber(1023412,
				"###,###,###"));
		assertEquals("1,023,412,123", NumberUtil.formatNumber(1023412123,
				"###,###"));
		assertEquals("10,23,41,21,23", NumberUtil.formatNumber(1023412123,
				"##,##"));
		assertEquals("1023412123", NumberUtil.formatNumber(1023412123, "##.##"));
		assertEquals("1023412123/", NumberUtil
				.formatNumber(1023412123, "##/##"));
	}

	@Test
	public void testFormatNumberByPoint() {
		assertEquals("10,231,023,123.121", NumberUtil.formatNumberByPoint(
				10231023123.1213, 0));
		assertEquals("10,231,023,123.1", NumberUtil.formatNumberByPoint(
				10231023123.1213, 1));
		assertEquals("10,231,023,123.12", NumberUtil.formatNumberByPoint(
				10231023123.1213, 2));
		assertEquals("10,231,023,123.121", NumberUtil.formatNumberByPoint(
				10231023123.1213, 3));
		assertEquals("10,231,023,123.1213", NumberUtil.formatNumberByPoint(
				10231023123.1213, 4));
		assertEquals("10,231,023,123.12130", NumberUtil.formatNumberByPoint(
				10231023123.1213, 5));
		assertEquals("10,231,023,123.121", NumberUtil.formatNumberByPoint(
				10231023123.1213, 6));
		assertEquals("10,231,023,123.1", NumberUtil.formatNumberByPoint(
				10231023123.1, 6));
	}

	@Test
	public void testNullToZero() {
		assertEquals("", NumberUtil.bigDecimalToString(null));
		assertEquals("123", NumberUtil.bigDecimalToString(new BigDecimal(123)));
	}

	@Test
	public void testIsNumber() {
		assertTrue(NumberUtil.isNumber("12312312"));
		assertTrue(NumberUtil.isNumber("12312312.2f"));
		assertTrue(NumberUtil.isNumber("-12312312.2f"));
		assertTrue(NumberUtil.isNumber("4.9E-324"));
		assertTrue(NumberUtil.isNumber("1.7976931348623157E308"));
		assertTrue(NumberUtil.isNumber("12312312.2f"));
		assertFalse(NumberUtil.isNumber("12sd312312"));
		assertFalse(NumberUtil.isNumber(""));
	}

	@Test
	public void testReplaceNum() {
		assertEquals(156756.2, NumberUtil.replaceNumber(123456.2, 234, 567), 1);
		assertEquals(4556745.8567, NumberUtil
				.replaceNumber(452345.823, 23, 567), 1);
	}

	@Test
	public void testCheckNumberType() {
		assertTrue(NumberUtil.checkNumberType("1234", "positive"));
		assertTrue(NumberUtil.checkNumberType("+1234", "positive"));
		assertTrue(NumberUtil.checkNumberType("0.1234", "positive"));
		assertFalse(NumberUtil.checkNumberType("01234", "positive"));

		assertTrue(NumberUtil.checkNumberType("-1234", "negative"));
		assertTrue(NumberUtil.checkNumberType("-1234.12", "negative"));
		assertTrue(NumberUtil.checkNumberType("-0.1234", "negative"));
		assertFalse(NumberUtil.checkNumberType("-01234", "negative"));

		assertTrue(NumberUtil.checkNumberType("1234", "whole"));
		assertTrue(NumberUtil.checkNumberType("-1234", "whole"));
		assertTrue(NumberUtil.checkNumberType("+1234", "whole"));
		assertFalse(NumberUtil.checkNumberType("0.1234", "whole"));

		assertTrue(NumberUtil.checkNumberType("1234.0", "real"));
		assertTrue(NumberUtil.checkNumberType("-1234.123", "real"));
		assertTrue(NumberUtil.checkNumberType("+1234.345", "real"));
		assertTrue(NumberUtil.checkNumberType("0.345", "real"));
		assertTrue(NumberUtil.checkNumberType(".34", "real"));
		assertTrue(NumberUtil.checkNumberType("1.34", "real"));
		assertTrue(NumberUtil.checkNumberType("-1.34", "real"));
		assertFalse(NumberUtil.checkNumberType("023.1234", "whole"));
	}
}
