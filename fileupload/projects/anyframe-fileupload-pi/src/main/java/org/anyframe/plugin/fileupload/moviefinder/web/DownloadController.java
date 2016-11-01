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
package org.anyframe.plugin.fileupload.moviefinder.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.net.URLEncoder;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.anyframe.plugin.fileupload.sftp.service.SftpService;
import org.apache.commons.vfs.FileType;
import org.apache.commons.vfs.provider.sftp.SftpFileObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("fileDownloadController")
@RequestMapping("/fileDownload.do")
public class DownloadController {
	
	@Inject
	private SftpService sftpService;
	
	@RequestMapping
	public void download(HttpServletRequest request, HttpServletResponse response, HttpSession session,
			@RequestParam("id") String id, @RequestParam("name")String name,
			@RequestParam("fileSize") String fileSize) throws Exception{
		
		String fileExt = name.substring(name.lastIndexOf(".")+1);
		
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
	      response.setHeader("Content-Disposition", "filename=\"" + URLEncoder.encode(name, "UTF-8") + "\";");
	    } else if (userAgent.indexOf("MSIE") > -1) { 
	      response.setHeader("Content-Disposition", "attachment; filename=\""
	          + java.net.URLEncoder.encode(name, "UTF-8") + "\";");
	    } else { 
	      response.setHeader("Content-Disposition", "attachment; filename=\""
	          + new String(name.getBytes("euc-kr"), "latin1") + "\";");
	    }
	    
		response.setHeader("Content-Transfer-Encoding", "binary;");
		if(fileSize != null) {
			response.setHeader("Content-Length", "" + fileSize);
		}
		response.setHeader("Pragma", "no-cache;");
		response.setHeader("Expires", "-1;"); 
		
		
		//SFTP 다운로드 로직 추가(FileObject)
		SftpFileObject fo = sftpService.getSftpFileObject(id);
		
		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;
		
		try{
			if (fo.getType() == FileType.FILE) {
				//FileObject의  InputStream 사용
				fin = new BufferedInputStream(fo.getInputStream());
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
