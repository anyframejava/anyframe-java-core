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
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.anyframe.exception.IdCreationException;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.support.JdbcUtils;

/**
 * The TableIdGenerator requests blocks of ids from a Database table. The table
 * consists of two columns one called <code>table_name</code> of type CHAR or
 * VARCHAR, and the second called <code>next_id</code> of an integer type large
 * enough to hold your largest ids. (These two column names can be configured.)
 * <p>
 * The Configuration to use a TableIdGenerator looks like the following:
 * 
 * <pre>
 *  &lt;property name=&quot;dataSource&quot; ref=&quot;util_datasource&quot;/&gt; 
 *  &lt;property name=&quot;blockSize&quot; value=&quot;1&quot;/&gt;	
 *  &lt;property name=&quot;table&quot; value=&quot;idstest&quot;/&gt;
 *  &lt;property name=&quot;strategy&quot; ref=&quot;mixPrefix&quot;/&gt;
 *  &lt;property name=&quot;key&quot; value=&quot;MOVIE_ID&quot;/&gt;
 *  &lt;property name=&quot;keyColumn&quot; value=&quot;TABLE_NAME&quot;/&gt;
 *  &lt;property name=&quot;nextValueColumn&quot; value=&quot;NEXT_ID&quot;/&gt; 
 * </pre>
 * 
 * Property 'key', value of the keyColumn in id management table can be
 * <ul>
 * <li>entered as input parameter when calling getNextStringId().</li>
 * <li>defined as property of IdGenerator bean.</li>
 * </ul>
 * Property 'keyColumn', name of the primary key column in id management table
 * can be
 * <ul>
 * <li>defined as property of IdGenerator bean.</li>
 * </ul>
 * Property 'nextValueColumn', name of the id column in id management table can
 * be
 * <ul>
 * <li>defined as property of IdGenerator bean.</li>
 * </ul>
 * 
 * Where user-db is the name of a DataSource configured in a datasources
 * element, blockSize is the number if ids that are allocated with each query to
 * the database (defaults to "10"), table is the name of the table which
 * contains the ids (defaults to "ids"), and key is the table_name of the row
 * from which the block of ids are allocated (defaults to "id").
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
 * frameworks use Apache slf4j for logging.</li>
 * </ul>
 * 
 * @author <a href="mailto:dev@avalon.apache.org">Avalon Development Team</a>
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim
 * @author modified by SungHoon Son
 */
public class TableIdGenServiceImpl extends AbstractDataSourceBlockIdGenService {

	/**
	 * The name of the table containing the ids.
	 */
	private String mTable = "ids";

	/**
	 * TableName used to reference which ids to allocate.
	 */
	private String mTableName = "id";

	/**
	 * ColumnName used to reference primary key column.
	 */
	private String keyColumn = "table_name";

