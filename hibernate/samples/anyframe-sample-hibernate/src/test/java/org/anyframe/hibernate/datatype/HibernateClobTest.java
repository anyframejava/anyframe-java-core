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
 * [Description] : : Clob Type이 정의된 객체에 대해 등록/수정/삭제/조회를 통해 각 Clob Type을 처리하기 위해
 * 객체에 어떠한 Type으로 정의되어야 하는지, Hibernate Mapping XML 파일 내에 정의되어야 하는 Type은 무엇인지 확인해
 * 볼 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Clob Type이 정의된 Entity 객체를 이용하여 데이터를 입력하고 조회한다.
 * Hibernate 매핑 파일을 통해 각 Clob Type에 맞는 Hibernate Mapping Type을 알 수 있다.</li>
 * <li>#-2 Positive Case : Clob Type이 정의된 Entity 객체를 이용하여 데이터를 수정하고 수정 여부를
 * 확인한다.</li>
 * <li>#-3 Positive Case : Clob Type이 정의된 Entity 객체를 이용하여 데이터를 삭제하고 삭제 여부를
 * 확인한다.</li>
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
	 * [Flow #-1] Positive Case : Clob Type이 정의된 Entity 객체를 이용하여 데이터를 입력하고 조회한다.
	 * Hibernate 매핑 파일을 통해 각 Clob Type에 맞는 Hibernate Mapping Type을 알 수 있다.
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
	 * [Flow #-2] Positive Case : Clob Type이 정의된 Entity 객체를 이용하여 데이터를 수정하고 수정
	 * 여부를 확인한다.
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
	 * [Flow #-3] Positive Case : Clob Type이 정의된 Entity 객체를 이용하여 데이터를 삭제하고 삭제
	 * 여부를 확인한다.
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
	 * java.sql.Clob 데이터를 String으로 변환한다.
	 * 
	 * @param clob
	 *            Clob 데이터
	 * @return String 변환된 String
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
	 * Clob 유형의 초기 데이터를 셋팅하고 DB에 추가한다.
	 * 
	 * @return List 입력한 JavaDataType List
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
	 * 테스트를 위한 Large String을 생성한다.
	 * 
	 * @param str
	 *            기본 포함 문자열
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
	 * 테스트를 위한 Large String을 생성한다.
	 * 
	 * @return String large string
	 */
	private String getLargeString() {
		return getLargeString(null);
	}
}
