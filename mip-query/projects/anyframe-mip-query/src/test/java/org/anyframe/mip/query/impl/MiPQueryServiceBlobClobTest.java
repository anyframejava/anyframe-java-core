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
package org.anyframe.mip.query.impl;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.anyframe.mip.query.MiPQueryService;
import org.anyframe.query.QueryServiceException;
import org.anyframe.util.DateUtil;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;
import org.springframework.util.FileCopyUtils;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.Variant;

/**
 * @author JongHoon Kim
 */
public class MiPQueryServiceBlobClobTest extends
        AbstractDependencyInjectionSpringContextTests {

    private DataSource dataSource;
    private MiPQueryService mipQueryService;

    protected String[] getConfigLocations() {
        return new String[] {"classpath:/spring/context-*.xml" };
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void setMipQueryService(MiPQueryService mipQueryService) {
        this.mipQueryService = mipQueryService;
    }

    public void onSetUp() throws Exception {
        super.onSetUp();
        try {
            Connection conn = dataSource.getConnection();
            try {
                Statement statement = conn.createStatement();

                try {
                    statement.executeUpdate("DROP TABLE TB_MIP_BLOBCLOB");
                } catch (SQLException e) {
                    System.out.println("Fail to DROP Table.");
                }

                statement.executeUpdate("CREATE TABLE TB_MIP_BLOBCLOB ( "
                    + "TEST_CHAR CHAR(10)," + "TEST_BLOB BLOB, "
                    + "TEST_CLOB CLOB," + "TEST_DATE DATE" + ")");
            } finally {
                conn.close();
            }
        } catch (SQLException e) {
            System.err.println("Unable to initialize database for test." + e);
            fail("Unable to initialize database for test. " + e);
        }
    }

    public void testInsertBlobClob() throws QueryServiceException {
        Map queryMap = new HashMap();
        queryMap.put(MiPQueryService.QUERY_INSERT, "createBlobClob");
        int resultCount =
            mipQueryService.update(queryMap, makeInsertLobDataSet());
        assertEquals(2, resultCount);
    }

    public void testUpdateBlobClob() throws Exception {
        // Data initialization
        try {
            Map sqlMap = new HashMap();
            sqlMap.put(MiPQueryService.QUERY_INSERT, "createBlobClob");
            mipQueryService.update(sqlMap, makeInsertLobDataSet());
        } catch (Exception e) {
            throw new Exception(
                "An Exception has occurred while initializing Test Update Data",
                e);
        }
        // Test Update
        Map sqlMap = new HashMap();
        sqlMap.put(MiPQueryService.QUERY_UPDATE, "updateBlobClob");
        int resultCount =
            mipQueryService.update(sqlMap, makeUpdateLobDataSet());
        assertEquals(1, resultCount);

    }

    public void testFindBlobClob() throws Exception {
        try {
            Map sqlMap = new HashMap();
            sqlMap.put(MiPQueryService.QUERY_INSERT, "createBlobClob");
            mipQueryService.update(sqlMap, makeInsertLobDataSet());
        } catch (Exception e) {
            throw new Exception(
                "An Exception has occurred while initializing Test Update Data",
                e);
        }
        // Test Select
        Dataset resultDs =
            mipQueryService.search("findBlobClob", makeFindDataSet());
        assertEquals(2, resultDs.getRowCount());
        assertEquals(makeInsertBlobData().length, resultDs
            .getColumnAsByteArray(0, 1).length);
        assertEquals(makeInsertBlobData().length, resultDs
            .getColumnAsByteArray(1, 1).length);
        assertNotNull(resultDs.getColumnAsObject(0, 2));
        assertNotNull(resultDs.getColumnAsObject(1, 2));
    }

    private Dataset makeInsertLobDataSet() {
        Dataset insertDataSet = new Dataset();
        insertDataSet.setUpdate(true);
        insertDataSet.setDataSetID("bbnydory_insert");
        insertDataSet.addStringColumn("TEST_CHAR");
        insertDataSet.addBlobColumn("TEST_BLOB");
        insertDataSet.addStringColumn("TEST_CLOB");
        insertDataSet.addDateColumn("TEST_DATE");

        insertDataSet.appendRow();
        Variant variant = new Variant();
        variant.setObject("bbnydory00");
        insertDataSet.setColumn(0, "TEST_CHAR", variant);
        variant = new Variant();
        variant.setObject(makeInsertBlobData());
        insertDataSet.setColumn(0, "TEST_BLOB", variant);
        variant = new Variant();
        variant.setString(makeInsertClobData());
        insertDataSet.setColumn(0, "TEST_CLOB", variant);
        variant = new Variant();
        variant.setDate(getDate());
        insertDataSet.setColumn(0, "TEST_DATE", variant);
        insertDataSet.appendRow();

        variant = new Variant();
        variant.setObject("bbnydory01");
        insertDataSet.setColumn(1, "TEST_CHAR", variant);
        variant = new Variant();
        variant.setObject(makeInsertBlobData());
        insertDataSet.setColumn(1, "TEST_BLOB", variant);
        variant = new Variant();
        variant.setString(makeInsertClobData());
        insertDataSet.setColumn(1, "TEST_CLOB", variant);
        variant = new Variant();
        variant.setDate(getDate());
        insertDataSet.setColumn(1, "TEST_DATE", variant);
        return insertDataSet;
    }

    private Dataset makeUpdateLobDataSet() {
        Dataset updateDataSet = new Dataset();

        updateDataSet.setDataSetID("bbnydory_update");
        updateDataSet.addStringColumn("TEST_CHAR");
        updateDataSet.addBlobColumn("TEST_BLOB");
        updateDataSet.addStringColumn("TEST_CLOB");
        updateDataSet.addDateColumn("TEST_DATE");

        updateDataSet.appendRow();
        updateDataSet.setUpdate(true);
        Variant variant = new Variant();
        variant.setObject("bbnydory00");
        updateDataSet.setColumn(0, "TEST_CHAR", variant);
        variant = new Variant();
        variant.setObject(makeUpdateBlobData());
        updateDataSet.setColumn(0, "TEST_BLOB", variant);
        variant = new Variant();
        variant.setString(makeUpdateClobData());
        updateDataSet.setColumn(0, "TEST_CLOB", variant);
        variant = new Variant();
        variant.setDate(getDate());
        updateDataSet.setColumn(0, "TEST_DATE", variant);
        updateDataSet.dump();
        return updateDataSet;
    }

    private Dataset makeFindDataSet() {
        Dataset selectDs = new Dataset();
        selectDs.setDataSetID("bbnydory_select");
        selectDs.addStringColumn("SEARCH_KEYWORD");

        selectDs.appendRow();
        Variant variant = new Variant();
        variant.setObject("%bbnydory%");
        selectDs.setColumn(0, "SEARCH_KEYWORD", variant);
        return selectDs;
    }

    private byte[] makeInsertBlobData() {
        FileInputStream fis = null;
        byte[] blobByte = null;
        try {
            fis = new FileInputStream("./testlobdata/CreateLobTest.txt");
            blobByte = FileCopyUtils.copyToByteArray(fis);
        } catch (IOException e) {
            fail("Fail to read file");
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return blobByte;
    }

    private byte[] makeUpdateBlobData() {
        FileInputStream fis = null;
        byte[] blobByte = null;
        try {
            fis = new FileInputStream("./testlobdata/UpdateLobTest.txt");
            blobByte = FileCopyUtils.copyToByteArray(fis);
        } catch (IOException e) {
            fail("Fail to read file");
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return blobByte;
    }

    private String makeInsertClobData() {
        String clobData = "Anyframe MiQueryService Test.\n";
        for (int i = 0; i < 100; i++) {
            clobData += "Anyframe MiQueryService Test.\n";
        }
        return clobData;
    }

    private String makeUpdateClobData() {
        String clobData = "Anyframe MiQueryService Update Test.\n";
        for (int i = 0; i < 100; i++) {
            clobData += "Anyframe MiQueryService Update Test.\n";
        }
        return clobData;
    }

    private Timestamp getDate() {
        return DateUtil.string2Timestamp("2008-12-01", "yyyy-MM-dd");
    }
}
