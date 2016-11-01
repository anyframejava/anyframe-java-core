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

/**
 * DefaultActionSupportTestCase is for testing DefaultActionSupport
 *  
 * @author Byunghun Woo
 * @since 2008.06.18
 */
public class DefaultActionSupportTestCase extends MockStrutsSpringTestCaseBase {

    /**
     * @param testName
     */
    public DefaultActionSupportTestCase(String testName) {
        super(testName);
    }

    public void testDefaultActionSupportNormal() {
        logger.info("[Start] - testDefaultActionSupportNormal");

        // subject �� null�� ���
        addRequestParameter("key1", "value1");
        addRequestParameter("key2", "value2");
        setRequestPathInfo("/testDefaultActionSupportNormal");
        actionPerform();

        verifyForward("success");
        verifyNoActionMessages();
    }
    
    public void testDefaultActionSupportCheckedException() {
        logger.info("[Start] - testDefaultActionSupportCheckedException");
        
        this.getRequest().setAttribute("DefaultException", "CheckedException");
        setRequestPathInfo("/testDefaultActionSupportCheckedException");
        actionPerform();
		
        verifyActionMessages(new String[] { "common.msg.biz" });
    }

    public void testDefaultActionSupportUnCheckedException() {
        logger.info("[Start] - testDefaultActionSupportUnCheckedException");
        
        this.getRequest().setAttribute("DefaultException", "UnCheckedException");
        setRequestPathInfo("/testDefaultActionSupportUnCheckedException");
        actionPerform();
		
        verifyActionMessages(new String[] { "common.msg.fail" });
    }


}
