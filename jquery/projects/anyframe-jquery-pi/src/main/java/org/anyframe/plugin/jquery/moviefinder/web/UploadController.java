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
package org.anyframe.plugin.jquery.moviefinder.web;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * This UploadController class is a Controller class to provide file upload
 * functionality.
 * 
 * @author Sunjoong Kim
 * 
 */

@Controller("jqueryUploadController")
@RequestMapping("/jqueryUploadFile.do")
public class UploadController {
	private String uploadPath = "/upload";

	@RequestMapping
	public String uploadFile(
			@RequestParam(value = "fileData", required = false) MultipartFile file,
			Model model, HttpServletRequest request) throws Exception {

		String destDir = request.getSession().getServletContext().getRealPath(
				uploadPath);

		File repositoryDir = new File(destDir);
		if (!repositoryDir.exists()) {
			boolean created = repositoryDir.mkdirs();
			if (!created) {
				throw new Exception(
						"Fail to create a directory for attached file ["
								+ repositoryDir + "]");
			}
		}

		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS",
				new Locale("ko", "KR"));

		String realFileName = file.getOriginalFilename();
		String fileNameExtension = realFileName.substring(
				realFileName.lastIndexOf(".")).toLowerCase();
		String fileId = "FILE-" + formatter.format(new Date());
		String convertedFileName = fileId + fileNameExtension;
		String filePathToBeStored = uploadPath + "/" + convertedFileName;

		file.transferTo(new File(destDir + "/" + convertedFileName));

		model.addAttribute("filePaths", filePathToBeStored);
		model.addAttribute("realFileName", realFileName);

		return "jsonView";
	}
}
