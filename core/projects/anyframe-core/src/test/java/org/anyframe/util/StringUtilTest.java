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

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.junit.Test;

/**
 * For testing functions what StringUtil supports, there are some test scenarios
 * in this TestCase.
 *
 * @author SoYon Lim
 * @author JongHoon Kim
 * @author HyunJung Jeong
 */
public class StringUtilTest {

	@Test
	public void testGetRandomString() {
		assertNotNull(StringUtil.getRandomString(8));
		System.out.println(StringUtil.getRandomString(8));

		assertNotNull(StringUtil.getRandomString(10, 15));
		System.out.println(StringUtil.getRandomString(10, 15));

		assertNotNull(StringUtil.getRandomString(10, 'a', 'e'));
		System.out.println(StringUtil.getRandomString(10, 'a', 'e'));

		assertNotNull(StringUtil.getRandomString(30, 'A', 'z'));
		System.out.println(StringUtil.getRandomString(30, 'A', 'z'));
	}

	@Test
	public void getRandomStringByKorean() throws UnsupportedEncodingException {
		assertNotNull(StringUtil.getRandomStringByKorean(20));
		System.out.println(StringUtil.getRandomStringByKorean(20));
	}

	@Test
	public void testGetRandomStringByCharset() {
		assertNotNull(StringUtil.getRandomStringByCharset(20, "UTF-8"));
		System.out.println(StringUtil.getRandomStringByCharset(20, "UTF-8"));

		assertNotNull(StringUtil.getRandomStringByCharset(20, "ascii"));
		System.out.println(StringUtil.getRandomStringByCharset(20, "ascii"));
	}

	@Test
	public void testIndexOf() {
		assertEquals(9, StringUtil.indexOf("Anyframe Java Test", "Java"));
		assertEquals(-1, StringUtil.indexOf("Anyframe Java Test", "java"));
		assertEquals(0, StringUtil.indexOf("Anyframe Java Test", ""));
		assertEquals(-1, StringUtil.indexOf("Anyframe Java Test", null));
	}

	@Test
	public void testGetContainsCount() {
		assertEquals(3, StringUtil.getContainsCount("Anyframe Java Test", "a"));
		assertEquals(0, StringUtil.getContainsCount("Anyframe Java Test", "test"));
		assertEquals(1, StringUtil.getContainsCount("Anyframe Java Test", "Test"));

		assertEquals(3, StringUtil.getContainsCount("Anyframe Java Test", new char[] { 'a' }));
		assertEquals(4, StringUtil.getContainsCount("Anyframe Java Test", new char[] { 'a', 'T' }));
	}

	@Test
	public void testCompareTo() {
		assertEquals(0, StringUtil.compareTo("Anyframe Java Test", "Anyframe Java Test"));
		// 106(j's ascii code) - 74(J's ascii code) = 32
		assertEquals(32, StringUtil.compareTo("Anyframe java Test", "Anyframe Java Test"));
		// 97(a's ascii code) - 65(A's ascii code) = 32
		assertEquals(32, StringUtil.compareTo("anyframe java test", "Anyframe Java Test"));

		assertEquals(-1, StringUtil.compareTo("Anyframe Java Test", null));
	}

	@Test
	public void testCompareToIgnoreCase() {
		assertEquals(0, StringUtil.compareToIgnoreCase("anyframe java test", "Anyframe Java Test"));
		assertEquals(0, StringUtil.compareToIgnoreCase("anyframe java test", "Anyframe Java Test"));

		assertEquals(-1, StringUtil.compareToIgnoreCase("anyframe java test", null));
	}

	@Test
	public void testIndexOfIgnoreCase() {
		assertEquals(9, StringUtil.indexOfIgnoreCase("Anyframe Java Test", "java"));
		assertEquals(9, StringUtil.indexOfIgnoreCase("Anyframe Java Test", "Java"));

		assertEquals(-1, StringUtil.indexOfIgnoreCase("Anyframe Java Test", null));
	}

