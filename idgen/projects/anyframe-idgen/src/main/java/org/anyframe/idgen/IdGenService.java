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
package org.anyframe.idgen;

import java.math.BigDecimal;

import org.anyframe.exception.IdCreationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This service generates unique ID mainly used when new record is inserted to
 * Database or new file is created in file system. SequenceIdGenService requires
 * DatasourceService together for internal use.
 * 
 * This service is developed to work on Spring Framework by modifying
 * Excalibur-datasource id generator.
 * <ul>
 * <li>
 * Spring can't recognize Avalon based lifecycle interfaces, so it is impossible
 * to access reference services such as datasource or to configure external
 * properties.</li>
 * <li>
 * Avalon logkit can't be used in Spring or Anyframe, because those frameworks
 * use Apache slf4j for logging.</li>
 * </ul>
 * 
 * @author <a href="mailto:dev@avalon.apache.org">Avalon Development Team</a>
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim
 */
public interface IdGenService {
	Logger LOGGER = LoggerFactory.getLogger(IdGenService.class);

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 * 
	 * @throws IdCreationException
	 *             if there is any problem returning the next Id
	 */
	BigDecimal getNextBigDecimalId() throws IdCreationException;

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 * 
	 * @throws IdCreationException
	 *             if there is any problem returning the next Id
	 */
	long getNextLongId() throws IdCreationException;

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 * 
	 * @throws IdCreationException
	 *             if there is any problem returning the next Id
	 */
	int getNextIntegerId() throws IdCreationException;

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 * 
	 * @throws IdCreationException
	 *             if there is any problem returning the next Id
	 */
	short getNextShortId() throws IdCreationException;

	/**
	 * Returns the next Id from the pool.
	 * 
	 * @return the next Id
	 * 
	 * @throws IdCreationException
	 *             if there is any problem returning the next Id
	 */
	byte getNextByteId() throws IdCreationException;

	/**
	 * Returns the next Id based on key defined in configuration file. If there
	 * is a id generation strategy, apply next id to strategy. Otherwise return
	 * original next id.
	 * 
	 * @return the next Id
	 * 
	 * @throws IdCreationException
	 *             if there is any problem returning the next Id
	 */
	String getNextStringId() throws IdCreationException;

	/**
	 * Returns the next Id based on input parameter 'tableName'. If there is a
	 * id generation strategy, apply next id to strategy. Otherwise return
	 * original next id.
	 * 
	 * @param tableName
	 *            key of id management table
	 * @return the next Id
	 * 
	 * @throws IdCreationException
	 *             if there is any problem returning the next Id
	 */
	String getNextStringId(String tableName) throws IdCreationException;
	
	/**
	 * Returns the next Id based on input parameter 'clazz'. If there is a
	 * id generation strategy, apply next id to strategy. Otherwise return
	 * original next id.
	 * 
	 * @param clazz
	 *            class object of class that call this service.
	 * @return the next Id
	 * 
	 * @throws IdCreationException
	 *             if there is any problem returning the next Id
	 */
	String getNextStringId(Class<?> clazz) throws IdCreationException;
	
	/**
	 * Returns the next Id based on input parameter 'tableName' and 'clazz'. If there is a
	 * id generation strategy, apply next id to strategy. Otherwise return
	 * original next id.
	 * 
	 * @param tableName
	 *            key of id management table
	 * @param clazz
	 *            class object of class that call this service.           
	 * @return the next Id
	 * 
	 * @throws IdCreationException
	 *             if there is any problem returning the next Id
	 */
	String getNextStringId(String tableName, Class<?> clazz) throws IdCreationException;
}
