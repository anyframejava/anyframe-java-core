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
package org.anyframe.query.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.anyframe.query.ResultSetMapper;
import org.anyframe.query.vo.CategoryVO;


public class CategoryMapper implements ResultSetMapper {

    public Object mapRow(ResultSet resultSet) throws SQLException {
        CategoryVO categoryVO = new CategoryVO();
        
        categoryVO.setCategoryNo(resultSet.getString("category_no"));
        categoryVO.setCategoryName(resultSet.getString("category_name"));
        categoryVO.setCategoryDesc(resultSet.getString("category_desc"));
        categoryVO.setRegId(resultSet.getString("reg_id"));
        categoryVO.setModifyId(resultSet.getString("modify_id"));
        return categoryVO;
    }
}
