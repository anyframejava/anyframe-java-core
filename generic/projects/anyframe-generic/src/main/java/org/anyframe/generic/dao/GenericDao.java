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
package org.anyframe.generic.dao;

import java.io.Serializable;
import java.util.List;

import org.anyframe.datatype.SearchVO;
import org.anyframe.pagination.Page;


/**
 * Generic DAO (Data Access Object) with common methods to CRUD POJOs.
 * <p>
 * Extend this interface if you want typesafe (no casting necessary) DAO's for
 * your domain objects. The original code of this class comes from Appfuse
 * framework.
 * 
 * @author <a href="mailto:bwnoll@gmail.com">Bryan Noll</a>
 * @author modified by SooYeon Park
 * @param <T>
 *            a type variable
 * @param <PK>
 *            the primary key for that type
 */
public interface GenericDao<T, PK extends Serializable> {

	/**
	 * Sets the persistentClass to use.
	 * 
	 * @param persistentClass
	 *            the class type you'd like to persist
	 */
	public void setPersistentClass(final Class<T> persistentClass);
	
	/**
	 * Generic method to get an object based on class and identifier. An
	 * anyframe.common.exception.BaseException is thrown if nothing is
	 * found.
	 * 
	 * @param id
	 *            the identifier (primary key) of the object to get
	 * @return a populated object
	 * @see anyframe.common.exception.BaseException
	 */
	T get(PK id);

	/**
	 * Checks for existence of an object of type T using the id argument.
	 * 
	 * @param id
	 *            the id of the entity
	 * @return - true if it exists, false if it doesn't
	 */
	boolean exists(PK id);

	/**
	 * Generic method to create an object - handles insert
	 * 
	 * @param object
	 *            the object to create
	 */
	void create(T object);

	/**
	 * Generic method to update an object - handles update
	 * 
	 * @param object
	 *            the object to save
	 */
	void update(T object); 

	/**
	 * Generic method to delete an object based on class and id
	 * 
	 * @param id
	 *            the identifier (primary key) of the object to remove
	 */
	void remove(PK id);

	/**
	 * Generic method to get object list based on search condition and search
	 * keyword
	 * 
	 * @param searchVO
	 *            search condition and search keyword
	 * @return result page object with total count
	 */
	public Page getPagingList(SearchVO searchVO);

	/**
	 * Generic method to get object list based on dmain object.
	 * 
	 * @param Object
	 *            domain object
	 * @return Page
	 */
	public Page getPagingList(T object, int pageIndex);

	/**
	 * Generic method to get object list based on arguments
	 * 
	 * @param searchVO
	 *            search condition and search keyword
	 * @return List
	 */
	public List<T> getList(SearchVO searchVO);

	/**
	 * Generic method to get object list based on arguments
	 * 
	 * @param Object
	 *            domain object
	 * @return List
	 */
	public List<T> getList(T object);
}
