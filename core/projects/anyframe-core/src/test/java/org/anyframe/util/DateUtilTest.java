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
import static org.junit.Assert.fail;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.TimeZone;

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
	public void testGetCurrentDate() {
		assertNotNull(DateUtil.getCurrentDay());
		System.out.println(DateUtil.getCurrentDay());

		assertNotNull(DateUtil.getCurrentDay("yyyy.MM.dd"));
		System.out.println(DateUtil.getCurrentDay("yyyy.MM.dd"));
	}

	@Test
	public void testGetCurrentTime() {
		assertNotNull(DateUtil.getCurrentTime());
		System.out.println(DateUtil.getCurrentTime());

		assertNotNull(DateUtil.getCurrentTime("hh-mm"));
		System.out.println(DateUtil.getCurrentTime("hh-mm"));
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
		assertNotNull(DateUtil.getCurrentHour());
		System.out.println(DateUtil.getCurrentHour());
	}

	@Test
	public void testGetDayOfWeek() {
		DateTimeFormatter fmt = DateTimeFormat.forPattern("yyyy-MM-dd");
		DateTime dt1 = fmt.parseDateTime("2010-11-25");
		DateTime dt2 = fmt.parseDateTime("2010-11-26");
		DateTime.Property dayOfWeek1 = dt1.dayOfWeek();
		DateTime.Property dayOfWeek2 = dt2.dayOfWeek();

		assertEquals(dayOfWeek1.getAsShortText(),
				DateUtil.getDayOfWeek("2010-11-25"));
		assertEquals(dayOfWeek2.getAsShortText(),
				DateUtil.getDayOfWeek("2010-11-26"));
		assertEquals(dayOfWeek1.getAsShortText(Locale.FRENCH),
				DateUtil.getDayOfWeek("2010-11-25", true, Locale.FRENCH));
		assertEquals(dayOfWeek1.getAsText(Locale.US),
				DateUtil.getDayOfWeek("2010-11-25", false, Locale.US));
		assertEquals(dayOfWeek1.getAsShortText(),
				DateUtil.getDayOfWeek("2010-11-25", true, null));
	}

	@Test
	public void testGetDays() {
		assertEquals(14, DateUtil.getDays(new GregorianCalendar(2010, 11, 14),
				new GregorianCalendar(2010, 11, 28)));
		assertEquals(44, DateUtil.getDays(new GregorianCalendar(2010, 10, 14),
				new GregorianCalendar(2010, 11, 28)));
		assertEquals(29,
				DateUtil.getDays("2010-11-01", "2010-11-30", "yyyy-MM-dd"));
		assertEquals(36,
				DateUtil.getDays("2010-11-24", "2010-12-30", "yyyy-MM-dd"));
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
		assertEquals("2012-04-18",
				DateUtil.addYearMonthDay("2010-04-18", 2, 0, 0));
		assertEquals("2010-08-18",
				DateUtil.addYearMonthDay("2010-04-18", 0, 4, 0));
		assertEquals("2010-04-21",
				DateUtil.addYearMonthDay("2010-04-18", 0, 0, 3));
		assertEquals("2012-08-21",
				DateUtil.addYearMonthDay("2010-04-18", 2, 4, 3));
		assertEquals("2014-01-13",
				DateUtil.addYearMonthDay("2010-04-18", 4, -3, -5));
	}

	@Test
	public void testGetFirstDateOfMonth() {
		assertEquals("2010-12-01", DateUtil.getFirstDateOfMonth("2010-12-18"));
		assertEquals("2009-10-01", DateUtil.getFirstDateOfMonth("2009-10-23"));
	}

	@Test
	public void testGetLastDateOfMonth() {
		assertEquals("2010-11-30", DateUtil.getLastDateOfMonth("2010-11-20"));
		assertEquals("2010-12-31", DateUtil.getLastDateOfMonth("2010-12-20"));
	}

	@Test
	public void testGetFirstDateOfPrevMonth() {
		assertEquals("2010-10-01",
				DateUtil.getFirstDateOfPrevMonth("2010-11-20"));
		assertEquals("2010-11-01",
				DateUtil.getFirstDateOfPrevMonth("2010-12-20"));
	}

	@Test
	public void testGetLastDateOfPrevMonth() {
		assertEquals("2010-10-31",
				DateUtil.getLastDateOfPrevMonth("2010-11-20"));
		assertEquals("2010-11-30",
				DateUtil.getLastDateOfPrevMonth("2010-12-20"));
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
	public void testString2Date() {
		Date date1 = new Date(1292252400000l);
		Date date2 = new Date(1292311593000l);
		assertEquals(date1, DateUtil.string2Date("2010-12-14"));
		assertEquals(date1, DateUtil.string2Date("2010/12/14", "yyyy/MM/dd"));
		assertEquals(date2, DateUtil.string2Date("2010-12-14 16:26:33",
				"yyyy-MM-dd HH:mm:ss"));
	}

	@Test
	public void testDate2String() {
		Date date = new Date(1292311593557l);
		assertEquals("2010-12-14", DateUtil.date2String(date));
		assertEquals("2010-12-14", DateUtil.date2String(date, "yyyy-MM-dd"));
		assertEquals("2010/12/14", DateUtil.date2String(date, "yyyy/MM/dd"));
	}

	@Test
	public void testString2String() {
		assertEquals("2010-12-14",
				DateUtil.string2String("20101214", "yyyyMMdd", "yyyy-MM-dd"));
		assertEquals("2010/12/14", DateUtil.string2String("2010.12.14",
				"yyyy.MM.dd", "yyyy/MM/dd"));
	}

	@Test
	public void testGetRandomDate() {
		assertNotNull(DateUtil.getRandomDate());
		System.out.println(DateUtil.getRandomDate());
	}

	@Test
	public void testGetTimeStamp() {
		assertNotNull(DateUtil.getTimeStamp());
	}

	@Test
	public void testGetDefaultDatePattern() {
		assertNotNull(DateUtil.getDefaultDatePattern());
	}

	@Test
	public void testString2SQLDate() {
		java.sql.Date date1 = new java.sql.Date(1292252400000l);
		assertEquals(date1, DateUtil.string2SQLDate("2010-12-14"));
		assertEquals(date1, DateUtil.string2SQLDate("2010/12/14", "yyyy/MM/dd"));
	}

	@Test
	public void testString2Timestamp() {
		Timestamp timestamp1 = new Timestamp(1292252400000l);
		Timestamp timestamp2 = new Timestamp(1292311593000l);
		assertEquals(timestamp1, DateUtil.string2Timestamp("2010-12-14"));
		assertEquals(timestamp2, DateUtil.string2Timestamp(
				"2010-12-14 16:26:33", "yyyy-MM-dd HH:mm:ss"));
	}

	@Test
	public void testTimestamp2String() {
		Timestamp timestamp = new Timestamp(1292311593000l);
		assertEquals("2010-12-14", DateUtil.timestamp2String(timestamp));
		assertEquals("2010/12/14",
				DateUtil.timestamp2String(timestamp, "yyyy/MM/dd"));
		assertEquals("2010/12/14 16/26",
				DateUtil.timestamp2String(timestamp, "yyyy/MM/dd HH/mm"));
		assertEquals("", DateUtil.timestamp2String(null, "yyyy/MM/dd HH/mm"));

	}

	@Test
	public void testString2Calendar() {
		assertEquals(new GregorianCalendar(2010, 11, 14, 12, 34, 12),
				DateUtil.string2Calender("20101214123412"));
		assertEquals(null, DateUtil.string2Calender("201012141234"));
	}

	@Test
	public void testCalendar2String() {
		assertEquals("20101214123412000",
				DateUtil.calendar2String(new GregorianCalendar(2010, 11, 14,
						12, 34, 12)));
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

	/**
	 * 이하 Backward Compatibility 테스트 케이스
	 */

	/**
	 * [Flow #-1] Positive Case : get end date
	 */
	@Test
	public void testGetEndDateBC() {
		// 1. get next 10 days from 2007-05-01
		String endDate = DateUtil.getEndDate("2007-05-01", 10);
		assertEquals("2007-05-11", endDate);
		// 1. get next 5 days from 2007-11-01
		endDate = DateUtil.getEndDate("2007-11-01", 5);
		assertEquals("2007-11-06", endDate);
	}

	/**
	 * [Flow #-2] Positive Case : get default date pattern
	 */
	@Test
	public void testGetDefaultDatePatternBC() {
		// 1. get default date pattern
		assertEquals("yyyy-MM-dd", DateUtil.getDefaultDatePattern());
	}

	/**
	 * [Flow #-3] Positive Case : Compares two Dates for ordering
	 */
	@Test
	public void testGreaterThanBC() {
		String dateStr1 = "2007-05-02";
		String dateStr2 = "2007-05-01";

		Date date1 = DateUtil.string2Date(dateStr1);
		Date date2 = DateUtil.string2Date(dateStr2);
		Date date3 = DateUtil.string2Date(dateStr1);

		// 1. compare "2007-05-02" and "2007-05-01"
		assertTrue(DateUtil.greaterThan(date1, date2));
		// 2. compare "2007-05-02" and "2007-05-02"
		assertTrue(!DateUtil.greaterThan(date1, date3));
		// 3. compare "2007-05-02" and "2007-05-01"
		assertTrue(DateUtil.greaterThan(date1, dateStr2));

		String dateStr2format = "yyyy-MM-dd";
		// 4. compare "2007-05-02" and "2007-05-01" with date format
		// (yyyy-MM-dd)
		assertTrue(DateUtil.greaterThan(date1, dateStr2, dateStr2format));

		dateStr1 = "2007/05/02";
		dateStr2 = "2007/05/01";
		dateStr2format = "yyyy/MM/dd";

		date1 = DateUtil.string2Date(dateStr1, dateStr2format);
		date2 = DateUtil.string2Date(dateStr2, dateStr2format);
		date3 = DateUtil.string2Date(dateStr1, dateStr2format);

		// 5. compare "2007/05/02" and "2007/05/01"
		assertTrue(DateUtil.greaterThan(date1, date2));
		// 6. compare "2007/05/02" and "2007/05/02"
		assertTrue(!DateUtil.greaterThan(date1, date3));
		// 7. compare "2007/05/02" and "2007/05/02" with date format
		// (yyyy/MM/dd)
		assertTrue(DateUtil.greaterThan(date1, dateStr2, dateStr2format));
	}

	/**
	 * [Flow #-4] Positive, Negative Case : Compares two dates for equality.
	 */
	@Test
	public void testEqualsBC() {
		String dateStr1 = "2007-05-01";
		String dateStr2 = "2007-05-02";
		String dateStr2format = "yyyy-MM-dd";

		Date date1 = DateUtil.string2Date(dateStr1);
		Date date2 = DateUtil.string2Date(dateStr1);
		Date date3 = DateUtil.string2Date(dateStr2);

		// 1. compare for equality between "2007-05-01" and "2007-05-01"
		assertTrue(DateUtil.equals(date1, date2));
		// 2. compare for equality between "2007-05-01" and "2007-05-02"
		assertTrue(!DateUtil.equals(date1, date3));
		// 3. compare for equality between "2007-05-01" and "2007-05-01"
		assertTrue(DateUtil.equals(date1, dateStr1));
		// 4. compare for equality between "2007-05-01" and "2007-05-01" with
		// date format
		assertTrue(DateUtil.equals(date1, dateStr1, dateStr2format));

		dateStr1 = "2007/05/01";
		dateStr2 = "2007/05/02";
		dateStr2format = "yyyy/MM/dd";

		date1 = DateUtil.string2Date(dateStr1, dateStr2format);
		date2 = DateUtil.string2Date(dateStr1, dateStr2format);
		date3 = DateUtil.string2Date(dateStr2, dateStr2format);

		// 5. compare for equality between "2007/05/01" and "2007/05/01"
		assertTrue(DateUtil.equals(date1, date2));
		// 6. compare for equality between "2007/05/01" and "2007/05/02"
		assertTrue(!DateUtil.equals(date1, date3));
		// 7. compare for equality between "2007/05/01" and "2007/05/01" with
		// date format
		assertTrue(DateUtil.equals(date1, dateStr1, dateStr2format));
	}

	/**
	 * [Flow #-5] Positive, Negative Case : convert String to java.sql.Date
	 * type.
	 */
	@Test
	public void testString2SQLDateBC() throws Exception {
		String dateStr1 = "2007-05-01";

		// 1. convert String (yyyy-MM-dd) to java.sql.Date
		java.sql.Date sqlDate = DateUtil.string2SQLDate(dateStr1);
		Date date = new Date(sqlDate.getTime());
		assertEquals(dateStr1, DateUtil.date2String(date));

		// 2. convert String (yyyy/MM/dd) to java.sql.Date
		dateStr1 = "2007/05/01";
		sqlDate = DateUtil.string2SQLDate(dateStr1, "yyyy/MM/dd");
		date = new Date(sqlDate.getTime());
		assertEquals(dateStr1, DateUtil.date2String(date, "yyyy/MM/dd"));

		// 3. convert String (yyyy/MM/dd) to java.sql.Date
		try {
			dateStr1 = "2007-05-01";
			sqlDate = DateUtil.string2SQLDate(dateStr1, "yyyy/MM/dd");
			fail("fail to check date format");
		} catch (Exception e) {
			// assertTrue(e instanceof ParseException);
			// SimpleDateFormat 에서 joda-time 으로 변경 시 ParseException 이 아니라
			// IllegalArgumentException 이 발생함
			assertTrue(e instanceof IllegalArgumentException);
			assertTrue(e.getMessage().contains("Invalid format"));
		}
	}

	/**
	 * [Flow #-6] Positive Case : convert java.util.Date to String type.
	 */
	@Test
	public void testDate2StringBC() {
		Date currentDate = new Date();
		// 1. convert Date to String with format (yyyy/MM/dd)
		String dateStr = DateUtil.date2String(currentDate, "yyyy/MM/dd");
		assertEquals(10, dateStr.length());
		// 2. convert Date to String with format (yyyyMMdd)
		dateStr = DateUtil.date2String(currentDate, "yyyyMMdd");
		assertEquals(8, dateStr.length());
		// 3. convert Date to String with default format (yyyy-MM-dd)
		dateStr = DateUtil.date2String(currentDate);
		assertEquals(10, dateStr.length());
	}

	/**
	 * [Flow #-7] Positive Case : convert String to java.util.Date.
	 */
	@Test
	public void testString2DateBC() {
		String dateStr = "2007-05-01";
		// 1. convert String to Date with default format
		Date date1 = DateUtil.string2Date(dateStr);
		Date date2 = DateUtil.string2Date(dateStr);
		assertTrue(DateUtil.equals(date1, date2));
		// 2. convert String to Date with format (yyyy/MM/dd)
		dateStr = "2007/05/01";
		date1 = DateUtil.string2Date(dateStr, "yyyy/MM/dd");
		date2 = DateUtil.string2Date(dateStr, "yyyy/MM/dd");
		assertTrue(DateUtil.equals(date1, date2));
	}

	/**
	 * [Flow #-8] Positive Case : convert String to java.sq.Timestamp.
	 */
	@Test
	public void testString2TimestampBC() {
		String dateStr = "2007-05-01";
		// 1. convert String to java.sql.Timestamp
		Timestamp time = DateUtil.string2Timestamp(dateStr);
		assertNotNull(time);

		dateStr = "2007/05/01";
		// 1. convert String to java.sql.Timestamp with format (yyyy/MM/dd)
		time = DateUtil.string2Timestamp(dateStr, "yyyy/MM/dd");
		assertNotNull(time);
	}

	/**
	 * [Flow #-9] Positive Case : convert java.sql.Timestamp to String type.
	 */
	@Test
	public void testTimestamp2StringBC() {
		String dateStr = "2007-05-01";
		// 1. convert String to java.sql.Timestamp
		Timestamp time = DateUtil.string2Timestamp(dateStr);
		assertNotNull(time);
		// 2. convert java.sql.Timestamp to String
		String timeStr = DateUtil.timestamp2String(time);
		assertEquals(dateStr, timeStr);
		// 3. convert java.sql.Timestamp to String with format (yyyy/MM/dd)
		timeStr = DateUtil.timestamp2String(time, "yyyy/MM/dd");
		assertEquals("2007/05/01", timeStr);
		// 4. Timestamp is null
		assertEquals("", DateUtil.timestamp2String(null));
	}

	/**
	 * [Flow #-10] Positive Case : convert String to java.util.Calendar.
	 */
	@Test
	public void testString2CalenderBC() {
		String dateStr = "20070501000000";
		// 1. convert String to java.util.Calendar
		Calendar calendar = DateUtil.string2Calender(dateStr);
		assertEquals(1, calendar.getFirstDayOfWeek());
		// 2. dateStr length is less than 14
		dateStr = "20070501";
		assertNull(DateUtil.string2Calender(dateStr));
	}

	/**
	 * [Flow #-11] Positive Case : get the number of minutes between two
	 * Gregorian Calendar dates.
	 */
	@Test
	public void testGetMinutesBC() {
		String dateStr1 = "20070501000000";
		String dateStr2 = "20070501000100";
		// 1. get the number of minutes between 2007-05-01 00:00:00 and
		// 2007-05-01 00:01:00
		Calendar cal1 = DateUtil.string2Calender(dateStr1);
		Calendar cal2 = DateUtil.string2Calender(dateStr2);
		assertEquals(1, DateUtil.getMinutes(cal1, cal2));
		assertEquals(1, DateUtil.getMinutes(dateStr1, dateStr2));
	}

	/**
	 * [Flow #-12] Positive Case : get the number of days between two Gregorian
	 * Calendar dates.
	 */
	@Test
	public void testGetDaysBC() {
		String dateStr1 = "20070501000000";
		String dateStr2 = "20070502000000";

		Calendar cal1 = DateUtil.string2Calender(dateStr1);
		Calendar cal2 = DateUtil.string2Calender(dateStr2);

		// 1. get the number of minutes between 2007-05-01 00:00:00 and
		// 2007-05-02 00:00:00
		assertEquals(1, DateUtil.getDays(cal1, cal2));
		assertEquals(1, DateUtil.getDays(dateStr1, dateStr2));
	}

	/**
	 * [Flow #-13] Positive Case : get current time.
	 */
	@Test
	public void testGetCurrentTimeBC() {
		String currentTime = DateUtil.getCurrentTimeString();
		// 1. get current time with default format (yyyy-MM-dd HH:mm)
		assertEquals(8, currentTime.length());
		// 2. get current time with default format (yyyyMMdd)
		currentTime = DateUtil.getCurrentTime("yyyyMMdd");
		assertEquals(8, currentTime.length());
	}

	/**
	 * [Flow #-14] Positive Case : get current day.
	 */
	@Test
	public void testGetCurrentDayBC() {
		// 1. get current day with default format (yyyy-MM-dd)
		String currentDay = DateUtil.getCurrentDay();
		assertEquals(10, currentDay.length());
	}

	/**
	 * [Flow #-15] Positive Case : get this month.
	 */
	@Test
	public void testGetThisMonthBC() {
		// 1. get this month with default format (yyyy-MM)
		String thisMonth = DateUtil.getThisMonth();
		assertEquals(7, thisMonth.length());
	}

	/**
	 * [Flow #-16] Positive Case : get this year.
	 */
	@Test
	public void testGetThisYearBC() {
		// 1. get this year with default format (yyyy)
		String thisYear = DateUtil.getThisYear();
		assertEquals(4, thisYear.length());
	}

	/**
	 * [Flow #-17] Positive Case : get current hour.
	 */
	@Test
	public void testGetCurrentHourBC() {
		// 1. get current hour with default format (HH:mm)
		String currentHour = DateUtil.getCurrentHour();
		assertEquals(5, currentHour.length());
	}

	/**
	 * [Flow #-18] Positive Case : get yesterday.
	 */
	@Test
	public void testGetYesterdayBC() {
		// 1. get yesterday with default format
		String yesterday = DateUtil.getYesterday();
		assertEquals(10, yesterday.length());
		// 1. get yesterday with format (yyyyMMdd)
		yesterday = DateUtil.getYesterday("yyyyMMdd");
		assertEquals(8, yesterday.length());
	}

	/**
	 * [Flow #-19] Positive Case : get list of dates between startDay and
	 * endDay.
	 */
	@Test
	public void testGetDatesBC() {
		String startDay = "2007-05-01";
		String endDay = "2007-05-03";
		// 1. get list of date between 2007-05-01 and 2007-05-03
		String[] dates = DateUtil.getDates(startDay, endDay);
		assertEquals(3, dates.length);
		// 2. get list of date between 2007/05/01 and 2007/05/03
		startDay = "2007/05/01";
		endDay = "2007/05/03";
		dates = DateUtil.getDates(startDay, endDay, "yyyy/MM/dd");
		assertEquals(3, dates.length);

	}

	/**
	 * [Flow #-20] Positive Case : convert java.util.Calendar to String
	 */
	@Test
	public void testCalendar2StringBC() {
		// 1. convert java.util.Calendar to String
		Calendar calendar = new GregorianCalendar(
				TimeZone.getTimeZone("GMT+09:00"), Locale.KOREA);
		calendar.setTime(new Date());
		assertTrue(DateUtil.calendar2String(calendar).length() >= 12);
	}
}
