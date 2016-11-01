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
package org.anyframe.plugin.mip.query.attach.web;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

/**
 * This UploadController class is a Controller class to provide file upload.
 * 
 */
public class UploadController extends AbstractController {

	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['repository.path']}")
	private	String repositoryPath;
	//Velocity-Support-contextProperties-END
	
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		File filePath = new File(repositoryPath);
		
		if (!filePath.exists()) {
			boolean created = filePath.mkdirs();
			if (!created) {
				throw new Exception(
						"Fail to create a directory for attached file ["
								+ filePath + "]");
			}
		}
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS",
				new Locale("ko", "KR"));

		String id = "FILE-" + formatter.format(new Date());
		
		InputStream	inputStream		= request.getInputStream();
		OutputStream outputStream	= new	FileOutputStream( repositoryPath + "/" + id );
		
		byte[]	buffer	= new	byte[8192];
		
		while( true ) {
			int	n	= inputStream.read( buffer );
			
			if( n <= 0 ) {
				break;
			}
				
			outputStream.write( buffer, 0, n );
		}
		outputStream.close();

		String fileName = getFileName(request.getCookies());
		Cookie fileInfo = new	Cookie( "FileParam", id + "|" + fileName);
		
		response.setContentType("text/html");
		response.addCookie(fileInfo);
		return null;
	}

	private String getFileName(Cookie[] cookies) {
		String	fileName	= null;
		Cookie	fileInfo	= null;
		
		if( cookies != null ) {
			for( int i = 0, n = cookies.length ; i < n ; i++ ) {
				fileInfo	= cookies[i];
				if( fileInfo.getName().equals( "FileParam" ) ) {
					fileName	= fileInfo.getValue().toString();
					break;
				}
			}
		}
			
		return fileName;
	}
}
