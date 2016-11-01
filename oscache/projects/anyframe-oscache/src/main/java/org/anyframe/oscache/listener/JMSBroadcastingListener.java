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
package org.anyframe.oscache.listener;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.Properties;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.opensymphony.oscache.base.Cache;
import com.opensymphony.oscache.base.Config;
import com.opensymphony.oscache.base.InitializationException;
import com.opensymphony.oscache.base.events.CacheEntryEvent;
import com.opensymphony.oscache.plugins.clustersupport.ClusterNotification;

/**
 * This JMSBroadcastingListener class is a listener class to support cluster
 * functionalities.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class JMSBroadcastingListener extends
		com.opensymphony.oscache.plugins.clustersupport.JMSBroadcastingListener {

	Logger logger = LoggerFactory.getLogger(JMSBroadcastingListener.class);
	private static final int REMOVE_KEY = 10; 

	/**
	 * use config to access JMS Server using JDNI properties.
	 */
	public void initialize(Cache cache, Config config)
			throws InitializationException {
		super.initialize(cache, config);
	}

	/**
	 * when a entity is update, send flush event to messaging server for
	 * removing cache entry from oscache.
	 */
	public void cacheEntryUpdated(CacheEntryEvent event) {
		if (!Cache.NESTED_EVENT.equals(event.getOrigin())
				&& !CLUSTER_ORIGIN.equals(event.getOrigin())) {

			logger.debug("cacheEntryFlushed called ({})",
					new Object[] { event });

			sendNotification(new ClusterNotification(REMOVE_KEY, event.getKey()));
		}
	}

	/**
	 * Removing a cache entry if a message with remove key arrives.
	 * {@inheritDoc}
	 */

	public void handleClusterNotification(ClusterNotification message) {
		Object[] args = { message };
		if (cache == null) {
			logger.warn(
					"A cluster notification ({}) was received, but no cache is registered on this machine. Notification ignored.",
					args);
			return;
		}

		logger.info("Cluster notification ({}) was received.", args);

		switch (message.getType()) {
		case ClusterNotification.FLUSH_KEY:
			cache.flushEntry((String) message.getData(), CLUSTER_ORIGIN);
			break;
		case ClusterNotification.FLUSH_GROUP:
			cache.flushGroup((String) message.getData(), CLUSTER_ORIGIN);
			break;
		case ClusterNotification.FLUSH_PATTERN:
			cache.flushGroup((String) message.getData(), CLUSTER_ORIGIN);
			break;
		case ClusterNotification.FLUSH_CACHE:
			cache.flushAll((Date) message.getData(), CLUSTER_ORIGIN);
			break;
		case REMOVE_KEY:
			cache.removeEntry((String) message.getData());
			break;
		default:
			logger.error(
					"The cluster notification ({}) is of an unknown type. Notification ignored.",
					args);
		}
	}

	/**
	 * create initial context
	 * 
	 * @return creates a context for performing naming operations.
	 * @throws NamingException
	 *             if a naming exception is encountered
	 */
	public InitialContext getInitialContext() throws NamingException {

		// String url = config.getProperty("cache.cluster.jndi.cofig");
		InputStream in = this.getClass().getClassLoader()
				.getResourceAsStream("jndi.properties");

		Properties prop = new Properties();
		try {
			prop.load(in);
			in.close();
		} catch (IOException e) {
			logger.error(
					"Cannot read from (or close) the input stream. Error : {}",
					e.getMessage());
		}

		return new InitialContext(prop);
	}

}
