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
package org.anyframe.query.impl.config;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.beans.factory.parsing.BeanComponentDefinition;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.beans.factory.xml.BeanDefinitionParser;
import org.springframework.beans.factory.xml.ParserContext;
import org.springframework.jdbc.support.lob.AbstractLobHandler;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.OracleLobHandler;
import org.springframework.jdbc.support.nativejdbc.CommonsDbcpNativeJdbcExtractor;
import org.w3c.dom.Element;

/**
 * {@link BeanDefinitionParser} that parses the {@code auto-config} element to
 * configure a QueryService.
 * 
 * <p>
 * Responsible for:
 * <ol>
 * <li>Registering a PagingJdbcTemplate bean and reference beans to execute the
 * defined SQL statement by accessing DB and getting java.sql.Connection object
 * using DataSource service.
 * <ul>
 * <li>It references 'org.anyframe.query.impl.util.RawSQLExceptionTranslator' as
 * exceptionTranslator.
 * </ul>
 * </li>
 * <li>Registering a SQLLoader bean required for handling mapping XML files
 * which define table mapping information and SQL statements. And It includes
 * property values as below.
 * <ul>
 * <li>'mappingFiles' - *.xml files under /sql/query on the classpath.</li>
 * <li>'nullchecks' - {"VARCHAR", ""}</li>
 * <li>'skipError' - true</li>
 * <li>'dynamicReload' - not defined
 * </ul>
 * </li>
 * <li>Registering a PagingSQLGenerator bean required for making pagination SQL
 * statement for each DB. It depends on entered 'dbType'.</li>
 * <li>Registering a LobHandler bean and reference beans required for handling
 * LOB data. It depends on entered 'dbType'.</li>
 * </ol>
 * You can configure:
 * <ul>
 * <li>Configures id of QueryService bean if specified, otherwise default is
 * 'queryService'.</li>
 * <li>JdbcTemplate bean references specified dataSource bean if
 * 'dataSource-ref' is specified, otherwise default value of 'dataSource-ref' is
 * 'dataSource'.</li>
 * <li>QueryService bean references specified jdbcTemplate bean if
 * 'jdbcTemplate-ref' is specified, otherwise default value of
 * 'jdbcTemplate-ref' is 'jdbcTemplate'.</li>
 * <li>QueryService bean references specified sqlLoader bean if 'sqlLoader-ref'
 * is specified, otherwise default value of 'sqlLoader-ref' is 'sqlLoader'.</li>
 * </ul>
 * </ol>
 * 
 * @author Soyon Lim
 */
public class AutoConfigBeanDefinitionParser implements BeanDefinitionParser {

	private String[] dbTypes = new String[] { "altibase", "db2", "hsqldb",
			"mssql", "mysql", "oracle", "default" };
	private Class<?>[] pagingSQLGenerators = new Class[] {
			AltibasePagingSQLGenerator.class, DB2PagingSQLGenerator.class,
			HSQLPagingSQLGenerator.class, MSSQLPagingSQLGenerator.class,
			MySQLPagingSQLGenerator.class, OraclePagingSQLGenerator.class,
			DefaultPagingSQLGenerator.class };

	private static String QUERY_BEAN_NAME = "queryService";

	private static String JDBC_TEMPLATE_BEAN_NAME = "jdbcTemplate";
	private static String EXCEPTION_TRANSLATOR_BEAN_NAME = "exceptionTranslator";
	private static String DATASOURCE_BEAN_NAME = "dataSource";

	private static String SQL_REPOSITORY_PROPERTY_NAME = "sqlRepository";
	private static String SQL_REPOSITORY_BEAN_NAME = "sqlLoader";

	private static String PAGING_SQL_GENRERATOR_BEAN_NAME = "pagingSQLGenerator";

	private static String LOB_HANDLER_BEAN_NAME = "lobHandler";
	private static String NATIVE_JDBC_EXTRACTOR_BEAN_NAME = "nativeJdbcExtractor";

