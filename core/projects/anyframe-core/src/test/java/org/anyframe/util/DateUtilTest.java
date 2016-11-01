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
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.junit.Test;

/**
 * For testing functions what DateUtil supports, there are some test scenarios
 * in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 * @author HyunJung Jeong
 */
public class DateUtilTest {

	@Test
	public void testGetCurrentDateString() {
		assertNotNull(DateUtil.getCurrentDate());
		System.out.println(DateUtil.getCurrentDate());

		assertNotNull(DateUtil.getCurrentDate("yyyy.MM.dd"));
		System.out.println(DateUtil.getCurrentDate("yyyy.MM.dd"));
	}

	@Test
	public void testGetCurrentTimeString() {
		assertNotNull(DateUtil.getCurrentTime());
		System.out.println(DateUtil.getCurrentTime());

		assertNotNull(DateUtil.getCurrentDateTime("hh-mm"));
		System.out.println(DateUtil.getCurrentDateTime("hh-mm"));
	}

	@Test
	public void testGetThisMonth() {
		assertNotNull(DateUtil.getThisMonth());
		System.out.println(DateUtil.getThisMonth());
	}

	@Test
	public void testGetThisYear() {
		assertNotNull(DateUtil.getThisYear());
		System.out.println(DateUtil.getThisYear());
	}

	@Test
	public void testGetCurrentHour() {
		assertNotNull(DateUtil.getCurrentDateTime(DateUtil.TIME_PATTERN));
		System.out.println(DateUtil.getCurrentDateTime(DateUtil.TIME_PATTERN));
	}

	@Test
	public void testGetDayOfWeek() {
		DateTimeFormatter fmt = DateTimeFormat.forPattern("yyyy-MM-dd");
		DateTime dt1 = fmt.parseDateTime("2010-11-25");
		DateTime dt2 = fmt.parseDateTime("2010-11-26");
		DateTime.Property dayOfWeek1 = dt1.dayOfWeek();
		DateTime.Property dayOfWeek2 = dt2.dayOfWeek();

		assertEquals(dayOfWeek1.getAsShortText(), DateUtil
				.getDayOfWeek("2010-11-25"));
		assertEquals(dayOfWeek2.getAsShortText(), DateUtil
				.getDayOfWeek("2010-11-26"));
		assertEquals(dayOfWeek1.getAsShortText(Locale.FRENCH), DateUtil
				.getDayOfWeek("2010-11-25", true, Locale.FRENCH));
		assertEquals(dayOfWeek1.getAsText(Locale.US), DateUtil.getDayOfWeek(
				"2010-11-25", false, Locale.US));
		assertEquals(dayOfWeek1.getAsShortText(), DateUtil.getDayOfWeek(
				"2010-11-25", true, null));
	}

	@Test
	public void testGetDays() {
		assertEquals(14, DateUtil.getDays(new GregorianCalendar(2010, 11, 14),
				new GregorianCalendar(2010, 11, 28)));
		assertEquals(44, DateUtil.getDays(new GregorianCalendar(2010, 10, 14),
				new GregorianCalendar(2010, 11, 28)));
		assertEquals(29, DateUtil.getDays("2010-11-01", "2010-11-30",
				"yyyy-MM-dd"));
		assertEquals(36, DateUtil.getDays("2010-11-24", "2010-12-30",
				"yyyy-MM-dd"));
	}

	@Test
	public void testEquals() {
		Date date1 = new Date(1292252400000l);
		Date date2 = new Date(1292252400000l);
		assertTrue(DateUtil.equals(date1, date2));
		assertTrue(DateUtil.equals(date1, "2010-12-14"));
		assertTrue(DateUtil.equals(date1, "2010/12/14", "yyyy/MM/dd"));
		assertFalse(DateUtil.equals(date1, "2010-12-15"));
	}

	@Test
	public void testGreaterThan() {
		Date date1 = new Date(1292311593000l);
		Date date2 = new Date(1292252400000l);
		assertTrue(DateUtil.greaterThan(date1, date2));
		assertTrue(DateUtil.greaterThan(date1, "2010-12-02"));
		assertTrue(DateUtil.greaterThan(date1, "2010/12/02", "yyyy/MM/dd"));
		assertTrue(DateUtil.greaterThan(date1, "2010.12.11", "yyyy.MM.dd"));
		assertFalse(DateUtil.greaterThan(date1, "2010/12/31", "yyyy/MM/dd"));
	}

