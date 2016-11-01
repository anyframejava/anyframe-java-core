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

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.StringTokenizer;

import org.anyframe.exception.IdCreationException;
import org.anyframe.exception.InitializationException;
import org.anyframe.idgen.IdGenService;
import org.anyframe.idgen.IdGenStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;

/**
 * IDGenerationService that uses UUID generation scheme. Taken from Service
 * Framework v1.0 The Configuration to use a UUIdGenerator looks like the
 * following:
 * 
 * <pre>
 *  &lt;property name=&quot;address&quot; value=&quot;00:00:F0:79:19:5B&quot;/&gt;
 * </pre>
 * 
 * where "00:00:00:00:00:00" is the MAC address or hardware address of the
 * ethernet adaptor. You could also put your IP address. The address value is
 * necessary for generating the UUID. If you omit the address, The
 * UUIdGenService will generate a random number for the address value.
 * 
 * @author SoYon Lim 
 * @author JongHoon Kim
 */
public class UUIdGenServiceImpl implements IdGenService, InitializingBean {

	private static Logger logger = LoggerFactory
			.getLogger(UUIdGenServiceImpl.class);

	private static final String ERROR_STRING = "address in the configuration should be a valid IP or MAC Address";

	private String mAddressId;

	private String address;

	private short mLoopCounter = 0;

	/**
	 * @see org.anyframe.idgen.IdGenService#getNextBigDecimalId()
	 * @return the next Id
	 */
	public BigDecimal getNextBigDecimalId() {
		String newId = getNextStringId();
		byte[] bytes = newId.getBytes(); // get 16
		// bytes
		BigDecimal bd = new BigDecimal("0");

		for (int i = 0; i < bytes.length; i++) {
			bd = bd.multiply(new BigDecimal("256"));
			bd = bd.add(new BigDecimal(new Integer(((int) bytes[i]) & 0xFF)
					.doubleValue()));
		}

		return bd;
	}

	/**
	 * * @see org.anyframe.idgen.IdGenService#getNextByteId() Not supported
	 * method
	 * 
	 * @return the next Id
	 * @throws UnsupportedOperationException
	 */
	public byte getNextByteId() {
		throw new UnsupportedOperationException(
				"[IDGeneration Service] Current service doesn't support to generate next Byte id.");
	}

	/**
	 * @see org.anyframe.idgen.IdGenService#getNextIntegerId() Not supported
	 *      method
	 * 
	 * @return the next Id
	 * @throws UnsupportedOperationException
	 */
	public int getNextIntegerId() {
		throw new UnsupportedOperationException(
				"[IDGeneration Service] Current service doesn't support to generate next Integer id.");
	}

	/**
	 * @see org.anyframe.idgen.IdGenService#getNextLongId() Not supported method
	 * 
	 * @return the next Id
	 * @throws UnsupportedOperationException
	 */
	public long getNextLongId() {
		throw new UnsupportedOperationException(
				"[IDGeneration Service] Current service doesn't support to generate next Long id.");
	}

	/**
	 * @see org.anyframe.idgen.IdGenService#getNextShortId() Not supported
	 *      method
	 * 
	 * @return the next Id
	 * @throws UnsupportedOperationException
	 */
	public short getNextShortId() {
		throw new UnsupportedOperationException(
				"[IDGeneration Service] Current service doesn't support to generate next Short id.");
	}

	/**
	 * @see org.anyframe.idgen.IdGenService#getNextStringId()
	 * 
	 * @return the next Id
	 */
	public String getNextStringId() {
		return getUUId();
	}

	/**
	 * @see org.anyframe.idgen.IdGenService#getNextStringId(IdGenStrategy
	 *      strategy) Not supported method
	 * 
	 * @param strategy
	 *            strategy for id generation
	 * @return the next Id
	 * @throws UnsupportedOperationException
	 */
	public String getNextStringId(IdGenStrategy strategy) {
		throw new UnsupportedOperationException(
				"[IDGeneration Service] Current service doesn't support to generate next String id.");
	}

	/**
	 * @see org.anyframe.idgen.IdGenService#getNextStringId(String strategyId)
	 *      Not supported method
	 * 
	 * @param strategyId
	 *            strategy identifier for id generation
	 * @return the next Id
	 * @throws UnsupportedOperationException
	 */
	public String getNextStringId(String strategyId) {
		throw new UnsupportedOperationException(
				"[IDGeneration Service] Current service doesn't support to generate next String id.");
	}

	public void setAddress(String address) {
		this.mAddressId = address;
	}

