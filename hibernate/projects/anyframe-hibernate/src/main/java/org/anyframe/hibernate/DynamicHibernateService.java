/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.hibernate;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;

/**
 * By integrating Hibernate and Velocity, this services helps in dynamically
 * generating the appropriate HQL (Hibernate Query Language) according to the
 * input conditions. We define dynamic HQLs in a separate XML file and use the
 * queryName to call the specified HQL. This allows the Hibernate based data
 * access to be simple and the HQL is understood easily resulting in less errors
 * and easier HQL modifications.
 * <p>
 * Configuration Example :
 * 
 * <pre>
 * &lt;bean id=&quot;dynamicHibernateService&quot;
 * 	   class=&quot;org.anyframe.hibernate.impl.DynamicHibernateService&quot;&gt;
 *     &lt;property name=&quot;sessionFactory&quot; ref=&quot;sessionFactory&quot; /&gt;
 *     &lt;property name=&quot;fileNames&quot;&gt;
 *         &lt;list&gt;
 *             &lt;value&gt;classpath:dynamic/dynamic-hibernate.xml&lt;/value&gt;
 *         &lt;/list&gt;
 *     &lt;/property&gt;
 * &lt;/bean&gt;
 * </pre>
 * 
 * <p>
 * Configuration Attributes :
 * 
 * <ul>
 * <li><code>sessionFactory</code> : This is a property for handling the HQL
 * using the current session generated in Hibernate SessionFactory. We define
 * the SessionFactory Bean's Id.</li>
 * <li><code>fileNames</code> : This is a property for defining the location of
 * the XML file defining the dynamic HQL with the Velocity grammar. We can
 * define each directory names containing the file names or each file name. When
 * the fileNames' values start with prefixes such as classpath:, we find the
 * defined files in the appropriate project's classpath.
 * </ul>
 * <p>
 * Dynamic HQL Definition XML Example: In the XML file defining the dynamic HQL,
 * the root element is defined as <dynamic-hibernate> and we can define numerous
 * <query> in the <dynamic-hibernate.> The example is as follows:
 * 
 * <pre>
 * &lt;query name=&quot;getSaleList&quot;&gt;
 * &lt;![CDATA[
 *     SELECT new Product( product.prodNo as prodNo
 *         , product.prodName as prodName
 *         , product.sellAmount as sellAmount
 *         , category.categoryName as categoryName
 *         , product.regDate as regDate )
 *     FROM Product product join product.category category
 *     WHERE
 *         #if(&lt;b&gt;$prodNo&lt;/b&gt;)
 *             product.prodNo like &lt;b&gt;:prodNo&lt;/b&gt;
 *         #else
 *             product.prodName like :prodName
 *         #end
 *         #if ($sellerId)
 *             AND product.sellerId = :sellerId
 *         #end
 *         #if ($categoryNo)
 *             AND category.categoryNo = :categoryNo
 *         #end
 *     ORDER BY product.&lt;b&gt;{{sortColumn}}&lt;/b&gt; {{sortDirection}}
 * ]]&gt;
 * &lt;/query&gt;
 * </pre>
 * 
 * @author SoYon Lim
 * 
 */
public interface DynamicHibernateService {
	Logger LOGGER = LoggerFactory.getLogger(DynamicHibernateService.class);

	/**
	 * We find the appropropriate HQL by the dynamic HQL's identifier defined in
	 * a separate XML. Then, we replace the phrase handled by variables with the
	 * inputted values and return the executed result values of appropriate HQL
	 * phrases completed by the Hibernate session. We return the the executed
	 * results in a list type.
	 * 
	 * @param queryName
	 *            Executable dynamic HQL's identifier
	 * @param paramNames
	 *            The variable names for replacing with the inputted variables
	 * @param values
	 *            Variable values for replacing in phrases handled with
	 *            variables
	 * @return being specified query execution results
	 * 
	 * @throws DataAccessException
	 *             if there is any problem executing the query
	 */
	<T> List<T> findListByNamedParam(String queryName, String[] paramNames,
			Object[] values) throws DataAccessException;

	/**
	 * We find the appropropriate HQL by the dynamic HQL's identifier defined in
	 * a separate XML. Then, we replace the phrase handled by variables with the
	 * inputted values and return the executed result values of appropriate HQL
	 * phrases completed by the Hibernate session. When the variable is one , we
	 * may use this easily and return the executed results in a list type.
	 * 
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param paramName
	 *            the variable name for replacing with the inputted variable
	 * @param value
	 *            variable value for replacing in phrases handled with variable
	 * @return being specified query execution results
	 * 
	 * @throws DataAccessException
	 *             if there is any problem executing the query
	 */
	<T> List<T> findListByNamedParam(String queryName, String paramName,
			Object value) throws DataAccessException;

	/**
	 * We find the appropropriate HQL by the dynamic HQL's identifier defined in
	 * a separate XML. Then, we replace the phrase handled by variables with the
	 * inputted values and return the executed result values of appropriate HQL
	 * phrases completed by the Hibernate session. We return the the executed
	 * results in a list type.
	 * 
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param values
	 *            defines as 'name=value' the variable values for replacing the
	 *            variables defined in dynamic HQL
	 * @return being specified query execution results
	 * 
	 * @throws DataAccessException
	 *             if there is any problem executing the query
	 */
	<T> List<T> findList(String queryName, Object[] values)
			throws DataAccessException;

