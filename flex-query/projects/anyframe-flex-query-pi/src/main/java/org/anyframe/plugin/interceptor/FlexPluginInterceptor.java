/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.plugin.interceptor;

import java.io.File;
//import java.io.FileInputStream;
//import org.apache.commons.collections.ExtendedProperties;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;

import org.apache.tools.ant.Project;
import org.apache.tools.ant.Target;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import flex.ant.MxmlcTask;

public class FlexPluginInterceptor {

	protected final Logger log = LoggerFactory.getLogger(getClass());
	
	
	public void postInstall(String baseDir, File pluginJarFile)
			throws Exception {
		String contextRoot = "";
		
		try {
			/* project.mf 파일 읽음 - 이전방식
			File metadataFile = new File(new File(baseDir)
			+System.getProperty("file.separator") + "META-INF",
			"project.mf");
	
			ExtendedProperties anyframeProperty = new ExtendedProperties();
			anyframeProperty.load(new FileInputStream(metadataFile));
			contextRoot  = (String)anyframeProperty.getProperty("project.name");
			*/
			
			// org.anyframe.ide.common.config.xml 에서 읽음
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();			
			Document doc = builder.parse(new File(new File(baseDir)
			+System.getProperty("file.separator") + ".settings"+ System.getProperty("file.separator") +"anyframe","org.anyframe.ide.common.config.xml"));			
			NodeList list = doc.getElementsByTagName("pjtname");			
			contextRoot = list.item(0).getTextContent();
			
			String appRoot = baseDir + "/src/main/webapp";
			String fdkHome = appRoot + "/WEB-INF/flex-query/fdk";
			String serviceName = appRoot + "/WEB-INF/flex-query/services-config.xml";
			
			String[] arrFlexSrc = { "chat" , "collaboration", "companymgr", "fileupload", "httpservice", "insync01", 
					"insync02", "insync03", "insync04", "insync05", "insync06", "jmspush", "moviefinder", "uisample" };
			
			String[] arrMainFileName = {"chat.mxml" , "collaboration.mxml", "companymgr.mxml", "fileupload.mxml", "httpservice.mxml", "insync01.mxml", 
					"insync02.mxml", "insync03.mxml", "insync04.mxml", "insync05.mxml", "insync06.mxml", "jmspush.mxml", "moviefinder.mxml", "Main.mxml"};
			
			String[] arrSwfFileName = {"chat.swf" , "collaboration.swf", "companymgr.swf", "fileupload.swf", "httpservice.swf", "insync01.swf", 
					"insync02.swf", "insync03.swf", "insync04.swf", "insync05.swf", "insync06.swf", "jmspush.swf", "moviefinder.swf", "Main.swf"};
			
			String flexSrc = "";
			String mainFileName = "";
			String swfFileName = "";
			
			for( int i = 0 ; i < arrFlexSrc.length ; i ++ ){
				MxmlcTask mxmlcTask = new MxmlcTask();
				
				flexSrc = appRoot + "/WEB-INF/flex-query/pjt/" + arrFlexSrc[i] + "/src";
				mainFileName = flexSrc + "/" + arrMainFileName[i];
				swfFileName = appRoot + "/flex-query/"+ arrFlexSrc[i] + "/" + arrSwfFileName[i];
				
				Project project = new Project();
				project.setBasedir(".");
				project.setName("anyframe flex ui sample");
				project.setProperty("FLEX_HOME", fdkHome );
				
				Target target = new Target();
				target.setName("compile");
				target.setProject(project);
				
				mxmlcTask.setProject(project);
				mxmlcTask.init();
				mxmlcTask.setFile(mainFileName);
				mxmlcTask.setOutput(swfFileName);
				mxmlcTask.setDynamicAttribute("actionscript-file-encoding", "UTF-8");
				mxmlcTask.setDynamicAttribute("services", serviceName);
				mxmlcTask.setDynamicAttribute("context-root", contextRoot );	
				mxmlcTask.execute();
				
				mxmlcTask.clearArgs();
			}
		}catch(Exception e){
			e.printStackTrace();
			log
			.warn("Error occurred in postInstall FlexPluginInterceptor. The reason is a '{}'.", new Object[]{e.getMessage()});
		}
	}
}
