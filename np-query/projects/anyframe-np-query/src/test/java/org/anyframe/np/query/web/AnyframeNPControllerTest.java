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
package org.anyframe.np.query.web;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import junit.framework.TestCase;

import org.anyframe.np.query.util.NPMapper;
import org.anyframe.np.query.web.controller.AbstractNPController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.DataTypes;
import com.nexacro.xapi.data.VariableList;
import com.nexacro.xapi.tx.HttpPlatformRequest;

/**
 * TestCase Name : AnyframeNPControllerTest <br>
 * <br>
 * [Description] : AnyframeNPController를 확장한 Controller 클래스의 메소드가 정상적으로 호출 되는지
 * 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#1- Positive Case : AnyframeNPController를 상속 받은 NPController의 process가 호출
 * 되었을 때 AnyframeNPController의 process method에서 HttpRequest로 넘어온 사용자 입력값을 입출력
 * DataSetList, VariableList를 분리하는 것을 검증한다.</li>
 * <li>#2- Positive Case : process method가 호출 되었을 때 AnyframeNPController를
 * extends한 NPController의 operate가 제대로 호출 되고 결과 메세지를 output VariableList에 저장하는
 * 것을 검증한다.</li>
 * <li>#3- Positive Case : NPController의 operate method에서 Exception이 발생했을 경우
 * output VariableList에 Exception 메세지가 저장되는 것을 검증한다.</li>
 * <li>#4- Positive Case : Sever Side Value전달 객체인 VO클래스를 NPlatform의 Dataset로
 * 변환하는 함수 convertVoToDataset을 검증한다. 값이 미리 세팅되어 있는 NPTestVO를 'test_ds'란 아이디의
 * Dataset으로 변환 한 후 Dataset값과 NPTestVO의 값들을 비교하여 타입에 따라서 값이 제대로 매핑 되는지 확인한다.</li>
 * <li>#5- Positive Case : Dataset에는 여러 개의 Record가 들어있고 한개의 Record당 한개의 VO가
 * 매핑된다. 여러개의 VO List를 Dataset으로 변환하는 경우 모든 VO의 값들이 제대로 매핑되는지 검증한다.</li>
 * <li>#6- Positive Case : Dataset의 Record의 Status값에 따라 insert, update, delete에
 * 해당하는 VO List에 매핑한 후 data 값이 제대로 매핑됐는지 검증한다.</li>
 * <li>#7- Positive Case : Dataset의 Column Name이 Underscore('_')로 되어 있고 VO의
 * Attribute Name가 CamelCase로 되어 있을 경우 isCamelCase Option을 주어 Column의 값이 VO에
 * 정상적으로 매핑되는지 검증한다.</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */
@SuppressWarnings("deprecation")
public class AnyframeNPControllerTest extends TestCase {

	/**
	 * AnyframeNPController를 상속받은 NPController를 맴버 변수로 선언한다.
	 */
	private TestNPController controller;

	/**
	 * 테스트를 위해 NPController의 인스턴스를 생성한다.
	 */
	protected void setUp() throws Exception {
		controller = new TestNPController();
	}

	/**
	 * [Flow #-1] Positive Case : AnyframeNPController를 상속 받은 NPController의
	 * process가 호출 되었을 때 AnyframeNPController의 process method에서 HttpRequest로 넘어온
	 * 사용자 입력값을 입출력 DataSetList, VariableList를 분리하는 것을 검증한다.
	 * 
	 * @throws Exception
	 */
	public void testOperaterMethodCall() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		assertNotNull("Input VariableList is null", controller.inVl);
		assertNotNull("Input DataSetList is null", controller.inDl);
		assertNotNull("Output VariableList is null", controller.outVl);
		assertNotNull("Output DataSetList is null", controller.outDl);
	}

	/**
	 * [Flow #-2] Positive Case : process method가 호출 되었을 때 AnyframeNPController를
	 * extends한 NPController의 operate가 제대로 호출 되고 결과 메세지를 output VariableList에
	 * 저장하는 것을 검증한다.
	 * 
	 * @throws Exception
	 */
	public void testResultMessage() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		assertEquals(0, controller.outVl.getInt("ErrorCode"));
		assertEquals("Request has been processed successfully", controller.outVl.getString("ErrorMsg"));
	}

	/**
	 * [Flow #-3] Positive Case : NPController의 operate method에서 Exception이 발생했을
	 * 경우 output VariableList에 Exception 메세지가 저장되는 것을 검증한다.
	 * 
	 * @throws Exception
	 */
