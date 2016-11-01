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
package org.anyframe.flex.query.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.anyframe.flex.query.domain.FlexDataGrid;
import org.anyframe.pagination.Page;


/**
 * This interface is a common biz. service in developing the
 * presentation layer using Flex which is the RIA solution of Adobe.
 * @author Jonghoon, Kim
 *
 */
public interface FlexService {
	 
	/**
     * This is a method for querying using the FlexSearchVO for paging
     * @param searchVO
	 * 		The value object including table name, page index, page unit, and search condition, search keyword.
	 * @return	result page object with total count  
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */   
	Page getPagingList(FlexSearchVO searchVO) throws Exception;
	
	/**
     * This is a method for querying using the FlexSearchVO for list
     * @param searchVO
	 * 		The value object including table name, search condition and search keyword.
	 * @return	result list object with total count  
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */    
	List getList(FlexSearchVO searchVO) throws Exception;
	
	/**
     * This is a method for querying using the FlexBaseObject for create
     * @param flexBaseObject
	 * 		FlexBaseObject including row status.
	 * @return	row count of success insert. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */    
	int create(FlexDataGrid flexBaseObject) throws Exception;
	
	/**
     * This is a method for querying using the FlexBaseObject for update
     * @param flexBaseObject
	 * 		FlexBaseObject including row status.
	 * @return	row count of success update. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	int update(FlexDataGrid flexBaseObject) throws Exception;
	
	/**
     * This is a method for querying using the FlexBaseObject for remove
     * @param flexBaseObject
	 * 		FlexBaseObject including row status.
	 * @return row count of success remove. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	int remove(FlexDataGrid flexBaseObject) throws Exception;
	
	/**
     * This is a method for querying using the FlexBaseObject for insert, update, remove
     * @param flexBaseObject
	 * 		FlexBaseObject including row status.
	 * @return Map row count of success query. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */ 
	Map saveAll(ArrayList arrayList) throws Exception;
	
}