	/**
	 * Parse the <query:auto-config/> element and register the resulting
	 * (definition of queryService bean).
	 * 
	 * @param element
	 *            the element that is to be parsed into one or more
	 *            {@link BeanDefinition BeanDefinitions}
	 * @param parserContext
	 *            the object encapsulating the current state of the parsing
	 *            process; provides access to a
	 *            {@link org.springframework.beans.factory.support.BeanDefinitionRegistry}
	 * @return the primary {@link BeanDefinition}
	 */
	public BeanDefinition parse(Element element, ParserContext parserContext) {
		Object source = parserContext.extractSource(element);

		String queryId = element.getAttribute("id");
		String datasourceRefId = element.getAttribute("dataSource-ref");
		String jdbcTemplateRefId = element.getAttribute("jdbcTemplate-ref");
		String dbType = element.getAttribute("dbType");
		String sqlLoaderRefId = element.getAttribute("sqlLoader-ref");

		// Register jdbcTemplate
		RuntimeBeanReference jdbcTemplateDef = getJdbcTemplate(parserContext,
				source, jdbcTemplateRefId, datasourceRefId);
		// Register sqlRepository
		RuntimeBeanReference sqlLoaderDef = getSqlLoader(parserContext, source,
				sqlLoaderRefId);
		// Register pagingSQLGenerator
		RuntimeBeanReference pagingSQLGeneratorDef = getPagingSQLGenerator(
				parserContext, source, dbType);
		// Register lobHandler
		RuntimeBeanReference lobHandlerDef = getLobHandler(parserContext,
				source, dbType);

		RootBeanDefinition queryServiceDef = new RootBeanDefinition(
				QueryServiceImpl.class);
		queryServiceDef.setSource(source);

		queryServiceDef.getPropertyValues().add(JDBC_TEMPLATE_BEAN_NAME,
				jdbcTemplateDef);
		queryServiceDef.getPropertyValues().add(SQL_REPOSITORY_PROPERTY_NAME,
				sqlLoaderDef);
		queryServiceDef.getPropertyValues().add(
				PAGING_SQL_GENRERATOR_BEAN_NAME, pagingSQLGeneratorDef);
		queryServiceDef.getPropertyValues().add(LOB_HANDLER_BEAN_NAME,
				lobHandlerDef);

		parserContext.getRegistry().registerBeanDefinition(
				getDefaultBeanName(queryId, QUERY_BEAN_NAME), queryServiceDef);

		return null;
	}

	/**
	 * get bean definition of jdbcTemplate bean.
	 * 
	 * @param parserContext
	 *            the object encapsulating the current state of the parsing
	 *            process; provides access to a
	 *            {@link org.springframework.beans.factory.support.BeanDefinitionRegistry}
	 * @param source
	 *            configuration source <code>Object</code> for this metadata
	 *            element
	 * @param jdbcTemplateRefId
	 *            id of jdbcTemplate bean which refers
	 * @param dataSourceRefId
	 *            id of dataSource bean which refers
	 * @return bean definition of jdbcTemplate bean
	 */
	private RuntimeBeanReference getJdbcTemplate(ParserContext parserContext,
			Object source, String jdbcTemplateRefId, String dataSourceRefId) {
		if (jdbcTemplateRefId.equals("")) {
			String jdbcTemplateBeanName = JDBC_TEMPLATE_BEAN_NAME
					+ generateRandomString();
			String dataSourceBeanName = getDefaultBeanName(dataSourceRefId,
					DATASOURCE_BEAN_NAME);

			RootBeanDefinition jdbcTemplateDef = new RootBeanDefinition(
					PagingJdbcTemplate.class);
			jdbcTemplateDef.setSource(source);
			parserContext.getRegistry().registerBeanDefinition(
					jdbcTemplateBeanName, jdbcTemplateDef);

			RootBeanDefinition exceptionTranslatorDef = new RootBeanDefinition(
					RawSQLExceptionTranslator.class);
			exceptionTranslatorDef.setSource(source);
			parserContext.getRegistry().registerBeanDefinition(
					EXCEPTION_TRANSLATOR_BEAN_NAME, exceptionTranslatorDef);
			jdbcTemplateDef.getPropertyValues().add(
					EXCEPTION_TRANSLATOR_BEAN_NAME,
					new RuntimeBeanReference(EXCEPTION_TRANSLATOR_BEAN_NAME));

			jdbcTemplateDef.getPropertyValues().add(DATASOURCE_BEAN_NAME,
					new RuntimeBeanReference(dataSourceBeanName));

			return new RuntimeBeanReference(jdbcTemplateBeanName);
		}

		return new RuntimeBeanReference(jdbcTemplateRefId);
	}

