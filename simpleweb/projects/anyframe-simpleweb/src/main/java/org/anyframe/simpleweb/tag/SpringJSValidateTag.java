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
package org.anyframe.simpleweb.tag;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;

import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.tags.HtmlEscapingAwareTag;
import org.springframework.web.util.ExpressionEvaluationUtils;

import org.anyframe.util.StringUtil;

/**
 * @author Rod Johnson
 * @author Juergen Hoeller
 * 
 * @author modified by Sooyeon Park
 * 
 *         Custom tag that renders Spring JS UI Element validation scripts in the page if an
 *         appropriate request attribute has been created.
 * 
 *         Page class is included in anyframe-springmvc-ext-x.x.x.jar 
 *
 *<br>
 *<br>
 *         <b>>>sample usage</b> <br>
 *<br>
 *         &ltanyframe:validate id="title" required="true" promptMessge="Enter movie Title" /&gt<br>
 *<br>
 * 
 */

public class SpringJSValidateTag extends HtmlEscapingAwareTag {

	private static final long serialVersionUID = 1L;
	/**
	 * Default separator for splitting an arguments String: a comma (",")
	 */
	public static final String DEFAULT_ARGUMENT_SEPARATOR = ",";
	private String argumentSeparator = DEFAULT_ARGUMENT_SEPARATOR;
	
	private String id = "";
	private String type = "";
	private String required = "";
	private String promptMessage = "";
	private String invalidMessage = "";
	private String promptMessageKey = "";
	private String invalidMessageKey = "";
	private String promptMessageArgs = "";
	private String invalidMessageArgs = "";		
	private String constraints = "";
	private String regExp = "";
	private String trim = "";
	private String datePattern = "";
	private String checked = "";
	private String value="";
	private String currency="";
	private String style="";

