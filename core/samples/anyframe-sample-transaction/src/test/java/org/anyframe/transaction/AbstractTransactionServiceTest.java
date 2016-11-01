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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import org.junit.Before;
import org.junit.Test;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

/**
 * This class is a test case class for transaction test.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public abstract class AbstractTransactionServiceTest {

	@Inject
	TransactionTestSampleService service;

	@Inject
	PlatformTransactionManager transactionManager;

	@Inject
	@Named("dataSource")
	protected DataSource dataSource;

	public AbstractTransactionServiceTest() {
		super();
	}

	@Before
	public void onSetUp() throws Exception {
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				// 1. Try to drop the table. It may not
				// exist and throw an
				// exception.
				try {
					statement.executeUpdate("DROP TABLE transactiontest");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
				}

				// 2. Create the table that we will use
				// in this test.
				// Different depending on the db.
				// Please add new statements as
				// new databases are
				// tested.
				statement.executeUpdate("CREATE TABLE transactiontest ( "
						+ "col1 varchar2(50) NOT NULL, "
						+ "col2 varchar2(50) NOT NULL, " + "col3 integer, "
						+ "PRIMARY KEY (col1, col2))");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}

	@Test
	public void testInsertCommit() throws Exception {
		int prevCommitCount = service.getCommitCount();
		Transaction transaction = new Transaction();
		transaction.setCol1(Thread.currentThread().getName() + "-col1");
		transaction.setCol2(Thread.currentThread().getName() + "-col2");
		transaction.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
				.doubleValue()));
		service.insertData(transaction);
		assertEquals(prevCommitCount + 1, service.getCommitCount());
	}

	@Test
	public void testInsertRollback() throws Exception {
		Thread.sleep(500);
		int prevCommitCount = service.getCommitCount();
		int prevRollbackCount = service.getRollbackCount();
		DefaultTransactionDefinition txDefinition = new DefaultTransactionDefinition();
		txDefinition
				.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = transactionManager
				.getTransaction(txDefinition);
		try {
			Transaction transaction = new Transaction();
			transaction.setCol1(Thread.currentThread().getName() + "-col1");
			transaction.setCol2(Thread.currentThread().getName() + "-col2");
			transaction.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
					.doubleValue()));
			service.insertData(transaction);
			service.insertData(transaction);
			transactionManager.commit(txStatus);
		} catch (Exception e) {
			transactionManager.rollback(txStatus);
		} finally {
			assertEquals(prevCommitCount, service.getCommitCount());
			assertEquals(prevRollbackCount + 2, service.getRollbackCount());
		}

	}

	@Test
	public void testUpdateCommit() throws Exception {

		Thread.sleep(500);
		int prevCommitCount = service.getCommitCount();
		Transaction transaction = new Transaction();
		transaction.setCol1(Thread.currentThread().getName() + "-col1");
		transaction.setCol2(Thread.currentThread().getName() + "-col2");
		transaction.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
				.doubleValue()));
		service.insertData(transaction);
		transaction.setCol2(Thread.currentThread().getName() + "-col2-modified");
		service.updateData(transaction);
		assertEquals(prevCommitCount + 2, service.getCommitCount());
	}

	@Test
	public void testUpdateRollback() throws Exception {
		Thread.sleep(500);
		int prevCommitCount = service.getCommitCount();
		int prevRollbackCount = service.getRollbackCount();
		DefaultTransactionDefinition txDefinition = new DefaultTransactionDefinition();
		txDefinition
				.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = transactionManager
				.getTransaction(txDefinition);
		try {
			Transaction transaction = new Transaction();
			transaction.setCol1(Thread.currentThread().getName() + "-col1");
			transaction.setCol2(Thread.currentThread().getName() + "-col2");
			transaction.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
					.doubleValue()));
			service.insertData(transaction);
			transaction.setCol2(Thread.currentThread().getName() + "-col2-modified");
			service.updateData(transaction);
			service.insertData(transaction);
			transactionManager.commit(txStatus);
		} catch (Exception e) {
			transactionManager.rollback(txStatus);
		} finally {
			assertEquals(prevCommitCount, service.getCommitCount());
			assertEquals(prevRollbackCount + 3, service.getRollbackCount());
		}

	}

	@Test
	public void testRemoveCommit() throws Exception {
		Thread.sleep(500);
		int prevCommitCount = service.getCommitCount();
		Transaction transaction = new Transaction();
		transaction.setCol1(Thread.currentThread().getName() + "-col1");
		transaction.setCol2(Thread.currentThread().getName() + "-col2");
		transaction.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
				.doubleValue()));
		service.insertData(transaction);
		service.removeData(transaction);
		assertEquals(prevCommitCount + 2, service.getCommitCount());
	}

	@Test
	public void testRemoveRollback() throws Exception {
		Thread.sleep(500);
		int prevCommitCount = service.getCommitCount();
		int prevRollbackCount = service.getRollbackCount();
		DefaultTransactionDefinition txDefinition = new DefaultTransactionDefinition();
		txDefinition
				.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus txStatus = transactionManager
				.getTransaction(txDefinition);
		try {
			Transaction transaction = new Transaction();
			transaction.setCol1(Thread.currentThread().getName() + "-col1");
			transaction.setCol2(Thread.currentThread().getName() + "-col2");
			transaction.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
					.doubleValue()));
			service.insertData(transaction);
			service.removeData(transaction);
			service.insertData(transaction);
			service.insertData(transaction);
			transactionManager.commit(txStatus);
		} catch (Exception e) {
			transactionManager.rollback(txStatus);
		} finally {
			assertEquals(prevCommitCount, service.getCommitCount());
			assertEquals(prevRollbackCount + 4, service.getRollbackCount());
		}

	}

}
