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

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Validation Utility Class <br>
 * Provides function that checks if a specific resident registration number,
 * business registration number, corporate registration number, or alien
 * registration number is valid in terms of format or regular expressions.
 * 
 * @author HyunJung Jeong
 */
public class ValidationUtil {

	private ValidationUtil() {
		throw new AssertionError();
	}

	/**
	 * Check if input resident registration number is valid.
	 * 
	 * @param regno
	 *            resident registration number
	 * @return if resident registration number is valid, return
	 *         <code>true</code>, if invalid, return <code>false</code>.
	 */
	public static boolean isResidentRegNumber(String regno) {
		String pattern = "^([0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01]))-([1|2|3|4][0-9]{6})$";
		if (!StringUtil.isRegexPatternMatch(regno, pattern)) {
			return false;
		}
		String replaceno = regno.replace("-", "");

		int sum = 0;
		int last = replaceno.charAt(12) - 0x30;
		String bases = "234567892345";

		for (int index = 0; index < 12; index++) {
			if (StringUtil.isEmpty(replaceno.substring(index, index + 1))) {
				return false;
			}
			sum += (replaceno.charAt(index) - 0x30)
					* (bases.charAt(index) - 0x30);
		}

		int mod = sum % 11;
		return ((11 - mod) % 10 == last) ? true : false;
	}

	/**
	 * Check if corporate registration number is valid.
	 * 
	 * @param corpNumber
	 *            corporate registration number
	 * @return if corporate registration number is valid, return
	 *         <code>true</code>, if invalid, return <code>false</code>.
	 */
	public static boolean isIncorpCertNumber(String corpNumber) {
		String pattern = "^((\\d{6})-(\\d{7}))$";

		if (!StringUtil.isRegexPatternMatch(corpNumber, pattern)) {
			return false;
		}
		String replaceno = corpNumber.replace("-", "");

		int checkSum = 0;

		for (int index = 0; index < 12; index++) {
			checkSum += (Character.getNumericValue(replaceno.charAt(index)) * ((index % 2 == 0) ? 1
					: 2));
		}

		if ((10 - (checkSum % 10)) % 10 == Character.getNumericValue(replaceno
				.charAt(12)))
			return true;
		else
			return false;
	}

	/**
	 * Check if input business registration number is valid.
	 * 
	 * @param bizNumber
	 *            business registration number
	 * @return if business registration number is valid, return
	 *         <code>true</code>, if invalid, return <code>false</code>.
	 */
	public static boolean isBizRegNumber(String bizNumber) {
		String pattern = "^((\\d{3})-(\\d{2})-(\\d{5}))$";

		if (!StringUtil.isRegexPatternMatch(bizNumber, pattern)) {
			return false;
		}
		String replaceno = bizNumber.replace("-", "");

		int checkSum = 0;
		int checkDigit[] = { 1, 3, 7, 1, 3, 7, 1, 3, 5 };

		for (int i = 0; i < 9; i++) {
			checkSum += (Character.getNumericValue(replaceno.charAt(i)) * checkDigit[i]);
		}

		checkSum += (Character.getNumericValue(replaceno.charAt(8)) * 5) / 10;

		if ((10 - (checkSum % 10)) % 10 == Character.getNumericValue(replaceno
				.charAt(9)))
			return true;
		else
			return false;
	}

