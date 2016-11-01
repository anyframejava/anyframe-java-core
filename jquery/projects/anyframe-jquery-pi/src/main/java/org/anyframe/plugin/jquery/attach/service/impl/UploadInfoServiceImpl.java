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
package org.anyframe.plugin.jquery.attach.service.impl;

import java.io.File;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.attach.service.UploadInfoService;
import org.anyframe.plugin.jquery.domain.Attached;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * This class is a Implementation class to provide file upload functionality.
 * 
 * @author arumb-laptop
 *
 */
@Service("jqueryUploadInfoService")
@Transactional(rollbackFor = {Exception.class}, propagation = Propagation.REQUIRED)
public class UploadInfoServiceImpl implements UploadInfoService {

	@Value("#{contextProperties['repository.path']}")
	private String repositoryPath;
	
    @Inject
    @Named("jqueryUploadInfoDao")
	private UploadInfoDao uploadInfoDao;
	
	/* (non-Javadoc)
	 * @see org.anyframe.plugin.jquery.attache.service.UploadInfoService#create(org.anyframe.plugin.jquery.domain.Attached)
	 */
	public void create(Attached param) throws Exception {
		this.uploadInfoDao.create(param);
	}

	/* (non-Javadoc)
	 * @see org.anyframe.plugin.jquery.attache.service.UploadInfoService#get(java.lang.String)
	 */
	public Attached get(String id) throws Exception {
		return this.uploadInfoDao.get(id);
	}

	/* (non-Javadoc)
	 * @see org.anyframe.plugin.jquery.attache.service.UploadInfoService#getFileList(java.lang.String)
	 */
	public List<Attached> getFileList(String refId) throws Exception {
		return this.uploadInfoDao.selectFileListByRefId(refId);
	}

	/* (non-Javadoc)
	 * @see org.anyframe.plugin.jquery.attache.service.UploadInfoService#remove(java.lang.String)
	 */
	public void remove(String id) throws Exception {
		this.uploadInfoDao.remove(id);
    	File f = new File(repositoryPath + id);
    	if(f.exists()) f.delete();
	}

	/* (non-Javadoc)
	 * @see org.anyframe.plugin.jquery.attache.service.UploadInfoService#updateFileRefId(java.lang.String, java.lang.String)
	 */
	public void updateFileRefId(String refId, String newRefId) throws Exception {
		this.uploadInfoDao.updateFileRefId(refId, newRefId);
	}

}
