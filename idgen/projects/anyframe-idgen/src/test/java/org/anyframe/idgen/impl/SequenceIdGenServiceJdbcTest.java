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
package org.anyframe.idgen.impl;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.anyframe.idgen.IdGenService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

import org.anyframe.exception.BaseException;

/**
 * For testing functions what SequenceIDGeneration
 * Service supports, there are some test scenarios in
 * this TestCase.
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class SequenceIdGenServiceJdbcTest extends
        AbstractDependencyInjectionSpringContextTests {

    /**
     * overrided
     * @return String[]
     */
    protected String[] getConfigLocations() {
        return new String[] {"classpath*:/spring/context-*.xml" };
    }

    /**
     * initialize TestCase
     * @throws Exception
     *         fail to initialize
     */
    public void onSetUp() throws Exception {
        super.onSetUp();
        DataSource dataSource =
            (DataSource) applicationContext.getBean("util_datasource");
        try {
            Connection conn = dataSource.getConnection();
            try {
                Statement statement = conn.createStatement();

                // 1. Try to drop the table. It may not
                // exist and throw an
                // exception.
                try {
                    statement.executeUpdate("DROP SEQUENCE idstest");
                } catch (SQLException e) {
                    // The table was probably just not
                    // there. Ignore this.
                    // e.printStackTrace();
                }

                // 2. Create the table that we will use
                // in this test.
                // Different depending on the db.
                // Please add new statements as
                // new databases are
                // tested.
                statement.executeUpdate("CREATE SEQUENCE idstest MINVALUE 0");
            } finally {
                conn.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.err.println("Unable to initialize database for test." + e);
            fail("Unable to initialize database for test. " + e);
        }
    }

    /**
     * destroy TestCase
     * @throws Exception
     *         fail to destroy TestCase
     */
    public void onTearDown() throws Exception {
        DataSource dataSource =
            (DataSource) applicationContext.getBean("util_datasource");
        try {
            Connection conn = dataSource.getConnection();
            try {
                Statement statement = conn.createStatement();

                // 1. Delete the table that we will use
                // in this test.
                statement.executeUpdate("DROP SEQUENCE idstest");
            } finally {
                conn.close();
            }
        } catch (SQLException e) {
            System.out.println("Unable to cleanup database after test." + e);
            // Want to continue
        }

        super.onTearDown();
    }

    /**
     * [Flow #-1] Negative Case : try to get next
     * integer id with non existing sequence name.
     * @throws Exception
     *         fail to test
     */
    public void testNonExistingSequenceName() throws Exception {
        IdGenService idGenerator =
            (IdGenService) applicationContext
                .getBean("Ids-TestSequenceNonExistingSequenceName");
        try {
            // 1. get next integer id
            idGenerator.getNextIntegerId();
            fail("Should not have gotten an id");
        } catch (Exception e) {
            assertTrue(e instanceof BaseException);
        }
    }

    /**
     * [Flow #-2] Negative Case : try to get next Long
     * id
     * @throws Exception
     *         fail to test
     */
    public void testSimpleRequestIdsSize1() throws Exception {
        System.out.println("testSequenceSimpleRequestIdsSize1");
        IdGenService idGenerator =
            (IdGenService) applicationContext
                .getBean("Ids-TestSequenceSimpleRequestIdsSize1");
        int testCount = 100;

        // 1. Initialize the counter in the database.
        initializeNextLongId("idstest", 1);

        // 2. get next integer id until 99
        for (int i = 1; i <= testCount; i++) {
            int id = idGenerator.getNextIntegerId();
            assertEquals("The returned id was not what was expected.", i, id);
        }

        // 3. get next Long id using query directly.
        assertEquals(
            "The next_id column in the database did not have the expected value.",
            testCount + 1, peekNextLongId("idstest"));
    }

    /**
     * [Flow #-3] Positive, Negative Case : try to get
     * next byte id
     * @throws Exception
     *         fail to test
     */
//    public void testSequenceMaxByteIds() throws Exception {
//        IdGenService idGenerator =
//            (IdGenService) applicationContext
//                .getBean("Ids-TestSequenceMaxByteIds");
//        int testCount = 100;
//        // max = 127
//        long max = Byte.MAX_VALUE;
//        long initial = max - testCount;
//
//        // 1. initialize the counter in the database.
//        initializeNextLongId("idstest", initial);
//
//        // 2. get next byte id until limitation of Byte
//        for (int i = 0; i <= testCount; i++) {
//            byte id = idGenerator.getNextByteId();
//            assertEquals("The returned id was not what was expected.", i
//                + initial, id);
//        }
//
//        // 3. in case it reached a max value data type
//        // allows, get next byte id.
//        try {
//            byte id = idGenerator.getNextByteId();
//            fail("Should not have gotten an id: " + id);
//        } catch (Exception e) {
//            assertTrue(e instanceof BaseException);
//        }
//    }

    /**
     * [Flow #-4] Positive, Negative Case : try to get
     * next short id
     * @throws Exception
     *         fail to test
     */
//    public void testMaxShortIds() throws Exception {
//        IdGenService idGenerator =
//            (IdGenService) applicationContext
//                .getBean("Ids-TestSequenceMaxByteIds");
//        int testCount = 100;
//        // max is 32767
//        long max = Short.MAX_VALUE;
//        long initial = max - testCount;
//
//        // 1. Initialize the counter in the database.
//        initializeNextLongId("idstest", initial);
//
//        // 2. get next short id until limitation of
//        // Short
//        for (int i = 0; i <= testCount; i++) {
//            short id = idGenerator.getNextShortId();
//            assertEquals("The returned id was not what was expected.", i
//                + initial, id);
//        }
//
//        // 3. in case it reached a max value data type
//        // allows, get next short
//        // id.
//        try {
//            short id = idGenerator.getNextShortId();
//            fail("Should not have gotten an id: " + id);
//        } catch (Exception e) {
//            assertTrue(e instanceof BaseException);
//        }
//    }

    /**
     * [Flow #-5] Positive, Negative Case : try to get
     * next integer id
     * @throws Exception
     *         fail to test
     */
//    public void testMaxIntegerIds() throws Exception {
//        IdGenService idGenerator =
//            (IdGenService) applicationContext
//                .getBean("Ids-TestSequenceMaxByteIds");
//        int testCount = 100;
//        // max is 0x7fffffff
//        long max = Integer.MAX_VALUE;
//        long initial = max - testCount;
//
//        // 1. Initialize the counter in the database.
//        initializeNextLongId("idstest", initial);
//
//        // 2. get next integer id until limitation of
//        // Integer
//        for (int i = 0; i <= testCount; i++) {
//            int id = idGenerator.getNextIntegerId();
//            assertEquals("The returned id was not what was expected.", i
//                + initial, id);
//        }
//
//        // 3. in case it reached a max value data type
//        // allows, get next
//        // integer id.
//        try {
//            int id = idGenerator.getNextIntegerId();
//            fail("Should not have gotten an id: " + id);
//        } catch (Exception e) {
//            assertTrue(e instanceof BaseException);
//        }
//    }

    /**
     * [Flow #-6] Positive, Negative Case : try to get
     * next long id
     * @throws Exception
     *         fail to test
     */
//    public void testMaxLongIds() throws Exception {
//        IdGenService idGenerator =
//            (IdGenService) applicationContext
//                .getBean("Ids-TestSequenceMaxByteIds");
//        int testCount = 100;
//        // max is 0x7fffffffffffffffL
//        long max = Long.MAX_VALUE;
//        long initial = max - testCount;
//
//        // 1. Initialize the counter in the database.
//        initializeNextLongId("idstest", initial);
//
//        // 2. get next long id until limitation of Long
//        for (int i = 0; i <= testCount; i++) {
//            long id = idGenerator.getNextLongId();
//            assertEquals("The returned id was not what was expected.", i
//                + initial, id);
//        }
//
//        // 3. in case it reached a max value data type
//        // allows, get next
//        // long id.
//        try {
//            long id = idGenerator.getNextLongId();
//            fail("Should not have gotten an id: " + id);
//        } catch (BaseException e) {
//            assertTrue(e instanceof BaseException);
//        }
//    }

    /**
     * [Flow #-7] Positive, Negative Case : try to get
     * next bigdecimal id
     * @throws Exception
     *         fail to test
     */
//    public void testBigDecimalIds() throws Exception {
//        IdGenService idGenerator =
//            (IdGenService) applicationContext
//                .getBean("Ids-TestSequenceMaxBigDecimalIds");
//        int testCount = 100;
//        // max is 0x7fffffffffffffffL
//        BigDecimal max = new BigDecimal(new Long(Long.MAX_VALUE).doubleValue());
//        BigDecimal initial =
//            max.subtract(new BigDecimal(new Integer(testCount).doubleValue()));
//
//        // 1. Initialize the counter in the database.
//        initializeNextBigDecimalId("idstest", initial);
//
//        // 2. get next bigdecimal id
//        for (int i = 0; i <= testCount; i++) {
//            BigDecimal id = idGenerator.getNextBigDecimalId();
//
//            // Seems like SEQUENCE statement can't
//            // handle BigDecimals!
//            assertEquals("The returned id was not what was expected.", initial
//                .add(new BigDecimal(new Integer(i).doubleValue())), id);
//        }
//
//        // 3. get next integer id using query directly.
//        assertEquals(
//            "The next_id column in the database did not have the expected value.",
//            initial
//                .add(new BigDecimal(new Integer(testCount + 1).doubleValue())),
//            peekNextBigDecimalId("idstest"));
//    }

    /*---------------------------------------------------------------
     * Utilitity Methods
     *-------------------------------------------------------------*/
    /**
     * initialze min value of sequence
     * @param sequenceName
     *        sequence name
     * @param nextId
     *        next id
     */
    private void initializeNextLongId(String sequenceName, long nextId) {
        DataSource dataSource =
            (DataSource) applicationContext.getBean("util_datasource");
        try {
            Connection conn = dataSource.getConnection();
            try {
                Statement statement = conn.createStatement();

                try {
                    statement.executeUpdate("DROP SEQUENCE " + sequenceName);
                } catch (SQLException se) {
                }

                statement.executeUpdate("CREATE SEQUENCE " + sequenceName
                    + " MINVALUE " + nextId);

            } finally {
                conn.close();
            }
        } catch (Exception e) {
            System.err.println("Unable to initialize next_id." + e);
            fail("Unable to initialize next_id. " + e);
        }
    }

    /**
     * initialze next BigDecimal Id
     * @param sequenceName
     *        sequence name
     * @param nextId
     *        next id
     */
    private void initializeNextBigDecimalId(String sequenceName,
            BigDecimal nextId) {
        DataSource dataSource =
            (DataSource) applicationContext.getBean("util_datasource");
        try {
            Connection conn = dataSource.getConnection();
            try {
                Statement statement = conn.createStatement();

                try {
                    statement.executeUpdate("DROP SEQUENCE " + sequenceName);
                } catch (SQLException se) {
                }

                statement.executeUpdate("CREATE SEQUENCE " + sequenceName
                    + " MINVALUE " + nextId);

            } finally {
                conn.close();
            }
        } catch (Exception e) {
            System.err.println("Unable to initialize next_id." + e);
            fail("Unable to initialize next_id. " + e);
        }
    }

    /**
     * get next Long id using query directly.
     * @param sequenceName
     *        sequence name
     * @return next Long Id
     */
    private long peekNextLongId(String sequenceName) {
        DataSource dataSource =
            (DataSource) applicationContext.getBean("util_datasource");
        try {
            Connection conn = dataSource.getConnection();
            try {
                Statement statement = conn.createStatement();

                ResultSet rs =
                    statement.executeQuery("SELECT " + sequenceName
                        + ".CURRVAL FROM DUAL");

                if (rs.next()) {
                    return rs.getLong(1) + 1;
                } else {
                    fail(sequenceName + " sequence doesn't exist.");
                    return -1; // for compiler
                }
            } finally {
                conn.close();
            }
        } catch (Exception e) {
            System.err.println("Unable to peek next_id." + e);
            fail("Unable to peek next_id. " + e);
            return -1; // for compiler
        }
    }

    /**
     * get next BigDecimal id using query directly.
     * @param sequenceName
     *        sequence name
     * @return next BigDecimal Id
     */
    private BigDecimal peekNextBigDecimalId(String sequenceName) {
        DataSource dataSource =
            (DataSource) applicationContext.getBean("util_datasource");
        try {
            Connection conn = dataSource.getConnection();
            try {
                Statement statement = conn.createStatement();

                ResultSet rs =
                    statement.executeQuery("SELECT " + sequenceName
                        + ".CURRVAL FROM DUAL");

                if (rs.next()) {
                    return rs.getBigDecimal(1).add(new BigDecimal("1"));
                } else {
                    fail(sequenceName + " sequence doesn't exist.");
                    return new BigDecimal("-1"); // for
                    // compiler
                }
            } finally {
                conn.close();
            }
        } catch (Exception e) {
            System.err.println("Unable to peek next_id." + e);
            fail("Unable to peek next_id. " + e);
            return new BigDecimal("-1"); // for compiler
        }
    }
}
