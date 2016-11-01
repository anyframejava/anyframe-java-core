/*
 * Copyright 2002-2008 the original author or authors.
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
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.test.AbstractDependencyInjectionSpringContextTests;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import anyframe.core.query.IQueryService;
import anyframe.core.query.QueryServiceException;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public abstract class AbstractTransactionServiceTest extends
        AbstractDependencyInjectionSpringContextTests {

    TransactionTestSampleService service = null;

    PlatformTransactionManager transactionManager = null;

    IQueryService queryService = null;

    DataSource txDataSource = null;

    public AbstractTransactionServiceTest() {
        super();
    }

    public void onSetUp() throws Exception {
        super.onSetUp();
        DataSource dataSource =
            (DataSource) applicationContext.getBean("dataSource");
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

    public void onTearDown() {
        setDirty();
    }

    public void testInsertCommit() throws Exception {
        int prevCommitCount = service.getCommitCount();
        TransactionVo vo = new TransactionVo();
        vo.setCol1(Thread.currentThread().getName() + "-col1");
        vo.setCol2(Thread.currentThread().getName() + "-col2");
        vo.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
            .doubleValue()));
        service.insertData(vo);
        assertEquals(prevCommitCount + 1, service.getCommitCount());
    }

    public void testInsertRollback() throws Exception {
        Thread.sleep(500);
        int prevCommitCount = service.getCommitCount();
        int prevRollbackCount = service.getRollbackCount();
        DefaultTransactionDefinition txDefinition =
            new DefaultTransactionDefinition();
        txDefinition
            .setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus txStatus =
            transactionManager.getTransaction(txDefinition);
        try {
            TransactionVo vo = new TransactionVo();
            vo.setCol1(Thread.currentThread().getName() + "-col1");
            vo.setCol2(Thread.currentThread().getName() + "-col2");
            vo.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
                .doubleValue()));
            service.insertData(vo);
            service.insertData(vo);
            transactionManager.commit(txStatus);
        } catch (QueryServiceException e) {
            transactionManager.rollback(txStatus);
        } finally {
            assertEquals(prevCommitCount, service.getCommitCount());
            assertEquals(prevRollbackCount + 2, service.getRollbackCount());
        }

    }

    public void testUpdateCommit() throws Exception {

        Thread.sleep(500);
        int prevCommitCount = service.getCommitCount();
        TransactionVo vo = new TransactionVo();
        vo.setCol1(Thread.currentThread().getName() + "-col1");
        vo.setCol2(Thread.currentThread().getName() + "-col2");
        vo.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
            .doubleValue()));
        service.insertData(vo);
        vo.setCol2(Thread.currentThread().getName() + "-col2-modified");
        service.updateData(vo);
        assertEquals(prevCommitCount + 2, service.getCommitCount());
    }

    public void testUpdateRollback() throws Exception {
        Thread.sleep(500);
        int prevCommitCount = service.getCommitCount();
        int prevRollbackCount = service.getRollbackCount();
        DefaultTransactionDefinition txDefinition =
            new DefaultTransactionDefinition();
        txDefinition
            .setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus txStatus =
            transactionManager.getTransaction(txDefinition);
        try {
            TransactionVo vo = new TransactionVo();
            vo.setCol1(Thread.currentThread().getName() + "-col1");
            vo.setCol2(Thread.currentThread().getName() + "-col2");
            vo.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
                .doubleValue()));
            service.insertData(vo);
            vo.setCol2(Thread.currentThread().getName() + "-col2-modified");
            service.updateData(vo);
            service.insertData(vo);
            transactionManager.commit(txStatus);
        } catch (QueryServiceException e) {
            transactionManager.rollback(txStatus);
        } finally {
            assertEquals(prevCommitCount, service.getCommitCount());
            assertEquals(prevRollbackCount + 3, service.getRollbackCount());
        }

    }

    public void testRemoveCommit() throws Exception {
        Thread.sleep(500);
        int prevCommitCount = service.getCommitCount();
        TransactionVo vo = new TransactionVo();
        vo.setCol1(Thread.currentThread().getName() + "-col1");
        vo.setCol2(Thread.currentThread().getName() + "-col2");
        vo.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
            .doubleValue()));
        service.insertData(vo);
        service.removeData(vo);
        assertEquals(prevCommitCount + 2, service.getCommitCount());
    }

    public void testRemoveRollback() throws Exception {
        Thread.sleep(500);
        int prevCommitCount = service.getCommitCount();
        int prevRollbackCount = service.getRollbackCount();
        DefaultTransactionDefinition txDefinition =
            new DefaultTransactionDefinition();
        txDefinition
            .setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus txStatus =
            transactionManager.getTransaction(txDefinition);
        try {
            TransactionVo vo = new TransactionVo();
            vo.setCol1(Thread.currentThread().getName() + "-col1");
            vo.setCol2(Thread.currentThread().getName() + "-col2");
            vo.setCol3(new BigDecimal(new Long(System.currentTimeMillis())
                .doubleValue()));
            service.insertData(vo);
            service.removeData(vo);
            service.insertData(vo);
            service.insertData(vo);
            transactionManager.commit(txStatus);
        } catch (QueryServiceException e) {
            transactionManager.rollback(txStatus);
        } finally {
            assertEquals(prevCommitCount, service.getCommitCount());
            assertEquals(prevRollbackCount + 4, service.getRollbackCount());
        }

    }

    public void setTransactionSample(TransactionTestSampleService service) {
        this.service = service;
    }

    public void setQueryService(IQueryService queryService) {
        this.queryService = queryService;
    }

    public void setTransactionManager(
            PlatformTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

}
