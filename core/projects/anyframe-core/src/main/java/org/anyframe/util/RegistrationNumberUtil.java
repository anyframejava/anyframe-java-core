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

import org.springframework.util.Assert;

/**
 * Utility Class for Social Security Number (Korean) 
 * 
 * @author Seonju Hong
 */
public class RegistrationNumberUtil {
	
	private RegistrationNumberUtil() {
		throw new AssertionError();
	}

	/**
	 * Checks Social Security Number.<br>
	 * <div class="ko">
	 * 주민등록번호 13자리를 입력받아 유효성을 체크하여 결과를 리턴한다.
	 * <pre>
	 * CheckResultEnum result = RegistrationNumberUtil.checkSsn("12345678912340");
	 * if(result == CheckResultEnum.VALID) {
	 *		debug("검증에 성공하였습니다.");
	 * } else {
	 *		debug("[오류유형] : " + result); // [오류유형] : 자릿수오류
	 * } 
	 * <pre>
	 * </div>
	 * 
	 * @param ssn the social security number
	 * @return the validation result for the social security number
	 */
	public static CheckResultEnum checkSsn(String ssn) {
		Assert.hasLength(ssn);
        
        if(ssn.length() == 13) {
            String birthday =ssn.substring(0,6);
            String num = ssn.substring(6,13);
            
            int n1 = 0;
            int n2 = 0;
            int n3 = 0;
            int n4 = 0;
            int n5 = 0;
            int n6 = 0;
            int n7 = 0;
            
            n1 = Integer.parseInt(num.substring(0,1));
            n2 = Integer.parseInt(num.substring(1,2));
            n3 = Integer.parseInt(num.substring(2,3));
            n4 = Integer.parseInt(num.substring(3,4));
            n5 = Integer.parseInt(num.substring(4,5));
            n6 = Integer.parseInt(num.substring(5,6));
            n7 = Integer.parseInt(num.substring(6,7));
            
            if(n1 != 0 && n1 != 1 && n1 != 2 && n1 != 3 && n1 != 4)
                return CheckResultEnum.INVALID_GENDER_CODE;
            
            if(birthday.length() != 6 || !DateUtil.isDate(getBirthDateBySsn(ssn),DateUtil.DATE_PATTERN))
                return CheckResultEnum.INVALID_BIRTHDAY;
            
            if(num.length() != 7)
                return CheckResultEnum.INVALID_FORMAT;
            
            if(Integer.parseInt(birthday) == 0 || Integer.parseInt(num) == 0 )
                return CheckResultEnum.INVALID_BIRTHDAY;
            
            // splits ssn
            int sum = 0;
            
            for(int i=0; i < 6; i++) {
             int temp = Integer.parseInt(birthday.substring(i,i+1)) * (i+2);
             sum += temp;
            }
 
            // checks digits from 7th to 13th number
            sum += n1*8+n2*9+n3*2+n4*3+n5*4+n6*5;
            sum %= 11;
            sum = 11 - sum;
            sum %= 10;
            
            if(sum == n7)    
                return CheckResultEnum.VALID;
            else
                return CheckResultEnum.INVALID_VALUE;            
        } else {
            return CheckResultEnum.INVALID_FORMAT;
        }
	}
	
