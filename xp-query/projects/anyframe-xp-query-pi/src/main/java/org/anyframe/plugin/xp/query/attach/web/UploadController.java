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

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.xp.query.web.handler.XPResponseHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.tobesoft.xplatform.data.ColumnHeader;
import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.DataTypes;
import com.tobesoft.xplatform.data.VariableList;

/**
 * Upload Controller Class for file upload function
 * 
 * @author Youngmin Jo
 */
@Controller
public class UploadController {
	
	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['repository.path']}")
	private String repositoryPath;
	//Velocity-Support-contextProperties-END

	@RequestMapping("/xpQueryUpload.do")
	@ResponseBody
	protected XPResponseHandler uploadFile(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();
		DataSet resultDs = new DataSet("dsUploadResult");

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();

		File filePath = new File(repositoryPath);

		if (!filePath.exists()) {
			boolean created = filePath.mkdirs();
			if (!created) {
				throw new Exception(
						"Fail to create a directory for attached file ["
								+ filePath + "]");
			}
		}

		try {
			Object[] fileList = fileMap.values().toArray();
			resultDs.addColumn(new ColumnHeader("FILE_NAME", DataTypes.STRING));
			resultDs.addColumn(new ColumnHeader("ID", DataTypes.STRING));

			for (int i = 0; i < fileList.length; i++) {
				SimpleDateFormat formatter = new SimpleDateFormat(
						"yyyyMMddHHmmssSSS", new Locale("ko", "KR"));
				String id = "FILE-" + formatter.format(new Date()) + i;
				((MultipartFile) fileList[i]).transferTo(new File(filePath
						+ "/" + id));
				int row = resultDs.newRow();
				resultDs.set(row, "FILE_NAME", ((MultipartFile) fileList[i])
						.getOriginalFilename());
				resultDs.set(row, "ID", id);
			}

			outputDataSetList.add(resultDs);
			
			XPResponseHandler responseHandler = new XPResponseHandler(outputDataSetList, outputVariableList);
			responseHandler.setResultMessage(0, "Success");
			
			return responseHandler;
		} catch (Exception e) {
			String msg = e.getMessage();

			if (msg == null)
				msg = "Fail to process client request.";
			
			XPResponseHandler responseHandler = new XPResponseHandler(outputDataSetList, outputVariableList);
			responseHandler.setResultMessage(-1, msg);
			
			return responseHandler;
			
		} 
	}
}
