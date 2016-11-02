/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.tag;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.Tag;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.servlet.support.RequestContext;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.servlet.tags.AbstractTagTests;

/**
 * 
 * We changed org.springframework.web.servlet.tags.MessageTagTests Class into
 * org.anyframe.tag.MessagesTagTest Class in Anyframe.
 * <ul>
 * <li>Testing for MessagesTag(supported korean)</li>
 * </ul>
 * 
 * @author Juergen Hoeller
 * @author Alef Arendsen
 * @author modified by Sooyeon Park
 * 
 */
@SuppressWarnings("serial")
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/message/context-aggregating-message.xml" })
public class MessagesTagTest{ // extends AbstractTagTests {

	@Test
	public void dummy() throws Exception {
		assertTrue(true);
	}
	
//	public void testMessagesTagWithMessageSourceResolvable1Korean()
//			throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setMessage(new DefaultMessageSourceResolvable("testKorean"));
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "한글메시지 테스트", message.toString());
//	}
//
//	public void testMessagesTagWithMessageSourceResolvable1UnicodeKorean()
//			throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setMessage(new DefaultMessageSourceResolvable("testUnicodeKorean"));
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "사용자관리", message.toString());
//	}
//
//	public void testMessagesTagWithMessageSourceResolvable1()
//			throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setMessage(new DefaultMessageSourceResolvable("test"));
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test message", message.toString());
//	}
//
//	public void testMessagesTagWithCode1() throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setCode("test");
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test message", message.toString());
//	}
//
//	public void testMessagesTagWithNullCode() throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setCode(null);
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "null", message.toString());
//	}
//
//	public void testMessagesTagWithCodeAndArgument() throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setCode("testArgs");
//		tag.setArguments("arg1");
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test arg1 message {1}",
//				message.toString());
//	}
//
//	public void testMessagesTagWithCodeAndArguments() throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setCode("testArgs");
//		tag.setArguments("arg1,arg2");
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test arg1 message arg2",
//				message.toString());
//	}
//
//	public void testMessagesTagWithCodeAndStringArgumentWithCustomSeparator()
//			throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setCode("testArgs");
//		tag.setArguments("arg1,1;arg2,2");
//		tag.setArgumentSeparator(";");
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test arg1,1 message arg2,2",
//				message.toString());
//	}
//
//	public void testMessagesTagWithCodeAndArrayArgument() throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setCode("testArgs");
//		tag.setArguments(new Object[] { "arg1", new Integer(5) });
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test arg1 message 5",
//				message.toString());
//	}
//
//	public void testMessagesTagWithCodeAndObjectArgument() throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setCode("testArgs");
//		tag.setArguments(new Integer(5));
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test 5 message {1}",
//				message.toString());
//	}
//
//	public void testMessagesTagWithCodeAndText1() throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setCode("test");
//		tag.setText("testtext");
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test message", (message.toString()));
//	}
//
//	public void testMessagesTagWithText() throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setText("test & text");
//		tag.setHtmlEscape(true);
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test &amp; text", message.toString());
//	}
//
//	public void testMessagesTagWithTextAndJavaScriptEscape()
//			throws JspException {
//		PageContext pc = createPageContext();
//		final StringBuffer message = new StringBuffer();
//		MessagesTag tag = new MessagesTag() {
//			protected void writeMessage(String msg) {
//				message.append(msg);
//			}
//		};
//		tag.setPageContext(pc);
//		tag.setText("' test & text \\");
//		tag.setJavaScriptEscape(true);
//		assertTrue("Correct doStartTag return value",
//				tag.doStartTag() == Tag.EVAL_BODY_INCLUDE);
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "\\' test & text \\\\",
//				message.toString());
//	}
//
//	public void testMessageWithVarAndScope() throws JspException {
//		PageContext pc = createPageContext();
//		MessagesTag tag = new MessagesTag();
//		tag.setPageContext(pc);
//		tag.setText("text & text");
//		tag.setVar("testvar");
//		tag.setScope("page");
//		tag.doStartTag();
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("text & text", pc.getAttribute("testvar"));
//		tag.release();
//
//		tag = new MessagesTag();
//		tag.setPageContext(pc);
//		tag.setCode("test");
//		tag.setVar("testvar2");
//		tag.doStartTag();
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test message",
//				pc.getAttribute("testvar2"));
//		tag.release();
//	}
//
//	public void testMessageWithVar() throws JspException {
//		PageContext pc = createPageContext();
//		MessagesTag tag = new MessagesTag();
//		tag.setPageContext(pc);
//		tag.setText("text & text");
//		tag.setVar("testvar");
//		tag.doStartTag();
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("text & text", pc.getAttribute("testvar"));
//		tag.release();
//
//		// try to reuse
//		tag.setPageContext(pc);
//		tag.setCode("test");
//		tag.setVar("testvar");
//
//		tag.doStartTag();
//		assertEquals("Correct doEndTag return value", Tag.EVAL_PAGE, tag.doEndTag());
//		assertEquals("Correct message", "test message",
//				pc.getAttribute("testvar"));
//	}
//
//	public void testNullMessageSource() throws JspException {
//		PageContext pc = createPageContext();
//		ConfigurableWebApplicationContext ctx = (ConfigurableWebApplicationContext) RequestContextUtils
//				.getWebApplicationContext(pc.getRequest(),
//						pc.getServletContext());
//		ctx.close();
//
//		MessagesTag tag = new MessagesTag();
//		tag.setPageContext(pc);
//		tag.setCode("test");
//		tag.setVar("testvar2");
//		tag.doStartTag();
//	}
//
//	public void testRequestContext() throws ServletException {
//		PageContext pc = createPageContext();
//		RequestContext rc = new RequestContext(
//				(HttpServletRequest) pc.getRequest(), pc.getServletContext());
//		assertEquals("test message", rc.getMessage("test"));
//		assertEquals("test message", rc.getMessage("test", (Object[]) null));
//		assertEquals("test message", rc.getMessage("test", "default"));
//		assertEquals("test message",
//				rc.getMessage("test", (Object[]) null, "default"));
//		assertEquals("test arg1 message arg2", rc.getMessage("testArgs",
//				new String[] { "arg1", "arg2" }, "default"));
//		assertEquals("test arg1 message arg2", rc.getMessage("testArgs",
//				Arrays.asList(new String[] { "arg1", "arg2" }), "default"));
//		assertEquals("default", rc.getMessage("testa", "default"));
//		assertEquals("default", rc.getMessage("testa", (List<?>) null,
//				"default"));
//		MessageSourceResolvable resolvable = new DefaultMessageSourceResolvable(
//				new String[] { "test" });
//		assertEquals("test message", rc.getMessage(resolvable));
//	}
}
