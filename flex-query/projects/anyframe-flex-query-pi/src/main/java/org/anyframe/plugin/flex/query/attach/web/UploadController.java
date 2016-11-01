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
package org.anyframe.plugin.flex.query.attach.web;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller("flexQueryUploadController")
public class UploadController {

	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['repository.path']}")
	private String repositoryPath;
	//Velocity-Support-contextProperties-END

	@RequestMapping("/flexQueryUpload.do")
	public String upload(
			@RequestParam(value = "file", required = false) MultipartFile file,
			Model model) throws Exception {

		if( repositoryPath == null ){
			repositoryPath = "c:/anyframe/storage";
		}
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

		file.transferTo(new File(filePath + "/" + id));

		model.addAttribute("attachedId", id);
		
		return "/flex-query/fileupload/uploadresult";
	}

}
