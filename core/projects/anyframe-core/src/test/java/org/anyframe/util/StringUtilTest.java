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

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

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
	public void testGetRandomStringByCharset()
			throws UnsupportedEncodingException {
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
	public void testCountMatches() {
		assertEquals(3, StringUtil.countMatches("Anyframe Java Test", "a"));
		assertEquals(0, StringUtil.countMatches("Anyframe Java Test", "test"));
		assertEquals(1, StringUtil.countMatches("Anyframe Java Test", "Test"));

		assertEquals(3, StringUtil.countMatches("Anyframe Java Test",
				new char[] { 'a' }));
	}

	@Test
	public void testCompareTo() {
		assertEquals(0, StringUtil.compareTo("Anyframe Java Test",
				"Anyframe Java Test"));
		// 106(j's ascii code) - 74(J's ascii code) = 32
		assertEquals(32, StringUtil.compareTo("Anyframe java Test",
				"Anyframe Java Test"));
		// 97(a's ascii code) - 65(A's ascii code) = 32
		assertEquals(32, StringUtil.compareTo("anyframe java test",
				"Anyframe Java Test"));

		assertEquals(-1, StringUtil.compareTo("Anyframe Java Test", null));
	}

	@Test
	public void testCompareToIgnoreCase() {
		assertEquals(0, StringUtil.compareToIgnoreCase("anyframe java test",
				"Anyframe Java Test"));
		assertEquals(0, StringUtil.compareToIgnoreCase("anyframe java test",
				"Anyframe Java Test"));

		assertEquals(-1,
				StringUtil.compareToIgnoreCase("anyframe java test", null));
	}

	@Test
	public void testIndexOfIgnoreCase() {
		assertEquals(9,
				StringUtil.indexOfIgnoreCase("Anyframe Java Test", "java"));
		assertEquals(9,
				StringUtil.indexOfIgnoreCase("Anyframe Java Test", "Java"));

		assertEquals(-1,
				StringUtil.indexOfIgnoreCase("Anyframe Java Test", null));
	}

	@Test
	public void testGetContainsCountIgnoreCase() {
		assertEquals(4, StringUtil.countMatchesIgnoreCase("Anyframe Java Test",
				new char[] { 'a' }));
		assertEquals(0, StringUtil.countMatchesIgnoreCase("Anyframe Java Test",
				new char[] { 'a', 'T' }));

		assertEquals(4,
				StringUtil.countMatchesIgnoreCase("Anyframe Java Test", "a"));
		assertEquals(1,
				StringUtil.countMatchesIgnoreCase("Anyframe Java Test", "test"));
		assertEquals(1,
				StringUtil.countMatchesIgnoreCase("Anyframe Java Test", "Test"));
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
	public void testLeft() {
		assertEquals("Anyframe Java ",
				StringUtil.left("Anyframe Java Test", 14));
		assertEquals("Anyframe Java Test",
				StringUtil.left("Anyframe Java Test", 18));
	}

	@Test
	public void testRemoveWhitespace() {
		assertEquals("AnyframeJavaTest",
				StringUtil.removeWhitespace("Anyframe Java Test"));
		assertEquals("AnyframeJava",
				StringUtil.removeWhitespace("Anyframe Java"));
		assertEquals("AnyframeJavaTest",
				StringUtil.removeWhitespace("Anyframe Java Test"));
		assertEquals("AnyframeJavaUtilTest",
				StringUtil.removeWhitespace("Anyframe Java Util Test"));
		assertEquals("AnyframeJavaUtilTest",
				StringUtil.removeWhitespace("  Anyframe Java Util Test  "));
	}

	@Test
	public void testLeftTrim() {
		assertEquals("Anyframe Java Test",
				StringUtil.leftTrim("   Anyframe Java Test"));
		assertEquals("Anyframe Java Test   ",
				StringUtil.leftTrim("   Anyframe Java Test   "));
	}

	@Test
	public void testRightTrim() {
		assertEquals("Anyframe Java Test",
				StringUtil.rightTrim("Anyframe Java Test   "));
		assertEquals("   Anyframe Java Test",
				StringUtil.rightTrim("   Anyframe Java Test   "));
	}

	@Test
	public void testLeftPad() {
		assertEquals("    Anyframe", StringUtil.leftPad("Anyframe", 12));
		assertEquals("aaaaAnyframe", StringUtil.leftPad("Anyframe", 12, 'a'));
		assertEquals("JavaAnyframe", StringUtil.leftPad("Anyframe", 12, "Java"));
		assertEquals("JavaJaAnyframe",
				StringUtil.leftPad("Anyframe", 14, "Java"));

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
		assertEquals("Anyframe Jav",
				StringUtil.rightPad("Anyframe", 12, " Java Test"));
		assertEquals("Anyframe Java Test",
				StringUtil.rightPad("Anyframe", 18, " Java Test"));
		assertEquals("Anyframe Java Test Java",
				StringUtil.rightPad("Anyframe", 23, " Java Test"));

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
	public void testRemoveAll() {
		assertEquals("Anyfrme  Test",
				StringUtil.deleteAny("Anyframe Java Test", "Java"));
		assertEquals("Anyfrme Jv est",
				StringUtil.deleteAny("Anyframe Java Test", "aT"));
		assertEquals("frame ava Test",
				StringUtil.deleteAny("Anyframe Java Test", "AnyJ"));
		assertEquals("AnyfrmeJvTes",
				StringUtil.deleteAny("Anyframe\nJava\nTest\n", "at\n"));
	}

	@Test
	public void testConvertToCamelCase() {
		assertEquals("anyframeJavaTest",
				StringUtil.convertToCamelCase("anyframe_java_test"));
		assertEquals("anyframeJavaTest",
				StringUtil.convertToCamelCase("anyframe-java-test", '-'));
		assertEquals("anyframeJavaTest",
				StringUtil.convertToCamelCase("anyframe.java.test", '.'));
	}

	@Test
	public void testConvertToUnderScore() {
		assertEquals("anyframe_java_test",
				StringUtil.convertToUnderScore("anyframeJavaTest"));
	}

	@Test
	public void testReverse() {
		assertEquals("tseT avaJ emarfynA",
				StringUtil.reverse("Anyframe Java Test"));
		assertEquals(null, StringUtil.reverse(null));
	}

	@Test
	public void testNullToString() {
		assertEquals("", StringUtil.nullToString(null));
		assertEquals("", StringUtil.nullToString("    "));
		assertEquals("Anyframe Java Test",
				StringUtil.nullToString("Anyframe Java Test"));
		assertEquals("empty", StringUtil.nullToString(null, "empty"));
		assertEquals("empty", StringUtil.nullToString("    ", "empty"));
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
				StringUtil.replaceFirst(
						"Anyframe Java Test Anyframe Java Test", "Anyframe",
						"Enterprise"));

		assertEquals(null,
				StringUtil.replaceFirst(null, "Anyframe", "Enterprise"));
	}

	@Test
	public void testReplaceLast() {
		assertEquals("Anyframe Java Test Enterprise Java Test",
				StringUtil.replaceLast("Anyframe Java Test Anyframe Java Test",
						"Anyframe", "Enterprise"));
		assertEquals("Anyframe Java Test Anyframe Java Test",
				StringUtil.replaceLast("Anyframe Java Test Anyframe Java Test",
						"any", "Enterprise"));
	}

	@Test
	public void testReplaceAll() {
		assertEquals("Enterprise Java Test Enterprise Java Test",
				StringUtil.replaceAll("Anyframe Java Test Anyframe Java Test",
						"Anyframe", "Enterprise"));
		assertEquals("EnterpriseJavaTestEnterpriseJavaTest",
				StringUtil.replaceAll("AnyframeJavaTestAnyframeJavaTest",
						"Anyframe", "Enterprise"));
		assertEquals("123412341234",
				StringUtil.replaceAll("12ab12ab12ab", "ab", "34"));

		assertEquals(null, StringUtil.replaceAll(null, "ab", "34"));
	}

	@Test
	public void testHtmlEscape() {
		assertEquals("&lt;html&gt;Anyframe Java Test&lt;html&gt;",
				StringUtil.htmlEscape("<html>Anyframe Java Test<html>"));
	}

	@Test
	public void testHtmlUnescape() {
		assertEquals(
				"<html>Anyframe Java Test<html>",
				StringUtil
						.htmlUnescape("&lt;html&gt;Anyframe Java Test&lt;html&gt;"));
	}

	@Test
	public void testSwapFirstLetterCase() {
		assertEquals("Java", StringUtil.swapFirstLetterCase("java"));
		assertEquals("anyframe", StringUtil.swapFirstLetterCase("Anyframe"));
		assertEquals("anyframe Java",
				StringUtil.swapFirstLetterCase("Anyframe Java"));
	}

	@Test
	public void testDeleteFirstMatches() {
		assertEquals("AnyframeJava",
				StringUtil.deleteFirstMatches("Anyframe*Java", "*"));
		assertEquals("AnyframeJava",
				StringUtil.deleteFirstMatches("Anyframe**Java", "**"));
		assertEquals("AnyframeJava",
				StringUtil.deleteFirstMatches("Anyframe---Java", "---"));
		assertEquals("AnyframeJava**Test",
				StringUtil.deleteFirstMatches("Anyframe**Java**Test", "**"));
		assertEquals("Anyframe*Java**Test",
				StringUtil.deleteFirstMatches("Anyframe**Java**Test", "*"));
		assertEquals("Anyframe**Java**Test",
				StringUtil.deleteFirstMatches("Anyframe**Java**Test", "__"));
	}

	@Test
	public void testGetLastString() {
		assertEquals("Test",
				StringUtil.getLastString("Anyframe_Java_Test", "_"));
		assertEquals("Test",
				StringUtil.getLastString("Anyframe__Java__Test", "__"));
		assertEquals("Java", StringUtil.getLastString("Anyframe***Java", "***"));
		assertEquals("Anyframe***Java",
				StringUtil.getLastString("Anyframe***Java", "___"));
	}

	@Test
	public void testTokenizeToStringArray() {
		assertArrayEquals(new String[] { "Anyframe/Java/Test" },
				StringUtil.tokenizeToStringArray("Anyframe/Java/Test", "-"));
		assertArrayEquals(new String[] { "Anyframe", "Java", "Test" },
				StringUtil.tokenizeToStringArray("Anyframe/Java/Test", "/"));
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
		assertTrue(StringUtil.isEmpty(null));
		assertFalse(StringUtil.isEmpty("abc"));
	}

	@Test
	public void testIsEmptyTrimmed() {
		assertTrue(StringUtil.isEmptyTrimmed("   "));
	}

	@Test
	public void testContainsMaxOccurences() {
		assertTrue(StringUtil.containsMaxOccurences("abbbbc", "4"));
		assertFalse(StringUtil.containsMaxOccurences("abbcbb", "4"));
		assertTrue(StringUtil.containsMaxOccurences("letter", "2"));
		assertTrue(StringUtil.containsMaxOccurences("000012300000", "5"));

		assertFalse(StringUtil.containsMaxOccurences(null, "5"));
	}

	@Test
	public void testContainsAny() {
		assertTrue(StringUtil.containsAny("abc*abc", "*"));
		assertTrue(StringUtil.containsAny("abc-abc", "*/-"));
		assertFalse(StringUtil.containsAny("abcabc", "*/-"));
		assertTrue(StringUtil.containsAny("abc-abc",
				new char[] { '*', '/', '-' }));
		assertFalse(StringUtil.containsAny("abc_edf_123", new char[] { '*',
				'/', '-' }));
		assertTrue(StringUtil.containsAny("abc/", new char[] { '*', '/' }));

		assertFalse(StringUtil.containsAny(null, "*"));
	}

	@Test
	public void testIsLetterOrDigit() {
		assertTrue(StringUtil.isLetterOrDigit("abcfds"));
		assertTrue(StringUtil.isLetterOrDigit("127652"));
		assertTrue(StringUtil.isLetterOrDigit("abc12fds"));
		assertFalse(StringUtil.isLetterOrDigit("abc12_fds"));
		assertFalse(StringUtil.isLetterOrDigit("abc12fds'"));
		assertFalse(StringUtil.isLetterOrDigit(null));
		assertFalse(StringUtil.isLetterOrDigit(""));
	}

	@Test
	public void testIsLetter() {
		assertTrue(StringUtil.isLetter("abcfds"));
		assertFalse(StringUtil.isLetter("127652"));
		assertFalse(StringUtil.isLetter("abc12fds"));
		assertFalse(StringUtil.isLetter("abc12_fds"));
		assertFalse(StringUtil.isLetter(null));
		assertFalse(StringUtil.isLetter(""));
	}

	@Test
	public void testGetTokens() {

		List<String> resultList1 = StringUtil.getTokens("Anyframe,Java,Test");

		assertFalse(resultList1.isEmpty());

		for (String tmp : resultList1) {
			System.out.println(tmp);
		}

		List<String> resultList2 = StringUtil.getTokens("Anyframe/Java/Test",
				"/");

		assertFalse(resultList2.isEmpty());

		for (String tmp : resultList2) {
			System.out.println(tmp);
		}
	}

	@Test
	public void testConvertStringCharset() throws UnsupportedEncodingException {
		assertEquals("Anyframe Java Test", StringUtil.convertStringCharset(
				"Anyframe Java Test", "US-ASCII"));
		assertEquals("Anyframe Java Test", StringUtil.convertStringCharset(
				"Anyframe Java Test", "ISO-8859-1"));

		String s = new String("Anyframe Java Test".getBytes("UTF-16LE"));
		assertEquals(s, StringUtil.convertStringCharset("Anyframe Java Test",
				"UTF-16LE"));
	}

	@Test(expected = UnsupportedEncodingException.class)
	public void testConvertStringCharsetException()
			throws UnsupportedEncodingException {
		assertEquals("Anyframe Java Test",
				StringUtil.convertStringCharset("Anyframe Java Test", "iso"));
	}

	@Test
	public void testIsUserFormat() {
		assertTrue(StringUtil.isUserFormat("123,456", "###,###"));
		assertFalse(StringUtil.isUserFormat("123,45A", "###,###"));
		assertFalse(StringUtil.isUserFormat("123456", "###,###"));
		assertTrue(StringUtil.isUserFormat("123-456", "###-###"));
		assertTrue(StringUtil.isUserFormat("123.456", "###.###"));
		assertTrue(StringUtil.isUserFormat("123**456", "###**###"));
		assertTrue(StringUtil.isUserFormat("123^456", "###^###"));
		assertTrue(StringUtil.isUserFormat("123?456", "###?###"));
		assertTrue(StringUtil.isUserFormat("123(456", "###(###"));
	}

	@Test
	public void testIsRegexPatternMatch() {
		assertTrue(StringUtil.isRegexPatternMatch("aaaaab", "a*b"));
		assertFalse(StringUtil.isRegexPatternMatch("cabbbb", "a*b"));
	}

	@Test
	public void testIsPatternMatching() {
		assertTrue(StringUtil.isPatternMatching("abc-def", "*-*"));
		assertFalse(StringUtil.isPatternMatching("abc", "*-*"));
	}

	@Test
	public void testIsPatternInclude() {
		assertTrue(StringUtil.isPatternInclude("asdf@5456", "s"));
		assertFalse(StringUtil.isPatternInclude("asdf5456", "s"));
		assertTrue(StringUtil.isPatternInclude("@", "s"));
		assertFalse(StringUtil.isPatternInclude("1234가나다라", "s"));
		assertTrue(StringUtil.isPatternInclude("가나다@", "s"));
		assertTrue(StringUtil.isPatternInclude("-", "s"));
		assertTrue(StringUtil.isPatternInclude("ㅁㅁ--4", "s"));
		assertTrue(StringUtil.isPatternInclude("한", "k"));
		assertFalse(StringUtil.isPatternInclude("eng", "k"));
		assertTrue(StringUtil.isPatternInclude("eng가", "k"));
		assertTrue(StringUtil.isPatternInclude("123가32", "k"));
		assertFalse(StringUtil.isPatternInclude("eng32", "k"));
		assertTrue(StringUtil.isPatternInclude("eng가", "k"));
		assertTrue(StringUtil.isPatternInclude("가나다", "k"));
		assertFalse(StringUtil.isPatternInclude("", "k"));
		assertTrue(StringUtil.isPatternInclude("asdfsdfsdf", "e"));
		assertTrue(StringUtil.isPatternInclude("asdfs1dfsdf", "e"));
		assertTrue(StringUtil.isPatternInclude("123123123", "n"));
		assertTrue(StringUtil.isPatternInclude("asdfs1dfsdf", "n"));
	}

	@Test
	public void testIsRegexPatternInclude() {
		assertTrue(StringUtil.isRegexPatternInclude("cabbbb", "a*b"));
		assertTrue(StringUtil.isRegexPatternInclude("cccc123123abbbb", "a*b"));
		assertTrue(StringUtil.isRegexPatternInclude("000abbbbsdfs12", "a*b"));
		assertTrue(StringUtil.isRegexPatternInclude("abc", "."));

	}
}
