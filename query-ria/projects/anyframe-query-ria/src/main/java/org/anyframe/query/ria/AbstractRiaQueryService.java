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
package org.anyframe.query.ria;

import java.io.File;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.anyframe.exception.ConfigurationException;
import org.anyframe.exception.InitializationException;
import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.RowMetadataCallbackHandler;
import org.anyframe.query.exception.QueryException;
import org.anyframe.query.impl.LiveScrollPagination;
import org.anyframe.query.impl.Pagination;
import org.anyframe.query.impl.QueryServiceImpl;
import org.anyframe.query.impl.jdbc.setter.DefaultDynamicSqlParameterSource;
import org.anyframe.query.impl.jdbc.setter.DefaultDynamicSqlParameterSourceContext;
import org.anyframe.util.StringUtil;
import org.apache.velocity.app.Velocity;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.jdbc.core.CallableStatementCreatorFactory;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

/**
 * @author JongHoon Kim
 */
public abstract class AbstractRiaQueryService extends QueryServiceImpl {

	/**
	 * @param resourceLoader
	 *            the resourceLoader to set
	 */
	public void setResourceLoader(ResourceLoader resourceLoader) {
		this.resourceLoader = resourceLoader;
	}

	public void afterPropertiesSet() {
		initializeVelocity();
		if (namedParamJdbcTemplate.getPagingJdbcTemplate()
				.getPaginationSQLGetter() == null) {
			QueryService.LOGGER
					.error("pagingSQLGenerator needs to be defined for executing query. "
							+ "So, you must specify a proper pagingSQLGenerator in PagingJdbcTemplate configuration. "
							+ "If you can't find a proper pagingSQLGenerator, you can define a DefaultPagingSQLGenerator as pagingSQLGenerator."
							+ "But you must read notice of that class before using a DefaultPagingSQLGenerator.");
			throw new ConfigurationException(
					"Query Service : pagingSQLGenerator needs to be defined for PagingJdbcTemplate. \n So, you must specify a proper pagingSQLGenerator in PagingJdbcTemplate configuration. \n If you can't find a proper pagingSQLGenerator, you can define a DefaultPagingSQLGenerator as pagingSQLGenerator. \n But you must read notice of that class before using a DefaultPagingSQLGenerator.");
		}
	}

	public void initializeVelocity() {
		try {
			// In the case where velocityPropsFilename property is defined,
			// Velocity Log file is not created.
			if (StringUtil.isEmpty(propsFilename)) {
				Velocity.addProperty("runtime.log.logsystem.class",
						"org.apache.velocity.runtime.log.NullLogSystem");
				Velocity.init();
			} else {
				Resource[] resources = ((ResourcePatternResolver) resourceLoader)
						.getResources(propsFilename);

				File velocityLogFile = resources[0].getFile();
				if (velocityLogFile.exists()) {
					Velocity.addProperty("runtime.log", velocityLogFile
							.getAbsolutePath());
					Velocity.init();
				} else
					throw new InitializationException(
							"Velocity log file doesn't exists.");
			}
		} catch (Exception e) {
			QueryService.LOGGER.error(
					"Query Service : Fail to initialize Velocity.", e);
			throw new InitializationException(
					"Query Service : Fail to initialize Velocity.", e);
		}
	}

	public void containesQueryId(String queryId) {
		super.containesQueryId(queryId);
	}

	protected void search(String queryId,
			DefaultDynamicSqlParameterSource params,
			RowMetadataCallbackHandler rowCallbackHandler)
			throws QueryException {
		Pagination pagination = new Pagination(0);
		pagination.setPaging(false);
		pagination.setPageIndex(0);
		search(queryId, params, rowCallbackHandler, pagination);
	}

	protected void search(String queryId,
			DefaultDynamicSqlParameterSource params,
			RowMetadataCallbackHandler rowCallbackHandler, int pageIndex,
			int pageSize) throws QueryException {
		Pagination pagination = new Pagination(pageSize);
		pagination.setCountRecordSize(true);
		pagination.setPageIndex(pageIndex);
		search(queryId, params, rowCallbackHandler, pagination);
	}

	protected void searchLive(String queryId,
			DefaultDynamicSqlParameterSource params,
			RowMetadataCallbackHandler rowCallbackHandler, int startIndex,
			int pageSize) throws QueryException {
		LiveScrollPagination liveScrollPagination = new LiveScrollPagination();
		liveScrollPagination.setPageSize(pageSize);
		liveScrollPagination.setStartIndex(startIndex);
		search(queryId, params, rowCallbackHandler, liveScrollPagination);
	}

	protected void search(String queryId,
			DefaultDynamicSqlParameterSource params,
			final RowMetadataCallbackHandler rowCallbackHandler,
			final Pagination pagination) throws QueryException {
		jdbcCommonProcess(queryId, params, new JDBCInternalTask() {
			public Object processTask(String sql, int maxFetchSize,
					SqlParameterSource searchParams) throws Exception {

				rowCallbackHandler.setLobHandler(getLobHandler());
				rowCallbackHandler.setNullCheckInfos(getSqlRepository()
						.getNullCheck());
				rowCallbackHandler.setPagination(pagination);

				getNamedParamJdbcTemplate().query(sql, maxFetchSize,
						searchParams, rowCallbackHandler, pagination);
				return null;
			}
		});
	}