	@Test
	public void testGetContainsCountIgnoreCase() {
		assertEquals(4, StringUtil.getContainsCountIgnoreCase("Anyframe Java Test", new char[] { 'a' }));
		assertEquals(6, StringUtil.getContainsCountIgnoreCase("Anyframe Java Test", new char[] { 'a', 'T' }));

		assertEquals(4, StringUtil.getContainsCountIgnoreCase("Anyframe Java Test", "a"));
		assertEquals(1, StringUtil.getContainsCountIgnoreCase("Anyframe Java Test", "test"));
		assertEquals(1, StringUtil.getContainsCountIgnoreCase("Anyframe Java Test", "Test"));
	}

	@Test
	public void testGetLength() {
		assertEquals(18, StringUtil.getLength("Anyframe Java Test"));
		assertEquals(5, StringUtil.getLength("애니프레임"));
		assertEquals(3, StringUtil.getLength("テスト"));
		assertEquals(-1, StringUtil.getLength(null));
	}

	@Test
	public void testGetByteLength() {
		assertEquals(18, StringUtil.getByteLength("Anyframe Java Test"));
		assertEquals(15, StringUtil.getByteLength("애니프레임"));
		assertEquals(8, StringUtil.getByteLength("άλφα"));
		assertEquals(-1, StringUtil.getByteLength(null));
	}

	@Test
	public void testGetCutString() {
		assertEquals("Anyframe Java ", StringUtil.getCutString("Anyframe Java Test", 14));
		assertEquals("Anyframe Java Test", StringUtil.getCutString("Anyframe Java Test", 18));
	}

	@Test
	public void testRemoveWhitespace() {
		assertEquals("AnyframeJavaTest", StringUtil.removeWhitespace("Anyframe Java Test"));
		assertEquals("AnyframeJava", StringUtil.removeWhitespace("Anyframe Java"));
		assertEquals("AnyframeJavaTest", StringUtil.removeWhitespace("Anyframe Java Test"));
		assertEquals("AnyframeJavaUtilTest", StringUtil.removeWhitespace("Anyframe Java Util Test"));
		assertEquals("AnyframeJavaUtilTest", StringUtil.removeWhitespace("  Anyframe Java Util Test  "));
	}

	@Test
	public void testLeftTrim() {
		assertEquals("Anyframe Java Test", StringUtil.leftTrim("   Anyframe Java Test"));
		assertEquals("Anyframe Java Test   ", StringUtil.leftTrim("   Anyframe Java Test   "));
	}

	@Test
	public void testRightTrim() {
		assertEquals("Anyframe Java Test", StringUtil.rightTrim("Anyframe Java Test   "));
		assertEquals("   Anyframe Java Test", StringUtil.rightTrim("   Anyframe Java Test   "));
	}

	@Test
	public void testLeftPad() {
		assertEquals("    Anyframe", StringUtil.leftPad("Anyframe", 12));
		assertEquals("aaaaAnyframe", StringUtil.leftPad("Anyframe", 12, 'a'));
		assertEquals("JavaAnyframe", StringUtil.leftPad("Anyframe", 12, "Java"));
		assertEquals("JavaJaAnyframe", StringUtil.leftPad("Anyframe", 14, "Java"));

		assertEquals(null, StringUtil.leftPad(null, 4, ' '));
		assertEquals("zzz", StringUtil.leftPad("", 3, 'z'));
		assertEquals("bat", StringUtil.leftPad("bat", 3, 'z'));
		assertEquals("zzbat", StringUtil.leftPad("bat", 5, 'z'));
		assertEquals("bat", StringUtil.leftPad("bat", 1, 'z'));
		assertEquals("bat", StringUtil.leftPad("bat", -1, 'z'));

		assertEquals(null, StringUtil.leftPad(null, 4, ""));
		assertEquals("zzz", StringUtil.leftPad("", 3, "z"));
		assertEquals("bat", StringUtil.leftPad("bat", 3, "yz"));
		assertEquals("yzbat", StringUtil.leftPad("bat", 5, "yz"));
		assertEquals("yzyzybat", StringUtil.leftPad("bat", 8, "yz"));
		assertEquals("bat", StringUtil.leftPad("bat", 1, "yz"));
		assertEquals("bat", StringUtil.leftPad("bat", -1, "yz"));
		assertEquals("  bat", StringUtil.leftPad("bat", 5, null));
		assertEquals("  bat", StringUtil.leftPad("bat", 5, ""));
	}

