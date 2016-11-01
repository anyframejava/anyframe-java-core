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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.exception.BaseException;
import org.anyframe.struts.action.AbstractActionSupport;
import org.anyframe.struts.action.DefaultActionUtil;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.slf4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.MessageSource;


/**
 * DefaultExceptionTestAction is for testing DefaultException
 *
 * @author Byunghun Woo
 *
 */

public class DefaultBaseExceptionHandlerTestAction extends AbstractActionSupport {

    /**
     * Method execute
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
    public ActionForward process(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // AuthenticationException Test
        if (request.getAttribute("DefaultException").equals(
                "AuthenticationException")) {
            throw new AuthenticationException();
        }
        // AuthorizationException Test
        else if (request.getAttribute("DefaultException").equals(
                "AuthorizationException")) {
            throw new AuthorizationException();
        }
        // InvalidTokenException Test
        else if (request.getAttribute("DefaultException").equals(
                "InvalidTokenException")) {
        	throw new InvalidTokenException("common.msg.invalidtoken");
        }
        // CheckedException Test
        else if (request.getAttribute("DefaultException").equals(
                "CheckedException")) {
        	ApplicationContext context = getWebApplicationContext();
    		MessageSource messageSource = (MessageSource)context.getBean("messageSource");

            throw new BaseException(messageSource, "common.msg.biz");
        }
        // UnCheckedException Test
        else if (request.getAttribute("DefaultException").equals(
                "UnCheckedException")) {
            throw new Exception();
        }

        return null;
    }

	public Logger getLogger() throws Exception {
		return DefaultActionUtil.getLogger(this.getClass().getName());
	}
}
