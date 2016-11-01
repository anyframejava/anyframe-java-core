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

import org.anyframe.exception.IdCreationException;
import org.anyframe.idgen.IdGenService;
import org.anyframe.idgen.IdGenStrategy;
import org.slf4j.Logger;

/**
 * Abstract class for IdGenService This service is developed to work on Spring
 * Framework by modifying Excalibur-datasource id generator.
 * <ul>
 * <li>Spring can't recognize Avalon based lifecycle interfaces, so it is
 * impossible to access reference services such as datasource or to configure
 * external properties.</li>
 * <li>Avalon logkit can't be used in Spring or Anyframe, because those
 * frameworks use Apache slf4j for logging.</li>
 * </ul>
 * 
 * @author <a href="mailto:dev@avalon.apache.org">Avalon Development Team</a>
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim 
 */
public abstract class AbstractIdGenService implements IdGenService {

	private static final BigDecimal BIG_DECIMAL_MAX_LONG = new BigDecimal(
			new Long(Long.MAX_VALUE).doubleValue());

	/**
	 * Used to manage internal synchronization.
	 */
	private final Object mSemaphore = new Object();

	private IdGenStrategy strategy = new IdGenStrategy() {
		public String makeId(String originalId, Class<?> clazz) {
			return originalId;
		}
	};

	/**
	 * Data type for the Id Pool.
	 */
	private boolean mUseBigDecimals = false;

	/*---------------------------------------------------------------
	 * Constructors
	 *-------------------------------------------------------------*/
	/**
	 * default constructor
	 */
	public AbstractIdGenService() {
	}

	/**
	 * get IdGenService logger
	 * 
	 * @return Log IdGenService logger
	 */
	protected Logger getLogger() {
		return IdGenService.LOGGER;
	}

	/*---------------------------------------------------------------
	 * Methods
	 *-------------------------------------------------------------*/
	/**
	 * Gets the next id as a Big Decimal. This method will only be called when
	 * synchronized and when the data type is configured to be BigDecimal.
	 * 
	 * @return the next id as a BigDecimal.
	 */
	protected abstract BigDecimal getNextBigDecimalIdInner();

	/**
	 * Gets the next id as a Big Decimal. This method will only be called when
	 * synchronized and when the data type is configured to be BigDecimal.
	 * 
	 * @param tableName
	 *            key of id management table
	 * @return the next id as a BigDecimal.
	 */
	protected abstract BigDecimal getNextBigDecimalIdInner(String tableName);

	/**
	 * Gets the next id as a long. This method will only be called when
	 * synchronized and when the data type is configured to be long.
	 * 
	 * @return the next id as a long.
	 */
	protected abstract long getNextLongIdInner();

	/**
	 * Gets the next id as a long. This method will only be called when
	 * synchronized and when the data type is configured to be long.
	 * 
	 * @param tableName
	 *            key of id management table
	 * @return the next id as a long.
	 */
	protected abstract long getNextLongIdInner(String tableName);

	/**
	 * By default, the IdGenerator will operate using a backend datatype of type
	 * long. This is the most efficient, however it does not allow for Ids that
	 * are larger than Long.MAX_VALUE. To allow very large Ids, it is necessary
	 * to make use of the BigDecimal data storage type. This method should only
	 * be called durring initialization.
	 * 
	 * @param useBigDecimals
	 *            True to set BigDecimal as the internal data type.
	 */
	public void setUseBigDecimals(boolean useBigDecimals) {
		mUseBigDecimals = useBigDecimals;
	}

	/**
	 * Returns true if the internal data type is using BigDecimals, false if it
	 * is using longs.
	 * 
	 * @return boolean check using BigDecimal
	 */
	protected final boolean isUsingBigDecimals() {
		return mUseBigDecimals;
	}

