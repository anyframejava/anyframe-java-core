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
package org.anyframe.simpleweb.tag;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.anyframe.util.StringUtil;

/**
 * Submit Tag Class to support SimpleServiceController
 * @author Sooyeon Park
 *
 */
public class SubmitTag extends BodyTagSupport  {

	private static final long serialVersionUID = 1L;
	private String id = "";
	private String form = "";
	private String action = "";
	private String service = "";
	private String commandName = "";
	private String commandClass = "";
	private String forward = "";
	private String redirect = "";
	private String render = "";
	private String formName = "";
	private String isShowNewForm = "";
	private String isSessionForm = "";
	private String initValues = "";
	private String validator = "";
	private String inputpage = "";
	private String tiles = "";
	private String layout = "";
	private String jsValidate = "";
	private String view = "";
	private String target = "";
	private String popupOptions = "";
	
	private String popup = "";
	
	private String popupTitle = "";

	public String getPopupTitle() {
		return popupTitle;
	}

	public void setPopupTitle(String popupTitle) {
		this.popupTitle = popupTitle;
	}

	public String getPopup() {
		return popup;
	}

	public void setPopup(String popup) {
		this.popup = popup;
	}
	
	public String getPopupOptions() {
		return popupOptions;
	}

	public void setPopupOptions(String popupOptions) {
		this.popupOptions = popupOptions;
	}
	
	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getView() {
		return view;
	}

	public void setView(String view) {
		this.view = view;
		this.setProperty("request:view", this.view);
	}

	public void setProperties(Properties properties) {
		this.properties = properties;
	}

	// properties
	private Properties properties = new Properties();
	
	private Properties tilesProperties = new Properties();
    
	public String getInitValues() {
		return initValues;
	}

	public String getValidator() {
		return validator;
	}

	public String getInputpage() {
		return inputpage;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getForm() {
		return form;
	}

	public void setForm(String form) {
		this.form = form;
	}
	
	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}
	
	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getCommandName() {
		return commandName;
	}

	public void setCommandName(String commandName) {
		this.commandName = commandName;
	}

	public String getCommandClass() {
		return commandClass;
	}

	public void setCommandClass(String commandClass) {
		this.commandClass = commandClass;
	}
	
	public String getRender() {
		return render;
	}