	@Test
	public void testGetEndDate() {
		assertEquals("2010-12-28", DateUtil.getEndDate("2010-12-18", 10));
		assertEquals("2011-01-27", DateUtil.getEndDate("2010-12-18", 40));
		assertEquals("2010-12-18", DateUtil.getEndDate("2010-12-18", 50));

		assertEquals("2011-01-09", DateUtil.getEndDate("2011-01-01", 8));
	}

	@Test
	public void testAddDays() {
		assertEquals("2010-12-18", DateUtil.addDays("2010-12-18", 0));
		assertEquals("2010-12-20", DateUtil.addDays("2010-12-18", 2));
		assertEquals("2011-01-17", DateUtil.addDays("2010-12-18", 30));
		assertEquals("2010-11-18", DateUtil.addDays("2010-12-18", -30));
	}

	@Test
	public void testAddMonths() {
		assertEquals("2010-12-18", DateUtil.addMonths("2010-12-18", 0));
		assertEquals("2011-02-18", DateUtil.addMonths("2010-12-18", 2));
		assertEquals("2013-06-18", DateUtil.addMonths("2010-12-18", 30));
		assertEquals("2010-10-18", DateUtil.addMonths("2010-12-18", -2));
	}

	@Test
	public void testAddYears() {
		assertEquals("2010-12-18", DateUtil.addYears("2010-12-18", 0));
		assertEquals("2012-12-18", DateUtil.addYears("2010-12-18", 2));
		assertEquals("2040-12-18", DateUtil.addYears("2010-12-18", 30));
		assertEquals("2008-12-18", DateUtil.addYears("2010-12-18", -2));
	}

	@Test
	public void testAddYearMonthDay() {
		assertEquals("2012-04-18", DateUtil.addYearMonthDay("2010-04-18", 2, 0,
				0));
		assertEquals("2010-08-18", DateUtil.addYearMonthDay("2010-04-18", 0, 4,
				0));
		assertEquals("2010-04-21", DateUtil.addYearMonthDay("2010-04-18", 0, 0,
				3));
		assertEquals("2012-08-21", DateUtil.addYearMonthDay("2010-04-18", 2, 4,
				3));
		assertEquals("2014-01-13", DateUtil.addYearMonthDay("2010-04-18", 4,
				-3, -5));
	}

	@Test
	public void testGetFirstDateOfMonthString() {
		assertEquals("2010-12-01", DateUtil.getFirstDateOfMonth("2010-12-18"));
		assertEquals("2009-10-01", DateUtil.getFirstDateOfMonth("2009-10-23"));
	}

	@Test
	public void testGetLastDateOfMonthString() {
		assertEquals("2010-11-30", DateUtil.getLastDateOfMonth("2010-11-20"));
		assertEquals("2010-12-31", DateUtil.getLastDateOfMonth("2010-12-20"));
	}

	@Test
	public void testGetFirstDateOfPrevMonthString() {
		assertEquals("2010-10-01", DateUtil
				.getFirstDateOfPrevMonth("2010-11-20"));
		assertEquals("2010-11-01", DateUtil
				.getFirstDateOfPrevMonth("2010-12-20"));
	}

	@Test
	public void testGetLastDateOfPrevMonthString() {
		assertEquals("2010-10-31", DateUtil
				.getLastDateOfPrevMonth("2010-11-20"));
		assertEquals("2010-11-30", DateUtil
				.getLastDateOfPrevMonth("2010-12-20"));
	}