	/**
	 * Called by the Container to initialize.
	 * 
	 * @throws InitializationException
	 */
	public void afterPropertiesSet() {
		byte[] addressBytes = new byte[6];

		if (null == address) {
			logger.warn("IDGeneration Service : Using a random number as the "
					+ "base for id's.  This is not the best method for many "
					+ "purposes, but may be adequate in some circumstances."
					+ " Consider using an IP or ethernet (MAC) address if "
					+ "available. ");
			for (int i = 0; i < 6; i++) {
				addressBytes[i] = (byte) (255 * Math.random());
			}
		} else {
			if (address.indexOf(".") > 0) {
				// we should have an IP
				StringTokenizer stok = new StringTokenizer(address, ".");
				if (stok.countTokens() != 4) {
					throw new InitializationException(ERROR_STRING);
				}
				// this is meant to insure that id's
				// made from ip addresses
				// will not conflict with MAC id's. I
				// think MAC addresses
				// will never have the highest bit set.
				// Though this should
				// be investigated further.
				addressBytes[0] = (byte) 255;
				addressBytes[1] = (byte) 255;
				int i = 2;
				try {
					while (stok.hasMoreTokens()) {
						addressBytes[i++] = Byte
								.parseByte(stok.nextToken(), 16);
					}
				} catch (NumberFormatException e) {
					throw new InitializationException(ERROR_STRING, e);
				}
			} else if (address.indexOf(":") > 0) {
				// we should have a MAC
				StringTokenizer stok = new StringTokenizer(address, ":");
				if (stok.countTokens() != 6) {
					throw new InitializationException(ERROR_STRING);
				}
				int i = 0;
				try {
					while (stok.hasMoreTokens()) {
						// String str =
						// stok.nextToken().toLowerCase();
						addressBytes[i++] = Byte
								.parseByte(stok.nextToken(), 16);
					}
				} catch (NumberFormatException e) {
					throw new InitializationException(ERROR_STRING, e);
				}
			} else {
				throw new InitializationException(ERROR_STRING);
			}
		}
		mAddressId = Base64.encode(addressBytes);
	}

	/**
	 * get unique id
	 * 
	 * @return String unique id
	 */
	private String getUUId() {
		// Prepare a buffer to hold the 6 bytes for the
		// timeID
		byte[] bytes6 = new byte[6];

		// Get the current time
		long timeNow = System.currentTimeMillis();

		// Ignore the most 4 significant bytes
		timeNow = (int) timeNow & 0xFFFFFFFF;

		// Prepare a buffer to hold the 4 less
		// significant bytes of the time
		byte[] bytes4 = new byte[4];

		// Convert the time into a byte array
		toFixSizeByteArray(new BigInteger(String.valueOf(timeNow)), bytes4);
		bytes6[0] = bytes4[0];
		bytes6[1] = bytes4[1];
		bytes6[2] = bytes4[2];
		bytes6[3] = bytes4[3];

		// Get the current counter reading
		short counter = getLoopCounter();

		// Prepare a buffer to hold the 2 bytes of the
		// counter
		byte[] bytes2 = new byte[2];

		// Convert the counter into a byte array
		toFixSizeByteArray(new BigInteger(String.valueOf(counter)), bytes2);
		bytes6[4] = bytes2[0];
		bytes6[5] = bytes2[1];

		// Encode the information in base64
		String mTimeId = Base64.encode(bytes6);

		return (mAddressId + mTimeId).replace('+', '_').replace('/', '@');
	}

	/**
	 * Get the counter value as a signed short
	 * 
	 * @original Get the counter value as a signed short
	 * @return short loop count
	 */
	private synchronized short getLoopCounter() {
		return mLoopCounter++;
	}

	/**
	 * @original This method transforms Java BigInteger type into a fix size
	 *           byte array containing the two's-complement representation of
	 *           the integer. The byte array will be in big-endian byte-order:
	 *           the most significant byte is in the zeroth element. If the
	 *           destination array is shorter then the BigInteger.toByteArray(),
	 *           the the less significant bytes will be copy only. If the
	 *           destination array is longer then the BigInteger.toByteArray(),
	 *           destination will be left padded with zeros.
	 * @param bigInt
	 *            Java BigInteger type
	 * @param destination
	 *            destination array
	 */
	private void toFixSizeByteArray(BigInteger bigInt, byte[] destination) {
		// Prepare the destination
		for (int i = 0; i < destination.length; i++) {
			destination[i] = 0x00;
		}

		// Convert the BigInt to a byte array
		byte[] source = bigInt.toByteArray();

		// Copy only the fix size length
		if (source.length <= destination.length) {
			for (int i = 0; i < source.length; i++) {
				destination[destination.length - source.length + i] = source[i];
			}
		} else {
			for (int i = 0; i < destination.length; i++) {
				destination[i] = source[source.length - destination.length + i];
			}
		}
	}

	/**
	 * @see org.anyframe.idgen.IdGenService#getNextStringId(Class clazz)
	 *      Not supported method
	 * 
	 * @param clazz
	 *            class object for id generation
	 * @return the next Id
	 * @throws UnsupportedOperationException
	 */
	public String getNextStringId(Class<?> clazz) throws IdCreationException {
		throw new UnsupportedOperationException(
				"[IDGeneration Service] Current service doesn't support to generate next String id.");	}

	/**
	 * @see org.anyframe.idgen.IdGenService#getNextStringId(String tableName, Class<?> clazz)
	 *      Not supported method
	 * 
	 * @param tableName
	 *           tableName for id generation
	 * @param clazz
	 *           class object for id generation
	 * @return the next Id
	 * @throws UnsupportedOperationException
	 */
	public String getNextStringId(String tableName, Class<?> clazz)
			throws IdCreationException {
		throw new UnsupportedOperationException(
				"[IDGeneration Service] Current service doesn't support to generate next String id.");
	}
}