	/**
	 * Gets the next Long Id constraining the value to be less than the
	 * specified maxId.
	 * 
	 * @param maxId
	 *            max id
	 * @return long value to be less than the specified maxId
	 * @throws IdCreationException
	 */
	protected final long getNextLongIdChecked(long maxId) {
		long nextId;
		if (mUseBigDecimals) {
			// Use BigDecimal data type
			BigDecimal bd;
			synchronized (mSemaphore) {
				bd = getNextBigDecimalIdInner();
			}

			// Make sure that the Big Decimal value can
			// be assigned to a
			// long before continuing.
			if (bd.compareTo(BIG_DECIMAL_MAX_LONG) > 0) {
				getLogger()
						.error(
								"[IDGeneration Service] Unable to provide an id.   No more Ids are available, the maximum Long value has been reached.");
				throw new IdCreationException(
						"[IDGeneration Service] Unable to provide an id.   No more Ids are available, the maximum Long value has been reached.");
			}
			nextId = bd.longValue();
		} else {
			// Use long data type
			synchronized (mSemaphore) {
				nextId = getNextLongIdInner();
			}
		}

		// Make sure that the id is valid for the
		// requested data type.
		if (nextId > maxId) {
			getLogger()
					.error(
							"[IDGeneration Service] Unable to provide an id.   No more Ids are available, the maximum Long value has been reached.");
			throw new IdCreationException(
					"[IDGeneration Service] Unable to provide an id.   No more Ids are available, the maximum Long value has been reached.");
		}

		return nextId;
	}

	/*---------------------------------------------------------------
	 * IdGenerator Methods
	 *-------------------------------------------------------------*/

	protected final BigDecimal getNextBigDecimalId(String tableName) {
		BigDecimal bd;
		if (mUseBigDecimals) {
			// Use BigDecimal data type
			synchronized (mSemaphore) {
				bd = getNextBigDecimalIdInner(tableName);
			}
		} else {
			// Use long data type
			synchronized (mSemaphore) {
				bd = new BigDecimal(new Long(getNextLongIdInner(tableName))
						.doubleValue());
			}
		}

		return bd;
	}

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 */
	public final BigDecimal getNextBigDecimalId() {
		return getNextBigDecimalId("");
	}

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 */
	public final long getNextLongId() {
		return getNextLongIdChecked(Long.MAX_VALUE);
	}

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 */
	public final int getNextIntegerId() {
		return (int) getNextLongIdChecked(Integer.MAX_VALUE);
	}

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 */
	public final short getNextShortId() {
		return (short) getNextLongIdChecked(Short.MAX_VALUE);
	}

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 */
	public final byte getNextByteId() {
		return (byte) getNextLongIdChecked(Byte.MAX_VALUE);
	}

	/**
	 * Returns the next Id from the pool. If there is a id generation strategy,
	 * apply next id to strategy. Otherwise return original next id.
	 * 
	 * @return the next Id
	 */
	public final String getNextStringId() {
		return getNextStringId("", null);
	}

	/**
	 * Get the next Id from the pool and apply a specific generation strategy to
	 * that id.
	 * 
	 * @param tableName
	 *            key of id management table
	 * @return the next Id
	 */
	public String getNextStringId(String tableName) {
		return getNextStringId(tableName, null);
	}

	/**
	 * Get the next Id from the pool and apply a specific generation strategy to
	 * that id.
	 * @param clazz
	 *  		  class information that call ID generation service.
	 * @return the next Id
	 */
	public String getNextStringId(Class<?> clazz) {
		return getNextStringId("", clazz);
	}
	
	
	/**
	 * Get the next Id from the pool and apply a specific generation strategy to
	 * that id.
	 * 
	 * @param tableName
	 *            key of id management table
	 * @param clazz
	 *  		  class information that call ID generation service.
	 * @return the next Id
	 */
	public String getNextStringId(String tableName, Class<?> clazz) {
		return strategy.makeId(getNextBigDecimalId(tableName).toString(), clazz);
	}

	/**
	 * getter
	 * 
	 * @return IdGenStrategy
	 */
	public IdGenStrategy getStrategy() {
		return strategy;
	}

	/**
	 * setter
	 * 
	 * @param strategy
	 *            to be set by Spring Framework
	 */
	public void setStrategy(IdGenStrategy strategy) {
		this.strategy = strategy;
	}
}
