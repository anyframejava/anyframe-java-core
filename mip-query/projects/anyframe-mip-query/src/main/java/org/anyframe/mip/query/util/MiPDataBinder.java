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
package org.anyframe.mip.query.util;

import org.springframework.beans.MutablePropertyValues;
import org.springframework.validation.DataBinder;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.VariableList;

/**
 * The class expanding the org.springframework.validation.DataBinder
 * <P>
 * As data changing util class, when using the Tobesoft's MiPlatform's to
 * develop the UI, it includes the method for changing the value of VariableList
 * and Dataset used as data transmitting object.
 * <p>
 * 
 * @author Jonghoon Kim
 */
public class MiPDataBinder extends DataBinder {

	/**
	 * convertToCamelCase's default value is false.
	 */
	private boolean convertToCamelCase = false;

	/**
	 * MiPDataBinder's constructor.
	 * 
	 * @param target
	 *            Value Object
	 */
	public MiPDataBinder(Object target) {
		this(target, false);
	}

	/**
	 * MiPDataBinder's constructor.
	 * 
	 * @param target
	 *            Value Object
	 * @param convertToCamelCase
	 *            When changing to CamelCase the attribute name, then true
	 */
	public MiPDataBinder(Object target, boolean convertToCamelCase) {
		super(target);
		this.convertToCamelCase = convertToCamelCase;
	}

	/**
	 * Maps to VariableList the VO's value set by using the MiPDataBinder
	 * constructor.
	 * 
	 * @param variableList
	 *            VariableList
	 */
	public void bind(VariableList variableList) {
		MutablePropertyValues mpvs = new VariableListPropertyValue(
				variableList, convertToCamelCase);
		doBind(mpvs);
	}

	/**
	 * Maps to Dataset the VO's value set using the MiPDataBinder constructor
	 * 
	 * @param dataList
	 *            MiPlatform Dataset
	 * @param rowNum
	 *            the row number of record
	 */
	public void bind(Dataset dataList, int rowNum) {
		MutablePropertyValues mpvs = new VariableListPropertyValue(dataList,
				rowNum, convertToCamelCase);
		doBind(mpvs);
	}

	/**
	 * Maps to the Dataset the VO's value set using the MiPDataBinder
	 * constructor If delete record, the isDeleted is true.
	 * 
	 * @param dataList
	 *            MiPlatform Dataset
	 * @param rowNum
	 *            record's row number
	 * @param isDeleted
	 *            when delete record, then true
	 */
	public void bind(Dataset dataList, int rowNum, boolean isDeleted) {
		MutablePropertyValues mpvs = new VariableListPropertyValue(dataList,
				rowNum, isDeleted, convertToCamelCase);
		doBind(mpvs);
	}
}