	/**
	 * ColumnName used to reference id column.
	 */
	private String nextValueColumn = "next_id";

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
	 * @param tableName
	 *            key of id management table
	 * @param blockSize
	 *            number of ids to allocate.
	 * @param useBigDecimals
	 *            returns the first id as a BigDecimal if true, otherwise as a
	 *            Long.
	 * @return either a Long or a BigDecimal depending on the value of
	 *         useBigDecimals
	 * @throws IdCreationException
	 */
	private Object allocateIdBlock(String tableName, int blockSize,
			boolean useBigDecimals) {

		tableName = (("".equals(tableName)) ? mTableName : tableName);

		getLogger()
				.debug(
						"[IDGeneration Service] Allocating a new block of {} ids for {}.",
						new Object[] { new Integer(blockSize), tableName });

		try {
			// 2009.10.08 - without handling connection directly
			Connection conn = DataSourceUtils.getConnection(getDataSource());
			Statement stmt = null;
			try {
				// 2009.10.08 - without handling connection directly
				// boolean autoCommit = conn.getAutoCommit();

				stmt = conn.createStatement();

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
						Object oldNextId = null;
						// Find out what the next
						// available id is.
						String query = "SELECT " + nextValueColumn + " FROM "
								+ mTable + " WHERE " + keyColumn + " = '"
								+ tableName + "'";
						rs = stmt.executeQuery(query);

						if (!rs.next()) {
							try {
								query = "INSERT INTO " + mTable + "("
										+ keyColumn + ", " + nextValueColumn
										+ ") VALUES('" + tableName + "', '1')";
								int inserted = stmt.executeUpdate(query);

								if (inserted < 1) {
									getLogger()
											.debug(
													"[IDGeneration Service] no rows in '{}' being inserted.",
													mTable);

									tries++;
									continue;
								}
							} catch (SQLException e) {
								getLogger()
										.warn(
												"[IDGeneration Service] Encountered an exception attempting to insert the '{}'.  May be a transaction conflict. Try again.",
												mTable, e);

								tries++;
								continue;
							}

							oldNextId = (useBigDecimals) ? new BigDecimal(1)
									: new Long(1);
						} else {
							oldNextId = (useBigDecimals) ? rs.getBigDecimal(1)
									: rs.getLong(1);
						}

						Object nextId;
						Object newNextId;
						// Get the next_id using the
						// appropriate data type.
						if (useBigDecimals) {
							newNextId = ((BigDecimal) oldNextId)
									.add(new BigDecimal(new Integer(blockSize)
											.doubleValue()));
							nextId = oldNextId;
						} else {
							newNextId = new Long((Long) oldNextId + blockSize);
							nextId = (Long) oldNextId;
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
							query = "UPDATE " + mTable + " SET "
									+ nextValueColumn + " = " + newNextId
									+ " WHERE " + keyColumn + " = '"
									+ tableName + "' " + "AND "
									+ nextValueColumn + " = " + nextId + "";
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
								// transaction conflict.
								// Try
								// again.
								getLogger()
										.debug(
												"[IDGeneration Service] Update resulted in no rows being changed.");
							}
						} catch (SQLException e) {
							// Assume that this was
							// caused by a transaction
							// conflict. Try again.
							// Just show the exception
							// message to keep the
							// output small.
							
							getLogger()
							.warn(
									"[IDGeneration Service] Encountered an exception attempting to update the '{}'.  May be a transaction conflict. Try again. ",
									mTable, e);
							
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
					getLogger()
							.error(
									"[IDGeneration Service] Although too many retries, unable to allocate a block of Ids.");
					return null;
				} finally {
					if (rs != null) {
						// 2009.10.08 - without handling connection directly
						JdbcUtils.closeResultSet(rs);
					}
					if (stmt != null) {
						// 2009.10.08 - without handling connection directly
						JdbcUtils.closeStatement(stmt);
					}
				}
			} finally {
				if (conn != null) {
					// 2009.10.08 - without handling connection directly
					DataSourceUtils.releaseConnection(conn, getDataSource());
				}
			}
			// 2009.10.08 - without handling connection directly
		} catch (Exception e) {
			getLogger()
					.error(
							"[IDGeneration Service] Although too many retries, unable to allocate a block of Ids.",
							e);
			throw new IdCreationException(
					"[IDGeneration Service] Although too many retries, unable to allocate a block of Ids.",
					e);
		}
	}

	/*---------------------------------------------------------------
	 * AbstractDataSourceBlockIdGenerator Methods
	 *-------------------------------------------------------------*/
	/**
	 * Allocates a block, of the given size, of ids from the database.
	 * 
	 * @param tableName
	 *            key of id management table
	 * @param blockSize
	 *            number of Ids which are to be allocated.
	 * @return The first id in the allocated block.
	 */
	protected BigDecimal allocateBigDecimalIdBlock(String tableName,
			int blockSize) {
		return (BigDecimal) allocateIdBlock(tableName, blockSize, true);
	}

	/**
	 * Allocates a block, of the given size, of ids from the database.
	 * 
	 * @param tableName
	 *            key of id management table
	 * @param blockSize
	 *            number of Ids which are to be allocated.
	 * @return The first id in the allocated block.
	 */
	protected long allocateLongIdBlock(String tableName, int blockSize) {
		Long id = (Long) allocateIdBlock(tableName, blockSize, false);

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

	public void setKeyColumn(String keyColumn) {
		this.keyColumn = keyColumn;
	}

	public void setNextValueColumn(String nextValueColumn) {
		this.nextValueColumn = nextValueColumn;
	}
}