	@Test
	public void testRightPad() {
		assertEquals("Anyframe    ", StringUtil.rightPad("Anyframe", 12));
		assertEquals("Anyframeaaaa", StringUtil.rightPad("Anyframe", 12, 'a'));
		assertEquals("Anyframe Jav", StringUtil.rightPad("Anyframe", 12, " Java Test"));
		assertEquals("Anyframe Java Test", StringUtil.rightPad("Anyframe", 18, " Java Test"));
		assertEquals("Anyframe Java Test Java", StringUtil.rightPad("Anyframe", 23, " Java Test"));

		assertEquals(null, StringUtil.rightPad(null, 4, ' '));
		assertEquals("zzz", StringUtil.rightPad("", 3, 'z'));
		assertEquals("bat", StringUtil.rightPad("bat", 3, 'z'));
		assertEquals("batzz", StringUtil.rightPad("bat", 5, 'z'));
		assertEquals("bat", StringUtil.rightPad("bat", 1, 'z'));
		assertEquals("bat", StringUtil.rightPad("bat", -1, 'z'));

		assertEquals(null, StringUtil.rightPad(null, 4, ""));
		assertEquals("zzz", StringUtil.rightPad("", 3, "z"));
		assertEquals("bat", StringUtil.rightPad("bat", 3, "yz"));
		assertEquals("batyz", StringUtil.rightPad("bat", 5, "yz"));
		assertEquals("batyzyzy", StringUtil.rightPad("bat", 8, "yz"));
		assertEquals("bat", StringUtil.rightPad("bat", 1, "yz"));
		assertEquals("bat", StringUtil.rightPad("bat", -1, "yz"));
		assertEquals("bat  ", StringUtil.rightPad("bat", 5, null));
		assertEquals("bat  ", StringUtil.rightPad("bat", 5, ""));
	}

	@Test
	public void testSplitHead() {
		assertEquals("Any", StringUtil.splitHead("Anyframe Java Test", 3));
		assertEquals("Anyframe", StringUtil.splitHead("Anyframe Java Test", 8));

		assertEquals("", StringUtil.splitHead(null, 3));
	}

	@Test
	public void testSplitTail() {
		assertEquals("est", StringUtil.splitTail("Anyframe Java Test", 3));
		assertEquals("Test", StringUtil.splitTail("Anyframe Java Test", 4));

		assertEquals("", StringUtil.splitTail(null, 3));
	}

	@Test
	public void testRemoveAll() {
		assertEquals("Anyfrme  Test", StringUtil.removeAll("Anyframe Java Test", "Java"));
		assertEquals("Anyfrme Jv est", StringUtil.removeAll("Anyframe Java Test", "aT"));
		assertEquals("frame ava Test", StringUtil.removeAll("Anyframe Java Test", "AnyJ"));
		assertEquals("AnyfrmeJvTes", StringUtil.removeAll("Anyframe\nJava\nTest\n", "at\n"));
	}

	@Test
	public void testConvertToCamelCase() {
		assertEquals("anyframeJavaTest", StringUtil.convertToCamelCase("anyframe_java_test"));
		assertEquals("anyframeJavaTest", StringUtil.convertToCamelCase("anyframe-java-test", '-'));
		assertEquals("anyframeJavaTest", StringUtil.convertToCamelCase("anyframe.java.test", '.'));
	}

