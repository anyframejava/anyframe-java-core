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

import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

import javax.security.auth.Subject;
import javax.servlet.http.HttpSession;

import org.anyframe.struts.test.MockStrutsSpringTestCaseBase;


import com.tagish.auth.TypedPrincipal;

/**
 * DefaultRequestProcessorTestCase is for testing DefaultRequestProcessor
 * 
 * @author Byunghun Woo
 * @since 2008.06.18
 */
public class DefaultRequestProcessorTestCase extends MockStrutsSpringTestCaseBase {

    /**
     * @param testName
     */
    public DefaultRequestProcessorTestCase(String testName) {
        super(testName);
    }

    public void testDefaultRequestProcessorAnon() {
        logger.info("[Start] - testDefaultRequestProcessorAnon");

        addRequestParameter("key1", "value1");
        addRequestParameter("key2", "value2");
        setRequestPathInfo("/testDefaultRequestProcessor");
        actionPerform();

        assertEquals("euc-kr", this.getRequest().getCharacterEncoding());

        HttpSession session = this.getRequest().getSession();
        Locale currentLocale = this.getRequest().getLocale();

        assertEquals(currentLocale, session
                .getAttribute("org.apache.struts.action.LOCALE"));

    }

    @SuppressWarnings("unchecked")
    public void testDefaultRequestProcessorNormalUserRole() {
        logger.info("[Start] - testDefaultRequestProcessorNormalUserRole");

        Subject subject = null;
        Set principals = new HashSet();
        Set credentials = new HashSet();

        principals.add(new TypedPrincipal("USER", TypedPrincipal.GROUP));
        subject = new Subject(false, principals, credentials, credentials);

        this.getSession().setAttribute("subject", subject);

        addRequestParameter("username", "normaluser");
        addRequestParameter("password", "normaluserpasswd");
        setRequestPathInfo("/testDefaultRequestProcessorNormalUserRole");
        actionPerform();

        assertEquals("euc-kr", this.getRequest().getCharacterEncoding());

        HttpSession session = this.getRequest().getSession();
        Locale currentLocale = this.getRequest().getLocale();

        assertEquals(currentLocale, session
                .getAttribute("org.apache.struts.action.LOCALE"));

        this.getSession().removeAttribute("subject");
    }

    @SuppressWarnings("unchecked")
    public void testDefaultRequestProcessorAdminRole() {
        logger.info("[Start] - testDefaultRequestProcessor");

        Subject subject = null;
        Set principals = new HashSet();
        Set credentials = new HashSet();

        principals.add(new TypedPrincipal("ADMIN", TypedPrincipal.GROUP));
        subject = new Subject(false, principals, credentials, credentials);

        this.getRequest().getSession().setAttribute("subject", subject);

        setRequestPathInfo("/testDefaultRequestProcessor");
        actionPerform();

        assertEquals("euc-kr", this.getRequest().getCharacterEncoding());

        HttpSession session = this.getRequest().getSession();
        Locale currentLocale = this.getRequest().getLocale();

        assertEquals(currentLocale, session
                .getAttribute("org.apache.struts.action.LOCALE"));

        this.getSession().removeAttribute("subject");
    }

    public void testDefaultRequestProcessorNoRoles() {
        logger.info("[Start]- testDefaultRequestProcessorNoRoles");

        setRequestPathInfo("/testDefaultRequestProcessorNoRoles");
        actionPerform();

        assertEquals("euc-kr", this.getRequest().getCharacterEncoding());

        HttpSession session = this.getRequest().getSession();
        Locale currentLocale = this.getRequest().getLocale();

        assertEquals(currentLocale, session
                .getAttribute("org.apache.struts.action.LOCALE"));

    }

}
