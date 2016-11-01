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

import static org.junit.Assert.assertEquals;

import java.io.UnsupportedEncodingException;

import org.junit.Test;

/**
 * For testing functions what DigestUtil supports, there are some test scenarios
 * in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 * @author HyunJung Jeong
 */
public class DigestUtilTest {

	@Test
	public void testEncodeCharset() throws UnsupportedEncodingException {
		assertEquals("Anyframe Java Test",
				DigestUtil.encodeCharset("Anyframe Java Test", "US-ASCII"));
		assertEquals("Anyframe Java Test",
				DigestUtil.encodeCharset("Anyframe Java Test", "ISO-8859-1"));

		String s = new String("Anyframe Java Test".getBytes("UTF-16LE"));
		assertEquals(s,
				DigestUtil.encodeCharset("Anyframe Java Test", "UTF-16LE"));
	}

	@Test(expected = RuntimeException.class)
	public void testEncodeCharsetException() {
		assertEquals("Anyframe Java Test",
				DigestUtil.encodeCharset("Anyframe Java Test", "iso"));
	}

	@Test
	public void testDecodeCharset() {
		assertEquals("Anyframe Java Test",
				DigestUtil.decodeCharset("Anyframe Java Test", "UTF-8"));
	}

	@Test
	public void testEncodeBase64() {
		assertEquals("QW55ZnJhbWUgSmF2YSBUZXN0",
				DigestUtil.encodeBase64("Anyframe Java Test"));
	}

	@Test
	public void testDecodeBase64() {
		assertEquals("Anyframe Java Test",
				DigestUtil.decodeBase64("QW55ZnJhbWUgSmF2YSBUZXN0"));
	}

	@Test
	public void testEncodePassword() {
		assertEquals("9bc34549d565d9505b287de0cd20ac77be1d3f2c",
				DigestUtil.encodePassword("test1234", "SHA"));
		assertEquals("16d7a4fca7442dda3ad93c9a726597e4",
				DigestUtil.encodePassword("test1234", "MD5"));
	}

	@Test(expected = RuntimeException.class)
	public void testEncodePasswordException() {
		assertEquals("16d7a4fca7442dda3ad93c9a726597e4",
				DigestUtil.encodePassword("test1234", "MD"));
	}
}
