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

/**
 * Age Utility Class
 * 
 * @author Seonju Hong
 */
public class AgeUtil {

	private AgeUtil() {
		throw new AssertionError();
	}

	/**
	 * Gets an age in full by birthdate and date, using "yyyyMMdd" pattern
	 * string. <br>
	 * 
	 * <pre>
	 * int age = AgeUtil.getFullAge(&quot;19740608&quot;, &quot;20090607&quot;); // age = 2009 - 1974 - 1 = 34
	 * int age = AgeUtil.getFullAge(&quot;19740608&quot;, &quot;20090608&quot;); // age = 2009 - 1974 = 35
	 * int age = AgeUtil.getFullAge(&quot;19740608&quot;, &quot;20090609&quot;); // age = 2009 - 1974 = 35
	 * </pre>
	 * 
	 * @param birthdate
	 *            string of birthdate
	 * @param baseDate
	 *            string of base date
	 * @return int value of an age in full
	 */
	public static int getFullAge(String birthdate, String baseDate) {
		int age = 0;
		age = Integer.parseInt(baseDate.substring(0, 4))
				- Integer.parseInt(birthdate.substring(0, 4));

		if (age > 0) {
			int birthDay = Integer.parseInt(birthdate.substring(4, 8)); // MMdd
			int baseDay = Integer.parseInt(baseDate.substring(4, 8)); // MMdd
			if (birthDay > baseDay)
				age--;
		}

		return age;
	}

	/**
	 * Gets an age by birthdate and date, using "yyyyMMdd" pattern string. <br>
	 * 
	 * <pre>
	 * int age = AgeUtil.getAge(&quot;19740608&quot;, &quot;20090607&quot;); // age = 2009 - 1974 + 1 = 36
	 * </pre>
	 * 
	 * @param birthdate
	 *            string of birthdate
	 * @param baseDate
	 *            string of base date
	 * @return int value of an age
	 */
	public static int getAge(String birthdate, String baseDate) {
		int age = 0;
		age = Integer.parseInt(baseDate.substring(0, 4))
				- Integer.parseInt(birthdate.substring(0, 4)) + 1;
		return age;
	}

	/**
	 * Gets a date by input date, current age and target age.<br>
	 * 
	 * <pre>
	 * String date = AgeUtil.getDateByAge(&quot;20090901&quot;, 36, 20); // 19930901
	 * String date = AgeUtil.getDateByAge(&quot;20090901&quot;, 20, 20); // 20090901
	 * String date = AgeUtil.getDateByAge(&quot;20090901&quot;, 16, 20); // 20130901
	 * </pre>
	 * 
	 * @param date
	 *            string of date
	 * @param age
	 *            the current age
	 * @param targetAge
	 *            the target age
	 * @return String value of date
	 */
	public static String getDateByAge(String date, int age, int targetAge) {
		int ageDiff = age - targetAge;

		if (ageDiff > 0) {
			return DateUtil
					.addYears(DateUtil.convertDateFormat(date,
							DateUtil.DATE_PATTERN, DateUtil.DATE_PATTERN_DASH),
							ageDiff);
		} else {
			return DateUtil.addYears(DateUtil.convertDateFormat(date,
					DateUtil.DATE_PATTERN, DateUtil.DATE_PATTERN_DASH),
					-ageDiff);
		}
	}
}
