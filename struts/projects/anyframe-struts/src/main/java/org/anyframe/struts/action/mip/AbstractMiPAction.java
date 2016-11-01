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

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.struts.util.mip.MiPMapper;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.slf4j.Logger;
import org.springframework.web.struts.ActionSupport;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.PlatformResponse;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;
import com.tobesoft.platform.data.Variant;

/**
 * 
 * 
 * Abstract Action Class which provide token, exception, error logging, pre/post
 * execution features.
 * <br>
 * 		<ul>
 * 			<li>getLogger	: 	Setup Logger</li>
 * 			<li>setResultMessage	: 	Set Result Message</li>
 * 			<li>Process		: 	Call Business Method</li>
 * 			<li>preProcess		: 	Check pre condition</li>
 * 			<li>postProcess		: 	Check post condidion</li>
 * 			<li>processInvalidTokenException	</li>
 * 			<li>processUnCheckedException</li>
 * 			<li>processCheckedException</li>
 * 			<li>processFinally</li>
 *  		<li>convertVoListToDataset : Convert VO List into Dataset</li>
 * 			<li>convertVOToDataset : Convert VO into Dataset</li>
 * 			<li>convertDatasetToListMap : Convert Dataset into VO List</li>
 * 		</ul>
 * 
 * @author Byunghun Woo
 */
public abstract class AbstractMiPAction extends ActionSupport {
	@SuppressWarnings("unused")
	private static String SUCCESS_MSG_CODE = "common.success";
	final public int default_encode_method = PlatformRequest.XML;
	public String default_charset = "euc-kr";
	
	Logger logger;
    /**
     * get Logger
     */
	@SuppressWarnings("deprecation")
	protected void onInit() {
		super.onInit();
		getLogger();
	}
	/**
	 * <p>
	 * Anyframe Core Delegation Util Method to get Logger
	 * </p>
	 */
	public abstract Logger getLogger();

	/**
	 * <p>
	 * This method sets result message
	 * </p>
	 * 
	 * @param out_vl
	 * 			<strong>VariableList</strong>  to contain result messages.
	 * @param code
	 * 			Error Code
	 * @param msg
	 * 			Error Message
	 */
	public void setResultMessage(VariableList out_vl, int code, String msg) {
		if (out_vl == null)
			out_vl = new VariableList();

		out_vl.addVariable("ErrorCode", new Variant(code));
		out_vl.addVariable("ErrorMsg", new Variant(msg));
	}
	
	/**
	 * <p>
	 * Process the specified Platform request, and create the corresponding
	 * Platform response (or forward to another web component that will create
	 * it), with provision for handling exceptions thrown by the business logic.
	 * Return an {@link ActionForward} instance describing where and how control
	 * should be forwarded, or <code>null</code> if the response has already
	 * been completed.
	 * </p>
	 * 
	 * <p>
	 * The default implementation attempts to forward to the  version of
	 * this method.
	 * </p>
	 * 
	 * @param mapping
	 *			The ActionMapping used to select this instance
	 * @param form
	 *			The optional ActionForm bean for this request (if any)
	 * @param request
	 * 			The Platform request we are processing
	 * @param response
	 *          The Platform response we are creating
	 * @return The forward to which control should be transferred, or
	 *         <code>null</code> if the response has been completed.
	 * @throws Exception
	 *          if the application business logic throws an exception.
	 */
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		VariableList inVl = null;
		DatasetList inDl = null;
		VariableList outVl = null;
		DatasetList outDl = null;
		
		PlatformRequest platformRequest = new PlatformRequest(request,
				default_charset);
		PlatformResponse platformResponse = new PlatformResponse(response,
				default_encode_method, default_charset);
		