	@Test
	public void testConvertToUnderScore() {
		assertEquals("anyframe_java_test", StringUtil.convertToUnderScore("anyframeJavaTest"));
	}

	@Test
	public void testReverse() {
		assertEquals("tseT avaJ emarfynA", StringUtil.reverse("Anyframe Java Test"));
		assertEquals(null, StringUtil.reverse(null));
	}

	@Test
	public void testNullToString() {
		assertEquals("", StringUtil.null2str(null));
		assertEquals("", StringUtil.null2str("    "));
		assertEquals("Anyframe Java Test", StringUtil.null2str("Anyframe Java Test"));
		assertEquals("empty", StringUtil.null2str(null, "empty"));
		assertEquals("empty", StringUtil.null2str("    ", "empty"));
	}

	@Test
	public void testDecode() {
		assertEquals("Bad", StringUtil.decode("Java", "Test", "Good", "Bad"));
		assertEquals("Good", StringUtil.decode("Java", "Java", "Good", "Bad"));

		assertEquals("Good", StringUtil.decode(null, null, "Good", "Bad"));
		assertEquals("Bad", StringUtil.decode(null, "Java", "Good", "Bad"));
	}

	@Test
	public void testReplaceFirst() {
		assertEquals("Enterprise Java Test Anyframe Java Test",
				StringUtil.replaceFirst("Anyframe Java Test Anyframe Java Test", "Anyframe", "Enterprise"));

		assertEquals(null, StringUtil.replaceFirst(null, "Anyframe", "Enterprise"));
	}

	@Test
	public void testReplaceLast() {
		assertEquals("Anyframe Java Test Enterprise Java Test",
				StringUtil.replaceLast("Anyframe Java Test Anyframe Java Test", "Anyframe", "Enterprise"));
		assertEquals("Anyframe Java Test Anyframe Java Test",
				StringUtil.replaceLast("Anyframe Java Test Anyframe Java Test", "any", "Enterprise"));
	}

	@Test
	public void testReplaceAll() {
		assertEquals("Enterprise Java Test Enterprise Java Test",
				StringUtil.replaceAll("Anyframe Java Test Anyframe Java Test", "Anyframe", "Enterprise"));
		assertEquals("EnterpriseJavaTestEnterpriseJavaTest",
				StringUtil.replaceAll("AnyframeJavaTestAnyframeJavaTest", "Anyframe", "Enterprise"));
		assertEquals("123412341234", StringUtil.replaceAll("12ab12ab12ab", "ab", "34"));

		assertEquals(null, StringUtil.replaceAll(null, "ab", "34"));
	}

	@Test
	public void testReplaceHtmlEscape() {
		assertEquals("&lt;html&gt;Anyframe Java Test&lt;html&gt;",
				StringUtil.replaceHtmlEscape("<html>Anyframe Java Test<html>"));
	}

	@Test
	public void testRemoveEscapeChar() {
		assertEquals("<html>Anyframe Java Test<html>",
				StringUtil.removeEscapeChar("&lt;html&gt;Anyframe Java Test&lt;html&gt;"));
	}

	@Test
	public void testSwapFirstLetterCase() {
		assertEquals("Java", StringUtil.swapFirstLetterCase("java"));
		assertEquals("anyframe", StringUtil.swapFirstLetterCase("Anyframe"));
		assertEquals("anyframe Java", StringUtil.swapFirstLetterCase("Anyframe Java"));
	}

	@Test
	public void testTrim() {
		assertEquals("AnyframeJava", StringUtil.trim("Anyframe*Java", "*"));
		assertEquals("AnyframeJava", StringUtil.trim("Anyframe**Java", "**"));
		assertEquals("AnyframeJava", StringUtil.trim("Anyframe---Java", "---"));
		assertEquals("AnyframeJava**Test", StringUtil.trim("Anyframe**Java**Test", "**"));
		assertEquals("Anyframe*Java**Test", StringUtil.trim("Anyframe**Java**Test", "*"));
		assertEquals("Anyframe**Java**Test", StringUtil.trim("Anyframe**Java**Test", "__"));
	}

