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
package org.anyframe.query.impl.jdbc.generator;

import org.anyframe.query.impl.jdbc.generator.PagingSQLGenerator;

/**
 * Default implements of PagingSQLGenerator <br/>
 * [Notice] : In case of calling findXXX() method with setting a
 * DefaultPagingSQLGenerator, it has a severe impact on performance about
 * inquiring much data. So, we recommend that you don't use this class as
 * SQLGenerator
 * 
 * @author aromy
 * 
 */
public class DefaultPagingSQLGenerator implements PagingSQLGenerator {

    public Object[] setQueryArgs(Object[] originalArgs, int pageIndex,
            int pageSize){
    	return new Object[]{};
    }
    
    public int[] setQueryArgTypes(int[] originalArgTypes){
    	return new int[]{};
    }

	public String getCountSQL(String originalSql) {
		// TODO Auto-generated method stub
		return "";
	}

	public String getPaginationSQL(String originalSql, Object[] originalArgs,
			int[] originalArgTypes, int first, int pageSize) throws Exception {
		// TODO Auto-generated method stub
		return "";
	}

}