		try{
			platformRequest.receiveData();

			//default_charset = platformRequest.getCharset();
			inVl = platformRequest.getVariableList();
			inDl = platformRequest.getDatasetList();
			outVl = new VariableList();
			outDl = new DatasetList();
			preProcess(platformRequest, inVl,inDl, outVl, outDl);
			String name = inVl.getValueAsString(mapping.getParameter());
			getLogger().debug(this.getClass().getName() + "." + name + " Started!");
			process(mapping, platformRequest, inVl,inDl, outVl, outDl);
			getLogger().debug(this.getClass().getName() + "." + name + " Ended!");
			postProcess(platformRequest, inVl,inDl, outVl, outDl);
			setResultMessage(outVl, 0, "save successed");
		} catch (RuntimeException uncheckedException) {
			getLogger().error("\n Action Support Exception catch!!", uncheckedException);
			setResultMessage(outVl, -1, uncheckedException.getMessage());
			processUnCheckedException(platformRequest, inVl,inDl, outVl, outDl, uncheckedException);
		} catch (Exception checkedException) {
			getLogger().error("\n Action Support Exception catch!!", checkedException);
			setResultMessage(outVl, -1, checkedException.getMessage());
			processCheckedException(platformRequest, inVl,inDl, outVl, outDl, checkedException);
		} finally {
			processFinally(platformRequest,platformResponse, inVl,inDl, outVl, outDl);
		}			
		