	/**
	 * get bean definition of sqlLoader bean.
	 * 
	 * @param parserContext
	 *            the object encapsulating the current state of the parsing
	 *            process; provides access to a
	 *            {@link org.springframework.beans.factory.support.BeanDefinitionRegistry}
	 * @param source
	 *            configuration source <code>Object</code> for this metadata
	 *            element
	 * @param sqlLoaderRefId
	 *            id of sqlLoader bean which refers
	 * @return bean definition of sqlLoader bean
	 */
	private RuntimeBeanReference getSqlLoader(ParserContext parserContext,
			Object source, String sqlLoaderRefId) {

		if (sqlLoaderRefId.equals("")) {
			String sqlRepositoryBeanName = SQL_REPOSITORY_BEAN_NAME
					+ generateRandomString();

			RootBeanDefinition sqlLoaderDef = new RootBeanDefinition(
					MappingXMLLoader.class);
			sqlLoaderDef.setSource(source);

			sqlLoaderDef.getPropertyValues().add("mappingFiles",
					"classpath*:/sql/query/**/*.xml");

			Map<String, String> nullchecks = new HashMap<String, String>();
			nullchecks.put("VARCHAR", "");
			sqlLoaderDef.getPropertyValues().add("nullchecks", nullchecks);

			sqlLoaderDef.getPropertyValues().add("skipError", true);

			parserContext.getRegistry().registerBeanDefinition(
					sqlRepositoryBeanName, sqlLoaderDef);
			parserContext.registerComponent(new BeanComponentDefinition(
					sqlLoaderDef, sqlRepositoryBeanName));

			return new RuntimeBeanReference(sqlRepositoryBeanName);
		}

		return new RuntimeBeanReference(sqlLoaderRefId);
	}

	/**
	 * get bean definition of pagingSQLGenerator bean.
	 * 
	 * @param parserContext
	 *            the object encapsulating the current state of the parsing
	 *            process; provides access to a
	 *            {@link org.springframework.beans.factory.support.BeanDefinitionRegistry}
	 * @param source
	 *            configuration source <code>Object</code> for this metadata
	 *            element
	 * @param dbType
	 *            DBMS type
	 * @return bean definition of pagingSQLGenerator bean
	 */
	private RuntimeBeanReference getPagingSQLGenerator(
			ParserContext parserContext, Object source, String dbType) {

		List<String> dbNameList = Arrays.asList(dbTypes);
		int idx = dbNameList.indexOf(dbType);

		Class<?> pagingSQLGenerator = null;

		String pagingSQLGeneratorBeanName = dbType
				+ PAGING_SQL_GENRERATOR_BEAN_NAME.substring(0, 1).toUpperCase()
				+ PAGING_SQL_GENRERATOR_BEAN_NAME.substring(1);

		if (idx == -1) {
			try {
				pagingSQLGenerator = Thread.currentThread()
						.getContextClassLoader().loadClass(
								dbType + "PagingSQLGenerator");
			} catch (ClassNotFoundException e) {
				pagingSQLGenerator = DefaultPagingSQLGenerator.class;
				pagingSQLGeneratorBeanName = "default"
						+ PAGING_SQL_GENRERATOR_BEAN_NAME.substring(0, 1)
								.toUpperCase()
						+ PAGING_SQL_GENRERATOR_BEAN_NAME.substring(1);
			}
		} else {
			pagingSQLGenerator = pagingSQLGenerators[idx];
		}

		RootBeanDefinition pagingSQLGeneratorDef = new RootBeanDefinition(
				pagingSQLGenerator);
		pagingSQLGeneratorDef.setSource(source);
		parserContext.getRegistry().registerBeanDefinition(
				pagingSQLGeneratorBeanName, pagingSQLGeneratorDef);

		return new RuntimeBeanReference(pagingSQLGeneratorBeanName);
	}

