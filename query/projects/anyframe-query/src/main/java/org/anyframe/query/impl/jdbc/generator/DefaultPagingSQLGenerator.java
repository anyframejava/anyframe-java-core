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
