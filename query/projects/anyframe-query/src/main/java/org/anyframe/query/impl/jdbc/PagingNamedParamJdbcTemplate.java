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
package org.anyframe.query.impl.jdbc;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.anyframe.query.impl.LiveScrollPagination;
import org.anyframe.query.impl.Pagination;
import org.anyframe.query.impl.jdbc.setter.PreparedStatementArgTypeSetter;
import org.anyframe.query.impl.util.NamedParameterUtil;
import org.anyframe.query.impl.util.ParsedSql;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.SQLExceptionTranslator;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * @author Soyon Lim
 */
public class PagingNamedParamJdbcTemplate extends NamedParameterJdbcTemplate {

	protected int maxFetchSize = -1;

	private PagingJdbcTemplate pagingJdbcTemplate = null;

	public PagingJdbcTemplate getPagingJdbcTemplate() {
		return pagingJdbcTemplate;
	}

	public int getMaxFetchSize() {
		return maxFetchSize;
	}

	public void setMaxFetchSize(int maxFetchSize) {
		this.maxFetchSize = maxFetchSize;
	}

	// 2009.04.28
	public List query(String sql, Map data, RowMapper rowMapper,
			Pagination paginationVO) throws Exception {

		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource(
				data);
		SqlParameterSetter sqlParameterSetter = setSqlParameter(sql,
				mapSqlParameterSource, data);
		return pagingJdbcTemplate.queryWithPagination(
				sqlParameterSetter.getSubstitutedSql(),
				sqlParameterSetter.getArgs(), sqlParameterSetter.getArgTypes(),
				-1, rowMapper, paginationVO);
	}

	// 2011.05.11
	// Resolving the issue of twice setting datasource at setup file
	// MaxFetchSize 세팅 setting
	public PagingNamedParamJdbcTemplate(PagingJdbcTemplate jdbcTemplate) {
		super(jdbcTemplate.getDataSource());
		setMaxFetchSize(jdbcTemplate.getMaxFetchSize());
		pagingJdbcTemplate = jdbcTemplate;
	}

	public PagingNamedParamJdbcTemplate(PagingJdbcTemplate jdbcTemplate,
			DataSource dataSouce) {
		super(dataSouce);
		setMaxFetchSize(jdbcTemplate.getMaxFetchSize());
		pagingJdbcTemplate = jdbcTemplate;
	}

	public void setExceptionTranslator(
			SQLExceptionTranslator exceptionTranslator) {
		pagingJdbcTemplate.setExceptionTranslator(exceptionTranslator);
		((JdbcTemplate) getJdbcOperations())
				.setExceptionTranslator(exceptionTranslator);
	}

	public void query(String sql, int queryMaxFetchSize,
			SqlParameterSource sqlParameterSource, RowCallbackHandler rch,
			Pagination paginationVO) throws Exception {

		SqlParameterSetter sqlParameterSetter = setSqlParameter(sql,
				sqlParameterSource);
		if (isPaging(paginationVO)) {
			pagingJdbcTemplate.queryWithPagination(
					sqlParameterSetter.getSubstitutedSql(),
					sqlParameterSetter.getArgs(),
					sqlParameterSetter.getArgTypes(), queryMaxFetchSize, rch,
					paginationVO);
		} else {
			pagingJdbcTemplate.query(sqlParameterSetter.getSubstitutedSql(),
					sqlParameterSetter.getArgs(),
					sqlParameterSetter.getArgTypes(), queryMaxFetchSize, rch);
		}
	}

	public int update(String sql, SqlParameterSource sqlParameterSource,
			LobHandler lobHandler) {
		SqlParameterSetter sqlParameterSetter = setSqlParameter(sql,
				sqlParameterSource);
		return getJdbcOperations().update(
				sqlParameterSetter.getSubstitutedSql(),
				new PreparedStatementArgTypeSetter(
						sqlParameterSetter.getArgs(), sqlParameterSetter
								.getArgTypes(), lobHandler));
	}

	/*
	 * 2009.10.23
	 */
	public Object execute(CallableStatementCreator callableStatementCreator,
			CallableStatementCallback callableStatementCallback) {
		return pagingJdbcTemplate.execute(callableStatementCreator,
				callableStatementCallback);
	}

	protected boolean isPaging(Pagination paginationVO) {
		return (paginationVO.getPageIndex() > 0 && paginationVO.getPageSize() > 0)
				|| (paginationVO instanceof LiveScrollPagination);
	}

	private SqlParameterSetter setSqlParameter(String sql,
			SqlParameterSource sqlParameterSource) {
		ParsedSql parsedSql = NamedParameterUtil.parseSqlStatement(sql);
		Object[] args = NamedParameterUtil.buildValueArray(parsedSql,
				sqlParameterSource);
		int[] argTypes = NamedParameterUtil.buildSqlTypeArray(parsedSql,
				sqlParameterSource);
		String substitutedSql = NamedParameterUtil.substituteNamedParameters(
				sql, sqlParameterSource);

		return new SqlParameterSetter(substitutedSql, args, argTypes);
	}

	// 2009.04.28
	private SqlParameterSetter setSqlParameter(String sql,
			SqlParameterSource sqlParameterSource, Map paramMap) {
		ParsedSql parsedSql = NamedParameterUtil.parseSqlStatement(sql);
		Object[] args = NamedParameterUtil.buildValueArray(sql, paramMap);
		int[] argTypes = NamedParameterUtil.buildSqlTypeArray(parsedSql,
				sqlParameterSource);
		String substitutedSql = NamedParameterUtil.substituteNamedParameters(
				sql, sqlParameterSource);

		return new SqlParameterSetter(substitutedSql, args, argTypes);
	}

	private class SqlParameterSetter {

		private Object[] args;
		private int[] argTypes;
		private String substitutedSql;

		public SqlParameterSetter(String substitutedSql, Object[] args,
				int[] argTypes) {
			this.substitutedSql = substitutedSql;
			this.args = args;
			this.argTypes = argTypes;
		}

		public Object[] getArgs() {
			return args;
		}

		public int[] getArgTypes() {
			return argTypes;
		}

		public String getSubstitutedSql() {
			return substitutedSql;
		}
	}
}
