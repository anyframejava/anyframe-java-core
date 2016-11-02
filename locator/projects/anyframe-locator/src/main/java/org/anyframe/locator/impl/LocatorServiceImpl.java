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
package org.anyframe.locator.impl;

import java.util.Date;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.rmi.PortableRemoteObject;
import javax.sql.DataSource;
import javax.transaction.UserTransaction;

import org.anyframe.cache.CacheService;
import org.anyframe.exception.BaseException;
import org.anyframe.locator.LocatorService;
import org.apache.avalon.framework.configuration.Configurable;
import org.apache.avalon.framework.configuration.Configuration;
import org.apache.avalon.framework.configuration.ConfigurationException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public abstract class LocatorServiceImpl implements LocatorService, InitializingBean,
		DisposableBean, ApplicationContextAware, Configurable {
	public abstract void setConfiguration(Configuration config);
	
	private MessageSource messageSource;

	private static Hashtable m_contextPropsList = null;

	private static Hashtable m_environment = new Hashtable();

	private static Hashtable m_userTX = new Hashtable();

	private CacheService cacheService;

	private boolean m_cacheUse = false;

	/**
	 * setter
	 * 
	 * @param context
	 *            dependencies are injected by Spring Framework
	 */
	public void setApplicationContext(ApplicationContext context) {
		this.messageSource = (MessageSource) context.getBean("messageSource");
	}

	public void configure(Configuration configuration)
			throws ConfigurationException {
		Configuration[] configs = configuration.getChildren("context");

		if (configs.length == 0)
			throw new ConfigurationException(
					"Service Locator : must have <context> over one.");

		for (int i = 0; i < configs.length; i++) {
			String name = configs[i].getAttribute("name", "");
			String key = configs[i].getAttribute("key", "");
			String value = configs[i].getAttribute("value", "");

			if (name.equals("") || key.equals("") || value.equals(""))
				throw new ConfigurationException(
						"Service Locator : name, key and value are essential attribute in a <context>.");
			m_environment.put(name + "." + key, value);
		}

		configs = configuration.getChildren("usertx");

		if (configs.length != 0) for (int i = 0; i < configs.length; i++) {
			String name = configs[i].getAttribute("name", "");
			String key = configs[i].getAttribute("key", "");

			m_userTX.put(name, key);
		}
	}

	public void setContext() throws Exception {

	}

	public void setCacheService(CacheService cacheService) throws Exception {
		this.cacheService = cacheService;
		if (this.cacheService != null) m_cacheUse = true;
	}

	public void afterPropertiesSet() throws Exception {
		Enumeration keys = m_environment.keys();

		m_contextPropsList = new Hashtable();

		while (keys.hasMoreElements()) {
			String key = (String) keys.nextElement();
			int start = key.indexOf(".");
			String contextName = key.substring(0, start);

			Hashtable contextProps = null;

			if (m_contextPropsList.containsKey(contextName)) {
				contextProps = (Hashtable) m_contextPropsList.get(contextName);
			}
			else {
				contextProps = new Hashtable();
			}

			contextProps.put(key.substring(start + 1), m_environment.get(key));

			m_contextPropsList.put(contextName, contextProps);
		}
	}

	public void destroy() {
		try {
			if (null != cacheService) cacheService.flushAll(new Date());
		}
		catch (Exception e) {
			LocatorService.LOGGER.fatal(messageSource
					.getMessage("error.locator.destroy", new String[] {},
							"[Service Locator] Could not destroy.", Locale
									.getDefault()), e);
		}
	}

	public Context getInitialContext(final Hashtable environment) {
		try {
			Properties contextProps = new Properties();

			Enumeration keys = environment.keys();

			while (keys.hasMoreElements()) {
				String key = (String) keys.nextElement();
				contextProps.put(key, environment.get(key));
			}

			return new InitialContext(contextProps);
		}
		catch (Exception e) {
			LocatorService.LOGGER.error(messageSource.getMessage(
					"error.locator.find.initial.context", new String[] {},
					"[Service Locator] Could not find initial context.", Locale
							.getDefault()), e);
			return null;
		}
	}

	/**
	 * Return the Context with the specified name.
	 * 
	 * @param contextName
	 *            The name of the context.
	 * @return The context with the specified name, or null if no context exists
	 *         with that name.
	 */
	public Context getContext(String contextName) {
		try {
			Hashtable contextProps = null;

			if (m_contextPropsList.containsKey(contextName)) {
				contextProps = (Hashtable) m_contextPropsList.get(contextName);
			}
			else {
				contextProps = new Hashtable();
			}

			Object objRef = getCachedObject(contextName);

			if (null == objRef) {
				objRef = getInitialContext(contextProps);
				if (null == objRef) {
					return null;
				}
				putCachedObject(contextName, objRef);
			}

			return (Context) objRef;
		}
		catch (Exception e) {
			LocatorService.LOGGER.error(messageSource.getMessage(
					"error.locator.find.context", new String[] { contextName },
					"[Service Locator] Could not find '" + contextName
							+ "' context.", Locale.getDefault()), e);
			return null;
		}
	}

	/**
	 * Using a default context, get DataSource Object from JNDI Server.
	 * <p>
	 * Using a defined default context in configuration files, get DataSource
	 * Object from JNDI Server to do Naming Service.
	 * 
	 * @param dsName
	 *            context name that exists in configuration files
	 * @return DataSource Object
	 * @throws BaseException
	 *             if an error occurs
	 */
	public DataSource getDataSource(String dsName) throws BaseException {
		return getDataSource(dsName, "default");
	}

	/**
	 * Using a context, get DataSource Object from JNDI Server.
	 * <p>
	 * Using a defined context in configuration files, get DataSource Object
	 * from JNDI Server to do Naming Service.
	 * 
	 * @param dsName
	 *            assigned JNDI name in dsName JNDI Server
	 * @param contextName
	 *            context name that exists in configuration files
	 * @return DataSource Object connected to dsName
	 * @throws BaseException
	 *             if an error occurs
	 */
	public DataSource getDataSource(String dsName, String contextName)
			throws BaseException {
		try {
			Object objRef = lookup(dsName, contextName);
			return (DataSource) objRef;
		}
		catch (Exception e) {
			LocatorService.LOGGER.error(messageSource.getMessage(
					"error.locator.find.datasource", new String[] { dsName,
							contextName },
					"[Service Locator] Could not find dataSource '" + dsName
							+ "' in '" + contextName + "' context.", Locale
							.getDefault()), e);
			throw new BaseException(messageSource,
					"error.locator.find.datasource", new String[] { dsName,
							contextName },
					"[Service Locator] Could not find dataSource '" + dsName
							+ "' in '" + contextName + "' context.", e);
		}
	}

	/**
	 * Using a default context, get EJBHome Object from JNDI Server.
	 * <p>
	 * Using a defined default context in configuration files, get EJBHome
	 * Object from JNDI Server to do Naming Service.
	 * 
	 * @param ejbName
	 *            assigned JNDI name in ejbName JNDI Server
	 * @return EJBHome Object connected to ejbName
	 * @throws BaseException
	 *             if an error occurs
	 */
	public Object getEJBHome(String ejbName) throws BaseException {
		return getEJBHome(ejbName, null, "default");
	}

	/**
	 * Using a context, get EJB Home Object from JNDI Server.
	 * <p>
	 * Using a defined context in configuration files, get EJBHome Object from
	 * JNDI Server to do Naming Service.
	 * 
	 * @param ejbName
	 *            assigned JNDI name in ejbName JNDI Server
	 * @param contextName
	 *            context name that exists in configuration files
	 * @return EJBHome Object connected to ejbName
	 * @throws BaseException
	 *             if an error occurs
	 */
	public Object getEJBHome(String ejbName, String contextName)
			throws BaseException {
		return getEJBHome(ejbName, null, contextName);
	}

	/**
	 * Using a default context, get EJBHome Object narrow casting from JNDI
	 * Server.
	 * <p>
	 * Using a defined default context in configuration files, narrow casting
	 * EJBHome Object which is get from JNDI Server to do Naming Service. When
	 * EJBHome exists in remote, it make use
	 * 
	 * @param ejbName
	 *            assigned JNDI name in ejbName JNDI Server
	 * @param classType
	 *            classType narrow casting
	 * @return EJBHome Object connected to ejbName
	 * @throws TitanServiceException
	 *             if an error occurs
	 */
	public Object getEJBHome(String ejbName, Class classType)
			throws BaseException {
		return getEJBHome(ejbName, classType, "default");
	}

	/**
	 * Using a context, get EJBHome Object narrow casting from JNDI Server.
	 * <p>
	 * Using a defined default context in configuration files, narrow casting
	 * EJBHome Object which is get from JNDI Server to do Naming Service. When
	 * EJBHome exists in remote, it make use
	 * 
	 * @param ejbName
	 *            assigned JNDI name in ejbName JNDI Server
	 * @param classType
	 *            classType narrow casting
	 * @param contextName
	 *            context name that exists in configuration files
	 * @return EJBHome Object connected to ejbName
	 * @throws BaseException
	 *             if an error occurs
	 */
	public Object getEJBHome(String ejbName, Class classType, String contextName)
			throws BaseException {
		try {
			Object objRef = lookup(ejbName, contextName);

			if (null == classType) return objRef;

			return PortableRemoteObject.narrow(objRef, classType);
		}
		catch (Exception e) {
			LocatorService.LOGGER.error(messageSource.getMessage(
					"error.locator.find.ejb", new String[] { ejbName,
							contextName },
					"[Service Locator] Could not find EJBHome [" + ejbName
							+ "] in '" + contextName + "' context.", Locale
							.getDefault()), e);
			throw new BaseException(messageSource, "error.locator.find.ejb",
					new String[] { ejbName, contextName },
					"[Service Locator] Could not find EJBHome [" + ejbName
							+ "] in '" + contextName + "' context.", e);
		}
	}

	/**
	 * Using a default context, get UserTransaction Object from JNDI Server.
	 * <p>
	 * Using a default context in configuration files, get UserTransaction
	 * Object from JNDI Server to do Naming Service.
	 * 
	 * @return UserTransaction Object
	 * @throws BaseException
	 *             if an error occurs
	 */
	public UserTransaction getUserTransaction() throws BaseException {
		try {

			String userTX = (String) m_userTX.get("default");

			if (userTX == null) userTX = "javax.transaction.UserTransaction";
			UserTransaction utx = (UserTransaction) lookup(userTX);

			return utx;
		}
		catch (Exception e) {
			LocatorService.LOGGER
					.error(
							messageSource
									.getMessage(
											"error.locator.find.utx",
											new String[] {},
											"[Service Locator] Could not find javax.transaction.UserTransaction.",
											Locale.getDefault()), e);
			throw new BaseException(
					messageSource,
					"error.locator.find.utx",
					new String[] {},
					"[Service Locator] Could not find javax.transaction.UserTransaction.",
					e);
		}
	}

	/**
	 * Using a context, get UserTransaction Object from JNDI Server.
	 * <p>
	 * Using a defined context in configuration files, get UserTransaction
	 * Object from JNDI Server to do Naming Service.
	 * 
	 * @param contextName
	 *            context name that exists in configuration files
	 * @return UserTransaction Object
	 * @throws BaseException
	 *             if an error occurs.
	 */
	public UserTransaction getUserTransaction(String contextName)
			throws BaseException {
		try {
			String userTX = (String) m_userTX.get(contextName);

			UserTransaction utx = (UserTransaction) lookup(userTX, contextName);

			return utx;
		}
		catch (Exception e) {
			LocatorService.LOGGER.error(messageSource.getMessage(
					"error.locator.find.context.utx",
					new String[] { contextName },
					"[Service Locator] Could not find javax.transaction.UserTransaction in '"
							+ contextName + "' context.", Locale.getDefault()),
					e);
			throw new BaseException(messageSource,
					"error.locator.find.context.utx",
					new String[] { contextName },
					"[Service Locator] Could not find javax.transaction.UserTransaction in '"
							+ contextName + "' context.", e);
		}
	}

	/**
	 * Using a default context, get Object from JNDI Server.
	 * <p>
	 * Using a defined default context in configuration files, get Object from
	 * JNDI Server to do Naming Service.
	 * 
	 * @param name
	 *            assigned JNDI name in name JNDI Server
	 * @return Object connected to name
	 * @throws BaseException
	 *             if an error occurs
	 */
	public Object lookup(String name) throws BaseException {
		return lookup(name, "default");
	}

	/**
	 * Using a context, get Object from JNDI Server.
	 * <p>
	 * Using a defined default context in configuration files, get Object from
	 * JNDI Server to do Naming Service.
	 * 
	 * @param name
	 *            assigned JNDI name in name JNDI Server
	 * @param contextName
	 *            context name that exists in configuration files
	 * @return Object connected to name
	 * @throws BaseException
	 *             if an error occurs
	 */
	public Object lookup(String name, String contextName) throws BaseException {
		try {
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			if (loader == null) loader = this.getClass().getClassLoader();

			Object objRef = getCachedObject(loader + "." + contextName + "."
					+ name);

			if (null == objRef) {
				Context ctx = getContext(contextName);
				objRef = ctx.lookup(name);

				if (m_cacheUse)
					putCachedObject(loader + "." + contextName + "." + name,
							objRef);
			}
			return objRef;
		}
		catch (Exception e) {
			LocatorService.LOGGER.error(messageSource.getMessage(
					"error.locator.lookup", new String[] { name, contextName },
					"[Service Locator] Could not find [" + name + "] in '"
							+ contextName + "' context.", Locale.getDefault()),
					e);
			throw new BaseException(messageSource, "error.locator.lookup",
					new String[] { name, contextName },
					"[Service Locator] Could not find [" + name + "] in '"
							+ contextName + "' context.", e);
		}
	}

	/**
	 * Verify whether Object exists in Cache or not.
	 * 
	 * @param key
	 *            Key value in id cache. (EJBHome Name/DataSource
	 *            Name/javax.transaction.UserTransaction).(context) Type
	 * @return correspond Object or Null to id in cache.
	 */
	private Object getCachedObject(String key) {
		try {
			Object objRef = cacheService.getFromCache(key);
			return objRef;
		}
		catch (Exception e) {
			return null;
		}
	}

	/**
	 * Saves unexistent Context, UserTransaction, DataSource, EJBHome Objects in
	 * cache.
	 * 
	 * @param key
	 *            Key value in id cache. (EJBHome Name/DataSource
	 *            Name/javax.transaction.UserTransaction).(context) Type
	 * @param value
	 *            Object to be saved in content cache
	 */
	private void putCachedObject(String key, Object value) throws BaseException {
		synchronized (cacheService) {
			cacheService.putInCache(key, value);
		}
	}
}
