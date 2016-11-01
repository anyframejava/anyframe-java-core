/*
 * Copyright 2002-2009 the original author or authors.
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
package org.anyframe.generic.service.impl;

import java.io.Serializable;
import java.util.List;

import org.anyframe.datatype.SearchVO;
import org.anyframe.generic.dao.GenericDao;
import org.anyframe.generic.service.GenericService;
import org.anyframe.pagination.Page;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * This class serves as the Generic class for all other Services - namely to
 * hold common CRUD methods that they might all use. You should only need to
 * extend this class when your require custom CRUD logic. The original code of
 * this class comes from Appfuse framework.
 * <p>
 * 
 * @author <a href="mailto:matt@raibledesigns.com">Matt Raible</a>
 * @author modified by SooYeon Park
 * @param <T>
 *            a type variable
 * @param <PK>
 *            the primary key for that type
 */
public class GenericServiceImpl<T, PK extends Serializable> implements
		GenericService<T, PK> {
	/**
	 * Log variable for all child classes. Uses LogFactory.getLog(getClass())
	 * from Commons Logging
	 */
	protected final Log log = LogFactory.getLog(getClass());

	/**
	 * GenericDao instance, set by constructor of child classes
	 */
	protected GenericDao<T, PK> genericDao;

	public GenericServiceImpl() {
	}

	public GenericServiceImpl(GenericDao<T, PK> genericDao) {
		this.genericDao = genericDao;
	}

	/**
	 * {@inheritDoc}
	 */
	public void setGenericDao(GenericDao<T, PK> genericDao) {
		this.genericDao = genericDao;
	}

	public GenericDao<T, PK> getGenericDao() {
		return genericDao;
	}

	/**
	 * {@inheritDoc}
	 */
	public T get(PK id) throws Exception {
		return genericDao.get(id);
	}

	/**
	 * {@inheritDoc}
	 */
	public boolean exists(PK id) throws Exception {
		return genericDao.exists(id);
	}

	/**
	 * {@inheritDoc}
	 */
	public void create(T object) throws Exception {
		genericDao.create(object);
	}

	/**
	 * {@inheritDoc}
	 */
	public void update(T object) throws Exception {
		genericDao.update(object);
	}

	/**
	 * {@inheritDoc}
	 */
	public void remove(PK id) throws Exception {
		genericDao.remove(id);
	}

	/**
	 * {@inheritDoc}
	 */
	public Page getPagingList(SearchVO searchVO) throws Exception {
		return genericDao.getPagingList(searchVO);
	}

	/**
	 * {@inheritDoc}
	 */
	public Page getPagingList(T object, int pageIndex) throws Exception {
		return genericDao.getPagingList(object, pageIndex);
	}

	/**
	 * {@inheritDoc}
	 */
	public List<T> getList(SearchVO searchVO) throws Exception {
		return genericDao.getList(searchVO);
	}

	/**
	 * {@inheritDoc}
	 */
	public List<T> getList(T object) throws Exception {
		return genericDao.getList(object);
	}
}
