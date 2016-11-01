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

import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.datatype.ClobDataType;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateClobTest<br>
 * <br>
 * [Description] : : In order to handle each Primitive Java Type via
 * registering/modifying /deleting/searching object defining Primitive Java
 * Type, it can be checked what type of object should be defined to handle Java
 * Type and what type should be defined within Hibernate Mapping XML. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Data is entered and searched by using Entity object
 * defininf Clob Type. Hiberate Mapping file finds Hbernate Mapping type
 * suitable per each Clob Type.</li>
 * <li>#-2 Positive Case : Data is modified and modification is checked by using
 * Entity object defining Clob Type.</li>
 * <li>#-3 Positive Case : Data is deleted and deletion is checked by using
 * Entity object defining Clob Type.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateClobTest extends AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/datatype/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Data is entered and searched by using Entity
	 * object defininf Clob Type. Hiberate Mapping file finds Hbernate Mapping
	 * type suitable per each Clob Type.
	 */
	@Test
	public void testInsertClobDataType() {
		// 1. insert init data
		ClobDataType source = insertClobDataType();

		// 2. select a clobDataType data
		ClobDataType clobDataType = (ClobDataType) session.get(
				ClobDataType.class, new Integer(4491));

		// 3. assert result - clobDataType
		Assert.assertNotNull(clobDataType);
		Assert.assertEquals(source.getTitle(), clobDataType.getTitle());
		Assert.assertEquals(convertClobIntoString(source.getContentClob()),
				convertClobIntoString(clobDataType.getContentClob()));
	}

	/**
	 * [Flow #-2] Positive Case : Data is modified and modification is checked
	 * by using Entity object defining Clob Type.
	 */
	@Test
	public void testUpdateClobDataType() {
		// 1. insert init data
		insertClobDataType();

		// 2. select a clobDataType data
		ClobDataType clobDataType = (ClobDataType) session.get(
				ClobDataType.class, new Integer(4491));

		// 3. update data
		clobDataType.setTitle("Update Hibernate LOB Data Test");
		clobDataType.setContentClob(session.getLobHelper()
				.createClob(getLargeString("Update")));
		session.update(clobDataType);

		// 4. check if update is successful
		clobDataType = (ClobDataType) session.get(ClobDataType.class,
				new Integer(4491));
		Assert.assertNotNull(clobDataType);
Assert.assertEquals("Update Hibernate LOB Data Test", clobDataType.getTitle());
		Assert.assertEquals(convertClobIntoString(session.getLobHelper()
				.createClob(getLargeString("Update"))),
				convertClobIntoString(clobDataType.getContentClob()));
	}

	/**
	 * [Flow #-3] Positive Case : Data is deleted and deletion is checked by
	 * using Entity object defining Clob Type.
	 */
	@Test
	public void testDeleteClobDataType() {
		// 1. insert init data
		insertClobDataType();

		// 2. select a clobDataType data
		ClobDataType clobDataType = (ClobDataType) session.get(
				ClobDataType.class, new Integer(4491));

		// 3. remove data
		session.delete(clobDataType);

		// 4. check if deletion is successful
		clobDataType = (ClobDataType) session.get(ClobDataType.class,
				new Integer(4491));
		Assert.assertNull(clobDataType);
	}

	/**
	 * java.sql.Clob data is changed into String.
	 * 
	 * @param clob
	 *            Clob Data
	 * @return String Converted String
	 */
	protected String convertClobIntoString(Clob clob) {
		StringBuffer sb = new StringBuffer();
		Reader reader = null;
		try {
			reader = clob.getCharacterStream();
			char[] buffer = new char[1024];
			int byteRead;
			while ((byteRead = reader.read(buffer, 0, 1024)) != -1) {
				sb.append(buffer, 0, byteRead);
			}
		} catch (Exception e) {
			e.printStackTrace();
			Assert.fail("fail to convert Clob Into String");
		} finally {
			if (reader != null)
				try {
					reader.reset();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
		return sb.toString();
	}

	/**
	 * Initial data of Clob type is set and added into DB.
	 * 
	 * @return List entered JavaDataType List
	 */
	private ClobDataType insertClobDataType() {
		ClobDataType clobDataType = new ClobDataType();
		clobDataType.setNo(4491);
		clobDataType.setTitle("Anyframe LOB Data Test");
		clobDataType.setContentClob(session.getLobHelper().createClob(getLargeString()));

		session.save(clobDataType);

		return clobDataType;
	}

	/**
	 * Large String is created for test.
	 * 
	 * @param str
	 *            String including basic 
	 * @return String large string
	 */
	private String getLargeString(String str) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < 100; i++) {
			sb.append("Anyframe Clob ");
			sb.append(str + " Test\n");
		}
		return sb.toString();
	}

	/**
	 * Large String is created for test.
	 * 
	 * @return String large string
	 */
	private String getLargeString() {
		return getLargeString(null);
	}
}
