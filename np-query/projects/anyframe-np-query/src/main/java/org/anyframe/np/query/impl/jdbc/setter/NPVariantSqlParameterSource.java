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
package org.anyframe.np.query.impl.jdbc.setter;

import org.anyframe.query.impl.jdbc.setter.DefaultDynamicSqlParameterSource;

import com.nexacro.xapi.data.VariableList;

/**
 * This class provides the method to get the values in the Variants.
 * 
 * @author Soyon Lim
 * @author JongHoon Kim
 */
public class NPVariantSqlParameterSource extends
		DefaultDynamicSqlParameterSource { 

	private final VariableList variant;

	public NPVariantSqlParameterSource(VariableList variant) {
		this.variant = variant;
	}

	public Object getValue(String arg0) {
		return variant.getObject(arg0);
	}

	public boolean hasValue(String arg0) {
		return (variant.getObject(arg0) != null);
	}

	public String getTypeName(String arg0) {
		// TODO Auto-generated method stub
		return arg0;
	}

	public VariableList getVariableList() {
		return this.variant;
	}

}
