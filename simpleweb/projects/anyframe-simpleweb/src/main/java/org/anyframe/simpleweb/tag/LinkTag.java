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
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyContent;

import org.anyframe.util.StringUtil;

/**
 * Link Tag Class to support SimpleServiceController
 * 
 * @author Sooyeon Park
 *
 */
public class LinkTag extends SubmitTag  {
    
	private static final long serialVersionUID = 1L;
	
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
	        if(StringUtil.isNotEmpty(getProperty("title"))) title = getProperty("title");
	        
	        // 2. get properties from nested setProperty tag
			String javascript = getProperty("javascript");
			String commandName = getCommandName();
			String commandClass = getCommandClass();
				
			// make request parameters 
			Set<Object> propKeySet = getProperties().keySet();
			Iterator<Object> itr = propKeySet.iterator();
			List<String> paramNames = new ArrayList<String>();
			while(itr.hasNext())
			{
				String propertyName = (String)itr.next();
				if(propertyName.startsWith("request:")) {
					propertyName = propertyName.substring(8);
					paramNames.add(propertyName);
				}
			}
		
			// make tiles attributes string
			String tilesAttrs = "";
			if(!getTilesProperties().isEmpty()) {
				Set<Object> tilesPropKeySet = getTilesProperties().keySet();
				Iterator<Object> tilesItr = tilesPropKeySet.iterator();
				while(tilesItr.hasNext())
				{
					String attrName = (String)tilesItr.next();
					tilesAttrs += attrName + ":" + getTilesProperties().getProperty(attrName) + ";";
				}
			}
			
			String initdataService = "";
			String initdataResult = "";
			if(StringUtil.isNotEmpty(getInitValues())) {
				List<String> initValues = StringUtil.getTokens(getInitValues(), ";");
				Iterator<String> initItr = initValues.iterator();
				while(initItr.hasNext())
				{
					List<String> value = StringUtil.getTokens(initItr.next().toString(), ":");
					initdataResult += value.get(0)+",";
					initdataService += value.get(1)+",";
				}
			}
			
			String dynamicAttrName = "body";
			
			boolean isPartial = false;
			if(StringUtil.isNotEmpty(getRender()) && getRender().startsWith("partial")) {
				isPartial = true;
				if(getRender().startsWith("partial:"))
					dynamicAttrName = getRender().substring(8);
			}
			
	        // 3. write generated codes
	        JspWriter out = bodyContent.getEnclosingWriter();
	        String generatedCodes = "";
	        String ifstatement = "";
	        String actionUrl = "/simple.do";
	        if(StringUtil.isNotEmpty(this.getAction())) actionUrl = this.getAction();
	        	
	        String fullLocation = "\"" + ((HttpServletRequest)this.pageContext.getRequest()).getContextPath() + actionUrl;
	        generatedCodes = appendCodes(generatedCodes,"\n<!-- [START] Generated script codes from Anyframe tag -->");
	        if(isPartial){
	        	generatedCodes = appendCodes(generatedCodes,"<script type=\"text/javascript\">");
	        	generatedCodes = appendCodes(generatedCodes,"<!--");  
	        	generatedCodes = appendCodes(generatedCodes,"   function " + this.getId() + "() {");	 
				ifstatement = "";
				if(StringUtil.isNotEmpty(javascript)) {
					if(javascript.startsWith("if(") || javascript.startsWith("if (")) ifstatement = "{";
					generatedCodes = appendCodes(generatedCodes,"   " + javascript + ifstatement) ;
					if(StringUtil.isNotEmpty(ifstatement))  generatedCodes = appendCodes(generatedCodes,"   } else return false;");	
				}
				generatedCodes = appendCodes(generatedCodes,"   }");
				generatedCodes = appendCodes(generatedCodes,"   Spring.addDecoration(new Spring.AjaxEventDecoration({ ");
				generatedCodes = appendCodes(generatedCodes,"   	elementId:\"" + this.getId() + "\", ");
				generatedCodes = appendCodes(generatedCodes,"   	event:\"onclick\", ");
				if(StringUtil.isNotEmpty(this.getPopup())) generatedCodes = appendCodes(generatedCodes,"   	popup: " + this.getPopup() + ", ");
				generatedCodes = appendCodes(generatedCodes,"   	params: {fragments:\"" + dynamicAttrName + "\"");
				if(StringUtil.isNotEmpty(this.getPopupTitle())){
					generatedCodes = appendCodesBack(generatedCodes, ", popupTitle:\"" + this.getPopupTitle() + "\"");
				}
				generatedCodes = appendCodesBack(generatedCodes,"}, ");
				generatedCodes = appendCodes(generatedCodes,"   	func: " + this.getId());
				generatedCodes = appendCodes(generatedCodes,"   }));");
				generatedCodes = appendCodes(generatedCodes,"//-->");
			    generatedCodes = appendCodes(generatedCodes,"</script>");
	        }else{   	
	        	generatedCodes = appendCodes(generatedCodes,"<span id=\"" + this.getId() + "\"" + " style=\"cursor:pointer;" +"\">" + title + "</span>");
	        	generatedCodes = appendCodes(generatedCodes,"<script type=\"text/javascript\">");
	        	generatedCodes = appendCodes(generatedCodes,"<!--");  
	        	generatedCodes = appendCodes(generatedCodes,"   var e = document.getElementById('" + this.getId() + "');");
				generatedCodes = appendCodes(generatedCodes,"   e.onclick = function () {");
				ifstatement = "";
				if(StringUtil.isNotEmpty(javascript)) {
					if(javascript.startsWith("if(") || javascript.startsWith("if (")) ifstatement = "{";
					generatedCodes = appendCodes(generatedCodes,"   " + javascript + ifstatement) ;
				}
	        }
	        