	@Test
	public void testGetLastString() {
		assertEquals("Test", StringUtil.getLastString("Anyframe_Java_Test", "_"));
		assertEquals("Test", StringUtil.getLastString("Anyframe__Java__Test", "__"));
		assertEquals("Java", StringUtil.getLastString("Anyframe***Java", "***"));
		assertEquals("Anyframe***Java", StringUtil.getLastString("Anyframe***Java", "___"));
	}

	@Test
	public void testGetStringArray() {
		assertArrayEquals(new String[] { "Anyframe/Java/Test" }, StringUtil.getStringArray("Anyframe/Java/Test", "-"));
		assertArrayEquals(new String[] { "Anyframe", "Java", "Test" },
				StringUtil.getStringArray("Anyframe/Java/Test", "/"));
	}

	@Test
	public void testIsNotEmpty() {
		assertFalse(StringUtil.isNotEmpty(""));
		assertFalse(StringUtil.isNotEmpty(null));
		assertTrue(StringUtil.isNotEmpty("abc"));
	}

	@Test
	public void testIsEmpty() {
		assertTrue(StringUtil.isEmpty(""));
		assertFalse(StringUtil.isEmpty("   "));
		assertTrue(StringUtil.isEmpty(null));
		assertFalse(StringUtil.isEmpty("abc"));
	}

	@Test
	public void testIsEmptyTrimmed() {
		assertTrue(StringUtil.isEmptyTrimmed("   "));
	}

	@Test
	public void testReplace() {
		assertEquals("Anyframe|Common", StringUtil.replace("Anyframe/Common", "/", "|"));
		assertEquals("Anyframe.Java", StringUtil.replace("Anyframe_Java", "_", "."));
		assertEquals("Anyframe.Java_Test", StringUtil.replace("Anyframe_Java_Test", "_", "."));
		assertEquals("AnyframeUtilavaTest", StringUtil.replace("AnyframeJavaTest", "Java", "Util"));
		assertEquals("JavaUtilTest", StringUtil.replace(".UtilTest", ".", "Java"));
	}

	@Test
	public void testContainsMaxSequence() {
		assertTrue(StringUtil.containsMaxSequence("abbbbc", "4"));
		assertFalse(StringUtil.containsMaxSequence("abbcbb", "4"));
		assertTrue(StringUtil.containsMaxSequence("letter", "2"));
		assertTrue(StringUtil.containsMaxSequence("000012300000", "5"));

		assertFalse(StringUtil.containsMaxSequence(null, "5"));
	}

	@Test
	public void testContainsInvalidChars() {
		assertTrue(StringUtil.containsInvalidChars("abc*abc", "*"));
		assertTrue(StringUtil.containsInvalidChars("abc-abc", "*/-"));
		assertFalse(StringUtil.containsInvalidChars("abcabc", "*/-"));
		assertTrue(StringUtil.containsInvalidChars("abc-abc", new char[] { '*', '/', '-' }));
		assertFalse(StringUtil.containsInvalidChars("abc_edf_123", new char[] { '*', '/', '-' }));
		assertTrue(StringUtil.containsInvalidChars("abc/", new char[] { '*', '/' }));

		assertTrue(StringUtil.containsInvalidChars(null, "*"));
	}

	@Test
	public void testIsAlphaNumeric() {
		assertTrue(StringUtil.isAlphaNumeric("abcfds"));
		assertTrue(StringUtil.isAlphaNumeric("127652"));
		assertTrue(StringUtil.isAlphaNumeric("abc12fds"));
		assertFalse(StringUtil.isAlphaNumeric("abc12_fds"));
		assertFalse(StringUtil.isAlphaNumeric("abc12fds'"));
		assertFalse(StringUtil.isAlphaNumeric(null));
		assertFalse(StringUtil.isAlphaNumeric(""));
	}

