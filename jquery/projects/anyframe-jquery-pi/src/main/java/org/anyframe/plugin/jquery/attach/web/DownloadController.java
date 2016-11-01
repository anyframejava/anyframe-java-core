/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.plugin.jquery.attach.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.plugin.jquery.attach.service.UploadInfoService;
import org.anyframe.plugin.jquery.domain.Attached;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This DownloadController class is a Controller class 
 * to provide file download functionality.
 * 
 * @author Alex, Eum
 *
 */
@Controller
public class DownloadController {
	
	@Value("#{contextProperties['repository.path']}")
	private String repositoryPath;
	
	@Inject
	@Named("jqueryUploadInfoService")
	private UploadInfoService uploadInfoService;
	
	/**
	 * @param request
	 * @param response
	 * @param id
	 * @throws Exception
	 */
	@RequestMapping("/jquery/download.do")
	public void download(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value = "id", required = true) String id)
			throws Exception {

			Attached file = uploadInfoService.get(id);
			String fileExt = file.getName().substring(file.getName().lastIndexOf(".")+1).toLowerCase();
			String filePath = repositoryPath + "/" + id;
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
		      response.setHeader("Content-Disposition", "filename=\"" + URLEncoder.encode(file.getName(), "UTF-8") + "\";");
		    } else if (userAgent.indexOf("MSIE") > -1) { 
		      response.setHeader("Content-Disposition", "attachment; filename=\""
		          + java.net.URLEncoder.encode(file.getName(), "UTF-8") + "\";");
		    } else { 
		      response.setHeader("Content-Disposition", "attachment; filename=\""
		          + new String(file.getName().getBytes("euc-kr"), "latin1") + "\";");
		    }
		    
			response.setHeader("Content-Transfer-Encoding", "binary;");
			if(file.getFileSize() != null) {
				response.setHeader("Content-Length", "" + file.getFileSize());
			}
			response.setHeader("Pragma", "no-cache;");
			response.setHeader("Expires", "-1;"); 
			
			BufferedInputStream fin = null;
			BufferedOutputStream outs = null;
			
			try{
				File f = new File(filePath);
				if (f.isFile()) {
					fin = new BufferedInputStream(new FileInputStream(f));
					outs = new BufferedOutputStream(response.getOutputStream());
					int read = 0;
					while ((read = fin.read()) != -1){
						outs.write(read);
					}
					
				}
			}catch(Exception e){
				e.printStackTrace();
			}finally{
				if (outs != null){
					outs.flush();
					outs.close();
				}
				if (fin != null){
					fin.close();
				}
			}
			
	}
}