	public void setRender(String render) {
		this.render = render;
	}
	
	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
	}

	public String getIsShowNewForm() {
		return isShowNewForm;
	}

	public void setIsShowNewForm(String isShowNewForm) {
		this.isShowNewForm = isShowNewForm;
	}

	public String getIsSessionForm() {
		return isSessionForm;
	}

	public void setIsSessionForm(String isSessionForm) {
		this.isSessionForm = isSessionForm;
	}
	
	public void setForward(String forward) {
		this.forward = forward;
	}

	public void setRedirect(String redirect) {
		this.redirect = redirect;
	}
	
	public String getForward() {
		return forward;
	}

	public String getRedirect() {
		return redirect;
	}
	
	public String getTiles() {
		return tiles;
	}

	public void setTiles(String tiles) {
		this.tiles = tiles;
	}
	
	public String getLayout() {
		return layout;
	}

	public void setLayout(String layout) {
		this.layout = layout;
	}	
	
	public String getJsValidate() {
		return jsValidate;
	}

	public void setJsValidate(String jsValidate) {
		this.jsValidate = jsValidate;
	}
	
	// =========== methods for nested SetPropertyTag
	
    /**
     * Called by the setProperty tag to override some default behavior or text String.
     * @param propertyName String property name
     * @param propertyValue String property value
     */
    public void setProperty(String propertyName, String propertyValue)
    {
        this.properties.setProperty(propertyName, propertyValue);
    }
    
    public String getProperty(String propertyName)
    {
        return this.properties.getProperty(propertyName);
    }
    
    public Properties getProperties() {
		return properties;
	}

    public void setModel(String commandName, String commandClass)
    {
    	this.commandName = commandName;
    	this.commandClass = commandClass;
    }
    
    public void setDoubleSubmit(String formName, String isShowNewForm, String isSessionForm)
    {
    	this.formName = formName;
    	this.isShowNewForm = isShowNewForm;
    	this.isSessionForm = isSessionForm;
    }
    
    public void setInitValues(String values)
    {
    	this.initValues = values;
    }    
    
    public void setValidation(String validator, String inputpage)
    {
    	this.validator = validator;
    	this.inputpage = inputpage;
    }
    
    public void setTiles(String tilesAttrName, String tilesAttrValue)
    {
    	this.tilesProperties.setProperty(tilesAttrName, tilesAttrValue);
    }
    

    public Properties getTilesProperties() {
		return tilesProperties;
	}

    
	/**
     * Draw the generated codes. This is where everything happens, we figure out what values we are supposed to be showing, we
     * figure out how we are supposed to be showing them, then we draw them.
     * @return int
     * @throws JspException generic exception
     * @see javax.servlet.jsp.tagext.Tag#doEndTag()
     */
    public int doEndTag() throws JspException
    {
		try {
			// 1. get link title
		    BodyContent bodyContent = super.getBodyContent();
	        String title = bodyContent.getString();
	        if(StringUtil.isNotEmpty(this.properties.getProperty("title"))) title = this.properties.getProperty("title");
	        
	        // 2. get properties from nested setProperty tag
			String javascript = this.properties.getProperty("javascript");
			String dynamicAttrName = "body";
			
			boolean isPartial = false;
			if(StringUtil.isNotEmpty(this.render) && this.render.startsWith("partial")) {
				isPartial = true;
				if(this.render.startsWith("partial:"))
					dynamicAttrName = this.render.substring(8);
			}
			
			// make request parameters input hidden tags
			Set<Object> propKeySet = this.properties.keySet();
			Iterator<Object> itr = propKeySet.iterator();
			List<String> paramNames = new ArrayList<String>();
			String requestParams = "";
			while(itr.hasNext())
			{
				String propertyName = (String)itr.next();
				if(propertyName.startsWith("request:")) {
					propertyName = propertyName.substring(8);
					paramNames.add(propertyName);
					requestParams += "<input type=\\\"hidden\\\" name=\\\"" + propertyName + "\\\" value=\\\"\\\"/>";
				}
			}
			
			// make tiles attributes input hidden tags
			String tilesAttrs = "";
			if(!this.tilesProperties.isEmpty()) {
				Set<Object> tilesPropKeySet = this.tilesProperties.keySet();
				Iterator<Object> tilesItr = tilesPropKeySet.iterator();
				tilesAttrs = "<input type=\\\"hidden\\\" name=\\\"tiles\\\" value=\\\"";
				while(tilesItr.hasNext())
				{
					String attrName = (String)tilesItr.next();
					tilesAttrs += attrName + ":" + this.tilesProperties.getProperty(attrName) + ";";
				}
				tilesAttrs += "\\\"/>";
			}
			
			String initdataService = "";
			String initdataResult = "";
			if(StringUtil.isNotEmpty(this.initValues)) {
				List<String> initValues = StringUtil.getTokens(this.initValues, ";");
				Iterator<String> initItr = initValues.iterator();
				while(initItr.hasNext())
				{
					List<String> value = StringUtil.getTokens(initItr.next().toString(), ":");
					initdataResult += value.get(0)+",";
					initdataService += value.get(1)+",";
				}
			}
			
			// get hiddenDiv value from properties
			String hiddenDiv = "hiddenDiv";
			if(this.properties.getProperty(hiddenDiv) != null) hiddenDiv = this.properties.getProperty(hiddenDiv);
			
			// get upload value from properties
			boolean isUpload = false;
			String elementId = this.id;
			String event = "onclick";
			if(this.properties.getProperty("upload") != null) isUpload = new Boolean(this.properties.getProperty("upload")).booleanValue();
			if(isUpload) {
				elementId = this.id + "Id";
				event = "onfocus";
			}
			
	        // 3. write generated codes
	        //JspWriter out = bodyContent.getEnclosingWriter();
	        JspWriter out = this.pageContext.getOut();
	        String generatedCodes = "";
	        String actionUrl = "/simple.do";
	        if(StringUtil.isNotEmpty(this.getAction())) actionUrl = this.getAction();
	        
	        generatedCodes = appendCodes(generatedCodes, "\n<!-- [START] Generated script codes from Anyframe tag -->");
	        if(isUpload) {
	        	generatedCodes = appendCodes(generatedCodes,"<a id=\"" + this.id + "\"" + " style=\"cursor:pointer;" +"\">" + title + "</a>");
	        	generatedCodes = appendCodes(generatedCodes,"<a id=\"" + elementId + "\"" + " href=\"#\"></a>");
	        }
	        else
	        	generatedCodes = appendCodes(generatedCodes,"<span id=\"" + this.id + "\"" + " style=\"cursor:pointer;" +"\">" + title + "</span>");
        		
	        generatedCodes = appendCodes(generatedCodes,"<script type=\"text/javascript\">");
	        generatedCodes = appendCodes(generatedCodes,"<!--");  
	        
	        if(isUpload) {
	        	generatedCodes = appendCodes(generatedCodes,"$(document).ready(function() {");
	        	generatedCodes = appendCodes(generatedCodes,"$(\"#" + this.id + "\").click( function() {");
	        	generatedCodes = appendCodes(generatedCodes,"if($('#uploadify').uploadifySettings('queueSize') == 0) {");
	        	generatedCodes = appendCodes(generatedCodes,"    document.getElementById(\"" + elementId + "\").focus(); ");
	        	generatedCodes = appendCodes(generatedCodes,"} else {");
	        	generatedCodes = appendCodes(generatedCodes,"    $('#uploadify').bind('uploadifyAllComplete', function(event,data) {");
	        	generatedCodes = appendCodes(generatedCodes,"        document.getElementById(\"" + elementId + "\").focus(); ");
	        	generatedCodes = appendCodes(generatedCodes,"    });");
	        	generatedCodes = appendCodes(generatedCodes,"    $('#uploadify').uploadifyUpload();");
	        	generatedCodes = appendCodes(generatedCodes,"}");
	        	generatedCodes = appendCodes(generatedCodes,"});");
	        	generatedCodes = appendCodes(generatedCodes,"});");
	        }
        	if(StringUtil.isNotEmpty(jsValidate) && jsValidate.equals("true")) generatedCodes = appendCodes(generatedCodes,"   Spring.addDecoration(new Spring.ValidateAllDecoration({elementId:\"" +  elementId + "\", event:'" + event + "'}));");
        	
	        if(isPartial)
	        	generatedCodes = appendCodes(generatedCodes,"   function " + this.id + "() {");	 
	        else{
	        	generatedCodes = appendCodes(generatedCodes,"   var e = document.getElementById('" + this.id + "');");
	        	generatedCodes = appendCodes(generatedCodes,"   e.onclick = function () {");
	        }
	        
		    generatedCodes = appendCodes(generatedCodes,"   var hiddenDiv = document.getElementById(\""+ hiddenDiv + "\");");
		    generatedCodes = appendCodes(generatedCodes,"   hiddenDiv.style.display=\"none\";");
		    generatedCodes = appendCodes(generatedCodes,"   hiddenDiv.style.visibility=\"hidden\";");
	        generatedCodes = appendCodesBack(generatedCodes,"   hiddenDiv.innerHTML=\"");
	        if(StringUtil.isNotEmpty(service)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"service\\\" value=\\\"" + service + "\\\"/>");
	        if(StringUtil.isNotEmpty(tiles)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"tiles\\\" value=\\\"" + tiles + "\\\"/>");
	        if(StringUtil.isNotEmpty(layout)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"layout\\\" value=\\\"" + layout + "\\\"/>");
	        else if(!tilesProperties.isEmpty()) generatedCodes = appendCodesBack(generatedCodes, tilesAttrs);
	        if(StringUtil.isNotEmpty(commandName)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"commandName\\\" value=\\\"\\\"/>");
	        if(StringUtil.isNotEmpty(commandClass)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"commandClass\\\" value=\\\"\\\"/>");
	        if(StringUtil.isNotEmpty(inputpage)) {
	        	generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"inputpage\\\" value=\\\"\\\"/>");
	        	generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"validator\\\" value=\\\"\\\"/>");
	        }
	       
	        if(StringUtil.isNotEmpty(forward) || StringUtil.isNotEmpty(redirect)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"viewName\\\" value=\\\"\\\"/>");
	        if(StringUtil.isNotEmpty(initdataService)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"initdataService\\\" value=\\\"\\\"/>");
	        if(StringUtil.isNotEmpty(initdataResult)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"initdataResult\\\" value=\\\"\\\"/>");
	        if(StringUtil.isNotEmpty(formName)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"formName\\\" value=\\\"\\\"/>");
	        if(StringUtil.isNotEmpty(isShowNewForm)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"isShowNewForm\\\" value=\\\"\\\"/>");
	        if(StringUtil.isNotEmpty(isSessionForm)) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"isSessionForm\\\" value=\\\"\\\"/>");
	        if(isPartial) generatedCodes = appendCodesBack(generatedCodes,"<input type=\\\"hidden\\\" name=\\\"dynamicAttrName\\\" value=\\\"" + dynamicAttrName + "\\\"/>");
	        generatedCodes = appendCodesBack(generatedCodes,   requestParams);
	        generatedCodes = appendCodes(generatedCodes,   "\";");	
	           
			if(StringUtil.isNotEmpty(validator)) {
				if(validator.startsWith("javascript:")) {
					generatedCodes = appendCodes(generatedCodes,"   var isValid = "+validator.substring(11));
					generatedCodes = appendCodes(generatedCodes,"   if(!isValid) return false;");
				}
				else {
					generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".validator.value = \"" + validator + "\";");
				}
			}
			if(StringUtil.isNotEmpty(inputpage)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".inputpage.value = \"" + inputpage + "\";");
			
			String ifstatement = "";
			if(StringUtil.isNotEmpty(javascript)) {
				if(javascript.startsWith("if(") || javascript.startsWith("if (")) ifstatement = "{";
				generatedCodes = appendCodes(generatedCodes,"   " + javascript + ifstatement) ;
			}
			generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".action=\"" + ((HttpServletRequest)this.pageContext.getRequest()).getContextPath() + actionUrl + "\";");
			if(StringUtil.isNotEmpty(commandName)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".commandName.value = \"" + commandName + "\";");
			if(StringUtil.isNotEmpty(commandClass)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".commandClass.value = \"" + commandClass + "\";");
			if(StringUtil.isNotEmpty(forward)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".viewName.value = \"forward:" + actionUrl + "?service=" + forward + "\";");
			if(StringUtil.isNotEmpty(redirect)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".viewName.value = \"redirect:" + actionUrl + "?service=" + redirect + "\";");
			if(StringUtil.isNotEmpty(initdataService)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".initdataService.value = \"" + initdataService + "\";");
			if(StringUtil.isNotEmpty(initdataResult)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".initdataResult.value = \"" + initdataResult + "\";");
			if(StringUtil.isNotEmpty(formName)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".formName.value = \"" + formName + "\";");
			if(StringUtil.isNotEmpty(isShowNewForm)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".isShowNewForm.value = \"" + isShowNewForm + "\";");
			if(StringUtil.isNotEmpty(isSessionForm)) generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".isSessionForm.value = \"" + isSessionForm + "\";");
			
			if(paramNames.size() > 0){
				Iterator<String> paramItr = paramNames.iterator();
				while(paramItr.hasNext()){
					String paramName = (String)paramItr.next();
					generatedCodes = appendCodes(generatedCodes,"   document." + this.form + "." + paramName + ".value = \"" + this.properties.getProperty("request:" + paramName) + "\";");
				}
			}
			if(isPartial){
				if(StringUtil.isNotEmpty(ifstatement)) generatedCodes = appendCodes(generatedCodes,"   } else return false;");	
				generatedCodes = appendCodes(generatedCodes,"   }");
				generatedCodes = appendCodes(generatedCodes,"   Spring.addDecoration(new Spring.AjaxEventDecoration({ ");
				generatedCodes = appendCodes(generatedCodes,"   	elementId:\"" + elementId + "\", ");
				generatedCodes = appendCodes(generatedCodes,"   	event:\"" + event + "\", ");
				generatedCodes = appendCodes(generatedCodes,"   	formId:\"" + this.form + "\", ");   
				generatedCodes = appendCodes(generatedCodes,"   	params: {fragments:\"" + dynamicAttrName + "\"");
				
				String popupDiv = this.properties.getProperty("popupDiv");
				String popupClose = this.properties.getProperty("popupClose");
				if(StringUtil.isNotEmpty(popupDiv)) 
					generatedCodes = appendCodesBack(generatedCodes,", popupWindow:\"" + popupDiv + "\"");
				if(StringUtil.isNotEmpty(popupClose)) 
					generatedCodes = appendCodesBack(generatedCodes,", popupClose:" + popupClose);				
				
				generatedCodes = appendCodesBack(generatedCodes,"}, ");
				generatedCodes = appendCodes(generatedCodes,"   	func: " + this.id);
				generatedCodes = appendCodes(generatedCodes,"   }));");				
			}
			else{
	        	String frameTargetName = this.getTarget();
	        	if(StringUtil.isNotEmpty(frameTargetName)) {
	        		generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".target=\"" + frameTargetName + "\";");	
	        	}
	        	else if(StringUtil.isNotEmpty(this.getPopup())) 
	        		generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".target=\"_blank\";");	
				
				generatedCodes = appendCodes(generatedCodes,"   document." + this.form + ".submit();");	
				if(StringUtil.isNotEmpty(ifstatement)) generatedCodes = appendCodes(generatedCodes,"   }");	
				generatedCodes = appendCodes(generatedCodes,"   };");
			}
			generatedCodes = appendCodes(generatedCodes,"//-->");  
			generatedCodes = appendCodes(generatedCodes,"</script>");
			generatedCodes = appendCodes(generatedCodes,"<!-- [END] Generated script codes from Anyframe tag -->");		  
	        
	        out.write(generatedCodes);
	        
	        release();
		} catch (Exception ex) {
			throw new JspException(ex.getMessage());
		}

        return EVAL_PAGE;
    }

	public void release() {
    	id = "";
    	form = "";
    	service = "";
    	commandName = "";
    	commandClass = "";
    	forward = "";
    	redirect = "";
    	render = "";
    	formName = "";
    	isShowNewForm = "";
    	isSessionForm = "";
    	validator = "";
    	inputpage = "";
    	initValues = "";	
    	tiles = "";
    	properties = new Properties();
    	tilesProperties = new Properties();
    }
    
    protected String appendCodes(String all, String part){
    	StringBuilder result = new StringBuilder(all.length()+part.length()+1).append(all).append(part).append("\n");
    	return result.toString();
    }

    protected String appendCodesBack(String all, String part){
    	StringBuilder result = new StringBuilder(all.length()+part.length()).append(all).append(part);
    	return result.toString();
    }
    
	protected String generatePopupWindow(String generatedCodes,
			String fullLocation) {
		String windowOptions = this.getPopupOptions();
		if(StringUtil.isEmpty(windowOptions))  windowOptions = "location=1,status=1,scrollbars=1,width=500,height=500";
		
		generatedCodes = appendCodes(generatedCodes,"   window.open("+ fullLocation + "\"" + ",null,\"" + windowOptions + "\");");
		return generatedCodes;
	}
}
