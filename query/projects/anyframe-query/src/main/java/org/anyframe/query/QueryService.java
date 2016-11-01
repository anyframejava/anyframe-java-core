/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.query;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * This Service simplifies the use of JDBC and helps to avoid common errors. It
 * executes core JDBC workflow, leaving application code to provide SQL and
 * extract results. This class executes query statement or updates, initiating
 * iteration over ResultSets. It must be used with DataSource Service.
 * <p>
 * QueryService Configuration Example:
 * 
 * <pre>
 * &lt;bean name=&quot;queryService&quot; class=&quot;anyframe.core.query.impl.QueryServiceImpl&quot;&gt;
 *      &lt;property name=&quot;jdbcTemplate&quot; ref=&quot;jdbcTemplate&quot;/&gt;
 *      &lt;property name=&quot;sqlRepository&quot; ref=&quot;sqlLoader&quot;/&gt;
 *      &lt;property name=&quot;pagingSQLGenerator&quot; ref=&quot;pagingSQLGenerator&quot;/&gt;
 *      &lt;property name=&quot;lobHandler&quot; ref=&quot;lobHandler&quot;/&gt;
 * &lt;/bean&gt;
 *  
 * &lt;bean id=&quot;jdbcTemplate&quot; class=&quot;anyframe.core.query.impl.jdbc.PagingJdbcTemplate&quot;&gt;
 *      &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot; /&gt;
 *      &lt;property name=&quot;exceptionTranslator&quot; ref=&quot;exceptionTranslator&quot; /&gt;
 * &lt;/bean&gt;
 * 
 * &lt;bean name=&quot;sqlLoader&quot; class=&quot;anyframe.core.query.impl.config.loader.SQLLoader&quot;&gt;
 *      &lt;config:configuration&gt;
 *              &lt;!-- xml files in folder --&gt;
 *              &lt;filename&gt;file:./testmappings/testcase-*.xml&lt;/filename&gt;
 *              &lt;filename&gt;file:./testdynamicreload/testcase-queries-dynamicreload.xml&lt;/filename&gt; 
 *              &lt;!-- xml files in classpath --&gt;
 *              &lt;filename&gt;classpath*:/mappings/testcase-queries-*.xml&lt;/filename&gt;
 *              &lt;!-- xml files in jar  --&gt;
 *              &lt;filename&gt;classpath*:/testcase-queries-lob.xml&lt;/filename&gt;
 *              &lt;nullcheck type=&quot;VARCHAR&quot; default-value=&quot;&quot; /&gt;
 *              &lt;sqlload dynamic=&quot;true&quot; frequency=&quot;5&quot; /&gt;
 *              &lt;skiperror&gt;true&lt;/skiperror&gt;
 *      &lt;/config:configuration&gt;
 * &lt;/bean&gt;
 * 
 * &lt;bean id=&quot;pagingSQLGenerator&quot; class=&quot;anyframe.core.query.impl.jdbc.generator.OraclePagingSQLGenerator&quot;/&gt;
 * 
 * &lt;bean id=&quot;lobHandler&quot; class=&quot;org.springframework.jdbc.support.lob.OracleLobHandler&quot;
 *      lazy-init=&quot;true&quot;&gt; 
 *      &lt;property name=&quot;nativeJdbcExtractor&quot; ref=&quot;nativeJdbcExtractor&quot;/&gt; 
 * &lt;/bean&gt;
 * 
 * &lt;bean id=&quot;exceptionTranslator&quot; class=&quot;anyframe.core.query.impl.util.RawSQLExceptionTranslator&quot;/&gt;
 * 
 * &lt;bean id=&quot;nativeJdbcExtractor&quot; 
 *      class=&quot;org.springframework.jdbc.support.nativejdbc.CommonsDbcpNativeJdbcExtractor&quot;
 *      lazy-init=&quot;true&quot;/&gt;
 * </pre>
 * 
 * Query Mapping XML Example:
 * 
 * <pre>
 * &lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
 * &lt;!DOCTYPE queryservice PUBLIC &quot;-//ANYFRAME//DTD QUERYSERVICE//EN&quot;
 * &quot;http://www.anyframejava.org/dtd/anyframe-core-query-mapping-3.1.dtd&quot;&gt;
 *      &lt;queryservice&gt;
 *              &lt;table-mapping&gt;
 *                      &lt;table name=&quot;TBL_CUSTOMER&quot; class=&quot;anyframe.core.query.Customer&quot;&gt;
 *                              &lt;field-mapping&gt;
 *                                      &lt;dbms-column&gt;SSNO&lt;/dbms-column&gt;
 *                                      &lt;class-attribute&gt;ssno&lt;/class-attribute&gt;
 *                              &lt;/field-mapping&gt;
 *                              &lt;field-mapping&gt;
 *                                      &lt;dbms-column&gt;NAME&lt;/dbms-column&gt;
 *                                      &lt;class-attribute&gt;nm&lt;/class-attribute&gt;
 *                              &lt;/field-mapping&gt;
 *                              &lt;primary-key&gt;
 *                                      &lt;dbms-column&gt;SSNO&lt;/dbms-colum&gt;
 *                              &lt;/primary-key&gt;
 *                      &lt;/table&gt;
 *              &lt;/table-mapping&gt;
 *              &lt;queries&gt;
 *                      &lt;query id=&quot;query01&quot; isDynamic=&quot;true&quot; isCamelCase=&quot;true&quot;&gt;
 *                              &lt;statement&gt;
 *                                      select NAME, ADDRESS from TBL_CUSTOMER where SSNO like ?
 *                              &lt;/statement&gt;
 *                              &lt;param type=&quot;VARCHAR&quot;/&gt;
 *                              &lt;result length=2 class=&quot;anyframe.core.query.Customer&quot;/&gt;  
 *                      &lt;/query&gt;
 *              &lt;/queries&gt;
 *         &lt;/queryservice&gt;
 * </pre>
 * 
 * <p>
 * Configuration Attributes: Mapping XML file has &ltqueryservice&gt
 * &lt/queryservice&gt element which is composed with table-mapping tag and
 * queries tag. table-mapping tag, queries tag is a required element.
 * <p>
 * table-mapping tag
 * <ul>
 * <li>The <code>table-mapping</code> element defines mapping informations
 * between table and class</li>
 * <li>The <code>table</code> element defines mapping informations between table
 * and class</li>
 * <li>The <code>field-mapping</code> defines mapping informations between table
 * column and class attribute</li>
 * <li>The <code>primary-key</code> element defines primary keys of given table</li>
 * <li>The <code>dbms-column</code> element defines column of given table</li>
 * <li>The <code>class-attribute</code> element defines class attribute mapped
 * to given column of table</li>
 * </ul>
 * <p>
 * queries tag
 * <ul>
 * <li>The <code>query</code> element defines query statement and attribute</li>
 * <li>The <code>statement</code> element defines single query statement</li>
 * <li>The <code>param</code> defines mapping informations used in jdbc
 * processing
 * 
 * <pre>
 * 
 *   ---------------------------------------
 *   Java Type                DBMS Type
 *   ---------------------------------------
 *   String                   CHAR
 *   String                   VARCHAR
 *   String                   LONGVARCHAR
 *   java.math.BigDecimal           NUMERIC
 *   java.math.BigDecimal           DECIMAL
 *   boolean                  BIT
 *   byte                     TINYINT
 *   short                    SMALLINT
 *   int                      INTEGER
 *   long                     BIGINT
 *   float                    REAL
 *   double                   FLOAT
 *   double                   DOUBLE
 *   byte[]                   BINARY
 *   byte[]                   VARBINARY
 *   byte[]                   LONGVARBINARY
 *   java.sql.Date            DATE
 *   java.sql.Time            TIME
 *   java.sql.Timestamp       TIMESTAMP
 *   ---------------------------------------
 * 
 * </pre>
 * 
 * </li>
 * <li>The <code>result</code> element defines return object type. if it is not
 * defined in mapping file, Java Collection Map type will be used as return
 * object type</li>
 * </ul>
 * <p>
 * Let's start with a simple example.
 * <p>
 * The following class is the Persistent Object Class mapped to the upper sample
 * Query Mapping file.
 * <p>
 * 
 * <pre>
 * package anyframe.core.query;
 * 
 * import java.io.Serializable;
 * 
 * public class CustomerVO implements Serializable {
 * 	public String ssno;
 * 
 * 	public String nm;
 * 
 * 	public Customer() {
 * 	}
 * 
 * 	public Customer(String s, String n) {
 * 		ssno = s;
 * 		nm = n;
 * 	}
 * 
 * 	public String getSsno() {
 * 		return ssno;
 * 	}
 * 
 * 	public String getNm() {
 * 		return nm;
 * 	}
 * 
 * 	public void setSsno(String s) {
 * 		ssno = s;
 * 	}
 * 
 * 	public void setNm(String n) {
 * 		nm = n;
 * 	}
 * }
 * </pre>
 * 
 * <h1>QueryService Service Client Example</h1>
 * 
 * <pre>
 * public class Main {
 * 	public static void main(String args[]) throws Exception {
 * 		ApplicationContext applicationContext = new ClasspathXmlApplicationContext(
 * 				new String[] { &quot;...&quot; });
 * 		QueryService qs = (applicationContext) applicationContext
 * 				.getBean(&quot;queryService&quot;);
 * 		qs.create(&quot;query03&quot;, new Object[] { &quot;1234567890123&quot;, &quot;AAA&quot; });
 * 		Collection allCustomer = qs.find(&quot;query01&quot;, new Object[] { &quot;12345%&quot; });
 * 		Collection customer = qs.find(&quot;query01&quot;, new Object[] { &quot;12345%&quot; }, 1);
 * 		qs.update(&quot;query04&quot;, new Object[] { &quot;1234567890123&quot;, &quot;BBB&quot; });
 * 		qs.remove(&quot;query05&quot;, new Object[] { &quot;1234567890123&quot; });
 * 	}
 * }
 * </pre>
 * 
 * @author SoYon Lim
 */
