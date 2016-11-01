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
package org.anyframe.generic.dao.hibernate;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.anyframe.datatype.SearchVO;
import org.anyframe.exception.NoResultException;
import org.anyframe.generic.dao.GenericDao;
import org.anyframe.hibernate.DynamicHibernateService;
import org.anyframe.pagination.Page;
import org.anyframe.util.NumberUtil;
import org.anyframe.util.StringUtil;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.util.ClassUtils;

/**
 * This class serves as the generic class for all other DAOs using Hibernate -
 * namely to hold common CRUD methods that they might all use. You should only
 * need to extend this class when your require custom CRUD logic. The original
 * code of this class comes from Appfuse framework.
 * <p/>
 * 
 * @author <a href="mailto:bwnoll@gmail.com">Bryan Noll</a>
 * @author modified by SooYeon Park
 * @param <T>
 *            a type variable
 * @param <PK>
 *            the primary key for that type
 */
public class GenericHibernateDao<T, PK extends Serializable> implements
		GenericDao<T, PK> {

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	/**
	 * Log variable for all child classes. Uses
	 * LoggerFactory.getLogger(getClass()) from Slf4j
	 */
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	private Class<T> persistentClass;
	private HibernateTemplate hibernateTemplate;
	private SessionFactory sessionFactory;

	/**
	 * This dynamicHibernateService is used to get dynamicHibernateService
	 * services
	 */
	private DynamicHibernateService dynamicHibernateService;

	public Class<T> getPersistentClass() {
		return persistentClass;
	}

	/**
	 * Sets the dynamicHibernateService to use.
	 * 
	 * @param dynamicHibernateService
	 *            The dynamicHibernateService to set
	 */
	public void setDynamicHibernateService(
			DynamicHibernateService dynamicHibernateService) {
		this.dynamicHibernateService = dynamicHibernateService;
	}

	/**
	 * default constructor
	 * 
	 */
	@SuppressWarnings("unchecked")
	public GenericHibernateDao() {
		if (!getClass().equals(this.getClass())) {
			this.persistentClass = (Class<T>) ((ParameterizedType) getClass()
					.getGenericSuperclass()).getActualTypeArguments()[0];
		}
	}

	/**
	 * Constructor that takes in a class to see which type of entity to persist.
	 * Use this constructor when subclassing.
	 * 
	 * @param persistentClass
	 *            the class type you'd like to persist
	 */
	public GenericHibernateDao(final Class<T> persistentClass) {
		this.persistentClass = persistentClass;
	}

	/**
	 * Sets the persistentClass to use.
	 * 
	 * @param persistentClass
	 *            the class type you'd like to persist
	 */
	public void setPersistentClass(final Class<T> persistentClass) {
		this.persistentClass = persistentClass;
	}

	public HibernateTemplate getHibernateTemplate() {
		return this.hibernateTemplate;
	}

	public SessionFactory getSessionFactory() {
		return this.sessionFactory;
	}

	@Autowired
	@Required
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
		this.hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	/**
	 * {@inheritDoc}
	 */
	public T get(PK id) {
		T entity = (T) hibernateTemplate.get(this.persistentClass, id);

		if (entity == null)
			throw new NoResultException("'" + this.persistentClass
					+ "' object with id '" + id + "' not found");

		return entity;
	}

	/**
	 * {@inheritDoc}
	 */
	public boolean exists(PK id) {
		T entity = (T) hibernateTemplate.get(this.persistentClass, id);
		return entity != null;
	}

	/**
	 * {@inheritDoc}
	 */
	public void create(T object) {
		hibernateTemplate.save(object);
	}

	/**
	 * {@inheritDoc}
	 */
	public void update(T object) {
		hibernateTemplate.update(object);
	}

	/**
	 * {@inheritDoc}
	 */
	public void remove(PK id) {
		hibernateTemplate.delete(this.get(id));
	}

	public DynamicHibernateService getDynamicHibernateService() {
		return dynamicHibernateService;
	}

	/**
	 * Generic method to get object list based on search condition and search
	 * keyword
	 * 
	 * @param searchVO
	 *            search condition and search keyword
	 * @return result page object with total count
	 * 
	 * <br/>
	 *         Dynamic Hibernate Mapping XML Example:
	 * 
	 *         <pre>
	 * &lt;dynamic-hibernate&gt;
	 * 	&lt;query name="findBoardList"&gt;
	 * 		&lt;![CDATA[
	 * 		FROM Board board 
	 * 		#if ($keywordNum != "")			
	 * 			WHERE 		
	 * 			#if ($condition == "All" || $condition == "")
	 * 				(
	 * 				  board.boardName like :keywordStr
	 * 				 #if($isNumeric == "true")
	 * 				 	or board.id.boardId = {{keywordNum}}  or board.id.boardMasterId = {{keywordNum}}  or board.boardTopics = {{keywordNum}} 
	 * 				 #end
	 * 				)	
	 * 			#elseif($condition == "id.boardId" || $condition == "id.boardMasterId" || $condition == "boardTopics")
	 * 				board.{{condition}} = {{keywordNum}}			
	 * 			#elseif($condition == "boardName")
	 * 				board.{{condition}} like :keywordStr			
	 * 			#end
	 * 		#end			
	 * 			order by							
	 * 				board.id.boardId
	 * 		]]&gt;
	 * 	&lt;/query&gt;
	 * 
	 * 	&lt;query name="countBoardList"&gt;
	 * 		&lt;![CDATA[
	 * 		SELECT count(*) 
	 * 		FROM Board board 
	 * 		#if ($keywordNum != "")			
	 * 			WHERE 		
	 * 			#if ($condition == "All" || $condition == "")
	 * 				(
	 * 				  board.boardName like :keywordStr
	 * 				 #if($isNumeric == "true")
	 * 				 	or board.id.boardId = {{keywordNum}}  or board.id.boardMasterId = {{keywordNum}}  or board.boardTopics = {{keywordNum}} 
	 * 				 #end
	 * 				)	
	 * 			#elseif($condition == "id.boardId" || $condition == "id.boardMasterId" || $condition == "boardTopics")
	 * 				board.{{condition}} = {{keywordNum}}			
	 * 			#elseif($condition == "boardName")
	 * 				board.{{condition}} like :keywordStr			
	 * 			#end
	 * 		#end					
	 * 		]]&gt;
	 * 	&lt;/query&gt;	
	 * &lt;/dynamic-hibernate&gt;
	 * </pre>
	 * 
	 */
	public Page getPagingList(SearchVO searchVO) {
		int pageIndex = searchVO.getPageIndex();

		String searchCondition = StringUtil.nullToString(searchVO
				.getSearchCondition());
		String searchKeyword = StringUtil.nullToString(searchVO.getSearchKeyword());
		String isNumeric = NumberUtil.isNumber(searchKeyword) ? "true"
				: "false";

		Object[] args = new Object[4];
		args[0] = "condition=" + searchCondition;
		args[1] = "keywordStr=%" + searchKeyword + "%";
		args[2] = "keywordNum=" + searchKeyword + "";
		args[3] = "isNumeric=" + isNumeric;

		List<?> resultList = this.getDynamicHibernateService()
				.findList(
						"find" + ClassUtils.getShortName(getPersistentClass())
								+ "List", args, pageIndex, pageSize);
		Long totalSize = (Long) this.getDynamicHibernateService().find(
				"count" + ClassUtils.getShortName(getPersistentClass())
						+ "List", args);

		Page resultPage = new Page(resultList, pageIndex, totalSize.intValue(),
				pageUnit, pageSize);
		return resultPage;
	}

	/**
	 * {@inheritDoc}
	 */
	public Page getPagingList(T object, int pageIndex) {
		throw new UnsupportedOperationException("Method is not supported.");
	}

	/**
	 * {@inheritDoc}
	 */
	public List<T> getList(SearchVO searchVO) {

		String searchCondition = StringUtil.nullToString(searchVO
				.getSearchCondition());
		String searchKeyword = StringUtil.nullToString(searchVO.getSearchKeyword());
		String isNumeric = NumberUtil.isNumber(searchKeyword) ? "true"
				: "false";

		Object[] args = new Object[4];
		args[0] = "condition=" + searchCondition;
		args[1] = "keywordStr=%" + searchKeyword + "%";
		args[2] = "keywordNum=" + searchKeyword + "";
		args[3] = "isNumeric=" + isNumeric;

		return this.getDynamicHibernateService()
				.findList(
						"find" + ClassUtils.getShortName(getPersistentClass())
								+ "List", args);
	}

	/**
	 * {@inheritDoc}
	 */
	public List<T> getList(T object) {
		throw new UnsupportedOperationException("Method is not supported.");
	}
}
