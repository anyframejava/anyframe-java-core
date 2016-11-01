package org.anyframe.util;

import static org.junit.Assert.assertEquals;

import java.io.UnsupportedEncodingException;

import org.junit.Test;

public class DigestUtilTest {

	@Test
	public void testEncodeCharset() throws UnsupportedEncodingException {
		assertEquals("Anyframe Java Test", DigestUtil.encodeCharset("Anyframe Java Test", "US-ASCII"));
		assertEquals("Anyframe Java Test", DigestUtil.encodeCharset("Anyframe Java Test", "ISO-8859-1"));

		String s = new String("Anyframe Java Test".getBytes("UTF-16LE"));
		assertEquals(s, DigestUtil.encodeCharset("Anyframe Java Test", "UTF-16LE"));
	}

	@Test(expected = RuntimeException.class)
	public void testEncodeCharsetException() {
		assertEquals("Anyframe Java Test", DigestUtil.encodeCharset("Anyframe Java Test", "iso"));
	}

	@Test
	public void testDecodeCharset() {
		assertEquals("Anyframe Java Test", DigestUtil.decodeCharset("Anyframe Java Test", "UTF-8"));
	}

	@Test
	public void testEncodeBase64() {
		assertEquals("QW55ZnJhbWUgSmF2YSBUZXN0", DigestUtil.encodeBase64("Anyframe Java Test"));
	}

	@Test
	public void testDecodeBase64() {
		assertEquals("Anyframe Java Test", DigestUtil.decodeBase64("QW55ZnJhbWUgSmF2YSBUZXN0"));
	}

	@Test
	public void testEncodePassword() {
		assertEquals("9bc34549d565d9505b287de0cd20ac77be1d3f2c", DigestUtil.encodePassword("test1234", "SHA"));
		assertEquals("16d7a4fca7442dda3ad93c9a726597e4", DigestUtil.encodePassword("test1234", "MD5"));
	}

	@Test(expected = RuntimeException.class)
	public void testEncodePasswordException() {
		assertEquals("16d7a4fca7442dda3ad93c9a726597e4", DigestUtil.encodePassword("test1234", "MD"));
	}
}
