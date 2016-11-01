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

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * For testing functions what ValidationUtil supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 * @author HyunJung Jeong
 */
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
		assertTrue(ValidationUtil.isRangeByteLength("Anyframe Java Test", 10,
				20));
		assertTrue(ValidationUtil.isRangeByteLength("애니프레임 자바", 20, 30));
		assertFalse(ValidationUtil.isRangeByteLength("애니프레임 자바", 25, 30));
	}

}
