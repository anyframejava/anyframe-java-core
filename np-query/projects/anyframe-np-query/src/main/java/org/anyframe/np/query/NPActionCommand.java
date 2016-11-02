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
package org.anyframe.np.query;

import com.nexacro.xapi.data.DataSet; 

/**
 * This is an interface class for adding the business logic before/after
 * manipulating the database at NPQueryService use. Recommand to use
 * NPQueryService for manipulating the database in developing the presentation
 * layer using the NPlatform which is a X-internet solution of the TOBE
 * Software company. When we change the DataSet's value which is NEXACRO's
 * data format, we add the needed logic for implementation class of
 * NPActionCommand's class.
 * @author Soyon Lim
 * @author JongHoon Kim
 */
public interface NPActionCommand {
	/**
	 * Before insert, the method for changing the value of DataSet
	 * @param dataSet The DataSet for inserting into the database
	 * @param currentRow The row number of DataSet to change
	 */
	void preInsert(DataSet dataSet, int currentRow);

	/**
	 * After insert, the method for changing the value of DataSet
	 * @param dataSet The DataSet for inserting into the database
	 * @param currentRow The row number of DataSet to change
	 */
	void postInsert(DataSet dataSet, int currentRow);

	/**
	 * the method for changing the value of DataSet before update
	 * @param dataSet DataSet for updating into database
	 * @param currentRow The row number of DataSet to change
	 */
	void preUpdate(DataSet dataSet, int currentRow);

	/**
	 * The method for changing the DataSet's value after update
	 * @param dataSet The DataSet for to update in the database
	 * @param currentRow The row number of DataSet to change
	 */
	void postUpdate(DataSet dataSet, int currentRow);

	/**
	 * the method to change the DataSet's value before delete
	 * @param dataSet The DataSet to delete in the database
	 * @param currentRow The row number of DataSet to change
	 */
	void preDelete(DataSet dataSet, int currentRow);

	/**
	 * the method to change the DataSet's value after delete
	 * @param dataSet The DataSet to delete in the database
	 * @param currentRow The row number of DataSet to change
	 */
	void postDelete(DataSet dataSet, int currentRow);
}
