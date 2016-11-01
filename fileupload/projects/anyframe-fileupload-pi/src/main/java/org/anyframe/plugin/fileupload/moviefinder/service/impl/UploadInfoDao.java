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
package org.anyframe.plugin.fileupload.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.plugin.fileupload.domain.AttachedFile;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcDaoSupport;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Sooyeon Park
 */
@Repository("fileUploadInfoDao")
public class UploadInfoDao extends SimpleJdbcDaoSupport {

	@Inject
	public void setJdbcDaoDataSource(DataSource dataSource) throws Exception {
		super.setDataSource(dataSource);
	}
	public void create(AttachedFile attachedFile) throws Exception {
		String sql = "INSERT INTO FILEUPLOAD_ATTACHED (ref_id, id, name, file_size) "
				+ "VALUES (?, ?, ?, ?)";

		this.getSimpleJdbcTemplate().update(
				sql,
				new Object[] { attachedFile.getRefId(), attachedFile.getId(),
						attachedFile.getName(), attachedFile.getFileSize()});
	}
	
	public List<AttachedFile> list(String refId) throws Exception{
		String sql = "SELECT ref_id, id, name, file_size FROM FILEUPLOAD_ATTACHED "
			 + "WHERE ref_id = ?";
		return this.getSimpleJdbcTemplate().query(sql,
				new BeanPropertyRowMapper<AttachedFile>(AttachedFile.class), new Object[] { refId });
	}

	public void remove(String refId) throws Exception {
		String sql = "DELETE FROM FILEUPLOAD_ATTACHED WHERE ref_id = ?";
		this.getSimpleJdbcTemplate().update(sql, new Object[] { refId });
	}

}
