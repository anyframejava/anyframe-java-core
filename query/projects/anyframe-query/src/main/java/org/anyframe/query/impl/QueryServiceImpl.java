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
package org.anyframe.query.impl;

import java.io.StringWriter;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.anyframe.exception.MissingRequiredPropertyException;
import org.anyframe.query.MappingInfo;
import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.ResultSetMapper;
import org.anyframe.query.RowMetadataCallbackHandler;
import org.anyframe.query.exception.InternalDataAccessException;
import org.anyframe.query.exception.QueryException;
import org.anyframe.query.impl.jdbc.OraclePagingJdbcTemplate;
import org.anyframe.query.impl.jdbc.PagingJdbcTemplate;
import org.anyframe.query.impl.jdbc.PagingNamedParamJdbcTemplate;
import org.anyframe.query.impl.jdbc.generator.PagingSQLGenerator;
import org.anyframe.query.impl.jdbc.mapper.CallbackResultSetMapper;
import org.anyframe.query.impl.jdbc.mapper.DefaultCallbackResultSetMapper;
import org.anyframe.query.impl.jdbc.mapper.ReflectionResultSetMapper;
import org.anyframe.query.impl.jdbc.setter.BatchCallableStatementSetter;
import org.anyframe.query.impl.jdbc.setter.DefaultDynamicSqlParameterSource;
import org.anyframe.query.impl.jdbc.setter.DefaultDynamicSqlParameterSourceContext;
import org.anyframe.query.impl.jdbc.setter.PreparedStatementArgTypeSetter;
import org.anyframe.query.impl.util.NamedParameterUtil;
import org.anyframe.query.impl.util.ParsedSql;
import org.anyframe.query.impl.util.SQLTypeTransfer;
import org.apache.velocity.app.Velocity;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.CallableStatementCreatorFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.SqlTypeValue;
import org.springframework.jdbc.core.StatementCreatorUtils;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.object.BatchSqlUpdate;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * @author Soyon Lim
 */
