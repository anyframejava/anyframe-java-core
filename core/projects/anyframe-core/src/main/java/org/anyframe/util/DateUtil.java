/*
 * Copyright 2002-2008 the original author or authors.
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

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.ResourceBundle;
import java.util.StringTokenizer;
import java.util.TimeZone;

import org.joda.time.DateTime;
import org.joda.time.DurationFieldType;
import org.joda.time.Period;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.context.i18n.LocaleContextHolder;

/**
 * Date Utility Class <br>
 * This is used to manage Date Object.
 *
 * @author SoYon Lim
 * @author JongHoon Kim
 * @author HyunJung Jeong
 */
public class DateUtil {

	// ~ Static fields/initializers
	// =============================================
	/** Default data format variable */
	private static String defaultDatePattern = null;

	private static String BUNDLE_KEY = null;

	/** Date format */
	public static final String DATE_PATTERN = "yyyy-MM-dd";

	/** Time format */
	public static final String TIME_PATTERN = "HH:mm";

	/** Date Time format */
	public static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm";

	/** Date HMS format */
	public static final String DATE_HMS_FORMAT = "yyyyMMddHHmmss";

	/** Time stamp format */
	public static final String TIMESTAMP_FORMAT = "yyyyMMddHHmmssSSS";

	// ~ Methods
	// ================================================================

	/**
	 * get current day
	 *
	 * @return String representing current day (yyyy-MM-dd)
	 */
	public static String getCurrentDay() {
		return getCurrentTime(DATE_PATTERN);
	}

	/**
	 * search the current date matching user-input format
	 *
	 * @param pattern date format
	 *
	 * @return String current date matching the format
	 */
	public static String getCurrentDay(String pattern) {
		return getCurrentTime(pattern);
	}

	/**
	 * get current datetime
	 *
	 * @return String representing current day (yyyy-MM-dd HH:mm)
	 */
	public static String getCurrentTime() {
		return getCurrentTime(DATE_TIME_PATTERN);
	}

	/**
	 * get current time
	 *
	 * @param pattern time pattern
	 * @return String representing current time (type of pattern)
	 */
	public static String getCurrentTime(String pattern) {
		DateTime dt = new DateTime();
		DateTimeFormatter fmt = DateTimeFormat.forPattern(pattern);
		return fmt.print(dt);
	}

	/**
	 * get this month including this year
	 *
	 * @return String representing this month (yyyy-MM)
	 */
	public static String getThisMonth() {
		return getCurrentTime("yyyy-MM");
	}

	/**
	 * get this year
	 *
	 * @return String representing this year (yyyy)
	 */
	public static String getThisYear() {
		return getCurrentTime("yyyy");
	}

	/**
	 * get current hour
	 *
	 * @return String representing current hour (HH:mm)
	 */
	public static String getCurrentHour() {
		return getCurrentTime(TIME_PATTERN);
	}

	/**
	 * return day of the week of the input data. return in abbreviation format
	 * for the default language of the current system.
	 *
	 * <pre>
	 * DateUtil.getDayOfWeek(&quot;2011-02-04&quot;) = &quot;Fri&quot;;
	 * </pre>
	 *
	 * @param str date(yyyy-MM-dd)
	 * @return String day of week (shortText, Default Locale)
	 */
	public static String getDayOfWeek(String str) {
		return getDayOfWeek(str, true, LocaleContextHolder.getLocale());
	}

