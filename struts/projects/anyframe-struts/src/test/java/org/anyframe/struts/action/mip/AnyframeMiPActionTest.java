/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.struts.action.mip;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;

import junit.framework.TestCase;

import org.anyframe.struts.action.DefaultActionMapping;
import org.apache.struts.action.ActionMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * TestCase Name : AnyframeMiPControllerTest <br>
 * <br>
 * [Description] : Verified is whether the method of Controller class extending
 * AnyframeMiPController is called for in the normal fashion. <br>
 * [Main Flow]
 * <ul>
 * <li>#1- Positive Case : When MiPAction excute inheriting AnyframeMiPAction is
 * called for, verified is the separation of user input value passing from
 * AnyframeMiPAction excute method to HttpRequest from input/ouptput DtasetList
 * and VariableList.</li>
 * <li>#2- Positive Case : When execute method is called, verified is whether
 * MiPControllers process extending AnyframeMiPAction is properly called for and
 * the result message is stored in output VariableList.</li>
 * <li>#3- Positive Case : When Exception takes place at MiPAction’s process
 * method, verified is whether Exception message is stored at output
 * VariableList.</li>
 * <li>#4- Positive Case : Verified is covertVoToDataset, a function changing VO
 * class, Sever Side Value delivery object to Dataset of MiPlatform. After
 * transforming MiPTestVo whose value is already set into Dataset whose I.D. is
 * ‘test ds’, checked is whether Dataset and MiPTestVO values are properly
 * mapped according to their types with value comparison.</li>
 * <li>#5- Positive Case : Data set has various Records and one VO per one
 * record is mapped. In the case where various VO lists are changed into
 * Dataset, all VO values are verified for proper mapping.</li>
 * <li>#6- Positive Case : According to Status value of Dataset’s Record,
 * relevant VO lists regarding insert, update, and delete are mapped and data
 * values are verified for proper mapping.</li>
 * <li>#7- Positive Case : In the case where Dataset’s Column Name is expressed
 * with Underscore(‘ ‘) and VO’s Attribute Name is expressed as CamelCase,
 * verified is whether Column’s value is properly mapped into VO by giving an
 * isCamelCae Option.</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */
public class AnyframeMiPActionTest extends TestCase {

	/**
	 * MiPAction inheriting AnyframeMiPActopm is declared as Member Variable.
	 */
    private MiPAction action;

	/**
	 * Instance of MiPController is created for test.
	 */
    protected void setUp() throws Exception {
    	action = new MiPAction();
    }

	/**
	 * [Flow #-1] Positive Case : When MiPAction’s excute inheriting
	 * AnyframeMiPAction is called for, verified is the separation of user input
	 * value delivered to HttpRequest from input/output DatasetList,
	 * VariableList.
	 * 
	 * @throws Exception
	 */
    public void testProcessMethodCall() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        DefaultActionMapping mapping = new DefaultActionMapping();
        action.execute( mapping, null , request, response);