public class QueryServiceImpl extends AbstractQueryService implements
		QueryService, InitializingBean {
	private static final String DELIMETER = "=";

	private PagingJdbcTemplate jdbcTemplate;

	protected PagingNamedParamJdbcTemplate namedParamJdbcTemplate = null;

	public PagingNamedParamJdbcTemplate getNamedParamJdbcTemplate() {
		return namedParamJdbcTemplate;
	}

	public void setNamedParamJdbcTemplate(
			PagingNamedParamJdbcTemplate namedParamJdbcTemplate) {
		this.namedParamJdbcTemplate = namedParamJdbcTemplate;
	}

	protected LobHandler lobHandler;

	protected PagingSQLGenerator pagingSQLGenerator;

	/** ************* SETTER METHODS ************** */

	/**
	 * @param jdbcTemplate
	 *            the jdbcTemplate to set
	 */
	public void setJdbcTemplate(PagingJdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
		this.namedParamJdbcTemplate = new PagingNamedParamJdbcTemplate(
				jdbcTemplate, jdbcTemplate.getDataSource());
		this.namedParamJdbcTemplate.setExceptionTranslator(jdbcTemplate
				.getExceptionTranslator());
	}

	/**
	 * @param pagingSQLGenerator
	 *            the pagingSQLGenerator to set
	 */
	public void setPagingSQLGenerator(PagingSQLGenerator pagingSQLGenerator) {
		this.pagingSQLGenerator = pagingSQLGenerator;
	}

	/**
	 * @param lobHandler
	 *            the lobHandler to set
	 */
	public void setLobHandler(LobHandler lobHandler) {
		this.lobHandler = lobHandler;
	}

	public LobHandler getLobHandler() {
		return lobHandler;
	}

	/**
	 * initialize
	 * 
	 * @throws MissingRequiredPropertyException
	 */
	public void afterPropertiesSet() {
		super.afterPropertiesSet();
		jdbcTemplate.setPaginationSQLGetter(this.pagingSQLGenerator);

		if (jdbcTemplate.getPaginationSQLGetter() == null) {
			QueryService.LOGGER
					.error("pagingSQLGenerator needs to be defined for executing query. So, you must specify a proper pagingSQLGenerator in QueryService configuration. If you can't find a proper pagingSQLGenerator, you can define a DefaultPagingSQLGenerator as pagingSQLGenerator. But you must read notice of that class before using a DefaultPagingSQLGenerator.");
			throw new MissingRequiredPropertyException(
					"[Query Service] pagingSQLGenerator needs to be defined for QueryService. \n So, you must specify a proper pagingSQLGenerator in QueryService configuration. \n If you can't find a proper pagingSQLGenerator, you can define a DefaultPagingSQLGenerator as pagingSQLGenerator. \n But you must read notice of that class before using a DefaultPagingSQLGenerator.");
		}
	}

	/** ************* SERVICE METHODS ************** */

	/**
	 * Issue update statement (INSERT) using JDBC 2.0 batch updates and
	 * PreparedStatementSetters to set values on a PreparedStatement created by
	 * this method.
	 * 
	 * @param targets
	 *            object of class which is matched with specified table in
	 *            table mappings. is the List type of Object.
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryException
	 *             if there is any problem issuing the update
	 */
	public int[] batchCreate(List<?> targets) throws QueryException {
		String sql = "";
		String className = "";
		try {
			className = targets.get(0).getClass().getName();
			MappingInfo mappingInfo = getSqlRepository().getMappingInfos().get(
					className);
			sql = mappingInfo.getInsertQuery();
			return batchDynamicExecutor(sql, targets);
		} catch (Exception ex) {
			throw processException("batch-insert using object " + className
					+ " defined table mapping", sql, ex);
		}
	}

	/**
	 * Issue update statement (DELETE) using JDBC 2.0 batch updates and
	 * PreparedStatementSetters to set values on a PreparedStatement created by
	 * this method.
	 * 
	 * @param targets
	 *            object of class which is matched with specified table in
	 *            table mappings. is the List type of Object.
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryException
	 *             if there is any problem issuing the update
	 */
	public int[] batchRemove(List<?> targets) throws QueryException {
		String sql = "";
		String className = "";
		try {
			className = targets.get(0).getClass().getName();
			MappingInfo mappingInfo = getSqlRepository().getMappingInfos().get(
					className);
			sql = mappingInfo.getDeleteQuery();
			return batchDynamicExecutor(sql, targets);
		} catch (Exception ex) {
			throw processException("batch-remove using object " + className
					+ " defined table mapping", sql, ex);
		}
	}

	/**
	 * Issue update statement (UPDATE) using JDBC 2.0 batch updates and
	 * PreparedStatementSetters to set values on a PreparedStatement created by
	 * this method.
	 * 
	 * @param targets
	 *            object of class which is matched with specified table in
	 *            table mappings. is the List type of Object.
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryException
	 *             if there is any problem issuing the update
	 */
	public int[] batchUpdate(List<?> targets) throws QueryException {
		String sql = "";
		String className = "";
		try {
			className = targets.get(0).getClass().getName();
			MappingInfo mappingInfo = getSqlRepository().getMappingInfos().get(
					className);
			sql = mappingInfo.getUpdateQuery();
			return batchDynamicExecutor(sql, targets);
		} catch (Exception ex) {
			throw processException("batch-update using object " + className
					+ " defined table mapping", sql, ex);
		}
	}

	/**
	 * Issue update statement (INSERT, UPDATE, DELETE) using JDBC 2.0 batch
	 * updates and PreparedStatementSetters to set values on a PreparedStatement
	 * created by this method.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targets
	 *            a set of variable for executing query (is the List of
	 *            Object[])
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryException
	 *             if there is any problem issuing the update
	 */
	public int[] batchUpdate(String queryId, List<?> targets)
			throws QueryException {
		String sql = "";
		try {
			containesQueryId(queryId);
			QueryInfo queryInfo = getSqlRepository().getQueryInfos().get(
					queryId);

			sql = queryInfo.getQueryString();
			if (queryInfo.isDynamic()) {
				return batchDynamicExecutor(sql, targets);
			} else {
				return batchStaticExecutor(sql, targets);
			}
		} catch (Exception ex) {
			throw processException("batch-update [query id = '" + queryId
					+ "']", sql, ex);
		}
	}

	/**
	 * Issue procedure includes INSERT, UPDATE, DELETE using JDBC 2.0 batch
	 * updates and CallableStatementSetters to set values on a CallableStatement
	 * created by this method.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targets
	 *            a set of variable for executing query (is the List of
	 *            Object[])
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryException
	 *             if there is any problem issuing the update
	 */
	public int[] batchExecute(String queryId, final List<Object[]> targets)
			throws QueryException {
		String sql = "";
		try {
			containesQueryId(queryId);
			QueryInfo queryInfo = getSqlRepository().getQueryInfos().get(
					queryId);

			sql = queryInfo.getQueryString();

			if (this.jdbcTemplate instanceof OraclePagingJdbcTemplate) {
				return ((OraclePagingJdbcTemplate) jdbcTemplate).batchUpdate(
						sql, new BatchCallableStatementSetter() {

							public int getBatchSize() {
								return targets.size();
							}

							public void setValues(CallableStatement cs,
									int index) throws SQLException {
								Object[] args = targets.get(index);
								for (int i = 0; i < args.length; i++) {
									StatementCreatorUtils.setParameterValue(cs,
											i + 1, SqlTypeValue.TYPE_UNKNOWN,
											null, args[i]);
								}
							}
						});
			}
			return batchStaticExecutor(sql, targets);
		} catch (Exception ex) {
			throw processException("batch-execute [query id = '" + queryId
					+ "']", sql, ex);
		}
	}

	/**
	 * Issue update statement (INSERT, UPDATE, DELETE) using JDBC 2.0 batch
	 * updates and PreparedStatementSetters to set values on a PreparedStatement
	 * created by this method Execute update statments, Using update statement
	 * directly without being defined in query mappings.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param targets
	 *            a set of variable for executing query (is the List of
	 *            Object[])
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryException
	 *             if there is any problem issuing the update
	 */
	public int[] batchUpdateBySQL(String sql, String[] types,
			List<Object[]> targets) throws QueryException {
		try {
			return batchExecutor(sql, convertTypes(types), targets);
		} catch (Exception ex) {
			throw processException("batch update by SQL", sql, ex);
		}
	}

	/**
	 * Issue procedure includes INSERT, UPDATE, DELETE using JDBC 2.0 batch
	 * updates and CallableStatementSetters to set values on a CallableStatement
	 * created by this method Execute update statments, Using update statement
	 * directly without being defined in query mappings.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param targets
	 *            a set of variable for executing query (is the List of
	 *            Object[])
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryException
	 *             if there is any problem issuing the update
	 */
	public int[] batchExecuteBySQL(String sql, final String[] types,
			final List<Object[]> targets) throws QueryException {
		try {
			if (this.jdbcTemplate instanceof OraclePagingJdbcTemplate) {
				return ((OraclePagingJdbcTemplate) jdbcTemplate).batchUpdate(
						sql, new BatchCallableStatementSetter() {
							public int getBatchSize() {
								return targets.size();
							}

							public void setValues(CallableStatement cs,
									int index) throws SQLException {
								Object[] args = targets.get(index);
								for (int i = 0; i < args.length; i++) {
									StatementCreatorUtils.setParameterValue(cs,
											i + 1, SQLTypeTransfer
													.getSQLType(types[i]),
											null, args[i]);
								}
							}
						});
			} else {
				return jdbcTemplate.batchUpdate(sql,
						new BatchPreparedStatementSetter() {

							public int getBatchSize() {
								return targets.size();
							}

							public void setValues(PreparedStatement ps,
									int index) throws SQLException {
								Object[] args = targets.get(index);
								for (int i = 0; i < args.length; i++) {
									StatementCreatorUtils.setParameterValue(ps,
											i + 1, SQLTypeTransfer
													.getSQLType(types[i]),
											null, args[i]);
								}
							}
						});
			}
		} catch (Exception ex) {
			throw processException("batch execute by SQL", sql, ex);
		}
	}

	/**
	 * Execute INSERT query, Using object, which class is matched with table by
	 * table mappings.
	 * 
	 * @param obj
	 *            object of class which is matched with specified table in
	 *            table mappings.
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(Object obj) throws QueryException {
		String sql = "";
		String className = "";
		try {
			className = obj.getClass().getName();
			MappingInfo mappingInfo = getSqlRepository().getMappingInfos().get(
					className);

			sql = mappingInfo.getInsertQuery();
			return objectCUDExecutor(obj, sql);
		} catch (Exception ex) {
			throw processException("insert using object " + className
					+ " defined table mapping", sql, ex);
		}
	}

	/**
	 * Execute INSERT query, Using given queryId which defined in mapping xml
	 * files.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(String queryId, Object[] values) throws QueryException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = getSqlRepository().getQueryInfos().get(queryId);

			return sqlCUDExecutor(queryInfo, values);
		} catch (Exception ex) {
			throw processException("insert [query id = '" + queryId + "']",
					getQueryString(queryInfo), ex);
		}
	}

	/**
	 * Execute INSERT query, Using query statement directly without being
	 * defined in query mappings.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            values to bind to the query
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int createBySQL(String sql, String[] types, Object[] values)
			throws QueryException {
		try {
			return sqlCUDExecutor(sql, values, convertTypes(types), false,
					null, null, null);
		} catch (Exception ex) {
			throw processException("insert by SQL", sql, ex);
		}
	}

	/**
	 * Execute a query statement using a CallableStatement.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query, a key-value set of variable
	 * @return Map of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem issuing the execute
	 */
	public Map<String, Object> execute(String queryId, Map<String, ?> values)
			throws QueryException {
		return execute(queryId, values, 0);
	}

	/**
	 * Execute a query statement using a CallableStatement which defined in
	 * query mappings. Returned results which find by condition and belong to
	 * specified page. Caution!. Not supported by some DBMS. (e.g. Oracle 8i)
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query, a key-value set of variable
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @return Map of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem issuing the execute
	 */
	public Map<String, Object> execute(String queryId, Map<String, ?> values,
			int pageIndex) throws QueryException {
		return execute(queryId, values, pageIndex, -1);
	}

	/**
	 * Execute a query statement using a CallableStatement which defined in
	 * query mappings. Returned results which find by condition and belong to
	 * specified page. Caution!. Not supported by some DBMS. (e.g. Oracle 8i)
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query, a key-value set of variable
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return Map of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem issuing the execute
	 */
	public Map<String, Object> execute(String queryId, Map<String, ?> values,
			int pageIndex, int pageSize) throws QueryException {
		String sql = "";
		try {
			containesQueryId(queryId);
			if (pageSize == -1)
				pageSize = getSqlRepository().getFetchCountPerQuery(queryId);
			QueryInfo queryInfo = getSqlRepository().getQueryInfos().get(
					queryId);

			sql = queryInfo.getQueryString();
			List<SqlParameter> paramList = queryInfo.getSqlParameterList();
			CallableStatementCreator callableStatementCreator = new CallableStatementCreatorFactory(
					sql, paramList).newCallableStatementCreator(values);
			return jdbcTemplate.call(getSqlRepository(),
					callableStatementCreator, paramList, queryInfo);
		} catch (Exception ex) {
			throw processException("execute statement [query id = '" + queryId
					+ "']", sql, ex);
		}
	}

	/**
	 * Execute a query statement using a CallableStatement.
	 * 
	 * @param sql
	 *            the SQL call string to execute
	 * @param types
	 *            a set of variable type for executing query. is matched with
	 *            input parameters. A type must belong to fields defined
	 *            java.sql.Types package
	 * @param names
	 *            a set of variable name for executing query
	 * @param bindings
	 *            a set of variable IN-OUT type for executing query
	 * @param values
	 *            values to bind to the query, a key-value set of variable
	 * @return Map of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem issuing the execute
	 */
	public Map<String, Object> executeBySQL(String sql, String[] types,
			String[] names, String[] bindings, Map<String, ?> values)
			throws QueryException {
		return executeBySQL(sql, types, names, bindings, values, 0, 0);
	}

	/**
	 * Execute an Sql call using a CallableStatement.
	 * 
	 * @param sql
	 *            the SQL call string to execute
	 * @param types
	 *            a set of variable type for executing query. is matched with
	 *            input parameters. A type must belong to fields defined
	 *            java.sql.Types package
	 * @param names
	 *            a set of variable name for executing query
	 * @param bindings
	 *            a set of variable IN-OUT type for executing query
	 * @param values
	 *            values to bind to the query, a key-value set of variable
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return Map of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem issuing the execute
	 */
	public Map<String, Object> executeBySQL(String sql, String[] types,
			String[] names, String[] bindings, Map<String, ?> values,
			int pageIndex, int pageSize) throws QueryException {
		try {
			List<SqlParameter> paramList = SQLTypeTransfer.getSqlParameterList(
					types, bindings, names);

			CallableStatementCreator callableStatementCreator = new CallableStatementCreatorFactory(
					sql, paramList).newCallableStatementCreator(values);
			return jdbcTemplate.call(callableStatementCreator, paramList);
		} catch (Exception ex) {
			throw processException("execute by SQL", sql, ex);
		}
	}

	/**
	 * Execute a SELECT query, Using given queryId which defined in mapping xml
	 * files. Returned all results which find by condition.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @return all results. Never returns null; returns the empty collection if
	 *         there were no results.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public <E> List<E> find(String queryId, Object[] values)
			throws QueryException {
		return find(queryId, values, -1, -1, false);
	}

	/**
	 * Execute a SELECT query, Using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @return results. The size of result is same as page size defined query mappings.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public <E> List<E> find(String queryId, Object[] values, int pageIndex)
			throws QueryException {
		return find(queryId, values, pageIndex, -1, true);
	}

	/**
	 * Execute a SELECT query, Using object, which class is matched with table
	 * by table mappings. Returned a result which find by Primary key.
	 * 
	 * @param obj
	 *            object of class which is matched with specified table in
	 *            table mappings.
	 * @return result. The size of result is 1.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	@SuppressWarnings("unchecked")
	public <E> List<E> find(Object obj) throws QueryException {
		String sql = "";
		String className = "";
		try {
			className = obj.getClass().getName();
			MappingInfo mappingInfo = getSqlRepository().getMappingInfos().get(
					className);

			sql = mappingInfo.getSelectByPrimaryKeyQuery();
			// Set up RowCallbackHandler for result mapping
			// 2009.05.28
			CallbackResultSetMapper rowCallbackHandler = new DefaultCallbackResultSetMapper(
					Class.forName(className), mappingInfo, lobHandler,
					getSqlRepository().getNullCheck(), "none");
			// 2009.10.28
			rowCallbackHandler.setSqlLoader(getSqlRepository());

			Map<String, Object> inputMap = new HashMap<String, Object>();
			inputMap.put("anyframe", obj);
			SqlParameterSource sqlParameterSource = new DefaultDynamicSqlParameterSource(
					inputMap);

			namedParamJdbcTemplate.query(sql, sqlParameterSource,
					(RowCallbackHandler) rowCallbackHandler);
			return rowCallbackHandler.getObjects();
		} catch (Exception ex) {
			throw processException("select using object " + className
					+ " defined table mapping", sql, ex);
		}
	}

	/**
	 * Execute a SELECT query, Using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as entered page size
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public <E> List<E> find(String queryId, Object[] values, int pageIndex,
			int pageSize) throws QueryException {
		return find(queryId, values, pageIndex, pageSize, true);
	}

	/**
	 * Execute a SELECT query, Using query statement directly without being
	 * defined in query mappings. Returned all results which find by
	 * condition.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            values to bind to the query
	 * @return all results. Never returns null; returns the empty collection if
	 *         there were no results.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	@SuppressWarnings("unchecked")
	public <E> List<E> findBySQL(String sql, String[] types, Object[] values)
			throws QueryException {
		try {
			return jdbcTemplate.query(sql, values, convertTypes(types),
					this.jdbcTemplate.getMaxFetchSize());
		} catch (Exception ex) {
			throw processException("select by SQL", sql, ex);
		}
	}

	/**
	 * Execute a SELECT query, Using query statement directly without being
	 * defined in query mappings. Returned results which find by condition
	 * and belong to specified page.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            values to bind to the query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as entered page size
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	@SuppressWarnings("unchecked")
	public <E> List<E> findBySQL(String sql, String[] types, Object[] values,
			int pageIndex, int pageSize) throws QueryException {
		try {
			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPageIndex(pageIndex);
			return jdbcTemplate.queryForListWithPagination(sql, values,
					convertTypes(types), this.jdbcTemplate.getMaxFetchSize(),
					paginationVO);
		} catch (Exception ex) {
			throw processException("select by SQL", sql, ex);
		}
	}

	/**
	 * Execute a SELECT query, Using query statement directly without being
	 * defined in query mappings. Returned all results includes total result
	 * size which find by condition.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            values to bind to the query
	 * @return results. Never returns null; returns the empty collection if
	 *         there were no results. The result value includes the query
	 *         execution result and the total result size. And takes values as
	 *         QueryService.LIST, QueryService.COUNT
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Map<String, Object> findBySQLWithRowCount(String sql,
			String[] types, Object[] values) throws QueryException {
		return findBySQLWithRowCount(sql, types, values, -1, -1, false);
	}

	/**
	 * Execute a SELECT query, Using query statement directly without being
	 * defined in query mappings. Returned results includes total result size
	 * which find by condition and belong to specified page.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            values to bind to the query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as entered page size. The
	 *         result value includes the query execution result handled by
	 *         paging and the total result size. And takes values as
	 *         QueryService.LIST, QueryService.COUNT
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Map<String, Object> findBySQLWithRowCount(String sql,
			String[] types, Object[] values, int pageIndex, int pageSize)
			throws QueryException {
		return findBySQLWithRowCount(sql, types, values, pageIndex, pageSize,
				true);
	}

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned all results includes total result size, db column
	 * information which find by condition and belong to specified page.
	 * (pageIndex = 0)
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @return results. The result value includes the query execution result,
	 *         the total result size and the db column information. And takes
	 *         values as QueryService.LIST, QueryService.COUNT,
	 *         QueryService.COL_INFO
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Map<String, Object> findWithColInfo(String queryId, Object[] values)
			throws QueryException {
		return findWithColInfo(queryId, values, -1, -1, false);
	}

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results includes total result size, db column information
	 * which find by condition and belong to specified page.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @return results. The size of result is same as length of result which
	 *         defined a specified query. The result value includes the query
	 *         execution result handled by paging, the total result size and the
	 *         db column information. And takes values as QueryService.LIST,
	 *         QueryService.COUNT, QueryService.COL_INFO
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Map<String, Object> findWithColInfo(String queryId, Object[] values,
			int pageIndex) throws QueryException {
		return findWithColInfo(queryId, values, pageIndex, -1, true);
	}

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results includes total result size, db column information
	 * which find by condition and belong to specified page.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as entered page size. The
	 *         result value includes the query execution result handled by
	 *         paging, the total result size and db column information. And
	 *         takes values as QueryService.LIST, QueryService.COUNT,
	 *         QueryService.COL_INFO
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Map<String, Object> findWithColInfo(String queryId, Object[] values,
			int pageIndex, int pageSize) throws QueryException {
		return findWithColInfo(queryId, values, pageIndex, pageSize, true);
	}

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned all results includes total result size which find by
	 * condition. (pageIndex = 0)
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @return results. The result value includes the query execution result
	 *         handled by paging and the total result size. And takes values as
	 *         QueryService.LIST, QueryService.COUNT
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Map<String, Object> findWithRowCount(String queryId, Object[] values)
			throws QueryException {
		return findWithRowCount(queryId, values, -1, -1, false);
	}

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results includes total result size which find by
	 * condition and belong to specified page.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @return results. The size of result is same as length of result which
	 *         defined a specified query. The result value includes the query
	 *         execution result handled by paging and the total result size. And
	 *         takes values as QueryService.LIST, QueryService.COUNT
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Map<String, Object> findWithRowCount(String queryId,
			Object[] values, int pageIndex) throws QueryException {
		return findWithRowCount(queryId, values, pageIndex, -1, true);
	}

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results includes total result size which find by
	 * condition and belong to specified page.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as entered page size. The
	 *         result value includes the query execution result handled by
	 *         paging and the total result size. And takes values as
	 *         QueryService.LIST, QueryService.COUNT
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Map<String, Object> findWithRowCount(String queryId,
			Object[] values, int pageIndex, int pageSize) throws QueryException {
		return findWithRowCount(queryId, values, pageIndex, pageSize, true);
	}

	/**
	 * Execute DELETE query, using object, which class is matched with table by
	 * table mappings.
	 * 
	 * @param obj
	 *            object of class which is matched with specified table in
	 *            table mappings.
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int remove(Object obj) throws QueryException {
		String sql = "";
		String className = "";
		try {
			className = obj.getClass().getName();
			MappingInfo mappingInfo = getSqlRepository().getMappingInfos().get(
					className);

			sql = mappingInfo.getDeleteQuery();
			return objectCUDExecutor(obj, sql);
		} catch (Exception ex) {
			throw processException("delete using object " + className
					+ " defined table mapping", sql, ex);
		}
	}

	/**
	 * Execute DELETE query, using given queryId which defined in mapping xml
	 * files.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int remove(String queryId, Object[] values) throws QueryException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = getSqlRepository().getQueryInfos().get(queryId);

			return sqlCUDExecutor(queryInfo, values);
		} catch (Exception ex) {
			throw processException("delete [query id = '" + queryId + "']",
					getQueryString(queryInfo), ex);
		}
	}

	/**
	 * Execute DELETE query, using query statement directly without being
	 * defined in query mappings.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            values to bind to the query
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int removeBySQL(String sql, String[] types, Object[] values)
			throws QueryException {
		try {
			return sqlCUDExecutor(sql, values, convertTypes(types), false,
					null, null, null);
		} catch (Exception ex) {
			throw processException("remove by SQL", sql, ex);
		}
	}

	/**
	 * Execute UPDATE query, using object, which class is matched with table by
	 * table mappings.
	 * 
	 * @param obj
	 *            object of class which is matched with specified table in
	 *            table mappings.
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(Object obj) throws QueryException {
		String className = "";
		String sql = "";
		try {
			className = obj.getClass().getName();
			MappingInfo mappingInfo = getSqlRepository().getMappingInfos().get(
					className);

			sql = mappingInfo.getUpdateQuery();
			return objectCUDExecutor(obj, sql);
		} catch (Exception ex) {
			throw processException("update using object " + className
					+ " defined table mapping", sql, ex);
		}
	}

	/**
	 * Execute UPDATE query, using given queryId which defined in mapping xml
	 * files.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            values to bind to the query
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(String queryId, Object[] values) throws QueryException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = getSqlRepository().getQueryInfos().get(queryId);

			return sqlCUDExecutor(queryInfo, values);
		} catch (Exception ex) {
			throw processException("update [query id = '" + queryId + "']",
					getQueryString(queryInfo), ex);

		}
	}

	/**
	 * Execute UPDATE query, using query statement directly without being
	 * defined in query mappings.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            values to bind to the query
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int updateBySQL(String sql, String[] types, Object[] values)
			throws QueryException {
		try {
			return sqlCUDExecutor(sql, values, convertTypes(types), false,
					null, null, null);
		} catch (Exception ex) {
			throw processException("update by SQL", sql, ex);
		}
	}

	/**
	 * Count all queries which defined in query mappings.
	 * 
	 * @return number of queries
	 */
	public int countQuery() {
		return getSqlRepository().countQuery();
	}

	/**
	 * Find all queries which defined in query mappings.
	 * 
	 * @return map of queryId and query statement.
	 * @throws QueryException
	 *             if there is any problem making query map
	 */
	public Map<String, String> getQueryMap() throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();
		try {
			Set<String> keys = getSqlRepository().getQueryInfos().keySet();
			Iterator<String> keyItr = keys.iterator();

			while (keyItr.hasNext()) {
				String queryId = keyItr.next();
				QueryInfo queryInfo = getSqlRepository().getQueryInfos().get(
						queryId);
				String statement = queryInfo.getQueryString();
				queryMap.put(queryId, statement);
			}

			return queryMap;
		} catch (Exception ex) {
			throw new QueryException(
					"Query Service : Fail to make query map consist of queryId and statement.\n Reason = ["
							+ ex.getMessage() + "]", ex);
		}
	}

	/**
	 * Find parameters for specified query.
	 * 
	 * @param queryId
	 *            identifier of query statement which defined in query mappings
	 * @return ArrayList consist of param type and name
	 * @throws QueryException
	 *             if there is any problem find parameters.
	 */
	public List<String[]> getQueryParams(String queryId) throws QueryException {
		try {
			QueryInfo queryInfo = getSqlRepository().getQueryInfos().get(
					queryId);

			List<SqlParameter> paramList = queryInfo.getSqlParameterList();

			List<String[]> results = new ArrayList<String[]>();
			for (int i = 0; i < paramList.size(); i++) {
				String[] params = new String[2];
				SqlParameter param = paramList.get(i);
				params[0] = param.getName();
				String paramTypeName = param.getTypeName();

				// In the case param type is OTHER or CURSOR,
				// when SqlOutParameter is set, there is no API which can set up
				// param type name. Therefore, check it separately and add logic
				// for setting.

				if (paramTypeName == null) {
					int type = param.getSqlType();
					paramTypeName = SQLTypeTransfer.getSQLTypeName(type);
				}

				params[1] = paramTypeName;
				results.add(params);
			}

			return results;
		} catch (Exception ex) {
			throw new QueryException(
					"Query Service : Fail to find query's parameters for specified query with queryId ["
							+ queryId
							+ "].\n Reason = ["
							+ ex.getMessage()
							+ "]", ex);
		}
	}

	/**
	 * Get JdbcTemplate which QueryService uses.
	 * 
	 * @return JdbcTemplate instance which set in configuration file
	 */
	public JdbcTemplate getQueryServiceJdbcTemplate() {
		return jdbcTemplate;
	}

	/**
	 * Find specified query statement which defined in query mappings.
	 * 
	 * @param queryId
	 *            identifier of query statement which defined in query mappings
	 * @return query statement
	 */
	public String getStatement(String queryId) {
		QueryInfo queryInfo = getSqlRepository().getQueryInfos().get(queryId);
		String sql = queryInfo.getQueryString();
		return sql;
	}

	/**
	 * Find specified query information which defined in query mappings.
	 * 
	 * @param queryId
	 *            identifier of query statement which defined in query mappings
	 * @return query information includes queryId, query statement, result
	 *         class, result maaping style, query params, max fetch size, etc.)
	 */
	public QueryInfo getQueryInfo(String queryId) {
		return getSqlRepository().getQueryInfos().get(queryId);
	}

	/** ************* PROTECTED METHODS ************** */

	/**
	 * Entered SQL by using BatchSqlUpdate class, execute Batch handling.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package.
	 * @param targets
	 *            object of class which is matched with specified table in XML
	 *            files. is the List type of Object Array.
	 * @return an array of the number of rows affected by each statement.
	 */
	protected int[] batchExecutor(final String sql, int[] types,
			final List<Object[]> targets) throws QueryException {
		if (targets.size() <= 0)
			throw new QueryException(
					"Query Service : batchCreate needs at least 1 variables.");

		BatchSqlUpdate sqlBatch = new BatchSqlUpdate();
		sqlBatch.setJdbcTemplate(jdbcTemplate);
		sqlBatch.setSql(sql);

		for (int i = 0; types != null && i < types.length; i++) {
			SqlParameter sp = new SqlParameter(types[i]);
			sqlBatch.declareParameter(sp);
		}
		sqlBatch.compile();

		for (int i = 0; i < targets.size(); i++) {
			Object obj = targets.get(i);
			if (obj instanceof Object[])
				sqlBatch.update((Object[]) obj);
		}
		return sqlBatch.flush();
	}

	/**
	 * By calling for batchUpdate method of Spring JdbcTemplate regarding
	 * Dynamic SQL, process Update and Delete as Batch. ( In the case instance
	 * list of mapped class in a specific table is entered and relevant SQL
	 * isDynamic is true )
	 * 
	 * @param sql
	 *            dynamic query statement.
	 * @param targets
	 *            object of class which is matched with specified table in XML
	 *            files. is the List type of Object Array.
	 * @return an array of the number of rows affected by each statement
	 */
	protected int[] batchDynamicExecutor(final String sql, final List<?> targets) {
		// Analyze all Bind Variables via NamedParameterUtils and transform them
		// into Prepared Statement format.
		final ParsedSql parsedSql = NamedParameterUtil.parseSqlStatement(sql);
		return jdbcTemplate.batchUpdate(parsedSql.getNewSql(),
				new BatchPreparedStatementSetter() {

					public int getBatchSize() {
						return targets.size();
					}

					// callback method called for by Spring JdbcTemplate
					@SuppressWarnings("unchecked")
					public void setValues(PreparedStatement ps, int index)
							throws SQLException {
						Map<Object, Object> properties = new HashMap<Object, Object>();
						String[] parameterName = parsedSql.getParameterNames();
						String name = "";
						for (String names : parameterName) {
							name = names;
							break;
						}

						if (targets.get(index) instanceof Map)
							properties = (Map<Object, Object>) targets.get(index);

						else if (targets.get(index) instanceof Object[]) {
							Object[] params = (Object[]) targets.get(index);
							for (int i = 0; i < params.length; i++) {
								if (params[i] instanceof Object[]
										&& ((Object[]) params[i]).length == 2) {
									Object[] param = (Object[]) params[i];
									properties.put(param[0], param[1]);
								}
							}
						} else {
							// by junghwan.hong 12.04.03 add to ':vo" type
							if (name.startsWith("anyframe"))
								properties.put("anyframe", targets.get(index));
							else
								properties.put("vo", targets.get(index));

						}

						// Find all Bind Variables to set at relevant dynamic
						// SQL at inputMap via NamedParameterUtils and transfer
						// them in the format of sequence.
						Object[] args = NamedParameterUtil
								.buildValueArray(parsedSql,
										new DefaultDynamicSqlParameterSource(
												properties));
						// Set the value for the parameter
						for (int i = 0; i < args.length; i++) {
							StatementCreatorUtils.setParameterValue(ps, i + 1,
									SqlTypeValue.TYPE_UNKNOWN, null, args[i]);
						}
					}
				});
	}

	/**
	 * By calling for batchUpdate method of Spring JdbcTemplate regarding
	 * ordinary SQL, process Insert, Update and Delete as Batch. (relevant SQL
	 * isDynamic is false)
	 * 
	 * @param sql
	 *            static query statement.
	 * @param targets
	 *            object of class which is matched with specified table in XML
	 *            files. is the List type of Object Array.
	 * @return an array of the number of rows affected by each statement
	 */
	protected int[] batchStaticExecutor(final String sql, final List<?> targets) {
		return jdbcTemplate.batchUpdate(sql,
				new BatchPreparedStatementSetter() {

					public int getBatchSize() {
						return targets.size();
					}

					// callback method called for by Spring JdbcTemplate
					public void setValues(PreparedStatement ps, int index)
							throws SQLException {
						Object[] args = (Object[]) targets.get(index);
						// Set the value for the parameter
						for (int i = 0; i < args.length; i++) {
							StatementCreatorUtils.setParameterValue(ps, i + 1,
									SqlTypeValue.TYPE_UNKNOWN, null, args[i]);
						}
					}
				});
	}

	/**
	 * By using entered SQL Type Name, find java.sql.Types matching it.
	 * 
	 * @param types
	 *            SQL Type Names
	 * @return an array of the SQL Type
	 */
	protected int[] convertTypes(String[] types) {
		int[] iTypes = new int[types.length];
		for (int i = 0; i < types.length; i++) {
			iTypes[i] = SQLTypeTransfer.getSQLType(types[i]);
		}
		return iTypes;
	}

	/**
	 * Entering object alone executes INSERT, UPDATE and DELETE on single case
	 * of data.
	 * 
	 * @param obj
	 *            Object targeted for INSERT, UPDATE and DELETE
	 * @param sql
	 *            Automatically created query statement based on table mapping
	 *            information by QueryService
	 * @return the number of rows affected
	 */
	protected int objectCUDExecutor(Object obj, String sql) {
		Map<String, Object> properties = new HashMap<String, Object>();
		properties.put("anyframe", obj);
		return namedParamJdbcTemplate.update(sql,
				new DefaultDynamicSqlParameterSource(properties));
	}

	/**
	 * After finding and setting SQL Type of Variable based on query mapping
	 * information serving as a specific query I.D., execute query statement by
	 * calling for sqlCUDExecutor method.
	 * 
	 * @param queryInfo
	 *            Query mapping information serving as a specific queryId.
	 * @param values
	 *            a set of variable for executing query
	 * @return the number of rows affected
	 */
	protected int sqlCUDExecutor(QueryInfo queryInfo, Object[] values) {
		int[] types = null;

		if (!queryInfo.isDynamic()) {
			types = queryInfo.getSqlTypes();
		} else {
			types = generateValueTypes(queryInfo, values);
		}

		return sqlCUDExecutor(queryInfo.getQueryString(), values, types,
				queryInfo.isDynamic(), queryInfo.getLobStatement(), queryInfo
						.getLobParamTypes(), queryInfo.getQueryId());
	}

	/**
	 * Complete and execute query statement to be executed based on query
	 * mapping information serving as a specific queryId.
	 * 
	 * @param sql
	 *            query statement.
	 * @param values
	 *            a set of variable for executing query
	 * @param types
	 *            an array of the SQL Type
	 * @param isDynamic
	 *            whether dynamic query statement
	 * @param lobStatement
	 *            lob statement (update for Handling Lob of Oracle 8i)
	 * @param queryId
	 *            identifier of query statement to execute
	 * @return the number of rows affected
	 * @throws QueryException
	 *             In the case query statement to be executed fails to be
	 *             completed
	 */
	protected int sqlCUDExecutor(String sql, Object[] values, int[] types,
			boolean isDynamic, String lobStatement, String[] lobParamTypes,
			String queryId) {
		boolean hasLobStatement = false;

		Object[] inputValues = values;
		if (lobStatement != null) {
			hasLobStatement = true;
			if (values.length != 3 || !(values[0] instanceof Object[])
					|| !(values[1] instanceof Object[])
					|| !(values[2] instanceof Object[])) {
				throw new QueryException(
						"Query Service : Lob CUD Type Value must be like this : Object[]{Object[] for main statement, Object[] for lob statement, Object[] for lob value}}");
			}
			inputValues = (Object[]) values[0];
		}

		DefaultDynamicSqlParameterSource sqlParameterSource = null;
		if (isDynamic) {
			sqlParameterSource = new DefaultDynamicSqlParameterSource();
			generatePropertiesMap(values, types, sqlParameterSource);

			sql = getRunnableSQL(sql, sqlParameterSource);

			if (isVelocity(sql)) {
				StringWriter writer = new StringWriter();
				try {
					Velocity.evaluate(
							new DefaultDynamicSqlParameterSourceContext(
									sqlParameterSource), writer,
							"QueryService", sql);
				} catch (Exception ex) {
					throw new QueryException(
							"Query Service : Velocity evaluation failed", ex);
				}
				sql = writer.toString();
			}
		}

		// 2008.05.08 - update for Handling Lob of
		// Oracle 8i
		if (hasLobStatement) {
			return jdbcTemplate.update(sql, inputValues, lobHandler,
					lobStatement, lobParamTypes, (Object[]) values[1],
					(Object[]) values[2]);
		} else {
			if (isDynamic) {
				return namedParamJdbcTemplate.update(sql, sqlParameterSource,
						lobHandler);
			} else {
				if (types == null)
					return jdbcTemplate.update(sql, values);
				else
					return jdbcTemplate.update(sql,
							new PreparedStatementArgTypeSetter(values, types,
									lobHandler));
			}
		}
	}

	/**
	 * ************* PRIVATE Internal METHODS **************
	 */

	private <E> List<E> find(String queryId, Object[] values, int pageIndex,
			int pageSize, boolean paging) throws QueryException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = getSqlRepository().getQueryInfos().get(queryId);

			if (pageSize <= 0)
				pageSize = getSqlRepository().getFetchCountPerQuery(queryId);

			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPaging(paging);
			paginationVO.setPageIndex(pageIndex);

			return findInternal(queryInfo, queryId, values, paginationVO,
					paging, null);
		} catch (Exception ex) {
			throw processException("execute statement [query id = '" + queryId
					+ "']", getQueryString(queryInfo), ex);
		}
	}

	private Map<String, Object> findWithRowCount(String queryId,
			Object[] values, int pageIndex, int pageSize, boolean paging)
			throws QueryException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = getSqlRepository().getQueryInfos().get(queryId);

			if (pageSize == -1)
				pageSize = getSqlRepository().getFetchCountPerQuery(queryId);

			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPaging(paging);
			paginationVO.setPageIndex(pageIndex);
			paginationVO.setCountRecordSize(true);

			List<?> list = findInternal(queryInfo, queryId, values,
					paginationVO, paging, null);

			long count = 0;

			if (!paging)
				count = list.size();
			else
				count = paginationVO.getRecordCount();

			return makeResultMap(list, count, null);
		} catch (Exception ex) {
			throw processException("select by paging [query id = '" + queryId
					+ "']", getQueryString(queryInfo), ex);
		}
	}

	private Map<String, Object> findBySQLWithRowCount(String sql,
			String[] types, Object[] values, int pageIndex, int pageSize,
			boolean paging) throws QueryException {
		try {
			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPageIndex(pageIndex);
			paginationVO.setCountRecordSize(true);
			paginationVO.setPaging(paging);

			List<?> list = null;

			int queryMaxFetchSize = this.jdbcTemplate.getMaxFetchSize();

			if (!paging) {
				list = jdbcTemplate.query(sql, values, convertTypes(types),
						queryMaxFetchSize);
			} else {
				list = jdbcTemplate.queryForListWithPagination(sql, values,
						convertTypes(types), queryMaxFetchSize, paginationVO);
			}

			return makeResultMap(list, paginationVO.getRecordCount(), null);
		} catch (Exception ex) {
			throw processException("select by paging SQL", sql, ex);
		}
	}

	@SuppressWarnings("unchecked")
	private Map<String, Object> findWithColInfo(String queryId,
			Object[] values, int pageIndex, int pageSize, boolean paging)
			throws QueryException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = getSqlRepository().getQueryInfos().get(queryId);

			if (pageSize == -1)
				pageSize = getSqlRepository().getFetchCountPerQuery(queryId);

			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPaging(paging);
			paginationVO.setPageIndex(pageIndex);
			paginationVO.setCountRecordSize(true);

			ReflectionResultSetMapper rowCallbackHandler = createResultSetMapper(
					queryInfo, lobHandler, getSqlRepository().getNullCheck());
			((RowMetadataCallbackHandler) rowCallbackHandler)
					.setNeedColumnInfo(true);

			List<?> resultList = findInternal(queryInfo, queryId, values,
					paginationVO, paging, rowCallbackHandler);

			long count = 0;
			if (!paging)
				count = resultList.size();
			else
				count = paginationVO.getRecordCount();
			return makeResultMap(resultList, count, rowCallbackHandler
					.getColumnInfo());
		} catch (Exception ex) {
			throw processException("select with column info [query id = '"
					+ queryId + "']", getQueryString(queryInfo), ex);
		}
	}

	/**
	 * In the case QueryI.D. which is transferred as input parameter with method
	 * used in processing Exception message does not exist, transfer query
	 * statement with empty string.
	 */
	private String getQueryString(QueryInfo queryInfo) {
		String sql = "";
		if (queryInfo != null)
			sql = queryInfo.getQueryString();
		return sql;
	}

	@SuppressWarnings("unchecked")
	private <E> List<E> findInternal(QueryInfo queryInfo, String queryId,
			Object[] values, Pagination paginationVO, boolean paging,
			ReflectionResultSetMapper resultSetMapper) throws QueryException {
		String sql = "";

		try {
			sql = queryInfo.getQueryString();
			boolean isDynamic = queryInfo.isDynamic();
			int queryMaxFetchSize = queryInfo.getMaxFetchSize();
			if (queryMaxFetchSize == -1) {
				queryMaxFetchSize = jdbcTemplate.getMaxFetchSize();
			}

			if (resultSetMapper == null)
				resultSetMapper = createResultSetMapper(queryInfo, lobHandler,
						getSqlRepository().getNullCheck());

			if (isDynamic) {
				Map<Object, Object> properties = generatePropertiesMap(values,
						null, null);
				if (properties == null)
					properties = new Properties();

				DefaultDynamicSqlParameterSource sqlParameterSource = new DefaultDynamicSqlParameterSource(
						properties);

				sql = getRunnableSQL(sql, sqlParameterSource);

				if (isVelocity(sql)) {
					StringWriter writer = new StringWriter();
					Velocity.evaluate(
							new DefaultDynamicSqlParameterSourceContext(
									sqlParameterSource), writer,
							"QueryService", sql);
					sql = writer.toString();
				}

				namedParamJdbcTemplate.query(sql, queryMaxFetchSize,
						sqlParameterSource, resultSetMapper, paginationVO);

				return resultSetMapper.getObjects();
			} else {
				if (!paging)
					return jdbcTemplate.query(sql, values, queryInfo
							.getSqlTypes(), queryMaxFetchSize,
							(RowMapper) resultSetMapper);
				else
					return jdbcTemplate.queryWithPagination(sql, values,
							queryInfo.getSqlTypes(), queryMaxFetchSize,
							(RowMapper) resultSetMapper, paginationVO);
			}
		} catch (Exception ex) {
			throw processException("select [query id = '" + queryId + "']",
					sql, ex);
		}
	}

	/**
	 * ************* PRIVATE Other METHODS **************
	 */

	@SuppressWarnings("unchecked")
	private ReflectionResultSetMapper createResultSetMapper(
			QueryInfo queryInfo, LobHandler lobHandler,
			Map<String, String> nullchecks) throws ClassNotFoundException,
			InstantiationException, IllegalAccessException {
		Class<?> targetClazz = null;
		// 2009.01.15 - custom resultset mapper
		ResultSetMapper customResultSetMapper = null;
		Class<?> mapperClazz = null;

		if (queryInfo.getResultMapper() != null) {
			mapperClazz = Thread.currentThread().getContextClassLoader()
					.loadClass(queryInfo.getResultMapper());
			if (ResultSetMapper.class.isAssignableFrom(mapperClazz)
					&& !(ReflectionResultSetMapper.class
							.isAssignableFrom(mapperClazz))) {
				customResultSetMapper = (ResultSetMapper) mapperClazz
						.newInstance();
			}
		}
		if (queryInfo.doesNeedColumnMapping()) {
			targetClazz = Thread.currentThread().getContextClassLoader()
					.loadClass(queryInfo.getResultClass());
		} // 2009.01.15 - custom resultset mapper }
		else {
			targetClazz = HashMap.class;
		}
		
		MappingInfo mappingInfo = this.getSqlRepository().getMappingInfo(
				queryInfo.getQueryId());
		// 2009.05.28
		ReflectionResultSetMapper callbackResultSetMapper = null;
		if (mapperClazz != null
				&& CallbackResultSetMapper.class.isAssignableFrom(mapperClazz)) {
			callbackResultSetMapper = new CallbackResultSetMapper(targetClazz,
					mappingInfo, lobHandler, nullchecks, queryInfo
							.getMappingStyle());
			customResultSetMapper = callbackResultSetMapper;
		} else if (mapperClazz != null
				&& ReflectionResultSetMapper.class
						.isAssignableFrom(mapperClazz)) {
			callbackResultSetMapper = new ReflectionResultSetMapper(
					targetClazz, mappingInfo, nullchecks, lobHandler);
			customResultSetMapper = callbackResultSetMapper;
		} else {
			callbackResultSetMapper = new DefaultCallbackResultSetMapper(
					targetClazz, mappingInfo, lobHandler, nullchecks, queryInfo
							.getMappingStyle());
		}
		// 2009.10.28
		callbackResultSetMapper.setSqlLoader(this.getSqlRepository());
		callbackResultSetMapper.setQueryId(queryInfo.getQueryId());

		// 2009.01.15 - custom resultset mapper
		if (customResultSetMapper != null)
			callbackResultSetMapper
					.setCustomResultSetMapper(customResultSetMapper);
		// 2009.01.15 - custom resultset mapper
		return callbackResultSetMapper;
	}

	private int[] generateValueTypes(QueryInfo queryInfo, Object[] values) {
		int[] types = new int[values.length];

		for (int i = 0; i < values.length; i++) {
			String tempStr = null;
			Object[] tempArray = null;
			if (values[i] instanceof String) {
				tempStr = (String) values[i];
				int pos = tempStr.indexOf(DELIMETER);
				if (pos < 0) {
					// types[i] =
					// SqlTypeValue.TYPE_UNKNOWN;
					// continue;
					throw new QueryException(
							"Query Service : Invalid Argument - Argument String must include a delimiter '='.");
				}
				types[i] = queryInfo.getSqlType(tempStr.substring(0, pos));
			} else if (values[i] instanceof Object[]) {
				tempArray = (Object[]) values[i];
				if (tempArray.length != 2) {
					throw new QueryException(
							"Query Service : Invalid Argument - Argument Object Array size must be 2.");
				}
				types[i] = queryInfo.getSqlType((String) tempArray[0]);
			} else if (values[i] == null) {
				types[i] = SqlTypeValue.TYPE_UNKNOWN;
			} else {
				types[i] = SqlTypeValue.TYPE_UNKNOWN;
			}
		}

		return types;
	}

	private Map<Object, Object> generatePropertiesMap(Object[] values,
			int[] types, MapSqlParameterSource mapSqlParameterSource) {
		Map<Object, Object> properties = new HashMap<Object, Object>();
		String tempStr = null;
		Object[] tempArray = null;

		for (int i = 0; i < values.length; i++) {
			if (values[i] instanceof String) {
				tempStr = (String) values[i];
				int pos = tempStr.indexOf(DELIMETER);
				if (pos < 0) {
					throw new QueryException(
							"Query Service : Invalid Argument - Argument String must include a delimiter '='.");
				}
				properties.put(tempStr.substring(0, pos), tempStr
						.substring(pos + 1));
				if (mapSqlParameterSource != null)
					mapSqlParameterSource.addValue(tempStr.substring(0, pos),
							tempStr.substring(pos + 1), types[i]);
			} else if (values[i] instanceof Object[]) {
				tempArray = (Object[]) values[i];
				if (tempArray.length != 2) {
					throw new QueryException(
							"Query Service : Invalid Argument - Argument Object Array size must be 2.");
				}
				properties.put(tempArray[0], tempArray[1]);
				if (mapSqlParameterSource != null)
					mapSqlParameterSource.addValue((String) tempArray[0],
							tempArray[1], types[i]);
			} else if (values[i] == null) {
				continue;
			} else {
				return null;
			}
		}
		return properties;
	}

	private Map<String, Object> makeResultMap(List<?> resultList,
			long totalCount, Map<String, ?> columnInfo) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(QueryService.LIST, resultList);
		result.put(QueryService.COUNT, new Long(totalCount));
		if (columnInfo != null)
			result.put(QueryService.COL_INFO, columnInfo);
		return result;
	}

	public QueryException processException(String actionName, String sql,
			Exception exception) {
		Object[] args = { actionName, sql, exception.getMessage() };
		QueryService.LOGGER.error(
				"Query Service : Fail to {}.\n Query = [{}] \n Reason = [{}].",
				args, exception);

		// In the case Exception serving as root cause has the same type as
		// InternalDataAccessException, ErrorCode occurring in query execution
		// is set.
		if (exception instanceof InternalDataAccessException) {
			InternalDataAccessException idaException = (InternalDataAccessException) exception;
			QueryException queryException = new QueryException(
					"Query Service : Fail to " + actionName + ".\n Query = ["
							+ sql + "] \n Reason = [" + exception.getMessage()
							+ "].", idaException);
			queryException.setSqlErrorCode(idaException.getSqlErrorCode());
			queryException
					.setSqlErrorMessage(idaException.getSqlErrorMessage());
			return queryException;
		}
		if (exception instanceof QueryException)
			return (QueryException) exception;
		else
			return new QueryException("Query Service : Fail to " + actionName
					+ ".\n Query = [" + sql + "] \n Reason = ["
					+ exception.getMessage() + "].", exception);
	}
}
