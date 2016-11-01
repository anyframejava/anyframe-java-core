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
package org.anyframe.query.ria;

import java.io.File;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.anyframe.query.RowMetadataCallbackHandler;
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
     *        the resourceLoader to set
     */
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }
    
	public void afterPropertiesSet() throws Exception {
		initializeVelocity();
		
		if (namedParamJdbcTemplate.getPagingJdbcTemplate()
				.getPaginationSQLGetter() == null) {
			QueryService.LOGGER
					.error("pagingSQLGenerator needs to be defined for executing query. "
							+ "So, you must specify a proper pagingSQLGenerator in PagingJdbcTemplate configuration. "
							+ "If you can't find a proper pagingSQLGenerator, you can define a DefaultPagingSQLGenerator as pagingSQLGenerator."
							+ "But you must read notice of that class before using a DefaultPagingSQLGenerator.");
			throw new QueryServiceException("Query Service : pagingSQLGenerator needs to be defined for PagingJdbcTemplate. \n So, you must specify a proper pagingSQLGenerator in PagingJdbcTemplate configuration. \n If you can't find a proper pagingSQLGenerator, you can define a DefaultPagingSQLGenerator as pagingSQLGenerator. \n But you must read notice of that class before using a DefaultPagingSQLGenerator.");
		}
	}
	
    public void initializeVelocity() throws Exception {
        try {
            // velocityPropsFilename 속성이 정의되어 있지 않은
            // 경우에는 Velocity Log 파일 생성하지 않음.
            if (StringUtil.isEmpty(propsFilename)) {
                Velocity.addProperty("runtime.log.logsystem.class",
                    "org.apache.velocity.runtime.log.NullLogSystem");
                Velocity.init();
            } else {
                Resource[] resources =
                    ((ResourcePatternResolver) resourceLoader)
                        .getResources(propsFilename);

                File velocityLogFile = resources[0].getFile();
                if (velocityLogFile.exists()) {
                    Velocity.addProperty("runtime.log", velocityLogFile
                        .getAbsolutePath());
                    Velocity.init();
                } else
                    throw new Exception("Velocity log file doesn't exists.");
            }
        } catch (Exception e) {
            QueryService.LOGGER.error("Query Service : Fail to initialize Velocity.", e);
            throw new Exception("Query Service : Fail to initialize Velocity.",
                e);
        }
    }	

	public void containesQueryId(String queryId) throws QueryServiceException {
		super.containesQueryId(queryId);
	}

	protected void search(String queryId,
			DefaultDynamicSqlParameterSource params,
			RowMetadataCallbackHandler rowCallbackHandler) throws Exception {
		Pagination pagination = new Pagination(0);
		pagination.setPaging(false);
		pagination.setPageIndex(0);
		search(queryId, params, rowCallbackHandler, pagination);
	}

	protected void search(String queryId,
			DefaultDynamicSqlParameterSource params,
			RowMetadataCallbackHandler rowCallbackHandler, int pageIndex,
			int pageSize) throws Exception {
		Pagination pagination = new Pagination(pageSize);
		pagination.setCountRecordSize(true);
		pagination.setPageIndex(pageIndex);
		search(queryId, params, rowCallbackHandler, pagination);
	}

	protected void searchLive(String queryId,
			DefaultDynamicSqlParameterSource params,
			RowMetadataCallbackHandler rowCallbackHandler, int startIndex,
			int pageSize) throws Exception {
		LiveScrollPagination liveScrollPagination = new LiveScrollPagination();
		liveScrollPagination.setPageSize(pageSize);
		liveScrollPagination.setStartIndex(startIndex);
		search(queryId, params, rowCallbackHandler, liveScrollPagination);
	}

	protected void search(String queryId,
			DefaultDynamicSqlParameterSource params,
			final RowMetadataCallbackHandler rowCallbackHandler,
			final Pagination pagination) throws Exception {
		jdbcCommonProcess(queryId, params, new JDBCInternalTask() {
			public Object processTask(String sql,
					SqlParameterSource searchParams) throws Exception {
				rowCallbackHandler.setLobHandler(getLobHandler());
				rowCallbackHandler.setNullCheckInfos(getSqlRepository()
						.getNullCheck());
				rowCallbackHandler.setPagination(pagination);
				getNamedParamJdbcTemplate().query(sql, searchParams,
						rowCallbackHandler, pagination);
				return null;
			}
		});
	}

	protected int update(String queryId, DefaultDynamicSqlParameterSource params)
			throws QueryServiceException {
		Integer resultCount = (Integer) jdbcCommonProcess(queryId, params,
				new JDBCInternalTask() {

					public Object processTask(String sql,
							SqlParameterSource searchParams) {
						int count = getNamedParamJdbcTemplate().update(sql,
								searchParams, getLobHandler());
						return new Integer(count);
					}
				});
		return resultCount.intValue();
	}

	/* 2009.10.22 */
	protected Object execute(String queryId,
			DefaultDynamicSqlParameterSource params,
			RiaCallableStatementCallback callableStatementCallbackHandler)
			throws QueryServiceException {

		String sql = getSqlRepository().getQueryStatement(queryId);
		QueryInfo queryInfo = (QueryInfo) getSqlRepository().getQueryInfos()
				.get(queryId);
		ArrayList paramList = (ArrayList) queryInfo.getSqlParameterList();

		Map paramMap = new HashMap();
		SqlParameter sqlParameter = null;
		ArrayList sqlOutParams = new ArrayList();

		for (int i = 0; i < paramList.size(); i++) {
			if (!(paramList.get(i) instanceof SqlOutParameter)) {
				sqlParameter = (SqlParameter) paramList.get(i);
				String paramName = sqlParameter.getName();
				Object paramValue = params.getValue(paramName);
				paramMap.put(paramName, paramValue);
			} else {
				sqlOutParams.add((SqlOutParameter) paramList.get(i));
			}
		}
		callableStatementCallbackHandler.setSQLParams(paramList);
		callableStatementCallbackHandler.setQueryInfo(queryInfo);

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
			JDBCInternalTask internalTask) throws QueryServiceException {
		String sql = "";
		try {
			sql = getSqlRepository().getQueryStatement(queryId);

			boolean isDynamic = getSqlRepository().isDynamicQueryStatement(
					queryId);
			if (!isDynamic)
				throw new QueryServiceException("Query Service : queryId ["+ queryId + "] is not dynamic statements.");

			QueryInfo queryInfo = (QueryInfo) getSqlRepository()
					.getQueryInfos().get(queryId);

			Map properties = generatePropertiesMap(null, null, params);

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

			return internalTask.processTask(sql, params);
		} catch (Exception e) {
			throw processException("execute query using RIA QueryService", sql,
					e);
		}
	}

	interface JDBCInternalTask {
		Object processTask(String sql, SqlParameterSource searchParams)
				throws Exception;
	}

	protected abstract Map generatePropertiesMap(Object[] values, int[] types,
			DefaultDynamicSqlParameterSource sqlParameterSource)
			throws QueryServiceException;
}
