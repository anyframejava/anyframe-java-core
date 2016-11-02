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

/**
 * We changed org.apache.axis.encoding.Base64 Class into
 * org.anyframe.idgen.impl.Base64 Class in Anyframe.
 * <ul>
 * <li>remove all decode operations and some incode operations which
 * IdGenService doesn't use.</li>
 * </ul>
 * 
 * @author TAMURA Kent &lt;kent@trl.ibm.co.jp&gt;
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim
 * 
 *         This class is encording/decording the BASE64 type to be defined at
 *         RFC 2045
 */
public abstract class Base64 {
	/**
	 * default constructor
	 */
	private Base64() {

	}

	private static final char[] S_BASE64CHAR = { 'A', 'B', 'C', 'D', 'E', 'F',
			'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
			'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
			'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
			't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5',
			'6', '7', '8', '9', '+', '/' };

	private static final char S_BASE64PAD = '=';

	private static final byte[] S_DECODETABLE = new byte[128];
	static {
		for (int i = 0; i < S_DECODETABLE.length; i++)
			S_DECODETABLE[i] = Byte.MAX_VALUE; // 127
		for (int i = 0; i < S_BASE64CHAR.length; i++)
			// 0 to 63
			S_DECODETABLE[S_BASE64CHAR[i]] = (byte) i;
	}

	/**
	 * Returns base64 representation of specified byte array. <tag>param data
	 * The data to be encoded <tag>return The base64 encoded data
	 * 
	 * @param data
	 *            base64 data to be encoded
	 * @return outstream to be returned a encoded data
	 */
	public static String encode(byte[] data) {
		return encode(data, 0, data.length);
	}

	/**
	 * Returns base64 representation of specified byte array. <tag>param data
	 * The data to be encoded <tag>param off The offset within the data at which
	 * to start encoding <tag>param len The length of the data to encode
	 * <tag>return The base64 encoded data
	 * 
	 * @param data
	 *            base64 data to be encoded
	 * @param off
	 *            data offset
	 * @param len
	 *            data length
	 * @return encoded data
	 */
	public static String encode(byte[] data, int off, int len) {
		if (len <= 0)
			return "";
		char[] out = new char[len / 3 * 4 + 4];
		int rindex = off;
		int windex = 0;
		int rest = len;
		while (rest >= 3) {
			int i = ((data[rindex] & 0xff) << 16)
					+ ((data[rindex + 1] & 0xff) << 8)
					+ (data[rindex + 2] & 0xff);
			out[windex++] = S_BASE64CHAR[i >> 18];
			out[windex++] = S_BASE64CHAR[(i >> 12) & 0x3f];
			out[windex++] = S_BASE64CHAR[(i >> 6) & 0x3f];
			out[windex++] = S_BASE64CHAR[i & 0x3f];
			rindex += 3;
			rest -= 3;
		}
		if (rest == 1) {
			int i = data[rindex] & 0xff;
			out[windex++] = S_BASE64CHAR[i >> 2];
			out[windex++] = S_BASE64CHAR[(i << 4) & 0x3f];
			out[windex++] = S_BASE64PAD;
			out[windex++] = S_BASE64PAD;
		} else if (rest == 2) {
			int i = ((data[rindex] & 0xff) << 8) + (data[rindex + 1] & 0xff);
			out[windex++] = S_BASE64CHAR[i >> 10];
			out[windex++] = S_BASE64CHAR[(i >> 4) & 0x3f];
			out[windex++] = S_BASE64CHAR[(i << 2) & 0x3f];
			out[windex++] = S_BASE64PAD;
		}
		return new String(out, 0, windex);
	}
}
