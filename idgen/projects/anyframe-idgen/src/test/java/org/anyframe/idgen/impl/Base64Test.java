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
package org.anyframe.idgen.impl;

import org.anyframe.idgen.impl.Base64;

import junit.framework.TestCase;

/**
 * For testing functions what Base64 supports, there are some test scenarios in
 * this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class Base64Test extends TestCase {
	/**
	 * [Flow #-1] Positive Case : encode byte array with length and offset,
	 */
	public void testEncodeWithLengthOffset() {
		// 1. encode with length and offset
		byte[] data = new byte[] { 100, 122, 21, 127 };
		int len = 3;
		int off = 1;
		String encodedData1 = Base64.encode(data, off, len);
		assertEquals("ehV/", encodedData1);

		// 2. encode with length and offset
		len = 2;
		off = 2;
		String encodedData2 = Base64.encode(data, off, len);
		assertEquals("FX8=", encodedData2);

		// 3. encode with length and offset
		len = 1;
		off = 3;
		String encodedData3 = Base64.encode(data, off, len);
		assertEquals("fw==", encodedData3);
	}

	/**
	 * [Flow #-2] Positive Case : encode byte array
	 */
	public void testDefaultEncode() {
		// 1. encode
		byte[] data = new byte[] { 100, 122, 21, 127 };
		String encodedData = Base64.encode(data);
		assertEquals("ZHoVfw==", encodedData);
	}
}