	@Test
	public void testIsDate() {
		assertTrue(DateUtil.isDate("2010-12-01"));
		assertTrue(DateUtil.isDate("2010-12-01", "yyyy-MM-dd"));
		assertFalse(DateUtil.isDate("2010-12-2", "yyyy-MM-dd"));
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsDateException() {
		assertTrue(!DateUtil.isDate("2010-12-32"));
		assertTrue(!DateUtil.isDate("2010-12-32", "yyyy-MM-dd"));
	}

	@Test
	public void testIsTime() {
		assertTrue(DateUtil.isTime("11:56"));
		assertTrue(DateUtil.isTime("13:56"));
		assertTrue(DateUtil.isTime("13:56:24", "HH:mm:ss"));
		assertFalse(DateUtil.isTime("11:5"));

	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsTimeException() {
		assertTrue(!DateUtil.isTime("13:65"));
		assertTrue(!DateUtil.isTime("13/65/24", "HH/mm/ss"));
	}

	@Test
	public void testStringToDate() {
		Date date1 = new Date(1292252400000l);
		Date date2 = new Date(1292311593000l);
		assertEquals(date1, DateUtil.stringToDate("2010-12-14"));
		assertEquals(date1, DateUtil.stringToDate("2010/12/14", "yyyy/MM/dd"));
		assertEquals(date2, DateUtil.stringToDate("2010-12-14 16:26:33",
				"yyyy-MM-dd HH:mm:ss"));
	}

	@Test
	public void testDateToString() {
		Date date = new Date(1292311593557l);
		assertEquals("2010-12-14", DateUtil.dateToString(date));
		assertEquals("2010-12-14", DateUtil.dateToString(date, "yyyy-MM-dd"));
		assertEquals("2010/12/14", DateUtil.dateToString(date, "yyyy/MM/dd"));
	}

	@Test
	public void testConvertDateFormat() {
		assertEquals("2010-12-14", DateUtil.convertDateFormat("20101214",
				"yyyyMMdd", "yyyy-MM-dd"));
		assertEquals("2010/12/14", DateUtil.convertDateFormat("2010.12.14",
				"yyyy.MM.dd", "yyyy/MM/dd"));
	}

	@Test
	public void testGetRandomDate() {
		assertNotNull(DateUtil.getRandomDate());
		System.out.println(DateUtil.getRandomDate());
	}

	@Test
	public void testGetTimeStampString() {
		assertNotNull(DateUtil.getCurrentTimestamp());
	}

	@Test
	public void testStringToSQLDate() {
		java.sql.Date date1 = new java.sql.Date(1292252400000l);
		assertEquals(date1, DateUtil.stringToSQLDate("2010-12-14"));
		assertEquals(date1, DateUtil
				.stringToSQLDate("2010/12/14", "yyyy/MM/dd"));
	}

	@Test
	public void testStringToTimestamp() {
		Timestamp timestamp1 = new Timestamp(1292252400000l);
		Timestamp timestamp2 = new Timestamp(1292311593000l);
		assertEquals(timestamp1, DateUtil.stringToTimestamp("2010-12-14"));
		assertEquals(timestamp2, DateUtil.stringToTimestamp(
				"2010-12-14 16:26:33", "yyyy-MM-dd HH:mm:ss"));
	}

	@Test
	public void testTimestampToString() {
		Timestamp timestamp = new Timestamp(1292311593000l);
		assertEquals("2010-12-14", DateUtil.timestampToString(timestamp));
		assertEquals("2010/12/14", DateUtil.timestampToString(timestamp,
				"yyyy/MM/dd"));
		assertEquals("2010/12/14 16/26", DateUtil.timestampToString(timestamp,
				"yyyy/MM/dd HH/mm"));
		assertEquals("", DateUtil.timestampToString(null, "yyyy/MM/dd HH/mm"));

	}

	@Test
	public void testStringToCalendar() {
		assertEquals(new GregorianCalendar(2010, 11, 14, 12, 34, 12), DateUtil
				.stringToCalendar("20101214123412"));
		assertEquals(null, DateUtil.stringToCalendar("201012141234"));
	}

	@Test
	public void testCalendarToString() {
		assertEquals("20101214123412000", DateUtil
				.calendarToString(new GregorianCalendar(2010, 11, 14, 12, 34,
						12)));
	}

	@Test
	public void testGetMinutes() {
		assertEquals(58, DateUtil.getMinutes(new GregorianCalendar(2010, 11,
				14, 12, 34, 12),
				new GregorianCalendar(2010, 11, 14, 13, 32, 12)));
		assertEquals(357, DateUtil.getMinutes(new GregorianCalendar(2010, 11,
				14, 12, 34, 12),
				new GregorianCalendar(2010, 11, 14, 18, 31, 12)));
	}

	@Test
	public void testGetYesterday() {
		assertNotNull(DateUtil.getYesterday());
		System.out.println(DateUtil.getYesterday());
	}

	@Test
	public void testGetDates() {
		assertNotNull(DateUtil.getDates("2010-12-14", "2010-12-20"));
		System.out.println(DateUtil.getDates("2010-12-14", "2010-12-20"));
	}

	@Test
	public void testStringToCalender() {
		String dateStr = "20070501000000";
		// 1. convert String to java.util.Calendar
		Calendar calendar = DateUtil.stringToCalendar(dateStr);
		assertEquals(1, calendar.getFirstDayOfWeek());
		// 2. dateStr length is less than 14
		dateStr = "20070501";
		assertNull(DateUtil.stringToCalendar(dateStr));
	}

}
