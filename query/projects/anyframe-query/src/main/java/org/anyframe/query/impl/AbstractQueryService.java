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

import java.io.File;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.anyframe.query.impl.config.loader.SQLLoader;
import org.anyframe.util.StringUtil;
import org.apache.velocity.app.Velocity;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

/**
 * @author SOOYEON PARK
 */
public abstract class AbstractQueryService implements ApplicationContextAware,
		ResourceLoaderAware {

	protected SQLLoader sqlRepository = null;
	protected String propsFilename;
	protected ResourceLoader resourceLoader = null;

	public void setVelocityPropsFilename(String propsFilename) {
		this.propsFilename = propsFilename;
	}

	/**
	 * @return the sqlRepository
	 */
	public SQLLoader getSqlRepository() {
		return sqlRepository;
	}

	/**
	 * @param sqlRepository
	 *            the sqlRepository to set
	 */
	public void setSqlRepository(SQLLoader sqlRepository) {
		this.sqlRepository = sqlRepository;
	}

	public void setApplicationContext(ApplicationContext context) {
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
			//In the case where velocityPropsFilename property is not defined,
			//Velocity Log file is not created.
			
			if (StringUtil.isEmpty(propsFilename)) {
				Velocity.addProperty("runtime.log.logsystem.class",
						"org.apache.velocity.runtime.log.NullLogSystem");
				Velocity.init();
			} else {
				Resource[] resources = ((ResourcePatternResolver) resourceLoader)
						.getResources(propsFilename);

				File velocityLogFile = resources[0].getFile();
				if (velocityLogFile.exists()) {
					Velocity.addProperty("runtime.log",
							velocityLogFile.getAbsolutePath());
					Velocity.init();
				} else
					throw new Exception("Velocity log file doesn't exists.");
			}
		} catch (Exception e) {
			QueryService.LOGGER.error(
					"Query Service : Fail to initialize Velocity.\n Reason = ["
							+ e.getMessage() + "]", e);
			throw new Exception("Query Service : Fail to initialize Velocity.",
					e);
		}
	}

	protected String getRunnableSQL(String sql, SqlParameterSource searchParams)
			throws QueryServiceException {
		StringBuffer tempStatement = new StringBuffer(sql);
		SortedMap replacementPositions = findTextReplacements(tempStatement);

		Iterator properties = replacementPositions.entrySet().iterator();
		int valueLengths = 0;
		while (properties.hasNext()) {
			Map.Entry entry = (Map.Entry) properties.next();
			Integer pos = (Integer) entry.getKey();
			String key = (String) entry.getValue();
			Object replaceValue = (String) searchParams.getValue(key);
			if (replaceValue == null) {
				throw new QueryServiceException(
						"Query Service : Text replacement [" + entry.getValue()
								+ "] has not been set.");
			}
			String value = replaceValue.toString();
			tempStatement.insert(pos.intValue() + valueLengths, value);
			valueLengths += value.length();
		}
		return tempStatement.toString();
	}

	protected SortedMap findTextReplacements(StringBuffer sql) {
		TreeMap textReplacements = new TreeMap();
		int startPos = 0;
		while ((startPos = sql.indexOf("{{", startPos)) > -1) {
			int endPos = sql.indexOf("}}", startPos);
			String replacementKey = sql.substring(startPos + 2, endPos);
			sql.replace(startPos, endPos + 2, "");
			textReplacements.put(new Integer(startPos), replacementKey);
		}
		return textReplacements;
	}

	protected boolean isVelocity(String sql) {
		return ((sql.indexOf("#if") > -1 || sql.indexOf("#foreach") > -1) && sql
				.indexOf("#end") > -1);
	}

	protected void containesQueryId(String queryId)
			throws QueryServiceException {
		if (!getSqlRepository().hasQuery(queryId))
			throw new QueryServiceException(
					"Query Service : Fail to find queryId [" + queryId
							+ "] in mapping xml files.");
	}

}