		return null;
	}	
	/**
	 * <p>
	 * This method which executes some pre condition actions eg.
	 * </p>
	 * @param request
	 * 			the Platform request we are processing
	 * @param inVl
	 * 			a input VariableList
	 * @param inDl
	 * 			a input DatasetList
	 * @param outVl
	 * 			a output VariableList
	 * @param outDl
	 * 			a output DatasetList
	 * @throws 	Exception
	 * 
	 */
	public void preProcess(PlatformRequest request, VariableList inVl, DatasetList inDl, VariableList outVl, DatasetList outDl) throws Exception {
		
	}
	
	/**
	 * <p>
	 * This method which executes some post condition actions eg.
	 * </p>
	 * 
	 * @param request
	 * 			the Platform request we are processing
	 * @param inVl
	 * 			a input VariableList
	 * @param inDl
	 * 			a input DatasetList
	 * @param outVl
	 * 			a output VariableList
	 * @param outDl
	 * 			a output DatasetList
	 * @throws Exception
	 */
	public void postProcess(PlatformRequest request, VariableList inVl, DatasetList inDl, VariableList outVl, DatasetList outDl) throws Exception {
//		setResultMessage(out_vl, 0,getResources(request.getHttpRequest(),"emp").getMessage(SUCCESS_MSG_CODE));
	}	

	/**
	 * <p>
	 * The basic method which execute some common condition actions 
	 * </p>
	 * 
	 * @param request
	 * 			the Platform request we are processing
	 * @param response
	 * 			the Platform response we are creating 
	 * @param inVl
	 * 			a input VariableList
	 * @param in_dl
	 * 			a input DatasetList
	 * @param out_vl
	 * 			a output VariableList
	 * @param out_dl
	 * 			a output DatasetList
	 * @throws Exception
	 */
	public void processFinally(PlatformRequest request, PlatformResponse response,VariableList inVl, DatasetList in_dl, VariableList out_vl, DatasetList out_dl) throws Exception {
		response.sendData(out_vl, out_dl);
	}

	/** 
	 * <p>
	 * When occur Exception, this method executes and sets exception message.  
	 * </p>
	 * 
	 * @param request
	 * 			the Platform request we are processing
	 * @param inVl
	 * 			a input VariableList
	 * @param in_dl
	 * 			a input DatasetList
	 * @param out_vl
	 * 			a output VariableList
	 * @param out_dl
	 * 			a output DatasetList
	 * @param checkedException
	 * 			Exception
	 * @throws Exception
	 */
	public void processCheckedException(PlatformRequest request, VariableList inVl, DatasetList in_dl, VariableList out_vl, DatasetList out_dl, Exception checkedException)
			throws Exception {
		setResultMessage(out_vl, -1, checkedException.getMessage());
	}

	/**
	 * <p>
	 * When occur RunttimeException, this method executes and sets exception message.
	 * </p>
	 * 
	 * @param request
	 * 			the Platform request we are processing
	 * @param inVl
	 * 			a input VariableList
	 * @param inDl
	 * 			a input DatasetList
	 * @param outVl
	 * 			a output VariableList
	 * @param outDl
	 * 			a output DatasetList
	 * @param unCheckedException
	 * 			RuntimeException
	 * @throws Exception
	 */
	public void processUnCheckedException(PlatformRequest request, VariableList inVl, DatasetList inDl, VariableList outVl, DatasetList outDl, Exception unCheckedException)
			throws Exception {
		setResultMessage(outVl, -1, unCheckedException.getMessage());
	}
	
	/**
	 * 
	 * <p>
	 * The abstract method which sub classes must implement
	 * </p>
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param request
	 *            The Platform request we are processing
	 * @param inVl
	 * 			a input VariableList
	 * @param inDl
	 * 			a input DatasetList
	 * @param outVl
	 * 			a output VariableList
	 * @param outDl
	 * 			a output DatasetList           
	 * @throws Exception
	 *             if the application business logic throws an exception.
	 */
	public abstract void process(ActionMapping mapping, PlatformRequest request, VariableList inVl, DatasetList inDl, VariableList outVl, DatasetList outDl) throws Exception;

	/**
	 * <p>
	 * This method converts Value Object(VO) List into Dataset(MiPlatform).
	 * <p>
	 * 
	 * @param dataSetName
	 * 			a name of Dataset
	 * @param voList
	 * 			VO List to be converted into Dataset
	 * @param isCheck
	 * 			if isCheck is 'true', when create Dataset, add check column to Dataset. 
	 * @return Dataset
	 * 
	 * @throws ServletException
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Dataset convertVoListToDataset(String dataSetName, List voList, boolean isCheck)  throws ServletException, Exception{
		Dataset dataSet = new Dataset(dataSetName);
		MiPMapper.populate(dataSet, voList, isCheck);
		return dataSet;
	}
	
	/**
	 * <p>
	 * This method converts Value Object(VO) into Dataset(MiPlatform).
	 * </p>
	 * 
	 * @param dataSetName
	 * 			a name of Dataset
	 * @param obj
	 * 			Value Object(VO) to be converted into Dataset
	 * @param isCheck
	 * 			if isCheck is 'true', when create Dataset, add check column to Dataset.
	 * @return
	 *			Dataset
	 * @throws ServletException
	 * @throws Exception
	 */
	public Dataset convertVoToDataset(String dataSetName, Object obj, boolean isCheck)  throws ServletException, Exception{
		Dataset dataSet = new Dataset(dataSetName);
		MiPMapper.populate(dataSet, obj, isCheck);
		return dataSet;
	}
	/**
	 * <p>
	 * This method converts Dataset into ListMap(VO LIST).
	 * if Dataset's status is 'insert', a key of Map is 'insert'
	 * if Dataset's status is 'update', a key of Map is 'update'
	 * if Dataset's status is 'delete', a key of Map is 'delete'
	 * </p>
	 * 
	 * @param cls
	 * 			VO Class. 
	 * @param ds
	 *			Dataset to be converted into Value Object(VO) List.
	 * @return
	 * 			HashMap
	 * @throws ServletException
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public HashMap convertDatasetToListMap(Class cls, Dataset ds)  throws ServletException, Exception{
		return MiPMapper.populateCudList(cls, ds);
	}
	/**
	 * <p>
	 * This method converts Dataset into ListMap(VO LIST).
	 * if Dataset's status is 'insert', a key of Map is 'insert'
	 * if Dataset's status is 'update', a key of Map is 'update'
	 * if Dataset's status is 'delete', a key of Map is 'delete'
	 * </p>
	 * 
	 * @param cls
	 * 			VO Class.
	 * @param ds
	 * 			Dataset to be converted into Value Object(VO) List.
	 * @param convertToCamenCase
	 * 			if Dataset's column name include '_'(underscore) and attribute names of VO are
	 * 			Camelcase, this is 'true'
	 * 			ex) Dataset's column name is 'test_sample', a attribute name of VO is 'testSample'
	 * 				this value must be true.
	 * @return HashMap
	 * @throws ServletException
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public HashMap convertDatasetToListMap(Class cls, Dataset ds, boolean convertToCamenCase)  throws ServletException, Exception{
		return MiPMapper.populateCudList(cls, ds, convertToCamenCase);
	}
	/**
	 * <p>This method gets Service in WebApplicationContext.</p>
	 * 
	 * @param name
	 * 			a name of Service which in registered to container.(Bean name or Bean id)
	 * @return Object
	 */
	@SuppressWarnings("deprecation")
	protected Object getService(String name) {
		return getWebApplicationContext().getBean(name);
	}	
}
