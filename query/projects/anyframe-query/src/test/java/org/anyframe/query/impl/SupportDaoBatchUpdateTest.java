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
package org.anyframe.query.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.dao.UserSupportDaoForBatchUpdate;
import org.anyframe.query.vo.BatchTestVO;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : SupportDaoBatchUpdateTest <br>
 * <br>
 * [Description] : By calling for batchUpdateForMap(),
 * batchUpdateForObjectArray(), batchUpdateForObject(), batchUpdateForMap()
 * method of QueryServiceDaoSupport, execution result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for batchUpdate() method of
 * QueryServiceDaoSupport, data for deletion is put into BatchTestVO and removed
 * as Batch. Then, verified is whether deletion is successful.</li>
 * <li>#-2 Positive Case : By calling for batchUpdate() method of
 * QueryServiceDaoSupport, data for modification is put into BatchTestVO and
 * modified as Batch. Then, verified is whether modification is successful.</li>
 * <li>#-3 Positive Case : By calling for batchUpdate() method of
 * QueryServiceDaoSupport, dvarious sets of data is put into HashMap and
 * modified as Batch. Then, verified is whether modification is successful.</li>
 * </ul>
 * 
 * @author junghwan.hong
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
		"classpath:spring/daosupport/context-*.xml",
		"classpath:spring/context-*.xml" })
public class SupportDaoBatchUpdateTest {

	@Inject
	QueryService queryService;

	@Inject
	UserSupportDaoForBatchUpdate userSupportDaoForBatchUpdate;

	private int initCount = 0;