public interface QueryService {
	Log LOGGER = LogFactory.getLog(QueryService.class);

	String ROLE = QueryService.class.getName();

	String COL_INFO = "COLUMN_INFO";

	String COUNT = "COUNT";

	String LIST = "LIST";

	/**
	 * Issue multiple updates using JDBC 2.0 batch updates and
	 * PreparedStatementSetters to set values on a PreparedStatement created by
	 * this method
	 * 
	 * @param targets
	 *            object of class which is matched with specified table in
	 *            mapping xml files. is the List type of Object.
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryServiceException
	 *             if there is any problem issuing the update
	 */
	int[] batchCreate(List targets) throws QueryServiceException;

	/**
	 * Issue multiple updates using JDBC 2.0 batch updates and
	 * PreparedStatementSetters to set values on a PreparedStatement created by
	 * this method
	 * 
	 * @param targets
	 *            object of class which is matched with specified table in
	 *            mapping xml files. is the List type of Object.
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryServiceException
	 *             if there is any problem issuing the update
	 */
	int[] batchRemove(List targets) throws QueryServiceException;

	/**
	 * Issue multiple updates using JDBC 2.0 batch updates and
	 * PreparedStatementSetters to set values on a PreparedStatement created by
	 * this method
	 * 
	 * @param targets
	 *            object of class which is matched with specified table in
	 *            mapping xml files. is the List type of Object.
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryServiceException
	 *             if there is any problem issuing the update
	 */
	int[] batchUpdate(List targets) throws QueryServiceException;

