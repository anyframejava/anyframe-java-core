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

import java.sql.Connection;

import javax.sql.DataSource;

import org.anyframe.idgen.IdGenService;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.jdbc.datasource.DataSourceUtils;

/**
 * Abstract class for ID generation services using datasources.
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
public abstract class AbstractDataSourceIdGenService extends
		AbstractIdGenService implements IdGenService, DisposableBean {

	protected DataSource dataSource = null;

	/**
	 * Number of allocated Ids remaining before another block must be allocated.
	 */
	protected int mAllocated;

	protected long mNextId;

	/**
	 * Allocates a connection for the caller. The connection must be closed by
	 * the caller when no longer needed.
	 * 
	 * @return an open DB connection.
	 */
	protected Connection getConnection() {
		// 2009.10.08 - without handling connection directly
		return DataSourceUtils.getConnection(getDataSource());
	}

	/**
	 * lifecycle method
	 */
	public void destroy() {
		dataSource = null;
	}

	/**
	 * setter
	 * 
	 * @param dataSource
	 *            dependencies are injected by Spring Framework
	 */
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public DataSource getDataSource() {
		return dataSource;
	}

}