	/**
	 * Check if input phone number is valid.
	 * 
	 * @param phoneNumber
	 *            phone number
	 * @return if phone number is valid, return <code>true</code>, if invalid,
	 *         return <code>false</code>.
	 */
	public static boolean isTelephoneNumber(String phoneNumber) {
		String pattern = "^\\d{2,4}-\\d{3,4}-\\d{4}$";

		if (!StringUtil.isRegexPatternMatch(phoneNumber, pattern)) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Check if input cell phone number is valid.
	 * 
	 * @param cellPhoneNumber
	 *            cell phone number
	 * @return if cell phone number is valid, return <code>true</code>, if
	 *         invalid, return <code>false</code>.
	 */
	public static boolean isCellphoneNumber(String cellPhoneNumber) {
		String pattern = "^(01(0|1|6|7|8|9))-\\d{3,4}-\\d{4}$";

		if (!StringUtil.isRegexPatternMatch(cellPhoneNumber, pattern)) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Check if input email address is valid.
	 * 
	 * @param email
	 *            email address
	 * @return if email address if valid, return <code>true</code>, if invalid,
	 *         return <code>false</code>.
	 */
	public static boolean isEmailAddress(String email) {
		String pattern = "([\\w-\\.]+)@((?:[\\w]+\\.)+)([a-zA-Z]{2,4})$";

		if (!StringUtil.isRegexPatternMatch(email, pattern)) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Check if input card number is valid.
	 * 
	 * @param cardNumber
	 *            card number
	 * @return if card number is valid, return <code>true</code>, if invalid,
	 *         return <code>false</code>.
	 */
	public static boolean isCardNumber(String cardNumber) {

		String pattern = "^\\d{4}[\\s\\-]?\\d{4}[\\s\\-]?\\d{4}[\\s\\-]?\\d{4}$";
		if (!StringUtil.isRegexPatternMatch(cardNumber, pattern)) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Check if string length exists between minimum and maximum length
	 * 
	 * @param str
	 *            string to be checked
	 * @param min
	 *            minimum length
	 * @param max
	 *            maximum length
	 * @return if string is between minimum and maximum length, return
	 *         <code>true</code>
	 */
	public static boolean isRangeLength(String str, int min, int max) {
		if (StringUtil.getLength(str) >= min
				&& StringUtil.getLength(str) <= max)
			return true;
		else
			return false;
	}

	/**
	 * Check if string length is between minimum and maximum length when
	 * calculated in bytes.
	 * 
	 * @param str
	 *            string to be checked
	 * @param min
	 *            minimum length
	 * @param max
	 *            maximum length
	 * @return if string is between minimum and maximum length, return
	 *         <code>true</code>
	 */
	public static boolean isRangeByteLength(String str, int min, int max) {
		if (StringUtil.getByteLength(str) >= min
				&& StringUtil.getByteLength(str) <= max)
			return true;
		else
			return false;
	}

	/**
	 * Perform escaping in advance so that metacharacters [\^$.|?*+() that are
	 * meaningfully used are not used in a way different from the user's
	 * intentions.
	 * 
	 * @param orgPattern
	 *            original string
	 * @return escaping string
	 */
	private static String regexMetaCharEscape(String orgPattern) {
		return orgPattern.replaceAll("([\\[\\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)])",
				"\\\\$1");
	}

	/**
	 * Check if letter matching format defined by user has come in.
	 * 
	 * <pre>
	 * ValidationUtil.isUserFormat(&quot;123-456&quot;, &quot;###-###&quot;) = true;
	 * ValidationUtil.isUserFormat(&quot;123.456&quot;, &quot;###.###&quot;) = true;
	 * </pre>
	 * 
	 * @param str
	 *            string to be checked
	 * @param pattern
	 *            user defined pattern
	 * @return in case of string matching pattern that is defined by user,
	 *         <code>true</code>
	 * @deprecated Use @link {@link StringUtil#isUserFormat(String)}
	 */
	@Deprecated
	public static boolean isUserFormat(String str, String pattern) {
		String metaChange = regexMetaCharEscape(pattern);
		String regexChange = metaChange.replaceAll("#", "\\\\d").replaceAll(
				"S", "[a-zA-Z]");
		return str.matches(regexChange);
	}

	/**
	 * Check if the entire pattern matches the formal input pattern.
	 * 
	 * <pre>
	 * ValidationUtil.isRegexPatternMatch(&quot;aaaaab&quot;, &quot;a*b&quot;) = true;
	 * ValidationUtil.isRegexPatternMatch(&quot;cabbbb&quot;, &quot;a*b&quot;) = false;
	 * </pre>
	 * 
	 * @param str
	 *            pattern to be checked
	 * @param pattern
	 *            regular expression pattern
	 * @return if the input string matches the formal pattern, <code>true</code>
	 * @deprecated Use @link {@link StringUtil#isRegexPatternMatch(String)}
	 */
	@Deprecated
	public static boolean isRegexPatternMatch(String str, String pattern) {
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(str);
		return m.matches();
	}

	/**
	 * Check if the input string matches the formal pattern. Change * to ..
	 * 
	 * <pre>
	 * ValidationUtil.isPatternMatching("abc-def', "*-*") 	= true
	 * ValidationUtil.isPatternMatching("abc", "*-*") 	    = false
	 * </pre>
	 * 
	 * @param str
	 *            pattern to be checked
	 * @param pattern
	 *            pattern String
	 * @return if the entered string matches the formal pattern,
	 *         <code>true</code>
	 * @deprecated Use @link {@link StringUtil#isUserFormat(String)}
	 */
	@Deprecated
	public static boolean isPatternMatching(String str, String pattern) {
		// if url has wild key, i.e. "*", convert it to ".*" so that we can
		// perform regex matching
		if (pattern.indexOf('*') >= 0) {
			pattern = pattern.replaceAll("\\*", ".*");
		}

		pattern = "^" + pattern + "$";

		return Pattern.matches(pattern, str);
	}

	/**
	 * Check if input string matches the given filter pattern. s of sken is
	 * special character. k is korean. e is english. n is number.
	 * 
	 * <pre>
	 * ValidationUtil.isPatternInclude(&quot;asdf@5456&quot;, &quot;s&quot;) = true;
	 * ValidationUtil.isPatternInclude(&quot;-&quot;, &quot;s&quot;) = true;
	 * ValidationUtil.isPatternInclude(&quot;한&quot;, &quot;k&quot;) = true;
	 * ValidationUtil.isPatternInclude(&quot;123가32&quot;, &quot;k&quot;) = true;
	 * ValidationUtil.isPatternInclude(&quot;asdfsdfsdf&quot;, &quot;e&quot;) = true;
	 * ValidationUtil.isPatternInclude(&quot;asdfs1dfsdf&quot;, &quot;e&quot;) = true;
	 * ValidationUtil.isPatternInclude(&quot;123123123&quot;, &quot;n&quot;) = true;
	 * ValidationUtil.isPatternInclude(&quot;asdfs1dfsdf&quot;, &quot;n&quot;) = true;
	 * </pre>
	 * 
	 * @param str
	 *            string to be checked
	 * @param param
	 *            filter pattern
	 * @return if input string pattern matches filter, <code>true</code>
	 * @deprecated Use @link {@link StringUtil#isPatternInclude(String)}
	 */
	@Deprecated
	public static boolean isPatternInclude(String str, String param) {

		if (param.indexOf("s") >= 0) {
			return isRegexPatternMatch(str, ".*[~!@\\#$%<>^&*\\()\\-=+_\\'].*");
		}
		if (param.indexOf("k") >= 0) {
			return isRegexPatternMatch(str, ".*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣].*");
		}
		if (param.indexOf("e") >= 0) {
			return isRegexPatternMatch(str, ".*[a-zA-Z].*");
		}
		if (param.indexOf("n") >= 0) {
			return isRegexPatternMatch(str, ".*\\d.*");
		}
		return true;
	}

	/**
	 * Check if some strings match pattern.
	 * 
	 * <pre>
	 * ValidationUtil.isRegexPatternInclude("cabbbb", "a*b"))  = true
	 * </pre>
	 * 
	 * @param str
	 *            string to be checked
	 * @param pattern
	 *            regular expression pattern
	 * @return if input sting matches the formal pattern, <code>true</code>
	 * @deprecated Use @link {@link StringUtil#isRegexPatternInclude(String)}
	 */
	@Deprecated
	public static boolean isRegexPatternInclude(String str, String pattern) {
		return isRegexPatternMatch(str, ".*" + pattern + ".*");
	}
}