	@Test
	public void testIsAlpha() {
		assertTrue(StringUtil.isAlpha("abcfds"));
		assertFalse(StringUtil.isAlpha("127652"));
		assertFalse(StringUtil.isAlpha("abc12fds"));
		assertFalse(StringUtil.isAlpha("abc12_fds"));
		assertFalse(StringUtil.isAlpha(null));
		assertFalse(StringUtil.isAlpha(""));
	}

	@Test
	public void testGetTokens() {

		List<String> resultList1 = StringUtil.getTokens("Anyframe,Java,Test");

		assertFalse(resultList1.isEmpty());

		for (String tmp : resultList1) {
			System.out.println(tmp);
		}

		List<String> resultList2 = StringUtil.getTokens("Anyframe/Java/Test", "/");

		assertFalse(resultList2.isEmpty());

		for (String tmp : resultList2) {
			System.out.println(tmp);
		}
	}

	/**
	 * 이하 Backward Compatibility 테스트 케이스
	 */

	/**
	 * [Flow #-1] Positive Case : encode password
	 */
	@Test
	public void testEncodePasswordBC() {
		// 1. try to encode password and compare
		String encoded1 = StringUtil.encodePassword("password", "MD5");
		String encoded2 = StringUtil.encodePassword("password", "MD5");
		assertEquals(encoded1, encoded2);
		// 2. define not available algorithm 'MD6 MessageDigest'
		try {
			String encoded3 = StringUtil.encodePassword("password", "MD6");
			// assertEquals("password", encoded3);
			fail("NoSuchAlgorithmException expected");
		}
		catch (Exception e) {
			assertTrue(e.getMessage().contains("MD6 MessageDigest not available"));
		}
	}

	/**
	 * [Flow #-2] Positive Case : encode string
	 */
	@Test
	public void testEncodeStringBC() {
		// 1. try to encode string and decode that.
		String encoded = StringUtil.encodeString("password");
		String decoded = StringUtil.decodeString(encoded);
		assertEquals("password", decoded);
	}

	/**
	 * [Flow #-3] Positive Case : decode string
	 */
	@Test
	public void testDecodeStringBC() {
		// 1. try to encode password and compare decoded string and original
		// string
		String encoded = StringUtil.encodeString("password");
		String decoded = StringUtil.decodeString(encoded);
		assertEquals("password", decoded);
	}

	/**
	 * [Flow #-4] Positive Case : swap first letter
	 */
	@Test
	public void testSwapFirstLetterCaseBC() {
		// 1. In case, first letter is small letter. try to swap.
		String swapped = StringUtil.swapFirstLetterCase("password");
		assertEquals("Password", swapped);
		// 2. In case, first letter is big letter. try to swap.
		swapped = StringUtil.swapFirstLetterCase("PASSWORD");
		assertEquals("pASSWORD", swapped);
	}

	/**
	 * [Flow #-5] Positive, Negative Case : trim string with a specific string
	 */
	@Test
	public void testTrimBC() {
		// 1. try to trim when trimmed string is 'trim'
		String trimmed = StringUtil.trim("passwordtrimpassword", "trim");
		assertEquals("passwordpassword", trimmed);
		// 2. try to trim when trimmed string is ','
		trimmed = StringUtil.trim("passwordtrimpassword", ",");
		assertEquals("passwordtrimpassword", trimmed);
	}

	/**
	 * [Flow #-6] Positive, Negative Case : get last string
	 */
	@Test
	public void testGetLastStringBC() {
		// 1. get last string when token is ','
		String trimmed = StringUtil.getLastString("password,password", ",");
		assertEquals("password", trimmed);

		// 2. get last string when original doesn't have token.
		trimmed = StringUtil.getLastString("password,password", "*");
		assertEquals("password,password", trimmed);
	}

