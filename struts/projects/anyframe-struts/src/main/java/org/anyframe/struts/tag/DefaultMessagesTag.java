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

package org.anyframe.struts.tag;

import javax.servlet.jsp.JspException;

import org.apache.struts.Globals;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.action.ActionMessages;
import org.apache.struts.taglib.TagUtils;
import org.apache.struts.taglib.html.MessagesTag;

/**
 * Custom tag that iterates the elements of a message collection. It defaults
 * to retrieving the messages from <code>Globals.ERROR_KEY</code>, but if the
 * message attribute is set to true then the messages will be retrieved from
 * <code>Globals.MESSAGE_KEY</code>. This is an alternative to the default
 * <code>ErrorsTag</code>.
 *<br><br> 
 * We changed  org.apache.struts.taglib.html.MessagesTag  Class into org.anyframe.struts.tag.DefaultMessagesTag  Class in Anyframe.

 * @author modified by Byunghun Woo
 */
public class DefaultMessagesTag extends MessagesTag {

	private static final long serialVersionUID = 1036002316456951573L;

	protected String name = Globals.MESSAGE_KEY;

    /**
     * The message resource key for errors suffix.
     */
    protected String suffix = null;
    
    public String getName() {
        return (this.name);
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getSuffix() {
        return (this.suffix);
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }
    

    /**
     * Construct an iterator for the specified collection, and begin looping
     * through the body once per element.
     * 
     * @exception JspException
     *                if a JSP exception has occurred
     */
    public int doStartTag() throws JspException {

        // Initialize for a new request.
        processed = false;

        // Were any messages specified?
        ActionMessages messages = null;

        // Make a local copy of the name attribute that we can modify.
        String name = this.name;

        if (message != null && "true".equalsIgnoreCase(message)) {
            name = Globals.MESSAGE_KEY;
        }

        try {
            messages = TagUtils.getInstance().getActionMessages(pageContext,
                    name);

            // action form; '�� �߰�
            if (messages == null || messages.size() == 0)
                messages = TagUtils.getInstance().getActionMessages(
                        pageContext, Globals.ERROR_KEY);

        } catch (JspException e) {
            TagUtils.getInstance().saveException(pageContext, e);
            throw e;
        }

        // Acquire the collection we are going to iterate over
        this.iterator = (property == null) ? messages.get() : messages
                .get(property);

        // Store the first value and evaluate, or skip the body if none
        if (!this.iterator.hasNext()) {
            return SKIP_BODY;
        }

        ActionMessage report = (ActionMessage) this.iterator.next();

        // Replacement
        Object[] obj = null;
        if(report != null)
{
          obj = report.getValues();
        if (obj != null) {
            for (int i = 0; i < obj.length; i++) {
                if(obj[i] != null)
                {
                String argKey = obj[i].toString();                               
                String argValue = TagUtils.getInstance().message(pageContext,
                        bundle, locale, argKey, null);
                obj[i] = argValue == null ? argKey : argValue;
                }
            }
        }
}

        // Replacement

        String msg = TagUtils.getInstance().message(pageContext, bundle,
                locale, report.getKey(), obj);

        if (msg == null) {
            pageContext.removeAttribute(id);
        } else {
            pageContext.setAttribute(id, msg);
        }

        if (header != null && header.length() > 0) {
            String headerMessage = TagUtils.getInstance().message(pageContext,
                    bundle, locale, header);

            if (headerMessage != null) {
                TagUtils.getInstance().write(pageContext, headerMessage);
            }
        }

        // Set the processed variable to true so the
        // doEndTag() knows processing took place
        processed = true;

        return (EVAL_BODY_TAG);
    }

    /**
     * Make the next collection element available and loop, or finish the
     * iterations if there are no more elements.
     * 
     * @exception JspException
     *                if a JSP exception has occurred
     */
    public int doAfterBody() throws JspException {

        // Render the output from this iteration to the output stream
        if (bodyContent != null) {
            TagUtils.getInstance().writePrevious(pageContext,
                    bodyContent.getString());
            bodyContent.clearBody();
        }

        // Decide whether to iterate or quit
        if (iterator.hasNext()) {
            ActionMessage report = (ActionMessage) iterator.next();

            // Replacement
            Object[] obj = report.getValues();
            if (obj != null) {

                for (int i = 0; i < obj.length; i++) {
                    String argKey = obj[i].toString();
                    String argValue = TagUtils.getInstance().message(
                            pageContext, bundle, locale, argKey, null);
                    obj[i] = argValue == null ? argKey : argValue;
                }
            }
            // Replacement

            String msg = TagUtils.getInstance().message(pageContext, bundle,
                    locale, report.getKey(), obj);

            if (msg == null) {
                pageContext.removeAttribute(id);
            } else {
                pageContext.setAttribute(id, msg);
            }
            
            //added 
            if (suffix != null && suffix.length() > 0) {
                String suffixMessage = TagUtils.getInstance().message(
                        pageContext, bundle, locale, suffix);

                if (suffixMessage != null) {
                    TagUtils.getInstance().write(pageContext, suffixMessage);
                }
            }
            //added 

            

            return (EVAL_BODY_TAG);
        }
        return (SKIP_BODY);
    }

    /**
     * Release all allocated resources.
     */
    public void release() {
        super.release();
        iterator = null;
        processed = false;
        id = null;
        bundle = null;
        locale = Globals.LOCALE_KEY;
        name = Globals.MESSAGE_KEY;
        property = null;
        header = null;
        footer = null;
        message = null;
        suffix = null;
    }
}