	@Override
	protected int doStartTagInternal() throws JspException, IOException {
		try {
			JspWriter out = pageContext.getOut();
			String generatedCodes = "";
			
			if(StringUtil.isNotEmpty(promptMessageKey) || StringUtil.isNotEmpty(invalidMessageKey)){
				MessageSource messageSource = getMessageSource();
				if (messageSource == null) {
					throw new JspTagException("No corresponding MessageSource found");
				}
				// Resolve the message from message source.
				if(StringUtil.isNotEmpty(promptMessageKey))
					promptMessage = resolveMessage(messageSource, promptMessageKey, promptMessageArgs, promptMessage);
				if(StringUtil.isNotEmpty(invalidMessageKey))
					invalidMessage = resolveMessage(messageSource, invalidMessageKey, invalidMessageArgs, invalidMessage);
			}
			
			generatedCodes = appendCodes(generatedCodes, "\n<!-- [START] Generated script codes from Anyframe tag -->");
	        generatedCodes = appendCodes(generatedCodes,"<script type=\"text/javascript\">");
	        generatedCodes = appendCodes(generatedCodes,"<!--");  
	        generatedCodes = appendCodes(generatedCodes,"Spring.addDecoration(new Spring.ElementDecoration({");
	        generatedCodes = appendCodes(generatedCodes, "   elementId: \"" + id + "\","); 
	        
	        // check type
	        String widgetType = "dijit.form.ValidationTextBox";
	        if(StringUtil.isNotEmpty(type)) {
		        if(type.equalsIgnoreCase("Number"))
		        	widgetType = "dijit.form.NumberTextBox";	
		        else if(type.equalsIgnoreCase("Date"))
		        	widgetType = "dijit.form.DateTextBox";	
		        else if(type.equalsIgnoreCase("CheckBox"))
		        	widgetType = "dijit.form.CheckBox";
		        else if(type.equalsIgnoreCase("RadioButton"))
		        	widgetType = "dijit.form.RadioButton";
		        else if(type.equalsIgnoreCase("Currency"))
		        	widgetType = "dijit.form.CurrencyTextBox";
	        }    	
			generatedCodes = appendCodes(generatedCodes,"   widgetType: \"" + widgetType + "\",");	
			generatedCodes = appendCodes(generatedCodes,"   widgetAttrs: {");
			
			
			// make widgetAttributes map
			Map<String,String> attrMap = new HashMap<String,String>();
	        
			if(StringUtil.isNotEmpty(required)) attrMap.put("required", required);
			else attrMap.put("required", "false");
			
			if(attrMap.get("required").equals("true")){
				if(StringUtil.isEmpty(promptMessage)) attrMap.put("promptMessage", "\"Enter "+ id + "\"");
				else attrMap.put("promptMessage", "\"" + promptMessage + "\"");
				
				if(StringUtil.isEmpty(invalidMessage)) attrMap.put("invalidMessage", "\""+ id + " is required.\"");
			}
			else{
				if(StringUtil.isNotEmpty(promptMessage)) attrMap.put("promptMessage", "\"" + promptMessage + "\"");
			}
				
			if(StringUtil.isNotEmpty(regExp)) attrMap.put("regExp", "\"" + regExp + "\"");
			
			if(StringUtil.isNotEmpty(invalidMessage)) attrMap.put("invalidMessage", "\"" + invalidMessage + "\"");
			if(StringUtil.isNotEmpty(value)) attrMap.put("value", value);
			if(StringUtil.isNotEmpty(style)) attrMap.put("style",  "\"" + style + "\"");
			if(StringUtil.isEmpty(trim)) attrMap.put("trim", "\"true\"");
			else attrMap.put("trim", "\"" + trim + "\"");
			
			if(widgetType.equals("dijit.form.ValidationTextBox")) {
				if(type.equalsIgnoreCase("zipcode")){
					if(StringUtil.isEmpty(regExp)){
						attrMap.put("regExp", "\"[0-9]{3}[\\-][0-9]{3}\"");
						if(StringUtil.isEmpty(invalidMessage))
							attrMap.put("invalidMessage", "\"Invalid zip code (NNN-NNN).\"");
					}
				}
				else if(type.equalsIgnoreCase("email"))
					if(StringUtil.isEmpty(regExp))
						attrMap.put("regExp", "\"[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}\"");
			}
			
			if(widgetType.equals("dijit.form.NumberTextBox")) {
				if(StringUtil.isEmpty(invalidMessage)) attrMap.put("invalidMessage", "\"This value is allowed number.\"");
				if(StringUtil.isNotEmpty(constraints)) attrMap.put("constraints", constraints);
			}
			else if(widgetType.equals("dijit.form.CheckBox")) {
				if(StringUtil.isNotEmpty(checked)) attrMap.put("checked", checked);
			}	
			else if(widgetType.equals("dijit.form.DateTextBox")) {
				String defaultDatePattern = "yyyy-MM-dd";
				if(StringUtil.isNotEmpty(datePattern)) defaultDatePattern = datePattern;
				if(StringUtil.isNotEmpty(constraints)) attrMap.put("constraints", constraints);
				else attrMap.put("constraints", "{datePattern : \""+ defaultDatePattern + "\"}");
				if(StringUtil.isEmpty(value)) attrMap.put("value", " dojo.date.locale.parse(dojo.byId(\"" + id + "\").value, {selector : \"date\", datePattern : \"" + defaultDatePattern + "\"})");
				else if(value.equals("currentDate")){
					SimpleDateFormat sdf = new SimpleDateFormat(defaultDatePattern);
					Date date = new Date();
					attrMap.put("value", " dojo.date.locale.parse(\"" + sdf.format(date) + "\", {selector : \"date\", datePattern : \"" + defaultDatePattern + "\"})");
				}
				if(StringUtil.isEmpty(invalidMessage)) attrMap.put("invalidMessage", "\"Invalid date format. Use " + defaultDatePattern + ".\"");
			}	
			else if(widgetType.equals("dijit.form.CurrencyTextBox")) {
				if(StringUtil.isEmpty(currency)) attrMap.put("currency", "\"KRW\"");
				else attrMap.put("currency", "\"" + currency + "\"");
			}	
			
			// generate codes from widgetAttributes map
			Iterator<String> itr = attrMap.keySet().iterator();
			int attrCnt = 0;
			while(itr.hasNext()){
				attrCnt ++;
				String key = itr.next();
				generatedCodes = appendCodesBack(generatedCodes,"   " + key + ": " + attrMap.get(key));
				if(attrCnt < attrMap.size()) generatedCodes = appendCodes(generatedCodes,",");
			}
			
			generatedCodes = appendCodes(generatedCodes,"     }}));");
			generatedCodes = appendCodes(generatedCodes,"//-->");  
			generatedCodes = appendCodes(generatedCodes, "</script>");
			generatedCodes = appendCodes(generatedCodes,"<!-- [END] Generated script codes from Anyframe tag -->");		
	        out.write(generatedCodes);
	        
	        release();
		} catch (Exception ex) {
			throw new JspTagException(ex.getMessage());
		}
		return SKIP_BODY;
	}
	
	/**
	 * Resolve the specified message into a concrete message String.
	 * The returned message String should be unescaped.
	 */
	protected String resolveMessage(MessageSource messageSource, String messageKey, String messageArgs, String defaultMessage) throws JspException, NoSuchMessageException {

		if (messageKey != null || defaultMessage != null) {
			// We have a code or default text that we need to resolve.
			// Object[] argumentsArray = resolveArguments(messageArgs);
			if (defaultMessage != null) {
				// We have a fallback text to consider.
				return messageSource.getMessage(
						messageKey, null, defaultMessage, getRequestContext().getLocale());
			}
			else {
				// We have no fallback text to consider.
				return messageSource.getMessage(
						messageKey, null, getRequestContext().getLocale());
			}
		}
		
		//return empty string
		return "";
	}
	