	/**
	 * Issue multiple updates using JDBC 2.0 batch updates and
	 * PreparedStatementSetters to set values on a PreparedStatement created by
	 * this method
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targets
	 *            a set of variable for executing query (is the List of
	 *            Object[])
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryServiceException
	 *             if there is any problem issuing the update
	 */
	int[] batchUpdate(String queryId, List targets)
			throws QueryServiceException;

	/**
	 * Issue multiple updates using JDBC 2.0 batch updates and
	 * PreparedStatementSetters to set values on a PreparedStatement created by
	 * this method Execute UPDATE query, Using query statement directly without
	 * being defined in mapping xml files.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param targets
	 *            object of class which is matched with specified table in
	 *            mapping xml files. is the List type of Object.
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryServiceException
	 *             if there is any problem issuing the update
	 */
	int[] batchUpdateBySQL(String sql, String[] types, List targets)
			throws QueryServiceException;

	/**
	 * Execute INSERT query, Using object, which class is matched with table by
	 * mapping xml files.
	 * 
	 * @param obj
	 *            object of class which is matched with specified table in
	 *            mapping xml files.
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	int create(Object obj) throws QueryServiceException;

	/**
	 * Execute INSERT query, Using given queryId which defined in mapping xml
	 * files.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	int create(String queryId, Object[] values) throws QueryServiceException;

	/**
	 * Execute INSERT query, Using query statement directly without being
	 * defined in mapping xml files.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            a set of variable for executing query
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	int createBySQL(String sql, String[] types, Object[] values)
			throws QueryServiceException;

	/**
	 * Execute an sql call using a CallableStatement
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a key-value set of variable for executing query
	 * @return Map of extracted out parameters
	 * @throws QueryServiceException
	 *             if there is any problem issuing the execute
	 */
	Map execute(String queryId, Map values) throws QueryServiceException;

	/**
	 * Execute an SELECT sql call using a CallableStatement which defined in
	 * mapping xml files. Returned results which find by condition and belong to
	 * specified page. Caution!. Not supported by some DBMS (e.g. Oracle 8i)
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a key-value set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @return Map of extracted out parameters
	 * @throws QueryServiceException
	 *             if there is any problem issuing the execute
	 */
	Map execute(String queryId, Map values, int pageIndex)
			throws QueryServiceException;

