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

import org.anyframe.query.impl.QueryServiceImpl;
import org.anyframe.query.impl.config.loader.MappingXMLLoader;
import org.anyframe.query.impl.jdbc.PagingJdbcTemplate;
import org.anyframe.query.impl.jdbc.generator.AltibasePagingSQLGenerator;
import org.anyframe.query.impl.jdbc.generator.DB2PagingSQLGenerator;
import org.anyframe.query.impl.jdbc.generator.DefaultPagingSQLGenerator;
import org.anyframe.query.impl.jdbc.generator.HSQLPagingSQLGenerator;
import org.anyframe.query.impl.jdbc.generator.MSSQLPagingSQLGenerator;
import org.anyframe.query.impl.jdbc.generator.MySQLPagingSQLGenerator;
import org.anyframe.query.impl.jdbc.generator.OraclePagingSQLGenerator;
import org.anyframe.query.impl.util.RawSQLExceptionTranslator;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.RuntimeBeanReference;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.OracleLobHandler;
import org.springframework.jdbc.support.nativejdbc.CommonsDbcpNativeJdbcExtractor;

/**
 * Bean Definition Registry class for Java Configuration of Anyframe Query
 * Service
 * 
 * @author jaehyoung.eum
 * @since 1.1.3
 */
public class QueryServiceBeanDefinitionRegistry implements
		ImportBeanDefinitionRegistrar {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.context.annotation.ImportBeanDefinitionRegistrar#
	 * registerBeanDefinitions(org.springframework.core.type.AnnotationMetadata,
	 * org.springframework.beans.factory.support.BeanDefinitionRegistry)
	 */
	public void registerBeanDefinitions(
			AnnotationMetadata importingClassMetadata,
			BeanDefinitionRegistry registry) {

		BeanDefinition lobHandlerDef = null;
		BeanDefinition pageSqlGeneratorDef = null;
		BeanDefinition jdbcTemplateDef = null;
		BeanDefinition sqlLoaderDef = null;
		BeanDefinition exceptionTranslatorDef = null;

		String dbType = (String) importingClassMetadata
				.getAnnotationAttributes(EnableQueryService.class.getName())
				.get("dbType");
		String dataSourceRef = (String) importingClassMetadata
				.getAnnotationAttributes(EnableQueryService.class.getName())
				.get("dataSourceRef");
		String jdbcTemplateRef = (String) importingClassMetadata
				.getAnnotationAttributes(EnableQueryService.class.getName())
				.get("jdbcTemplateRef");
		String sqlLoaderRef = (String) importingClassMetadata
				.getAnnotationAttributes(EnableQueryService.class.getName())
				.get("sqlLoaderRef");
		String id = (String) importingClassMetadata.getAnnotationAttributes(
				EnableQueryService.class.getName()).get("id");

		// exception translator bean definition
		exceptionTranslatorDef = new RootBeanDefinition(
				RawSQLExceptionTranslator.class);

		// jdbc template bean definition
		jdbcTemplateDef = new RootBeanDefinition(PagingJdbcTemplate.class);
		jdbcTemplateDef.getPropertyValues().add(
				QueryServiceConstant.DEFAULT_DATA_SOURCE_NAME,
				new RuntimeBeanReference(dataSourceRef)).add(
				QueryServiceConstant.DEFAULT_EXCEPTION_TRANSLATOR_NAME,
				exceptionTranslatorDef);

		// sql loader bean definition
		sqlLoaderDef = new RootBeanDefinition(MappingXMLLoader.class);
		sqlLoaderDef.getPropertyValues().addPropertyValue("mappingFiles",
				"classpath:sql/query/mapping-*.xml");
		Map<String, String> nullchecksMap = new ConcurrentHashMap<String, String>();
		nullchecksMap.put("VARCHAR", "");
		sqlLoaderDef.getPropertyValues().addPropertyValue("nullchecks",
				nullchecksMap);

		if ("oracle".equals(dbType)) {
			// nativeJdbcExtractor bean definition for oracle
			BeanDefinition nativeJdbcExtractorDef = new RootBeanDefinition(
					CommonsDbcpNativeJdbcExtractor.class);
			nativeJdbcExtractorDef.setLazyInit(true);

			// lob handler bean definition for oracle
			lobHandlerDef = new RootBeanDefinition(OracleLobHandler.class);
			lobHandlerDef.setLazyInit(true);
			lobHandlerDef.getPropertyValues().add("nativeJdbcExtractor",
					nativeJdbcExtractorDef);

			// page sql generator bean definition for oracle
			pageSqlGeneratorDef = new RootBeanDefinition(
					OraclePagingSQLGenerator.class);

		} else {
			// lob handler bean definition
			lobHandlerDef = new RootBeanDefinition(DefaultLobHandler.class);
			lobHandlerDef.setLazyInit(true);

			if ("hsqldb".equals(dbType)) {
				// page sql generator bean definition for hsqldb
				pageSqlGeneratorDef = new RootBeanDefinition(
						HSQLPagingSQLGenerator.class);

			} else if ("db2".equals(dbType)) {
				// page sql generator bean definition for hsqldb
				pageSqlGeneratorDef = new RootBeanDefinition(
						DB2PagingSQLGenerator.class);

			} else if ("mysql".equals(dbType)) {
				// page sql generator bean definition for hsqldb
				pageSqlGeneratorDef = new RootBeanDefinition(
						MySQLPagingSQLGenerator.class);

			} else if ("altibase".equals(dbType)) {
				// page sql generator bean definition for hsqldb
				pageSqlGeneratorDef = new RootBeanDefinition(
						AltibasePagingSQLGenerator.class);
				registry.registerBeanDefinition(
						QueryServiceConstant.DEFAULT_PAGING_SQL_GENERATOR_NAME,
						pageSqlGeneratorDef);

			} else if ("mssql".equals(dbType)) {
				// page sql generator bean definition for hsqldb
				pageSqlGeneratorDef = new RootBeanDefinition(
						MSSQLPagingSQLGenerator.class);

			} else { // defalut
				// page sql generator bean definition for hsqldb
				pageSqlGeneratorDef = new RootBeanDefinition(
						DefaultPagingSQLGenerator.class);
			}
		}

		// query service bean definition
		BeanDefinition queryServiceDef = new RootBeanDefinition(
				QueryServiceImpl.class);
		queryServiceDef.getPropertyValues().add(
				QueryServiceConstant.DEFAULT_SQL_RESPOSITORY_NAME,
				QueryServiceConstant.DEFAULT_SQL_LOADER_NAME
						.equals(sqlLoaderRef) ? sqlLoaderDef
						: new RuntimeBeanReference(sqlLoaderRef)).add(
				QueryServiceConstant.DEFAULT_JDBC_TEMPLATE_NAME,
				QueryServiceConstant.DEFAULT_JDBC_TEMPLATE_NAME
						.equals(jdbcTemplateRef) ? jdbcTemplateDef
						: new RuntimeBeanReference(jdbcTemplateRef)).add(
				QueryServiceConstant.DEFAULT_PAGING_SQL_GENERATOR_NAME,
				pageSqlGeneratorDef).add(
				QueryServiceConstant.DEFAULT_LOB_HANDLER_NAME, lobHandlerDef);
		registry.registerBeanDefinition(id, queryServiceDef);

	}
}
