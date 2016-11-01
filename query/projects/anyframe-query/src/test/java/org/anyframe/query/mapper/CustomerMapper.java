package org.anyframe.query.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.anyframe.query.ResultSetMapper;
import org.anyframe.query.vo.Customer;


public class CustomerMapper implements ResultSetMapper {

    public Object mapRow(ResultSet resultSet) throws SQLException {
        Customer customer = new Customer();
        customer.setNm(resultSet.getString("name"));
        customer.setAddr(resultSet.getString("address"));
        return customer;
    }
}
