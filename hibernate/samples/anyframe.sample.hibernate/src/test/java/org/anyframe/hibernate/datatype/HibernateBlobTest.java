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
package org.anyframe.hibernate.datatype;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.datatype.BlobDataType;
import org.apache.commons.collections.map.ListOrderedMap;
import org.hibernate.Hibernate;
import org.springframework.util.FileCopyUtils;


/**
 * TestCase Name : HibernateBlobTest<br>
 * <br>
 * [Description] : : Blob Type이 정의된 객체에 대해 등록/수정/삭제/조회를
 * 통해 각 Blob Type을 처리하기 위해 객체에 어떠한 Type으로 정의되어야 하는지,
 * Hibernate Mapping XML 파일 내에 정의되어야 하는 Type은 무엇인지 확인해
 * 볼 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Blob Type이 정의된 Entity 객체를
 * 이용하여 데이터를 입력하고 조회한다. Hibernate 매핑 파일을 통해 각 Blob
 * Type에 맞는 Hibernate Mapping Type을 알 수 있다.</li>
 * <li>#-2 Positive Case : Blob Type이 정의된 Entity 객체를
 * 이용하여 데이터를 수정하고 수정 여부를 확인한다.</li>
 * <li>#-3 Positive Case : Blob Type이 정의된 Entity 객체를
 * 이용하여 데이터를 삭제하고 삭제 여부를 확인한다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class HibernateBlobTest extends AbstractConfigurationalTransactionalTest {
    protected String getHibernateConfigLocation() {
        return "org/anyframe/hibernate/datatype/hibernate-blob.cfg.xml";
    }

    protected void setUp() throws Exception {
        super.setUp();
        try {
            Connection conn = session.connection();
            try {
                Statement statement = conn.createStatement();

                try {
                    statement
                        .executeUpdate("drop table ATHENA.HIBERNATE_BLOB_DATA_TYPE cascade constraints");
                } catch (SQLException e) {

                }
                statement
                    .executeUpdate("create table ATHENA.HIBERNATE_BLOB_DATA_TYPE ("
                        + "FILE_ID number(10,0) not null, "
                        + "FILE_NAME clob, "
                        + "FILE_SIZE number(19,2), "
                        + "FILE_CONTENT_BYTE BLOB, "
                        + "FILE_CONTENT_BLOB BLOB, " + "primary key (FILE_ID))");
            } catch (Exception e) {
                e.printStackTrace();

            } finally {
                conn.close();
            }
        } catch (SQLException e) {
            System.err.println("Unable to initialize database for test." + e);
        }
    }

    /**
     * [Flow #-1] Positive Case : Blob Type이 정의된 Entity
     * 객체를 이용하여 데이터를 입력하고 조회한다. Hibernate 매핑 파일을 통해 각
     * Blob Type에 맞는 Hibernate Mapping Type을 알 수 있다.
     * @throws Exception
     *         throws exception which is from hibernate
     */
    public void testInsertBlobDataType() throws Exception {
        // 1. insert init data
        BlobDataType source = insertBlobDataType();

        // 2. select a blobDataType data
        BlobDataType blobDataType =
            (BlobDataType) session.get(BlobDataType.class, new Integer(4491));

        // 3. assert result - blobDataType
        assertNotNull(blobDataType);
        assertEquals(source.getFileName(), blobDataType.getFileName());
        assertEquals(source.getFileSize(), blobDataType.getFileSize());
        assertEquals(source.getFileContentByte().length, blobDataType
            .getFileContentByte().length);
        assertEquals(source.getFileContentBlob().length(), blobDataType
            .getFileContentBlob().length());
    }

    /**
     * [Flow #-2] Positive Case : Blob Type이 정의된 Entity
     * 객체를 이용하여 데이터를 수정하고 수정 여부를 확인한다.
     */
    public void testUpdateBlobDataType() throws Exception {
        // 1. insert init data
        insertBlobDataType();

        // 2. select a blobDataType data
        BlobDataType blobDataType =
            (BlobDataType) session.get(BlobDataType.class, new Integer(4491));

        // 3. update data
        ListOrderedMap fileInfo = getFileInfo(true);
        blobDataType.setFileName((String) fileInfo.get("fileName"));
        blobDataType.setFileSize((java.math.BigDecimal) fileInfo
            .get("fileSize"));
        blobDataType.setFileContentByte((byte[]) fileInfo
            .get("fileContentByte"));
        blobDataType.setFileContentBlob((Blob) fileInfo.get("fileContentBlob"));
        session.update(blobDataType);

        // 4. check if update is successful
        blobDataType =
            (BlobDataType) session.get(BlobDataType.class, new Integer(4491));
        assertNotNull(blobDataType);
        assertEquals((String) fileInfo.get("fileName"), blobDataType
            .getFileName());
        assertEquals((java.math.BigDecimal) fileInfo.get("fileSize"),
            blobDataType.getFileSize());
        assertEquals(((byte[]) fileInfo.get("fileContentByte")).length,
            blobDataType.getFileContentByte().length);

        assertEquals(((Blob) fileInfo.get("fileContentBlob")).length(),
            blobDataType.getFileContentBlob().length());
    }

    /**
     * [Flow #-3] Positive Case : Blob Type이 정의된 Entity
     * 객체를 이용하여 데이터를 삭제하고 삭제 여부를 확인한다.
     */
    public void testDeleteBlobDataType() {
        // 1. insert init data
        insertBlobDataType();

        // 2. select a blobDataType data
        BlobDataType blobDataType =
            (BlobDataType) session.get(BlobDataType.class, new Integer(4491));

        // 3. remove data
        session.delete(blobDataType);

        // 4. check if deletion is successful
        blobDataType =
            (BlobDataType) session.get(BlobDataType.class, new Integer(4491));
        assertNull(blobDataType);
    }

    /**
     * Blob 유형의 초기 데이터를 셋팅하고 DB에 추가한다.
     * @return BlobDataType 첫번째로 입력한 BlobDataType
     */
    private BlobDataType insertBlobDataType() {
        BlobDataType blobDataType1 = new BlobDataType();
        ListOrderedMap fileInfo1 = getFileInfo();
        blobDataType1.setFileId(4491);
        blobDataType1.setFileName((String) fileInfo1.get("fileName"));
        blobDataType1.setFileSize(((java.math.BigDecimal) fileInfo1
            .get("fileSize")));
        blobDataType1.setFileContentByte((byte[]) fileInfo1
            .get("fileContentByte"));
        blobDataType1.setFileContentBlob((Blob) fileInfo1
            .get("fileContentBlob"));
        session.save(blobDataType1);

        return blobDataType1;
    }

    /**
     * Blob Data Type 테스트를 위한 파일 정보를 셋팅한다.
     * @return ListOrderedMap 파일 정보를 포함하고 있는 Map
     */
    protected ListOrderedMap getFileInfo() {
        return getFileInfo(false);
    }

    /**
     * Blob Data Type 테스트를 위한 파일 정보를 셋팅한다.
     * @param isUpdate
     *        update 용도의 파일인지 체크
     * @return ListOrderedMap 파일 정보를 포함하고 있는 Map
     */
    protected ListOrderedMap getFileInfo(boolean isUpdate) {
        ListOrderedMap fileMap = new ListOrderedMap();
        File file;
        if (!isUpdate) {
            file = new File("./testdata/LobTestData.txt");
        } else {
            file = new File("./testdata/LobUpdateTestData.txt");
        }
        if (file.exists()) {
            FileInputStream fis = null;
            byte[] fileContent = null;
            try {
                fis = new FileInputStream(file);
                fileContent = FileCopyUtils.copyToByteArray(fis);
            } catch (IOException e) {
                e.printStackTrace();
                fail("fail to read file");
            } finally {
                if (fis != null) {
                    try {
                        fis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            fileMap.put("fileName", file.getName());
            fileMap.put("fileSize", new java.math.BigDecimal(new Long(file
                .length()).doubleValue()));
            fileMap.put("fileContentByte", fileContent);
            try {
                fileMap.put("fileContentBlob", Hibernate
                    .createBlob(fileContent));
            } catch (Exception e) {
                e.printStackTrace();
                fail("fail to convert ByteArray into Blob");
            }
        } else {
            fail("the file doesn't exist");
        }
        return fileMap;
    }
}