    /**
	 * Checks Foreign Registration Number.<br>
	 * <div class="ko">
     * 외국인등록번호(ex. 8103141124313) 13자리를 입력받아, 체크한 후 체크결과를 return 한다. <br>
	 * <pre>
	 * CheckResultEnum result = RegistrationNumberUtil.checkFrgn("12345678912340");
	 * if(result == CheckResultEnum.VALID) {
	 *		debug("검증에 성공하였습니다.");
	 * } else {
	 *		debug("[오류유형] : " + result); // [오류유형] : 자릿수오류
	 * } 
	 * <pre>
	 * </div>
     * 
     * @param frgn the foreign registration number
	 * @return the validation result for the foreign registration number
     */
	public static CheckResultEnum checkFrgn(String frgn) {
		Assert.hasLength(frgn);
        
        if(frgn.length() == 13) {
            String birthday = frgn.substring(0,6);
            String num = frgn.substring(6,13);
            
            int n1 = 0;
            int n2 = 0;
            int n3 = 0;
            int n4 = 0;
            int n5 = 0;
            int n6 = 0;
            int n7 = 0;
            
            n1 = Integer.parseInt(num.substring(0,1));
            n2 = Integer.parseInt(num.substring(1,2));
            n3 = Integer.parseInt(num.substring(2,3));
            n4 = Integer.parseInt(num.substring(3,4));
            n5 = Integer.parseInt(num.substring(4,5));
            n6 = Integer.parseInt(num.substring(5,6));
            n7 = Integer.parseInt(num.substring(6,7));      
            
            if(n1 != 5 && n1 != 6 && n1 != 7 && n1 != 8 )
                return CheckResultEnum.INVALID_GENDER_CODE;
            
            if((n2*10 + n3) % 2 != 0)
                return CheckResultEnum.INVALID_REG_INST_CODE;
            
            if(Integer.parseInt(birthday) == 0 || Integer.parseInt(num) == 0 || !DateUtil.isDate(getBirthDateBySsn(frgn),DateUtil.DATE_PATTERN))
                return CheckResultEnum.INVALID_BIRTHDAY;
            
            // registration type 7=Foreign nationality Koreans, 8=Foreigners residing in Korea , 9=Foreigners
            if(n6 != 7 && n6 != 8 && n6 != 9)
                return CheckResultEnum.INVALID_REG_TYPE;   
            
            int sum = 0;
            for(int i=0; i<6; i++) {
                int temp = Integer.parseInt(birthday.substring(i,i+1)) * (i+2);
                sum += temp;
            }
            
            // checks digits from 7th to 13th number
            sum += n1*8+n2*9+n3*2+n4*3+n5*4+n6*5;
            sum %= 11;
            sum = 11 - sum;
            
            if(sum >= 10)
            	sum -= 10;
            
            sum += 2;
            
            if(sum >= 10)
            	sum -= 10;
            
            if(sum == n7)      
                return CheckResultEnum.VALID;
            else
                return CheckResultEnum.INVALID_VALUE;          
        } else {
            return CheckResultEnum.INVALID_FORMAT;
        }
    }
	
	 /**
	 * Checks Foreigner's Passport Number.<br>
	 * <div class="ko">
     * 외국인 등록증 및 재외국인 국내거소신고증이 없는 경우, 여권번호를 기반으로 조합하여 부여되는
     * 번호의 유효성을 체크하여 체크결과를 return 한다. <br>
     * <pre>
     * 설명) 123456-ABCDEFG 
     * - 1~6 : 생년월일
     * - A : 성별
     * - B : 국적구분 (1:미국, 2:일본, 3:중국, 4:기타) 
     * - C~G : 여권번호 마지막 5자리 숫자
     * </pre>
     * 
	 * <pre>
	 * CheckResultEnum result = RegistrationNumberUtil.checkFrgnPassportNo("12345678912340");
	 * if(result == CheckResultEnum.VALID) {
	 *		debug("검증에 성공하였습니다.");
	 * } else {
	 *		debug("[오류유형] : " + result); // [오류유형] : 자릿수 오류 
	 * }
	 * <pre>
	 * </div>
     * 
     * @param frgn the foreigner's passport number
     * @return the validation result for the foreign passport number
     */
	public static CheckResultEnum checkFrgnByPassportNo(String frgn) {
		Assert.hasLength(frgn);
        
        // 등록번호 길이 체크
        if(frgn.length() == 13) {
            String birthday = frgn.substring(0,6);
            String num = frgn.substring(6,13);
            
            int n1 = 0;
            int n2 = 0;
            
        	n1 = Integer.parseInt(num.substring(0,1)); // 성별
        	n2 = Integer.parseInt(num.substring(1,2)); // 국적
            
            if(n1 != 5 && n1 != 6 && n1 != 7 && n1 != 8 )
                return CheckResultEnum.INVALID_GENDER_CODE;
            
            if(Integer.parseInt(birthday) == 0 || Integer.parseInt(num) == 0 ||!DateUtil.isDate(getBirthDateBySsn(frgn),DateUtil.DATE_PATTERN))
                return CheckResultEnum.INVALID_BIRTHDAY;

            // checks nationality (1:USA, 2:Japan, 3:China, 4:ohter country)
            if(n2 != 1 && n2 != 2 && n2 != 3 && n2 != 4)
                return CheckResultEnum.INVALID_NATIONAL_CODE;
               
            return CheckResultEnum.VALID;
        } else {
            return CheckResultEnum.INVALID_FORMAT;
        }
    }
	
