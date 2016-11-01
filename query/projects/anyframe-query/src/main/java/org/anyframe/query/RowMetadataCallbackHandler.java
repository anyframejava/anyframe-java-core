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
package org.anyframe.query;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.anyframe.query.impl.Pagination;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * This is a class for handling the task of setting the metadata from the
 * ResultSet obtained after executing the query statement
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public interface RowMetadataCallbackHandler extends RowCallbackHandler {

	/**
	 * set lobHandler for QueryService Ria.
	 * 
	 * @param lobHandler
	 */
	void setLobHandler(LobHandler lobHandler);

	/**
	 * set nullCheckInfos for QueryService Ria.
	 * 
	 * @param nullCheckInfos
	 */
	void setNullCheckInfos(Map<String, String> nullCheckInfos);

	// added for Gauce (2008-04-15)
	/**
	 * added for meta data, processMetaData must be called within extractData of
	 * ResultSetExtractor(Anyframe extended) just delegate to makeMeta.
	 * 
	 * @param rs
	 *            resultset
	 */
	void processMetaData(ResultSet rs) throws SQLException;

	/**
	 * define whether to need to get db column information.
	 * 
	 * @param needColumnInfo
	 *            whether to need to get db column information
	 */
	void setNeedColumnInfo(boolean needColumnInfo);

	/**
	 * transmits whether to need to get db column information.
	 * 
	 * @return whether to need to get db column information
	 */
	boolean isNeedColumnInfo();

	// added for RiaQueryService (2009-06-18)
	/**
	 * set paging information for QueryService Ria.
	 * 
	 * @param pagination
	 */
	void setPagination(Pagination pagination);
}
