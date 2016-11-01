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
package org.anyframe.idgen;

import java.math.BigDecimal;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.anyframe.exception.BaseException;

/**
 * This service generates unique ID mainly used when new record is inserted to
 * Database or new file is created in file system. SequenceIdGenService
 * requires DatasourceService together for internal use.
 * 
 * This service is developed to work on Spring Framework by modifying Excalibur-datasource id generator.
 * <ul>
 * <li>
 * Spring can't recognize Avalon based lifecycle interfaces, so it is impossible to access reference services 
 * such as datasource or to configure external properties.
 * </li>
 * <li>
 * Avalon logkit can't be used in Spring or Anyframe, because those frameworks use Apache commons-logging for logging.
 * </li>
 * </ul>
 * 
 * @author <a href="mailto:dev@avalon.apache.org">Avalon Development Team</a>
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim
 */
public interface IdGenService {
	Log LOGGER = LogFactory.getLog(IdGenService.class);

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id.
	 * @throws BaseException
	 *             fail to get next BigDecimal
	 */
	BigDecimal getNextBigDecimalId() throws BaseException;

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id.
	 * @throws BaseException
	 *             if the next id is outside of the range of valid longs.
	 */
	long getNextLongId() throws BaseException;

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id.
	 * @throws BaseException
	 *             if the next id is outside of the range of valid integers.
	 */
	int getNextIntegerId() throws BaseException;

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id.
	 * @throws BaseException
	 *             if the next id is outside of the range of valid shorts.
	 */
	short getNextShortId() throws BaseException;

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id.
	 * @throws BaseException
	 *             if the next id is outside of the range of valid bytes.
	 */
	byte getNextByteId() throws BaseException;

	/**
	 * Returns the next Id from the pool. If there is a id generation strategy,
	 * apply next id to strategy. Otherwise return original next id.
	 * 
	 * @return the next Id.
	 * @throws BaseException
	 *             if the next id is outside of the range of valid bytes.
	 */
	String getNextStringId() throws BaseException;

	/**
	 * Get the next Id from the pool and apply a specific generation strategy to
	 * that id.
	 * 
	 * @param strategyId
	 *            generation strategy id
	 * @return the next Id.
	 * @throws BaseException
	 *             if the next id is outside of the range of valid bytes.
	 */
	String getNextStringId(String strategyId) throws BaseException;

	/**
	 * Get the next Id from the pool and apply a specific generation strategy to
	 * that id.
	 * 
	 * @param strategy
	 *            generation strategy instance
	 * @return the next Id.
	 * @throws BaseException
	 *             if the next id is outside of the range of valid bytes.
	 */
	String getNextStringId(IdGenStrategy strategy) throws BaseException;
}