	/**
	 * [Flow #-7] Positive, Negative Case : get string array.
	 */
	@Test
	public void testGetStringArrayBC() {
		// 1. when original string has token, get string array.
		String[] strings = StringUtil.getStringArray("password,password", ",");
		assertEquals(2, strings.length);
		// 2. when original string doesn't have token, get string array.
		strings = StringUtil.getStringArray("password", ",");
		assertEquals(1, strings.length);
	}

	/**
	 * [Flow #-8] Positive Case : check which string is not empty or not
	 */
	@Test
	public void testIsNotEmptyBC() {
		// 1. check which string is not empty or not
		assertTrue(StringUtil.isNotEmpty("passwordtrimpassword"));
	}

	/**
	 * [Flow #-9] Positive Case : check which string is empty or not
	 */
	@Test
	public void testIsEmptyBC() {
		// 1. check empty string
		assertTrue(StringUtil.isEmpty(""));
		// 2. check null
		assertTrue(StringUtil.isEmpty(null));
	}

	/**
	 * [Flow #-10] Positive Case : replace some string of original string to
	 * specific string
	 */
	@Test
	public void testReplaceBC() {
		// 1. try to replace ',' to '-'
		String replaced = StringUtil.replace("password,password", ",", "-");
		assertEquals("password-password", replaced);
	}

	/**
	 * [Flow #-11] Positive Case : converts the string representation of a
	 * number to integer type
	 */
	@Test
	public void testString2integerBC() {
		// 1. converts the string representation of a number to integer type
		assertEquals(1, StringUtil.string2integer("1"));
	}

	/**
	 * [Flow #-12] Positive Case : converts integer type to String
	 */
	@Test
	public void testInteger2stringBC() {
		// 1. converts integer type to String
		assertEquals("1", StringUtil.integer2string(1));
	}

	/**
	 * [Flow #-13] Positive, Negative Case : check that str matches the pattern
	 * string
	 *
	 * @throws Exception fail to test
	 */
	@Test
	public void testIsPatternMatchingBC() throws Exception {
		// 1. str matches the pattern
		String str = "abc-def";
		String pattern = "*-*";
		assertTrue(StringUtil.isPatternMatching(str, pattern));
		// 2. str doesn't match the pattern
		str = "abc";
		assertTrue(!StringUtil.isPatternMatching(str, pattern));
	}

	/**
	 * [Flow #-14] Positive, Negative Case : check that string contains a
	 * sequence of the same character
	 */
	@Test
	public void testContainsMaxSequenceBC() {
		// 1. string contains 2 sequences of the same character
		String str = "password";
		String maxSeqNumber = "2";
		assertTrue(StringUtil.containsMaxSequence(str, maxSeqNumber));
		// 2. string contains 3 sequences of the same character
		str = "my000";
		maxSeqNumber = "3";
		assertTrue(StringUtil.containsMaxSequence(str, maxSeqNumber));
		// 3. string doesn't contain any sequence of the same character
		str = "abbbbc";
		maxSeqNumber = "5";
		assertTrue(!StringUtil.containsMaxSequence(str, maxSeqNumber));
		// 4. string is null
		str = null;
		assertTrue(!StringUtil.containsMaxSequence(str, maxSeqNumber));
	}

	/**
	 * [Flow #-15] Positive, Negative Case : check that string contains a
	 * sequence of the same character
	 */
	@Test
	public void testContainsInvalidCharsBC() {
		// 1. string is empty.
		String str = "";
		char[] invalidChars = new char[] { '*', '%' };
		assertTrue(!StringUtil.containsInvalidChars(str, invalidChars));
		// 2. string is null.
		str = null;
		assertTrue(!StringUtil.containsInvalidChars(str, invalidChars));
		// 3. invalid chars doesn't defined.
		str = "";
		assertTrue(!StringUtil.containsInvalidChars(str, new char[] {}));
		// 4. string has invalid chars.
		str = "x*yz";
		assertTrue(StringUtil.containsInvalidChars(str, invalidChars));
		assertTrue(StringUtil.containsInvalidChars(str, "yz"));
	}

