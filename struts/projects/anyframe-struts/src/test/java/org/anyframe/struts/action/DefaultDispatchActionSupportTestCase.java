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

import org.anyframe.struts.test.MockStrutsSpringTestCaseBase;
import org.apache.struts.util.MessageResources;



/**
 * DefaultDispatchActionSupportTestCase is for testing DefaultDispatchActionSupport
 * 
 * @author Byunghun Woo
 * @since 2008.06.18
 */
public class DefaultDispatchActionSupportTestCase extends MockStrutsSpringTestCaseBase {
	
    protected static MessageResources messages = MessageResources
    .getMessageResources("org.apache.struts.actions.LocalStrings");

    /**
     * @param testName
     */
    public DefaultDispatchActionSupportTestCase(String testName) {
        super(testName);
    }

    public void testDefaultDispatchActionSupportNormal() {
        logger.info("[Start] - testDefaultDispatchActionSupportNormal");

        setRequestPathInfo("/testDefaultDispatchActionSupport");
        addRequestParameter("method", "testMethod");
        
        actionPerform();

        verifyForward("success");
        verifyNoActionMessages();
    }
    
    public void testDefaultDispatchActionSupportNoParameter() {
        logger.info("[Start] - testDefaultDispatchActionSupportNoParameter");
        
        setRequestPathInfo("/testDefaultDispatchActionSupportNoParameter");
        
       	actionPerform();
       	verifyMessageArr("common.msg.dispatch", 
       			messages.getMessage("dispatch.handler", "/testDefaultDispatchActionSupportNoParameter"), 2);
    }
    
    public void testDefaultDispatchActionSupportUnSpecified() {
        logger.info("[Start] - testDefaultDispatchActionSupportUnSpecified");
        
        setRequestPathInfo("/testDefaultDispatchActionSupport");
        
       	actionPerform();
       	verifyMessageArr("common.msg.dispatch", 
       			messages.getMessage("dispatch.parameter", "/testDefaultDispatchActionSupport", "method"), 2);
    }
    
    public void testDefaultDispatchActionSupportPreventMethodName() {
        logger.info("[Start] - testDefaultDispatchActionSupportPreventMethodName");
        
        setRequestPathInfo("/testDefaultDispatchActionSupport");
        addRequestParameter("method", "perform");
        actionPerform();
        
       	verifyMessageArr("common.msg.dispatch", 
       			messages.getMessage("dispatch.recursive", "/testDefaultDispatchActionSupport", "method"), 2);
    }
    
    public void testDefaultDispatchActionSupportNoSuchMethod() {
        logger.info("[Start] - testDefaultDispatchActionSupportNoSuchMethod");
        
        setRequestPathInfo("/testDefaultDispatchActionSupport");
        addRequestParameter("method", "notexistMethod");
        actionPerform();
        
        //verifyActionMessages(new String[] { "dispatch.method" });
       	verifyMessageArr("common.msg.dispatch", "dispatch error occurred.");
    }
    
    public void testDefaultDispatchActionSupportClassCastException() {
        logger.info("[Start] - testDefaultDispatchActionSupportClassCastException");
        
        setRequestPathInfo("/testDefaultDispatchActionSupport");
        addRequestParameter("method", "exceptionTest");
        this.getRequest().setAttribute("exception", "ClassCastException");
        actionPerform();
        
       	verifyMessageArr("common.msg.dispatch", "dispatch error occurred.");
    }
    
    public void testDefaultDispatchActionSupportIllegalAccessException() {
        logger.info("[Start] - testDefaultDispatchActionSupportIllegalAccessException");
        
        setRequestPathInfo("/testDefaultDispatchActionSupport");
        addRequestParameter("method", "exceptionTest");
        this.getRequest().setAttribute("exception", "IllegalAccessException");
        actionPerform();
        
       	verifyMessageArr("common.msg.dispatch", "dispatch error occurred.");
    }
    
    public void testDefaultDispatchActionSupportInvocationTargetException() {
        logger.info("[Start] - testDefaultDispatchActionSupportInvocationTargetException");
        
        setRequestPathInfo("/testDefaultDispatchActionSupport");
        addRequestParameter("method", "exceptionTest");
        this.getRequest().setAttribute("exception", "InvocationTargetException");
        actionPerform();
        
       	verifyMessageArr("common.msg.dispatch", "dispatch error occurred.");
    }
    
    public void testDefaultDispatchActionSupportInvocationTargetExceptionThrowable() {
        logger.info("[Start] - testDefaultDispatchActionSupportInvocationTargetExceptionThrowable");
        
        setRequestPathInfo("/testDefaultDispatchActionSupport");
        addRequestParameter("method", "exceptionTest");
        this.getRequest().setAttribute("exception", "InvocationTargetExceptionThrowable");
        actionPerform();
        
       	verifyMessageArr("common.msg.dispatch", "dispatch error occurred.");
    }



}
