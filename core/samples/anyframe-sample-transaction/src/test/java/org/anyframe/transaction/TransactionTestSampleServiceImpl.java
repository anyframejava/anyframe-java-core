/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.transaction;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronizationManager;

/**
 * This TransactionTestSampleServiceImpl class is an implementation class for
 * transaction test.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@Service
public class TransactionTestSampleServiceImpl extends JdbcDaoSupport implements
		TransactionTestSampleService {
	TransactionSynchronizationSample transactionSynchronization = new TransactionSynchronizationSample();

	@Inject
	public void setJdbcDaoDataSource(DataSource dataSource) throws Exception {
		super.setDataSource(dataSource);
	}

	public Transaction get(Transaction transaction) throws Exception {
		String sql = "select col1,col2,col3 from transactiontest where col1 = ? and col2 = ? and col3 = ?";
		return this.getJdbcTemplate().queryForObject(
				sql,
				new BeanPropertyRowMapper<Transaction>(Transaction.class) {
					public Transaction mapRow(ResultSet rs, int i)
							throws SQLException {
						return new Transaction(rs.getString(1),
								rs.getString(2),
								new BigDecimal(rs.getString(3)));
					}
				},
				new Object[] { transaction.getCol1(), transaction.getCol2(),
						transaction.getCol3() });
	}

	public void insertData(Transaction transaction) throws Exception {

		TransactionSynchronizationManager
				.registerSynchronization(transactionSynchronization);

		String sql = "INSERT INTO transactiontest (col1, col2, col3) VALUES (?, ?, ?)";

		this.getJdbcTemplate().update(
				sql,
				new Object[] { transaction.getCol1(), transaction.getCol2(),
						transaction.getCol3() });

	}

	public List<Transaction> listData(Transaction transaction) throws Exception {
		String sql = "select col1,col2,col3 from transactiontest";
		return getJdbcTemplate().query(sql,
				new BeanPropertyRowMapper<Transaction>(Transaction.class));
	}

	public void removeData(Transaction transaction) throws Exception {
		TransactionSynchronizationManager
				.registerSynchronization(transactionSynchronization);
		String sql = "delete transactiontest where col1 = ?";
		this.getJdbcTemplate().update(sql,
				new Object[] { transaction.getCol1() });
	}

	public void updateData(Transaction transaction) throws Exception {
		TransactionSynchronizationManager
				.registerSynchronization(transactionSynchronization);
		String sql = "update transactiontest set col2= ? , col3 = ? where col1 = ?";
		this.getJdbcTemplate().update(
				sql,
				new Object[] { transaction.getCol2(), transaction.getCol3(),
						transaction.getCol1() });
	}

	public int getCommitCount() {
		return transactionSynchronization.getCommitCount();
	}

	public int getRollbackCount() {
		return transactionSynchronization.getRollbackCount();
	}

}
