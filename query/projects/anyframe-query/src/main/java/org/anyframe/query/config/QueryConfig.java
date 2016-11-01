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
package org.anyframe.query.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.sql.DataSource;

import org.anyframe.query.QueryService;
import org.anyframe.query.SqlLoader;
import org.anyframe.query.impl.QueryServiceImpl;
import org.anyframe.query.impl.config.loader.MappingXMLLoader;
import org.anyframe.query.impl.jdbc.PagingJdbcTemplate;
import org.anyframe.query.impl.jdbc.generator.HSQLPagingSQLGenerator;
import org.anyframe.query.impl.jdbc.generator.PagingSQLGenerator;
import org.anyframe.query.impl.util.RawSQLExceptionTranslator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * configuration class for anyframe query service
 * 
 * @author jaehyoung.eum
 * @since 1.1.3
 */
@Configuration
public class QueryConfig {

	@Autowired
	DataSource dataSource;

	@Bean
	public RawSQLExceptionTranslator exceptionTranslator() {
		return new RawSQLExceptionTranslator();
	}

	@Bean
	public QueryService queryService() {
		QueryServiceImpl queryService = new QueryServiceImpl();
		queryService.setSqlRepository(sqlRepository());
		queryService.setJdbcTemplate(jdbcTemplate());
		queryService.setPagingSQLGenerator(pagingSQLGenerator());
		queryService.setLobHandler(lobHandler());
		return queryService;
	}

	@Bean
	public PagingJdbcTemplate jdbcTemplate() {
		PagingJdbcTemplate jdbcTemplate = new PagingJdbcTemplate();
		jdbcTemplate.setDataSource(dataSource);
		jdbcTemplate.setExceptionTranslator(exceptionTranslator());
		return jdbcTemplate;
	}

	@Bean
	public PagingSQLGenerator pagingSQLGenerator() {
		return new HSQLPagingSQLGenerator();
	}

	@Bean
	@Lazy(value = true)
	public LobHandler lobHandler() {
		DefaultLobHandler logHandler = new DefaultLobHandler();
		return logHandler;
	}

	@Bean
	public SqlLoader sqlRepository() {
		Map<String, String> map = new ConcurrentHashMap<String, String>();
		map.put("VARCHAR", "");
		MappingXMLLoader sqlLoader = new MappingXMLLoader();
		sqlLoader.setMappingFiles("classpath:sql/query/mapping-*.xml");
		sqlLoader.setNullchecks(map);
		sqlLoader.setSkipError(true);
		return sqlLoader;
	}
}
