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
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Locale;

import org.anyframe.exception.BaseException;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.support.JdbcUtils;

/**
 * The TableIdGenerator requests blocks of ids from a Database table. The table
 * consists of two columns one called <code>table_name</code> of type CHAR or
 * VARCHAR, and the second called <code>next_id</code> of an integer type large
 * enough to hold your largest ids.
 * <p>
 * The Configuration to use a TableIdGenerator looks like the following:
 * 
 * <pre>
 *  &lt;property name=&quot;dataSource&quot;&gt;
 *  &lt;ref bean=&quot;util_datasource&quot;/&gt;
 *  &lt;/property&gt; 
 *  &lt;config:configuration  block-size=&quot;1&quot; table=&quot;idstest&quot; key-table=&quot;does-not-exist&quot;&gt;				
 *  &lt;/config:configuration&gt;
 * </pre>
 * 
 * Where user-db is the name of a DataSource configured in a datasources
 * element, block-size is the number if ids that are allocated with each query
 * to the databse (defaults to "10"), table is the name of the table which
 * contains the ids (defaults to "ids"), and key-table is the table_name of the
 * row from which the block of ids are allocated (defaults to "id").
 * <p>
 * <p>
 * Depending on your database, the ids table should look something like the
 * following:
 * 
 * <pre>
 *   CREATE TABLE ids (
 *       table_name varchar(16) NOT NULL,
 *       next_id INTEGER NOT NULL,
 *       PRIMARY KEY (table_name)
 *   );
 * </pre>
 * 
 * This service is developed to work on Spring Framework by modifying
 * Excalibur-datasource id generator.
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
public class TableIdGenServiceImpl extends
		AbstractDataSourceBlockIdGenService {

	/**
	 * The name of the table containing the ids.
	 */
	private String mTable = "ids";

	/**
	 * TableName used to reference which ids to allocate.
	 */
	private String mTableName = "id";

	/*---------------------------------------------------------------
	 * Constructors
	 *-------------------------------------------------------------*/
	/**
	 * default constructor
	 */
	public TableIdGenServiceImpl() {
	}

	/*---------------------------------------------------------------
	 * Methods
	 *-------------------------------------------------------------*/
	/**
	 * Allocates a block of ids of the given size and returns the first id.
	 * 
	 * @param blockSize
	 *            number of ids to allocate.
	 * @param useBigDecimals
	 *            returns the first id as a BigDecimal if true, otherwise as a
	 *            Long.
	 * @return either a Long or a BigDecimal depending on the value of
	 *         useBigDecimals
	 * @throws BaseException
	 *             if a block of ids can not be allocated.
	 */
	private Object allocateIdBlock(int blockSize, boolean useBigDecimals)
			throws BaseException {

		if (getLogger().isDebugEnabled()) {
			getLogger().debug("[IDGeneration Service] Allocating a new block of " + new Integer(blockSize) + " ids for key_table " + mTableName +".");
		}

		try {
			// 2009.10.08 - without handling connection directly
			Connection conn = DataSourceUtils.getConnection(getDataSource());

			try {
				// 2009.10.08 - without handling connection directly
				// boolean autoCommit = conn.getAutoCommit();

				Statement stmt = conn.createStatement();

				ResultSet rs = null;
				try {
					// Try to get a block without using
					// transactions. This
					// makes
					// this code
					// portable, but works on the
					// assumption that requesting
					// blocks of ids
					// is a fairly rare thing.
					int tries = 0;
					while (tries < 50) {
						// Find out what the next
						// available id is.
						String query = "SELECT next_id FROM " + mTable
								+ " WHERE table_name = '" + mTableName + "'";
						rs = stmt.executeQuery(query);
						if (!rs.next()) {
							// The row does not exist.
							if (getLogger().isErrorEnabled())
								getLogger()
										.error("[IDGeneration Service] Unable to allocate a block of Ids. no row with table_name='" + mTableName + "' exists in the " + mTable + " table.");
							// 2009.10.08 - without handling connection directly
							// if (!autoCommit) { conn.rollback(); }

							throw new BaseException("[IDGeneration Service] Unable to allocate a block of Ids. no row with table_name='" + mTableName + "' exists in the " + mTable + " table.");
						}

						// Get the next_id using the
						// appropriate data type.
						Object nextId;
						Object newNextId;
						if (useBigDecimals) {
							BigDecimal oldNextId = rs.getBigDecimal(1);
							newNextId = oldNextId.add(new BigDecimal(
									new Integer(blockSize).doubleValue()));
							nextId = oldNextId;
						} else {
							long oldNextId = rs.getLong(1);
							newNextId = new Long(oldNextId + blockSize);
							nextId = new Long(oldNextId);
						}

						// Update the value of next_id
						// in the database so it
						// reflects the full block
						// being allocated. If another
						// process has done the same
						// thing, then this
						// will either throw an
						// exception due to transaction
						// isolation or return
						// an update count of 0. In
						// either case, we will need to
						// try again.
						try {
							// Need to quote next_id
							// values so that MySQL
							// handles large
							// BigDecimals
							// correctly.
							query = "UPDATE " + mTable + " SET next_id = "
									+ newNextId + " " + " WHERE table_name = '"
									+ mTableName + "' " + "   AND next_id = "
									+ nextId + "";
							int updated = stmt.executeUpdate(query);
							if (updated >= 1) {
								// Update was
								// successful.
								// 2009.10.08 - without handling connection
								// directly
								// if (!autoCommit) { conn.commit(); }
								// Return the next id
								// obtained above.
								return nextId;
							} else {
								// May have been a
								// transaction confict.
								// Try
								// again.
								if (getLogger().isDebugEnabled())
									getLogger()
											.debug("[IDGeneration Service] Update resulted in no rows being changed.");
							}
						} catch (SQLException e) {
							// Assume that this was
							// caused by a transaction
							// conflict. Try again.
							// Just show the exception
							// message to keep the
							// output small.
							if (getLogger().isWarnEnabled())
								getLogger().warn("[IDGeneration Service] Encountered an exception attempting to update the {0} table.  May be a transaction confict. Try again. ", e);
						}

						// If we got here, then we
						// failed, roll back the
						// connection so we can
						// try again.
						// 2009.10.08 - without handling connection directly
						// if (!autoCommit) { conn.rollback(); }
						tries++;
					}

					// If we got here then we ran out
					// of tries.
					if (getLogger().isErrorEnabled())
						getLogger().error("[IDGeneration Service] Although too many retries, unable to allocate a block of Ids.");
					return null;
				} finally {
					if (rs != null)
						// 2009.10.08 - without handling connection directly
						JdbcUtils.closeResultSet(rs);
					if (stmt != null)
						// 2009.10.08 - without handling connection directly
						JdbcUtils.closeStatement(stmt);
				}
			} finally {
				if (conn != null)
					// 2009.10.08 - without handling connection directly
					DataSourceUtils.releaseConnection(conn, getDataSource());
			}
			// 2009.10.08 - without handling connection directly
		} catch (Exception e) {
			if (e instanceof BaseException)
				throw (BaseException) e;
			if (getLogger().isErrorEnabled())
				getLogger().error("[IDGeneration Service] Although too many retries, unable to allocate a block of Ids.", e);
			throw new BaseException("[IDGeneration Service] Although too many retries, unable to allocate a block of Ids.", e);
		}
	}

	/*---------------------------------------------------------------
	 * AbstractDataSourceBlockIdGenerator Methods
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
	protected BigDecimal allocateBigDecimalIdBlock(int blockSize)
			throws BaseException {
		return (BigDecimal) allocateIdBlock(blockSize, true);
	}

	/**
	 * Allocates a block, of the given size, of ids from the database.
	 * 
	 * @param blockSize
	 *            number of Ids which are to be allocated.
	 * @return The first id in the allocated block.
	 * @throws BaseException
	 *             if there it was not possible to allocate a block of ids.
	 */
	protected long allocateLongIdBlock(int blockSize) throws BaseException {
		Long id = (Long) allocateIdBlock(blockSize, false);

		return id.longValue();
	}

	/*---------------------------------------------------------------
	 * Configurable Methods
	 *-------------------------------------------------------------*/
	public void setTable(String table) {
		this.mTable = table;
	}

	public void setKey(String key) {
		this.mTableName = key;
	}
}
