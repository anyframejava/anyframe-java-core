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
package org.anyframe.plugin.fileupload.sftp.service;

import java.io.File;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.vfs.provider.sftp.SftpFileObject;

public interface SftpService {
	
	Log logger = LogFactory.getLog(SftpService.class);
	
	/**
	 * 
	 * @param localFile
	 * @param fileId
	 * @throws Exception
	 */
	public void upload(File localFile, String fileId) throws Exception;		
	
	/**
	 * 
	 * @param localFile
	 * @param fileId
	 * @throws Exception
	 */
	public void download(File localFile, String fileId) throws Exception;

	/**
	 * 
	 * @param fileId
	 * @throws Exception
	 */
	public void remove(String fileId) throws Exception;
	
	/**
	 * 
	 * @param fileId
	 * @return
	 * @throws Exception
	 */
	public SftpFileObject getSftpFileObject(String fileId) throws Exception;

}
