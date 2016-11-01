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
package org.anyframe.idgen.impl;

import java.math.BigDecimal;
import java.util.Locale;

import org.anyframe.exception.BaseException;
import org.springframework.beans.factory.InitializingBean;

/**
 * The AbstractDataSourceBlockIdGenerator allocates blocks of ids from a
 * DataSource and then provides them as needed. This is useful in reducing
 * communication with the DataSource. This service is developed to work on
 * Spring Framework by modifying Excalibur-datasource id generator.
 * <ul>
 * <li>Spring can't recognize Avalon based lifecycle interfaces, so it is
 * impossible to access reference services such as datasource or to configure
 * external properties.</li>
 * <li>Avalon logkit can't be used in Spring or Anyframe, because those
 * frameworks use Apache commons-logging for logging.</li>
 * </ul>
 * 
 * @author <a href="mailto:dev@avalon.apache.org">Avalon Development Team</a>
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim
 */
public abstract class AbstractDataSourceBlockIdGenService extends
		AbstractDataSourceIdGenService implements InitializingBean {
	/**
	 * The first id in a batch of Ids loaded in from the DataSource.
	 */
	private BigDecimal mFirstBigDecimal;

	/**
	 * The first id in a batch of Ids loaded in from the DataSource.
	 */
	private long mFirstLong;

	/**
	 * The number of ids loaded in each block.
	 */
	private int mBlockSize = 10;

	/**
	 * The number of ids which have been allocated from the current block.
	 */
	private int mAllocated;

	/*---------------------------------------------------------------
	 * Methods
	 *-------------------------------------------------------------*/
	/**
	 * Allocates a block, of the given size, of ids from the database.
	 * 
	 * @param blockSize
	 *            number of Ids which are to be allocated.
	 * @return The first id in the allocated block.
	 * @throws BaseException
	 *             if there it was not possible to allocate a block of ids.
	 */
	protected abstract BigDecimal allocateBigDecimalIdBlock(int blockSize)
			throws BaseException;

	/**
	 * Allocates a block, of the given size, of ids from the database.
	 * 
	 * @param blockSize
	 *            number of Ids which are to be allocated.
	 * @return The first id in the allocated block.
	 * @throws BaseException
	 *             if there it was not possible to allocate a block of ids.
	 */
	protected abstract long allocateLongIdBlock(int blockSize)
			throws BaseException;

	/*---------------------------------------------------------------
	 * AbstractIdGenerator Methods
	 *-------------------------------------------------------------*/
	/**
	 * Gets the next id as a Big Decimal. This method will only be called when
	 * synchronized and when the data type is configured to be BigDecimal.
	 * 
	 * @return the next id as a BigDecimal.
	 * @throws BaseException
	 *             if an Id could not be allocated for any reason.
	 */
	protected BigDecimal getNextBigDecimalIdInner() throws BaseException {
		if (mAllocated >= mBlockSize) {
			// Need to allocate a new batch of ids
			try {
				mFirstBigDecimal = allocateBigDecimalIdBlock(mBlockSize);

				// Reset the allocated count
				mAllocated = 0;
			} catch (BaseException be) {
				// Set the allocated count to signal
				// that there are not any ids
				// available.
				mAllocated = Integer.MAX_VALUE;
				throw be;
			}
		}

		// We know that at least one id is available.
		// Get an id out of the currently allocated
		// block.
		BigDecimal id = mFirstBigDecimal.add(new BigDecimal(new Integer(
				mAllocated).doubleValue()));
		mAllocated++;

		return id;
	}

	/**
	 * Gets the next id as a long. This method will only be called when
	 * synchronized and when the data type is configured to be long.
	 * 
	 * @return the next id as a long.
	 * @throws BaseException
	 *             if an Id could not be allocated for any reason.
	 */
	protected long getNextLongIdInner() throws BaseException {
		if (mAllocated >= mBlockSize) {
			// Need to allocate a new batch of ids
			try {
				mFirstLong = allocateLongIdBlock(mBlockSize);

				// Reset the allocated count
				mAllocated = 0;
			} catch (BaseException e) {
				// Set the allocated count to signal
				// that there are not any ids
				// available.
				mAllocated = Integer.MAX_VALUE;
				throw e;
			}
		}

		// We know that at least one id is available.
		// Get an id out of the currently allocated
		// block.
		long id = mFirstLong + mAllocated;
		if (id < 0) {
			// The value wrapped
			getLogger().error(
					messageSource.getMessage("error.idgen.greater.maxid",
							new String[] { "Long" }, Locale.getDefault()));
			throw new BaseException(messageSource, "error.idgen.greater.maxid");
		}
		mAllocated++;

		return id;
	}

	/*---------------------------------------------------------------
	 * Configurable Methods
	 *-------------------------------------------------------------*/
	public void setBlockSize(int blockSize) {
		this.mBlockSize = blockSize;
	}

	/*---------------------------------------------------------------
	 * Initializable Methods
	 *-------------------------------------------------------------*/
	/**
	 * Called by the Container to initialize the component.
	 * 
	 * @throws Exception
	 *             if there were any problems durring initialization.
	 */
	public void afterPropertiesSet() throws Exception {
		// Set the state so that the first request for
		// an id will load in a
		// block of ids.
		mAllocated = Integer.MAX_VALUE;
	}
}
