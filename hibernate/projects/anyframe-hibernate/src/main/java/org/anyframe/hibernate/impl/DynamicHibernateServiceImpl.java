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
package org.anyframe.hibernate.impl;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.anyframe.exception.BaseException;
import org.anyframe.hibernate.DynamicHibernateService;
import org.anyframe.hibernate.impl.config.DynamicDtdResolver;
import org.apache.avalon.framework.configuration.ConfigurationException;
import org.apache.avalon.framework.configuration.DefaultConfigurationBuilder;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.context.Context;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.type.BasicTypeRegistry;
import org.hibernate.util.XMLHelper;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.xml.BeansDtdResolver;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

/**
 * By integrating Hibernate and Velocity, this services helps in dynamically
 * generating the appropriate HQL (Hibernate Query Language) and SQL according
 * to the input conditions. We define dynamic HQLs/SQLs in a separate XML file
 * and use the queryName to call the specified HQL. This allows the Hibernate
 * based data access to be simple and the HQL/SQL is understood easily resulting
 * in less errors and easier HQL/SQL modifications.
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
 * <ul>
 * <li><code>sessionFactory</code> : This is a property for handling the HQL/SQL
 * using the current session generated in Hibernate SessionFactory. We define
 * the SessionFactory Bean's Id.</li>
 * <li><code>fileNames</code> : This is a property for defining the location of
 * the XML file defining the dynamic HQL/SQL with the Velocity grammar. We can
 * define each directory names containing the file names or each file name. When
 * the fileNames' values start with prefixes such as classpath:, we find the
 * defined files in the appropriate project's classpath.
 * </ul>
 * <p>
 * Dynamic HQL/SQL Definition XML Example: In the XML file defining the dynamic
 * HQL, the root element is defined as <dynamic-hibernate> and we can define
 * numerous <query> in the <dynamic-hibernate.> The example is as follows:
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
 * In the XML file defining the dynamic SQL, the root element is defined as
 * <dynamic-hibernate> and we can define numerous <sql-query> in the
 * <dynamic-hibernate.>
 * 
 * @author SoYon Lim
 */
