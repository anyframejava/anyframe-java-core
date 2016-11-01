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

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.datatype.BlobDataType;
import org.apache.commons.collections.map.ListOrderedMap;
import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.util.FileCopyUtils;

/**
 * TestCase Name : HibernateBlobTest<br>
 * <br>
 * [Description] : : In order to handle Blob Type via registering/modifying
 * /deleting/searching object defining Blob Type, it can be checked what type of
 * object should be defined to handle Java Type and what type should de defined
 * within Hibernate Mapping XML. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Data is entered and searched using Entity object
 * defining Blob Type. Hibernate mapping file finds Hibernate Mapping Type
 * suitable for each Blob Type.</li>
 * <li>#-2 Positive Case : Data is modified and modification is checked by using
 * Entity object defining Blob Java Type.</li>
 * <li>#-3 Positive Case : Data is deleted and deletion is checked by using
 * Entity object defining Blob Type.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateBlobTest extends AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/datatype/hibernate-blob.cfg.xml";
	}

	@Before
	public void setUp() throws Exception {
		super.setUp();
		try {
			try {
				SQLQuery dropQuery = session
						.createSQLQuery("drop table ATHENA.HIBERNATE_BLOB_DATA_TYPE cascade constraints");
				dropQuery.executeUpdate();
			} catch (HibernateException e) {
			}
			SQLQuery createQuery = session
					.createSQLQuery("create table ATHENA.HIBERNATE_BLOB_DATA_TYPE ("
							+ "FILE_ID number(10,0) not null, "
							+ "FILE_NAME clob, "
							+ "FILE_SIZE number(19,2), "
							+ "FILE_CONTENT_BYTE BLOB, "
							+ "FILE_CONTENT_BLOB BLOB, "
							+ "primary key (FILE_ID))");
			createQuery.executeUpdate();
		} catch (Exception e) {
			Assert.fail("fail to create table.");
		}
	}

	/**
	 * [Flow #-1] Positive Case : Data is entered and searched using Entity
	 * object defining Blob Type. Hibernate mapping file finds Hibernate Mapping
	 * Type suitable for each Blob Type.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testInsertBlobDataType() throws Exception {
		// 1. insert init data
		BlobDataType source = insertBlobDataType();

		// 2. select a blobDataType data
		BlobDataType blobDataType = (BlobDataType) session.get(
				BlobDataType.class, new Integer(4491));

		// 3. assert result - blobDataType
		Assert.assertNotNull(blobDataType);
		Assert.assertEquals(source.getFileName(), blobDataType.getFileName());
		Assert.assertEquals(source.getFileSize(), blobDataType.getFileSize());
		Assert.assertEquals(source.getFileContentByte().length, blobDataType
				.getFileContentByte().length);
		Assert.assertEquals(source.getFileContentBlob().length(), blobDataType
				.getFileContentBlob().length());
	}

	/**
	 * [Flow #-2] Positive Case : Data is modified and modification is checked
	 * by using Entity object defining Blob Java Type.
	 */
	@Test
	public void testUpdateBlobDataType() throws Exception {
		// 1. insert init data
		insertBlobDataType();

		// 2. select a blobDataType data
		BlobDataType blobDataType = (BlobDataType) session.get(
				BlobDataType.class, new Integer(4491));

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
		blobDataType = (BlobDataType) session.get(BlobDataType.class,
				new Integer(4491));
		Assert.assertNotNull(blobDataType);
		Assert.assertEquals((String) fileInfo.get("fileName"), blobDataType
				.getFileName());
		Assert.assertEquals((java.math.BigDecimal) fileInfo.get("fileSize"),
				blobDataType.getFileSize());
		Assert.assertEquals(((byte[]) fileInfo.get("fileContentByte")).length,
				blobDataType.getFileContentByte().length);

		Assert.assertEquals(((Blob) fileInfo.get("fileContentBlob")).length(),
				blobDataType.getFileContentBlob().length());
	}

	/**
	 * [Flow #-3] Positive Case : Data is deleted and deletion is checked by
	 * using Entity object defining Blob Type.
	 */
	@Test
	public void testDeleteBlobDataType() {
		// 1. insert init data
		insertBlobDataType();

		// 2. select a blobDataType data
		BlobDataType blobDataType = (BlobDataType) session.get(
				BlobDataType.class, new Integer(4491));

		// 3. remove data
		session.delete(blobDataType);

		// 4. check if deletion is successful
		blobDataType = (BlobDataType) session.get(BlobDataType.class,
				new Integer(4491));
		Assert.assertNull(blobDataType);
	}

	/**
	 * Initial data and Blob type is set and added to DB.
	 * 
	 * @return BlobDataType BlobDataType first entering
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
	 * File information is set for Blob Data Type.
	 * 
	 * @return ListOrderedMap Map included file information
	 */
	protected ListOrderedMap getFileInfo() {
		return getFileInfo(false);
	}

	/**
	 * File information is set for Blob Data Type. 
	 * 
	 * @param isUpdate
	 *            update It is checked the file is for update.
	 * @return ListOrderedMap Map included file information
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
				Assert.fail("fail to read file");
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

			System.out.println(" lobHelper : " + session.getLobHelper());
			try {
				fileMap.put("fileContentBlob", session.getLobHelper()
						.createBlob(fileContent));
			} catch (Exception e) {
				e.printStackTrace();
				Assert.fail("fail to convert ByteArray into Blob");
			}
		} else {
			Assert.fail("the file doesn't exist");
		}
		return fileMap;
	}
}
