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
package org.anyframe.query.impl.config.loader;

import java.io.IOException;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.anyframe.query.ConfigurationException;
import org.anyframe.query.MappingInfo;
import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.anyframe.query.impl.config.QuerySchemaResolver;
import org.anyframe.query.impl.jdbc.mapper.ResultSetMappingConfiguration;
import org.anyframe.util.StringUtil;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.util.ResourceUtils;
import org.springframework.util.xml.SimpleSaxErrorHandler;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

/**
 * @author Soyon Lim
 */
public class SQLLoader implements ResourceLoaderAware, InitializingBean,
		DisposableBean {

	private static final String SCHEMA_LANGUAGE_ATTRIBUTE = "http://java.sun.com/xml/jaxp/properties/schemaLanguage";

	private static final String XSD_SCHEMA_LANGUAGE = "http://www.w3.org/2001/XMLSchema";

	private boolean skipError = false;

	private int dynamicReload = 0;

	private Watcher watcher;

	private ResourceLoader resourceLoader = null;

	private Map<String, String> nullchecks = new HashMap<String, String>();

	private Map<String, QueryInfo> queryInfos = new HashMap<String, QueryInfo>();

	private Map<String, MappingInfo> mappingInfos = new HashMap<String, MappingInfo>();

	private Map<String, ResultSetMappingConfiguration> queryResultMappings = new HashMap<String, ResultSetMappingConfiguration>();

	private String mappingFiles = "";

	private int registeredQueryCount = 0;

	public Map<String, ResultSetMappingConfiguration> getQueryResultMappings() {
		return queryResultMappings;
	}

	public void setMappingFiles(String mappingFiles) {
		this.mappingFiles = mappingFiles;
	}

	public void setDynamicReload(int dynamicReload) {
		this.dynamicReload = dynamicReload;
	}

	public void setSkipError(boolean skipError) {
		this.skipError = skipError;
	}

	public void setNullchecks(Map<String, String> nullchecks) {
		this.nullchecks = nullchecks;
		Iterator<String> itr = nullchecks.keySet().iterator();
		while (itr.hasNext()) {
			String key = itr.next();
			this.nullchecks.put(key.toLowerCase(), this.nullchecks.get(key));
		}
	}

	/**
	 * @param resourceLoader
	 *            the resourceLoader to set
	 */
	public void setResourceLoader(ResourceLoader resourceLoader) {
		this.resourceLoader = resourceLoader;
	}

	public void afterPropertiesSet() throws Exception {
		try {
			boolean isDynamic = setUpWatcher();
			DocumentBuilder builder = getBuilder();
			loadSQLDefinitions(builder, isDynamic);
		} catch (Exception e) {
			QueryService.LOGGER.error(
					"Query Service : Fail to initialize query service.\n Reason = ["
							+ e.getMessage() + "]", e);
			throw new ConfigurationException(
					"Query Service : Fail to configure mapping xml files.", e);
		}

		QueryService.LOGGER.info("Query Service : There are "
				+ registeredQueryCount
				+ " defined queries in all configuration files.");
	}

	public Map<String, QueryInfo> getQueryInfos() {
		return queryInfos;
	}

	public Map<String, MappingInfo> getMappingInfos() {
		return mappingInfos;
	}

	public MappingInfo getMappingInfo(String queryId) {
		if (!hasQuery(queryId))
			return null;
		final DefaultQueryInfo queryInfo = (DefaultQueryInfo) queryInfos
				.get(queryId);

		DefaultMappingInfo mappingInfo = queryInfo.getLocalMappingInfo();
		String resultClass = queryInfo.getResultClass();

		if (mappingInfo != null)
			return mappingInfo;

		mappingInfo = (DefaultMappingInfo) mappingInfos.get(resultClass);

		if (resultClass == null || mappingInfo == null)
			return new MappingInfo() {

				public String getInsertQuery() {
					return null;
				}

				public String getDeleteQuery() {
					return null;
				}

				// 2009.03.17 - start
				//Operation added to IMappingInfo is implemented. 
				
				public Map<String, String[]> getCompositeColumnNames() {
					return null;
				}

				public Map<String, String[]> getCompositeFieldNames() {
					return null;
				}

				// 2009.03.17 - end

				@SuppressWarnings("unchecked")
				public Map<String, String> getMappingInfoAsMap() {
					return new Map() {

						public void clear() {
						}

						public boolean containsKey(Object key) {
							return true;
						}

						public boolean containsValue(Object value) {
							return true;
						}

						public Set entrySet() {
							return null;
						}

						// 2009.05.28
						public Object get(Object key) {
							return null;
							// return
							// ColumnUtil.changeColumnName(queryInfo.getMappingStyle(),
							// (String)key);
						}

						public boolean isEmpty() {
							return false;
						}

						public Set keySet() {
							return null;
						}

						public Object put(Object key, Object value) {
							return null;
						}

						public void putAll(Map t) {
						}

						public Object remove(Object key) {
							return null;
						}

						public int size() {
							return 0;
						}

						public Collection values() {
							return null;
						}
					};
				}

				public String[] getPrimaryKeyColumns() {
					return null;
				}

				public String getSelectByPrimaryKeyQuery() {
					return null;
				}

				public String getTableName() {
					return null;
				}

				public String getClassName() {
					return null;
				}

				public String getUpdateQuery() {
					return null;
				}

			};
		else
			return mappingInfo;
	}

	public boolean hasQuery(String queryId) {
		return queryInfos.get(queryId) != null;
	}

	public String getQueryStatement(String queryId) {
		return ((QueryInfo) queryInfos.get(queryId)).getQueryString();
	}

	public boolean isDynamicQueryStatement(String queryId) {
		return ((QueryInfo) queryInfos.get(queryId)).isDynamic();
	}

	public int countQuery() {
		return registeredQueryCount;
	}

	public int getFetchCountPerQuery(String queryId) {
		return ((QueryInfo) queryInfos.get(queryId)).getFetchCountPerQuery();
	}

	public String getTableFromClassName(String className) {
		return ((MappingInfo) mappingInfos.get(className)).getTableName();
	}

	public Map<String, String> getNullCheck() {
		return nullchecks;
	}

	public String[] getPrimaryKeysFromClassName(String className) {
		return (String[]) ((MappingInfo) mappingInfos.get(className))
				.getPrimaryKeyColumns();
	}

	private boolean setUpWatcher() {
		boolean isDynamic = false;
		if (this.dynamicReload > 0)
			isDynamic = true;

		if (isDynamic) {
			watcher = new Watcher(this);
			watcher.setRefreshRate(this.dynamicReload);
		}

		return isDynamic;
	}

	private DocumentBuilder getBuilder() throws QueryServiceException,
			ParserConfigurationException, SAXException {

		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(true);
//		factory.setValidating(true);

		try {
			factory
					.setAttribute(SCHEMA_LANGUAGE_ATTRIBUTE,
							XSD_SCHEMA_LANGUAGE);
		} catch (IllegalArgumentException ex) {
			ParserConfigurationException pcex = new ParserConfigurationException(
					"Unable to validate using XSD: Your JAXP provider ["
							+ factory
							+ "] does not support XML Schema. Are you running on Java 1.4 with Apache Crimson? "
							+ "Upgrade to Apache Xerces (or Java 1.5) for full XSD support.");
			pcex.initCause(ex);
			throw pcex;
		}

		DocumentBuilder builder = factory.newDocumentBuilder();
		builder.setErrorHandler(new SimpleSaxErrorHandler(QueryService.LOGGER));
		builder.setEntityResolver(new QuerySchemaResolver()); 
		
		return builder;
	}

	private void loadSQLDefinitions(DocumentBuilder builder, boolean isDynamic)
			throws Exception {
		List<String> files = StringUtil.getTokens(this.mappingFiles);
		String location = "";

		for (int i = 0; i < files.size(); i++) {
			location = files.get(i).trim();
			if (resourceLoader instanceof ResourcePatternResolver) {
				// Resource pattern matching available.
				try {
					Resource[] resources = ((ResourcePatternResolver) resourceLoader)
							.getResources(location);
					int loadCount = loadSQLDefinitions(builder, isDynamic,
							resources);
					if (QueryService.LOGGER.isDebugEnabled()) {
						QueryService.LOGGER.debug("Loaded " + loadCount
								+ " sql definitions from location pattern ["
								+ location + "]");
					}
				} catch (IOException ex) {
					throw new ConfigurationException(
							"Query Service : Could not resolve sql definition resource pattern ["
									+ location + "]", ex);
				}
			} else {
				// Can only load single resources by
				// absolute URL.
				Resource resource = resourceLoader.getResource(location);
				int loadCount = loadSQLDefinitions(builder, isDynamic,
						new Resource[] { resource });
				if (QueryService.LOGGER.isDebugEnabled()) {
					QueryService.LOGGER.debug("Loaded " + loadCount
							+ " sql definitions from location [" + location
							+ "]");
				}
			}
		}

		if (isDynamic) {
			watcher.start();
			if (QueryService.LOGGER.isDebugEnabled()) {
				QueryService.LOGGER
						.debug("Query Service : Watcher is started...");
			}
		}
	}

	private void addToWatcher(boolean dynamicSqlLoad, Resource resource)
			throws Exception {
		if (dynamicSqlLoad && !ResourceUtils.isJarURL(resource.getURL()))
			watcher.addResource(resource);
	}

	private int loadSQLDefinitions(DocumentBuilder builder,
			boolean dynamicSqlLoad, Resource[] resources) throws Exception {
		int loadCount = 0;
		for (int i = 0; i < resources.length; i++) {
			loadCount += buildSQLMap(builder, resources[i]);
			addToWatcher(dynamicSqlLoad, resources[i]);
		}
		return loadCount;
	}

	private int buildSQLMap(DocumentBuilder builder, Resource resource)
			throws ConfigurationException, SAXException, IOException {
		int successCount = 0;
		try {
			Document rootConfig = builder.parse(resource.getInputStream());

			NodeList tableMappingConfig = rootConfig
					.getElementsByTagName("table-mapping");

			if (tableMappingConfig.getLength() > 0) {
				NodeList tables = ((Element) tableMappingConfig.item(0))
						.getElementsByTagName("table");

				for (int i = 0; i < tables.getLength(); i++) {
					DefaultMappingInfo mappingInfo = new DefaultMappingInfo();
					mappingInfo.configure((Element) tables.item(i));
					mappingInfos.put(mappingInfo.getClassName(), mappingInfo);
				}
			}

			NodeList queriesConfig = rootConfig.getElementsByTagName("queries");

			if (queriesConfig.getLength() > 0) {
				NodeList queries = ((Element) queriesConfig.item(0))
						.getElementsByTagName("query");

				for (int i = 0; i < queries.getLength(); i++) {
					DefaultQueryInfo queryInfo = new DefaultQueryInfo();
					queryInfo.configure((Element) queries.item(i));
					queryInfos.put(queryInfo.getQueryId(), queryInfo);
					++successCount;
					++registeredQueryCount;
				}
			}
		} catch (SAXParseException se) {
			QueryService.LOGGER.error(
					"Query Service : Fail to configure mapping xml file ["
							+ resource.getFilename() + "]. " + se.getSystemId()
							+ " is invalid.\n" + "Cause - [" + se.getMessage()
							+ "]\n" + "Please confirm the "
							+ se.getLineNumber() + " line in "
							+ se.getSystemId() + ".", se);
			if (!skipError)
				throw se;
		}

		return successCount;
	}

	class Watcher extends Thread {

		private final int scanRate = 10;

		private Hashtable<Resource, Long> resources = new Hashtable<Resource, Long>();

		private boolean done = false;

		private long refreshRate = 0;

		public Watcher(Object subscriber) {
			setDaemon(true);
			setPriority(Thread.MIN_PRIORITY);
		}

		public void setRefreshRate(long refresh) {
			if (refresh > scanRate)
				this.refreshRate = refresh;
			else
				this.refreshRate = scanRate;
		}

		/**
		 * @return the refresh rate, in seconds, of this watcher
		 */
		public long getRefreshRate() {
			return refreshRate;
		}

		public void addResource(Resource resource) throws Exception {
			resources
					.put(resource, new Long(resource.getFile().lastModified()));
			QueryService.LOGGER.info("appended " + resource.getFilename()
					+ " file for monitoring");
		}

		/**
		 * <p>
		 * Main routine for the monitor which periodically checks whether the
		 * filex have been modified.
		 * </p>
		 * The algorithm used does not guarantee a constant refresh rate between
		 * invocations.
		 */
		public void run() {
			try {
				while (!done) {
					synchronized (this) {
						boolean modificationChk = false;
						Enumeration<Resource> en = resources.keys();
						while (en.hasMoreElements()) {
							try {
								Resource resource = (Resource) en.nextElement();

								long modified = ((Long) resources.get(resource))
										.longValue();

								if (!resource.exists()) {
									resources.remove(resource);
									continue;
								}

								if (resource.getFile().getAbsoluteFile()
										.lastModified() > modified) {
									resources.put(resource, new Long(resource
											.getFile().lastModified()));
									// rebuildSQLMap(builder);
									modificationChk = true;
									continue;
								}
							} catch (Exception e) {
								QueryService.LOGGER
										.error(
												"Query Service : Fail to check whether mapping XML file is modified.",
												e);
							}
						}

						try {
							if (modificationChk)
								rebuildSQLMap(getBuilder());
						} catch (Exception e) {
							QueryService.LOGGER
									.error(
											"Query Service : Fail to rebuild Query Mapping.",
											e);
						}
						sleep(getRefreshRate());
					}
				}
			} catch (InterruptedException e) {
				QueryService.LOGGER.error(
						"Query Service : Fail to run Watcher.", e);
			}
		}

		private void rebuildSQLMap(DocumentBuilder builder)
				throws QueryServiceException {
			QueryService.LOGGER
					.info("Query Service : Watcher rebuilds Query Mapping.....");
			clearSQLMap();
			Enumeration<Resource> en = resources.keys();
			while (en.hasMoreElements()) {
				Resource resource = (Resource) en.nextElement();
				try {
					buildSQLMap(builder, resource);
				} catch (Exception e) {
					QueryService.LOGGER.error(
							"Query Service : Error Query Mapping file : "
									+ resource.getFilename(), e);
				}
				QueryService.LOGGER
						.info("Query Service : Rebuild Query Mapping file : "
								+ resource.getFilename());
			}

		}

		/**
		 * Mark that the watching thread should be stopped
		 */
		public void setDone() {
			done = true;
		}
	}

	public void destroy() throws QueryServiceException {
		clearSQLMap();
		nullchecks.clear();
		if (watcher != null)
			watcher.setDone();
	}

	private void clearSQLMap() {
		queryInfos.clear();
		mappingInfos.clear();
		registeredQueryCount = 0;
	}
}