	/**
	 * Execute an SELECT sql call using a CallableStatement which defined in
	 * mapping xml files. Returned results which find by condition and belong to
	 * specified page. Caution!. Not supported by some DBMS (e.g. Oracle 8i)
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a key-value set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return Map of extracted out parameters
	 * @throws QueryServiceException
	 *             if there is any problem issuing the execute
	 */
	Map execute(String queryId, Map values, int pageIndex, int pageSize)
			throws QueryServiceException;

	/**
	 * Execute an Sql call using a CallableStatement
	 * 
	 * @param sql
	 *            callable statement to execute
	 * @param types
	 *            a set of variable type for executing query
	 * @param names
	 *            a set of variable name for executing query
	 * @param bindings
	 *            a set of variable in-out type for executing query
	 * @param values
	 *            a key-value set of variable for executing query
	 * @return Map of extracted out parameters
	 * @throws QueryServiceException
	 *             if there is any problem issuing the execute
	 */
	Map executeBySQL(String sql, String[] types, String[] names,
			String[] bindings, Map values) throws QueryServiceException;

	/**
	 * Execute an Sql call using a CallableStatement
	 * 
	 * @param sql
	 *            callable statement to execute
	 * @param types
	 *            a set of variable type for executing query
	 * @param names
	 *            a set of variable name for executing query
	 * @param bindings
	 *            a set of variable in-out type for executing query
	 * @param values
	 *            a key-value set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return Map of extracted out parameters
	 * @throws QueryServiceException
	 *             if there is any problem issuing the execute
	 */
	Map executeBySQL(String sql, String[] types, String[] names,
			String[] bindings, Map values, int pageIndex, int pageSize)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, Using object, which class is matched with table
	 * by mapping xml files. Returned a result which find by Primary key.
	 * 
	 * @param obj
	 *            object of class which is matched with specified table in
	 *            mapping xml files.
	 * @return result. The size of result is 1.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Collection find(Object obj) throws QueryServiceException;

	/**
	 * Execute a SELECT query, Using given queryId which defined in mapping xml
	 * files. Returned all results which find by condition <br/>
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @return all results. Never returns null; returns the empty collection if
	 *         there were no results.
	 * @throws Exception
	 *             if there is any problem executing the query
	 */
	Collection find(String queryId, Object[] values)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, Using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @return results. The size of result is same as page size defined mapping
	 *         xml files.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Collection find(String queryId, Object[] values, int pageIndex)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, Using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as pagesize defined mapping
	 *         xml files.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Collection find(String queryId, Object[] values, int pageIndex, int pageSize)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, Using query statement directly without being
	 * defined in mapping xml files. Returned all results which find by
	 * condition
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            a set of variable for executing query
	 * @return all results. Never returns null; returns the empty collection if
	 *         there were no results.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Collection findBySQL(String sql, String[] types, Object[] values)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, Using query statement directly without being
	 * defined in mapping xml files. Returned results which find by condition
	 * and belong to specified page
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            a set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as pageSize.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Collection findBySQL(String sql, String[] types, Object[] values,
			int pageIndex, int pageSize) throws QueryServiceException;

