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
package org.anyframe.generic.dao.query;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.anyframe.datatype.SearchVO;
import org.anyframe.exception.NoResultException;
import org.anyframe.generic.dao.GenericDao;
import org.anyframe.pagination.Page;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.anyframe.query.exception.QueryException;
import org.anyframe.util.NumberUtil;
import org.anyframe.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.ClassUtils;

/**
 * This class serves as the generic class for all other DAOs using Anyframe
 * QueryService - namely to hold common CRUD methods that they might all use.
 * You should only need to extend this class when your require custom CRUD
 * logic.
 * <p/>
 * 
 * @author <a href="mailto:bwnoll@gmail.com">Bryan Noll</a>
 * @author modified by SooYeon Park
 * @param <T>
 *            a type variable
 * @param <PK>
 *            the primary key for that type
 */
public class GenericQueryDao<T, PK extends Serializable> extends
		QueryServiceDaoSupport implements GenericDao<T, PK> {

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

	public Class<T> getPersistentClass() {
		return persistentClass;
	}

	/**
	 * default constructor
	 * 
	 */
	@SuppressWarnings("unchecked")
	public GenericQueryDao() {
		if (!getClass().equals(this.getClass())) {
			this.persistentClass = (Class<T>) ((ParameterizedType) getClass()
					.getGenericSuperclass()).getActualTypeArguments()[0];
		}
	}

	/**
	 * Constructor that takes in a class to see which type of entity to persist.
	 * Use this constructor when subclassing or using dependency injection.
	 * 
	 * @param persistentClass
	 *            the class type you'd like to persist
	 */
	public GenericQueryDao(final Class<T> persistentClass) {
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

	private Object getObject(PK id) throws InstantiationException,
			IllegalAccessException, ClassNotFoundException {
		Object obj = Thread.currentThread().getContextClassLoader().loadClass(
				this.persistentClass.getName()).newInstance();
		QueryDaoUtil.setPrimaryKey(obj, id.getClass(), id);
		return obj;
	}

	/**
	 * {@inheritDoc}
	 */
	@SuppressWarnings("unchecked")
	public T get(PK id) {
		T object;
		try {
			object = (T) findByPk("find"
					+ ClassUtils.getShortName(this.persistentClass) + "ByPk",
					getObject(id));
		} catch (Exception e) {
			throw new QueryException("Cannot get object", e);
		}

		if (object == null)
			throw new NoResultException("'" + this.persistentClass
					+ "' object with id '" + id + "' not found");

		return object;
	}

	/**
	 * {@inheritDoc}
	 */
	@SuppressWarnings("unchecked")
	public boolean exists(PK id) {
		T object;
		try {
			object = (T) findByPk("find"
					+ ClassUtils.getShortName(this.persistentClass) + "ByPk",
					getObject(id));
		} catch (Exception e) {
			throw new QueryException("Cannot get object", e);
		}

		return object != null;
	}

	/**
	 * {@inheritDoc}
	 */
	public void create(T object) {
		String className = ClassUtils.getShortName(object.getClass());
		create("create" + className, object);
	}

	/**
	 * {@inheritDoc}
	 */
	public void update(T object) {
		String className = ClassUtils.getShortName(object.getClass());
		update("update" + className, object);
	}

	/**
	 * {@inheritDoc}
	 */
	public void remove(PK id) {
		try {
			remove("remove" + ClassUtils.getShortName(this.persistentClass),
					getObject(id));
		} catch (Exception e) {
			throw new QueryException("Cannot get object", e);
		}
	}

	/**
	 * Generic method to get object list based on search condition and search
	 * keyword
	 * 
	 * This method will be mostly overridden by developers to use specific
	 * search conditions.
	 * 
	 * @param searchVO
	 *            search condition and search keyword
	 * @return result page object with total count
	 * 
	 * <br/>
	 *         Query Mapping XML Example:
	 * 
	 *         <pre>
	 *  &lt;queryservice&gt;
	 *   &lt;queries&gt;
	 * 		&lt;query id="findBoardList" isDynamic="true"&gt;
	 * 	&lt;statement&gt;
	 * 	&lt;![CDATA[
	 * 		SELECT 
	 * 			board.BOARD_ID, board.BOARD_DESC, board.BOARD_MASTER_ID, board.BOARD_NAME, board.BOARD_ORDER, board.BOARD_TOPICS, board.REG_DATE 
	 * 		FROM BOARD board
	 * 		#if ($keywordNum != "")			
	 * 			WHERE 		
	 * 			#if ($condition == "All" || $condition == "")
	 * 				(
	 * 				  board.BOARD_NAME like :keywordStr
	 * 				 #if($isNumeric == "true")
	 * 				 	or board.BOARD_ID = {{keywordNum}}  or board.BOARD_MASTER_ID = {{keywordNum}}  or board.BOARD_TOPICS = {{keywordNum}} 
	 * 				 #end
	 * 				)	
	 * 			#elseif($condition == "id.boardId")
	 * 				board.BOARD_ID = {{keywordNum}}	
	 * 			#elseif($condition == "id.boardMasterId")
	 * 				board.BOARD_MASTER_ID = {{keywordNum}}	
	 * 			#elseif($condition == "boardTopics")
	 * 				board.BOARD_TOPICS = {{keywordNum}}	
	 * 			#elseif($condition == "boardName")
	 * 				board.BOARD_NAME like :keywordStr			
	 * 			#end
	 * 		#end			
	 * 			order by							
	 * 			board.BOARD_ID
	 * 	]]&gt;
	 * 	&lt;/statement&gt;
	 * 	&lt;result class="singleapp1.foundation.sales.dao.Board"&gt;		
	 * 		&lt;result-mapping column="{BOARD_ID, BOARD_MASTER_ID}" attribute="{id.boardId, id.boardMasterId}"/&gt;
	 * 		&lt;result-mapping column="{BOARD_MASTER_ID}" attribute="{boardMaster.boardMasterId}"/&gt;
	 * 	&lt;/result&gt;				
	 *    &lt;/query&gt;
	 *   &lt;/queries&gt;
	 *  &lt;/queryservice&gt;
	 * </pre>
	 * 
	 */
	public Page getPagingList(SearchVO searchVO) {
		int pageIndex = searchVO.getPageIndex();

		String searchCondition = StringUtil.nullToString(searchVO
				.getSearchCondition());
		String searchKeyword = StringUtil.nullToString(searchVO
				.getSearchKeyword());
		String isNumeric = NumberUtil.isNumber(searchKeyword) ? "true"
				: "false";

		Object[] args = new Object[4];
		args[0] = "condition=" + searchCondition;
		args[1] = "keywordStr=%" + searchKeyword + "%";
		args[2] = "keywordNum=" + searchKeyword + "";
		args[3] = "isNumeric=" + isNumeric;

		return this.findListWithPaging("find"
				+ ClassUtils.getShortName(getPersistentClass()) + "List", args,
				pageIndex, pageSize, pageUnit);
	}

	/**
	 * {@inheritDoc}
	 */
	public Page getPagingList(T object, int pageIndex) {
		return this.findListWithPaging("find"
				+ ClassUtils.getShortName(getPersistentClass()) + "List",
				object, pageIndex, pageSize);
	}

	/**
	 * {@inheritDoc}
	 */
	public List<T> getList(SearchVO searchVO) {
		String searchCondition = StringUtil.nullToString(searchVO
				.getSearchCondition());
		String searchKeyword = StringUtil.nullToString(searchVO
				.getSearchKeyword());
		String isNumeric = NumberUtil.isNumber(searchKeyword) ? "true"
				: "false";

		Object[] args = new Object[4];
		args[0] = "condition=" + searchCondition;
		args[1] = "keywordStr=%" + searchKeyword + "%";
		args[2] = "keywordNum=" + searchKeyword + "";
		args[3] = "isNumeric=" + isNumeric;
		
		return this.findList("find"
				+ ClassUtils.getShortName(this.persistentClass) + "List", args);
	}

	/**
	 * {@inheritDoc}
	 */
	public List<T> getList(T object) {
		return this.findList("find"
				+ ClassUtils.getShortName(this.persistentClass) + "List",
				object);
	}
}
