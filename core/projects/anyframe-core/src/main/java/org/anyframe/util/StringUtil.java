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

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.util.HtmlUtils;

/**
 * String Utility Class
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 * @author HyunJung Jeong
 */
public class StringUtil {

	private StringUtil() {
		throw new AssertionError();
	}

	// ~ Static fields/initializers
	// =============================================

	private static final char[] alphas = new char[] { 'A', 'B', 'C', 'D', 'E',
			'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
			'S', 'T', 'U', 'X', 'Y', 'V', 'W', 'Z', 'a', 'b', 'c', 'd', 'e',
			'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
			's', 't', 'u', 'x', 'y', 'v', 'w', 'z' };

	public static final String DEFAULT_EMPTY_STRING = "";

	private static final Random generator = new Random(System
			.currentTimeMillis());

	// ~ Methods
	// ================================================================

	/** For UTF-8 character set, 1 byte code */
	private static final int ONE_BYTE = 0x00007F;

	/** For UTF-8 character set, 3 byte code */
	private static final int THREE_BYTE = 0x00FFFF;

	/** For UTF-8 character set, 2 byte code */
	private static final int TWO_BYTE = 0x0007FF;

	/**
	 * Appends spaces to Stringwith the input length. <br>
	 * <div class="ko"> 주어진 String에 주어진 길이만큼 공백 문자열을 붙인다. - 주어진 길이가 0보다 작을 경우
	 * 무시된다. </div>
	 * 
	 * ex) addSpace("12345", 5) => "12345     "
	 * 
	 * @param str
	 *            string to be modified
	 * @param length
	 *            length of spaces
	 * @return string that is appended with spaces
	 */
	public static String addSpace(String str, int length) {
		StringBuffer stringBuffer = new StringBuffer();
		if (str == null) {
			if (length <= 0) {
				return null;
			}
		} else {
			stringBuffer.append(str);
		}
		for (int j = 0; j < length; j++) {
			stringBuffer.append(' ');
		}
		return stringBuffer.toString();
	}

	/**
	 * Appends a string to string array. <br>
	 * <div class="ko"> 주어진 String[]에 하나의 String을 추가한다. </div>
	 * 
	 * ex) String[] test = {"aaa", "bbb", "ccc"}; addStringToArray(test, "ddd");
	 * 
	 * @param array
	 *            string array to be modified
	 * @param str
	 *            string to be appended
	 * @return string array that is appended with string
	 */
	public static String[] addStringToArray(String array[], String str) {
		String newArray[] = new String[array.length + 1];
		System.arraycopy(array, 0, newArray, 0, array.length);
		newArray[array.length] = str;
		return newArray;
	}

	/**
	 * Apply initial law to String. <br>
	 * <div class="ko"> 입력된 문자열에 두음법칙을 적용하여 반환한다.<br>
	 * 
	 * 1단계는 1번째 한글 문자 치환<br>
	 * 예) 라로량리림랑류뢰란 -> 나노양이임낭유뇌난<br>
	 * 2번째 한글 문자부터 치환<br>
	 * 례륭란률래로량락라님림련년니리륜랑룰린람녕령롱룡료립록류렬릉녀려뇨뉴렴념닉력루르론뢰 ->
	 * 예융난율내노양낙나임임연연이이윤낭울인남영영농용요입녹유열능여여요뉴염염익역누느논뇌<br>
	 * ex) applyInitialLaw("림업례제") => "임업예제" </div>
	 * 
	 * @param str
	 *            string to be modified
	 * @return string that is applied with initial law
	 */
	public static String applyInitialLaw(String str) {

		String[] fstPtnP = { "라", "로", "량", "리", "림", "랑", "류", "뢰", "란" };
		String[] fstPtnN = { "나", "노", "양", "이", "임", "낭", "유", "뇌", "난" };

		String[] sndPtnP = { "례", "륭", "란", "률", "래", "로", "량", "락", "라", "님",
				"림", "련", "년", "니", "리", "륜", "랑", "룰", "린", "람", "녕", "령",
				"롱", "룡", "료", "립", "록", "류", "렬", "릉", "녀", "려", "뇨", "뉴",
				"렴", "념", "닉", "력", "루", "르", "론", "뢰" };
		String[] sndPtnN = { "예", "융", "난", "율", "내", "노", "양", "낙", "나", "임",
				"임", "연", "연", "이", "이", "윤", "낭", "울", "인", "남", "영", "영",
				"농", "용", "요", "입", "녹", "유", "열", "능", "여", "여", "요", "뉴",
				"염", "염", "익", "역", "누", "느", "논", "뇌" };

		String outStr = "";
		String inStrAry[] = null;

		str = str.trim();

		int inStrSize = str.length();
		char[] chStrAry = str.toCharArray();

		// apply initial law to the first character
		if (inStrSize > 0) {
			inStrAry = new String[inStrSize];

			for (int i = 0; i < inStrSize; i++) {
				inStrAry[i] = String.valueOf(chStrAry[i]);
			}

			for (int i = 0; i < fstPtnP.length; i++) {
				if (inStrAry[0].compareTo(fstPtnP[i]) == 0) {
					inStrAry[0] = fstPtnN[i];
				}
				outStr = inStrAry[0];
			}
		}

		// apply initial law after the first character
		StringBuffer sb = new StringBuffer();

		if (inStrSize > 1) {
			inStrAry = new String[inStrSize];

			for (int i = 1; i < inStrSize; i++) {
				boolean isExsit = false;
				inStrAry[i] = String.valueOf(chStrAry[i]);

				for (int j = 0; j < sndPtnP.length; j++) {
					if (inStrAry[i].compareTo(sndPtnP[j]) == 0
							&& isExsit == false) {
						sb.append(sndPtnN[j]);
						isExsit = true;
					}
				}
				if (isExsit == false) {
					sb.append(inStrAry[i]);
				}
			}
			outStr += sb.toString();
		}
		return outStr;
	}

	/**
	 * Joins the elements of the provided array into a single String containing
	 * the provided list of elements. <div class="ko"> Object[]를 입력으로 받아
	 * ","(delimiter)로 각 element를 연결하여 String을 생성한다. - 주어진 Object[]가 null일 경우,
	 * null을 return한다. </div>
	 * 
	 * ex) String[] test = {"aaa", "bbb", "ccc"};
	 * arrayToCommaDelimitedString(test) => "aaa,bbb,ccc"
	 * 
	 * @param array
	 *            the array of values to join together
	 * @return the joined String that is seperatd by comma
	 */
	public static String arrayToCommaDelimitedString(Object array[]) {
		return arrayToDelimitedString(array, ",");
	}

