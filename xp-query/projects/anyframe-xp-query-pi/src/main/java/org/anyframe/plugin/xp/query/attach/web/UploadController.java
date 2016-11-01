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

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.tobesoft.xplatform.data.ColumnHeader;
import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataTypes;
import com.tobesoft.xplatform.data.PlatformData;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformResponse;
import com.tobesoft.xplatform.tx.PlatformType;

/**
 * Upload Controller Class for file upload function
 * 
 * @author Youngmin Jo
 */
public class UploadController extends AbstractController {
	private String contentType = PlatformType.CONTENT_TYPE_XML; // Default - XML
	
	private String charset = PlatformType.DEFAULT_CHAR_SET; // Default CharSet = utf - 8

	public void setContentType(String contentsType) {
		this.contentType = contentsType;
	}

	public void setCharset(String charset) {
		this.charset = charset;
	}
	
	@Value("#{contextProperties['repository.path']}")
	private String repositoryPath;

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		PlatformData outPlatformData = new PlatformData();
		VariableList outVL = outPlatformData.getVariableList();
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
			
			outPlatformData.addDataSet(resultDs);
			outVL.add("ErrorCode", 0);
			outVL.add("ErrorMsg", "Success");
		} catch (Exception e) {
			String msg = e.getMessage();

			if (msg == null)
				msg = "Fail to process client request.";
			
			outVL.add("ErrorCode", -1);
			outVL.add("ErrorMsg", msg);
		} finally {
			HttpPlatformResponse platformResponse = new HttpPlatformResponse(
					response);
			platformResponse.setContentType(contentType);
			platformResponse.setCharset(charset);
			platformResponse.setData(outPlatformData);
			platformResponse.sendData();
		}

		return null;
	}
}