	/**
	 * Execute a SELECT query, Using query statement directly without being
	 * defined in mapping xml files. Returned all results which find by
	 * condition
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            a set of variable for executing query
	 * @return results. Never returns null; returns the empty collection if
	 *         there were no results. The result value includes the query
	 *         execution result handled by paging and the total result number.
	 *         And takes values as IQueryService.LIST, IQueryService.COUNT.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Map findBySQLWithRowCount(String sql, String[] types, Object[] values)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, Using query statement directly without being
	 * defined in mapping xml files. Returned results which find by condition
	 * and belong to specified page
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            a set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as pageSize. The result value
	 *         includes the query execution result handled by paging and the
	 *         total result number. And takes values as IQueryService.LIST,
	 *         IQueryService.COUNT.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Map findBySQLWithRowCount(String sql, String[] types, Object[] values,
			int pageIndex, int pageSize) throws QueryServiceException;

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page (pageIndex = 0)
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @return results. The size of result is same as length of result which
	 *         defined a specified query. The result value includes the query
	 *         execution result handled by paging and the total result number.
	 *         And takes values as IQueryService.LIST, IQueryService.COUNT.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Map findWithColInfo(String queryId, Object[] values)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @return results. The size of result is same as length of result which
	 *         defined a specified query. The result value includes the query
	 *         execution result handled by paging and the total result number.
	 *         And takes values as IQueryService.LIST, IQueryService.COUNT.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Map findWithColInfo(String queryId, Object[] values, int pageIndex)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as length of result which
	 *         defined a specified query. The result value includes the query
	 *         execution result handled by paging and the total result number.
	 *         And takes values as IQueryService.LIST, IQueryService.COUNT.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Map findWithColInfo(String queryId, Object[] values, int pageIndex,
			int pageSize) throws QueryServiceException;

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page (pageIndex = 0)
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @return results. The size of result is same as length of result which
	 *         defined a specified query. The result value includes the query
	 *         execution result handled by paging and the total result number.
	 *         And takes values as IQueryService.LIST, IQueryService.COUNT.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Map findWithRowCount(String queryId, Object[] values)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @return results. The size of result is same as length of result which
	 *         defined a specified query. The result value includes the query
	 *         execution result handled by paging and the total result number.
	 *         And takes values as IQueryService.LIST, IQueryService.COUNT.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Map findWithRowCount(String queryId, Object[] values, int pageIndex)
			throws QueryServiceException;

	/**
	 * Execute a SELECT query, using given queryId which defined in mapping xml
	 * files. Returned results which find by condition and belong to specified
	 * page
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return results. The size of result is same as pageSize. The result value
	 *         includes the query execution result handled by paging and the
	 *         total result number. And takes values as IQueryService.LIST,
	 *         IQueryService.COUNT.
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	Map findWithRowCount(String queryId, Object[] values, int pageIndex,
			int pageSize) throws QueryServiceException;

	/**
	 * Execute DELETE query, using object, which class is matched with table by
	 * mapping xml files.
	 * 
	 * @param obj
	 *            object of class which is matched with specified table in
	 *            mapping xml files.
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	int remove(Object obj) throws QueryServiceException;

	/**
	 * Execute DELETE query, using given queryId which defined in mapping xml
	 * files.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	int remove(String queryId, Object[] values) throws QueryServiceException;

	/**
	 * Execute DELETE query, using query statement directly without being
	 * defined in mapping xml files.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            a set of variable for executing query
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	int removeBySQL(String sql, String[] types, Object[] values)
			throws QueryServiceException;

	/**
	 * Execute UPDATE query, using object, which class is matched with table by
	 * mapping xml files.
	 * 
	 * @param obj
	 *            object of class which is matched with specified table in
	 *            mapping xml files.
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	int update(Object obj) throws QueryServiceException;

	/**
	 * Execute UPDATE query, using given queryId which defined in mapping xml
	 * files.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param values
	 *            a set of variable for executing query
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	int update(String queryId, Object[] values) throws QueryServiceException;

	/**
	 * Execute UPDATE query, using query statement directly without being
	 * defined in mapping xml files.
	 * 
	 * @param sql
	 *            query statement.
	 * @param types
	 *            is matched with input parameters. A type must belong to fields
	 *            defined java.sql.Types package
	 * @param values
	 *            a set of variable for executing query
	 * @return the number of rows affected
	 * @throws QueryServiceException
	 *             if there is any problem executing the query
	 */
	int updateBySQL(String sql, String[] types, Object[] values)
			throws QueryServiceException;

	/**
	 * Count all queries which defined in mapping xml files.
	 * 
	 * @return number of queries
	 */
	int countQuery();

	/**
	 * Find all query list which defined in mapping xml files.
	 * 
	 * @return map of queryId and query statement.
	 * @throws QueryServiceException
	 *             if there is any problem making mapping map
	 */
	Map getQueryMap() throws QueryServiceException;

	/**
	 * Find parameters for specified query.
	 * 
	 * @return ArrayList consist of param type and name
	 * @throws QueryServiceException
	 *             if there is any problem find parameters.
	 */
	ArrayList getQueryParams(String queryId) throws QueryServiceException;

	/**
	 * Get JdbcTemplate which QueryService uses
	 * 
	 * @return JdbcTemplate which set in configuration file
	 */
	JdbcTemplate getQueryServiceJdbcTemplate();

	/**
	 * Find specified query statement which queryId equal to input parameter.
	 * 
	 * @param queryId
	 *            query id which defined a mapping xml file
	 * @return query statement
	 * @throws QueryServiceException
	 *             if there is any problem find sql
	 */
	String getStatement(String queryId) throws QueryServiceException;

	/**
	 * Find specified query information which queryId equal to input parameter.
	 * 
	 * @param queryId
	 *            query id which defined a mapping xml file
	 * @return query information
	 */
	QueryInfo getQueryInfo(String queryId);

}
