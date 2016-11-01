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
package org.anyframe.query.impl.jdbc.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.Map;

import org.anyframe.query.MappingInfo;
import org.springframework.jdbc.support.lob.LobHandler;

public class DefaultReflectionResultSetMapper<T> extends ReflectionResultSetMapper<T> {

	public DefaultReflectionResultSetMapper(Class<T> targetClass,
			MappingInfo mappingInfo, Map<String, String> nullchecks,
			LobHandler lobHandler) {
		super(targetClass, mappingInfo, nullchecks, lobHandler);
	}

	/**
	 * Once mapped query statement should be managed by queryResultMapping of
	 * SQLLoader. By extracting Column value consisting of searched each Row, it
	 * is in the format of class instance and transferred.
	 * 
	 * @param resultSet
	 *            One Row out of search result
	 * @return target class instance including search result
	 */
	@SuppressWarnings("unchecked")
	public T mapRow(ResultSet resultSet) throws SQLException {
		Object object = null;
		Iterator<Class<T>> targetClassIterator = targetClasses.iterator();
		while (targetClassIterator.hasNext() && object == null) {
			Class<T> targetClass = targetClassIterator.next();

			ResultSetMappingConfiguration mappingConfiguration;
			// Mapping information extraction of specific
			// class and table

			if (queryId != null
					&& sqlLoader.getQueryResultMappings().containsKey(queryId)) {
				mappingConfiguration = sqlLoader.getQueryResultMappings().get(
						queryId);
			} else {
				mappingConfiguration = getConfig(targetClass, resultSet
						.getMetaData());
				if (queryId != null)
					sqlLoader.getQueryResultMappings().put(queryId,
							mappingConfiguration);
			}
			object = super.toObject(resultSet, targetClass,
					mappingConfiguration);
		}
		return (T)object;
	}
}
