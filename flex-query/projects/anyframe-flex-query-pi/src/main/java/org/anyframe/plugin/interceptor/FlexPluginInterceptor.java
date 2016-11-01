package org.anyframe.plugin.interceptor;

import java.io.File;
import java.io.FileInputStream;

import org.apache.commons.collections.ExtendedProperties;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.Target;

import flex.ant.MxmlcTask;

public class FlexPluginInterceptor {

	protected final Log log = LogFactory.getLog(getClass());
	
	public void postInstall(String baseDir, File pluginJarFile)
			throws Exception {
		String contextRoot = "";
		
		try {
			File metadataFile = new File(new File(baseDir)
					+System.getProperty("file.separator") + "META-INF",
					"project.mf");
			
			ExtendedProperties anyframeProperty = new ExtendedProperties();
			anyframeProperty.load(new FileInputStream(metadataFile));
			
			contextRoot  = (String)anyframeProperty.getProperty("project.name");
			
			String appRoot = baseDir + "/src/main/webapp";
			String fdkHome = appRoot + "/WEB-INF/flex/fdk";
			String flexSrc = appRoot + "/WEB-INF/flex/pjt/src";
			String mainFileName = flexSrc + "/Main.mxml";
			String swfFileName = appRoot + "/flex/Main.swf";
			String serviceName = appRoot + "/WEB-INF/flex/services-config.xml";
			
			Project project = new Project();
			project.setBasedir(".");
			project.setName("anyframe flex ui sample");
			project.setProperty("FLEX_HOME", fdkHome );
			
			Target target = new Target();
			target.setName("compile");
			target.setProject(project);
						
			MxmlcTask mxmlcTask = new MxmlcTask();
			mxmlcTask.setProject(project);
			mxmlcTask.init();
			mxmlcTask.setFile(mainFileName);
			mxmlcTask.setOutput(swfFileName);
			mxmlcTask.setDynamicAttribute("actionscript-file-encoding", "UTF-8");
			mxmlcTask.setDynamicAttribute("services", serviceName);
			mxmlcTask.setDynamicAttribute("context-root", contextRoot );
			mxmlcTask.execute();
		}catch(Exception e){
			e.printStackTrace();
			log
			.warn("Error occurred in postUninstall FlexPluginInterceptor. The reason is a '"
					+ e.getMessage() + "'.");
		}
	}
}
