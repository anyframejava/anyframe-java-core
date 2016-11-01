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
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Locale;

import org.anyframe.exception.BaseException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.jdbc.datasource.DataSourceUtils;

/**
 * The SequenceIdGenerator requests each Id using a sequence in a database.
 * While not actually pooling batches of Ids like other IdGenerator
 * implementations, making use of this class does make code compatable with
 * other IdGenerators on a configuration basis.
 * <p>
 * The Configuration to use a SequenceIdGenerator look like the following:
 * 
 * <pre>
 *  &lt;property name=&quot;dataSource&quot;&gt;
 *  &lt;ref bean=&quot;util_datasource&quot;/&gt;
 *  &lt;/property&gt;
 *  &lt;config:configuration  block-size=&quot;1&quot; table=&quot;idstest&quot; key-table=&quot;does-not-exist&quot;&gt;	
 *  &lt;query&gt;SELECT nonexisting-sequence.NEXTVAL FROM DUAL&lt;/query&gt;		
 *  &lt;/config:configuration&gt;
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
 * use Apache commons-logging for logging.</li>
 * </ul>
 * 
 * @author <a href="mailto:dev@avalon.apache.org">Avalon Development Team</a>
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim
 */
public class SequenceIdGenServiceImpl extends
		AbstractDataSourceIdGenService implements InitializingBean {

	private String query;

	/**
	 * Gets the next id as a Big Decimal. This method will only be called when
	 * synchronized and when the data type is configured to be BigDecimal.
	 * 
	 * @return the next id as a BigDecimal.
	 * @throws BaseException
	 *             if an Id could not be allocated for any reason.
	 */
	protected BigDecimal getNextBigDecimalIdInner() throws BaseException {
		if (getLogger().isDebugEnabled())
			getLogger().debug(
					messageSource.getMessage("debug.idgen.sequenceid.query",
							new String[] { query }, Locale.getDefault()));

		try {
			// 2009.10.08 - without handling connection directly
			Connection conn = DataSourceUtils.getConnection(getDataSource());
			try {
				PreparedStatement stmt = conn.prepareStatement(query);
				ResultSet rs = stmt.executeQuery();
				if (rs.next()) {
					return rs.getBigDecimal(1);
				} else {
					if (getLogger().isErrorEnabled())
						getLogger()
								.error(
										messageSource
												.getMessage(
														"error.idgen.sequenceid.notallocate.id",
														new String[] {}, Locale
																.getDefault()));
					throw new BaseException(messageSource,
							"error.idgen.sequenceid.notallocate.id");
				}
			} finally {
				// 2009.10.08 - without handling connection directly
				DataSourceUtils.releaseConnection(conn, getDataSource());
			}
			// 2009.10.08 - without handling connection directly
		} catch (Exception e) {
			if (e instanceof BaseException)
				throw (BaseException) e;
			if (getLogger().isErrorEnabled())
				getLogger().error(
						messageSource.getMessage("error.idgen.get.connection",
								new String[] {}, Locale.getDefault()));
			throw new BaseException(messageSource,
					"error.idgen.get.connection", e);
		}
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
		if (getLogger().isDebugEnabled())
			getLogger().debug(
					messageSource.getMessage("debug.idgen.sequenceid.query",
							new String[] { query }, Locale.getDefault()));

		try {
			// 2009.10.08 - without handling connection directly
			Connection conn = DataSourceUtils.getConnection(getDataSource());

			try {
				PreparedStatement stmt = conn.prepareStatement(query);
				ResultSet rs = stmt.executeQuery();
				if (rs.next()) {
					return rs.getLong(1);
				} else {
					if (getLogger().isErrorEnabled())
						getLogger()
								.error(
										messageSource
												.getMessage(
														"error.idgen.sequenceid.notallocate.id",
														new String[] {}, Locale
																.getDefault()));
					throw new BaseException(messageSource,
							"error.idgen.sequenceid.notallocate.id");
				}
			} finally {
				// 2009.10.08 - without handling connection directly
				DataSourceUtils.releaseConnection(conn, getDataSource());
			}
			// 2009.10.08 - without handling connection directly
		} catch (Exception e) {
			if (e instanceof BaseException)
				throw (BaseException) e;
			if (getLogger().isErrorEnabled())
				getLogger().error(
						messageSource.getMessage("error.idgen.get.connection",
								new String[] {}, Locale.getDefault()));
			throw new BaseException(messageSource,
					"error.idgen.get.connection", e);
		}
	}

	/*---------------------------------------------------------------
	 * Configurable Methods
	 *-------------------------------------------------------------*/
	public void setQuery(String query) {
		this.query = query;
	}

	/**
	 * Called by the Container to configure the component.
	 * 
	 * @param configuration
	 *            configuration info used to setup the component.
	 * @throws Exception
	 *             if there are any problems with the configuration.
	 */
	public void afterPropertiesSet() throws Exception {
		if (this.query == null || this.query.equals("")) {
			throw new BaseException(
					"[IDGeneration Service] must have a 'query' property.");
		}
	}
}
