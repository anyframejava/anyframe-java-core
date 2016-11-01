/*
 * Copyright 2002-2012 the original author or authors.
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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.exception.IdCreationException;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what TableIDGeneration Service with strategy supports, there are some
 * test scenarios in this TestCase.
 * 
 * @author Heewon Jung
 * @author Jonghwan Jeong
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class TableIdGenServiceJdbcWithStrategyTest {

	@Inject
	private ApplicationContext applicationContext;

	@After
	public void onTearDown() throws Exception {
		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				// 1. Try to drop the table. It may not
				// exist and throw an
				// exception.
				try {
					statement.executeUpdate("DROP TABLE myIdstest");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					System.out.println("myIdstest drop fail.");
					e.printStackTrace();
				}

				try {
					statement.executeUpdate("DROP TABLE myIds");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					System.out.println("myIds drop fail.");
					e.printStackTrace();
				}

				try {
					statement.executeUpdate("DROP TABLE MY_IDS");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					System.out.println("MY_IDS drop fail.");
					e.printStackTrace();
				}
				
				try {
					statement.executeUpdate("DROP TABLE ids_maxciphertest");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					System.out.println("ids_maxciphertest drop fail.");
					e.printStackTrace();
				}
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * initialize TestCase
	 * 
	 * @throws Exception
	 *             fail to initialize
	 */
	@Before
	public void onSetUp() throws Exception {
		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				// 1. Try to drop the table. It may not
				// exist and throw an
				// exception.
				try {
					statement.executeUpdate("DROP TABLE myIdstest");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					// System.out.println("idstest drop
					// fail.");
					// e.printStackTrace();
				}

				try {
					statement.executeUpdate("DROP TABLE myIds");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					// System.out.println("ids drop
					// fail.");
					// e.printStackTrace();
				}
				
				try {
					statement.executeUpdate("DROP TABLE MY_IDS");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					// System.out.println("ids drop
					// fail.");
					// e.printStackTrace();
				}

				try {
					statement.executeUpdate("DROP TABLE ids_maxciphertest");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					// System.out.println("ids drop
					// fail.");
					// e.printStackTrace();
				}

				// 2. Create the table that we will use
				// in this test.
				// Different depending on the db.
				// Please add new statements as
				// new databases are
				// tested.
				statement.executeUpdate("CREATE TABLE myIdstest ( "
						+ "table_name varchar(16) NOT NULL, "
						+ "next_id DECIMAL(30) NOT NULL, "
						+ "PRIMARY KEY (table_name))");
				statement.executeUpdate("CREATE TABLE myIds ( "
						+ "table_name varchar(16) NOT NULL, "
						+ "next_id DECIMAL(30) NOT NULL, "
						+ "PRIMARY KEY (table_name))");
				
				statement.executeUpdate("CREATE TABLE MY_IDS( "
						+ "MY_KEY varchar(16) NOT NULL, "
						+ "MY_ID DECIMAL(30) NOT NULL, "
						+ "PRIMARY KEY (MY_KEY))");
				statement.executeUpdate("CREATE TABLE ids_maxciphertest ( "
						+ "table_name varchar(16) NOT NULL, "
						+ "next_id DECIMAL(1) NOT NULL, "
						+ "PRIMARY KEY (table_name))");

				statement.executeUpdate("INSERT INTO myIds VALUES('id','0')");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}
	
	/**
	 * [Flow #-01] Positive Case : when generate id, apply generation mixStrategy
	 * (no suffix, no prefix).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateTableIdWithNullFix() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGenerateTableIdWithNullFix");
		String id = idGenService.getNextStringId();
		assertEquals("****1", id);
	}
	
	/**
	 * [Flow #-02] Positive Case : when generate id, apply generation mixStrategy
	 * (with prefix).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateTableIdWithPrefix() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGenerateTableIdWithPrefix");
		String id = idGenService.getNextStringId();
		assertEquals("TEST-****1", id);
	}

	/**
	 * [Flow #-03] Positive Case : when generate id, apply generation mixStrategy
	 * (with suffix).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateTableIdWithSuffix() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGenerateTableIdWithSuffix");
		String id = idGenService.getNextStringId();
		assertEquals("****1-TEST", id);
	}

	/**
	 * [Flow #-04] Positive Case : when generate id, apply generation mixStrategy
	 * (with both prefix and suffix).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateTableIdWithFix() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGenerateTableIdWithFix");
		String id = idGenService.getNextStringId();
		assertEquals("TE-****1-ST", id);
	}
	
	/**
	 * [Flow #-05] Positive Case : when generated id, apply generation classNameStrategy when exist class information
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateClassNameBasedTableIdWithClass() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGenerateClassNameBasedTableIdWithClassName");
		String id = idGenService.getNextStringId(this.getClass());
		assertEquals(this.getClass().getSimpleName() + "-****1", id);
	}
	
	/**
	 * [Flow #-06] Positive Case : when generated id, apply generation classNameStrategy when not exist class information
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateClassNameBasedTableIdWithoutClass() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGenerateClassNameBasedTableIdWithClassName");
		String id = idGenService.getNextStringId();
		assertEquals("-****1", id);
	}
	
	/**
	 * [Flow #-07] Positive Case : when generated id, apply generation packageNameStrategy when exist class information
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGeneratePackageNameBasedTableIdWithClass() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGeneratePackageNameBasedTableIdWithClassName");
		String id = idGenService.getNextStringId(this.getClass());
		assertEquals(this.getClass().getPackage().getName() + "-****1", id);
	}
	
	/**
	 * [Flow #-08] Positive Case : when generated id, apply generation packageNameStrategy when not exist class information
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGeneratePackageNameBasedTableIdWithoutClass() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGeneratePackageNameBasedTableIdWithClassName");
		String id = idGenService.getNextStringId();
		assertEquals("-****1", id);
	}
	
	/**
	 * [Flow #-09] Positive Case : when generated id, apply generation packageStrategy with prefix when exist class information
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGeneratePackageBasedTableIdWithPrefixAndClass() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGeneratePackageBasedTableIdWithClassName");
		String id = idGenService.getNextStringId(this.getClass());
		assertEquals("TB-****1", id);
	}
	
	/**
	 * [Flow #-10] Positive Case : when generated id, apply generation packageStrategy with suffix when exist class information
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGeneratePackageBasedTableIdWithSuffixAndClass() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestGeneratePackageBasedTableIdWithSuffixAndClassName");
		String id = idGenService.getNextStringId(this.getClass());
		assertEquals("****1-TBP", id);
	}
	
	/**
	 * [Flow #-11] Negative Case : when generated id, apply generation maxStrategy when ignoreMaxCiphers is false.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateWithMixStrategyMaxCiphers() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestWithMixStrategyMaxCiphers");
		
		String id = "";
		for(int i = 1; i <= 10; i++){
			try{
				id = idGenService.getNextStringId();
				if(i < 10){
					assertEquals("TEST-" + i, id);
				}
			}catch(IdCreationException e){
				assertEquals(10, i);
				assertEquals("[IDGeneration Service] ID cannot be have length more than maxCiphers.", e.getMessage());
			}
			
			
		}
	}
	
	/**
	 * [Flow #-12] Negative Case : when generated id, apply generation classNameStrategy when ignoreMaxCiphers is false.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateWithClassNameStrategyMaxCiphers() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestWithClassNameStrategyMaxCiphers");
		
		String id = "";
		for(int i = 1; i <= 10; i++){
			try{
				id = idGenService.getNextStringId(this.getClass());
				if(i < 10){
					assertEquals(this.getClass().getSimpleName() + "-" + i, id);
				}
			}catch(IdCreationException e){
				assertEquals(10, i);
				assertEquals("[IDGeneration Service] ID cannot be have length more than maxCiphers.", e.getMessage());
			}
			
			
		}
	}
	
	/**
	 * [Flow #-13] Negative Case : when generated id, apply generation packageNameStrategy when ignoreMaxCiphers is false.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateWithPackageNameStrategyMaxCiphers() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestWithPackageNameStrategyMaxCiphers");
		
		String id = "";
		for(int i = 1; i <= 10; i++){
			try{
				id = idGenService.getNextStringId(this.getClass());
				if(i < 10){
					assertEquals(this.getClass().getPackage().getName() + "-" + i, id);
				}
			}catch(IdCreationException e){
				assertEquals(10, i);
				assertEquals("[IDGeneration Service] ID cannot be have length more than maxCiphers.", e.getMessage());
			}
			
			
		}
	}
	
	/**
	 * [Flow #-14] Negative Case : when generated id, apply generation maxStrategy when ignoreMaxCiphers is false.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGenerateWithPackageStrategyMaxCiphers() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestWithPackageStrategyMaxCiphers");
		
		String id = "";
		for(int i = 1; i <= 10; i++){
			try{
				id = idGenService.getNextStringId(this.getClass());
				if(i < 10){
					assertEquals("TB-" + i, id);
				}
			}catch(IdCreationException e){
				assertEquals(10, i);
				assertEquals("[IDGeneration Service] ID cannot be have length more than maxCiphers.", e.getMessage());
			}
			
			
		}
	}

	/**
	 * [Flow #-15] Negative Case : when generated id, apply generation 
	 * ,maxStrategy when table Id size is bigger than column size.
	 * @throws Exception
	 */
	@Test(expected=Exception.class)
	public void testGenerateTableIdWithNextIdBiggerThanColumnsSize()
			throws Exception {
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext
				.getBean("Ids-TestGenerateTableIdWithColumnSizeSmallerThanNextId");
		
		for (int i = 1; i < 10; i++) {
			if (i < 9) {
				assertEquals("TEST-****" + i, idGenService.getNextStringId());
			}else{
			   idGenService.getNextStringId();
			}
		}
	}
}
