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
package org.anyframe.plugin.jasypt.moviefinder.service.impl;

import java.util.List;

import javax.sql.DataSource;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jasypt.domain.Movie;

/**
 * This GenericDao is a Generic type DAO Interface.
 * 
 * @author Joonbo Jang
 */
public interface GenericDao<T> {

	public void setJdbcDaoDataSource(DataSource dataSource);

	public List<T> getList();

	public Page getPagingList(T t, int pageIndex);

	public void create(T t);

	public void remove(String id);

	public void update(T t);

	public Movie get(String id);

	String getDaoName();

}