	protected int update(String queryId, DefaultDynamicSqlParameterSource params)
			throws QueryException {
		Integer resultCount = (Integer) jdbcCommonProcess(queryId, params,
				new JDBCInternalTask() {
					public Object processTask(String sql, int maxFetchSize,
							SqlParameterSource searchParams) {
						int count = getNamedParamJdbcTemplate().update(sql,
								searchParams, getLobHandler());
						return new Integer(count);
					}
				});
		return resultCount.intValue();
	}

	/**
	 * Execute batchUpdate method of Spring NamedParamJdbcTemplate.
	 * 
	 * @param queryId
	 *            Query ID
	 * @param targets
	 *            Array of SqlParameterSource object
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryException
	 *             fail to execute batch-update
	 */
	protected int[] update(final String queryId,
			final SqlParameterSource[] targets) throws QueryException {
		QueryInfo queryInfo = null;
		containesQueryId(queryId);
		String sql = "";

		boolean isDynamic = getSqlRepository().isDynamicQueryStatement(queryId);
		if (!isDynamic)
			throw new QueryException("Query Service : queryId [" + queryId
					+ "] is not dynamic statements.");

		try {
			queryInfo = getSqlRepository().getQueryInfos().get(queryId);
			sql = queryInfo.getQueryString();
			return this.namedParamJdbcTemplate.batchUpdate(sql, targets);
		} catch (Exception e) {
			throw processException("batch update using RIA QueryService", sql,
					e);
		}
	}

	/* 2009.10.22 */
	protected Object execute(String queryId,
			DefaultDynamicSqlParameterSource params,
			RiaCallableStatementCallback callableStatementCallbackHandler) {

		String sql = getSqlRepository().getQueryStatement(queryId);
		QueryInfo queryInfo = getSqlRepository().getQueryInfos().get(queryId);
		List<SqlParameter> paramList = queryInfo.getSqlParameterList();

		Map<String, Object> paramMap = new HashMap<String, Object>();
		SqlParameter sqlParameter = null;
		List<SqlParameter> sqlOutParams = new ArrayList<SqlParameter>();

		for (int i = 0; i < paramList.size(); i++) {
			if (!(paramList.get(i) instanceof SqlOutParameter)) {
				sqlParameter = paramList.get(i);
				String paramName = sqlParameter.getName();
				Object paramValue = params.getValue(paramName);
				paramMap.put(paramName, paramValue);
			} else {
				sqlOutParams.add((SqlOutParameter) paramList.get(i));
			}
		}
		callableStatementCallbackHandler.setSQLParams(paramList);
		callableStatementCallbackHandler.setQueryInfo(queryInfo);
		callableStatementCallbackHandler.setNullCheckInfos(getSqlRepository().getNullCheck());

		if (getLobHandler() != null) {
			callableStatementCallbackHandler.setLobHandler(getLobHandler());
		}

		return getNamedParamJdbcTemplate().execute(
				new CallableStatementCreatorFactory(sql, paramList)
						.newCallableStatementCreator(paramMap),
				callableStatementCallbackHandler);
	}

	protected Object jdbcCommonProcess(String queryId,
			DefaultDynamicSqlParameterSource params,
			JDBCInternalTask internalTask) throws QueryException {
		String sql = "";
		try {
			sql = getSqlRepository().getQueryStatement(queryId);

			boolean isDynamic = getSqlRepository().isDynamicQueryStatement(
					queryId);
			if (!isDynamic)
				throw new QueryException("Query Service : queryId [" + queryId
						+ "] is not dynamic statements.");

			QueryInfo queryInfo = getSqlRepository().getQueryInfos().get(
					queryId);

			int queryMaxFetchSize = queryInfo.getMaxFetchSize();

			if (queryMaxFetchSize == -1) {
				queryMaxFetchSize = getNamedParamJdbcTemplate()
						.getMaxFetchSize();
			}

			Map<Object, Object> properties = generatePropertiesMap(null, null,
					params);

			if (properties == null)
				properties = new Properties();

			DefaultDynamicSqlParameterSource sqlParameterSource = new DefaultDynamicSqlParameterSource(
					properties);

			sql = getRunnableSQL(sql, sqlParameterSource);

			if (isVelocity(sql)) {
				StringWriter writer = new StringWriter();
				Velocity.evaluate(new DefaultDynamicSqlParameterSourceContext(
						sqlParameterSource), writer, "QueryService", sql);
				sql = writer.toString();
			}

			return internalTask.processTask(sql, queryMaxFetchSize, params);
		} catch (Exception e) {
			throw processException("execute query using RIA QueryService", sql,
					e);
		}
	}

	interface JDBCInternalTask {
		Object processTask(String sql, int maxFetchSize,
				SqlParameterSource searchParams) throws Exception;
	}

	protected abstract Map<Object, Object> generatePropertiesMap(
			Object[] values, int[] types,
			DefaultDynamicSqlParameterSource sqlParameterSource)
			throws QueryException;
}
