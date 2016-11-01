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

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
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
public abstract class StringUtil {

	// ~ Static fields/initializers
	// =============================================

	/** For UTF-8 character set, 1 byte code */
	private static final int ONE_BYTE = 0x00007F;

	/** For UTF-8 character set, 2 byte code */
	private static final int TWO_BYTE = 0x0007FF;

	/** For UTF-8 character set, 3 byte code */
	private static final int THREE_BYTE = 0x00FFFF;

	private static final Random generator = new Random(System.currentTimeMillis());

	private static final char[] alphas = new char[] { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'X', 'Y', 'V', 'W', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
			'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'x', 'y', 'v', 'w', 'z' };

	// ~ Methods
	// ================================================================

	/**
	 * Return random string between minimum and maximum digits.
	 *
	 * @param minSize minimum digits
	 * @param maxSize maximum digits
	 * @return String random string
	 */
	public static String getRandomString(int minSize, int maxSize) {
		Random generator = new Random(System.currentTimeMillis());
		int randomLength = generator.nextInt(maxSize - minSize) + minSize;

		return randomAlphabetic(randomLength);
	}

	private static String randomAlphabetic(int randomLength) {
		StringBuilder buf = new StringBuilder();
		for (int i = 0; i < randomLength; i++) {
			buf.append(alphas[StringUtil.generator.nextInt(52)]);
		}
		return buf.toString();
	}

	/**
	 * Return a specific length of random string.
	 *
	 * @param count the length of random string to be developed
	 * @return String random string
	 */
	public static String getRandomString(int count) {
		return randomAlphabetic(count);
	}

	/**
	 * Return random string of a defined length between specific alphabet
	 * character.
	 *
	 * @param count count the length of random string to be made
	 * @param startChar the first letter of the random string being made
	 * @param endChar the last letter of the random string being made
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
			}while(!Character.toString((char)chInt).matches("^[a-zA-Z]$"));
			buf.append((char)chInt);
		}
		return buf.toString();
	}

	 /**
	 * Return a specific length of random string in Korean characters (UTF-8 only).
	 *
	 * @param count length of random string to be made
	 * @return String random string in Korean characters
	 * @throws UnsupportedEncodingException
	 */
	 public static String getRandomStringByKorean(int count) throws UnsupportedEncodingException {
		 StringBuilder buf = new StringBuilder();
		 for(int i = 0; i < count ; i++) {
			 buf.append((char)(StringUtil.generator.nextInt(11172) + 0xAC00));
		 }
		 return buf.toString();
	 }

	/**
	 * Return a specific length of given character set string.
	 *
	 * @param count length of random string to be made
	 * @param charset supported character set
	 * @return String random string
	 * @throws
	 */
	public static String getRandomStringByCharset(int count, String charset) {
		String randomStr = getRandomString(count);
		return DigestUtil.encodeCharset(randomStr, charset);
	}

	/**
	 * If the string that is searched for is included in the input string,
	 * return the index of the first string. If not found, return -1. If the
	 * input string or the string that is searched for is not null, return -1.
	 *
	 * @param str input string
	 * @param search string that is searched for
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
	 * For the given string, return the number that includes the related string.
	 *
	 * @param str string to search in. Return 0 if this is null.
	 * @param sub string to search for. Return 0 if this is null.
	 * @see org.springframework.util.StringUtils#countOccurrencesOf(String,
	 * String)
	 */
	public static int getContainsCount(String str, String sub) {
		return org.springframework.util.StringUtils.countOccurrencesOf(str, sub);
	}

	/**
	 * For given string, return number that includes related characters. If
	 * given string or character to be searched for is <code>null</code>, return
	 * -1.
	 *
	 * @param str input string
	 * @param chars character arrangement to be searched for
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
	 * Compare two words in lexicographical order. if the input string or string
	 * to compare with is <code>null</code>, return -1.
	 *
	 * @param sourceStr input string
	 * @param anotherStr string to be compared with If return value is 0, the
	 * same word, if it is under 0, the smaller one in lexicographical order, if
	 * it is over 0, the bigger one in lexicographical order.
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
	 * @param sourceStr input string
	 * @param anotherStr string to be compared with
	 * @return int If return value is 0, the same word, if it is under 0, the
	 * smaller one in lexicographical order, if it is over 0, the bigger one in
	 * lexicographical order.
	 * @see String#compareToIgnoreCase(String)
	 */
	public static int compareToIgnoreCase(String sourceStr, String anotherStr) {
		if (sourceStr == null || anotherStr == null) {
			return -1;
		}
		return sourceStr.compareToIgnoreCase(anotherStr);
	}

	/**
	 * If the string to be searched for is included in input string, regardless
	 * of upper case or lower case letters, return the first string. If not
	 * found, return -1. Even if the input string or string to be searched for
	 * is null, return -1.
	 *
	 * @param str input string
	 * @param search string to be compared with
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
	 * For the given string, return the number that includes related string,
	 * regardless of upper case or lower case letters.
	 *
	 * @param str string to search in. Return 0 if this is null.
	 * @param sub string to search for. Return 0 if this is null.
	 * @see org.springframework.util.StringUtils#countOccurrencesOf(String,
	 * String)
	 */
	public static int getContainsCountIgnoreCase(String str, String sub) {
		return org.springframework.util.StringUtils.countOccurrencesOf(str.toLowerCase(), sub.toLowerCase());
	}

	/**
	 *
	 * For given string regardless of upper case or lower case letters, return
	 * number that includes related characters. If given string or character to
	 * be searched for is <code>null</code>, return -1.
	 *
	 * @param str input string
	 * @param chars string of characters to be searched for
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
	 * Return length of related string. If string is <code>null</code>, return
	 * -1.
	 *
	 * @param str input string
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
	 * Return total length of related string calculated in byte unit. If string
	 * is null, return -1.
	 *
	 * @param str input string
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
	 * Return byte length for each letter of related character
	 *
	 * @param charat one English letter
	 * @return byte length of one related English letter
	 */
	public static int getByteLength(char charat) {
		int charCode = charat;

		if (charCode <= ONE_BYTE) {
			return 1;
		}
		else if (charCode <= TWO_BYTE) {
			return 2;
		}
		else if (charCode <= THREE_BYTE) {
			return 3;
		}
		else {
			return 4;
		}
	}

	/**
	 * For input string, cut an amount that is same as the length of the string,
	 * and return new string.
	 *
	 * @param str input string
	 * @param length length of string
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
	 * Delete all space strings.
	 *
	 * @param str input string
	 * @return string that deleted space
	 * @see org.springframework.util.StringUtils#trimAllWhitespace(String)
	 */
	public static String removeWhitespace(String str) {
		return org.springframework.util.StringUtils.trimAllWhitespace(str);
	}

	/**
	 * Delete the space string on the left of the string.
	 *
	 * @param str input string
	 * @return string that deleted spaces
	 * @see org.springframework.util.StringUtils#trimLeadingWhitespace(String)
	 */
	public static String leftTrim(String str) {
		return org.springframework.util.StringUtils.trimLeadingWhitespace(str);
	}

	/**
	 *
	 * Delete the space string on the right of the string.
	 *
	 * @param str input string
	 * @return string that deleted spaces
	 * @see org.springframework.util.StringUtils#trimTrailingWhitespace(String)
	 */
	public static String rightTrim(String str) {
		return org.springframework.util.StringUtils.trimTrailingWhitespace(str);
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
	 * @param str string to be modified
	 * @param size size that includes letter for padding
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
	 * @param str string to be modified
	 * @param size size that includes letter for padding
	 * @param padChar letter to fill in
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
	 * @param str string to be modified
	 * @param size size that includes letter for padding
	 * @param padStr letter to fill in
	 * @return string that is padded <code>null</code> if null String input
	 */
	 public static String leftPad(String str, int size, String padStr) {
		 return padString(str, size, padStr, true);
	 }

	 /**
	 * For related string, fill the input length from the right with
	 space.<br>
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
	 * @param str string to be modified
	 * @param size size that includes letter for padding
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
	 * @param str string to be modified
	 * @param size size that includes letter for padding
	 * @param padChar letter for padding
	 * @return string that is padded <code>null</code> if null String input
	 */
	 public static String rightPad(String str, int size, char padChar) {
			return padChar(str, size, padChar, false);
	 }

	private static String padChar(String str, int size, char padChar, boolean isLeft) {
		if(str == null) {
			return null;
		}
		int originalStrLength = str.length();

		if (size < originalStrLength)
			return str;

		int difference = size - originalStrLength;

		StringBuilder strBuf = new StringBuilder();
		if(!isLeft) {
			strBuf.append(str);
		}

		for (int i = 0; i < difference; i++)
			strBuf.append(padChar);

		if(isLeft) {
			strBuf.append(str);
		}

		return strBuf.toString();
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
	 * @param str the String to pad out, may be null
	 * @param size the size to pad to
	 * @param padStr the String to pad with, null or empty treated as single
	 * space
	 * @return string that is padded <code>null</code> if null String input
	 */
	 public static String rightPad(String str, int size, String padStr) {
		return padString(str, size, padStr, false);
	 }

	private static String padString(String str, int size, String padStr, boolean isLeft) {
		if(str == null) {
			return null;
		}
		int originalStrLength = str.length();

		if (size < originalStrLength)
			return str;

		int difference = size - originalStrLength;

		String tempPad = "";
		if(difference > 0) {
			if(padStr == null || "".equals(padStr)) {
				padStr = " ";
			}
			do {
				for(int j=0; j < padStr.length(); j++) {
					tempPad += padStr.charAt(j);
					if(str.length() + tempPad.length() >= size) {
						break;
					}
				}
			} while(difference > tempPad.length());
			if(isLeft) {
				str = tempPad + str;
			} else {
				str = str + tempPad;
			}
		}

		return str;
	}

	/**
	 * Split a String from the beginning of a string to the given size.
	 *
	 * @param str input string
	 * @param size length of string
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
	 * Split a String from the end of a string to the given size.
	 *
	 * @param str input string
	 * @param size length of string
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
	 * For input strings, remove all strings to be deleted.
	 *
	 * @param str input string
	 * @param charsToDelete string to be deleted
	 * @return String deleted string
	 * @see org.springframework.util.StringUtils#deleteAny(String, String)
	 */
	public static String removeAll(String str, String charsToDelete) {
		return org.springframework.util.StringUtils.deleteAny(str, charsToDelete);
	}

	/**
	 * Convert a string that may contain underscores to camel case.
	 *
	 * @param underScore Underscore name.
	 * @return Camel case representation of the underscore string.
	 */
	public static String convertToCamelCase(String underscore) {
		return convertToCamelCase(underscore, '_');
	}

	/**
	 * Convert a camel case string to underscore representation.
	 *
	 * @param camelCase Camel case name.
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
			}
			else {
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
	 * @param camelCase Camel case name.
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
			result = result.concat(Character.toString(currentChar).toLowerCase());
		}
		return result;
	}

	/**
	 * Reverses a String as per {@link StringBuffer#reverse()}.
	 *
	 * <A code>null</code> String returns <code>null</code>.
	 *
	 * @param str the String to reverse, may be null
	 * @return the reversed String, <code>null</code> if null String input
	 */
	public static String reverse(String str) {
		if (str == null) {
			return null;
		}
		return new StringBuilder(str).reverse().toString();
	}

	/**
	 * Trim the original string. If the original string is null or string length
	 * size is zero, return the converted string.
	 *
	 * @param org original string
	 * @param converted converted string
	 * @return trimmed string
	 */
	public static String null2str(String org, String converted) {
		if (org == null || org.trim().length() == 0) {
			return converted;
		}
		else {
			return org.trim();
		}
	}

	/**
	 * Trim the original string. If the original string is null or string length
	 * size is zero, return the empty string.
	 *
	 * @param org original string
	 * @return trimmed string
	 */
	public static String null2str(String org) {
		return null2str(org, "");
	}

	/**
	 * Compare the first and second string. If they are the same, return the
	 * third string, and if they are different, return the fourth string.
	 *
	 * @param source value to compare.
	 * @param target value that is compared against source
	 * @param result value returned
	 * @param base optional string
	 * @return String to be decoded
	 */
	public static String decode(String source, String target, String result, String base) {
		if (source == null && target == null) {
			return result;
		}
		else if (source == null && target != null) {
			return base;
		}
		else if (source.trim().equals(target)) {
			return result;
		}
		return base;
	}

	/**
	 * Replaces the first substring of this string that matches the given
	 * regular expression with the given replacement.
	 *
	 * @param source input string
	 * @param regex regular expression
	 * @param replacement given replacement
	 * @return changed string
	 * @see String#replaceFirst(String, String)
	 */
	public static String replaceFirst(String source, String regex, String replacement) {
		if (source == null) {
			return null;
		}
		return source.replaceFirst(regex, replacement);
	}

	/**
	 * Replaces the last substring of this string that matches the given regular
	 * expression with the given replacement.
	 *
	 * @param source input string
	 * @param regex regular expression
	 * @param replacement given replacement
	 * @return changed string
	 */
	public static String replaceLast(String source, String regex, String replacement) {
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
	 * Replaces each substring of this string that matches the given regular
	 * expression with the given replacement.
	 *
	 * @param source input string
	 * @param regex regular expression
	 * @param replacement given replacement
	 * @return changed string
	 * @see String#replaceAll(String, String)
	 */
	public static String replaceAll(String source, String regex, String replacement) {
		if (source == null) {
			return null;
		}
		return source.replaceAll(regex, replacement);
	}

	/**
	 * Unescape string that includes HTML tag.
	 *
	 * @param input the (unescaped) input string
	 * @return the escaped string
	 * @see HtmlUtils#htmlEscape(String)
	 */
	public static String replaceHtmlEscape(String input) {
		return HtmlUtils.htmlEscape(input);
	}

	/**
	 * Input string to HTML tag format.
	 *
	 * @param input the (escaped) input string
	 * @return the unescaped string
	 * @see HtmlUtils#htmlUnescape(String)
	 */
	public static String removeEscapeChar(String input) {
		return HtmlUtils.htmlUnescape(input);
	}

	/**
	 * convert first letter to a big letter or a small letter.<br>
	 *
	 * <pre>
	 * StringUtil.swapFirstLetterCase("Password") = "password'
	 * StringUtil.swapFirstLetterCase("password') = "Password"
	 * </pre>
	 *
	 * @param str String to be swapped
	 * @return String converting result
	 */
	public static String swapFirstLetterCase(String str) {
		StringBuilder sbuf = new StringBuilder(str);
		sbuf.deleteCharAt(0);
		if (Character.isLowerCase(str.substring(0, 1).toCharArray()[0])) {
			sbuf.insert(0, str.substring(0, 1).toUpperCase());
		}
		else {
			sbuf.insert(0, str.substring(0, 1).toLowerCase());
		}
		return sbuf.toString();
	}

	/**
	 * If original String has a specific String, remove specific Strings from
	 * original String.
	 *
	 * <pre>
	 * StringUtil.trim(&quot;pass*word&quot;, &quot;*&quot;) = &quot;password&quot;
	 * </pre>
	 *
	 * @param origString original String
	 * @param trimString String to be trimmed
	 * @return converting result
	 */
	public static String trim(String origString, String trimString) {
		int startPosit = origString.indexOf(trimString);
		if (startPosit != -1) {
			int endPosit = trimString.length() + startPosit;
			return origString.substring(0, startPosit) + origString.substring(endPosit);
		}
		return origString;
	}

	/**
	 * Break a string into specific tokens and return a String of last location.<br>
	 *
	 * <pre>
	 * StringUtil.getLastString(&quot;password*password*a*b*c&quot;, &quot;*&quot;) = &quot;c&quot;
	 * </pre>
	 *
	 * @param origStr original String
	 * @param strToken specific tokens
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
	 * If original String has token, Break a string into specific tokens and
	 * change String Array. If not, return a String Array which has original
	 * String as it is.
	 *
	 * <pre>
	 * StringUtil.getStringArray("passwordabcpassword", "abc") = String[]{"password","password"}
	 * StringUtil.getStringArray("pasword*password", "abc")    = String[]{"pasword*password"}
	 * </pre>
	 *
	 * @param str original String
	 * @param strToken specific String token
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
	 * Make a new String that filled original to a special char as ciphers
	 *
	 * @param originalStr original String
	 * @param ch a special char
	 * @param ciphers ciphers
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
	 * If string is null or empty string, return false. <br>
	 * If not, return true.
	 *
	 * <pre>
	 * StringUtil.isNotEmpty("")    = false
	 * StringUtil.isNotEmpty(null)  = false
	 * StringUtil.isNotEmpty("abc") = true
	 * </pre>
	 *
	 * @param str original String
	 * @return which empty string or not.
	 */
	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
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
	 * @param str original String
	 * @return which empty string or not.
	 */
	public static boolean isEmpty(String str) {
		return (str == null || str.length() == 0);
	}

	/**
	 * Determine whether a (trimmed) string is empty
	 *
	 * @param str The text to check.
	 * @return Whether empty.
	 */
	public static final boolean isEmptyTrimmed(String str) {
		return (str == null || str.trim().length() == 0);
	}

	/**
	 * replace replaced string to specific string from original string. <br>
	 *
	 * <pre>
	 * StringUtil.replace(&quot;work$id&quot;, &quot;$&quot;, &quot;.&quot;) = &quot;work.id&quot;
	 * </pre>
	 *
	 * @param str original String
	 * @param replacedStr to be replaced String
	 * @param replaceStr replace String
	 * @return converting result
	 */
	public static String replace(String str, String replacedStr, String replaceStr) {
		String newStr = "";
		if (str.indexOf(replacedStr) != -1) {
			String s1 = str.substring(0, str.indexOf(replacedStr));
			String s2 = str.substring(str.indexOf(replacedStr) + 1);
			newStr = s1 + replaceStr + s2;
		}
		return newStr;
	}

	/**
	 * It converts the string representation of a number to integer type (eg.
	 * '27' -> 27)
	 *
	 * <pre>
	 * StringUtil.string2integer('14') 	= 14
	 * </pre>
	 *
	 * @param str string representation of a number
	 * @return integer integer type of string
	 */
	public static int string2integer(String str) {
		int ret = Integer.parseInt(str.trim());

		return ret;
	}

	/**
	 * It converts integer type to String ( 27 -> '27')
	 *
	 * <pre>
	 * StringUtil.integer2string(14) 	= '14'
	 * </pre>
	 *
	 * @param integer integer type
	 * @return String string representation of a number
	 */
	public static String integer2string(int integer) {
		return ("" + integer);
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
	 * @param str original String
	 * @param maxSeqNumber a sequence of the same character
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
			}
			else {
				occurence = 1;
			}
		}
		return false;
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
	 * @param str the String to check, may be null
	 * @param invalidChars an array of invalid chars, may be null
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
	 * @param str the String to check, may be null
	 * @param invalidChars a String of invalid chars, may be null
	 * @return false if it contains none of the invalid chars, or is null
	 */
	public static boolean containsInvalidChars(String str, String invalidChars) {
		if (str == null || invalidChars == null) {
			return true;
		}
		return containsInvalidChars(str, invalidChars.toCharArray());
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
	 * @param str the String to check, may be null
	 * @return <code>true</code> if only contains letters or digits, and is
	 * non-null
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
	 * @param str the String to check, may be null
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
	 * Return token list which is separated by ","
	 *
	 * @param lst
	 * @return token list which is separated by ","
	 */
	public static List<String> getTokens(String lst) {
		return getTokens(lst, ",");
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
	 * {@link ValidationUtil#isPatternMatching(String, String)}
	 */
	@Deprecated
	public static boolean isPatternMatching(String str, String pattern) {
		return ValidationUtil.isPatternMatching(str, pattern);
	}

	/**
	 * @deprecated in favor of @link {@link DigestUtil#encodeBase64(String)}
	 */
	@Deprecated
	public static String encodeString(String str) {
		return DigestUtil.encodeBase64(str);
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
	 * {@link DigestUtil#encodePassword(String, String)}
	 */
	@Deprecated
	public static String encodePassword(String password, String algorithm) {
		return DigestUtil.encodePassword(password, algorithm);
	}
}
