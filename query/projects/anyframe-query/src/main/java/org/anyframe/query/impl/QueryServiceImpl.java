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
package org.anyframe.query.impl;

import java.io.StringWriter;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.anyframe.query.MappingInfo;
import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.anyframe.query.ResultSetMapper;
import org.anyframe.query.impl.jdbc.PagingJdbcTemplate;
import org.anyframe.query.impl.jdbc.PagingNamedParamJdbcTemplate;
import org.anyframe.query.impl.jdbc.generator.PagingSQLGenerator;
import org.anyframe.query.impl.jdbc.mapper.CallbackResultSetMapper;
import org.anyframe.query.impl.jdbc.mapper.DefaultCallbackResultSetMapper;
import org.anyframe.query.impl.jdbc.mapper.ReflectionResultSetMapper;
import org.anyframe.query.impl.jdbc.setter.DefaultDynamicSqlParameterSource;
import org.anyframe.query.impl.jdbc.setter.DefaultDynamicSqlParameterSourceContext;
import org.anyframe.query.impl.jdbc.setter.PreparedStatementArgTypeSetter;
import org.anyframe.query.impl.util.InternalDataAccessException;
import org.anyframe.query.impl.util.NamedParameterUtil;
import org.anyframe.query.impl.util.ParsedSql;
import org.anyframe.query.impl.util.SQLTypeTransfer;
import org.apache.velocity.app.Velocity;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
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

	PagingSQLGenerator pagingSQLGenerator;

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

	public void afterPropertiesSet() throws Exception {
		super.afterPropertiesSet();
		jdbcTemplate.setPaginationSQLGetter(this.pagingSQLGenerator);

		if (jdbcTemplate.getPaginationSQLGetter() == null) {
			QueryService.LOGGER
					.error("pagingSQLGenerator needs to be defined for executing query. "
							+ "So, you must specify a proper pagingSQLGenerator in QueryService configuration. "
							+ "If you can't find a proper pagingSQLGenerator, you can define a DefaultPagingSQLGenerator as pagingSQLGenerator."
							+ "But you must read notice of that class before using a DefaultPagingSQLGenerator.");
			throw new QueryServiceException(
					"[Query Service] pagingSQLGenerator needs to be defined for QueryService. \n So, you must specify a proper pagingSQLGenerator in QueryService configuration. \n If you can't find a proper pagingSQLGenerator, you can define a DefaultPagingSQLGenerator as pagingSQLGenerator. \n But you must read notice of that class before using a DefaultPagingSQLGenerator.");
		}
	}

	/** ************* SERVICE METHODS ************** */

	/**
	 * 테이블 매핑 정보를 기반으로 QueryService가 생성한 INSERT문을 batch로 실행한다.
	 * 
	 * @param targets
	 *            object of class which is matched with specified table in XML
	 *            files. is the List type of Object Array.
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryServiceException
	 *             if there is any problem issuing the insert
	 */
	public int[] batchCreate(List targets) throws QueryServiceException {
		String sql = "";
		String className = "";
		try {
			className = targets.get(0).getClass().getName();
			MappingInfo mappingInfo = (MappingInfo) getSqlRepository()
					.getMappingInfos().get(className);
			sql = mappingInfo.getInsertQuery();
			return batchDynamicExecutor(sql, targets);
		} catch (Exception e) {
			throw processException("batch-insert using object " + className
					+ " defined table mapping", sql, e);
		}
	}

	/**
	 * 테이블 매핑 정보를 기반으로 QueryService가 생성한 DELETE문을 batch로 실행한다.
	 * 
	 * @param targets
	 *            object of class which is matched with specified table in XML
	 *            files. is the List type of Object Array.
	 * @return array of the number of rows affected by each statement
	 * @throws QueryServiceException
	 *             if there is any problem issuing the delete
	 */
	public int[] batchRemove(List targets) throws QueryServiceException {
		String sql = "";
		String className = "";
		try {
			className = targets.get(0).getClass().getName();
			MappingInfo mappingInfo = (MappingInfo) getSqlRepository()
					.getMappingInfos().get(className);
			sql = mappingInfo.getDeleteQuery();
			return batchDynamicExecutor(sql, targets);
		} catch (Exception e) {
			throw processException("batch-remove using object " + className
					+ " defined table mapping", sql, e);
		}
	}

	/**
	 * 테이블 매핑 정보를 기반으로 QueryService가 생성한 UPDATE문을 batch로 실행한다.
	 * 
	 * @param targets
	 *            object of class which is matched with specified table in XML
	 *            files. is the List type of Object Array.
	 * @return array of the number of rows affected by each statement
	 * @throws QueryServiceException
	 *             if there is any problem issuing the update
	 */
	public int[] batchUpdate(List targets) throws QueryServiceException {
		String sql = "";
		String className = "";
		try {
			className = targets.get(0).getClass().getName();
			MappingInfo mappingInfo = (MappingInfo) getSqlRepository()
					.getMappingInfos().get(className);
			sql = mappingInfo.getUpdateQuery();
			return batchDynamicExecutor(sql, targets);
		} catch (Exception e) {
			throw processException("batch-update using object " + className
					+ " defined table mapping", sql, e);
		}
	}

	/**
	 * 쿼리 매핑 파일 내에 정의된 queryId에 해당하는 쿼리 매핑 정보를 기반으로 해당 쿼리문을 batch로 실행한다.
	 * 
	 * @param queryInfo
	 *            특정 쿼리 매핑 정보
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targets
	 *            the List type of Object Array.
	 * @return array of the number of rows affected by each statement
	 * @throws QueryServiceException
	 *             if there is any problem issuing the insert, update, delete
	 */
	public int[] batchUpdate(String queryId, List targets)
			throws QueryServiceException {
		String sql = "";
		try {
			containesQueryId(queryId);
			QueryInfo queryInfo = (QueryInfo) getSqlRepository()
					.getQueryInfos().get(queryId);

			sql = queryInfo.getQueryString();
			if (queryInfo.isDynamic())
				return batchDynamicExecutor(sql, targets);
			else
				return batchStaticExecutor(sql, targets);
		} catch (Exception e) {
			throw processException("batch-update [query id = '" + queryId
					+ "']", sql, e);
		}
	}

	public int[] batchUpdateBySQL(String sql, String[] types, List targets)
			throws QueryServiceException {
		try {
			return batchExecutor(sql, convertTypes(types), targets);
		} catch (Exception e) {
			throw processException("batch update by SQL", sql, e);
		}
	}

	/**
	 * 테이블 매핑 정보를 기반으로 QueryService가 생성한 INSERT문을 실행한다.
	 * 
	 * @param obj
	 *            INSERT문을 실행하기 위해 필요한 값을 담고 있는 객체
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem issuing the insert
	 */
	public int create(Object obj) throws QueryServiceException {
		String sql = "";
		String className = "";
		try {
			className = obj.getClass().getName();
			MappingInfo mappingInfo = (MappingInfo) getSqlRepository()
					.getMappingInfos().get(className);

			sql = mappingInfo.getInsertQuery();
			return objectCUDExecutor(obj, sql);
		} catch (Exception e) {
			throw processException("insert using object " + className
					+ " defined table mapping", sql, e);
		}
	}

	/**
	 * 쿼리 매핑 파일 내에 정의된 queryId에 해당하는 쿼리 매핑 정보를 기반으로 해당 쿼리문을 실행한다.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            해당 쿼리문을 실행하기 위해 필요한 입력 값을 담은 Object Array
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem issuing that query
	 */
	public int create(String queryId, Object[] values)
			throws QueryServiceException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = (QueryInfo) getSqlRepository().getQueryInfos().get(
					queryId);

			return sqlCUDExecutor(queryInfo, values);
		} catch (Exception e) {
			throw processException("insert [query id = '" + queryId + "']",
					getQueryString(queryInfo), e);
		}
	}

	public int createBySQL(String sql, String[] types, Object[] values)
			throws QueryServiceException {
		try {
			return sqlCUDExecutor(sql, values, convertTypes(types), false,
					null, null, null);
		} catch (Exception e) {
			throw processException("insert by SQL", sql, e);
		}
	}

	public Map execute(String queryId, Map values) throws QueryServiceException {
		return execute(queryId, values, 0);
	}

	public Map execute(String queryId, Map values, int pageIndex)
			throws QueryServiceException {
		return execute(queryId, values, pageIndex, -1);
	}

	/**
	 * 쿼리 매핑 파일 내에 정의된 queryId에 해당하는 쿼리 매핑 정보를 기반으로 해당 Stored Procedure,
	 * Function 등을 실행한다.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            해당 쿼리문을 실행하기 위해 필요한 입력 값을 담은 Object Array
	 * @param pageIndex
	 *            page_number which expected to be displayed.
	 * @param pageSize
	 *            page_Size which expected to be displayed per page.
	 * @return Stored Procedure, Function 등 수행 결과를 담은 Map의 List
	 * @throws QueryServiceException
	 *             if there is any problem issuing that query
	 */
	public Map execute(String queryId, Map values, int pageIndex, int pageSize)
			throws QueryServiceException {
		String sql = "";
		try {
			containesQueryId(queryId);
			if (pageSize == -1)
				pageSize = getSqlRepository().getFetchCountPerQuery(queryId);
			QueryInfo queryInfo = (QueryInfo) getSqlRepository()
					.getQueryInfos().get(queryId);

			sql = queryInfo.getQueryString();
			List paramList = queryInfo.getSqlParameterList();
			CallableStatementCreator callableStatementCreator = new CallableStatementCreatorFactory(
					sql, paramList).newCallableStatementCreator(values);
			return jdbcTemplate.call(getSqlRepository(),
					callableStatementCreator, paramList, queryInfo);
		} catch (Exception e) {
			throw processException("execute statement [query id = '" + queryId
					+ "']", sql, e);
		}
	}

	public Map executeBySQL(String query, String[] paramTypeNames,
			String[] paramBindingNames, String[] paramBindingTypes, Map values)
			throws QueryServiceException {
		return executeBySQL(query, paramTypeNames, paramBindingNames,
				paramBindingTypes, values, 0, 0);
	}

	public Map executeBySQL(String sql, String[] paramTypeNames,
			String[] paramBindingNames, String[] paramBindingTypes, Map values,
			int pageIndex, int pageSize) throws QueryServiceException {
		try {
			List paramList = SQLTypeTransfer.getSqlParameterList(
					paramTypeNames, paramBindingTypes, paramBindingNames);

			CallableStatementCreator callableStatementCreator = new CallableStatementCreatorFactory(
					sql, paramList).newCallableStatementCreator(values);
			return jdbcTemplate.call(callableStatementCreator, paramList);
		} catch (Exception e) {
			throw processException("execute by SQL", sql, e);
		}
	}

	public Collection find(String queryId, Object[] values)
			throws QueryServiceException {
		return find(queryId, values, -1, -1, false);
	}

	public Collection find(String queryId, Object[] values, int pageIndex)
			throws QueryServiceException {
		return find(queryId, values, pageIndex, -1, true);
	}

	/**
	 * 테이블 매핑 정보를 기반으로 QueryService가 생성한 단건 조회용 SELECT문을 실행한다.
	 * 
	 * @param obj
	 *            SELECT문을 실행하기 위해 필요한 값을 담고 있는 객체
	 * @return 수행 결과를 담은 객체의 List
	 * @throws QueryServiceException
	 *             if there is any problem issuing that query
	 */
	public Collection find(Object obj) throws QueryServiceException {
		String sql = "";
		String className = "";
		try {
			className = obj.getClass().getName();
			MappingInfo mappingInfo = (MappingInfo) getSqlRepository()
					.getMappingInfos().get(className);

			sql = mappingInfo.getSelectByPrimaryKeyQuery();
			// result mapping을 위한 RowCallbackHandler 셋팅
			// 2009.05.28
			CallbackResultSetMapper rowCallbackHandler = new DefaultCallbackResultSetMapper(
					Class.forName(className), mappingInfo, lobHandler,
					getSqlRepository().getNullCheck(), "none");
			// 2009.10.28
			rowCallbackHandler.setSqlLoader(getSqlRepository());

			Map inputMap = new HashMap();
			inputMap.put("anyframe", obj);
			SqlParameterSource sqlParameterSource = new DefaultDynamicSqlParameterSource(
					inputMap);

			namedParamJdbcTemplate.query(sql, sqlParameterSource,
					(RowCallbackHandler) rowCallbackHandler);
			return rowCallbackHandler.getObjects();
		} catch (Exception e) {
			throw processException("select using object " + className
					+ " defined table mapping", sql, e);
		}
	}

	public Collection find(String queryId, Object[] values, int pageIndex,
			int pageSize) throws QueryServiceException {
		return find(queryId, values, pageIndex, pageSize, true);
	}

	public Collection findBySQL(String sql, String[] types, Object[] values)
			throws QueryServiceException {
		try {
			return jdbcTemplate.queryForList(sql, values, convertTypes(types));
		} catch (Exception e) {
			throw processException("select by SQL", sql, e);
		}
	}

	public Collection findBySQL(String sql, String[] types, Object[] values,
			int pageIndex, int pageSize) throws QueryServiceException {
		try {
			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPageIndex(pageIndex);
			return jdbcTemplate.queryForListWithPagination(sql, values,
					convertTypes(types), paginationVO);
		} catch (Exception e) {
			throw processException("select by SQL", sql, e);
		}
	}

	public Map findBySQLWithRowCount(String sql, String[] types, Object[] values)
			throws QueryServiceException {
		return findBySQLWithRowCount(sql, types, values, -1, -1);
	}

	public Map findBySQLWithRowCount(String sql, String[] types,
			Object[] values, int pageIndex, int pageSize)
			throws QueryServiceException {
		try {
			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPageIndex(pageIndex);
			paginationVO.setCountRecordSize(true);
			List list = jdbcTemplate.queryForListWithPagination(sql, values,
					convertTypes(types), paginationVO);

			return makeResultMap(list, paginationVO.getRecordCount(), null);
		} catch (Exception e) {
			throw processException("select by paging SQL", sql, e);
		}
	}

	public Map findWithColInfo(String queryId, Object[] values)
			throws QueryServiceException {
		return findWithColInfo(queryId, values, -1, -1, false);
	}

	public Map findWithColInfo(String queryId, Object[] values, int pageIndex)
			throws QueryServiceException {
		return findWithColInfo(queryId, values, pageIndex, -1, true);
	}

	public Map findWithColInfo(String queryId, Object[] values, int pageIndex,
			int pageSize) throws QueryServiceException {
		return findWithColInfo(queryId, values, pageIndex, pageSize, true);
	}

	public Map findWithRowCount(String queryId, Object[] values)
			throws QueryServiceException {
		return findWithRowCount(queryId, values, -1, -1, false);
	}

	public Map findWithRowCount(String queryId, Object[] values, int pageIndex)
			throws QueryServiceException {
		return findWithRowCount(queryId, values, pageIndex, -1, true);
	}

	public Map findWithRowCount(String queryId, Object[] values, int pageIndex,
			int pageSize) throws QueryServiceException {
		return findWithRowCount(queryId, values, pageIndex, pageSize, true);
	}

	public int remove(Object obj) throws QueryServiceException {
		String sql = "";
		String className = "";
		try {
			className = obj.getClass().getName();
			MappingInfo mappingInfo = (MappingInfo) getSqlRepository()
					.getMappingInfos().get(className);

			sql = mappingInfo.getDeleteQuery();
			return objectCUDExecutor(obj, sql);
		} catch (Exception e) {
			throw processException("delete using object " + className
					+ " defined table mapping", sql, e);
		}
	}

	public int remove(String queryId, Object[] values)
			throws QueryServiceException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = (QueryInfo) getSqlRepository().getQueryInfos().get(
					queryId);

			return sqlCUDExecutor(queryInfo, values);
		} catch (Exception e) {
			throw processException("delete [query id = '" + queryId + "']",
					getQueryString(queryInfo), e);
		}
	}

	public int removeBySQL(String sql, String[] types, Object[] values)
			throws QueryServiceException {
		try {
			return sqlCUDExecutor(sql, values, convertTypes(types), false,
					null, null, null);
		} catch (Exception e) {
			throw processException("remove by SQL", sql, e);
		}
	}

	public int update(Object obj) throws QueryServiceException {
		String className = "";
		String sql = "";
		try {
			className = obj.getClass().getName();
			MappingInfo mappingInfo = (MappingInfo) getSqlRepository()
					.getMappingInfos().get(className);

			sql = mappingInfo.getUpdateQuery();
			return objectCUDExecutor(obj, sql);
		} catch (Exception e) {
			throw processException("update using object " + className
					+ " defined table mapping", sql, e);
		}
	}

	public int update(String queryId, Object[] values)
			throws QueryServiceException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = (QueryInfo) getSqlRepository().getQueryInfos().get(
					queryId);

			return sqlCUDExecutor(queryInfo, values);
		} catch (Exception e) {
			throw processException("update [query id = '" + queryId + "']",
					getQueryString(queryInfo), e);

		}
	}

	public int updateBySQL(String sql, String[] types, Object[] values)
			throws QueryServiceException {
		try {
			return sqlCUDExecutor(sql, values, convertTypes(types), false,
					null, null, null);
		} catch (Exception e) {
			throw processException("update by SQL", sql, e);
		}
	}

	public int countQuery() {
		return getSqlRepository().countQuery();
	}

	public Map getQueryMap() throws QueryServiceException {
		HashMap queryMap = new HashMap();
		try {
			Set keys = getSqlRepository().getQueryInfos().keySet();
			Iterator keyItr = keys.iterator();

			while (keyItr.hasNext()) {
				String queryId = (String) keyItr.next();
				QueryInfo queryInfo = (QueryInfo) getSqlRepository()
						.getQueryInfos().get(queryId);
				String statement = queryInfo.getQueryString();
				queryMap.put(queryId, statement);
			}

			return queryMap;
		} catch (Exception e) {
			throw new QueryServiceException(
					"Query Service : Fail to make querymap consist of queryId and statement.\n Reason = ["
							+ e.getMessage() + "]", e);
		}
	}

	public ArrayList getQueryParams(String queryId)
			throws QueryServiceException {
		try {
			QueryInfo queryInfo = (QueryInfo) getSqlRepository()
					.getQueryInfos().get(queryId);

			List paramList = queryInfo.getSqlParameterList();

			ArrayList results = new ArrayList();
			for (int i = 0; i < paramList.size(); i++) {
				String[] params = new String[2];
				SqlParameter param = (SqlParameter) paramList.get(i);
				params[0] = param.getName();
				String paramTypeName = param.getTypeName();

				// param type이 OTHER 또는 CURSOR일 경우
				// SqlOutParameter 셋팅시 param
				// type name을 셋팅할 수 있는 API가 없음. 따라서 별도로
				// 체크하여 셋팅하도록 로직 추가함.
				if (paramTypeName == null) {
					int type = param.getSqlType();
					paramTypeName = SQLTypeTransfer.getSQLTypeName(type);
				}

				params[1] = paramTypeName;
				results.add(params);
			}

			return results;
		} catch (Exception e) {
			throw new QueryServiceException(
					"Query Service : Fail to find query's parameters for specified query with queryId ["
							+ queryId
							+ "].\n Reason = ["
							+ e.getMessage()
							+ "]", e);
		}
	}

	public JdbcTemplate getQueryServiceJdbcTemplate() {
		return jdbcTemplate;
	}

	public String getStatement(String queryId) throws QueryServiceException {
		QueryInfo queryInfo = (QueryInfo) getSqlRepository().getQueryInfos()
				.get(queryId);
		String sql = queryInfo.getQueryString();
		return sql;
	}

	public QueryInfo getQueryInfo(String queryId) {
		return (QueryInfo) getSqlRepository().getQueryInfos().get(queryId);
	}

	/** ************* PROTECTED METHODS ************** */

	/**
	 * BatchSqlUpdate 클래스를 이용하여 입력된 SQL에 대한 Batch 처리를 수행한다.
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
			final List targets) throws QueryServiceException {
		if (targets.size() <= 0)
			throw new QueryServiceException(
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
	 * Dynamic SQL에 대해 Spring JdbcTemplate의 batchUpdate 메소드를 호출하여 Insert,
	 * Update, Delete를 Batch로 처리한다. (특정 테이블에 매핑된 클래스의 인스턴스 목록이 입력된 경우, 해당 SQL의
	 * isDynamic이 true일 경우)
	 * 
	 * @param sql
	 *            dynamic query statement.
	 * @param targets
	 *            object of class which is matched with specified table in XML
	 *            files. is the List type of Object Array.
	 * @return an array of the number of rows affected by each statement
	 */
	protected int[] batchDynamicExecutor(final String sql, final List targets) {
		// NamedParameterUtils를 통해 모든 Bind Variables를
		// 분석하고 Prepared Statement
		// 형태로 전환한다.
		final ParsedSql parsedSql = NamedParameterUtil.parseSqlStatement(sql);
		return jdbcTemplate.batchUpdate(parsedSql.getNewSql(),
				new BatchPreparedStatementSetter() {

					public int getBatchSize() {
						return targets.size();
					}

					// Spring JdbcTemplate에 의해 호출되는
					// callback method
					public void setValues(PreparedStatement ps, int index)
							throws SQLException {
						Map properties = new HashMap();
						if (targets.get(index) instanceof Map)
							properties = (Map) targets.get(index);

						else if (targets.get(index) instanceof Object[]) {
							Object[] params = (Object[]) targets.get(index);
							for (int i = 0; i < params.length; i++) {
								if (params[i] instanceof Object[]
										&& ((Object[]) params[i]).length == 2) {
									Object[] param = (Object[]) params[i];
									properties.put(param[0], param[1]);
								}
							}
						} else
							properties.put("anyframe", targets.get(index));
						// NamedParameterUtils을 통해
						// inputMap에서 해당 dynamic SQL에
						// 셋팅해야 할 모든 Bind Variables의 값을 찾아
						// 배열 형태로 전달받는다.
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
	 * 일반 SQL에 대해 Spring JdbcTemplate의 batchUpdate 메소드를 호출하여 Insert, Update,
	 * Delete를 Batch로 처리한다. 해당 SQL의 isDynamic이 false일 경우)
	 * 
	 * @param sql
	 *            static query statement.
	 * @param targets
	 *            object of class which is matched with specified table in XML
	 *            files. is the List type of Object Array.
	 * @return an array of the number of rows affected by each statement
	 */
	protected int[] batchStaticExecutor(final String sql, final List targets) {
		return jdbcTemplate.batchUpdate(sql,
				new BatchPreparedStatementSetter() {

					public int getBatchSize() {
						return targets.size();
					}

					// Spring JdbcTemplate에 의해 호출되는
					// callback method
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
	 * 입력된 SQL Type Name을 이용하여 이에 맞는 java.sql.Types를 찾는다.
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
	 * 객체 입력만으로 한건의 데이터에 대한 INSERT, UPDATE, DELETE를 수행한다. 입력 인자로 전달된 SQL은
	 * QueryService에 의해 테이블 매핑 정보를 기반으로 자동 생성된 것이다.
	 * 
	 * @param obj
	 *            INSERT, UPDATE, DELETE 대상이 되는 객체
	 * @param sql
	 *            QueryService에 의해 테이블 매핑 정보를 기반으로 자동 생성된 query statement
	 * @return the number of rows affected
	 */
	protected int objectCUDExecutor(Object obj, String sql) {
		Map properties = new HashMap();
		properties.put("anyframe", obj);
		return namedParamJdbcTemplate.update(sql,
				new DefaultDynamicSqlParameterSource(properties));
	}

	/**
	 * 특정 queryId에 해당하는 쿼리 매핑 정보를 기반으로 Variable의 SQL Type을 찾아 셋팅한 후
	 * sqlCUDExecutor 메소드를 호출하여 해당 query statement를 실행한다.
	 * 
	 * @param queryInfo
	 *            특정 queryId에 해당하는 쿼리 매핑 정보
	 * @param values
	 *            a set of variable for executing query
	 * @return the number of rows affected
	 * @throws Exception
	 *             실행할 쿼리문을 완성에 실패한 경우
	 */
	protected int sqlCUDExecutor(QueryInfo queryInfo, Object[] values)
			throws Exception {
		int[] types = null;

		if (!queryInfo.isDynamic()) {
			types = queryInfo.getSqlTypes();
		} else {
			types = generateValueTypes(queryInfo, values);
		}

		return sqlCUDExecutor(queryInfo.getQueryString(), values, types,
				queryInfo.isDynamic(), queryInfo.getLobStatement(),
				queryInfo.getLobParamTypes(), queryInfo.getQueryId());
	}

	/**
	 * 특정 queryId에 해당하는 쿼리 매핑 정보를 기반으로 실행할 쿼리문을 완성하여 실행한다.
	 * 
	 * @param sql
	 *            query statement.
	 * @param values
	 *            a set of variable for executing query
	 * @param types
	 *            an array of the SQL Type
	 * @param isDynamic
	 *            dynamic query statement 여부
	 * @param lobStatement
	 *            lob statement (update for Handling Lob of Oracle 8i)
	 * @param queryId
	 *            identifier of query statement to execute
	 * @return the number of rows affected
	 * @throws Exception
	 *             실행할 쿼리문을 완성에 실패한 경우
	 */
	protected int sqlCUDExecutor(String sql, Object[] values, int[] types,
			boolean isDynamic, String lobStatement, String[] lobParamTypes,
			String queryId) throws Exception {
		boolean hasLobStatement = false;

		Object[] inputValues = values;
		if (lobStatement != null) {
			hasLobStatement = true;
			if (values.length != 3 || !(values[0] instanceof Object[])
					|| !(values[1] instanceof Object[])
					|| !(values[2] instanceof Object[])) {
				throw new QueryServiceException(
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
				Velocity.evaluate(new DefaultDynamicSqlParameterSourceContext(
						sqlParameterSource), writer, "QueryService", sql);
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

	private Collection find(String queryId, Object[] values, int pageIndex,
			int pageSize, boolean paging) throws QueryServiceException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = (QueryInfo) getSqlRepository().getQueryInfos().get(
					queryId);

			if (pageSize <= 0)
				pageSize = getSqlRepository().getFetchCountPerQuery(queryId);

			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPaging(paging);
			paginationVO.setPageIndex(pageIndex);

			return findInternal(queryInfo, queryId, values, paginationVO,
					paging, null);
		} catch (Exception e) {
			throw processException("execute statement [query id = '" + queryId
					+ "']", getQueryString(queryInfo), e);
		}
	}

	private Map findWithRowCount(String queryId, Object[] values,
			int pageIndex, int pageSize, boolean paging)
			throws QueryServiceException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = (QueryInfo) getSqlRepository().getQueryInfos().get(
					queryId);

			if (pageSize == -1)
				pageSize = getSqlRepository().getFetchCountPerQuery(queryId);

			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPaging(paging);
			paginationVO.setPageIndex(pageIndex);
			paginationVO.setCountRecordSize(true);

			List list = findInternal(queryInfo, queryId, values, paginationVO,
					paging, null);

			long count = 0;

			if (!paging)
				count = list.size();
			else
				count = paginationVO.getRecordCount();

			return makeResultMap(list, count, null);
		} catch (Exception e) {
			throw processException("select by paging [query id = '" + queryId
					+ "']", getQueryString(queryInfo), e);
		}
	}

	private Map findWithColInfo(String queryId, Object[] values, int pageIndex,
			int pageSize, boolean paging) throws QueryServiceException {
		QueryInfo queryInfo = null;
		try {
			containesQueryId(queryId);
			queryInfo = (QueryInfo) getSqlRepository().getQueryInfos().get(
					queryId);

			if (pageSize == -1)
				pageSize = getSqlRepository().getFetchCountPerQuery(queryId);

			Pagination paginationVO = new Pagination(pageSize);
			paginationVO.setPaging(paging);
			paginationVO.setPageIndex(pageIndex);
			paginationVO.setCountRecordSize(true);

			ReflectionResultSetMapper rowCallbackHandler = createResultSetMapper(
					queryInfo, lobHandler, getSqlRepository().getNullCheck());

			List resultList = findInternal(queryInfo, queryId, values,
					paginationVO, paging, rowCallbackHandler);

			long count = 0;
			if (!paging)
				count = resultList.size();
			else
				count = paginationVO.getRecordCount();
			return makeResultMap(resultList, count,
					rowCallbackHandler.getColumnInfo());
		} catch (Exception e) {
			throw processException("select with column info [query id = '"
					+ queryId + "']", getQueryString(queryInfo), e);
		}
	}

	/**
	 * Exception 메시지 처리시 사용되는 메소드로 입력 인자로 전달된 queryId가 존재하지 않는 경우 빈 문자열을 쿼리문으로
	 * 전달한다.
	 */
	private String getQueryString(QueryInfo queryInfo) {
		String sql = "";
		if (queryInfo != null)
			sql = queryInfo.getQueryString();
		return sql;
	}

	private List findInternal(QueryInfo queryInfo, String queryId,
			Object[] values, Pagination paginationVO, boolean paging,
			ReflectionResultSetMapper resultSetMapper)
			throws QueryServiceException {
		String sql = "";

		try {
			sql = queryInfo.getQueryString();
			boolean isDynamic = queryInfo.isDynamic();

			if (resultSetMapper == null)
				resultSetMapper = createResultSetMapper(queryInfo, lobHandler,
						getSqlRepository().getNullCheck());

			if (isDynamic) {
				Map properties = generatePropertiesMap(values, null, null);
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

				namedParamJdbcTemplate.query(sql, sqlParameterSource,
						resultSetMapper, paginationVO);

				return resultSetMapper.getObjects();
			} else {
				if (!paging)
					return jdbcTemplate.query(sql, values,
							queryInfo.getSqlTypes(),
							(RowMapper) resultSetMapper);
				else
					return jdbcTemplate.queryWithPagination(sql, values,
							queryInfo.getSqlTypes(),
							(RowMapper) resultSetMapper, paginationVO);
			}
		} catch (Exception e) {
			throw processException("select [query id = '" + queryId + "']",
					sql, e);
		}
	}

	/**
	 * ************* PRIVATE Other METHODS **************
	 */

	private ReflectionResultSetMapper createResultSetMapper(
			QueryInfo queryInfo, LobHandler lobHandler, Map nullchecks)
			throws Exception {
		Class targetClazz = null;
		// 2009.01.15 - custom resultset mapper
		ResultSetMapper customResultSetMapper = null;
		Class mapperClazz = null;

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
					mappingInfo, lobHandler, nullchecks,
					queryInfo.getMappingStyle());
			customResultSetMapper = callbackResultSetMapper;
		} else if (mapperClazz != null
				&& ReflectionResultSetMapper.class
						.isAssignableFrom(mapperClazz)) {
			callbackResultSetMapper = new ReflectionResultSetMapper(
					targetClazz, mappingInfo, nullchecks, lobHandler);
			customResultSetMapper = callbackResultSetMapper;
		} else {
			callbackResultSetMapper = new DefaultCallbackResultSetMapper(
					targetClazz, mappingInfo, lobHandler, nullchecks,
					queryInfo.getMappingStyle());
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

	private int[] generateValueTypes(QueryInfo queryInfo, Object[] values)
			throws QueryServiceException {
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
					throw new QueryServiceException(
							"Query Service : Invalid Argument - Argument String must include a delimiter '='.");
				}
				types[i] = queryInfo.getSqlType(tempStr.substring(0, pos));
			} else if (values[i] instanceof Object[]) {
				tempArray = (Object[]) values[i];
				if (tempArray.length != 2) {
					throw new QueryServiceException(
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

	private Map generatePropertiesMap(Object[] values, int[] types,
			MapSqlParameterSource mapSqlParameterSource)
			throws QueryServiceException {
		Map properties = new HashMap();
		String tempStr = null;
		Object[] tempArray = null;

		for (int i = 0; i < values.length; i++) {
			if (values[i] instanceof String) {
				tempStr = (String) values[i];
				int pos = tempStr.indexOf(DELIMETER);
				if (pos < 0) {
					throw new QueryServiceException(
							"Query Service : Invalid Argument - Argument String must include a delimiter '='.");
				}
				properties.put(tempStr.substring(0, pos),
						tempStr.substring(pos + 1));
				if (mapSqlParameterSource != null)
					mapSqlParameterSource.addValue(tempStr.substring(0, pos),
							tempStr.substring(pos + 1), types[i]);
			} else if (values[i] instanceof Object[]) {
				tempArray = (Object[]) values[i];
				if (tempArray.length != 2) {
					throw new QueryServiceException(
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

	private HashMap makeResultMap(List resultList, long totalCount,
			Map columnInfo) {
		HashMap result = new HashMap();
		result.put(QueryService.LIST, resultList);
		result.put(QueryService.COUNT, new Long(totalCount));
		if (columnInfo != null)
			result.put(QueryService.COL_INFO, columnInfo);
		return result;
	}

	public QueryServiceException processException(String actionName,
			String sql, Exception exception) {
		QueryService.LOGGER.error(
				"Query Service : Fail to {" + actionName + "}.\n Query = ["
						+ sql + "] \n Reason = [" + exception.getMessage()
						+ "].", exception);
		// 원인이 되는 Exception이
		// InternalDataAccessException와 같은 유형일 경우 쿼리
		// 수행시 발생한 ErrorCode가 셋팅된다.
		if (exception instanceof InternalDataAccessException) {
			InternalDataAccessException idaException = (InternalDataAccessException) exception;
			QueryServiceException queryServiceException = new QueryServiceException(
					"Query Service : Fail to " + actionName + ".\n Query = ["
							+ sql + "] \n Reason = [" + exception.getMessage()
							+ "].", idaException);
			queryServiceException.setSqlErrorCode(idaException
					.getSqlErrorCode());
			queryServiceException.setSqlErrorMessage(idaException
					.getSqlErrorMessage());
			return queryServiceException;
		}
		if (exception instanceof QueryServiceException)
			return (QueryServiceException) exception;
		else
			return new QueryServiceException("Query Service : Fail to "
					+ actionName + ".\n Query = [" + sql + "] \n Reason = ["
					+ exception.getMessage() + "].", exception);
	}

}
