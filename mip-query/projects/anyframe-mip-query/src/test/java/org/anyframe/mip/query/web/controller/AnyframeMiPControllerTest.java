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
import java.util.HashMap;

import junit.framework.TestCase;

import org.anyframe.mip.query.util.MiPMapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * TestCase Name : AnyframeMiPControllerTest <br>
 * <br>
 * [Description] : AnyframeMiPController를 확장한 Controller 클래스의 메소드가 정상적으로 호출 되는지
 * 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#1- Positive Case : AnyframeMiPController를 상속 받은 MiPController의 process가
 * 호출 되었을 때 AnyframeMiPController의 process method에서 HttpRequest로 넘어온 사용자 입력값을
 * 입출력 DatasetList, VariableList를 분리하는 것을 검증한다.</li>
 * <li>#2- Positive Case : process method가 호출 되었을 때 AnyframeMiPController를
 * extends한 MiPController의 operate가 제대로 호출 되고 결과 메세지를 output VariableList에 저장하는
 * 것을 검증한다.</li>
 * <li>#3- Positive Case : MiPController의 operate method에서 Exception이 발생했을 경우
 * output VariableList에 Exception 메세지가 저장되는 것을 검증한다.</li>
 * <li>#4- Positive Case : Sever Side Value전달 객체인 VO클래스를 MiPlatform의 Dataset로
 * 변환하는 함수 convertVoToDataset을 검증한다. 값이 미리 세팅되어 있는 MiPTestVO를 'test_ds'란 아이디의
 * Dataset으로 변환 한 후 Dataset값과 MiPTestVO의 값들을 비교하여 타입에 따라서 값이 제대로 매핑 되는지 확인한다.</li>
 * <li>#5- Positive Case : Dataset에는 여러 개의 Record가 들어있고 한개의 Record당 한개의 VO가
 * 매핑된다. 여러개의 VO List를 Dataset으로 변환하는 경우 모든 VO의 값들이 제대로 매핑되는지 검증한다.</li>
 * <li>#6- Positive Case : Dataset의 Record의 Status값에 따라 insert, update, delete에
 * 해당하는 VO List에 매핑한 후 data 값이 제대로 매핑됐는지 검증한다.</li>
 * <li>#7- Positive Case : Dataset의 Column Name이 Underscore('_')로 되어 있고 VO의 Attribute
 * Name가 CamelCase로 되어 있을 경우 isCamelCase Option을 주어 Column의 값이 VO에 정상적으로
 * 매핑되는지 검증한다.</li>
 * </ul>
 * @author Jonghoon Kim
 */
public class AnyframeMiPControllerTest extends TestCase {
	
	/**
	 * AnyframeMiPController를 상속받은 MiPController를 맴버 변수로 선언한다.
	 */
    private TestMiPController controller;

    /**
     * 테스트를 위해 MiPController의 인스턴스를 생성한다.
     */
    protected void setUp() throws Exception {
            controller = new TestMiPController();
    }

    /**
	 * [Flow #-1] Positive Case : AnyframeMiPController를 상속 받은
	 * MiPController의 process가 호출 되었을 때 AnyframeMiPController의 process method에서
	 * HttpRequest로 넘어온 사용자 입력값을 입출력 DatasetList, VariableList를 분리하는 것을 검증한다.
	 * 
	 * @throws Exception
	 */
    public void testOperaterMethodCall() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        controller.handleRequestInternal(request, response);