	/**
	 * We find the appropropriate HQL by the dynamic HQL's identifier defined in
	 * a separate XML. Then, we replace the phrase handled by variables with the
	 * inputted values and return the executed result values of appropriate HQL
	 * phrases completed by the Hibernate session. We return the numerous result
	 * according to the specific pages in a list type. The paging handling is
	 * not executed if either of pageIndex or pageSize is 0.
	 * 
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param values
	 *            defines as 'name=value' the variable values for replacing the
	 *            variables defined in dynamic HQL
	 * @param pageIndex
	 *            page number (greater than equal to one)
	 * @param pageSize
	 *            the number of data for showing in the selected page (greater
	 *            than equal to one)
	 * @return being specified query execution results
	 * 
	 * @throws DataAccessException
	 *             if there is any problem executing the query
	 */
	<T> List<T> findList(String queryName, Object[] values, int pageIndex,
			int pageSize) throws DataAccessException;

	/**
	 * We find the appropropriate HQL by the dynamic HQL's identifier defined in
	 * a separate XML. Then, we replace the phrase handled by variables with the
	 * inputted values and return the executed result values of appropriate HQL
	 * phrases completed by the Hibernate session. We return the numerous result
	 * according to the specific pages in a list type. The paging handling is
	 * not executed if either of pageIndex or pageSize is 0.
	 * 
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param paramNames
	 *            the variable names for replacing with the inputted variables
	 * @param values
	 *            variable values for replacing in phrases handled with
	 *            variables
	 * @param pageIndex
	 *            page number (greater than equal to one)
	 * @param pageSize
	 *            the number of data for showing in the selected page (greater
	 *            than equal to one)
	 * @return being specified query execution results
	 * 
	 * @throws DataAccessException
	 *             if there is any problem executing the query
	 */
	<T> List<T> findListByNamedParam(String queryName, String[] paramNames,
			Object[] values, int pageIndex, int pageSize)
			throws DataAccessException;

	/**
	 * We find the appropropriate HQL by the dynamic HQL's identifier defined in
	 * a separate XML. Then, we replace the phrase handled by variables with the
	 * inputted values and return the executed result values of appropriate HQL
	 * phrases completed by the Hibernate session. When the variable is one,
	 * this is efficiently used. At execution, returns in a list type the
	 * numerous results of the HQL completed by Hibernate session. The paging
	 * handling is not executed if either of pageIndex or pageSize is 0.
	 * 
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param paramName
	 *            the variable name for replacing with the inputted variable
	 * @param value
	 *            variable value for replacing in phrases handled with variable
	 * @param pageIndex
	 *            page number (greater than equal to one)
	 * @param pageSize
	 *            the number of data for showing in the selected page (greater
	 *            than equal to one)
	 * @return being specified query execution results
	 * 
	 * @throws DataAccessException
	 *             if there is any problem executing the query
	 */
	<T> List<T> findListByNamedParam(String queryName, String paramName,
			Object value, int pageIndex, int pageSize)
			throws DataAccessException;

	/**
	 * We find the appropropriate HQL by the dynamic HQL's identifier defined in
	 * a separate XML. Then, we replace the phrase handled by variables with the
	 * inputted values and return the executed result values of appropriate HQL
	 * phrases completed by the Hibernate session. After execution, returns the
	 * result in object type.
	 * 
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param paramNames
	 *            the variable names for replacing with the inputted variables
	 * @param values
	 *            variable values for replacing in phrases handled with
	 *            variables
	 * @return being specified query execution results
	 * 
	 * @throws DataAccessException
	 *             if there is any problem executing the query
	 */
	<T> T findByNamedParam(String queryName, String[] paramNames,
			Object[] values) throws DataAccessException;

	/**
	 * We find the appropropriate HQL by the dynamic HQL's identifier defined in
	 * a separate XML. Then, we replace the phrase handled by variables with the
	 * inputted values and return the executed result values of appropriate HQL
	 * phrases completed by the Hibernate session. When the variable is one,
	 * this is efficiently used. After execution, returns the result in object
	 * type.
	 * 
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param paramName
	 *            the variable name for replacing with the inputted variable
	 * @param value
	 *            variable value for replacing in phrases handled with variable
	 * @return being specified HQL execution results, returns numerous data in a
	 *         list type
	 * 
	 * @throws DataAccessException
	 *             if there is any problem executing the query
	 */
	<T> T findByNamedParam(String queryName, String paramName, Object value)
			throws DataAccessException;

	/**
	 * We find the appropropriate HQL by the dynamic HQL's identifier defined in
	 * a separate XML. Then, we replace the phrase handled by variables with the
	 * inputted values and return the executed result values of appropriate HQL
	 * phrases completed by the Hibernate session. After execution, returns the
	 * result in object type.
	 * 
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param values
	 *            defines as 'name=value' the variable values for replacing the
	 *            variables defined in dynamic HQL
	 * @return being specified query execution results
	 * 
	 * @throws DataAccessException
	 *             if there is any problem executing the query
	 */
	<T> T find(String queryName, Object[] values) throws DataAccessException;
}
