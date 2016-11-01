package org.anyframe.util;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class ValidationUtilTest {

	@Test
	public void testIsResidentRegNumber() {
		assertTrue(ValidationUtil.isResidentRegNumber("871224-1237613"));
		assertFalse(ValidationUtil.isResidentRegNumber("871224-1237611"));
		assertFalse(ValidationUtil.isResidentRegNumber("871224-123761"));
	}

	@Test
	public void testIsIncorpCertNumber() {
		assertTrue(ValidationUtil.isIncorpCertNumber("110111-0398556")); // Samsung
																			// SDS
		assertFalse(ValidationUtil.isIncorpCertNumber("110111-0398555"));
		assertFalse(ValidationUtil.isIncorpCertNumber("11010398556"));
	}

	@Test
	public void testIsBizRegNumber() {
		assertTrue(ValidationUtil.isBizRegNumber("110-81-28774")); // Samsung
																	// SDS
		assertFalse(ValidationUtil.isBizRegNumber("110-81-28773"));
		assertFalse(ValidationUtil.isBizRegNumber("110-81774"));
	}

	@Test
	public void testIsTelephoneNumber() {
		assertTrue(ValidationUtil.isTelephoneNumber("0505-123-1231"));
		assertFalse(ValidationUtil.isTelephoneNumber("0505-12231"));
	}

	@Test
	public void testIsCellphoneNumber() {
		assertTrue(ValidationUtil.isCellphoneNumber("018-1231-0912"));
		assertFalse(ValidationUtil.isCellphoneNumber("018-123912"));
	}

	@Test
	public void testIsEmailAddress() {
		assertTrue(ValidationUtil.isEmailAddress("anyframe@samsung.com"));
		assertTrue(ValidationUtil.isEmailAddress("anyframe.test@samsung.com"));
		assertFalse(ValidationUtil.isEmailAddress("anyframe@test@samsung.com"));
	}

	@Test
	public void testIsCardNumber() {
		assertTrue(ValidationUtil.isCardNumber("4009-1311-1234-4321"));
		assertFalse(ValidationUtil.isCardNumber("4009-1311-1234-432a"));
	}

	@Test
	public void testIsRangeLength() {
		assertTrue(ValidationUtil.isRangeLength("Anyframe Java Test", 10, 20));
		assertTrue(ValidationUtil.isRangeLength("애니프레임 자바", 0, 10));
		assertFalse(ValidationUtil.isRangeLength("애니프레임 자바", 0, 5));
	}

	@Test
	public void testIsRangeByteLength() {
		assertTrue(ValidationUtil.isRangeByteLength("Anyframe Java Test", 10, 20));
		assertTrue(ValidationUtil.isRangeByteLength("애니프레임 자바", 20, 30));
		assertFalse(ValidationUtil.isRangeByteLength("애니프레임 자바", 25, 30));
	}

	@Test
	public void testIsUserFormat() {
		assertTrue(ValidationUtil.isUserFormat("123,456", "###,###"));
		assertFalse(ValidationUtil.isUserFormat("123,45A", "###,###"));
		assertFalse(ValidationUtil.isUserFormat("123456", "###,###"));
		assertTrue(ValidationUtil.isUserFormat("123-456", "###-###"));
		assertTrue(ValidationUtil.isUserFormat("123.456", "###.###"));
		assertTrue(ValidationUtil.isUserFormat("123**456", "###**###"));
		assertTrue(ValidationUtil.isUserFormat("123^456", "###^###"));
		assertTrue(ValidationUtil.isUserFormat("123?456", "###?###"));
		assertTrue(ValidationUtil.isUserFormat("123(456", "###(###"));
	}

	@Test
	public void testIsRegexPatternMatch() {
		assertTrue(ValidationUtil.isRegexPatternMatch("aaaaab", "a*b"));
		assertFalse(ValidationUtil.isRegexPatternMatch("cabbbb", "a*b"));
	}

	@Test
	public void testIsPatternMatching() {
		assertTrue(ValidationUtil.isPatternMatching("abc-def", "*-*"));
		assertFalse(ValidationUtil.isPatternMatching("abc", "*-*"));
	}

	@Test
	public void testIsPatternInclude() {
		assertTrue(ValidationUtil.isPatternInclude("asdf@5456", "s"));
		assertFalse(ValidationUtil.isPatternInclude("asdf5456", "s"));
		assertTrue(ValidationUtil.isPatternInclude("@", "s"));
		assertFalse(ValidationUtil.isPatternInclude("1234가나다라", "s"));
		assertTrue(ValidationUtil.isPatternInclude("가나다@", "s"));
		assertTrue(ValidationUtil.isPatternInclude("-", "s"));
		assertTrue(ValidationUtil.isPatternInclude("ㅁㅁ--4", "s"));
		assertTrue(ValidationUtil.isPatternInclude("한", "k"));
		assertFalse(ValidationUtil.isPatternInclude("eng", "k"));
		assertTrue(ValidationUtil.isPatternInclude("eng가", "k"));
		assertTrue(ValidationUtil.isPatternInclude("123가32", "k"));
		assertFalse(ValidationUtil.isPatternInclude("eng32", "k"));
		assertTrue(ValidationUtil.isPatternInclude("eng가", "k"));
		assertTrue(ValidationUtil.isPatternInclude("가나다", "k"));
		assertFalse(ValidationUtil.isPatternInclude("", "k"));
		assertTrue(ValidationUtil.isPatternInclude("asdfsdfsdf", "e"));
		assertTrue(ValidationUtil.isPatternInclude("asdfs1dfsdf", "e"));
		assertTrue(ValidationUtil.isPatternInclude("123123123", "n"));
		assertTrue(ValidationUtil.isPatternInclude("asdfs1dfsdf", "n"));
	}

	@Test
	public void testIsRegexPatternInclude() {
		assertTrue(ValidationUtil.isRegexPatternInclude("cabbbb", "a*b"));
		assertTrue(ValidationUtil.isRegexPatternInclude("cccc123123abbbb", "a*b"));
		assertTrue(ValidationUtil.isRegexPatternInclude("000abbbbsdfs12", "a*b"));
		assertTrue(ValidationUtil.isRegexPatternInclude("abc", "."));

	}
}