	/**
	 * Joins the elements of the provided array into a single String containing
	 * the provided list of elements. <div class="ko"> Object[]를 입력으로 받아
	 * delimiter로 각 element를 연결하여 String을 생성한다. - 주어진 Object[]가 null일 경우, null을
	 * return한다. - delimiter가 null일 경우, delimiter 없이 연결하여 String을 return한다.
	 * </div>
	 * 
	 * ex) String[] test = {"aaa", "bbb", "ccc"};
	 * arrayToDelimitedString(test,",") => "aaa,bbb,ccc"
	 * 
	 * @param array
	 *            the array of values to join together
	 * @param delimiter
	 *            delimiter for conversioin
	 * @return the joined String
	 */
	public static String arrayToDelimitedString(Object array[], String delimiter) {
		if (array == null) {
			return null;
		}
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < array.length; i++) {
			if (i > 0 && delimiter != null) {
				sb.append(delimiter);
			}
			sb.append(array[i]);
		}
		return sb.toString();
	}

	/**
	 * Converts asterisk to space in a String. <div class="ko"> 입력인자로 전달된 문자열에
	 * '*'나 '**'가 있으면 공백으로 변환한다. </div>
	 * 
	 * ex) convertAsteriskToSpace("test**test") => "test  test"
	 * 
	 * @param str
	 *            string to be converted
	 * @return the converted string
	 */
	public static String asteriskToSpace(String str) {
		String target = "";
		target = str.replaceAll("\\*\\*", " ");
		target = target.replaceAll("\\*", " ");
		return target;
	}

	/**
	 * Changes case of first character in a String. <div class="ko"> 주어진 String의
	 * 첫번째 글자를 대문자나 소문자로 변환한다. </div>
	 * 
	 * ex) changeFirstCharacterCase(true, "abcd") => "Abcd"
	 * changeFirstCharacterCase(false, "ABCD") => "aBCD"
	 * 
	 * @param capitalize
	 *            flag for case (true : uppper case, false : lower case)
	 * @param str
	 *            string to be modified
	 * @return the modified string
	 */
	private static String changeFirstCharacterCase(boolean capitalize,
			String str) {
		int strLen;
		if (str == null || (strLen = str.length()) == 0) {
			return str;
		}
		StringBuffer buf = new StringBuffer(strLen);
		if (capitalize) {
			buf.append(Character.toUpperCase(str.charAt(0)));
		} else {
			buf.append(Character.toLowerCase(str.charAt(0)));
		}
		buf.append(str.substring(1));
		return buf.toString();
	}

	/**
	 * Joins the elements of the provided collection into a single String
	 * containing the provided list of elements with comma delimeter. <div
	 * class="ko"> Collection을 입력으로 받아 ","(delimiter)로 각 element를 연결하여 String을
	 * 생성한다. - 주어진 Collection이 null일 경우, null을 return한다. </div>
	 * 
	 * @param collection
	 *            the collection of values to join together
	 * @return the joined String that is seperatd by comma
	 */
	public static String collectionToCommaDelimitedString(
			Collection<String> collection) {
		return collectionToDelimitedString(collection, ",");
	}

	/**
	 * Joins the elements of the provided collection into a single String
	 * containing the provided list of elements with delimeter. <div class="ko">
	 * Collection을 입력으로 받아 delimiter로 각 element를 연결하여 String을 생성한다. - 주어진
	 * Collection이 null일 경우, null을 return한다. - delimiter가 null일 경우, delimiter 없이
	 * 연결하여 String을 return한다. </div>
	 * 
	 * @param collection
	 *            the collection of values to join together
	 * @param delimiter
	 *            delimiter for conversioin
	 * @return the joined String that is seperatd by delimeter
	 */
	public static String collectionToDelimitedString(
			Collection<String> collection, String delimiter) {
		if (collection == null) {
			return null;
		}
		StringBuffer sb = new StringBuffer();
		Iterator<String> it = collection.iterator();
		int i = 0;
		for (; it.hasNext(); sb.append(it.next())) {
			if (i++ > 0 && delimiter != null) {
				sb.append(delimiter);
			}
		}
		return sb.toString();
	}

	/**
	 * Converts a single String with comma delimiter to Set of String. <div
	 * class="ko"> 주어진 String에 대해서 ","(delimiter)를 이용하여 tokenize한 후 Set으로 뽑아낸다.
	 * - StringTokenizer를 이용하지 않고 처리하여, 연속된 delimiter 사이는 비어 있는 token으로 간주된다. -
	 * 주어진 String이 null일 경우, null을 return한다. </div>
	 * 
	 * @param str
	 *            the silgle String to convert
	 * @return Set of String values
	 */
	public static Set<String> commaDelimitedStringToSet(String str) {
		Set<String> set = new HashSet<String>();
		String tokens[] = commaDelimitedStringToStringArray(str);
		if (tokens == null) {
			return null;
		}
		for (int i = 0; i < tokens.length; i++) {
			set.add(tokens[i]);
		}
		return set;
	}

	/**
	 * Converts a single String with comma delimiter to string array. <div
	 * class="ko"> 주어진 String에 대해서 ","(delimiter)를 이용하여 tokenize한 후 String[]로
	 * 변환한다. - StringTokenizer를 이용하지 않고 처리하여, 연속된 delimiter 사이는 비어 있는 token으로
	 * 간주된다. - 주어진 String이 null일 경우, null을 return한다. </div> ex) String[] test;
	 * test = commaDelimitedStringToStringArray("aaa,bbb,ccc") => test[0]="aaa",
	 * test[1]="bbb"...
	 * 
	 * @param str
	 *            the silgle String to convert
	 * @return array of String values
	 */
	public static String[] commaDelimitedStringToStringArray(String str) {
		return delimitedStringToStringArray(str, ",");
	}

	/**
	 * Compare two words in lexicographical order. if the input string or string
	 * to compare with is <code>null</code>, return -1.
	 * 
	 * @param sourceStr
	 *            input string
	 * @param anotherStr
	 *            string to be compared with If return value is 0, the same
	 *            word, if it is under 0, the smaller one in lexicographical
	 *            order, if it is over 0, the bigger one in lexicographical
	 *            order.
	 * @see String#compareTo(String)
	 */
	public static int compareTo(String sourceStr, String anotherStr) {
		if (sourceStr == null || anotherStr == null) {
			return -1;
		}
		return sourceStr.compareTo(anotherStr);
	}

	/**
	 * Compare two words in lexicographical order. if the input string or string
	 * to compare with is <code>null</code>, return -1.
	 * 
	 * @param sourceStr
	 *            input string
	 * @param anotherStr
	 *            string to be compared with
	 * @return int If return value is 0, the same word, if it is under 0, the
	 *         smaller one in lexicographical order, if it is over 0, the bigger
	 *         one in lexicographical order.
	 * @see String#compareToIgnoreCase(String)
	 */
	public static int compareToIgnoreCase(String sourceStr, String anotherStr) {
		if (sourceStr == null || anotherStr == null) {
			return -1;
		}
		return sourceStr.compareToIgnoreCase(anotherStr);
	}

	/**
	 * 
	 * Checks that the String contains certain characters.
	 * 
	 * 
	 * A <code>null</code> String will return <code>false</code>. A
	 * <code>null</code> invalid character array will return <code>false</code>.
	 * An empty String ("") always returns false.
	 * 
	 * <pre>
	 * StringUtil.containsInvalidChars(null, *)       = false
	 * StringUtil.containsInvalidChars(*, null)       = false
	 * StringUtil.containsInvalidChars("", *)         = false
	 * StringUtil.containsInvalidChars("ab", "")      = false
	 * StringUtil.containsInvalidChars("abab", "xyz") = false
	 * StringUtil.containsInvalidChars("ab1", 'xyz")  = false
	 * StringUtil.containsInvalidChars("xbz", "xyz")  = true
	 * </pre>
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @param invalidChars
	 *            an array of invalid chars, may be null
	 * @return false if it contains none of the invalid chars, or is null
	 */
	public static boolean containsInvalidChars(String str, char[] invalidChars) {
		if (str == null || invalidChars == null) {
			return false;
		}
		int strSize = str.length();
		int validSize = invalidChars.length;
		for (int i = 0; i < strSize; i++) {
			char ch = str.charAt(i);
			for (int j = 0; j < validSize; j++) {
				if (invalidChars[j] == ch) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Checks that the String contains certain characters.
	 * 
	 * A <code>null</code> String will return <code>false</code>. A
	 * <code>null</code> invalid character array will return <code>false</code>.
	 * An empty String ("") always returns false.
	 * 
	 * <pre>
	 * StringUtil.containsInvalidChars(null, *)       = false
	 * StringUtil.containsInvalidChars(*, null)       = false
	 * StringUtil.containsInvalidChars("", *)         = false
	 * StringUtil.containsInvalidChars("ab", "")      = false
	 * StringUtil.containsInvalidChars("abab", "xyz") = false
	 * StringUtil.containsInvalidChars("ab1", "xyz")  = false
	 * StringUtil.containsInvalidChars("xbz", "xyz")  = true
	 * </pre>
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @param invalidChars
	 *            a String of invalid chars, may be null
	 * @return false if it contains none of the invalid chars, or is null
	 */
	public static boolean containsInvalidChars(String str, String invalidChars) {
		if (str == null || invalidChars == null) {
			return true;
		}
		return containsInvalidChars(str, invalidChars.toCharArray());
	}

	/**
	 * It returns true if string contains a sequence of the same character.
	 * 
	 * <pre>
	 * StringUtil.containsMaxSequence("password", "2") = true
	 * StringUtil.containsMaxSequence("my000", "3")    = true
	 * StringUtil.containsMaxSequence("abbbbc", "5")   = false
	 * </pre>
	 * 
	 * @param str
	 *            original String
	 * @param maxSeqNumber
	 *            a sequence of the same character
	 * @return which contains a sequence of the same character
	 */
	public static boolean containsMaxSequence(String str, String maxSeqNumber) {
		int occurence = 1;
		int max = NumberUtil.string2integer(maxSeqNumber);
		if (str == null) {
			return false;
		}

		int sz = str.length();
		for (int i = 0; i < (sz - 1); i++) {
			if (str.charAt(i) == str.charAt(i + 1)) {
				occurence++;

				if (occurence == max)
					return true;
			} else {
				occurence = 1;
			}
		}
		return false;
	}

	/**
	 * Convert a string that may contain underscores to camel case.
	 * 
	 * @param underScore
	 *            Underscore name.
	 * @return Camel case representation of the underscore string.
	 */
	public static String convertToCamelCase(String underscore) {
		return convertToCamelCase(underscore, '_');
	}

	/**
	 * Convert a camel case string to underscore representation.
	 * 
	 * @param camelCase
	 *            Camel case name.
	 * @return Underscore representation of the camel case string.
	 */
	public static String convertToCamelCase(String targetString, char posChar) {
		StringBuilder result = new StringBuilder();
		boolean nextUpper = false;
		String allLower = targetString.toLowerCase();

		for (int i = 0; i < allLower.length(); i++) {
			char currentChar = allLower.charAt(i);
			if (currentChar == posChar) {
				nextUpper = true;
			} else {
				if (nextUpper) {
					currentChar = Character.toUpperCase(currentChar);
					nextUpper = false;
				}
				result.append(currentChar);
			}
		}
		return result.toString();
	}

	/**
	 * Convert a camel case string to underscore representation.
	 * 
	 * @param camelCase
	 *            Camel case name.
	 * @return Underscore representation of the camel case string.
	 */
	public static String convertToUnderScore(String camelCase) {
		String result = "";
		for (int i = 0; i < camelCase.length(); i++) {
			char currentChar = camelCase.charAt(i);
			// This is starting at 1 so the result does not end up with an
			// underscore at the begin of the value
			if (i > 0 && Character.isUpperCase(currentChar)) {
				result = result.concat("_");
			}
			result = result.concat(Character.toString(currentChar)
					.toLowerCase());
		}
		return result;
	}

	/**
	 * Count the number of occurrences of pattern in a String. <div class="ko">
	 * 한 String 객체(sub)의 패턴이 다른 String 객체(main)안에서 몇 번 등장하는지 계산한다. - 등장 패턴의 위치는
	 * 좌측에서부터 계산하고 겹치지 않는 형태로 계산한다. + 예를 들어, "aa"는 "aaa"에서 두 번 등장하는 것이 아니라, 한 번
	 * 등장하는 것으로 계산한다. </div> ex) countPattern("aaa", "aa") => 1
	 * 
	 * @param str
	 *            the String to check
	 * @param pattern
	 *            the pattern to count
	 * @return the number of occurrences
	 */
	public static int countPattern(String str, String pattern) {
		if (str == null || pattern == null || "".equals(pattern)) {
			return 0;
		}
		int count = 0;
		int pos = 0;
		for (int index = 0; (index = str.indexOf(pattern, pos)) != -1;) {
			count++;
			pos = index + pattern.length();
		}
		return count;
	}

	/**
	 * Compare the first and second string. If they are the same, return the
	 * third string, and if they are different, return the fourth string.
	 * 
	 * @param source
	 *            value to compare.
	 * @param target
	 *            value that is compared against source
	 * @param result
	 *            value returned
	 * @param base
	 *            optional string
	 * @return String to be decoded
	 */
	public static String decode(String source, String target, String result,
			String base) {
		if (source == null && target == null) {
			return result;
		} else if (source == null && target != null) {
			return base;
		} else if (source.trim().equals(target)) {
			return result;
		}
		return base;
	}

	/**
	 * Removes all occurrences of characters from within the source string. <div
	 * class="ko"> 한 String 객체 안에서 특정 패턴 안에 포함된 모든 character들을 제거한다. </div> ex)
	 * deleteChars("zzAccBxx", "AB") => "zzccxx"
	 * 
	 * @param str
	 *            the source String to search
	 * @param chars
	 *            the char to search for and remove
	 * @return the substring with the char removed if found
	 */
	public static String deleteChars(String str, String chars) {
		if (str == null || chars == null) {
			return str;
		}
		String value = str;
		for (int i = 0; i < chars.length(); i++) {
			value = removeChar(value, chars.charAt(i));
		}
		return value;
	}

	/**
	 * Removes all occurrences of a substring from within the source string.
	 * <div class="ko"> 한 String 객체 안에서 특정 패턴을 제거한다. - 등장 패턴의 위치는 좌측에서부터 계산하고
	 * 겹치지 않는 형태로 계산한다. + 따라서, 제거된 후에도 old 패턴은 남아 있을 수 있다. + 예를 들어,
	 * deletePattern("aababa", "aba")는 "aba"가 된다. </div> ex)
	 * deletePattern("zzABCcc", "ABC") => "zzcc"
	 * 
	 * @param str
	 *            the source String to search
	 * @param pattern
	 *            the String to search for and remove
	 * @return the substring with the string removed if found
	 */
	public static String deletePattern(String str, String pattern) {
		return replacePattern(str, pattern, "");
	}

	/**
	 * Converts a single String with delimiter to string array. <div class="ko">
	 * - StringTokenizer를 이용하지 않고 처리하여, 연속된 delimiter 사이는 비어 있는 token으로 간주된다. -
	 * 주어진 String이 null일 경우, null을 return한다. - delimiter가 null일 경우, 주어진 String을
	 * 하나의 element로 가지는 String[]를 return한다. </div> ex) String[] test; test =
	 * delimitedStringToStringArray("aaa.bbb.ccc.ddd", "."); => test[0]="aaa",
	 * test[1]="bbb"...
	 * 
	 * @param str
	 *            the silgle String to convert
	 * @param delimiter
	 *            delimiter for conversioin
	 * @return array of String values
	 */
	public static String[] delimitedStringToStringArray(String str,
			String delimiter) {
		if (str == null) {
			return null;
		}
		if (delimiter == null) {
			return new String[] { str };
		}
		List<String> tokens = new ArrayList<String>();
		int pos = 0;
		for (int index = 0; (index = str.indexOf(delimiter, pos)) != -1;) {
			tokens.add(str.substring(pos, index));
			pos = index + delimiter.length();
		}
		if (pos <= str.length()) {
			tokens.add(str.substring(pos));
		}
		return tokens.toArray(new String[tokens.size()]);
	}

	/**
	 * Make a new String that filled original to a special char as ciphers
	 * 
	 * @param originalStr
	 *            original String
	 * @param ch
	 *            a special char
	 * @param ciphers
	 *            ciphers
	 * @return filled String
	 */
	public static String fillString(String originalStr, char ch, int ciphers) {
		int originalStrLength = originalStr.length();

		if (ciphers < originalStrLength)
			return null;

		int difference = ciphers - originalStrLength;

		StringBuilder strBuf = new StringBuilder();
		for (int i = 0; i < difference; i++)
			strBuf.append(ch);

		strBuf.append(originalStr);
		return strBuf.toString();
	}

	/**
	 * Return byte length for each letter of related character
	 * 
	 * @param charat
	 *            one English letter
	 * @return byte length of one related English letter
	 */
	public static int getByteLength(char charat) {
		int charCode = charat;

		if (charCode <= ONE_BYTE) {
			return 1;
		} else if (charCode <= TWO_BYTE) {
			return 2;
		} else if (charCode <= THREE_BYTE) {
			return 3;
		} else {
			return 4;
		}
	}

	/**
	 * Return total length of related string calculated in byte unit. If string
	 * is null, return -1.
	 * 
	 * @param str
	 *            input string
	 * @return int length of string
	 */
	public static int getByteLength(String str) {
		if (str == null) {
			return -1;
		}
		int size = 0;

		for (int i = 0; i < str.length(); i++) {
			size += getByteLength(str.charAt(i));
		}
		return size;
	}

	/**
	 * For given string, return number that includes related characters. If
	 * given string or character to be searched for is <code>null</code>, return
	 * -1.
	 * 
	 * @param str
	 *            input string
	 * @param chars
	 *            character arrangement to be searched for
	 * @return int number of strings included
	 */
	public static int getContainsCount(String str, char[] chars) {
		if (str == null || chars == null) {
			return -1;
		}
		int strSize = str.length();
		int validSize = chars.length;
		int check = 0;
		for (int i = 0; i < strSize; i++) {
			char ch = str.charAt(i);
			for (int j = 0; j < validSize; j++) {
				if (chars[j] == ch) {
					check += 1;
				}
			}
		}
		return check;
	}

	/**
	 * For the given string, return the number that includes the related string.
	 * 
	 * @param str
	 *            string to search in. Return 0 if this is null.
	 * @param sub
	 *            string to search for. Return 0 if this is null.
	 * @see org.springframework.util.StringUtils#countOccurrencesOf(String,
	 *      String)
	 */
	public static int getContainsCount(String str, String sub) {
		return org.springframework.util.StringUtils
				.countOccurrencesOf(str, sub);
	}

	/**
	 * 
	 * For given string regardless of upper case or lower case letters, return
	 * number that includes related characters. If given string or character to
	 * be searched for is <code>null</code>, return -1.
	 * 
	 * @param str
	 *            input string
	 * @param chars
	 *            string of characters to be searched for
	 * @return int number of strings included
	 */
	public static int getContainsCountIgnoreCase(String str, char[] chars) {
		char[] lowerChar = new char[chars.length];
		for (int j = 0; j < chars.length; j++) {
			String res = String.valueOf(chars[j]).toLowerCase();
			lowerChar[j] = res.charAt(0);
		}
		return getContainsCount(str.toLowerCase(), lowerChar);
	}

	/**
	 * For the given string, return the number that includes related string,
	 * regardless of upper case or lower case letters.
	 * 
	 * @param str
	 *            string to search in. Return 0 if this is null.
	 * @param sub
	 *            string to search for. Return 0 if this is null.
	 * @see org.springframework.util.StringUtils#countOccurrencesOf(String,
	 *      String)
	 */
	public static int getContainsCountIgnoreCase(String str, String sub) {
		return org.springframework.util.StringUtils.countOccurrencesOf(str
				.toLowerCase(), sub.toLowerCase());
	}

	/**
	 * For input string, cut an amount that is same as the length of the string,
	 * and return new string.
	 * 
	 * @param str
	 *            input string
	 * @param length
	 *            length of string
	 * @return amount of string that is the same as the defined length
	 */
	public static String getCutString(String str, int length) {
		String result = "";

		if (str != null) {
			if (getLength(str) > length)
				result = str.substring(0, length);
			else
				result = str;
		}
		return result;
	}

	/**
	 * Break a string into specific tokens and return a String of last location.<br>
	 * 
	 * <pre>
	 * StringUtil.getLastString(&quot;password*password*a*b*c&quot;, &quot;*&quot;) = &quot;c&quot;
	 * </pre>
	 * 
	 * @param origStr
	 *            original String
	 * @param strToken
	 *            specific tokens
	 * @return String of last location
	 */
	public static String getLastString(String origStr, String strToken) {
		StringTokenizer str = new StringTokenizer(origStr, strToken);
		String lastStr = "";
		while (str.hasMoreTokens()) {
			lastStr = str.nextToken();
		}
		return lastStr;
	}

	/**
	 * Return length of related string. If string is <code>null</code>, return
	 * -1.
	 * 
	 * @param str
	 *            input string
	 * @return int length of string
	 * @see String#length()
	 */
	public static int getLength(String str) {
		if (str == null) {
			return -1;
		}
		return str.length();
	}

	/**
	 * Return a specific length of random string.
	 * 
	 * @param count
	 *            the length of random string to be developed
	 * @return String random string
	 */
	public static String getRandomString(int count) {
		return randomAlphabetic(count);
	}

	/**
	 * Return random string of a defined length between specific alphabet
	 * character.
	 * 
	 * @param count
	 *            count the length of random string to be made
	 * @param startChar
	 *            the first letter of the random string being made
	 * @param endChar
	 *            the last letter of the random string being made
	 * @return String random string
	 */
	public static String getRandomString(int count, char startChar, char endChar) {
		int startInt = Integer.valueOf(startChar);
		int endInt = Integer.valueOf(endChar);

		int gap = endInt - startInt;
		StringBuilder buf = new StringBuilder();
		for (int i = 0; i < count; i++) {
			int chInt;
			do {
				chInt = StringUtil.generator.nextInt(gap + 1) + startInt;
			} while (!Character.toString((char) chInt).matches("^[a-zA-Z]$"));
			buf.append((char) chInt);
		}
		return buf.toString();
	}

	/**
	 * Return random string between minimum and maximum digits.
	 * 
	 * @param minSize
	 *            minimum digits
	 * @param maxSize
	 *            maximum digits
	 * @return String random string
	 */
	public static String getRandomString(int minSize, int maxSize) {
		Random generator = new Random(System.currentTimeMillis());
		int randomLength = generator.nextInt(maxSize - minSize) + minSize;

		return randomAlphabetic(randomLength);
	}

	/**
	 * Return a specific length of given character set string.
	 * 
	 * @param count
	 *            length of random string to be made
	 * @param charset
	 *            supported character set
	 * @return String random string
	 * @throws
	 */
	public static String getRandomStringByCharset(int count, String charset) {
		String randomStr = getRandomString(count);
		return DigestUtil.encodeCharset(randomStr, charset);
	}

	/**
	 * Return a specific length of random string in Korean characters (UTF-8
	 * only).
	 * 
	 * @param count
	 *            length of random string to be made
	 * @return String random string in Korean characters
	 * @throws UnsupportedEncodingException
	 */
	public static String getRandomStringByKorean(int count)
			throws UnsupportedEncodingException {
		StringBuilder buf = new StringBuilder();
		for (int i = 0; i < count; i++) {
			buf.append((char) (StringUtil.generator.nextInt(11172) + 0xAC00));
		}
		return buf.toString();
	}

	/**
	 * If original String has token, Break a string into specific tokens and
	 * change String Array. If not, return a String Array which has original
	 * String as it is.
	 * 
	 * <pre>
	 * StringUtil.getStringArray("passwordabcpassword", "abc") = String[]{"password","password"}
	 * StringUtil.getStringArray("pasword*password", "abc")    = String[]{"pasword*password"}
	 * </pre>
	 * 
	 * @param str
	 *            original String
	 * @param strToken
	 *            specific String token
	 * @return String[]
	 */
	public static String[] getStringArray(String str, String strToken) {
		if (str.indexOf(strToken) != -1) {
			StringTokenizer st = new StringTokenizer(str, strToken);
			String[] stringArray = new String[st.countTokens()];
			for (int i = 0; st.hasMoreTokens(); i++) {
				stringArray[i] = st.nextToken();
			}
			return stringArray;
		}
		return new String[] { str };
	}

	/**
	 * Return token list which is separated by ","
	 * 
	 * @param lst
	 * @return token list which is separated by ","
	 */
	public static List<String> getTokens(String lst) {
		return getTokens(lst, ",");
	}

	/**
	 * Return token list
	 * 
	 * @param lst
	 * @param separator
	 * @return token list
	 */
	public static List<String> getTokens(String lst, String separator) {
		List<String> tokens = new ArrayList<String>();

		if (lst != null) {
			StringTokenizer st = new StringTokenizer(lst, separator);
			while (st.hasMoreTokens()) {
				String en = st.nextToken().trim();
				tokens.add(en);
			}
		}
		return tokens;
	}

	/**
	 * Checks if String length is greater than zero. <div class="ko"> 주어진 String
	 * 객체가 0보다 큰 길이를 가지고 있는지 검사한다. </div> ex) "test" => true "" => false
	 * 
	 * @param str
	 *            the String to check
	 * @return true if String length is greater than zero, false if not or null
	 *         string input
	 */
	public static boolean hasLength(String inputString) {
		return inputString != null && inputString.length() > 0;
	}

	/**
	 * Checks if String contains no whitespace. <div class="ko"> 주어진 String 객체가
	 * Whitespace가 아닌 문자를 가지고 있는지 검사한다. - Whitespace의 판별 기준은,
	 * java.lang.Character를 기준으로 한다. </div> ex) hasText(" test ") => true
	 * hasText(" ") => false hasText("") => false
	 * 
	 * @param str
	 *            the String to check
	 * @return true if String contains no whitespace, false if not or null
	 *         string input
	 */
	public static boolean hasText(String str) {
		int strLen;
		if (str == null || (strLen = str.length()) == 0) {
			return false;
		}
		for (int i = 0; i < strLen; i++) {
			if (!Character.isWhitespace(str.charAt(i))) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Converts hex code to UniCode String <div class="ko"> 코드를 받아 문자열로 변환한다
	 * (유니코드) </div>
	 * 
	 * @param str
	 *            the String to convert
	 * @return UniCode String
	 */
	public static String hexToString(String str) {

		String inStr = str;
		char inChar[] = inStr.toCharArray();
		StringBuffer sb = new StringBuffer();

		for (int i = 0; i < inChar.length; i += 4) {
			String hex = str.substring(i, i + 4);
			sb.append((char) Integer.parseInt(hex, 16));
		}
		return sb.toString();
	}

	/**
	 * If the string that is searched for is included in the input string,
	 * return the index of the first string. If not found, return -1. If the
	 * input string or the string that is searched for is not null, return -1.
	 * 
	 * @param str
	 *            input string
	 * @param search
	 *            string that is searched for
	 * @return int index of the first string
	 * @see String#indexOf(String)
	 */
	public static int indexOf(String str, String search) {
		if (str == null || search == null) {
			return -1;
		}
		return str.indexOf(search);
	}

	/**
	 * If the string to be searched for is included in input string, regardless
	 * of upper case or lower case letters, return the first string. If not
	 * found, return -1. Even if the input string or string to be searched for
	 * is null, return -1.
	 * 
	 * @param str
	 *            input string
	 * @param search
	 *            string to be compared with
	 * @return index of the first string
	 * @see String#indexOf(String)
	 */
	public static int indexOfIgnoreCase(String str, String search) {
		if (str == null || search == null) {
			return -1;
		}
		return str.toLowerCase().indexOf(search.toLowerCase());
	}

	/**
	 * It converts integer type to String ( 27 -> '27')
	 * 
	 * <pre>
	 * StringUtil.integer2string(14) 	= '14'
	 * </pre>
	 * 
	 * @param integer
	 *            integer type
	 * @return String string representation of a number
	 */
	public static String integer2string(int integer) {
		return ("" + integer);
	}

	/**
	 * Checks if the String contains only unicode letters.
	 * 
	 * <code>null</code> will return <code>false</code>. An empty String ("")
	 * will return <code>false</code>.
	 * 
	 * <pre>
	 * StringUtil.isAlpha(null)   = false
	 * StringUtil.isAlpha("")     = false
	 * StringUtil.isAlpha("  ")   = false
	 * StringUtil.isAlpha("abc")  = true
	 * StringUtil.isAlpha("ab2c") = false
	 * StringUtil.isAlpha("ab-c") = false
	 * </pre>
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return <code>true</code> if only contains letters, and is non-null
	 */
	public static boolean isAlpha(String str) {
		if (str == null) {
			return false;
		}
		int sz = str.length();
		if (sz == 0)
			return false;
		for (int i = 0; i < sz; i++) {
			if (!Character.isLetter(str.charAt(i))) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Checks if the String contains only unicode letters or digits.
	 * 
	 * <code>null</code> will return <code>false</code>. An empty String ("")
	 * will return <code>false</code>.
	 * 
	 * <pre>
	 * StringUtil.isAlphaNumeric(null)   = false
	 * StringUtil.isAlphaNumeric("")     = false
	 * StringUtil.isAlphaNumeric("  ")   = false
	 * StringUtil.isAlphaNumeric("abc")  = true
	 * StringUtil.isAlphaNumeric("ab c") = false
	 * StringUtil.isAlphaNumeric("ab2c") = true
	 * StringUtil.isAlphaNumeric("ab-c") = false
	 * </pre>
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return <code>true</code> if only contains letters or digits, and is
	 *         non-null
	 */
	public static boolean isAlphaNumeric(String str) {
		if (str == null) {
			return false;
		}
		int sz = str.length();
		if (sz == 0)
			return false;
		for (int i = 0; i < sz; i++) {
			if (!Character.isLetterOrDigit(str.charAt(i))) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Checks if the String contains only digits. <div class="ko"> 주어진 String이
	 * '숫자'로만 구성되어 있는지를 판별한다. - 숫자인지의 판별은 Java의 기본 판별 기준을 준수한다. - 주어진 String이
	 * null일 경우, false를 return한다. </div> ex) isDigit("1234") => true
	 * isDigit("1234A")=> false
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return true if String contains only digits, false if not or null string
	 *         input
	 */
	public static boolean isDigit(String str) {
		if (str == null) {
			return false;
		}
		char chars[] = str.toCharArray();
		for (int i = 0; i < chars.length; i++) {
			if (!Character.isDigit(chars[i])) {
				return false;
			}
		}
		return true;
	}

	/**
	 * If string is null or empty string, return true. <br>
	 * If not, return false.
	 * 
	 * <pre>
	 * StringUtil.isEmpty("")    = true
	 * StringUtil.isEmpty(null)  = true
	 * StringUtil.isEmpty("abc") = false
	 * </pre>
	 * 
	 * @param str
	 *            original String
	 * @return which empty string or not.
	 */
	public static boolean isEmpty(String str) {
		return (str == null || str.length() == 0);
	}

	/**
	 * Determine whether a (trimmed) string is empty
	 * 
	 * @param str
	 *            The text to check.
	 * @return Whether empty.
	 */
	public static final boolean isEmptyTrimmed(String str) {
		return (str == null || str.trim().length() == 0);
	}

	/**
	 * Checks if the String contains the given pattern. <div class="ko"> 주어진
	 * String이 특정한 포맷으로 구성되었는지를 검사한다. </div>
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @param pattern
	 *            the pattern to check, may be null
	 * @return true if String contains the given pattern, false if not or null
	 *         string input
	 */
	public static boolean isFormattedString(String str, String pattern) {
		if (str == null || pattern == null) {
			return false;
		} else {
			return str.matches(pattern);
		}
	}

	/**
	 * Checks if the String contains only Korean characters. <div class="ko">
	 * 주어진 character가 한글인지의 여부를 판별한다. </div> ex) isHangul('가') => true
	 * isHangul('T') => false
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return true if the String contains only Korean Language, false if not
	 */
	public static boolean isHangul(char str) {
		String unicodeBlock = Character.UnicodeBlock.of(str).toString();
		return unicodeBlock.equals("HANGUL_JAMO")
				|| unicodeBlock.equals("HANGUL_SYLLABLES")
				|| unicodeBlock.equals("HANGUL_COMPATIBILITY_JAMO");
	}

	/**
	 * Checks if the String contains only Korean characters or any Korean
	 * characters. <div class="ko"> 주어진 String에 대해서, 한글로만 되어 있는지 혹은 한글이 포함되어
	 * 있는지를 판별한다. - full을 true로 설정할 경우, 한글로만 되어 있는지를 판별한다. + '한글로만 되어 있는지'는 영어나
	 * 기타 언어가 아님을 의미하는 것이 아니고, 숫자나 기타 기호 문자 등도 없음을 의미한다. - full을 false로 설정할 경우,
	 * 한글이 하나라도 포함되어 있는지를 판별한다. ex) isHangul("가나다", true) => true
	 * isHangul("가나다abc", true) => false isHangul("가abc", false) => true
	 * isHangul("abcd", false) => false </div>
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @param checkForAll
	 *            flag for check only Korean characters(true) or any Korean
	 *            characters(false)
	 * @return true if the String contains only Korean Language(when checkForAll
	 *         is true) or any Korean characters(when checkForAll is false),
	 *         false if not
	 */
	public static boolean isHangul(String str, boolean checkForAll) {
		char chars[] = str.toCharArray();
		if (!checkForAll) {
			for (int i = 0; i < chars.length; i++) {
				if (isHangul(chars[i])) {
					return true;
				}
			}
			return false;
		} else {
			for (int i = 0; i < chars.length; i++) {
				if (!isHangul(chars[i])) {
					return false;
				}
			}
			return true;
		}
	}

	/**
	 * Checks if the String contains only letters. <div class="ko"> 주어진 String이
	 * '문자'로만 구성되어 있는지를 판별한다. - 문자인지의 판별은 Java의 기본 판별 기준을 준수한다. - 주어진 String이
	 * null일 경우, false를 return한다. </div> ex) isLetter("test") => true
	 * isLetter("test가나")=> true isLetter("test#$%") => false
	 * isLetter("test123") => false
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return true if String contains only letters, false if not or null string
	 *         input
	 */
	public static boolean isLetter(String str) {
		if (str == null) {
			return false;
		}
		char chars[] = str.toCharArray();
		for (int i = 0; i < chars.length; i++) {
			if (!Character.isLetter(chars[i])) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Checks if the String contains only letters or digits. <div class="ko">
	 * 주어진 String이 '문자'나 '숫자'로만 구성되어 있는지를 판별한다. - 문자나 숫자인지의 판별은 Java의 기본 판별 기준을
	 * 준수한다. - 주어진 String이 null일 경우, false를 return한다. ex)
	 * isLetterOrDigit("12가나") => true isLetterOrDigit("12가나@#%")=> false </div>
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return true if String contains only letters or digits, false if not or
	 *         null string input
	 */
	public static boolean isLetterOrDigit(String str) {
		if (str == null) {
			return false;
		}
		char chars[] = str.toCharArray();
		for (int i = 0; i < chars.length; i++) {
			if (!Character.isLetterOrDigit(chars[i])) {
				return false;
			}
		}
		return true;
	}

	/**
	 * If string is null or empty string, return false. <br>
	 * If not, return true.
	 * 
	 * <pre>
	 * StringUtil.isNotEmpty("")    = false
	 * StringUtil.isNotEmpty(null)  = false
	 * StringUtil.isNotEmpty("abc") = true
	 * </pre>
	 * 
	 * @param str
	 *            original String
	 * @return which empty string or not.
	 */
	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
	}

	/**
	 * Checks if the String contains any letters except digits. <div class="ko">
	 * 입력인자로 전달된 문자열이 숫자가 아닌 문자가 포함되어있는지 여부를 리턴한다. <br>
	 * </div> ex) isNotNumeric("12345") => false isNumeric("12345ABC") => true
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return true if String contains any letters, false if not or null string
	 *         input
	 */
	public static boolean isNotNumeric(String str) {
		if (str == null) {
			return false;
		}
		int sz = str.length();
		for (int i = 0; i < sz; i++) {
			if (Character.isDigit(str.charAt(i)) == false) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Checks if the CharSequence contains only whitespace. <div class="ko"> 주어진
	 * String이 Space만을 가지고 있는지를 검사한다. - Space의 판별 기준은, String.trim()에서 제거되는 대상을
	 * 기준으로 한다. - 주어진 String이 null이면, false를 return한다. </div> ex) isSpace("   ")
	 * => true isSpace("") => true isSpace("test") => false
	 * 
	 * @param str
	 *            the String to check, may be null
	 * @return true if String contains only whitespace, false if not or null
	 *         string input
	 */
	public static boolean isSpaceOnly(String str) {
		if (str == null) {
			return false;
		} else {
			return str.trim().length() <= 0;
		}
	}

	/**
	 * Gets the leftmost len characters of a String. <div class="ko"> 주어진 String
	 * 객체에 대해서 주어진 길이만큼 왼쪽 부분을 떼어 반환한다. - 주어진 길이보다 주어진 String의 길이가 작을 경우에는 주어진
	 * String을 그대로 반환한다. - "..."을 붙이지 않는 점을 제외하고는 splitHead()와 동일하다. </div> ex)
	 * left("1234567", 3) => "123"
	 * 
	 * @param str
	 *            the String to get the leftmost characters from, may be null
	 * @param len
	 *            the length of the required String
	 * @return the leftmost characters, null if null String input
	 */
	public static String left(String str, int len) {
		if (str == null) {
			return null;
		} else if (len <= 0 || str.length() <= len) {
			return str;
		} else {
			return str.substring(0, len);
		}
	}

	/**
	 * For related string, fill the input length from the left with space.<br>
	 * 
	 * <pre>
	 * StringUtil.leftPad(null, *) = null
	 * StringUtil.leftPad("", 3) = "   "
	 * StringUtil.leftPad("bat", 3) = "bat"
	 * StringUtil.leftPad("bat", 5) = "  bat"
	 * StringUtil.leftPad("bat", 1) = "bat"
	 * StringUtil.leftPad("bat", -1) = "bat"
	 * </pre>
	 * 
	 * @param str
	 *            string to be modified
	 * @param size
	 *            size that includes letter for padding
	 * @return strings for padding <code>null</code> if null String input
	 */
	public static String leftPad(String str, int size) {
		return leftPad(str, size, ' ');
	}

	/**
	 * For related string, fill the input length from the left with defined
	 * letter.<br>
	 * 
	 * <pre>
	 * StringUtil.leftPad(null, *, *) = null
	 * StringUtil.leftPad("", 3, 'z') = "zzz"
	 * StringUtil.leftPad("bat", 3, 'z') = "bat"
	 * StringUtil.leftPad("bat", 5, 'z') = "zzbat"
	 * StringUtil.leftPad("bat", 1, 'z') = "bat"
	 * StringUtil.leftPad("bat", -1, 'z') = "bat"
	 * </pre>
	 * 
	 * @param str
	 *            string to be modified
	 * @param size
	 *            size that includes letter for padding
	 * @param padChar
	 *            letter to fill in
	 * @return string that is padded <code>null</code> if null String input
	 */
	public static String leftPad(String str, int size, char padChar) {
		return padChar(str, size, padChar, true);
	}

	/**
	 * For related string, fill the input length from the left with defined
	 * string.<br>
	 * 
	 * <pre>
	 * StringUtil.leftPad(null, *, *) = null
	 * StringUtil.leftPad("", 3, "z") = "zzz"
	 * StringUtil.leftPad("bat", 3, "yz") = "bat"
	 * StringUtil.leftPad("bat", 5, "yz") = "yzbat"
	 * StringUtil.leftPad("bat", 8, "yz") = "yzyzybat"
	 * StringUtil.leftPad("bat", 1, "yz") = "bat"
	 * StringUtil.leftPad("bat", -1, "yz") = "bat"
	 * StringUtil.leftPad("bat", 5, null) = "  bat"
	 * StringUtil.leftPad("bat", 5, "") = "  bat"
	 * </pre>
	 * 
	 * @param str
	 *            string to be modified
	 * @param size
	 *            size that includes letter for padding
	 * @param padStr
	 *            letter to fill in
	 * @return string that is padded <code>null</code> if null String input
	 */
	public static String leftPad(String str, int size, String padStr) {
		return padString(str, size, padStr, true);
	}

	/**
	 * Delete the space string on the left of the string.
	 * 
	 * @param str
	 *            input string
	 * @return string that deleted spaces
	 * @see org.springframework.util.StringUtils#trimLeadingWhitespace(String)
	 */
	public static String leftTrim(String str) {
		return org.springframework.util.StringUtils.trimLeadingWhitespace(str);
	}

	/**
	 * Converts CR/LF characters to a space in a String. <div class="ko">
	 * CRLF(newLine)가 포함된 문자열을 입력인자로 받아 CRLF(개행문자)를 SPACE로 변환하여 리턴한다. </div> ex)
	 * newLineToSpace("\r\ntest") => " test"
	 * 
	 * @param str
	 *            the String to convert
	 * @return the converted string
	 */
	public static String newLineToSpace(String str) {
		String output;

		output = str.replace("\r\n", " ");

		return output;
	}

	/**
	 * Trim the original string. If the original string is null or string length
	 * size is zero, return the empty string.
	 * 
	 * @param org
	 *            original string
	 * @return trimmed string
	 */
	public static String null2str(String org) {
		return null2str(org, "");
	}

	/**
	 * Trim the original string. If the original string is null or string length
	 * size is zero, return the converted string.
	 * 
	 * @param org
	 *            original string
	 * @param converted
	 *            converted string
	 * @return trimmed string
	 */
	public static String null2str(String org, String converted) {
		if (org == null || org.trim().length() == 0) {
			return converted;
		} else {
			return org.trim();
		}
	}

	/**
	 * Returns empty string if the given String is null, returns given String if
	 * not. <div class="ko"> 주어진 String 객체를 검사하여 null일 경우 "" 을 반환하고, 아니면 원본을
	 * 반환한다. </div> ex) nullToEmpty("test") => "test" String test = null;
	 * nullToEmpty(test) => ""
	 * 
	 * @param str
	 *            the String to check
	 * @return empty string if the given String is null, given string if not
	 */
	public static String nullToEmpty(String str) {
		if (str == null || str.length() <= 0) {
			return DEFAULT_EMPTY_STRING;
		} else {
			return str;
		}
	}

	/**
	 * Converts double to String with the given format. <div class="ko"> double
	 * 형태의 숫자를 받아서, 주어진 10진수 포맷의 String으로 변환한다. - java.text.DecimalFormat을 사용하여
	 * 처리한다. - 예를 들어, 5277095325298.2523이라는 값에 "###,###.##"이라는 포맷을 적용하면
	 * "5,277,095,325,298.25"로 변환된다. - 그러나, 5277095325298.2523이라는 값에
	 * "###,###.####"이라는 포맷을 적용하면 "5,277,095,325,298.252"로 변환된다. - 마찬가지로
	 * 111115277095325298.2523이라는 값에 "###,###.##"이라는 포맷을 적용하면
	 * "111,115,277,095,325,296"로 변환된다. - 이것은, Java에서의 double 한계에 기인한 것이다.
	 * </div> ex) numberFormat(12345.67d, "###,###.#") => "12,345.7"
	 * 
	 * @param d
	 *            the double value to convert
	 * @param format
	 *            decimal format for conversion
	 * @return the converted string
	 */
	public static String numberFormat(double d, String format) {
		DecimalFormat decimalformat = new DecimalFormat(format);
		return decimalformat.format(d);
	}

	/**
	 * Converts float to String with the given format. <div class="ko"> float
	 * 형태의 숫자를 받아서, 주어진 10진수 포맷의 String으로 변환한다. - java.text.DecimalFormat을 사용하여
	 * 처리한다. - Java에서의 float 한계에 유의한다. </div> ex) numberFormat(12345.67f,
	 * "###,###.#") => "12,345.7"
	 * 
	 * @param f
	 *            the float value to convert
	 * @param format
	 *            decimal format for conversion
	 * @return the converted string
	 */
	public static String numberFormat(float f, String format) {
		DecimalFormat decimalformat = new DecimalFormat(format);
		return decimalformat.format(f);
	}

	/**
	 * Converts int to String with the given format. <div class="ko"> int 형태의
	 * 숫자를 받아서, 주어진 10진수 포맷의 String으로 변환한다. - java.text.DecimalFormat을 사용하여
	 * 처리한다. - Java에서의 int 한계에 유의한다. </div> ex) numberFormat(12345, "###,###")
	 * => "12,345"
	 * 
	 * @param i
	 *            the int value to convert
	 * @param format
	 *            decimal format for conversion
	 * @return the converted string
	 */
	public static String numberFormat(int i, String format) {
		DecimalFormat decimalformat = new DecimalFormat(format);
		return decimalformat.format(i);
	}

	/**
	 * Converts long to String with the given format. <div class="ko"> long 형태의
	 * 숫자를 받아서, 주어진 10진수 포맷의 String으로 변환한다. - java.text.DecimalFormat을 사용하여
	 * 처리한다. - Java에서의 long 한계에 유의한다. </div> ex) numberFormat(12345.67L,
	 * "###,###.#") => "12,345.7"
	 * 
	 * @param l
	 *            the long value to convert
	 * @param format
	 *            decimal format for conversion
	 * @return the converted string
	 */
	public static String numberFormat(long l, String format) {
		DecimalFormat decimalformat = new DecimalFormat(format);
		return decimalformat.format(l);
	}

	/**
	 * Converts short to String with the given format. <div class="ko"> short
	 * 형태의 숫자를 받아서, 주어진 10진수 포맷의 String으로 변환한다. - java.text.DecimalFormat을 사용하여
	 * 처리한다. - Java에서의 short 한계에 유의한다. </div> ex) numberFormat(12345, "###,###")
	 * => "12,345"
	 * 
	 * @param s
	 *            the short value to convert
	 * @param format
	 *            decimal format for conversion
	 * @return the converted string
	 */
	public static String numberFormat(short s, String format) {
		DecimalFormat decimalformat = new DecimalFormat(format);
		return decimalformat.format(s);
	}

	/**
	 * Returns the default Object if the given Object is null. <div class="ko">
	 * 주어진 Object가 null이 아닐 경우 그 Object를 반환하고, null일 경우 default Object를 반환한다.
	 * </div> ex) String test = null; System.out.println(nvl(test, "NULL TEST"))
	 * => "NULL TEST"
	 * 
	 * String test = "test"; System.out.println(nvl(test, "NULL TEST")) =>
	 * "test"
	 * 
	 * @param inputObject
	 *            the Object to check
	 * @param defaultObject
	 *            the default Object
	 * @return Returns the default Object if the given Object is null, returns
	 *         the given Object if not
	 */
	public static Object nvl(Object inputObject, Object defaultObject) {
		return inputObject != null ? inputObject : defaultObject;
	}

	/**
	 * Returns the default String if the given String is null. <div class="ko">
	 * 주어진 String이 null이 아닐 경우 그 String을 반환하고, null일 경우 default String을 반환한다.
	 * </div> ex) String test = null; System.out.println(nvl(test, "NULL TEST"))
	 * => "NULL TEST"
	 * 
	 * String test = "test"; System.out.println(nvl(test, "NULL TEST")) =>
	 * "test"
	 * 
	 * @param inputString
	 *            the String to check
	 * @param defaultString
	 *            the default String
	 * @return Returns the default String if the given String is null, returns
	 *         the given String if not
	 */
	public static String nvl(String inputString, String defaultString) {
		return (String) nvl((Object) inputString, (Object) defaultString);
	}

	private static String padChar(String str, int size, char padChar,
			boolean isLeft) {
		if (str == null) {
			return null;
		}
		int originalStrLength = str.length();

		if (size < originalStrLength)
			return str;

		int difference = size - originalStrLength;

		StringBuilder strBuf = new StringBuilder();
		if (!isLeft) {
			strBuf.append(str);
		}

		for (int i = 0; i < difference; i++)
			strBuf.append(padChar);

		if (isLeft) {
			strBuf.append(str);
		}

		return strBuf.toString();
	}

	/**
	 * Gets the String with a specified character. Pad to a size of size <div
	 * class="ko"> 특정한 문자(char)와 일정한 길이 값을 입력으로 받아 해당 크기만큼 문자가 반복되는 문자열을 생성한다. -
	 * padding(5, 'e') => "eeeee". - 주어진 길이 값이 0이면 => "". - 주어진 길이 값이 0보다 작으면 =>
	 * null. - padding(5, '가') => "가가가가가". - length는 String.getBytes().length
	 * 기준이 아닌 String.length() 기준임을 유의한다. </div> ex) padding(5, 'e') => "eeeee"
	 * 
	 * @param size
	 *            the length to pad to
	 * @param padChar
	 *            the character to pad with
	 * @return padded String
	 */
	public static String padding(int size, char padChar) {
		if (size < 0) {
			return null;
		}
		StringBuffer buffer = new StringBuffer(size);
		for (int i = 0; i < size; i++) {
			buffer.insert(i, padChar);
		}
		return buffer.toString();
	}

	private static String padString(String str, int size, String padStr,
			boolean isLeft) {
		if (str == null) {
			return null;
		}
		int originalStrLength = str.length();

		if (size < originalStrLength)
			return str;

		int difference = size - originalStrLength;

		String tempPad = "";
		if (difference > 0) {
			if (padStr == null || "".equals(padStr)) {
				padStr = " ";
			}
			do {
				for (int j = 0; j < padStr.length(); j++) {
					tempPad += padStr.charAt(j);
					if (str.length() + tempPad.length() >= size) {
						break;
					}
				}
			} while (difference > tempPad.length());
			if (isLeft) {
				str = tempPad + str;
			} else {
				str = str + tempPad;
			}
		}

		return str;
	}

	/**
	 * Normalize the path String. <div class="ko"> String으로 표현된 path 정보를 표준화한다.
	 * - 주어진 path 정보 String에 대해서, "\\"로 표현된 path delimiter를 "/"로 변환하고 상대 경로를 절대
	 * 경로로 바꾼다. - 주어진 path 정보 String일 경우, null을 return한다. </div> ex)
	 * pathClean("../aaaa\\bbbb\\cccc\\dddd") => "aaaa/bbbb/cccc/dddd"
	 * 
	 * @param path
	 *            the path String to normalize
	 * @return the normalized path String
	 */
	public static String pathClean(String path) {
		if (path == null) {
			return null;
		}
		String p = replacePattern(path, "\\", "/");
		String pArray[] = delimitedStringToStringArray(p, "/");
		List<String> pList = new LinkedList<String>();
		int tops = 0;
		for (int i = pArray.length - 1; i >= 0; i--) {
			if (".".equals(pArray[i])) {
				continue;
			} else if ("..".equals(pArray[i])) {
				tops++;
				continue;
			}
			if (tops > 0) {
				tops--;
			} else {
				pList.add(0, pArray[i]);
			}
		}
		return collectionToDelimitedString(pList, "/");
	}

	/**
	 * Compare both path String after nomalization. <div class="ko"> 주어진 두 개의
	 * path 정보 String에 대해서, 표준화 후 같은 경로인지를 판별한다. - 주어진 정보가 null인 경우에도 판별한다. (둘 다
	 * null일 경우, true return.) </div> ex)
	 * pathEquals("../aaaa\\bbbb\\cccc\\dddd", "aaaa/bbbb/cccc/dddd") => true
	 * 
	 * @param path1
	 *            the path String to compare
	 * @param path2
	 *            the path String to compare
	 * @return true if the path Strings are equel, false if not or both null
	 */
	public static boolean pathEquals(String path1, String path2) {
		if (path1 == null) {
			if (path2 == null) {
				return true;
			} else {
				return false;
			}
		}
		return pathClean(path1).equals(pathClean(path2));
	}

	private static String randomAlphabetic(int randomLength) {
		StringBuilder buf = new StringBuilder();
		for (int i = 0; i < randomLength; i++) {
			buf.append(alphas[StringUtil.generator.nextInt(52)]);
		}
		return buf.toString();
	}

	/**
	 * For input strings, remove all strings to be deleted.
	 * 
	 * @param str
	 *            input string
	 * @param charsToDelete
	 *            string to be deleted
	 * @return String deleted string
	 * @see org.springframework.util.StringUtils#deleteAny(String, String)
	 */
	public static String removeAll(String str, String charsToDelete) {
		return org.springframework.util.StringUtils.deleteAny(str,
				charsToDelete);
	}

	/**
	 * Removes all occurrences of a character from within the source string.
	 * <div class="ko"> 한 String 객체 안에서 주어진 문자(char)를 제거한다. </div> ex)
	 * removeChar("ABBBBBC", 'B') => "AC"
	 * 
	 * @param str
	 *            the source String to search
	 * @param remove
	 *            the char to search for and remove
	 * @return the substring with the char removed if found
	 */
	public static String removeChar(String str, char remove) {
		return replacePattern(str, String.valueOf(remove), "");
	}

	/**
	 * Removes all occurrences of specified characters from within the source
	 * string.<br>
	 * specified characters : + { '/', '-', ':', ',', '.', '%' }<br>
	 * <div class="ko"> 한 String 객체 안에서 특정 문자들을 제거한다. - 제거할 대상 문자는 다음과 같다. + {
	 * '/', '-', ':', ',', '.', '%' } </div> ex) removeCharAll("test/-") =>
	 * "test"
	 * 
	 * @param str
	 *            the source String to search
	 * @return the substring with specified chars removed if found
	 */
	public static String removeCharAll(String str) {
		char[] targetCharacters = { '/', '-', ':', ',', '.', '%' };
		return removeCharAll(str, targetCharacters);
	}

	/**
	 * Removes all occurrences of given chars from within the source string.<br>
	 * <div class="ko"> 한 String 객체 안에서 주어진 문자들을 제거한다. ex) char[] ch = new
	 * char[2]; ch[0] = 'b'; ch[1] = 'z'; removeCharAll("AbbzzB", ch)) => "AB"
	 * </div>
	 * 
	 * @param str
	 *            the source String to search
	 * @param remove
	 *            chars to search for (case insensitive) and remove
	 * @return the substring with given chars removed if found
	 */
	public static String removeCharAll(String str, char[] remove) {
		String value = str;
		for (int i = 0; i < remove.length; i++) {
			value = removeChar(value, remove[i]);
		}
		return value;
	}

	/**
	 * Input string to HTML tag format.
	 * 
	 * @param input
	 *            the (escaped) input string
	 * @return the unescaped string
	 * @see HtmlUtils#htmlUnescape(String)
	 */
	public static String removeEscapeChar(String input) {
		return HtmlUtils.htmlUnescape(input);
	}

	/**
	 * Delete all space strings.
	 * 
	 * @param str
	 *            input string
	 * @return string that deleted space
	 * @see org.springframework.util.StringUtils#trimAllWhitespace(String)
	 */
	public static String removeWhitespace(String str) {
		return org.springframework.util.StringUtils.trimAllWhitespace(str);
	}

	/**
	 * replace replaced string to specific string from original string. <br>
	 * 
	 * <pre>
	 * StringUtil.replace(&quot;work$id&quot;, &quot;$&quot;, &quot;.&quot;) = &quot;work.id&quot;
	 * </pre>
	 * 
	 * @param str
	 *            original String
	 * @param replacedStr
	 *            to be replaced String
	 * @param replaceStr
	 *            replace String
	 * @return converting result
	 */
	public static String replace(String str, String replacedStr,
			String replaceStr) {
		String newStr = "";
		if (str.indexOf(replacedStr) != -1) {
			String s1 = str.substring(0, str.indexOf(replacedStr));
			String s2 = str.substring(str.indexOf(replacedStr) + 1);
			newStr = s1 + replaceStr + s2;
		}
		return newStr;
	}

	/**
	 * Replaces each substring of this string that matches the given regular
	 * expression with the given replacement.
	 * 
	 * @param source
	 *            input string
	 * @param regex
	 *            regular expression
	 * @param replacement
	 *            given replacement
	 * @return changed string
	 * @see String#replaceAll(String, String)
	 */
	public static String replaceAll(String source, String regex,
			String replacement) {
		if (source == null) {
			return null;
		}
		return source.replaceAll(regex, replacement);
	}

	/**
	 * Replaces the first substring of this string that matches the given
	 * regular expression with the given replacement.
	 * 
	 * @param source
	 *            input string
	 * @param regex
	 *            regular expression
	 * @param replacement
	 *            given replacement
	 * @return changed string
	 * @see String#replaceFirst(String, String)
	 */
	public static String replaceFirst(String source, String regex,
			String replacement) {
		if (source == null) {
			return null;
		}
		return source.replaceFirst(regex, replacement);
	}

	/**
	 * Unescape string that includes HTML tag.
	 * 
	 * @param input
	 *            the (unescaped) input string
	 * @return the escaped string
	 * @see HtmlUtils#htmlEscape(String)
	 */
	public static String replaceHtmlEscape(String input) {
		return HtmlUtils.htmlEscape(input);
	}

	/**
	 * Replaces the last substring of this string that matches the given regular
	 * expression with the given replacement.
	 * 
	 * @param source
	 *            input string
	 * @param regex
	 *            regular expression
	 * @param replacement
	 *            given replacement
	 * @return changed string
	 */
	public static String replaceLast(String source, String regex,
			String replacement) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(source);
		if (!matcher.find()) {
			return source;
		}
		int lastMatchStart = 0;
		do {
			lastMatchStart = matcher.start();
		} while (matcher.find());
		matcher.find(lastMatchStart);
		StringBuffer sb = new StringBuffer(source.length());
		matcher.appendReplacement(sb, replacement);
		matcher.appendTail(sb);
		return sb.toString();
	}

	/**
	 * Replaces all occurrences of a String within another String. <div
	 * class="ko"> 한 String 객체 안에서 특정 패턴(old)을 다른 패턴(new)으로 변환한다. - 등장 패턴의 위치는
	 * 좌측에서부터 계산하고 겹치지 않는 형태로 계산한다. + 따라서, 변환된 후에도 old 패턴은 남아 있을 수 있다. + 예를 들어,
	 * replace("abaa", "aba", "bab")는 "baba"가 된다. </div> ex)
	 * replacePattern("abaa", "aba", "bab") => "baba"
	 * 
	 * @param text
	 *            text to search and replace in, may be null
	 * @param searchString
	 *            the String to search for, may be null
	 * @param replacement
	 *            the String to replace it with, may be null
	 * @return the text with any replacements processed, null if null String
	 *         input
	 */
	public static String replacePattern(String text, String searchString,
			String replacement) {
		if (text == null) {
			return null;
		}
		if (searchString == null || replacement == null) {
			return text;
		}
		StringBuffer sbuf = new StringBuffer();
		int pos = 0;
		int index = text.indexOf(searchString);
		int patLen = searchString.length();
		for (; index >= 0; index = text.indexOf(searchString, pos)) {
			sbuf.append(text.substring(pos, index));
			sbuf.append(replacement);
			pos = index + patLen;
		}
		sbuf.append(text.substring(pos));
		return sbuf.toString();
	}

	/**
	 * Reverses a String as per {@link StringBuffer#reverse()}.
	 * 
	 * <A code>null</code> String returns <code>null</code>.
	 * 
	 * @param str
	 *            the String to reverse, may be null
	 * @return the reversed String, <code>null</code> if null String input
	 */
	public static String reverse(String str) {
		if (str == null) {
			return null;
		}
		return new StringBuilder(str).reverse().toString();
	}

	/**
	 * Gets the rightmost len characters of a String. <div class="ko"> 주어진
	 * String 객체에 대해서 주어진 길이만큼 오른쪽 부분을 떼어 반환한다. - 주어진 길이보다 주어진 String의 길이가 작을
	 * 경우에는 주어진 String을 그대로 반환한다. - "..."을 붙이지 않는 점을 제외하고는 splitTail()와 동일하다.
	 * </div> ex) right("1234567", 3) => "567"
	 * 
	 * @param str
	 *            the String to get the rightmost characters from, may be null
	 * @param len
	 *            the length of the required String
	 * @return the rightmost characters, null if null String input
	 */
	public static String right(String str, int len) {
		if (str == null) {
			return null;
		} else if (len <= 0 || str.length() <= len) {
			return str;
		} else {
			return str.substring(str.length() - len);
		}
	}

	/**
	 * For related string, fill the input length from the right with space.<br>
	 * 
	 * <pre>
	 * StringUtil.rightPad(null, *) = null
	 * StringUtil.rightPad("", 3) = "   "
	 * StringUtil.rightPad("bat", 3) = "bat"
	 * StringUtil.rightPad("bat", 5) = "bat  "
	 * StringUtil.rightPad("bat", 1) = "bat"
	 * StringUtil.rightPad("bat", -1) = "bat"
	 * </pre>
	 * 
	 * @param str
	 *            string to be modified
	 * @param size
	 *            size that includes letter for padding
	 * @return string that is padded <code>null</code> if null String input
	 */
	public static String rightPad(String str, int size) {
		return rightPad(str, size, ' ');
	}

	/**
	 * For related string, fill the input length from the right with defined
	 * letter.<br>
	 * 
	 * <pre>
	 * StringUtil.rightPad(null, *, *) = null
	 * StringUtil.rightPad("", 3, 'z') = "zzz"
	 * StringUtil.rightPad("bat", 3, 'z') = "bat"
	 * StringUtil.rightPad("bat", 5, 'z') = "batzz"
	 * StringUtil.rightPad("bat", 1, 'z') = "bat"
	 * StringUtil.rightPad("bat", -1, 'z') = "bat"
	 * </pre>
	 * 
	 * @param str
	 *            string to be modified
	 * @param size
	 *            size that includes letter for padding
	 * @param padChar
	 *            letter for padding
	 * @return string that is padded <code>null</code> if null String input
	 */
	public static String rightPad(String str, int size, char padChar) {
		return padChar(str, size, padChar, false);
	}

	/**
	 * For related string, fill the input length from the right with defined
	 * string.<br>
	 * 
	 * <pre>
	 * StringUtil.rightPad(null, *, *) = null
	 * StringUtil.rightPad("", 3, "z") = "zzz"
	 * StringUtil.rightPad("bat", 3, "yz") = "bat"
	 * StringUtil.rightPad("bat", 5, "yz") = "batyz"
	 * StringUtil.rightPad("bat", 8, "yz") = "batyzyzy"
	 * StringUtil.rightPad("bat", 1, "yz") = "bat"
	 * StringUtil.rightPad("bat", -1, "yz") = "bat"
	 * StringUtil.rightPad("bat", 5, null) = "bat  "
	 * StringUtil.rightPad("bat", 5, "") = "bat  "
	 * </pre>
	 * 
	 * @param str
	 *            the String to pad out, may be null
	 * @param size
	 *            the size to pad to
	 * @param padStr
	 *            the String to pad with, null or empty treated as single space
	 * @return string that is padded <code>null</code> if null String input
	 */
	public static String rightPad(String str, int size, String padStr) {
		return padString(str, size, padStr, false);
	}

	/**
	 * 
	 * Delete the space string on the right of the string.
	 * 
	 * @param str
	 *            input string
	 * @return string that deleted spaces
	 * @see org.springframework.util.StringUtils#trimTrailingWhitespace(String)
	 */
	public static String rightTrim(String str) {
		return org.springframework.util.StringUtils.trimTrailingWhitespace(str);
	}

	/**
	 * Splits the provided text into an array, separator specified. <div
	 * class="ko"> 주어진 String에 대해서 separator(char)를 이용하여 tokenize한 후 String[]로
	 * 뽑아낸다. - 연속된 separator 사이는 token이 되지 않는다. - 주어진 String이 null일 경우, null을
	 * return한다. ex) split("aaVbbVcc", 'V') => 2번째 argument가 separator가 되어 "aa",
	 * "bb", "cc"스트링이 String[] 형태로 return 된다. </div>
	 * 
	 * @param str
	 *            the String to parse
	 * @param separator
	 *            the character used as the delimiter
	 * @return an array of parsed Strings
	 */
	public static String[] split(String str, char separator) {
		StringBuffer tempStringBuffer = new StringBuffer();
		tempStringBuffer.append(separator);
		return tokenizeToStringArray(str, tempStringBuffer.toString(), false,
				false);
	}

	/**
	 * Split a String from the beginning of a string to the given size.
	 * 
	 * @param str
	 *            input string
	 * @param size
	 *            length of string
	 * @return string to be split
	 */
	public static String splitHead(String str, int size) {
		if (str == null) {
			return "";
		}
		if (str.length() > size) {
			str = str.substring(0, size);
		}
		return str;
	}

	/**
	 * Splits the leftmost len characters of a String with ellipsis. <div
	 * class="ko"> 주어진 String 객체에 대해서 주어진 길이만큼 앞부분을 떼어 반환한다. - 주어진 길이보다 주어진
	 * String의 길이가 작을 경우에는 주어진 String을 그대로 반환한다. - 떼어낸 앞부분의 뒤에 "..."을 붙여서 반환한다.
	 * </div> ex) splitHead("12345678", 3) => "123..."
	 * 
	 * @param str
	 *            the String to get the leftmost characters from, may be null
	 * @param len
	 *            the length of the required String
	 * @return the leftmost characters with ellipsis, null if null String input
	 */
	public static String splitHeadWithEllipsis(String str, int len) {
		if (str == null) {
			return null;
		} else if (len <= 0 || str.length() <= len) {
			return str;
		} else {
			return str.substring(0, len) + "...";
		}
	}

	/**
	 * Split a String from the end of a string to the given size.
	 * 
	 * @param str
	 *            input string
	 * @param size
	 *            length of string
	 * @return string to be split
	 */
	public static String splitTail(String str, int size) {
		if (str == null) {
			return "";
		}
		if (str.length() > size) {
			str = str.substring(str.length() - size);
		}
		return str;
	}

	/**
	 * Splits the leftmost len characters of a String with ellipsis. <div
	 * class="ko"> 주어진 String 객체에 대해서 주어진 길이만큼 뒷부분을 떼어 반환한다. - 주어진 길이보다 주어진
	 * String의 길이가 작을 경우에는 주어진 String을 그대로 반환한다. - 떼어낸 뒷부분의 앞에 "..."을 붙여서 반환한다.
	 * </div> ex) splitTail("12345678", 3) => "...678"
	 * 
	 * @param str
	 *            the String to get the rightmost characters from, may be null
	 * @param len
	 *            the length of the required String
	 * @return the rightmost characters with ellipsis, null if null String input
	 */
	public static String splitTailWithEllipsis(String str, int len) {
		if (str == null) {
			return null;
		} else if (len <= 0 || str.length() <= len) {
			return str;
		} else {
			return "..." + str.substring(str.length() - len);
		}
	}

	/**
	 * It converts the string representation of a number to integer type (eg.
	 * '27' -> 27)
	 * 
	 * <pre>
	 * StringUtil.string2integer('14') 	= 14
	 * </pre>
	 * 
	 * @param str
	 *            string representation of a number
	 * @return integer integer type of string
	 */
	public static int string2integer(String str) {
		int ret = Integer.parseInt(str.trim());

		return ret;
	}

	/**
	 * Converts String to BigDecimal <div class="ko"> 문자열을 BigDecimal로 변환하여
	 * 리턴한다. </div>
	 * 
	 * @param str
	 *            the String value to convert
	 * @return the converted BigDecimal
	 */
	public static BigDecimal stringToBigDecimal(String str) {
		if ("".equals(rightTrim(str)))
			return new BigDecimal(0);
		else
			return new BigDecimal(str);
	}

	/**
	 * Converts String to BigDecimal from the specified position <div
	 * class="ko"> 문자열의 내용 중 정해진 위치의 일부 문자열을 BigDecimal로 변환하여 리턴한다. </div>
	 * 
	 * @param str
	 *            the String value to convert
	 * @param pos
	 *            the start position
	 * @param len
	 *            the length of str from pos
	 * @return the converted BigDecimal
	 */
	public static BigDecimal stringToBigDecimal(String str, int pos, int len) {
		if ("".equals(rightTrim(str)))
			return new BigDecimal(0);
		else if (str.length() < pos + len)
			return stringToBigDecimal(leftPad(str, pos + len, "0"));
		else
			return stringToBigDecimal(str.substring(pos, pos + len));
	}

	/**
	 * Converts UniCode String to hex code <div class="ko"> 문자열을 받아 해당하는 hex 코드로
	 * 만들어 반환한다. (유니코드) </div> ex) stringToHex("123") => "003100320033"
	 * 
	 * @param str
	 *            the String to convert
	 * @return the converted hex string
	 */
	public static String stringToHex(String str) {

		String inStr = str;

		char inChar[] = inStr.toCharArray();
		StringBuffer sb = new StringBuffer();

		for (int i = 0; i < inChar.length; i++) {
			String hex = Integer.toHexString((int) inChar[i]);
			if (hex.length() == 2) {
				hex = "00" + hex;
			}
			sb.append(hex);
		}
		return sb.toString();
	}

	/**
	 * Converts String to int <div class="ko"> 문자열을 정수형으로 변환하여 리턴한다. </div> ex)
	 * stringToNumn("123") => 123
	 * 
	 * @param str
	 *            the String to convert
	 * @return the converted int value
	 */
	public static int stringToNumn(String str) {
		if ("".equals(rightTrim(str)))
			return 0;
		else
			return Integer.parseInt(str);
	}

	/**
	 * Converts String to int from a position <div class="ko"> 문자열의 내용 중 정해진 위치의
	 * 일부 문자열을 정수형으로 변환하여 리턴한다. </div> ex) stringToNumn("123456789", 5, 3) =>
	 * 678
	 * 
	 * @param str
	 *            the String value to convert
	 * @param pos
	 *            the start position
	 * @param len
	 *            the length of str from pos
	 * @return the converted int value
	 */
	public static int stringToNumn(String str, int pos, int len) {
		if ("".equals(rightTrim(str)))
			return 0;
		else if (str.length() < pos + len)
			return stringToNumn(leftPad(str, pos + len, "0"));
		else
			return stringToNumn(str.substring(pos, pos + len));
	}

	/**
	 * convert first letter to a big letter or a small letter.<br>
	 * 
	 * <pre>
	 * StringUtil.swapFirstLetterCase("Password") = "password'
	 * StringUtil.swapFirstLetterCase("password') = "Password"
	 * </pre>
	 * 
	 * @param str
	 *            String to be swapped
	 * @return String converting result
	 */
	public static String swapFirstLetterCase(String str) {
		StringBuilder sbuf = new StringBuilder(str);
		sbuf.deleteCharAt(0);
		if (Character.isLowerCase(str.substring(0, 1).toCharArray()[0])) {
			sbuf.insert(0, str.substring(0, 1).toUpperCase());
		} else {
			sbuf.insert(0, str.substring(0, 1).toLowerCase());
		}
		return sbuf.toString();
	}

	/**
	 * Converts 10 digit String to business number format(Korean). <div
	 * class="ko"> 주어진 10자리 숫자 String을 "111-11-11111" 형태의 사업자등록번호 포맷으로 변환한다. -
	 * 주어진 String이 10자리가 아닐 경우, ""를 return한다. - 주어진 String이 숫자만으로 구성되어 있지 않을 경우,
	 * ""을 return한다. </div> ex) toBusinessNoPattern("1111111111") =>
	 * "111-11-11111"
	 * 
	 * @param str
	 *            the String value to convert
	 * @return the String with business number format(Korean)
	 */
	public static String toBusinessNoPattern(String str) {
		if (str == null) {
			return "";
		}
		if (str.length() != 10 || !isDigit(str)) {
			return "";
		} else {
			StringBuffer buffer = new StringBuffer();
			buffer.append(str.substring(0, 3));
			buffer.append('-');
			buffer.append(str.substring(3, 5));
			buffer.append('-');
			buffer.append(str.substring(5, 10));
			return buffer.toString();
		}
	}

	/**
	 * Splits the provided text into an array, separator specified. <div
	 * class="ko"> 주어진 String에 대해서 delimiter를 이용하여 tokenize한 후 String[]로 뽑아낸다. -
	 * Java의 StringTokenizer를 이용하여 처리한다. - 옵션에 따라, 공백(space)에 대한 처리(trim), 값이
	 * ""인 token에 대한 포함 여부를 결정할 수 있다. - StringTokenizer를 이용하므로, 연속된 delimiter
	 * 사이는 token이 되지 않는다. - 주어진 String이 null일 경우, null을 return한다. - delimiter가
	 * null일 경우, 주어진 String을 하나의 element로 가지는 String[]를 return한다. </div> ex)
	 * String[] test; test = tokenizeToStringArray("aaa.bbb.ccc.ddd", ".", true,
	 * true) => test[0]="aaa", test[1]="bbb"...
	 * 
	 * @param str
	 *            the String to parse
	 * @param separator
	 *            the character used as the delimiter
	 * @param trimTokens
	 *            trim every tokens of array
	 * @param ignoreEmptyTokens
	 *            ignore empty tokens
	 * @return an array of parsed Strings
	 */
	public static String[] tokenizeToStringArray(String str, String separator,
			boolean trimTokens, boolean ignoreEmptyTokens) {
		if (str == null) {
			return null;
		}
		if (separator == null) {
			return new String[] { str };
		}
		StringTokenizer st = new StringTokenizer(str, separator);
		List<String> tokens = new ArrayList<String>();
		do {
			if (!st.hasMoreTokens()) {
				break;
			}
			String token = st.nextToken();
			if (trimTokens) {
				token = token.trim();
			}
			if (!ignoreEmptyTokens || token.length() != 0) {
				tokens.add(token);
			}
		} while (true);
		return tokens.toArray(new String[tokens.size()]);
	}

	/**
	 * Converts a first character to lower case. <div class="ko"> 주어진 String의
	 * 첫번째 글자를 소문자로 변환한다. </div> ex) toLowercase("ABCD") => "aBCD"
	 * 
	 * @param str
	 *            input string
	 * @return the converted string
	 */
	public static String toLowercase(String str) {
		return changeFirstCharacterCase(false, str);
	}

	/**
	 * Converts 13 digit String to social security number format(Korean). <div
	 * class="ko"> 주어진 13자리 숫자 String을 "111111-1111111" 형태의 주민등록번호 포맷으로 변환한다. -
	 * 주어진 String이 13자리가 아닐 경우, ""를 return한다. - 주어진 String이 숫자만으로 구성되어 있지 않을 경우,
	 * ""을 return한다. </div> ex) toSocialSecuNoPattern("1111111111111") =>
	 * "111111=1111111"
	 * 
	 * @param str
	 *            the String value to convert
	 * @return the String with social security number format(Korean)
	 */
	public static String toSocialSecuNoPattern(String str) {
		if (str == null) {
			return "";
		}
		if (str.length() != 13 || !isDigit(str)) {
			return "";
		} else {
			StringBuffer buffer = new StringBuffer();
			buffer.append(str.substring(0, 6));
			buffer.append('-');
			buffer.append(str.substring(6));
			return buffer.toString();
		}
	}

	/**
	 * Converts digit String to telephone number format(Korean). <div
	 * class="ko"> 입력된 문자열로 부터 숫자만 추출하여 '-'가 포함된 전화번호 형태의 문자열로 포매팅하여 리턴한다.
	 * </div>
	 * 
	 * <pre>
	 * String actual = StringUtil.toTelephoneNumberFormat(&quot;032-123-4567&quot;); // 032-123-4567
	 * String actual = StringUtil.toTelephoneNumberFormat(&quot;021234567&quot;); // 02-123-4567
	 * String actual = StringUtil.toTelephoneNumberFormat(&quot;0212345678&quot;); // 02-1234-5678
	 * String actual = StringUtil.toTelephoneNumberFormat(&quot;1234567&quot;); // 123-4567
	 * </pre>
	 * 
	 * @param str
	 *            the String value to convert
	 * @return the String with telephone number format(Korean), separated by '-'
	 */
	public static String toTelephoneNumberFormat(String str) {

		int endNumberDigit = 4;
		int minNumberDigit = 7;

		if (StringUtil.isEmpty(str)) {
			return null;
		}

		String origin = str.trim();
		String tempNumber;

		int originLength = origin.length();

		// extract numeric chars only
		if (StringUtil.isNotNumeric(origin)) {
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < originLength; i++) {
				if (Character.isDigit(origin.charAt(i))) {
					sb.append(origin.charAt(i));
				}
			}
			tempNumber = sb.toString();
		} else {
			tempNumber = origin;
		}

		int numberLength = tempNumber.length();

		if (numberLength < minNumberDigit) {
			return tempNumber;
		}

		String firstNumber = "";
		String secondNumber = "";
		String thirdNumber = "";

		if (tempNumber.charAt(0) == '0') { // local number or mobile number
			if (tempNumber.charAt(1) == '2') { // Seoul
				firstNumber = tempNumber.substring(0, 2);
				secondNumber = tempNumber.substring(2, numberLength
						- endNumberDigit);
				thirdNumber = tempNumber.substring(numberLength
						- endNumberDigit, numberLength); // split last 4 digits
			} else { // local number or mobile number
				firstNumber = tempNumber.substring(0, 3);
				secondNumber = tempNumber.substring(3, numberLength
						- endNumberDigit);
				thirdNumber = tempNumber.substring(numberLength
						- endNumberDigit, numberLength); // split last 4 digits
			}
			return firstNumber + "-" + secondNumber + "-" + thirdNumber;
		} else { // telephone number without local number
			firstNumber = tempNumber
					.substring(0, numberLength - endNumberDigit);
			secondNumber = tempNumber.substring(numberLength - endNumberDigit,
					numberLength);

			return firstNumber + "-" + secondNumber;
		}

	}

	/**
	 * Converts a first character to uppper case. <div class="ko"> 주어진 String의
	 * 첫번째 글자를 대문자로 변환한다. ex) toUpperCase("abcd") => "Abcd"
	 * 
	 * @param str
	 *            input string
	 * @return the converted string
	 */
	public static String toUpperCase(String inputString) {
		return changeFirstCharacterCase(true, inputString);
	}

	/**
	 * Converts digit String to zip code format(Korean). <div class="ko"> 주어진
	 * 6자리 숫자 String을 "111-111" 형태의 우편번호 포맷으로 변환한다. - 주어진 String이 6자리가 아닐 경우,
	 * ""를 return한다. - 주어진 String이 숫자만으로 구성되어 있지 않을 경우, ""을 return한다. </div> ex)
	 * toZipCodePattern("111111") => "111-111"
	 * 
	 * @param str
	 *            the String value to convert
	 * @return the String with zip code format(Korean), separated by '-'
	 */
	public static String toZipCodePattern(String str) {
		if (str == null) {
			return "";
		}
		if (str.length() != 6 || !isDigit(str)) {
			return "";
		} else {
			StringBuffer buffer = new StringBuffer();
			buffer.append(str.substring(0, 3));
			buffer.append('-');
			buffer.append(str.substring(3, 6));
			return buffer.toString();
		}
	}

	/**
	 * If original String has a specific String, remove specific Strings from
	 * original String.
	 * 
	 * <pre>
	 * StringUtil.trim(&quot;pass*word&quot;, &quot;*&quot;) = &quot;password&quot;
	 * </pre>
	 * 
	 * @param origString
	 *            original String
	 * @param trimString
	 *            String to be trimmed
	 * @return converting result
	 */
	public static String trim(String origString, String trimString) {
		int startPosit = origString.indexOf(trimString);
		if (startPosit != -1) {
			int endPosit = trimString.length() + startPosit;
			return origString.substring(0, startPosit)
					+ origString.substring(endPosit);
		}
		return origString;
	}

	/**
	 * Compares two Strings with whitespace normalized by using trim <div
	 * class="ko"> 주어진 두 개의 String 객체에 대해서, trim()후 같은지를 비교한다. - 주어진 String 객체에
	 * null이 포함되어 있는 경우에도 결과 값을 반환한다. </div> ex) trimEquals("     test     ",
	 * "test") => true
	 * 
	 * @param str1
	 *            the first String, may be null
	 * @param str2
	 *            the second String, may be null
	 * @return if the CharSequences are equal, case sensitive, or both null
	 */
	public static boolean trimEquals(String str1, String str2) {
		if (str1 == null) {
			if (str2 == null) {
				return true;
			} else {
				return false;
			}
		} else if (str2 == null) {
			return false;
		} else {
			String trimBaseStr = str1.trim();
			String trimTargetStr = str2.trim();
			return trimBaseStr.equals(trimTargetStr);
		}
	}

	/**
	 * Converts qualified name String to unqualified name String using separator
	 * '.'. <div class="ko"> Qualified Name으로 표현된 String을 받아서 Unqualified Name
	 * 형태의 String으로 변환한다. - separator는 '.'로 가정한다. </div>
	 * 
	 * @param qualifiedName
	 *            input string
	 * @return the converted string
	 */
	public static String unqualify(String qualifiedName) {
		return unqualify(qualifiedName, '.');
	}

	/**
	 * Converts qualified name String to unqualified name String using
	 * separator. <div class="ko"> Qualified Name으로 표현된 String을 받아서 Unqualified
	 * Name 형태의 String으로 변환한다. - Qualified Name에 사용되는 seperator를 지정하여 처리하도록 한다.
	 * </div>
	 * 
	 * @param qualifiedName
	 *            input string
	 * @param separator
	 *            the seperator character
	 * @return the converted string
	 */
	public static String unqualify(String qualifiedName, char separator) {
		return qualifiedName
				.substring(qualifiedName.lastIndexOf(separator) + 1);
	}

	/**
	 * @deprecated in favor of @link {@link DigestUtil#decodeBase64(String)}
	 */
	@Deprecated
	public static String decodeString(String str) {
		return DigestUtil.decodeBase64(str);
	}
	
		/**
	 * @deprecated in favor of @link
	 *             {@link DigestUtil#encodePassword(String, String)}
	 */
	@Deprecated
	public static String encodePassword(String password, String algorithm) {
		return DigestUtil.encodePassword(password, algorithm);
	}

	/**
	 * @deprecated in favor of @link {@link DigestUtil#encodeBase64(String)}
	 */
	@Deprecated
	public static String encodeString(String str) {
		return DigestUtil.encodeBase64(str);
	}
	
		/**
	 * @deprecated in favor of @link {@link NumberUtil#isNumber(String)}
	 */
	@Deprecated
	public static boolean isNumeric(String str) {
		return NumberUtil.isNumber(str);
	}

	/**
	 * @deprecated in favor of @link
	 *             {@link ValidationUtil#isPatternMatching(String, String)}
	 */
	@Deprecated
	public static boolean isPatternMatching(String str, String pattern) {
		return ValidationUtil.isPatternMatching(str, pattern);
	}
}
