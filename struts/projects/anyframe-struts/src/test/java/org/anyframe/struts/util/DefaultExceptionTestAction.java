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

import org.anyframe.struts.action.DefaultAction;
import org.anyframe.struts.util.AuthenticationException;
import org.anyframe.struts.util.AuthorizationException;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;


/**
 * DefaultExceptionTestAction is for testing DefaultException
 * 
 * @author Byunghun Woo
 */
public class DefaultExceptionTestAction extends DefaultAction {

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
    public ActionForward execute(ActionMapping mapping, ActionForm form,
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

        return null;
    }
}