        assertNotNull("Input VariableList is null", action.inVl);
        assertNotNull("Input DatasetList is null",action.inDl);
        assertNotNull("Output VariableList is null",action.outVl);
        assertNotNull("Output DatasetList is null",action.outDl);
    }

	/**
	 * [Flow #-2] Positive Case : When process method is called for, verified is
	 * whether MiPController’s operate extending AnyframeMiPController is
	 * properly called for and message is stored in output VariableList.
	 * 
	 * @throws Exception
	 */
    public void testResultMessage() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        DefaultActionMapping mapping = new DefaultActionMapping();
        action.execute( mapping, null , request, response);
        
        assertEquals(new Integer(0), action.outVl.getValue("ErrorCode").getInteger());
        assertEquals("save successed", action.outVl.getValue("ErrorMsg").getString());
    }

	/**
	 * [Flow #3] Positive Case : When Exception takes place at MiPaction’s
	 * process method, verified is whether Exception message is stored in output
	 * VaeiableList.
	 * 
	 * @throws Exception
	 */
    public void testExceptionMessage() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        request.setParameter("isException", "true" );
        
        DefaultActionMapping mapping = new DefaultActionMapping();
        action.execute( mapping, null , request, response);
        
        assertEquals(new Integer(-1), action.outVl.getValue("ErrorCode").getInteger());
        assertEquals("exception occurs", action.outVl.getValue("ErrorMsg").getString());
    }

	/**
	 * [Flow #-4] Positive Case : Verified is covertVoToDataset, a function
	 * changing VO class, Sever Side Value delivery object to Dataset of
	 * MiPlatform. After transforming MiPTestVo whose value is already set into
	 * Dataset whose I.D. is ‘test ds’, checked is whether Dataset and MiPTestVO
	 * values are properly mapped according to their types with value
	 * comparison.
	 * 
	 * @throws Exception
	 */
    public void testConvertVoToDataset() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        DefaultActionMapping mapping = new DefaultActionMapping();
        action.execute( mapping, null , request, response);
        
        Dataset ds = action.convertVoToDataset("test_ds",  initTestVO(), true);
        
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
	 * [Flow #-5] Positive Case : Dataset has various Records and one VO per one
	 * record is mapped. In the case where various VO lists are changed into
	 * Dataset, all VO values are verified for proper mapping.
	 * 
	 * @throws Exception
	 */
    public void testConvertVoListToDataset() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        DefaultActionMapping mapping = new DefaultActionMapping();
        action.execute( mapping, null , request, response);
        
        ArrayList<MiPTestVO> voList = new ArrayList<MiPTestVO>();
        
        voList.add(initTestVO());
        voList.add(initTestVO());
        voList.add(initTestVO());
        
        Dataset ds = action.convertVoListToDataset("test_ds", voList, true);
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
	 * [Flow #-6] Positive Case : According to Status value of Dataset’s Record,
	 * relevant VO lists regarding insert, update, and delete are mapped and
	 * data values are verified for proper mapping.
	 * 
	 * @throws Exception
	 */
    @SuppressWarnings("unchecked")
	public void testConvertDatasetToListMap() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        DefaultActionMapping mapping = new DefaultActionMapping();
        action.execute( mapping, null , request, response);
        
        Dataset ds = setDataset();
        
        HashMap hashMap = action.convertDatasetToListMap( MappingVO.class , ds);
        
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
	 * [Flow #-7] Positive Case : In the case where Dataset’s Column Name is
	 * expressed with Underscore(‘ ‘) and VO’s Attribute Name is expressed as
	 * CamelCase, verified is whether Column’s value is properly mapped into VO
	 * by giving an isCamelCae Option.
	 * 
	 * @throws Exception
	 */
    @SuppressWarnings("unchecked")
	public void testConvertDatasetToListMapCamelCase() throws Exception{
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        
        DefaultActionMapping mapping = new DefaultActionMapping();
        action.execute( mapping, null , request, response);
        
        Dataset ds = setDatasetUnderScore();
        ds.printDataset();
        
        HashMap hashMap = action.convertDatasetToListMap( MappingVO.class , ds, true);
        
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
	 * Action Class for Test
	 * 
	 */
    class MiPAction extends AbstractMiPAction{
        private VariableList inVl;
        private DatasetList inDl;
        private VariableList outVl;
        private DatasetList outDl;
        
		public Logger getLogger() {
			return LoggerFactory.getLogger(MiPAction.class);
		}

		public void process(ActionMapping mapping, PlatformRequest request,
				VariableList inVl, DatasetList inDl, VariableList outVl,
				DatasetList outDl) throws Exception {
			this.inVl = inVl;
			this.inDl = inDl;
			this.outVl = outVl;
			this.outDl = outDl;

			if (request.getHttpRequest().getParameter("isException") != null
					&& (request.getHttpRequest().getParameter("isException")).equals("true")) {
				throw new Exception("exception occurs");
			}
		}
	}

	/**
	 * Value Setting on VO Class for Test
	 * 
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
	 * Dataset Setting for Test
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
	 * Within Dataset setting for test, column including Underscore is created
	 * as string.
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
