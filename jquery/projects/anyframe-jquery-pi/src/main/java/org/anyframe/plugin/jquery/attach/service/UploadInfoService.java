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
package org.anyframe.plugin.jquery.attach.service;

import java.util.List;

import org.anyframe.plugin.jquery.domain.Attached;

/**
 * This class is a Interface class to provide file upload functionality.
 * 
 * @author Alex, Eum
 *
 */
public interface UploadInfoService {
	
	/**
	 * @param param
	 * @throws Exception
	 */
	void create(Attached param) throws Exception;
	
	/**
	 * @param id
	 * @throws Exception
	 */
	void remove(String id) throws Exception;
		
	/**
	 * @param id
	 * @return
	 * @throws Exception
	 */
	Attached get(String id) throws Exception;
	
	/**
	 * @param refId
	 * @return
	 * @throws Exception
	 */
	List<Attached> getFileList(String refId) throws Exception;
	
	/**
	 * @param refId
	 * @param newRefId
	 * @throws Exception
	 */
	void updateFileRefId(String refId, String newRefId) throws Exception;
}
