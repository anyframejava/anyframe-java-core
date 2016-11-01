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
package org.anyframe.simpleweb.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.idgen.IdGenService;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

/**
 * FileUploadController Class which provide
 * 
 * @author Sooyeon Park
 */
public class FileUploadController extends AbstractController{
	
	//@Value("#{contextProperties['UPLOAD_PATH'] ?: \"/upload/\"}")
	//String uploadPath;

	protected IdGenService idGenService;

	public void setIdGenerationService(IdGenService idGenService) {
		this.idGenService = idGenService;
	}
	
	private String uploadPath = "/upload/";
	
	public void setUploadPath(String uploadPath){
		this.uploadPath = uploadPath;
	}
	
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		MultipartFile file = (MultipartFile) ((MultipartHttpServletRequest)request).getFile("fileData");
		String fileDir = request.getParameter("fileDir");
		
		String destDir = request.getSession().getServletContext().getRealPath(
				uploadPath);
		
		if (fileDir == null) {
			fileDir = idGenService.getNextStringId();
			FileUtils.forceMkdir(new File(destDir + "/" + fileDir));
		}

		//file.transferTo(new File(destDir + "/" + fileDir, URLEncoder.encode(file.getOriginalFilename(), "utf-8")));
		file.transferTo(new File(destDir + "/" + fileDir, file.getOriginalFilename()));
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("fileNm", file.getOriginalFilename());
		result.put("fileSize", file.getSize());
		result.put("fileDir", fileDir);

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("uploadResult", result);

		return mav;
	}

}
