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
	 * Gets an age in full by birthdate and date, using "yyyyMMdd" pattern string. <br>
	 * <div class="ko"> 
     * "yyyyMMdd" 문자열 형태로 입력된 생년월일과 기준일자를 바탕으로 만나이를 구한다.
     * <pre>
     * int age = AgeUtil.getFullAge("19740608", "20090607"); // 생일이 지나지 않은 경우, age = 2009 - 1974 - 1 = 34
     * int age = AgeUtil.getFullAge("19740608", "20090608"); // 생일이 지난 경우, age = 2009 - 1974 = 35
     * int age = AgeUtil.getFullAge("19740608", "20090609"); // 생일이 지난 경우, age = 2009 - 1974 = 35
     * </pre>
     * </div>
     * 
     * @param birthdate string of birthdate
     * @param baseDate string of base date
     * @return int value of an age in full
     */
    public static int getFullAge(String birthdate, String baseDate) {
    	int age = 0;
		age = Integer.parseInt(baseDate.substring(0, 4)) - Integer.parseInt(birthdate.substring(0, 4));

		if(age > 0) {
    		int birthDay = Integer.parseInt(birthdate.substring(4,8));	// MMdd
    		int baseDay = Integer.parseInt(baseDate.substring(4,8));	// MMdd   		
    		if(birthDay > baseDay)
    			age--;
		}

		return age;
    }
    
    /**
	 * Gets an age by birthdate and date, using "yyyyMMdd" pattern string. <br>
	 * <div class="ko"> 
     * "yyyyMMdd" 문자열 형태로 입력된 생년월일과 기준일자를 바탕으로 전통 나이를 구한다.
     * 현재일자 기준 생일의 전후 구분 없이 현재년도 - 태어난 년도 + 1<br>
     * <pre>
     * int age = AgeUtil.getAge("19740608", "20090607"); // age = 2009 - 1974 + 1 = 36
     * </pre>
     * </div>
     * 
     * @param birthdate string of birthdate
     * @param baseDate string of base date
     * @return int value of an age 
     */
    public static int getAge(String birthdate, String baseDate){
    	int age = 0;
   		age = Integer.parseInt(baseDate.substring(0, 4)) - Integer.parseInt(birthdate.substring(0, 4)) + 1;
    	return age;
    }

    /**
	 * Gets a date by input date, current age and target age.<br>
	 * <div class="ko">
     * 입력된 일자와 나이를 기준으로 목표나이가 되는 날짜를 "yyyyMMdd" 형태로 리턴한다.
     * <pre>
     *  String date = AgeUtil.getDateByAge("20090901", 36, 20); // 19930901
     *  String date = AgeUtil.getDateByAge("20090901", 20, 20); // 20090901
     *  String date = AgeUtil.getDateByAge("20090901", 16, 20); // 20130901
     * </pre>
     * </div>
     * 
     * @param date string of date
     * @param age the current age
     * @param targetAge	the target age
     * @return String value of date
     */
    public static String getDateByAge(String date, int age, int targetAge) {
    	int ageDiff = age - targetAge;
    	
    	if(ageDiff > 0) {
    		return DateUtil.addYears(DateUtil.string2String(date, DateUtil.DATE_PATTERN, DateUtil.DATE_PATTERN_DASH), ageDiff);
    	} else {
    		return DateUtil.addYears(DateUtil.string2String(date, DateUtil.DATE_PATTERN, DateUtil.DATE_PATTERN_DASH), -ageDiff);
    	}
    }
}
