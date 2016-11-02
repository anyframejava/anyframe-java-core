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
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.anyframe.exception.IdCreationException;
import org.anyframe.exception.MissingRequiredPropertyException;
import org.anyframe.util.StringUtil;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.support.JdbcUtils;

/**
 * The SequenceIdGenerator requests each Id using a sequence in a database.
 * While not actually pooling batches of Ids like other IdGenerator
 * implementations, making use of this class does make code compatable with
 * other IdGenerators on a configuration basis.
 * <p>
 * The Configuration to use a SequenceIdGenerator look like the following:
 * 
 * <pre>
 *  &lt;property name=&quot;dataSource&quot; ref=&quot;util_datasource&quot;/&gt;
 *  &lt;property name=&quot;query&quot; value=&quot;SELECT idstest.NEXTVAL FROM DUAL&quot;/&gt;
 * </pre>
 * 
 * Where user-db is the name of a DataSource configured in a datasources
 * element, and query is any query which will return a single id while
 * maintaining state so that successive calls will continue to return
 * incremented ids.
 * <p>
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
public class SequenceIdGenServiceImpl extends AbstractDataSourceIdGenService
		implements InitializingBean {

	private String query;

	protected BigDecimal getNextBigDecimalIdInner(String tableName) {
		if (!"".equals(tableName)) {
			throw new UnsupportedOperationException(
					"[IDGeneration Service] Current service doesn't support to generate next id based on table '"
							+ tableName + "'.");
		}

		return getNextBigDecimalIdInner();
	}

	protected long getNextLongIdInner(String tableName) {
		if (!"".equals(tableName)) {
			throw new UnsupportedOperationException(
					"[IDGeneration Service] Current service doesn't support to generate next id based on table '"
							+ tableName + "'.");
		}

		return getNextLongIdInner();
	}

	/**
	 * Gets the next id as a Big Decimal. This method will only be called when
	 * synchronized and when the data type is configured to be BigDecimal.
	 * 
	 * @return the next id as a BigDecimal.
	 * @throws IdCreationException
	 */
	protected BigDecimal getNextBigDecimalIdInner() {
		getLogger().debug(
				"[IDGeneration Service] Requesting an Id using query: {}",
				query);
		try {
			// 2009.10.08 - without handling connection directly
			Connection conn = DataSourceUtils.getConnection(getDataSource());
			PreparedStatement stmt = null;
			ResultSet rs = null;
			try {
				stmt = conn.prepareStatement(query);
				rs = stmt.executeQuery();
				if (rs.next()) {
					return rs.getBigDecimal(1);
				} else {
					getLogger()
							.error(
									"[IDGeneration Service] Unable to allocate a block of Ids. Query for Id did not return a value.");
					throw new IdCreationException(
							"[IDGeneration Service] Unable to allocate a block of Ids. Query for Id did not return a value.");
				}
			} finally {
				if (rs != null) {
					JdbcUtils.closeResultSet(rs);
				}
				if (stmt != null) {
					JdbcUtils.closeStatement(stmt);
				}
				// 2009.10.08 - without handling connection directly
				if(conn != null) {
					DataSourceUtils.releaseConnection(conn, getDataSource());	
				}
				
			}
			// 2009.10.08 - without handling connection directly
		} catch (Exception ex) {
			if (ex instanceof IdCreationException)
				throw (IdCreationException) ex;
			getLogger()
					.error(
							"[IDGeneration Service] We can't get a connection. So, unable to allocate a block of Ids.",
							ex);
			throw new IdCreationException(
					"[IDGeneration Service] We can't get a connection. So, unable to allocate a block of Ids.",
					ex);
		}
	}

	/**
	 * Gets the next id as a long. This method will only be called when
	 * synchronized and when the data type is configured to be long.
	 * 
	 * @return the next id as a long.
	 * @throws IdCreationException
	 */
	protected long getNextLongIdInner() {
		getLogger().debug(
				"[IDGeneration Service] Requesting an Id using query: {}",
				query);

		try {
			// 2009.10.08 - without handling connection directly
			Connection conn = DataSourceUtils.getConnection(getDataSource());
			PreparedStatement stmt = null;
			ResultSet rs = null;
			try {
				stmt = conn.prepareStatement(query);
				rs = stmt.executeQuery();
				if (rs.next()) {
					return rs.getLong(1);
				} else {
					getLogger()
							.error(
									"[IDGeneration Service] Unable to allocate a block of Ids. Query for Id did not return a value.");
					throw new IdCreationException(
							"[IDGeneration Service] Unable to allocate a block of Ids. Query for Id did not return a value.");
				}
			} finally {
				if (rs != null) {
					JdbcUtils.closeResultSet(rs);
				}
				if (stmt != null) {
					JdbcUtils.closeStatement(stmt);
				}
				// 2009.10.08 - without handling connection directly
				if(conn != null) {
					DataSourceUtils.releaseConnection(conn, getDataSource());	
				}
			}
			// 2009.10.08 - without handling connection directly
		} catch (Exception ex) {
			if (ex instanceof IdCreationException)
				throw (IdCreationException) ex;
			getLogger()
					.error(
							"[IDGeneration Service] We can't get a connection. So, unable to allocate a block of Ids.",
							ex);
			throw new IdCreationException(
					"[IDGeneration Service] We can't get a connection. So, unable to allocate a block of Ids.",
					ex);
		}
	}

	/*---------------------------------------------------------------
	 * Configurable Methods
	 *-------------------------------------------------------------*/
	public void setQuery(String query) {
		this.query = query;
	}

	/**
	 * Called by the Container to initialize.
	 * 
	 * @throws MissingRequiredPropertyException
	 */
	public void afterPropertiesSet() {
		if (StringUtil.isEmpty(this.query)) {
			throw new MissingRequiredPropertyException(
					"[IDGeneration Service] must have a 'query' property.");
		}
	}
}
