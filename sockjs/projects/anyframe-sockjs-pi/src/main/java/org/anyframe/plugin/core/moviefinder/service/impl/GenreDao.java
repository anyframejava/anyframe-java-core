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
package org.anyframe.plugin.core.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.plugin.core.domain.Genre;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

/**
 * This GenreDao class is a DAO class to provide genre list functionality.
 * 
 * @author Sooyeon Park
 */
@Repository("coreGenreDao")
public class GenreDao extends JdbcDaoSupport {

	@Inject
	public void setJdbcDaoDataSource(DataSource dataSource) {
		super.setDataSource(dataSource);
	}

	public List<Genre> getList() {
		String sql = "SELECT GENRE_ID, NAME FROM GENRE ORDER BY NAME";
		return super.getJdbcTemplate().query(sql,
				new BeanPropertyRowMapper<Genre>(Genre.class));
	}

}
