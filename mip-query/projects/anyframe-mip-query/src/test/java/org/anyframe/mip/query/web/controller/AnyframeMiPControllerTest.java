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
package org.anyframe.mip.query.web.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import junit.framework.TestCase;

import org.anyframe.mip.query.util.MiPMapper;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * TestCase Name : AnyframeMiPControllerTest <br>
 * <br>
 * [Description] : It is verified whether method of Controller class extending
 * AnyframeMiPController is normally called for. <br>
 * [Main Flow]
 * <ul>
 * <li>#1- Positive Case : It is verified whether user input value passing from
 * AnyframeMiPController process method to HttpRequest is separated into
 * input/output DatasetList and VariableList when process of MiPController
 * inheriting AnyframeMiPController is called for.</li>
 * <li>#2- Positive Case : It is verified whether MiPController’s operate
 * extending AnyframeMiPController is properly called for and result message is
 * stored at output VariableList.</li>
 * <li>#3- Positive Case : It is verified whether MiPController’s operate
 * extending AnyframeMiPController is properly called for and result message is
 * stored at output VariableList.</li>
 * <li>#4- Positive Case : Function convertVoToDataset is verified. The function
 * changes VO class(Sever side Value delivery object) into Dataset. It is
 * checked whether value is correctively mapped according to type by comparing
 * between Dataset value and MiPTestVO value after changing MiPTestVO whose
 * value is preset into Data whose I.D. is ‘test ds’.</li>
 * <li>#5- Positive Case : Dataset has various Records and VO is mapped per each
 * Record. In the case of changing various VO Lists into Dataset, it is verified
 * whether all VO values are correctively mapped.</li>
 * <li>#6- Positive Case : In the case where data is mapped onto VO List
 * regarding insert, update and delete according to Dataset Record Status, it is
 * verified whether data value is correctively mapped.</li>
 * <li>#7- Positive Case : In the case where Dataset Column Name is expressed
 * with Underscore(‘_’), VO Attribute Name is CamelCase, it is verified whether
 * Column value is correctively mapped by giving isCamelCase Option.</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */
public class AnyframeMiPControllerTest extends TestCase {

	/**
	 * MiPController inheriting AnyframeMiPController is declared as member
	 * variable.
	 */
	private TestMiPController controller;

	/**
	 * MiPcontroller’s instance is created for test.
	 */
	protected void setUp() throws Exception {
		controller = new TestMiPController();
	}