			if(StringUtil.isNotEmpty(this.getService())) fullLocation = fullLocation + addSeparator(fullLocation) + "service="+this.getService();
			if(StringUtil.isNotEmpty(commandName)) fullLocation = fullLocation + addSeparator(fullLocation) + "commandName=" + commandName;
			if(StringUtil.isNotEmpty(commandClass)) fullLocation = fullLocation + addSeparator(fullLocation) + "commandClass=" + commandClass;
			if(StringUtil.isNotEmpty(this.getForward())) fullLocation = fullLocation + addSeparator(fullLocation) +"viewName=forward:" + actionUrl + "?service=" + this.getForward();
			if(StringUtil.isNotEmpty(this.getRedirect())) fullLocation = fullLocation + addSeparator(fullLocation) +"viewName=redirect:" + actionUrl + "?service=" + this.getRedirect();
			if(StringUtil.isNotEmpty(initdataService)) fullLocation = fullLocation + addSeparator(fullLocation) + "initdataService="+initdataService;
			if(StringUtil.isNotEmpty(initdataResult)) fullLocation = fullLocation + addSeparator(fullLocation) + "initdataResult="+initdataResult;	
			if(StringUtil.isNotEmpty(this.getFormName())) fullLocation = fullLocation + addSeparator(fullLocation) + "formName="+this.getFormName();
			if(StringUtil.isNotEmpty(this.getIsShowNewForm())) fullLocation = fullLocation + addSeparator(fullLocation) + "isShowNewForm="+this.getIsShowNewForm(); 
			if(StringUtil.isNotEmpty(this.getLayout())) fullLocation = fullLocation + addSeparator(fullLocation) + "layout="+this.getLayout(); 
	        
			if(StringUtil.isNotEmpty(getTiles())) fullLocation = fullLocation + addSeparator(fullLocation) + "tiles=" + getTiles();
	        else if(!getTilesProperties().isEmpty()) fullLocation = fullLocation + addSeparator(fullLocation) + "tiles=" + tilesAttrs;
	        
			if(paramNames.size() > 0){
				Iterator<String> paramItr = paramNames.iterator();
				while(paramItr.hasNext()){
					String paramName = (String)paramItr.next();
					fullLocation = fullLocation + addSeparator(fullLocation) + paramName+ "="+getProperty("request:" + paramName);
				}
			}
	        
	        if(isPartial){
	        	generatedCodes = appendCodes(generatedCodes,"<a id=\"" + this.getId() + "\"" + " href=");
	        	fullLocation = fullLocation.replace("&", "&amp;");
	        	generatedCodes = appendCodes(generatedCodes,fullLocation + "\">" + title + "</a>");	
	        }
	        else{   
	        	String frameTargetName = this.getTarget();
	        	if(StringUtil.isNotEmpty(frameTargetName)) {
	        		if(frameTargetName.equals("_blank")) 
	        			generatedCodes = generatePopupWindow(generatedCodes, fullLocation);
	        		else if(frameTargetName.equals("_parent"))
	        			generatedCodes = appendCodes(generatedCodes,"   parent.location.href=" + fullLocation + "\";");	
	        		else if(frameTargetName.equals("_self"))
	        			generatedCodes = appendCodes(generatedCodes,"   document.location.href=" + fullLocation + "\";");	
	        		else if(frameTargetName.equals("_top"))
	        			generatedCodes = appendCodes(generatedCodes,"   top.location.href=" + fullLocation + "\";");	
	        		else 
	        			generatedCodes = appendCodes(generatedCodes,"   top."+ this.getTarget() + ".location.href=" + fullLocation + "\";");	
	        	}
	        	else if(StringUtil.isNotEmpty(this.getPopup())) 
	        		generatedCodes = generatePopupWindow(generatedCodes, fullLocation);
	        	else
	        		generatedCodes = appendCodes(generatedCodes,"   document.location.href=" + fullLocation + "\";");	
				
				if(StringUtil.isNotEmpty(ifstatement)) generatedCodes = appendCodes(generatedCodes,"   }");	
			    generatedCodes = appendCodes(generatedCodes,"   };");
			    generatedCodes = appendCodes(generatedCodes,"//-->");  
			    generatedCodes = appendCodes(generatedCodes,"</script>");
	        }
	        generatedCodes = appendCodes(generatedCodes,"<!-- [END] Generated script codes from Anyframe tag -->");		
	        out.write(generatedCodes);
	        release();
		} catch (Exception ex) {
			throw new JspException(ex.getMessage());
		}

        return EVAL_PAGE;
    }

	private String addSeparator(String fullLocation) {
		return fullLocation.indexOf("?") != -1 ? "&" : "?";
	}
}
