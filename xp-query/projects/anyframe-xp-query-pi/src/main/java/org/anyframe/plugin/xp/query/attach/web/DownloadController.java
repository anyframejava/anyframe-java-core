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
package org.anyframe.plugin.xp.query.attach.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Download Controller class for file download function
 * 
 * @author Youngmin Jo
 */
@Controller
public class DownloadController{

	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['repository.path']}")
	private	String repositoryPath;
	//Velocity-Support-contextProperties-END
	
	@RequestMapping("/xpQueryDownload.do")
	protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
	    String fileId = request.getParameter("fileId");
	    String fileName = request.getParameter("fileName");
	    String filePath = repositoryPath + "/" + fileId;
	    String fileExt = fileName.substring(fileName.lastIndexOf(".")+1);
	    
	    response.reset();
	    	
	    if(fileExt.equals("doc")){ response.setContentType("application/msword;charset=MS949"); 
	    }else if(fileExt.equals("xls")){ response.setContentType("application/x-msexcel;charset=MS949");
	    }else if(fileExt.equals("pdf")){ response.setContentType("application/x-msdownload");
	    }else if(fileExt.equals("ppt")){ response.setContentType("application/x-mspowerpoint");
	    }else if(fileExt.equals("js")){ response.setContentType("application/x-javascript");
	    }else if(fileExt.equals("zip")){ response.setContentType("application/zip");
	    }else if(fileExt.equals("gif")){ response.setContentType("image/gif");
	    }else if(fileExt.equals("jpeg") || fileExt.equals("jpg") || fileExt.equals("jpe")){ response.setContentType("image/jpeg");
	    }else if(fileExt.equals("css")){ response.setContentType("text/css");
	    }else if(fileExt.equals("html") || fileExt.equals("htm")){ response.setContentType("text/html");
	    }else if(fileExt.equals("xml")){ response.setContentType("text/xml");
	    }else{ response.setContentType("application/octet-stream"); 
	    }
	    
	    String userAgent = request.getHeader("User-Agent");
	    if (userAgent.indexOf("MSIE 5.5") > -1) {
	    	response.setHeader("Content-Disposition", "filename=\"" + URLEncoder.encode(fileName, "UTF-8") + "\";");
	    } else if (userAgent.indexOf("MSIE") > -1) {
	    	response.setHeader("Content-Disposition", "attachment; filename=\""
	    			+ java.net.URLEncoder.encode(fileName, "UTF-8") + "\";");
	    } else {
	    	response.setHeader("Content-Disposition", "attachment; filename=\""
	    			+ new String(fileName.getBytes("euc-kr"), "latin1") + "\";");
	    }
	    response.setHeader("Content-Transfer-Encoding", "binary;");
			
	    response.setHeader("Pragma", "no-cache;");
	    response.setHeader("Expires", "-1;");
			
	    BufferedInputStream fin = null;
	    BufferedOutputStream outs = null;
	    int read = 0;
	    	
	    try {
	    	File file = new	File(filePath);
	    	byte b[] = new byte[4096];
	    	
	    	if(file.isFile()){
	    		fin = new BufferedInputStream(new FileInputStream(file));
	    		outs = new BufferedOutputStream(response.getOutputStream());
	    			
	    		while ((read = fin.read(b)) != -1){
	    			outs.write(b,0,read);
	    		}
	    			
	    	} else {
	    		
	    	}
	    		
	    	outs.flush();
	    	outs.close();
	    	fin.close();
	    } catch (Exception e) {
	    	e.printStackTrace();
	    } finally {
	    	if(outs!=null) outs.close();
	    	if(fin!=null) fin.close();
	    }
	    return null;
	}
}