	/**
	 * get bean definition of lobHandler bean.
	 * 
	 * @param parserContext
	 *            the object encapsulating the current state of the parsing
	 *            process; provides access to a
	 *            {@link org.springframework.beans.factory.support.BeanDefinitionRegistry}
	 * @param source
	 *            configuration source <code>Object</code> for this metadata
	 *            element
	 * @param dbType
	 *            DBMS type
	 * @return bean definition of lobHandler bean
	 */
	private RuntimeBeanReference getLobHandler(ParserContext parserContext,
			Object source, String dbType) {

		String lobHandlerBeanName = LOB_HANDLER_BEAN_NAME;

		Class<? extends AbstractLobHandler> lobHandler = DefaultLobHandler.class;
		if (dbType.equals("oracle")) {
			lobHandler = OracleLobHandler.class;
			lobHandlerBeanName = "oracle"
					+ LOB_HANDLER_BEAN_NAME.substring(0, 1).toUpperCase()
					+ LOB_HANDLER_BEAN_NAME.substring(1);
		}

		RootBeanDefinition lobHandlerDef = new RootBeanDefinition(lobHandler);
		lobHandlerDef.setSource(source);
		lobHandlerDef.setLazyInit(true);
		parserContext.getRegistry().registerBeanDefinition(lobHandlerBeanName,
				lobHandlerDef);

		if (dbType.equals("oracle")) {
			RootBeanDefinition nativeJdbcExtractorDef = new RootBeanDefinition(
					CommonsDbcpNativeJdbcExtractor.class);
			nativeJdbcExtractorDef.setSource(source);
			nativeJdbcExtractorDef.setLazyInit(true);
			parserContext.getRegistry().registerBeanDefinition(
					NATIVE_JDBC_EXTRACTOR_BEAN_NAME, nativeJdbcExtractorDef);
			lobHandlerDef.getPropertyValues().add(
					NATIVE_JDBC_EXTRACTOR_BEAN_NAME,
					new RuntimeBeanReference(NATIVE_JDBC_EXTRACTOR_BEAN_NAME));
		} else {
			lobHandlerDef.getPropertyValues().add("wrapAsLob", true);
		}

		return new RuntimeBeanReference(lobHandlerBeanName);
	}

	/**
	 * get bean name.
	 * 
	 * @param value
	 *            defined value
	 * @param defaultValue
	 *            default value
	 * @return If defined value is empty, return default value
	 */
	private String getDefaultBeanName(String value, String defaultValue) {
		if (value.equals("")) {
			return defaultValue;
		}
		return value;
	}

	/**
	 * get random string for generating unique bean nameF
	 * 
	 * @return generated string
	 */
	private String generateRandomString() {
		int maxLen = 9;

		StringBuffer result = new StringBuffer();

		for (int i = 0; (i < maxLen); i++) {
			int j = 0;
			if (i % 2 == 0) {
				j = (int) ((Math.random() * 26) + 65);
			} else {
				j = (int) ((Math.random() * 26) + 97);
			}
			result.append(Character.toString((char) j));
		}

		return "_" + result.toString();
	}
}