        assertNotNull("Input VariableList is null", controller.inVl);
        assertNotNull("Input DatasetList is null",controller.inDl);
        assertNotNull("Output VariableList is null",controller.outVl);
        assertNotNull("Output DatasetList is null",controller.outDl);
    }
    
    /**
	 * [Flow #-2] Positive Case : process method가 호출 되었을 때
	 * AnyframeMiPController를 extends한 MiPController의 operate가 제대로 호출 되고 결과 메세지를
	 * output VariableList에 저장하는 것을 검증한다.
	 * 
	 * @throws Exception
	 */
    public void testResultMessage() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        controller.handleRequestInternal(request, response);
        
        assertEquals(new Integer(0), controller.outVl.getValue("ErrorCode").getInteger());
        assertEquals("save successed", controller.outVl.getValue("ErrorMsg").getString());
    }
    
    /**
	 * [Flow #-3] Positive Case : MiPController의 operate method에서 Exception이
	 * 발생했을 경우 output VariableList에 Exception 메세지가 저장되는 것을 검증한다.
	 * 
	 * @throws Exception
	 */
    public void testExceptionMessage() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        request.addParameter("isException", "true" );
        
        controller.handleRequestInternal(request, response);
        
        assertEquals(new Integer(-1), controller.outVl.getValue("ErrorCode").getInteger());
        assertEquals("exception occurs", controller.outVl.getValue("ErrorMsg").getString());
    }
    
    /**
	 * [Flow #-4] Positive Case : Sever Side Value전달 객체인 VO클래스를 MiPlatform의
	 * Dataset로 변환하는 함수 convertVoToDataset을 검증한다. 값이 미리 세팅되어 있는 MiPTestVO를
	 * 'test_ds'란 아이디의 Dataset으로 변환 한 후 Dataset값과 MiPTestVO의 값들을 비교하여
	 * 타입에 따라서 값이 제대로 매핑 되는지 확인한다.
	 * 
	 * @throws Exception
	 */
    public void testConvertVoToDataset() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        controller.handleRequestInternal(request, response);
        
        Dataset ds = MiPMapper.convertVoToDataset("test_ds",  initTestVO(), true);
        
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
	 * [Flow #-5] Positive Case : Dataset에는 여러 개의 Record가 들어있고 한개의 Record당 한개의
	 * VO가 매핑된다. 여러개의 VO로 된 List를 Dataset으로 변환하는 경우 모든 VO의 값들이 제대로 매핑되는지 검증한다.
	 * 
	 * @throws Exception
	 */
    public void testConvertVoListToDataset() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        controller.handleRequestInternal(request, response);
        
        ArrayList voList = new ArrayList();
        
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
	 * [Flow #-6] Positive Case : Dataset의 Record의 Status값에 따라 insert, update,
	 * delete에 해당하는 VO List에 매핑한 후 data 값이 제대로 매핑됐는지 검증한다.
	 * 
	 * @throws Exception
	 */
    public void testConvertDatasetToListMap() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        controller.handleRequestInternal(request, response);
        
        Dataset ds = setDataset();
        
        HashMap hashMap = MiPMapper.convertDatasetToListMap( MappingVO.class , ds);
        
        assertNotNull(hashMap);
        assertEquals(2, ((ArrayList)hashMap.get("insert")).size());
        assertEquals(2, ((ArrayList)hashMap.get("update")).size());
        
        ArrayList insertVOList =  (ArrayList)hashMap.get("insert");
        ArrayList updateVOList =  (ArrayList)hashMap.get("update");
        
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
    public void testConvertDatasetToListMapCamelCase() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        controller.handleRequestInternal(request, response);
        
        Dataset ds = setDatasetUnderScore();
        ds.printDataset();
        
        HashMap hashMap = MiPMapper.convertDatasetToListMap( MappingVO.class , ds, true);
        
        assertNotNull(hashMap);
        assertEquals(2, ((ArrayList)hashMap.get("insert")).size());
        assertEquals(2, ((ArrayList)hashMap.get("update")).size());
        
        ArrayList insertVOList =  (ArrayList)hashMap.get("insert");
        ArrayList updateVOList =  (ArrayList)hashMap.get("update");
        
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
    class TestMiPController extends AbstractMiPController{
    
        private VariableList inVl;
        private DatasetList inDl;
        private VariableList outVl;
        private DatasetList outDl;
        
        private Log log =
            LogFactory.getLog(TestMiPController.class);

        public void operate(PlatformRequest platformRequest, VariableList inVl,
                DatasetList inDl, VariableList outVl, DatasetList outDl)
                throws Exception {
            this.inVl = inVl;
            this.inDl = inDl;
            this.outVl = outVl;
            this.outDl = outDl;
           
            if(platformRequest.getHttpRequest().getParameter("isException") != null && (platformRequest.getHttpRequest().getParameter("isException")).equals("true")){
                throw new Exception("exception occurs");
            }
        }
    }
    
    /**
     * 테스트를 위한 VO클래스에 값 세팅
     * @return
     */
    public MiPTestVO initTestVO(){
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
     * 테스트를 위한 Dataset 세팅
     * @return
     * @throws IOException
     */
    public Dataset setDataset() throws IOException{
        Dataset allDs = new Dataset();
        allDs.setDataSetID("miptest_all");
        allDs.addStringColumn("testString");
        allDs.addDecimalColumn("testBigDecimal");
        allDs.addIntegerColumn("testInt");
        
        allDs.appendRow();
        allDs.setColumn(0,"testString", "nomal");
        allDs.setColumn(0, "testBigDecimal", 1.23);
        allDs.setColumn(0,"testInt", 123);
        
        allDs.appendRow();
        allDs.setColumn(1,"testString", "beforeUpdate1");
        allDs.setColumn(1, "testBigDecimal", 4.56);
        allDs.setColumn(1,"testInt", 456);
        
        allDs.appendRow();
        allDs.setColumn(2,"testString", "beforeUpdate2");
        allDs.setColumn(2, "testBigDecimal", 7.89);
        allDs.setColumn(2,"testInt", 789);
        
        allDs.setUpdate(true);
        allDs.setColumn(1,"testString", "update1");
        allDs.setColumn(1, "testBigDecimal", 6.54);
        allDs.setColumn(1,"testInt", 654);
        
        allDs.setColumn(2,"testString", "update2");
        allDs.setColumn(2, "testBigDecimal", 9.87);
        allDs.setColumn(2,"testInt",987);
        
        allDs.insertRow(3);
        allDs.setColumn(3,"testString", "insert1");
        allDs.setColumn(3, "testBigDecimal", 3.21);
        allDs.setColumn(3,"testInt",987);
        
        allDs.insertRow(4);
        allDs.setColumn(4,"testString", "insert2");
        allDs.setColumn(4, "testBigDecimal", 0.4491);
        allDs.setColumn(4,"testInt", 4491);
        
        return allDs;
    }
    
    /**
     * 테스트를 위한 Datsset 세팅, Dataset을 Column을 Undersocre가 포함된 문자열로 생성
     * @return
     * @throws IOException
     */
    public Dataset setDatasetUnderScore() throws IOException{
        Dataset allDs = new Dataset();
        allDs.setDataSetID("miptest_all");
        allDs.addStringColumn("test_string");
        allDs.addDecimalColumn("test_big_decimal");
        allDs.addIntegerColumn("test_int");
        
        allDs.appendRow();
        allDs.setColumn(0,"test_string", "nomal");
        allDs.setColumn(0, "testBigDecimal", 1.23);
        allDs.setColumn(0,"test_int", 123);
        
        allDs.appendRow();
        allDs.setColumn(1,"test_string", "beforeUpdate1");
        allDs.setColumn(1, "test_big_decimal", 4.56);
        allDs.setColumn(1,"test_int", 456);
        
        allDs.appendRow();
        allDs.setColumn(2,"test_string", "beforeUpdate2");
        allDs.setColumn(2, "test_big_decimal", 7.89);
        allDs.setColumn(2,"test_int", 789);
        
        allDs.setUpdate(true);
        allDs.setColumn(1,"test_string", "update1");
        allDs.setColumn(1, "test_big_decimal", 6.54);
        allDs.setColumn(1,"test_int", 654);
        
        allDs.setColumn(2,"test_string", "update2");
        allDs.setColumn(2, "test_big_decimal", 9.87);
        allDs.setColumn(2,"test_int",987);
        
        allDs.insertRow(3);
        allDs.setColumn(3,"test_string", "insert1");
        allDs.setColumn(3, "test_big_decimal", 3.21);
        allDs.setColumn(3,"test_int",987);
        
        allDs.insertRow(4);
        allDs.setColumn(4,"test_string", "insert2");
        allDs.setColumn(4, "test_big_decimal", 0.4491);
        allDs.setColumn(4,"test_int", 4491);
        
        return allDs;
    }
}