@SuppressWarnings("unchecked")
public class DynamicHibernateServiceImpl implements DynamicHibernateService,
		InitializingBean, ResourceLoaderAware {

	private final static String DELIMETER = "=";

	private HashMap queries = new HashMap();

	@SuppressWarnings("unused")
	private SessionFactory sessionFactory;

	private List fileNames;

	private ResourceLoader resourceLoader = null;

	private HibernateTemplate hibernateTemplate;

	public void setFileNames(List fileNames) {
		this.fileNames = fileNames;
	}

	/**
	 * @param resourceLoader
	 *            the resourceLoader to set
	 */
	public void setResourceLoader(ResourceLoader resourceLoader) {
		this.resourceLoader = resourceLoader;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
		this.hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	/**
	 * We load the appropriate XML files by reading the fileNames defined as
	 * this service's property. For each XML file's HQL, we put the statements
	 * in the HashMap with identifier as key.
	 */
	public void afterPropertiesSet() throws Exception {
		DefaultConfigurationBuilder builder = getBuilder();

		for (int i = 0; i < fileNames.size(); i++) {
			String fileName = ((String) fileNames.get(i)).trim();

			if (resourceLoader instanceof ResourcePatternResolver) {
				// Resource pattern matching available.
				try {
					Resource[] resources = ((ResourcePatternResolver) resourceLoader)
							.getResources(fileName);
					buildQueryMap(builder, resources);
				} catch (IOException ex) {
					throw new ConfigurationException(
							"Could not resolve sql definition resource pattern ["
									+ fileName + "]", ex);
				}
			} else {
				// Can only load single resources by
				// absolute URL.
				Resource resource = resourceLoader.getResource(fileName);
				buildQueryMap(builder, new Resource[] { resource });
			}
		}
	}

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
	 * @throws Exception
	 *             in the case there is a problem in executing the specified HQL
	 */
	public List findListByNamedParam(String queryName, String paramName,
			Object value) throws Exception {
		return findListByNamedParam(queryName, new String[] { paramName },
				new Object[] { value });
	}

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
	 * @throws Exception
	 *             in the case there is a problem in executing the specified HQL
	 */
	public List findListByNamedParam(String queryName, String[] paramNames,
			Object[] values) throws Exception {
		return findListByNamedParam(queryName, paramNames, values, 0, 0);
	}

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
	 * @throws Exception
	 *             in the case there is a problem in executing the specified HQL
	 */
	public List findList(String queryName, Object[] values) throws Exception {
		return findList(queryName, values, 0, 0);
	}

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
	 * @throws Exception
	 *             in the case there is a problem in executing the specified HQL
	 */
	public List findListByNamedParam(String queryName, String paramName,
			Object value, int pageIndex, int pageSize) throws Exception {
		return findListByNamedParam(queryName, paramName, value, pageIndex,
				pageSize);
	}

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
	 * @throws Exception
	 *             in the case there is a problem in executing the specified HQL
	 */
	public List findList(String queryName, Object[] values, int pageIndex,
			int pageSize) throws Exception {
		final Context context = generateVelocityContext(values);
		return executeFind(context, queryName, pageIndex, pageSize);
	}

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
	 * @throws Exception
	 *             in the case there is a problem in executing the specified HQL
	 */
	public List findListByNamedParam(String queryName, String[] paramNames,
			Object[] values, int pageIndex, int pageSize) throws Exception {
		final Context context = generateVelocityContext(paramNames, values);
		return executeFind(context, queryName, pageIndex, pageSize);
	}

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
	 * @throws Exception
	 *             in the case there is a problem in executing the specified HQL
	 */
	public Object find(String queryName, Object[] values) throws Exception {
		Context context = generateVelocityContext(values);
		return execute(context, queryName);
	}

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
	 * @throws Exception
	 *             in the case there is a problem in executing the specified HQL
	 */
	public Object findByNamedParam(String queryName, String[] paramNames,
			Object[] values) throws Exception {
		Context context = generateVelocityContext(paramNames, values);
		return execute(context, queryName);
	}

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
	 * @throws Exception
	 *             in the case there is a problem in executing the specified HQL
	 */
	public Object findByNamedParam(String queryName, String paramName,
			Object value) throws Exception {
		return findByNamedParam(queryName, new String[] { paramName },
				new Object[] { value });
	}

	/**
	 * implements callback method using hibernateTemplate.execute().
	 * 
	 * @param context
	 *            velocity context
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @return being specified query execution results
	 */
	private Object execute(final Context context, final String queryName) {
		return this.hibernateTemplate.execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				try {
					Query query = findInternal(session, queryName, context);
					return query.uniqueResult();
				} catch (Exception e) {
					e.printStackTrace();
					throw new HibernateException(e.getMessage());
				}
			}
		});
	}

	/**
	 * implements callback method using hibernateTemplate.executeFind().
	 * 
	 * @param context
	 *            velocity context
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param pageIndex
	 *            page number (greater than equal to one)
	 * @param pageSize
	 *            the number of data for showing in the selected page (greater
	 *            than equal to one)
	 * @return being specified query execution results
	 */
	private List executeFind(final Context context, final String queryName,
			final int pageIndex, final int pageSize) {
		return this.hibernateTemplate.executeFind(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				try {
					Query query = findInternal(session, queryName, context);
					if (pageIndex > 0 && pageSize > 0) {
						query.setFirstResult((pageIndex - 1) * pageSize);
						query.setMaxResults(pageSize);
					}

					return query.list();
				} catch (IOException e) {
					throw new HibernateException(e.getMessage());
				}
			}
		});
	}

	/**
	 * The internal method for replacing by the inputted values the phrases
	 * handled by variables and finding the appropriate HQL phrases by the
	 * identifier of dynamic HQL defined in a separate XML.
	 * 
	 * @param session
	 *            the hibernate session to create query
	 * @param queryName
	 *            executable dynamic HQL's identifier
	 * @param context
	 *            velocity context
	 * @return query instance set with parameter
	 * @throws Exception
	 *             for the query instance, there is a problem while setting the
	 *             parameter
	 */
	private Query findInternal(Session session, String queryName,
			Context context) throws IOException {
		if (context == null)
			context = new VelocityContext();
		QueryInfo info = (QueryInfo) queries.get(queryName);

		// text replacement
		String sql = getRunnableSQL(info.getStatement(), context);

		StringWriter writer = new StringWriter();
		Velocity.evaluate(context, writer, "Hibernate", sql);
		sql = writer.toString();

		Query query = null;

		if (info.getType().equals("hql")) {
			query = session.createQuery(sql);
		} else {
			query = session.createSQLQuery(sql);

			addEntity((SQLQuery) query, info.getReturnList());
			addJoin((SQLQuery) query, info.getReturnJoinMap());
			addScalar((SQLQuery) query, info.getReturnScalarMap());
		}

		String[] namedParams = query.getNamedParameters();
		for (int i = 0; i < namedParams.length; i++) {
			String namedParam = namedParams[i];
			query.setParameter(namedParam, context.get(namedParam));
		}

		return query;
	}

	private void addEntity(SQLQuery query, List returnList) {
		if (!returnList.isEmpty())
			for (int i = 0; i < returnList.size(); i++) {
				ReturnInfo info = (ReturnInfo) returnList.get(i);
				String alias = info.getAlias();
				Class clazz = info.getClazz();
				String entityName = info.getEntityName();

				if (alias != null) {
					if (clazz != null)
						query.addEntity(alias, clazz);
					if (entityName != null)
						query.addEntity(alias, entityName);
				} else {
					if (clazz != null)
						query.addEntity(clazz);
					if (entityName != null)
						query.addEntity(entityName);
				}
			}
	}

	private void addJoin(SQLQuery query, Map returnJoinMap) {
		if (!returnJoinMap.isEmpty()) {
			Set keySet = returnJoinMap.keySet();
			Iterator keyItr = keySet.iterator();

			while (keyItr.hasNext()) {
				String alias = (String) keyItr.next();
				String property = (String) returnJoinMap.get(alias);
				query.addJoin(alias, property);
			}
		}
	}

	private void addScalar(SQLQuery query, Map returnScalarMap) {
		BasicTypeRegistry typeRegistry = new BasicTypeRegistry();
		if (!returnScalarMap.isEmpty()) {
			Set keySet = returnScalarMap.keySet();
			Iterator keyItr = keySet.iterator();

			while (keyItr.hasNext()) {
				String column = (String) keyItr.next();
				String typeName = (String) returnScalarMap.get(column);
				if (typeName != null)
					query.addScalar(column, typeRegistry
							.getRegisteredType(typeName));
				else
					query.addScalar(column);

			}
		}
	}

	private void buildQueryMap(DefaultConfigurationBuilder builder,
			Resource[] resources) throws Exception {
		for (int i = 0; i < resources.length; i++) {
			buildQueryMap(builder, resources[i].getInputStream());
		}
	}

	/**
	 * Put HQL statements in HashMap by using as key defined in reading the
	 * defined XML file.
	 * 
	 * @param builder
	 *            by reading the defined XML file, returns the Builder to the
	 *            Configuration instance.
	 * @param inputStream
	 *            inputStream of XML file defining the dynamic query
	 * @throws DocumentationException
	 *             in reading the appropriate XML File, there is a problem
	 * @throws ConfigurationException
	 *             in handling the elements defined in the appropriate XML,
	 *             there is a problem
	 * @throws ClassNotFoundException
	 *             if return class doesn't exist
	 */
	private void buildQueryMap(DefaultConfigurationBuilder builder,
			InputStream inputStream) throws DocumentException,
			ConfigurationException, ClassNotFoundException {
		try {
			XMLHelper xmlHelper = new XMLHelper();

			List errors = new ArrayList();
			Document doc = xmlHelper.createSAXReader("XML InputStream", errors,
					new DynamicDtdResolver()).read(inputStream);

			Element root = doc.getRootElement();

			@SuppressWarnings("unused")
			Element queryElements = root.element("query");
			queries.putAll(buildQueryMap("hql", root, "query"));

			queryElements = root.element("sql-query");
			queries.putAll(buildQueryMap("sql", root, "sql-query"));

		} catch (DocumentException de) {
			throw de;
		}
	}

	private Map buildQueryMap(String type, Element rootElements,
			String elementName) throws ConfigurationException,
			ClassNotFoundException {
		Map queryMap = new HashMap();

		Iterator elementItr = rootElements.elementIterator(elementName);
		while (elementItr.hasNext()) {
			Element queryElement = (Element) elementItr.next();

			String queryName = queryElement.attributeValue("name", "");

			if (queryName.equals(""))
				throw new ConfigurationException(
						"DynamicHibernate Service : name is essential attribute in a <query>.");

			Iterator returnsItr = queryElement.elementIterator("return");

			List returnList = new ArrayList();
			while (returnsItr.hasNext()) {
				Element element = (Element) returnsItr.next();
				String alias = element.attributeValue("alias", null);
				String className = element.attributeValue("class", null);

				Class clazz = null;
				if (className != null)
					clazz = Class.forName(className);

				String entityName = element.attributeValue("entity-name", null);
				returnList.add(new ReturnInfo(alias, clazz, entityName));
			}

			Iterator returnJoinsItr = queryElement
					.elementIterator("return-join");

			Map returnJoinMap = new HashMap();
			while (returnJoinsItr.hasNext()) {
				Element element = (Element) returnJoinsItr.next();
				String alias = element.attributeValue("alias");
				String property = element.attributeValue("property");
				returnJoinMap.put(alias, property);
			}

			Iterator returnScalarsItr = queryElement
					.elementIterator("return-scalar");

			Map returnScalarMap = new HashMap();			
			while (returnScalarsItr.hasNext()) {
				Element element = (Element) returnScalarsItr.next();
				String column = element.attributeValue("column");
				String columnType = element.attributeValue("type", null);
			}

			QueryInfo info = new QueryInfo(type, queryElement.getText(),
					returnList, returnJoinMap, returnScalarMap);
			queryMap.put(queryName, info);

		}

		return queryMap;
	}

	private String getRunnableSQL(String sql, Context context) {
		StringBuffer tempStatement = new StringBuffer(sql);
		SortedMap replacementPositions = findTextReplacements(tempStatement);

		Iterator properties = replacementPositions.entrySet().iterator();
		int valueLengths = 0;
		while (properties.hasNext()) {
			Map.Entry entry = (Map.Entry) properties.next();
			Integer pos = (Integer) entry.getKey();
			String key = (String) entry.getValue();
			Object replaceValue = (String) context.get(key);
			if (replaceValue == null) {
				throw new HibernateException(
						"DynamicHibernate Service : Text replacement ["
								+ entry.getValue() + "] has not been set.");
			}
			String value = replaceValue.toString();
			tempStatement.insert(pos.intValue() + valueLengths, value);
			valueLengths += value.length();
		}
		return tempStatement.toString();
	}

	private SortedMap findTextReplacements(StringBuffer sql) {
		TreeMap textReplacements = new TreeMap();
		int startPos = 0;
		while ((startPos = sql.indexOf("{{", startPos)) > -1) {
			int endPos = sql.indexOf("}}", startPos);
			String replacementKey = sql.substring(startPos + 2, endPos);
			sql.replace(startPos, endPos + 2, "");
			textReplacements.put(new Integer(startPos), replacementKey);
		}
		return textReplacements;
	}

	/**
	 * Puts in the Properties instance the variables and values needed for
	 * completing the HQL defined by the Velocity grammar.
	 * 
	 * @param paramNames
	 *            the variable needed to complete the HQL defined with the
	 *            Velocity grammar
	 * @param values
	 *            the variable value needed to complete the HQL defined with the
	 *            Velocity grammar
	 * @return the Context instance mapping the variables and values needed to
	 *         complete the HQL defined with with the Velocity grammar.
	 */
	private Context generateVelocityContext(String[] paramNames, Object[] values) {
		VelocityContext context = new VelocityContext();

		for (int i = 0; i < paramNames.length; i++) {
			context.put(paramNames[i], values[i]);
		}

		return context;
	}

	/**
	 * Puts in the Properties instance the values needed to replace the dynamic
	 * HQL's variable defined as 'name=value' type. This is defined as
	 * Object[]{name1=value1,name2=value2,...} or
	 * Object[]{Object[]{name1,value2},Object[]{name2,value2},...}
	 * 
	 * @param values
	 *            defines as types such as 'name=value' the variable names
	 *            needed to be replaced by the appropriate variables defined in
	 *            the dynamic HQL phrase.
	 * @return The context instance mapped with the variable and values needed
	 *         to complete the HQL defined using Velocity grammar.
	 * @throws Exception
	 *             the input parameter is as Object[]{Object[]{name1,value1},
	 *             Object[]{name2,value2},...} The internally defined Object[]'s
	 *             length is not 2.
	 */
	private Context generateVelocityContext(Object[] values) throws Exception {
		VelocityContext context = new VelocityContext();
		String localStr = null;
		Object[] localArray = null;
		for (int i = 0; i < values.length; i++) {
			if (values[i] instanceof String) {
				localStr = (String) values[i];
				int pos = localStr.indexOf(DELIMETER);
				if (pos < 0)
					return null;
				context.put(localStr.substring(0, pos), localStr
						.substring(pos + 1));
			} else if (values[i] instanceof Object[]) {
				localArray = (Object[]) values[i];
				if (localArray.length != 2) {
					DynamicHibernateService.LOGGER
							.error("DynamicHibernate Service : Fail to generate value map from Object[]{var1=value1,var2=value2,...} or Object[]{Object[]{var1,value1}, Object[]{var2,value2}, ...}");
					throw new BaseException(
							"DynamicHibernate Service : Fail to generate value map from Object[]{var1=value1,var2=value2,...} or Object[]{Object[]{var1,value1}, Object[]{var2,value2}, ...}");
				}
				context.put(localArray[0].toString(), localArray[1]);
			} else if (values[i] == null) {
				continue;
			} else {
				return null;
			}

		}
		return context;
	}

	/**
	 * Find the Configuration Builder for reading the XML file defining the
	 * dynamic HQL.
	 * 
	 * @return the Configuration Builder for reading the XML file defining the
	 *         dynamic HQL
	 * @throws ParserConfigurationException
	 *             at SAXParser creation, there is a problem.
	 * @throws SAXException
	 *             at XMLReader creation, there is a problem.
	 */
	private DefaultConfigurationBuilder getBuilder()
			throws ParserConfigurationException, SAXException {
		final SAXParserFactory saxParserFactory = SAXParserFactory
				.newInstance();
		saxParserFactory.setValidating(false);
		final SAXParser saxParser = saxParserFactory.newSAXParser();
		XMLReader parser = saxParser.getXMLReader();
		// parser.setErrorHandler(new
		// BeansErrorHandler());
		parser.setEntityResolver(new BeansDtdResolver());
		return new DefaultConfigurationBuilder(parser);
	}
	
	private class QueryInfo {
		private String type;
		private String statement;
		private List returnList = new ArrayList();
		private Map returnJoinMap = new HashMap();
		private Map returnScalarMap = new HashMap();

		public QueryInfo(String type, String statement, List returnList,
				Map returnJoinMap, Map returnScalarMap) {
			super();
			this.type = type;
			this.statement = statement;
			this.returnList = returnList;
			this.returnJoinMap = returnJoinMap;
			this.returnScalarMap = returnScalarMap;
		}

		public List getReturnList() {
			return returnList;
		}

		
		@SuppressWarnings("unused")
		public void setReturnList(List returnList) {
			this.returnList = returnList;
		}

		public Map getReturnJoinMap() {
			return returnJoinMap;
		}

		@SuppressWarnings("unused")
		public void setReturnJoinMap(Map returnJoinMap) {
			this.returnJoinMap = returnJoinMap;
		}

		public Map getReturnScalarMap() {
			return returnScalarMap;
		}

		@SuppressWarnings("unused")
		public void setReturnScalarMap(Map returnScalarMap) {
			this.returnScalarMap = returnScalarMap;
		}

		public String getType() {
			return type;
		}

		public String getStatement() {
			return statement;
		}
	}

	private class ReturnInfo {
		private String alias;
		private Class clazz;
		private String entityName;

		public ReturnInfo(String alias, Class clazz, String entityName) {
			super();
			this.alias = alias;
			this.clazz = clazz;
			this.entityName = entityName;
		}

		public String getAlias() {
			return alias;
		}

		@SuppressWarnings("unused")
		public void setAlias(String alias) {
			this.alias = alias;
		}

		public Class getClazz() {
			return clazz;
		}

		@SuppressWarnings("unused")
		public void setClazz(Class clazz) {
			this.clazz = clazz;
		}

		public String getEntityName() {
			return entityName;
		}

		@SuppressWarnings("unused")
		public void setEntityName(String entityName) {
			this.entityName = entityName;
		}

	}
}