	/**
	 * return day of the week of the input data. return in abbreviation or full
	 * day of the week format for the language after getting locale info.
	 *
	 * <pre>
	 * DateUtil.getDayOfWeek(&quot;2011-02-04&quot;, true, Locale.US) = &quot;Fri&quot;;
	 * DateUtil.getDayOfWeek(&quot;2011-02-04&quot;, false, Locale.US) = &quot;Friday&quot;;
	 * </pre>
	 *
	 * @param str date(yyyy-MM-dd)
	 * @param abbreviation if <code>true</code>, return in abbreviation.
	 * @param Locale locale
	 * @return String day of week
	 */
	public static String getDayOfWeek(String str, Boolean abbreviation, Locale locale) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);
		DateTime dt = fmt.parseDateTime(str);
		DateTime.Property dayOfWeek = dt.dayOfWeek();

		if (abbreviation)
			return dayOfWeek.getAsShortText(locale);
		else
			return dayOfWeek.getAsText(locale);
	}

	/**
	 * It returns the number of days between two Gregorian Calendar dates (e.g.
	 * cal1: 2005-08-15, cal2: 2005-09-14 => 30 days)
	 *
	 * @param cal1 the Calendar to calculate
	 * @param cal2 another Calendar to calculate
	 * @return days between cal1 and cal2
	 */
	public static int getDays(Calendar cal1, Calendar cal2) {
		long min = getMinutes(cal1, cal2);

		return (int) (min / (24 * 60));
	}

	/**
	 * Calculate number of days between startDate and endDate
	 *
	 * @param startDate start date(yyyy-MM-dd)
	 * @param endDate end date(yyyy-MM-dd)
	 * @return integer of days
	 */
	public static int getDays(String startDate, String endDate) {
		return getDays(startDate, endDate, DATE_HMS_FORMAT);
	}

	/**
	 * Calculate number of days between startDate and endDate
	 *
	 * @param startDate start date
	 * @param endDate end date
	 * @param pattern date format
	 * @return integer of days
	 */
	public static int getDays(String startDate, String endDate, String pattern) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(pattern);

		DateTime startDateTime = fmt.parseDateTime(startDate);
		DateTime endDateTime = fmt.parseDateTime(endDate);

		long startMillis = startDateTime.getMillis();
		long endMillis = endDateTime.getMillis();

		int result = (int) (startMillis / (60 * 60 * 1000 * 24));
		int result1 = (int) (endMillis / (60 * 60 * 1000 * 24));

		return result1 - result;
	}

	/**
	 * Compares two dates for equality.
	 *
	 * @param date1 the Date to compare with.
	 * @param date2 the other Date String to compare with. (yyyy-MM-dd)
	 * @return <code>true</code> if the Dates are the same; <code>false</code>
	 * otherwise.
	 */
	public static boolean equals(Date date1, String date2) {
		return equals(date1, date2, DATE_PATTERN);
	}

	/**
	 * Compares two dates for equality.
	 *
	 * @param date1 the Date to compare with.
	 * @param date2 the other Date String to compare with. (The format equals
	 * date2format that input argument)
	 * @param date2format String Date format
	 * @return <code>true</code> if the Dates are the same; <code>false</code>
	 * otherwise.
	 */
	public static boolean equals(Date date1, String date2, String date2format) {
		Date date = string2Date(date2, date2format);
		return equals(date1, date);
	}

	/**
	 * Compares two dates for equality.
	 *
	 * @param date1 the Date to compare with.
	 * @param date2 the other Date to compare with.
	 * @return true if the Dates are the same; false otherwise.
	 */
	public static boolean equals(Date date1, Date date2) {
		if (date1.getTime() == date2.getTime()) {
			return true;
		}
		return false;
	}

	/**
	 * Compares two Dates for ordering.
	 *
	 * @param date1 Date to be compared.
	 * @param date2 another Date String to be compared. (yyyy-MM-dd)
	 * @return the value true if the date1 is equal to date2 or date1 is after
	 * the date2. the value false if the date1 is before the date2.
	 */
	public static boolean greaterThan(Date date1, String date2) {
		return greaterThan(date1, date2, DATE_PATTERN);
	}

	/**
	 * Compares two Dates for ordering.
	 *
	 * @param date1 Date to be compared.
	 * @param date2 another Date String to be compared. (The format equals
	 * date2format that input argument)
	 * @param date2format String date format
	 * @return the value <code>true</code> if date1 is after the date2. the
	 * value <code>false</code> if the date1 is equal to date2 or the date1 is
	 * before the date2.
	 */
	public static boolean greaterThan(Date date1, String date2, String date2format) {
		Date date = string2Date(date2, date2format);
		return greaterThan(date1, date);
	}

	/**
	 * Compares two Dates for ordering.
	 *
	 * @param date1 Date to be compared.
	 * @param date2 another Date to be compared.
	 * @return the value <code>true</code> if or date1 is after the date2. the
	 * value <code>false</code> if the date1 is equal to date2 the date1 is
	 * before the date2.
	 */
	public static boolean greaterThan(Date date1, Date date2) {
		if (date1.getTime() > date2.getTime()) {
			return true;
		}
		return false;
	}

	/**
	 * getting end date intervalDays <= 40
	 *
	 * @param startDay start day (yyyy-MM-dd)
	 * @param intervalDays interval days
	 * @return day after interval days from start day (yyyy-MM-dd)
	 */
	public static String getEndDate(String startDay, int intervalDays) {
		StringTokenizer st = new StringTokenizer(startDay, "-");
		int year = 0;
		int mon = 0;
		int day = 0;
		for (int i = 0; st.hasMoreTokens(); i++) {
			if (i == 0) {
				year = Integer.parseInt(st.nextToken());
			}
			if (i == 1) {
				String sMon = st.nextToken();
				if (sMon.startsWith("0")) {
					sMon = sMon.substring(1);
				}

				mon = Integer.parseInt(sMon);
			}
			if (i == 2) {
				String sDay = st.nextToken();
				if (sDay.startsWith("0")) {
					sDay = sDay.substring(1);
				}
				day = Integer.parseInt(sDay);
			}
		}
		DateTime start = new DateTime(year, mon, day, 0, 0, 0, 0);

		Period p1 = new Period(20 * 86400000);
		Period p2 = new Period((intervalDays - 20) * 86400000);

		DateTime end = start.plus(p1);
		end = end.plus(p2);
		year = end.getYear();
		mon = end.getMonthOfYear();
		day = end.getDayOfMonth();
		String xMon = "";
		String xDay = "";
		if (mon < 10) {
			xMon = "0" + (new Integer(mon)).toString();
		}
		else {
			xMon = (new Integer(mon)).toString();
		}
		if (day < 10) {
			xDay = "0" + (new Integer(day)).toString();
		}
		else {
			xDay = (new Integer(day)).toString();
		}
		String endDay = (new Integer(year)).toString() + "-" + xMon + "-" + xDay;
		return endDay;
	}

	/**
	 * return the date adding days to the input date. negative date will be
	 * returned by calculating the previous days of the input date.
	 *
	 * @param str string of the date
	 * @param days the amount of days to add, may be negative
	 * @return String calculated date
	 */
	public static String addDays(String str, int days) {
		if (days == 0) {
			return str;
		}
		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);
		DateTime dt = fmt.parseDateTime(str);
		DateTime subtracted = dt.withFieldAdded(DurationFieldType.days(), days);
		return fmt.print(subtracted);
	}

	/**
	 * return the date adding months to the input date. negative month will be
	 * returned by calculating the previous days of the input date.
	 *
	 * @param str string of the date
	 * @param months the amount of months to add, may be negative
	 * @return String calculated date
	 */
	public static String addMonths(String str, int months) {
		if (months == 0) {
			return str;
		}
		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);
		DateTime dt = fmt.parseDateTime(str);
		DateTime subtracted = dt.withFieldAdded(DurationFieldType.months(), months);
		return fmt.print(subtracted);
	}

	/**
	 * return the date adding years to the input date. negative year will be
	 * returned by calculating the previous days of the input date.
	 *
	 * @param str string of the date
	 * @param years the amount of years to add, may be negative
	 * @return String calculated date
	 */
	public static String addYears(String str, int years) {
		if (years == 0) {
			return str;
		}
		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);
		DateTime dt = fmt.parseDateTime(str);
		DateTime subtracted = dt.withFieldAdded(DurationFieldType.years(), years);
		return fmt.print(subtracted);
	}

	/**
	 * return date calculating years, months, days to the input date
	 *
	 * @param str string of the date
	 * @param years the amount of years to add, may be negative
	 * @param months the amount of months to add, may be negative
	 * @param days the amount of days to add, may be negative
	 * @return String calculated date
	 */
	public static String addYearMonthDay(String str, int years, int months, int days) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);
		DateTime dt = fmt.parseDateTime(str);

		if (years != 0)
			dt = dt.withFieldAdded(DurationFieldType.years(), years);
		if (months != 0)
			dt = dt.withFieldAdded(DurationFieldType.months(), months);
		if (days != 0)
			dt = dt.withFieldAdded(DurationFieldType.days(), days);

		return fmt.print(dt);
	}

	/**
	 * get the first date of the month based on the input date.
	 *
	 * @param str string of the date
	 * @return the new date of the first date of the month
	 */
	public static String getFirstDateOfMonth(String str) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);
		DateTime dt = fmt.parseDateTime(str);
		DateTime dtRet = new DateTime(dt.getYear(), dt.getMonthOfYear(), 1, 0, 0, 0, 0);
		return fmt.print(dtRet);
	}

	/**
	 * get the last date of the month based on the input date.
	 *
	 * @param str string of the date
	 * @return the new date of the last date of the month
	 */
	public static String getLastDateOfMonth(String str) {
		String firstDateOfMonth = getFirstDateOfMonth(str);

		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);
		DateTime dt = fmt.parseDateTime(firstDateOfMonth);
		dt = dt.plusMonths(1).minusDays(1);
		return fmt.print(dt);
	}

	/**
	 * get the first day of the previous month based on the input date.
	 *
	 * @param str string of the date
	 * @return the new date of the first date of the previous month
	 */
	public static String getFirstDateOfPrevMonth(String str) {
		String firstDateOfMonth = getFirstDateOfMonth(str);

		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);
		DateTime dt = fmt.parseDateTime(firstDateOfMonth);
		dt = dt.minusMonths(1);
		return fmt.print(dt);
	}

	/**
	 * get the last day of the previous month based on the input date.
	 *
	 * @param str string of the date
	 * @return the new date of the last date of the previous month
	 */
	public static String getLastDateOfPrevMonth(String str) {
		String firstDateOfMonth = getFirstDateOfMonth(str);

		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);
		DateTime dt = fmt.parseDateTime(firstDateOfMonth);
		dt = dt.minusDays(1);
		return fmt.print(dt);
	}

	/**
	 * check whether the input date is valid.
	 *
	 * @param str string of the date (yyyy-MM-dd)
	 * @return
	 * @return if valid date, return <code>true</code>.
	 */
	public static boolean isDate(String str) {
		return isDate(str, DATE_PATTERN);
	}

	/**
	 * check whether the input date is valid date.
	 *
	 * @param str string of the date
	 * @param pattern date format
	 * @return return <code>true</code>if valid date and <code>false</code> if
	 * not.
	 */
	public static boolean isDate(String str, String pattern) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(pattern);
		DateTime dt = new DateTime();
		dt = fmt.parseDateTime(str);

		if (!fmt.print(dt).equals(str)) {
			return false;
		}
		return true;
	}

	/**
	 * check whether the input time is valid date.
	 *
	 * @param str string of the time (HH:mm)
	 * @param pattern time format
	 * @return return <code>true</code>if valid time and <code>false</code> if
	 * not.
	 */
	public static boolean isTime(String str) {
		return isTime(str, TIME_PATTERN);
	}

	/**
	 * check whether the input hour is valid time.
	 *
	 * @param str string of the time
	 * @return return <code>true</code>if valid time and <code>false</code> if
	 * not.
	 */
	public static boolean isTime(String str, String pattern) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(pattern);
		DateTime dt = new DateTime();
		dt = fmt.parseDateTime(str);

		if (!fmt.print(dt).equals(str)) {
			return false;
		}
		return true;
	}

	/**
	 * convert String to java.util.Date
	 *
	 * @param str the String Date to be converted (yyyy-MM-dd)
	 * @return <code>java.util.Date</code>
	 */
	public static Date string2Date(String str) {
		return string2Date(str, DATE_PATTERN);
	}

	/**
	 * convert String to <code>java.util.Date</code>
	 *
	 * @param str the String Date to be converted (The format equals format that
	 * input argument)
	 * @param format converted date format
	 * @return <code>java.util.Date</code>
	 */
	public static Date string2Date(String str, String pattern) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(pattern);
		return fmt.parseDateTime(str).toDate();
	}

	/**
	 * convert <code>Date</code> to <code>String</code>
	 *
	 * @param Date date
	 * @return result String (yyyy-MM-dd)
	 */
	public static String date2String(Date date) {
		return date2String(date, DATE_PATTERN);
	}

	/**
	 * convert <code>Date</code> to <code>String</code>
	 *
	 * @param date date
	 * @param pattern date format
	 * @return result String
	 */
	public static String date2String(Date date, String pattern) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(pattern);
		return fmt.print(date.getTime());
	}

	/**
	 * convert and return the date of string type of the given pattern to
	 * user-defined format
	 *
	 * <pre>
	 * DateUtil.string2String("20101214", "yyyyMMdd", "yyyy-MM-dd") = "2010-12-14"
	 * DateUtil.string2String("2010.12.14", "yyyy.MM.dd", "yyyy/MM/dd") = "2010/12/14"
	 * </pre>
	 *
	 * @param str string
	 * @param pattern original date format
	 * @param pattern converted date pattern
	 */
	public static String string2String(String str, String basePattern, String wantedPattern) {
		DateTimeFormatter basefmt = DateTimeFormat.forPattern(basePattern);
		DateTimeFormatter wantedfmt = DateTimeFormat.forPattern(wantedPattern);
		DateTime dt = basefmt.parseDateTime(str);
		return wantedfmt.print(dt);
	}


	/**
	 * return random date between 1900~2100.
	 *
	 * @return Date random date
	 */
	public static Date getRandomDate() {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(DATE_PATTERN);

		Random generator = new Random(System.currentTimeMillis());

		String pattern = "(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31))";
		String date = "";

		while (!ValidationUtil.isRegexPatternMatch(date, pattern)) {
			String yyyy = StringUtil.leftPad(String.valueOf(generator.nextInt(200) + 1900), 4, '0');
			String mm = StringUtil.leftPad(String.valueOf(generator.nextInt(12)), 2, '0');
			String dd = StringUtil.leftPad(String.valueOf(generator.nextInt(30)), 2, '0');

			date = yyyy + "-" + mm + "-" + dd;
		}
		DateTime dt = fmt.parseDateTime(date);

		return dt.toDate();
	}

	/**
	 * get the current timestamp
	 *
	 * @return String of current timestamp;
	 */
	public static String getTimeStamp() {
		DateTime dt = new DateTime();
		DateTimeFormatter fmt = DateTimeFormat.forPattern(TIMESTAMP_FORMAT);
		return fmt.print(dt);
	}

	/**
	 * Return default datePattern (yyyy-MM-dd)
	 *
	 * @return a string representing the date pattern on the UI
	 */
	public static synchronized String getDefaultDatePattern() {
		Locale locale = LocaleContextHolder.getLocale();
		try {
			defaultDatePattern = ResourceBundle.getBundle(BUNDLE_KEY, locale).getString("date.format");
		}
		catch (Exception mse) {
			defaultDatePattern = DATE_PATTERN;
		}

		return defaultDatePattern;
	}

	/**
	 * convert String to <code>java.sql.Date</code> type
	 *
	 * @param str the String Date to be converted (yyyy-MM-dd)
	 * @return <code>java.sql.Date</code>
	 * @throws <code>Exception<code> fail to convert string to SQLDate
	 */
	public static java.sql.Date string2SQLDate(String str) {
		return string2SQLDate(str, DATE_PATTERN);
	}

	/**
	 * convert String to <code>java.sql.Date</code> type
	 *
	 * @param str the String Date to be converted
	 * @param pattern date format to be converted.
	 * @return <code>java.sql.Date</code>
	 */
	public static java.sql.Date string2SQLDate(String str, String pattern) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(pattern);
		return new java.sql.Date(fmt.parseDateTime(str).getMillis());
	}

	/**
	 * convert String to <code>java.sq.Timestamp</code>
	 *
	 * @param str the String Date to be converted (yyyy-MM-dd)
	 * @return <code>java.sql.Timestamp</code>
	 */
	public static Timestamp string2Timestamp(String str) {
		return string2Timestamp(str, DATE_PATTERN);
	}

	/**
	 * convert String to <code>java.sq.Timestamp</code>
	 *
	 * @param str the String Date to be converted (The format equals format that
	 * input argument)
	 * @param format converted date format
	 * @return <code>java.sql.Timestamp</code>
	 */
	public static Timestamp string2Timestamp(String str, String pattern) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern(pattern);
		return new Timestamp(fmt.parseDateTime(str).getMillis());
	}

	/**
	 * convert <code>java.sq.Timestamp</code> to <code>String</code> type
	 *
	 * @param date the Date to be converted
	 * @return a string representing the date (yyyy-MM-dd)
	 */
	public static String timestamp2String(Timestamp date) {
		return timestamp2String(date, DATE_PATTERN);
	}

	/**
	 * convert <code>java.sq.Timestamp</code> to <code>String</code> type
	 *
	 * @param date the Date to be converted (The format equals format that input
	 * argument)
	 * @param format Date format
	 * @return a string representing the date
	 */
	public static String timestamp2String(Timestamp date, String format) {
		if (date == null) {
			return "";
		}
		return date2String(date, format);
	}

	/**
	 * convert String to <code>java.util.Calendar</code>
	 *
	 * @param str the String Date to be converted (yyyyMMddHHmmss)
	 * @return <code>java.util.Calendar</code>
	 */
	public static Calendar string2Calender(String str) {
		if ((str == null) || (str.length() < 14))
			return null;

		String year = str.substring(0, 4);
		String month = str.substring(4, 6);
		String day = str.substring(6, 8);
		String hour = str.substring(8, 10);
		String minute = str.substring(10, 12);
		String second = str.substring(12, 14);

		return (new GregorianCalendar(StringUtil.string2integer(year), StringUtil.string2integer(month) - 1, StringUtil
				.string2integer(day), StringUtil.string2integer(hour), StringUtil.string2integer(minute), StringUtil
				.string2integer(second)));
	}

	/**
	 * convert <code>java.util.Calendar</code> to String
	 *
	 * @param calendar the Calendar to be converted
	 * @return a string representing the date (yyyyMMddHHmmss)
	 */
	public static String calendar2String(Calendar calendar) {
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1; // Calendar.MONTH ia
		// zero-based (Jan -> 0)
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int hour = calendar.get(Calendar.HOUR_OF_DAY);
		int minute = calendar.get(Calendar.MINUTE);
		int second = calendar.get(Calendar.SECOND);

		return (StringUtil.integer2string(year) + StringUtil.integer2string(month) + StringUtil.integer2string(day)
				+ StringUtil.integer2string(hour) + StringUtil.integer2string(minute)
				+ StringUtil.integer2string(second) + "000");
	}

	/**
	 * It returns the number of minutes between two Gregorian Calendar dates
	 *
	 * @param cal1 the Calendar to calculate
	 * @param cal2 another Calendar to calculate
	 * @return minutes between cal1 and cal2
	 */
	public static int getMinutes(Calendar cal1, Calendar cal2) {
		long utc1 = cal1.getTimeInMillis();
		long utc2 = cal2.getTimeInMillis();

		long result = (utc2 - utc1) / (60 * 1000);

		return (int) result;
	}

	/**
	 * It returns the number of minutes between two string type dates.
	 *
	 * @param date1 the String Date to calculate (yyyyMMddHHmmss)
	 * @param date2 another String Date to calculate (yyyyMMddHHmmss)
	 * @return minutes between date1 and date2
	 */
	public static int getMinutes(String date1, String date2) {
		Calendar cal1 = string2Calender(date1);
		Calendar cal2 = string2Calender(date2);

		return getMinutes(cal1, cal2);
	}

	/**
	 * get yesterday
	 *
	 * @return String representing yesterday (yyyy-MM-dd)
	 */
	public static String getYesterday() {
		return getYesterday(DATE_PATTERN);
	}

	/**
	 * get yesterday with format
	 *
	 * @param format Date format
	 * @return String representing yesterday
	 */
	public static String getYesterday(String format) {
		Calendar cal = getCalendar();
		cal.roll(Calendar.DATE, -1);
		Date date = cal.getTime();
		return date2String(date, format);
	}

	/**
	 * get current calendar of korea time zone
	 *
	 * @return <code>java.util.Calendar</code>
	 */
	private static Calendar getCalendar() {
		Calendar calendar = new GregorianCalendar(TimeZone.getTimeZone("GMT+09:00"), Locale.KOREA);
		calendar.setTime(new Date());

		return calendar;
	}

	/**
	 * find dates between startDay and endDay
	 *
	 * @param startDay start day (yyyy-MM-dd)
	 * @param endDay end day (yyyy-MM-dd)
	 * @return String array of dates between startDay and endDay
	 */
	public static String[] getDates(String startDay, String endDay) {
		return getDates(startDay, endDay, DATE_PATTERN);
	}

	/**
	 * find dates between startDay and endDay
	 *
	 * @param startDay start day
	 * @param endDay end day
	 * @param format date format
	 * @return String array of dates between startDay and endDay
	 */
	public static String[] getDates(String startDay, String endDay, String format) {
		List<String> result = new ArrayList<String>();
		result.add(startDay);

		Calendar cal = getCalendar();
		cal.setTime(string2Date(startDay, format));
		String nextDay = date2String(cal.getTime(), format);

		while (!nextDay.equals(endDay)) {
			cal.add(Calendar.DATE, 1);
			nextDay = date2String(cal.getTime(), format);
			result.add(nextDay);
		}
		return result.toArray(new String[0]);
	}
}
