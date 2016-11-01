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
package org.anyframe.flex.query.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.flex.query.domain.FlexDataGrid;
import org.anyframe.flex.query.service.FlexSearchVO;
import org.anyframe.pagination.Page;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.beans.factory.annotation.Value;


/**
 * 
 * @author Jonghoon, Kim
 * 
 */
public class FlexDao extends AbstractDao{
	
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

    private String tableName;
    
	public int create(FlexDataGrid flexBaseObject) throws Exception {
		tableName = flexBaseObject.getClass().getSimpleName();
		return create(tableName, flexBaseObject);
	}

	public List getList(FlexSearchVO searchVO) throws Exception {
        
        return (List) this.findList(searchVO.getTableName(), searchVO);
	}

	public Page getPagingList(FlexSearchVO searchVO) throws Exception {
		int pageIndex = searchVO.getPageIndex();

		return this.findListWithPaging(searchVO.getTableName(), searchVO,
				pageIndex, pageSize, pageUnit);
	}

	public int remove(FlexDataGrid flexBaseObject) throws Exception {
		tableName = flexBaseObject.getClass().getSimpleName();
		return remove(tableName, flexBaseObject);
	}

	public Map saveAll(ArrayList arrayList) throws Exception {
		Map<String, Integer> resultCount = new HashMap<String, Integer>();
		
		int createRowCount = 0;
		int updateRowCount = 0;
		int removeRowCount = 0;
		
		for ( int i = 0 ; i < arrayList.size() ; i ++ ){
			FlexDataGrid flexVO = (FlexDataGrid) arrayList.get(i);
			int status = flexVO.getStatus();
			
			switch(status){
				case FlexDataGrid.INSERT_ROW : createRowCount = createRowCount + this.create(flexVO); break;
				case FlexDataGrid.UPDATE_ROW : updateRowCount = updateRowCount + this.update(flexVO); break;
				case FlexDataGrid.DELETE_ROW : removeRowCount = removeRowCount + this.remove(flexVO); break;
			}
		}
		resultCount.put("INSERT", createRowCount );
		resultCount.put("UPDATE", updateRowCount );
		resultCount.put("DELETE", removeRowCount );
		return resultCount;
	}

	public int update(FlexDataGrid flexBaseObject) throws Exception {
		tableName = flexBaseObject.getClass().getSimpleName();
		return update(tableName, flexBaseObject);
	}
}