	/**
	 * [Flow #-1] Positive Case : When process of MiPController is called for,
	 * it is verified whether user input value from HttpRequest is separated
	 * into DatasetList and VariableList.
	 * 
	 * @throws Exception
	 */
	public void testOperaterMethodCall() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		assertNotNull("Input VariableList is null", controller.inVl);
		assertNotNull("Input DatasetList is null", controller.inDl);
		assertNotNull("Output VariableList is null", controller.outVl);
		assertNotNull("Output DatasetList is null", controller.outDl);
	}

	/**
	 * [Flow #-2] Positive Case : When process method is called for, it is
	 * verified whether operate of MiPController extending AnyframeMiPController
	 * is called for and result message is stored at output VariableList.
	 * 
	 * @throws Exception
	 */
	public void testResultMessage() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		assertEquals(new Integer(0), controller.outVl.getValue("ErrorCode")
				.getInteger());
		assertEquals("Request has been processed successfully",
				controller.outVl.getValue("ErrorMsg").getString());
	}

	/**
	 * [Flow #-3] Positive Case : In the case where Exception takes place at
	 * operate method of MiPController, it is verified whether Exception message
	 * is restored at output VaribaleList.
	 * 
	 * @throws Exception
	 */
	public void testExceptionMessage() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		request.addParameter("isException", "true");

		controller.handleRequestInternal(request, response);

		assertEquals(new Integer(-1), controller.outVl.getValue("ErrorCode")
				.getInteger());
		assertEquals("exception occurs", controller.outVl.getValue("ErrorMsg")
				.getString());
	}

	/**
	 * [Flow #-4] Positive Case : Function convertVoToDataset is verified. The
	 * function changes VO class (Sever side Value delivery object) into
	 * Dataset. It is checked whether value is correctively mapped according to
	 * type by comparing between Dataset value and MiPTestVO value after
	 * changing MiPTestVO whose value is preset into Data whose I.D. is ‘test
	 * ds’.
	 * 
	 * @throws Exception
	 */
	public void testConvertVoToDataset() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		Dataset ds = MiPMapper
				.convertVoToDataset("test_ds", initTestVO(), true);

		assertNotNull(ds);
		assertEquals("Dataset id is wrong.", "test_ds", ds.getId());

		assertEquals("testString", ds.getColumnAsString(0, "testString"));
		assertEquals("123", ds.getColumnAsString(0, "testLong"));
		assertEquals("123", ds.getColumnAsString(0, "testInt"));
		assertEquals("1.23", ds.getColumnAsString(0, "testFloat"));
		assertEquals("1.23", ds.getColumnAsString(0, "testDouble"));
		assertEquals("a", ds.getColumnAsString(0, "testChar"));
		assertEquals("123.0", ds.getColumnAsString(0, "testBigDecimal"));
	}

	/**
	 * [Flow #-5] Positive Case : Dataset has various Records and one Record has
	 * one mapped VO. In the case where List with various VOs is changed into
	 * Dataset, it is verified whether all VO values are correctively mapped.
	 * 
	 * @throws Exception
	 */
	public void testConvertVoListToDataset() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		List<MiPTestVO> voList = new ArrayList<MiPTestVO>();

		voList.add(initTestVO());
		voList.add(initTestVO());
		voList.add(initTestVO());

		Dataset ds = MiPMapper.convertVoListToDataset("test_ds", voList, true);
		ds.printDataset();

		assertEquals(3, ds.getRowCount());
		assertEquals("testString", ds.getColumnAsString(0, "testString"));
		assertEquals("123", ds.getColumnAsString(1, "testLong"));
		assertEquals("123", ds.getColumnAsString(2, "testInt"));
		assertEquals("1.23", ds.getColumnAsString(0, "testFloat"));
		assertEquals("1.23", ds.getColumnAsString(1, "testDouble"));
		assertEquals("a", ds.getColumnAsString(2, "testChar"));
		assertEquals("123.0", ds.getColumnAsString(0, "testBigDecimal"));
	}

	/**
	 * [Flow #-6] Positive Case : In the case where data is mapped onto VO List
	 * regarding insert, update and delete according to Dataset Record Status,
	 * it is verified whether data value is correctively mapped.
	 * 
	 * @throws Exception
	 */
	public void testConvertDatasetToListMap() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		Dataset ds = setDataset();

		Map<String, List<Object>> map = MiPMapper.convertDatasetToListMap(
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
	 * [Flow #-7] Positive Case : In the case where Dataset Column Name is
	 * expressed with Underscore('_') and VO Attribute Name is CamelCase, it is
	 * verified whether Column value is correctively mapped onto VO by giving
	 * isCamelCase Option.
	 * 
	 * @throws Exception
	 */
	public void testConvertDatasetToListMapCamelCase() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		controller.handleRequestInternal(request, response);

		Dataset ds = setDatasetUnderScore();
		ds.printDataset();

		Map<String, List<Object>> map = MiPMapper.convertDatasetToListMap(
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
	 * Controller class for test
	 */
	class TestMiPController extends AbstractMiPController {

		private VariableList inVl;
		private DatasetList inDl;
		private VariableList outVl;
		private DatasetList outDl;

		public void operate(PlatformRequest platformRequest, VariableList inVl,
				DatasetList inDl, VariableList outVl, DatasetList outDl)
				throws Exception {
			this.inVl = inVl;
			this.inDl = inDl;
			this.outVl = outVl;
			this.outDl = outDl;

			if (platformRequest.getHttpRequest().getParameter("isException") != null
					&& (platformRequest.getHttpRequest()
							.getParameter("isException")).equals("true")) {
				throw new Exception("exception occurs");
			}
		}
	}

	/**
	 * value setting at VO class for test
	 * 
	 * @return
	 */
	public MiPTestVO initTestVO() {
		MiPTestVO testVO = new MiPTestVO();
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
	 * Dataset setting for test
	 * 
	 * @return
	 * @throws IOException
	 */
	public Dataset setDataset() throws IOException {
		Dataset allDs = new Dataset();
		allDs.setDataSetID("miptest_all");
		allDs.addStringColumn("testString");
		allDs.addDecimalColumn("testBigDecimal");
		allDs.addIntegerColumn("testInt");

		allDs.appendRow();
		allDs.setColumn(0, "testString", "nomal");
		allDs.setColumn(0, "testBigDecimal", 1.23);
		allDs.setColumn(0, "testInt", 123);

		allDs.appendRow();
		allDs.setColumn(1, "testString", "beforeUpdate1");
		allDs.setColumn(1, "testBigDecimal", 4.56);
		allDs.setColumn(1, "testInt", 456);

		allDs.appendRow();
		allDs.setColumn(2, "testString", "beforeUpdate2");
		allDs.setColumn(2, "testBigDecimal", 7.89);
		allDs.setColumn(2, "testInt", 789);

		allDs.setUpdate(true);
		allDs.setColumn(1, "testString", "update1");
		allDs.setColumn(1, "testBigDecimal", 6.54);
		allDs.setColumn(1, "testInt", 654);

		allDs.setColumn(2, "testString", "update2");
		allDs.setColumn(2, "testBigDecimal", 9.87);
		allDs.setColumn(2, "testInt", 987);

		allDs.insertRow(3);
		allDs.setColumn(3, "testString", "insert1");
		allDs.setColumn(3, "testBigDecimal", 3.21);
		allDs.setColumn(3, "testInt", 987);

		allDs.insertRow(4);
		allDs.setColumn(4, "testString", "insert2");
		allDs.setColumn(4, "testBigDecimal", 0.4491);
		allDs.setColumn(4, "testInt", 4491);

		return allDs;
	}

	/**
	 * Dataset setting for test and Dataset and Column are created as string
	 * including Underscore.
	 * 
	 * @return
	 * @throws IOException
	 */
	public Dataset setDatasetUnderScore() throws IOException {
		Dataset allDs = new Dataset();
		allDs.setDataSetID("miptest_all");
		allDs.addStringColumn("test_string");
		allDs.addDecimalColumn("test_big_decimal");
		allDs.addIntegerColumn("test_int");

		allDs.appendRow();
		allDs.setColumn(0, "test_string", "nomal");
		allDs.setColumn(0, "testBigDecimal", 1.23);
		allDs.setColumn(0, "test_int", 123);

		allDs.appendRow();
		allDs.setColumn(1, "test_string", "beforeUpdate1");
		allDs.setColumn(1, "test_big_decimal", 4.56);
		allDs.setColumn(1, "test_int", 456);

		allDs.appendRow();
		allDs.setColumn(2, "test_string", "beforeUpdate2");
		allDs.setColumn(2, "test_big_decimal", 7.89);
		allDs.setColumn(2, "test_int", 789);

		allDs.setUpdate(true);
		allDs.setColumn(1, "test_string", "update1");
		allDs.setColumn(1, "test_big_decimal", 6.54);
		allDs.setColumn(1, "test_int", 654);

		allDs.setColumn(2, "test_string", "update2");
		allDs.setColumn(2, "test_big_decimal", 9.87);
		allDs.setColumn(2, "test_int", 987);

		allDs.insertRow(3);
		allDs.setColumn(3, "test_string", "insert1");
		allDs.setColumn(3, "test_big_decimal", 3.21);
		allDs.setColumn(3, "test_int", 987);

		allDs.insertRow(4);
		allDs.setColumn(4, "test_string", "insert2");
		allDs.setColumn(4, "test_big_decimal", 0.4491);
		allDs.setColumn(4, "test_int", 4491);

		return allDs;
	}
}