//	public void testExceptionMessage() throws Exception {
//		MockHttpServletRequest request = new MockHttpServletRequest();
//		MockHttpServletResponse response = new MockHttpServletResponse();
//
//		request.addParameter("isException", "true");
//
//		controller.handleRequestInternal(request, response);
//
//		assertEquals(-1, controller.outVl.getInt("ErrorCode"));
//		assertEquals("exception occurs", controller.outVl.getString("ErrorMsg"));
//	}

	/**
	 * [Flow #-4] Positive Case : Sever Side Value전달 객체인 VO클래스를 NPlatform의
	 * Dataset로 변환하는 함수 convertVoToDataset을 검증한다. 값이 미리 세팅되어 있는 NPTestVO를
	 * 'test_ds'란 아이디의 Dataset으로 변환 한 후 Dataset값과 NPTestVO의 값들을 비교하여 타입에 따라서 값이
	 * 제대로 매핑 되는지 확인한다.
	 * 
	 * @throws Exception
	 */
	public void testConvertVoToDataset() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		DataSet ds = NPMapper.convertVoToDataset("test_ds", initTestVO(), true);

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

	/**
	 * [Flow #-5] Positive Case : Dataset에는 여러 개의 Record가 들어있고 한개의 Record당 한개의
	 * VO가 매핑된다. 여러개의 VO로 된 List를 Dataset으로 변환하는 경우 모든 VO의 값들이 제대로 매핑되는지 검증한다.
	 * 
	 * @throws Exception
	 */
	public void testConvertVoListToDataset() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		List<NPTestVO> voList = new ArrayList<NPTestVO>();

		voList.add(initTestVO());
		voList.add(initTestVO());
		voList.add(initTestVO());

		DataSet ds = NPMapper.convertVoListToDataset("test_ds", voList, true);

		assertEquals(3, ds.getRowCount());
		assertEquals("testString", ds.getString(0, "testString"));
		assertEquals("123", ds.getString(1, "testLong"));
		assertEquals("123", ds.getString(2, "testInt"));
		assertEquals("1.23", ds.getString(0, "testFloat"));
		assertEquals("1.23", ds.getString(1, "testDouble"));
		assertEquals("a", ds.getString(2, "testChar"));
		assertEquals("123", ds.getString(0, "testBigDecimal"));
	}

	/**
	 * [Flow #-6] Positive Case : Dataset의 Record의 Status값에 따라 insert, update,
	 * delete에 해당하는 VO List에 매핑한 후 data 값이 제대로 매핑됐는지 검증한다.
	 * 
	 * @throws Exception
	 */
	public void testConvertDatasetToListMap() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		DataSet ds = setDataset();

		Map<String, List<Object>> map = NPMapper.convertDatasetToListMap(
				MappingVO.class, ds);

		assertNotNull(map);
		assertEquals(2, map.get("insert").size());
		assertEquals(2, map.get("update").size());

		List<Object> insertVOList = map.get("insert");
		List<Object> updateVOList = map.get("update");

		MappingVO insertVO1 = (MappingVO) insertVOList.get(0);
		MappingVO insertVO2 = (MappingVO) insertVOList.get(1);
		MappingVO updateVO1 = (MappingVO) updateVOList.get(0);
		MappingVO updateVO2 = (MappingVO) updateVOList.get(1);

		assertEquals("insert1", insertVO1.getTestString());
		assertEquals("insert2", insertVO2.getTestString());
		assertEquals("update1", updateVO1.getTestString());
		assertEquals("update2", updateVO2.getTestString());
	}

	/**
	 * [Flow #-7] Positive Case : Dataset의 Column Name이 Underscore('_')로 되어 있고
	 * VO의 Attribute Name가 CamelCase로 되어 있을 경우 isCamelCase Option을 주어 Column의 값이
	 * VO에 정상적으로 매핑되는지 검증한다.
	 * 
	 * @throws Exception
	 */
	public void testConvertDatasetToListMapCamelCase() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		DataSet ds = setDatasetUnderScore();

		Map<String, List<Object>> map = NPMapper.convertDatasetToListMap(
				MappingVO.class, ds, true);

		assertNotNull(map);
		assertEquals(2, map.get("insert").size());
		assertEquals(2, map.get("update").size());

		List<Object> insertVOList = map.get("insert");
		List<Object> updateVOList = map.get("update");

		MappingVO insertVO1 = (MappingVO) insertVOList.get(0);
		MappingVO insertVO2 = (MappingVO) insertVOList.get(1);
		MappingVO updateVO1 = (MappingVO) updateVOList.get(0);
		MappingVO updateVO2 = (MappingVO) updateVOList.get(1);

		assertEquals("insert1", insertVO1.getTestString());
		assertEquals("insert2", insertVO2.getTestString());
		assertEquals("update1", updateVO1.getTestString());
		assertEquals("update2", updateVO2.getTestString());
	}

	/**
	 * 테스트를 위한 Controller 클래스
	 */
	class TestNPController extends AbstractNPController {
		private VariableList inVl;
		private DataSetList inDl;
		private VariableList outVl;
		private DataSetList outDl;

		@SuppressWarnings("unused")
		private Logger log = LoggerFactory.getLogger(TestNPController.class);

		public void operate(HttpPlatformRequest httpPlatformRequest,
				VariableList inVl, DataSetList inDl, VariableList outVl,
				DataSetList outDl) throws Exception {
			this.inVl = inVl;
			this.inDl = inDl;
			this.outVl = outVl;
			this.outDl = outDl;
		}
	}

	/**
	 * 테스트를 위한 VO클래스에 값 세팅
	 * 
	 * @return
	 */
	public NPTestVO initTestVO() {
		NPTestVO testVO = new NPTestVO();
		testVO.setTestString("testString");
		testVO.setTestLong(123l);
		testVO.setTestInt(123);
		testVO.setTestFloat(1.23f);
		testVO.setTestDouble(1.23);
		testVO.setTestChar('a');
		testVO.setTestBigDecimal(new BigDecimal("123"));
		return testVO;
	}

	/**
	 * 테스트를 위한 DataSet 세팅
	 * 
	 * @return
	 * @throws IOException
	 */
	public DataSet setDataset() throws IOException {
		DataSet allDs = new DataSet();
		allDs.setName("miptest_all");
		allDs.addColumn("testString", DataTypes.STRING);
		allDs.addColumn("testBigDecimal", DataTypes.BIG_DECIMAL);
		allDs.addColumn("testInt", DataTypes.INT);

		allDs.setConvertingToDataType(true);

		allDs.newRow();
		allDs.set(0, "testString", "nomal");
		allDs.set(0, "testBigDecimal", 1.23);
		allDs.set(0, "testInt", 123);
		allDs.setRowType(0, DataSet.ROW_TYPE_NORMAL);

		allDs.newRow();
		allDs.setRowType(1, DataSet.ROW_TYPE_UPDATED);
		allDs.set(1, "testString", "update1");
		allDs.set(1, "testBigDecimal", 4.56);
		allDs.set(1, "testInt", 456);

		allDs.newRow();
		allDs.setRowType(2, DataSet.ROW_TYPE_UPDATED);
		allDs.set(2, "testString", "update2");
		allDs.set(2, "testBigDecimal", 7.89);
		allDs.set(2, "testInt", 789);

		allDs.newRow();
		allDs.setRowType(3, DataSet.ROW_TYPE_INSERTED);
		allDs.set(3, "testString", "insert1");
		allDs.set(3, "testBigDecimal", 3.21);
		allDs.set(3, "testInt", 987);

		allDs.newRow();
		allDs.setRowType(4, DataSet.ROW_TYPE_INSERTED);
		allDs.set(4, "testString", "insert2");
		allDs.set(4, "testBigDecimal", 0.4491);
		allDs.set(4, "testInt", 4491);

		return allDs;
	}

	/**
	 * 테스트를 위한 DataSet 세팅, Dataset을 Column을 Undersocre가 포함된 문자열로 생성
	 * 
	 * @return
	 * @throws IOException
	 */
	public DataSet setDatasetUnderScore() throws IOException {
		DataSet allDs = new DataSet();
		allDs.setName("miptest_all");
		allDs.addColumn("test_string", DataTypes.STRING);
		allDs.addColumn("test_big_decimal", DataTypes.BIG_DECIMAL);
		allDs.addColumn("test_int", DataTypes.INT);

		allDs.setConvertingToDataType(true);

		allDs.newRow();
		allDs.set(0, "test_string", "nomal");
		allDs.set(0, "test_big_decimal", 1.23);
		allDs.set(0, "test_int", 123);
		allDs.setRowType(0, DataSet.ROW_TYPE_NORMAL);

		allDs.newRow();
		allDs.setRowType(1, DataSet.ROW_TYPE_UPDATED);
		allDs.set(1, "test_string", "update1");
		allDs.set(1, "test_big_decimal", 6.54);
		allDs.set(1, "test_int", 654);

		allDs.newRow();
		allDs.setRowType(2, DataSet.ROW_TYPE_UPDATED);
		allDs.set(2, "test_string", "update2");
		allDs.set(2, "test_big_decimal", 9.87);
		allDs.set(2, "test_int", 987);

		allDs.newRow();
		allDs.setRowType(3, DataSet.ROW_TYPE_INSERTED);
		allDs.set(3, "test_string", "insert1");
		allDs.set(3, "test_big_decimal", 3.21);
		allDs.set(3, "test_int", 987);

		allDs.newRow();
		allDs.setRowType(4, DataSet.ROW_TYPE_INSERTED);
		allDs.set(4, "test_string", "insert2");
		allDs.set(4, "test_big_decimal", 0.4491);
		allDs.set(4, "test_int", 4491);

		return allDs;
	}
}
