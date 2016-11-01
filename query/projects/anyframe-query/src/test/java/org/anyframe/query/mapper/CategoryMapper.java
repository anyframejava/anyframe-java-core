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
