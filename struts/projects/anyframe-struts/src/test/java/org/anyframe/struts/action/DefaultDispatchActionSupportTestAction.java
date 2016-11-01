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
package org.anyframe.struts.action;

import java.lang.reflect.InvocationTargetException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.slf4j.Logger;

/**
 * DefaultDispatchActionSupportTestAction is for testing DefaultDispatchActionSupport
 * 
 * @author $Author: soyon.lim $
 * @version $Revision: 1.2 $, $Date: 2005/07/05 04:31:21 $
 */
public class DefaultDispatchActionSupportTestAction extends DefaultDispatchActionSupport {

    /**
     * Method process
     * 
     * @param ActionMapping
     *            mapping
     * @param ActionForm
     *            form
     * @param HttpServletRequest
     *            request
     * @param HttpServletResponse
     *            response
     * @return ActionForward
     * @throws Exception
     */
    public ActionForward testMethod(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // nothing to do
        return (mapping.findForward("success"));
    }
    
    /**
     * Prevent recursive calls test
     */
    public ActionForward perform(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // nothing to do
        return (mapping.findForward("success"));
    }
    
    /**
     * In Progress Exception test
     */
    public ActionForward exceptionTest(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
    	
    	String exception = (String)request.getAttribute("exception");
    	
        if ("ClassCastException".equals(exception)) {
            throw new ClassCastException();
        } else if ("IllegalAccessException".equals(exception)) {
            throw new IllegalAccessException();
        } else if ("InvocationTargetException".equals(exception)) {
            throw new InvocationTargetException(new Exception());
        } else if ("InvocationTargetExceptionThrowable".equals(exception)) {
            throw new InvocationTargetException(new Throwable());
        } else {
        	//
        }
        
        // nothing to do
        return (mapping.findForward("success"));
    }

	public Logger getLogger() throws Exception {
		return DefaultActionUtil.getLogger(this.getClass().getName());
	}
}
