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
package org.anyframe.mip.query.service;

import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * This interface is a common biz. service in developing the presentation layer
 * using MiPlatform which is the X-Internet solution of the TOBE Software
 * company.
 * 
 * @author Jonghoon, Kim
 * 
 */
public interface MiPService {

	/**
	 * This is the method for inquiring using VariableList and Dataset.
	 * 
	 * @param inVl
	 *            VariableList including the query id or query condition etc.
	 * @param inDl
	 *            The Dataset list including query conditions
	 * @param outVl
	 *            Output VaiableList including return values.
	 * @param outDl
	 *            Output DatasetList including return values.
	 * @throws Exception
	 *             if there is any problem getting the DataSet
	 */
	void get(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception;

	/**
	 * This is a method for querying at developing the screen using RIA
	 * 
	 * @param inVl
	 *            VariableList including the query id or query condition etc.
	 * @param inDl
	 *            The Dataset list including query conditions
	 * @param outVl
	 *            Output VaiableList including return values.
	 * @param outDl
	 *            Output DatasetList including return values.
	 * @throws Exception
	 *             if there is any problem getting the DataSet list
	 */
	void getList(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception;

	/**
	 * This is a method for querying using the Dataset for paging.
	 * 
	 * @param inVl
	 *            VariableList including the query id or query condition etc.
	 * @param inDl
	 *            The Dataset list including query conditions
	 * @param outVl
	 *            Output VaiableList including return values.
	 * @param outDl
	 *            Output DatasetList including return values.
	 * @throws Exception
	 *             if there is any problem getting the DataSet list
	 */
	void getPagingList(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception;

	/**
	 * This is a method for querying using the Dataset for insert.
	 * 
	 * @param inVl
	 *            VariableList including the query id or query condition etc.
	 * @param inDl
	 *            The Dataset list including query conditions
	 * @param outVl
	 *            Output VaiableList including return values.
	 * @param outDl
	 *            Output DatasetList including return values.
	 * @throws Exception
	 *             if there is any problem inserting the data using DataSet
	 */
	void create(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception;

	/**
	 * This is the method for updating using VariableList and Dataset.
	 * 
	 * @param inVl
	 *            VariableList including the query id or query condition etc.
	 * @param inDl
	 *            The Dataset list including query conditions
	 * @param outVl
	 *            Output VaiableList including return values.
	 * @param outDl
	 *            Output DatasetList including return values.
	 * @throws Exception
	 *             if there is any problem updating the data using DataSet
	 */
	void update(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception;

	/**
	 * This is the method for deleting using VariableList and Dataset.
	 * 
	 * @param inVl
	 *            VariableList including the query id or query condition etc.
	 * @param inDl
	 *            The Dataset list including query conditions
	 * @param outVl
	 *            Output VaiableList including return values.
	 * @param outDl
	 *            Output DatasetList including return values.
	 * @throws Exception
	 *             if there is any problem deleting the data using DataSet
	 */
	void remove(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception;

	/**
	 * This is the method for inserting, updating and deleting using
	 * VariableList and Dataset.
	 * 
	 * @param inVl
	 *            VariableList including the query id or query condition etc.
	 * @param inDl
	 *            The Dataset list including query conditions
	 * @param outVl
	 *            Output VaiableList including return values.
	 * @param outDl
	 *            Output DatasetList including return values.
	 * @throws Exception
	 *             if there is any problem inserting, updating and deleting the
	 *             data using DataSet
	 */
	void saveAll(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception;

	/**
	 * This is the method for executing function, procedure, or package using
	 * VariableList and Dataset.
	 * 
	 * @param inVl
	 *            VariableList including the query id or query condition etc.
	 * @param inDl
	 *            The Dataset list including query conditions
	 * @param outVl
	 *            Output VaiableList including return values.
	 * @param outDl
	 *            Output DatasetList including return values.
	 * @throws Exception
	 *             if there is any problem executing the procedure
	 */
	void execute(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception;

}