	/**
	 * Table TB_BATCH_TEST is created for test.
	 */
	@Before
	public void onSetUp() throws Exception {
		try {
			System.out.println("Attempting to drop old table");

			queryService.updateBySQL("DROP TABLE TB_BATCH_TEST",
					new String[] {}, new Object[] {});

			queryService.updateBySQL("CREATE TABLE TB_BATCH_TEST ( "
					+ "col1 varchar2(50) NOT NULL, "
					+ "col2 varchar2(50) NOT NULL, " + "col3 integer, "
					+ "PRIMARY KEY (col1, col2))", new String[] {},
					new Object[] {});

		} catch (Exception e) {
			Assert.fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * [Flow #-1] Positive Case : By calling for batchUpdate() method of
	 * QueryServiceDaoSupport, various sets of data is put into BatchTestVO and
	 * deleted as Batch. Then checked is whether deletion is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchRemoveByObject() throws Exception {
		// 1. insert data by SQL
		batchInsertBySQL();

		// 2. set data for delete
		ArrayList<BatchTestVO> args = new ArrayList<BatchTestVO>();
		BatchTestVO batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I1InsertBySQL");
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I2InsertBySQL");
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I3InsertBySQL");
		args.add(batchTestVO);

		// 3. execute query
		int[] rtVal = userSupportDaoForBatchUpdate.batchUpdateForObject(
				"batchDeleteWithObject", args);

		Assert.assertTrue("Fail to batch remove by object.", rtVal.length == 3);

		// 4. assert
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to find.", rtList.size() == initCount);
	}

	/**
	 * [Flow #-2] Positive Case : By calling for batchUpdate() method of
	 * QueryServiceDaoSupport, various sets of data is put into BatchTestVO and
	 * modified as Batch. Then, verified is whether modification is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchUpdateByObject() throws Exception {
		// 1. insert data by object
		batchInsertByObject();

		// 2. set data for update
		ArrayList<BatchTestVO> args = new ArrayList<BatchTestVO>();
		BatchTestVO batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I1BatchCreateByObject");
		batchTestVO.setCol2("Modified");
		batchTestVO.setCol3(101);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I2BatchCreateByObject");
		batchTestVO.setCol2("Modified");
		batchTestVO.setCol3(102);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I3BatchCreateByObject");
		batchTestVO.setCol2("Modified");
		batchTestVO.setCol3(103);
		args.add(batchTestVO);

		// 3. execute query
		int[] rtVal = userSupportDaoForBatchUpdate.batchUpdateForObject(
				"batchUpdateWithObject", args);
		Assert.assertTrue("Fail to batch update by object.", rtVal.length == 3);

		// 4. assert
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});

		Assert.assertTrue("Fail to find.", rtList.size() == initCount + 3);
		for (int i = 0; i < rtList.size(); i++) {
			Map result = (Map) rtList.get(i);
			Assert.assertEquals("Fail to batch update a specified column.",
					"Modified", result.get("col2"));
		}
	}

	/**
	 * [Flow #-3] Positive Case : By calling for batchUpdate()method of
	 * QueryServiceDaoSupport, various sets of data is put into HashMap and
	 * modified as Batch. Then checked is whether modification is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchUpdateByMap() throws Exception {
		// 1. set data for insert
		ArrayList<Map<String, Object>> args = new ArrayList<Map<String, Object>>();

		Map<String, Object> batchTestMap = new HashMap<String, Object>();
		batchTestMap.put("col1", "I1BatchCreateByMap");
		batchTestMap.put("col2", "Modified");
		batchTestMap.put("col3", new Integer(101));
		args.add(batchTestMap);

		batchTestMap = new HashMap<String, Object>();
		batchTestMap.put("col1", "I2BatchCreateByMap");
		batchTestMap.put("col2", "Modified");
		batchTestMap.put("col3", new Integer(102));
		args.add(batchTestMap);

		batchTestMap = new HashMap<String, Object>();
		batchTestMap.put("col1", "I3BatchCreateByMap");
		batchTestMap.put("col2", "Modified");
		batchTestMap.put("col3", new Integer(103));
		args.add(batchTestMap);

		// 2. execute query
		int[] rtVal = userSupportDaoForBatchUpdate.batchUpdateForObject(
				"batchInsertWithMap", args);
		Assert.assertTrue("Fail to batch update by object.", rtVal.length == 3);

		// 3. assert
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});

		Assert.assertTrue("Fail to find.", rtList.size() == initCount + 3);
		for (int i = 0; i < rtList.size(); i++) {
			Map result = (Map) rtList.get(i);
			Assert.assertEquals("Fail to batch update a specified column.",
					"Modified", result.get("col2"));
		}
	}

	/**
	 * By delivering user information in the form of Object and query statement
	 * defined within code and calling for batchUpdateBySQL() method of
	 * QueryService, new user information is registered as Batch. And checked is
	 * whether registration is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void batchInsertBySQL() throws Exception {
		// 1. set query statement for insert
		String sql = "insert into TB_BATCH_TEST(col1, col2, col3) values (?,?,?)";

		// 2. set data for insert
		String[] types = new String[3];
		types[0] = "VARCHAR";
		types[1] = "VARCHAR";
		types[2] = "NUMERIC";
		ArrayList<Object[]> args = new ArrayList<Object[]>();
		Object[] arg = new Object[3];
		arg[0] = "I1InsertBySQL";
		arg[1] = "I1";
		arg[2] = new BigDecimal("1");
		args.add(arg);
		arg = new Object[3];
		arg[0] = "I2InsertBySQL";
		arg[1] = "I2";
		arg[2] = new BigDecimal("2");
		args.add(arg);
		arg = new Object[3];
		arg[0] = "I3InsertBySQL";
		arg[1] = "I3";
		arg[2] = new BigDecimal("3");
		args.add(arg);

		// 3. execute query
		queryService.batchUpdateBySQL(sql, types, args);

		// 4. assert
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to batch insert by SQL.",
				rtList.size() == 3 + initCount);
	}

	/**
	 * By delivering user information in the form of Transfer Object mapped with
	 * a specific table and calling for batchCreate()method of QueryService, new
	 * user information is registered as Batch. And checked is whether
	 * registration is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void batchInsertByObject() throws Exception {
		// 1. set data for insert
		ArrayList<BatchTestVO> args = new ArrayList<BatchTestVO>();
		BatchTestVO batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I1BatchCreateByObject");
		batchTestVO.setCol2("I1BatchCreateByObject");
		batchTestVO.setCol3(101);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I2BatchCreateByObject");
		batchTestVO.setCol2("I2BatchCreateByObject");
		batchTestVO.setCol3(102);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I3BatchCreateByObject");
		batchTestVO.setCol2("I3BatchCreateByObject");
		batchTestVO.setCol3(103);
		args.add(batchTestVO);

		// 2. execute query
		int[] rtVal = userSupportDaoForBatchUpdate.batchUpdateForObject(
				"batchInsertWithObject", args);
		Assert.assertTrue("Fail to batch insert by Object.", rtVal.length == 3);

		// 3. assert
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to find.", rtList.size() == initCount + 3);
	}
}
