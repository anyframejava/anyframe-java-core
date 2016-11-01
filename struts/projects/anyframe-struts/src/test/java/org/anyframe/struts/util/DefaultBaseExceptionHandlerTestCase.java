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
package org.anyframe.struts.util;

import org.anyframe.struts.test.MockStrutsSpringTestCaseBase;

/**
 * @author Byunghun Woo
 * @since 2008.06.18
 */
public class DefaultBaseExceptionHandlerTestCase extends MockStrutsSpringTestCaseBase {

    /**
     * @param testName
     */
    public DefaultBaseExceptionHandlerTestCase(String testName) {
        super(testName);
    }

    public void testAuthenticationException() {
        logger.info("[Start] - testAuthenticationException");

        this.getRequest().setAttribute("DefaultException",
                "AuthenticationException");

        setRequestPathInfo("/testDefaultBaseException");
        actionPerform();

        verifyMessageArr("common.msg.authentication", "Authentication Fail - You are not logon or Session expired. Please try re-logon.");
    }

    public void testAuthorizationException() {
        logger.info("[Start] - testAuthorizationException");

        this.getRequest().setAttribute("DefaultException",
                "AuthorizationException");

        setRequestPathInfo("/testDefaultBaseException");
        actionPerform();

        //verifyActionErrors(new String[] { "common.msg.authorization.error" });
        //verifyActionMessages(new String[] { "common.msg.authorization.error" });
        verifyMessageArr("common.msg.authorization", "You can not access this page.");
    }
    
    public void testInvalideTokenException() {
        logger.info("[Start] - testInvalideTokenException");

        this.getRequest().setAttribute("DefaultException",
                "InvalidTokenException");

        setRequestPathInfo("/testDefaultBaseException");
        actionPerform();

        //verifyActionErrors(new String[] { "common.msg.invalidtoken.error" });
        //verifyActionMessages(new String[] { "common.msg.invalidtoken.error" });
        verifyMessageArr("common.msg.invalidtoken", "Your Request may be not adequate.");
    }
    
    public void testCheckedException() {
        logger.info("[Start] - testCheckedException");

        this.getRequest().setAttribute("DefaultException",
                "CheckedException");

        setRequestPathInfo("/testDefaultBaseException");
        actionPerform();

        //verifyActionErrors(new String[] { "common.msg.biz.error" });
        //verifyActionMessages(new String[] { "common.msg.biz.error" });
        verifyMessageArr("common.msg.biz", "biz error occurred.");
    }
    
    public void testUnCheckedException() {
        logger.info("[Start] - testUnCheckedException");

        this.getRequest().setAttribute("DefaultException",
                "UnCheckedException");

        setRequestPathInfo("/testDefaultBaseException");
        actionPerform();

        //verifyActionErrors(new String[] { "common.msg.fail.error" });
        //verifyActionMessages(new String[] { "common.msg.fail.error" });
        verifyMessageArr("common.msg.fail", "error occurred.");
    }

}
