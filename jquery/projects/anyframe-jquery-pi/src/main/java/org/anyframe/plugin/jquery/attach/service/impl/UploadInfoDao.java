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

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.domain.Attached;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.stereotype.Repository;

/**
 * This class is a DAO class to provide file upload functionality.
 * 
 * @author arumb-laptop
 *
 */
@Repository("jqueryUploadInfoDao")
public class UploadInfoDao extends AbstractDao {
	
	@Inject
	@Named("queryService")
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}
	
	/**
	 * @param param
	 * @throws Exception
	 */
	public void create(Attached param) throws Exception {
		super.create("JqueryAttached", param);
	}
	
	/**
	 * @param id
	 * @throws Exception
	 */
	public void remove(String id) throws Exception {
		Attached param = new Attached();        
    	param.setId(id);    
		super.remove("JqueryAttached", param);
	}

	/**
	 * @param id
	 * @param newFileRefId
	 * @throws Exception
	 */
	public void updateFileRefId(String id, String newRefId) throws Exception {
		super.getQueryService().update("updateRefIdJqueryAttached", new Object[] {new Object[] { "refId", id }, new Object[] { "newRefId", newRefId }});
	}

	/**
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Attached get(String id) throws Exception {
		Attached param = new Attached();		
		param.setId(id);
				
		return (Attached) super.findByPk("JqueryAttached", param);
	}
	
	/**
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Attached> selectFileListByRefId(String refId) throws Exception{
		return (List<Attached>)super.getQueryService().find("selectJqueryAttachedListByRefId", new Object[] {new Object[] { "refId", refId }});
	}
}