	/**
	 * Use the current RequestContext's application context as MessageSource.
	 */
	protected MessageSource getMessageSource() {
		return getRequestContext().getMessageSource();
	}
	
	/**
	 * Resolve the given arguments Object into an arguments array.
	 * @param arguments the specified arguments Object
	 * @return the resolved arguments as array
	 * @throws JspException if argument conversion failed
	 * @see #setArguments
	 */
	@SuppressWarnings("unchecked")
	protected Object[] resolveArguments(Object arguments) throws JspException {
		if (arguments instanceof String) {
			String[] stringArray =
					StringUtils.delimitedListToStringArray((String) arguments, this.argumentSeparator);
			if (stringArray.length == 1) {
				Object argument = ExpressionEvaluationUtils.evaluate("argument", stringArray[0], pageContext);
				if (argument != null && argument.getClass().isArray()) {
					return ObjectUtils.toObjectArray(argument);
				}
				else {
					return new Object[] {argument};
				}
			}
			else {
				Object[] argumentsArray = new Object[stringArray.length];
				for (int i = 0; i < stringArray.length; i++) {
					argumentsArray[i] =
							ExpressionEvaluationUtils.evaluate("argument[" + i + "]", stringArray[i], pageContext);
				}
				return argumentsArray;
			}
		}
		else if (arguments instanceof Object[]) {
			return (Object[]) arguments;
		}
		else if (arguments instanceof Collection) {
			return ((Collection) arguments).toArray();
		}
		else if (arguments != null) {
			// Assume a single argument object.
			return new Object[] {arguments};
		}
		else {
			return null;
		}
	}
	
	public void setPromptMessageArgs(String promptMessageArgs) {
		this.promptMessageArgs = promptMessageArgs;
	}

	public void setInvalidMessageArgs(String invalidMessageArgs) {
		this.invalidMessageArgs = invalidMessageArgs;
	}

	/**
	 * Set the separator to use for splitting an arguments String.
	 * Default is a comma (",").
	 * @see #setArguments
	 */
	public void setArgumentSeparator(String argumentSeparator) {
		this.argumentSeparator = argumentSeparator;
	}
	
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRequired() {
		return required;
	}

	public void setRequired(String required) {
		this.required = required;
	}

	public String getInvalidMessage() {
		return invalidMessage;
	}

	public void setInvalidMessage(String invalidMessage) {
		this.invalidMessage = invalidMessage;
	}

	public String getConstraints() {
		return constraints;
	}

	public void setConstraints(String constraints) {
		this.constraints = constraints;
	}

	public String getRegExp() {
		return regExp;
	}

	public void setRegExp(String regExp) {
		this.regExp = regExp;
	}

	public String getTrim() {
		return trim;
	}

	public void setTrim(String trim) {
		this.trim = trim;
	}

	public String getDatePattern() {
		return datePattern;
	}

	public void setDatePattern(String datePattern) {
		this.datePattern = datePattern;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}
	
	public String getPromptMessage() {
		return promptMessage;
	}

	public void setPromptMessage(String promptMessage) {
		this.promptMessage = promptMessage;
	}
	
	 public String setCurrency() {
			return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	protected String appendCodes(String all, String part){
		StringBuilder result = new StringBuilder(all.length()+part.length()+1).append(all).append(part).append("\n");
    	return result.toString();
    }
	
    protected String appendCodesBack(String all, String part){
    	StringBuilder result = new StringBuilder(all.length()+part.length()).append(all).append(part);
    	return result.toString();
    }
    
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	public String getPromptMessageKey() {
		return promptMessageKey;
	}

	public void setPromptMessageKey(String promptMessageKey) {
		this.promptMessageKey = promptMessageKey;
	}

	public String getInvalidMessageKey() {
		return invalidMessageKey;
	}

	public void setInvalidMessageKey(String invalidMessageKey) {
		this.invalidMessageKey = invalidMessageKey;
	}
	
	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}
	
	public void release() {
		id = "";
		type = "";
		required = "";
		promptMessage = "";
		invalidMessage = "";
		promptMessageKey = "";
		invalidMessageKey = "";
		promptMessageArgs = "";
		invalidMessageArgs = "";		
		constraints = "";
		regExp = "";
		trim = "";
		datePattern = "";
		checked = "";
		currency="";
		value = "";
		style = "";
    }
}