	/**
	 * Checks if given social security number is female's.<br>
	 * <div class="ko">
	 * 입력된 주민등록번호로 여성인지 확인 <p>
	 * 
	 * <pre>
	 * (참고)
	 * 1 - 1900년대 출생한 남성
	 * 2 - 1900년대 출생한 여성
	 * 3 - 2000년대 출생한 남성
	 * 4 - 2000년대 출생한 여성
	 * 5 - 1900년대 출생한 외국인 남성(외국인등록번호)
	 * 6 - 1900년대 출생한 외국인 여성(외국인등록번호)
	 * 7 - 2000년대 출생한 외국인 남성(외국인등록번호)
	 * 8 - 2000년대 출생한 외국인 여성(외국인등록번호)
	 * 9 - 1800년대 출생한 남성
	 * 0 - 1800년대 출생한 여성
	 * </pre>
	 * </div>
	 * @param ssn the social security number
	 * @return true if gender code is female's code, false if not
	 */
	public static boolean isFemale(String ssn) {
		Assert.hasLength(ssn);
		
    	if(ssn.length() > 13) {
        	ssn = StringUtil.removeChar(ssn, '-');
        	ssn = ssn.trim();
        }
		int iGender = Integer.parseInt(ssn.substring(6,7)) % 2;
		return (iGender == 1) ? false : true;		
	}

	/**
	 * Checks if given social security number is male's.<br>
	 * <div class="ko">
	 * 입력된 주민등록번호로 남성인지 확인 <p>
	 * 
	 * <pre>
	 * (참고)
	 * 1 - 1900년대 출생한 남성
	 * 2 - 1900년대 출생한 여성
	 * 3 - 2000년대 출생한 남성
	 * 4 - 2000년대 출생한 여성
	 * 5 - 1900년대 출생한 외국인 남성(외국인등록번호)
	 * 6 - 1900년대 출생한 외국인 여성(외국인등록번호)
	 * 7 - 2000년대 출생한 외국인 남성(외국인등록번호)
	 * 8 - 2000년대 출생한 외국인 여성(외국인등록번호)
	 * 9 - 1800년대 출생한 남성
	 * 0 - 1800년대 출생한 여성
	 * </pre>
	 * </div>
	 * @param ssn the social security number
	 * @return true if gender code is male's code, false if not
	 */
	public static boolean isMale(String ssn) {
		return !isFemale(ssn);
	}
	
    /**
	 * Gets an birthdate with the social security number.<br>
	 * <div class="ko">
     * 주민번호를 기준으로 생년월일을 구한다.
	 * </div>
     * 
	 * @param ssn the social security number
     * @return birthdate (yyyyMMdd)
     */
    public static String getBirthDateBySsn(String ssn) {
		Assert.hasLength(ssn);
    	
    	if(ssn.length() > 13) {
        	ssn = StringUtil.removeChar(ssn, '-');
        	ssn = ssn.trim();
        }
    	
    	String birthDate   = null;
		birthDate   = ssn.substring(0, 6);
        int genderDigit = Integer.parseInt(ssn.substring(6, 7));

        // checks century
        // 5,6,7,8 : foreinger 
	    if(genderDigit == 3 || genderDigit == 4 || genderDigit == 7 || genderDigit == 8){ 
	    	birthDate = "20" + birthDate;	    	
	    } else {
	    	birthDate = "19" + birthDate;	    	
	    } 
    	
    	return birthDate;
    }
    
    /**
     * Enum Class for ssn check result. (Korean) 
     * 
     * @author Seonju Hong
     */
    public static enum CheckResultEnum {
    	/**
    	 * Success
    	 */
    	VALID("정상"),
    	/**
    	 * Error for gender code
    	 */
    	INVALID_GENDER_CODE("성별코드오류"),
    	/**
    	 * Error for birthdate format or value
    	 */
    	INVALID_BIRTHDAY("생년월일오류"),
    	/**
    	 * Error for format
    	 */
    	INVALID_FORMAT("자릿수오류"),
    	/**
    	 * Error for registration institute
    	 */
    	INVALID_REG_INST_CODE("등록기관오류"),
    	/** 
    	 * Error for registration type<br>
    	 * allowed registration types
    	 * (7=Foreign nationality Koreans, 8=Foreigners residing in Korea , 9=Foreigners)
    	 */
    	INVALID_REG_TYPE("등록자유형오류"),
    	/**
    	 * Error for verification result
    	 */
    	INVALID_VALUE("검증값오류"),
    	/**
    	 * Error for nationality
    	 */
    	INVALID_NATIONAL_CODE("국적구분오류");
    	
    	private String msg;
    	
    	private CheckResultEnum(String msg) {
    		this.msg = msg;
    	}
    	
    	/**
    	 * Converts message to String.<br>
    	 * <div class="ko">
    	 * 체크 결과에 대한 한글 메시지를 리턴한다.
    	 * </div>
    	 * @return string message by Korean  
    	 */
    	public String toString() {
    		return this.msg;
    	}
    }
}
