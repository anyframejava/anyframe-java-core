/*
 * Copyright 2002-2009 the original author or authors.
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
package org.anyframe.mip.query.dao;

import java.util.Map;

import org.anyframe.mip.query.MiPActionCommand;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;
/**
 * This interface help to use anyframe.core.query.ria.MiPQueryService more easy. 
 * this interface is including method to select, insert, update, delete, and save 
 * to database using Dataset or VariableList
 * @author Jonghoon, Kim
 *
 */
public interface MiPDao{
	
	public final short TYPE_NORMAL = 1;
	public final short TYPE_INSERT = 2;
	public final short TYPE_UPDATE = 4;
	public final short TYPE_DELETE = 8;
	
	/**
     * This is the method for selecting using primary key(String).
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param primaryKey
     * 		privary key value
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */   
	Dataset get(String queryId, String primaryKey) throws Exception;
	
	/**
     * This is the method for selecting using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains key word to search.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	Dataset get(String queryId, VariableList inVl) throws Exception;

	/**
     * This is the method for selecting using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains key word to search.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	Dataset getList(String queryId, Dataset inDs) throws Exception;

	/**
     * This is the method for selecting using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains key word to search.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	Dataset getList(String queryId, VariableList inVl) throws Exception;
	
	/**
     * This is the method for selecting using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains key word to search and pageIndex, pageUnit.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	Dataset getPagingList(String queryId, Dataset inDs) throws Exception;

	/**
     * This is the method for inserting using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains record to insert.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	int create(String queryId, VariableList inVl)throws Exception;
	
	/**
     * This is the method for inserting using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to insert.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	int create(String queryId, Dataset inDs)throws Exception;
	
	/**
     * This is the method for inserting using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to insert.
     * @param actionCommand
     * 		IMiPActionCommand contains biz. logic pre or post insert. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	int create(String queryId, Dataset inDs, MiPActionCommand actionCommand)throws Exception;
	
	/**
     * This is the method for updating using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains record to update.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	int update(String queryId, VariableList inVl)throws Exception;
	
	/**
     * This is the method for updating using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to update.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	int update(String queryId, Dataset inDs)throws Exception;
	
	/**
     * This is the method for updating using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to update.
     * @param actionCommand
     * 		IMiPActionCommand contains biz. logic pre or post update. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	int update(String queryId, Dataset inDs, MiPActionCommand actionCommand)throws Exception;
	
	/**
     * This is the method for removing using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains record to remove.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	int remove(String queryId, VariableList inVl)throws Exception;
	
	/**
     * This is the method for removing using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to remove.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	int remove(String queryId, Dataset inDs)throws Exception;
	
	/**
     * This is the method for removing using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to remove.
     * @param actionCommand
     * 		IMiPActionCommand contains biz. logic pre or post remove. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	int remove(String queryId, Dataset inDs, MiPActionCommand actionCommand )throws Exception;
	
	/**
	 * This is the method for save(insert, update, delete) using Dataset.
	 * @param queryMap
	 * 		Three query ids for insert, update, and delete in query mapping file. 
	 * @param inDs
	 * 		Dataset contains records to insert, update, delete.
	 * @return
	 * @throws Exception
	 */
	int saveAll(Map queryMap, Dataset inDs) throws Exception;
	
	/**
	 * This is the method for save(insert, update, delete) using Dataset.
	 * @param queryMap
	 * 			Three query ids for insert, update, and delete in query mapping file. 
	 * @param inDs
	 * 			Dataset contains records to insert, update, delete.
	 * @param actionCommand
	 * 			IMiPActionCommand contains biz. logic pre or post insert, update, delete. 
	 * @return
	 * @throws Exception
	 */
	int saveAll(Map queryMap, Dataset inDs, MiPActionCommand actionCommand ) throws Exception;
	
	/**
	 * This is the method for callablestatement using Dataset.
	 * @param queryMap
	 * 			Three query ids for insert, update, and delete in query mapping file. 
	 * @param inDs
	 * 			Dataset contains records to insert, update, delete.
	 * @param actionCommand
	 * 			IMiPActionCommand contains biz. logic pre or post insert, update, delete. 
	 * @return
	 * @throws Exception
	 */
	DatasetList execute(String queryId, Dataset inDs) throws Exception;
}