	/**
	 * [Flow #-16] Positive, Negative Case : check that String contains only
	 * unicode letters or digits
	 */
	@Test
	public void testIsAlphaNumericBC() {
		// 1. string is empty
		String str = "";
		assertTrue(!StringUtil.isAlphaNumeric(str));
		// 2. string is null
		str = null;
		assertTrue(!StringUtil.isAlphaNumeric(str));
		// 3. strigng consist of only alphabet
		str = "abc";
		assertTrue(StringUtil.isAlphaNumeric(str));
		// 4. string has a special character
		str = "a-bc";
		assertTrue(!StringUtil.isAlphaNumeric(str));
		// 5. strigng consist of alphabet and number
		str = "abc4";
		assertTrue(StringUtil.isAlphaNumeric(str));
	}

	/**
	 * [Flow #-17] Positive, Negative Case : check that String contains only
	 * unicode letters
	 */
	@Test
	public void testIsAlphaBC() {
		// 1. string is empty
		String str = "";
		assertTrue(!StringUtil.isAlpha(str));
		// 2. string is null
		str = null;
		assertTrue(!StringUtil.isAlpha(str));
		// 3. strigng consist of only alphabet
		str = "abc";
		assertTrue(StringUtil.isAlpha(str));
		// 4. string has a special character
		str = "a-bc";
		assertTrue(!StringUtil.isAlpha(str));
		// 5. strigng consist of alphabet and number
		str = "abc4";
		assertTrue(!StringUtil.isAlpha(str));
	}

	/**
	 * [Flow #-18] Positive, Negative Case : check that String contains only
	 * unicode digits
	 */
	@Test
	public void testIsNumericBC() {
		// 1. string is empty
		String str = "";
		assertTrue(!StringUtil.isNumeric(str));
		// 2. string is null
		str = null;
		assertTrue(!StringUtil.isNumeric(str));
		// 3. strigng consist of only alphabet
		str = "abc";
		assertTrue(!StringUtil.isNumeric(str));
		// 4. string has a special character
		str = "a-bc";
		assertTrue(!StringUtil.isNumeric(str));
		// 5. strigng consist of alphabet and number
		str = "abc4";
		assertTrue(!StringUtil.isNumeric(str));
		// 5. strigng consist of only number
		str = "1234";
		assertTrue(StringUtil.isNumeric(str));
	}

	/**
	 * [Flow #-19] Positive, Negative Case : Reverses a String
	 */
	@Test
	public void testReverseBC() {
		// 1. string is null
		String str = null;
		assertNull(StringUtil.reverse(str));
		// 1. string is 'bat'
		str = "bat";
		assertEquals("tab", StringUtil.reverse(str));
	}

	/**
	 * [Flow #-20] Positive, Negative Case : fill a String
	 */
	@Test
	public void testFillStringBC() {
		String originalStr = "1";
		char ch = '0';
		int cipers = 6;
		assertEquals("000001", StringUtil.fillString(originalStr, ch, cipers));

		originalStr = "12345";
		cipers = 4;
		assertNull(StringUtil.fillString(originalStr, ch, cipers));

	}

	/**
	 * [Flow #-21] Positive, Negative Case : Determine whether a (trimmed)
	 * string is empty
	 */
	@Test
	public void testIsEmptyTrimmedBC() {
		// 1. string is null
		String str = null;
		assertTrue(StringUtil.isEmptyTrimmed(str));

		// 2. string is empty string
		str = "    ";
		assertTrue(StringUtil.isEmptyTrimmed(str));

		// 3. string is not empty string
		str = "not empty";
		assertFalse(StringUtil.isEmptyTrimmed(str));
	}

	/**
	 * [Flow #-22] Positive, Negative Case : Return token list with separator
	 */
	@Test
	public void testGetTokensBC() {
		// 1. original string
		String str = "a,b,c,d";

		// 2. get token list
		assertEquals(4, StringUtil.getTokens(str).size());
	}

}
