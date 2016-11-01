package org.anyframe.query.impl.jdbc.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.Map;

import org.anyframe.query.MappingInfo;
import org.springframework.jdbc.support.lob.LobHandler;

public class DefaultReflectionResultSetMapper extends ReflectionResultSetMapper {

	public DefaultReflectionResultSetMapper(Class targetClass,
			MappingInfo mappingInfo, Map nullchecks, LobHandler lobHandler) {
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
	public Object mapRow(ResultSet resultSet) throws SQLException {
		Object object = null;
		Iterator targetClassIterator = targetClasses.iterator();
		while (targetClassIterator.hasNext() && object == null) {
			Class targetClass = (Class) targetClassIterator.next();

			ResultSetMappingConfiguration mappingConfiguration;
			// Mapping information extraction of specific
			// class and table

			if (queryId != null
					&& sqlLoader.getQueryResultMappings().containsKey(queryId)) {
				mappingConfiguration = (ResultSetMappingConfiguration) sqlLoader
						.getQueryResultMappings().get(queryId);
			} else {
				mappingConfiguration = getConfig(targetClass,
						resultSet.getMetaData());
				if (queryId != null)
					sqlLoader.getQueryResultMappings().put(queryId,
							mappingConfiguration);
			}
			object = super.toObject(resultSet, targetClass,
					mappingConfiguration);
		}
		return object;
	}
}
