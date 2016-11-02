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
package org.anyframe.xplatform.util;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataTypes;
import com.tobesoft.xplatform.data.VariableList;

/**
 * This XPDataSetConverterTest class is a Test Case class for
 * XPDataSetConverter.
 * 
 * @author Youngmin Jo
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class XPDataSetConverterTest {

	@Test
	public void testConvertVOToDataSet() {
		DataSet ds = XPDataSetMapper.convertVoToDataset("test_ds",
				initTestVO(), true);

		assertNotNull(ds);
		assertEquals("DataSet id is wrong.", "test_ds", ds.getName());

		assertEquals("testString", ds.getString(0, "testString"));
		assertEquals("123", ds.getString(0, "testLong"));
		assertEquals("123", ds.getString(0, "testInt"));
		assertEquals("1.23", ds.getString(0, "testFloat"));
		assertEquals("1.23", ds.getString(0, "testDouble"));
		assertEquals("a", ds.getString(0, "testChar"));
		assertEquals("123", ds.getString(0, "testBigDecimal"));
	}

	@Test
	public void testConvertVoListToDataset() {
		List<Object> voList = new ArrayList<Object>();

		voList.add(initTestVO());
		voList.add(initTestVO());
		voList.add(initTestVO());

		DataSet ds = XPDataSetMapper.convertVoListToDataset("test_ds", voList,
				true);

		assertEquals(3, ds.getRowCount());
		assertEquals("testString", ds.getString(0, "testString"));
		assertEquals("123", ds.getString(1, "testLong"));
		assertEquals("123", ds.getString(2, "testInt"));
		assertEquals("1.23", ds.getString(0, "testFloat"));
		assertEquals("1.23", ds.getString(1, "testDouble"));
		assertEquals("a", ds.getString(2, "testChar"));
		assertEquals("123", ds.getString(0, "testBigDecimal"));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testConvertDataSetToListMap() throws InstantiationException,
			IllegalAccessException {
		DataSet ds = initDataSet();

		Map<String, Object> hashMap = XPDataSetMapper.convertDatasetToListMap(
				MappingVO.class, ds);

		assertNotNull(hashMap);
		assertEquals(2, ((List) hashMap.get("insert")).size());
		assertEquals(2, ((List) hashMap.get("update")).size());

		List<MappingVO> insertVOList = (List) hashMap.get("insert");
		List<MappingVO> updateVOList = (List) hashMap.get("update");

		MappingVO insertVO1 = insertVOList.get(0);
		MappingVO insertVO2 = insertVOList.get(1);
		MappingVO updateVO1 = updateVOList.get(0);
		MappingVO updateVO2 = updateVOList.get(1);

		assertEquals("insert1", insertVO1.getTestString());
		assertEquals("insert2", insertVO2.getTestString());
		assertEquals("update1", updateVO1.getTestString());
		assertEquals("update2", updateVO2.getTestString());
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testConvertDataSetToListMapCamelCase()
			throws InstantiationException, IllegalAccessException {
		DataSet ds = initDataSetUnderScore();

		Map<String, Object> hashMap = XPDataSetMapper.convertDatasetToListMap(
				MappingVO.class, ds, true);
		assertNotNull(hashMap);
		assertEquals(2, ((List) hashMap.get("insert")).size());
		assertEquals(2, ((List) hashMap.get("update")).size());

		List<MappingVO> insertVOList = (List) hashMap.get("insert");
		List<MappingVO> updateVOList = (List) hashMap.get("update");

		MappingVO insertVO1 = insertVOList.get(0);
		MappingVO insertVO2 = insertVOList.get(1);
		MappingVO updateVO1 = updateVOList.get(0);
		MappingVO updateVO2 = updateVOList.get(1);

		assertEquals("insert1", insertVO1.getTestString());
		assertEquals("insert2", insertVO2.getTestString());
		assertEquals("update1", updateVO1.getTestString());
		assertEquals("update2", updateVO2.getTestString());

	}

	@Test
	public void testConvertDataSetToListMapMap() {
		DataSet ds = initDataSet();
		Map<String, List<Map<String, Object>>> map = XPDataSetMapper
				.convertDataSetToListMap(ds);
		assertNotNull(map);
		assertEquals(2, map.get("insert").size());
		assertEquals(2, map.get("update").size());

		List<Map<String, Object>> insertMapList = map.get("insert");
		List<Map<String, Object>> updateMapList = map.get("update");

		Map<String, Object> insertMap0 = insertMapList.get(0);
		Map<String, Object> insertMap1 = insertMapList.get(1);

		Map<String, Object> updateMap0 = updateMapList.get(0);
		Map<String, Object> updateMap1 = updateMapList.get(1);

		assertEquals("insert1", insertMap0.get("testString"));
		assertEquals("insert2", insertMap1.get("testString"));
		assertEquals("update1", updateMap0.get("testString"));
		assertEquals("update2", updateMap1.get("testString"));
	}

	@Test
	public void testConvertDataSetToListMapMapCamelCase() {
		DataSet ds = initDataSetUnderScore();
		Map<String, List<Map<String, Object>>> map = XPDataSetMapper
				.convertDataSetToListMap(ds, true);
		assertNotNull(map);
		assertEquals(2, map.get("insert").size());
		assertEquals(2, map.get("update").size());

		List<Map<String, Object>> insertMapList = map.get("insert");
		List<Map<String, Object>> updateMapList = map.get("update");

		Map<String, Object> insertMap0 = insertMapList.get(0);
		Map<String, Object> insertMap1 = insertMapList.get(1);

		Map<String, Object> updateMap0 = updateMapList.get(0);
		Map<String, Object> updateMap1 = updateMapList.get(1);

		assertEquals("insert1", insertMap0.get("testString"));
		assertEquals("insert2", insertMap1.get("testString"));
		assertEquals("update1", updateMap0.get("testString"));
		assertEquals("update2", updateMap1.get("testString"));
	}

	@Test
	public void testConvertMapToDataSet() {
		Map<String, Object> map = initTestMap();
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		mapList.add(map);
		DataSet ds = XPDataSetMapper.convertMapListToDataSet("test_ds",
				mapList, true);
		assertNotNull(ds);
		assertEquals(ds.getName(), "test_ds");
		assertEquals(ds.getString(0, "testString"), "normal");
		assertEquals(ds.getInt(0, "testInt"), 123);
	}

	@Test
	public void testConvertMapListToDataSet() {
		List<Map<String, Object>> mapList = initTestHashMapList();

		DataSet ds = XPDataSetMapper.convertMapListToDataSet("test_ds",
				mapList, true);
		assertNotNull(ds);
		assertEquals(3, ds.getRowCount());

		assertEquals("normal", ds.getString(0, "testString"));
		assertEquals("insert", ds.getString(1, "testString"));
		assertEquals("update", ds.getString(2, "testString"));
	}

	@Test
	public void testConvertDataSetToMapList() {
		DataSet ds = initDataSet();

		List<Map<String, Object>> resultList = XPDataSetMapper
				.convertDataSetToMapList(ds);
		assertNotNull(resultList);
		assertEquals(5, resultList.size());
		assertEquals("normal", resultList.get(0).get("testString"));

		assertEquals(123, resultList.get(0).get("testInt"));
		assertEquals(765, resultList.get(1).get("testInt"));
		assertEquals(876, resultList.get(2).get("testInt"));
	}

	@Test
	public void testConvertDataSetToMapListCamelCase() {
		DataSet ds = initDataSetUnderScore();

		List<Map<String, Object>> resultList = XPDataSetMapper
				.convertDataSetToMapList(ds, true);
		assertNotNull(resultList);
		assertEquals(5, resultList.size());
		assertEquals("normal", resultList.get(0).get("testString"));

		assertEquals(123, resultList.get(0).get("testInt"));
		assertEquals(765, resultList.get(1).get("testInt"));
		assertEquals(876, resultList.get(2).get("testInt"));
	}

	@Test
	public void testConvertVariableListToVO() throws InstantiationException,
			IllegalAccessException {
		VariableList vl = initVariableList();

		Object target = XPDataSetMapper.convertVariableListToVO(XPTestVO.class,
				vl);
		XPTestVO testVO = (XPTestVO) target;
		assertNotNull(testVO);
		assertEquals("normal", testVO.getTestString());
		assertEquals(123, testVO.getTestInt());
	}

	@Test
	public void testConvertVoToVariableList() {
		XPTestVO testVO = initTestVO();
		VariableList vl = XPDataSetMapper.convertVoToVariableList(testVO);
		assertNotNull(vl);
		assertEquals("testString", vl.getString("testString"));
		assertEquals(123l, vl.getLong("testLong"));
		assertEquals(123, vl.getInt("testInt"));
	}

	@Test
	public void testConvertMapToVariableList() {
		Map<String, Object> map = initTestMap();
		VariableList vl = XPDataSetMapper.convertMapToVariableList(map);
		assertNotNull(vl);
		assertEquals("normal", vl.getString("testString"));
		assertEquals(123, vl.getInt("testInt"));
	}

	@Test
	public void testConvertVariableListToMap() {
		VariableList vl = initVariableList();

		Map<String, Object> resultMap = XPDataSetMapper
				.convertVariableListToMap(vl, false);
		assertNotNull(resultMap);
		assertEquals("normal", resultMap.get("testString"));
		assertEquals(123, resultMap.get("testInt"));
	}

	@Test
	public void testSetParameterVO() throws InstantiationException,
			IllegalAccessException {
		Map<String, Object> testMap = initTestMap();
		XPTestVO xpTestVO = (XPTestVO) XPDataSetMapper.setParameterVO(testMap,
				XPTestVO.class);

		assertNotNull(xpTestVO);
		assertEquals(testMap.get("testString"), xpTestVO.getTestString());
		assertEquals(testMap.get("testInt"), xpTestVO.getTestInt());
		assertEquals(testMap.get("testLong"), xpTestVO.getTestLong());
	}

	@Test
	public void testSetParameterMap() {
		XPTestVO xpTestVO = initTestVO();
		Map<String, Object> resultMap = XPDataSetMapper
				.setParameterMap(xpTestVO);

		assertNotNull(resultMap);
		assertEquals(resultMap.get("testString"), xpTestVO.getTestString());
		assertEquals(resultMap.get("testInt"), xpTestVO.getTestInt());
		assertEquals(resultMap.get("testFloat"), xpTestVO.getTestFloat());
		assertEquals(resultMap.get("testLong"), xpTestVO.getTestLong());
	}

	public XPTestVO initTestVO() {
		XPTestVO testVO = new XPTestVO();
		testVO.setTestString("testString");
		testVO.setTestLong(123l);
		testVO.setTestInt(123);
		testVO.setTestFloat(1.23f);
		testVO.setTestDouble(1.23);
		testVO.setTestChar('a');
		testVO.setTestBigDecimal(new BigDecimal("123"));
		return testVO;
	}

	public Map<String, Object> initTestMap() {
		Map<String, Object> testMap = new HashMap<String, Object>();

		testMap.put("testString", "normal");
		testMap.put("testLong", (long) 1.23);
		testMap.put("testInt", 123);
		testMap.put("testFloat", 1.23f);
		testMap.put("testChar", 'a');

		return testMap;
	}

	public List<Map<String, Object>> initTestHashMapList() {
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();

		Map<String, Object> testMap1 = new HashMap<String, Object>();
		Map<String, Object> testMap2 = new HashMap<String, Object>();
		Map<String, Object> testMap3 = new HashMap<String, Object>();

		testMap1.put("testString", "normal");
		testMap1.put("testLong", 1.23);
		testMap1.put("testInt", 123);
		testMap1.put("testFloat", 1.23f);
		testMap1.put("testChar", 'a');

		testMap2.put("testString", "insert");
		testMap2.put("testLong", 3.14);
		testMap2.put("testInt", 2345);
		testMap2.put("testFloat", 3.23f);
		testMap2.put("testChar", 'n');

		testMap3.put("testString", "update");
		testMap3.put("testLong", 0.23);
		testMap3.put("testInt", 192);
		testMap3.put("testFloat", 0.23f);
		testMap3.put("testChar", '0');

		mapList.add(testMap1);
		mapList.add(testMap2);
		mapList.add(testMap3);

		return mapList;
	}

	public DataSet initDataSet() {
		DataSet ds = new DataSet();
		ds.setName("testDs");
		ds.addColumn("testString", DataTypes.STRING);
		ds.addColumn("testBigDecimal", DataTypes.BIG_DECIMAL);
		ds.addColumn("testInt", DataTypes.INT);

		ds.setConvertingToDataType(true);

		ds.newRow();
		ds.set(0, "testString", "normal");
		ds.set(0, "testBigDecimal", 1.23);
		ds.set(0, "testInt", 123);
		ds.setRowType(0, DataSet.ROW_TYPE_NORMAL);

		ds.newRow();
		ds.set(1, "testString", "update1");
		ds.set(1, "testBigDecimal", 6.56);
		ds.set(1, "testInt", 765);
		ds.setRowType(1, DataSet.ROW_TYPE_UPDATED);

		ds.newRow();
		ds.set(2, "testString", "update2");
		ds.set(2, "testBigDecimal", 9.64);
		ds.set(2, "testInt", 876);
		ds.setRowType(2, DataSet.ROW_TYPE_UPDATED);

		ds.newRow();
		ds.set(3, "testString", "insert1");
		ds.set(3, "testBigDecimal", 3.14);
		ds.set(3, "testInt", 807);
		ds.setRowType(3, DataSet.ROW_TYPE_INSERTED);

		ds.newRow();
		ds.set(4, "testString", "insert2");
		ds.set(4, "testBigDecimal", 0.1231);
		ds.set(4, "testInt", 1234);
		ds.setRowType(4, DataSet.ROW_TYPE_INSERTED);

		return ds;
	}

	public DataSet initDataSetUnderScore() {
		DataSet ds = new DataSet();
		ds.setName("testDs");
		ds.addColumn("test_string", DataTypes.STRING);
		ds.addColumn("test_big_decimal", DataTypes.BIG_DECIMAL);
		ds.addColumn("test_int", DataTypes.INT);

		ds.setConvertingToDataType(true);

		ds.newRow();
		ds.set(0, "test_string", "normal");
		ds.set(0, "test_big_decimal", 1.23);
		ds.set(0, "test_int", 123);
		ds.setRowType(0, DataSet.ROW_TYPE_NORMAL);

		ds.newRow();
		ds.set(1, "test_string", "update1");
		ds.set(1, "test_big_decimal", 6.56);
		ds.set(1, "test_int", 765);
		ds.setRowType(1, DataSet.ROW_TYPE_UPDATED);

		ds.newRow();
		ds.set(2, "test_string", "update2");
		ds.set(2, "test_big_decimal", 9.64);
		ds.set(2, "test_int", 876);
		ds.setRowType(2, DataSet.ROW_TYPE_UPDATED);

		ds.newRow();
		ds.set(3, "test_string", "insert1");
		ds.set(3, "test_big_decimal", 3.14);
		ds.set(3, "test_int", 807);
		ds.setRowType(3, DataSet.ROW_TYPE_INSERTED);

		ds.newRow();
		ds.set(4, "test_string", "insert2");
		ds.set(4, "test_big_decimal", 0.1231);
		ds.set(4, "test_int", 1234);
		ds.setRowType(4, DataSet.ROW_TYPE_INSERTED);

		return ds;
	}

	public VariableList initVariableList() {
		VariableList vl = new VariableList();
		vl.add("testString", "normal");
		vl.add("testBigDecimal", 1.23);
		vl.add("testInt", 123);

		return vl;
	}
}
