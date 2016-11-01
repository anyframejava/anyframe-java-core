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
	 * 한번 매핑 처리된 쿼리문은 SQLLoader의 queryResultMapping에 의해 관리되도록 한다. 조회된 각 Row를
	 * 구성하는 Column의 값들을 추출하여 target class의 인스턴스에 담아 전달한다.
	 * 
	 * @param resultSet
	 *            조회 결과 중 하나의 Row
	 * @return 조회 결과를 담은 target class의 인스턴스
	 */
	public Object mapRow(ResultSet resultSet) throws SQLException {
		Object object = null;
		Iterator targetClassIterator = targetClasses.iterator();
		while (targetClassIterator.hasNext() && object == null) {
			Class targetClass = (Class) targetClassIterator.next();

			ResultSetMappingConfiguration mappingConfiguration;
			// 특정 클래스와 테이블의 매핑 정보 추출
			if (queryId != null
					&& sqlLoader.getQueryResultMappings().containsKey(queryId)) {
				mappingConfiguration = (ResultSetMappingConfiguration) sqlLoader
						.getQueryResultMappings().get(queryId);
			} else {
				mappingConfiguration = getConfig(targetClass, resultSet
						.getMetaData());
				if (queryId != null)
					sqlLoader.getQueryResultMappings().put(queryId,
							mappingConfiguration);
			}
			object = super.toObject(resultSet, targetClass, mappingConfiguration);
		}
		return object;
	}
}
