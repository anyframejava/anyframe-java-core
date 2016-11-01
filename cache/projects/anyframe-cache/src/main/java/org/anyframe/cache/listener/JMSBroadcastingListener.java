package org.anyframe.cache.listener;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.Properties;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.opensymphony.oscache.base.Cache;
import com.opensymphony.oscache.base.Config;
import com.opensymphony.oscache.base.InitializationException;
import com.opensymphony.oscache.base.events.CacheEntryEvent;
import com.opensymphony.oscache.plugins.clustersupport.ClusterNotification;

public class JMSBroadcastingListener extends
		com.opensymphony.oscache.plugins.clustersupport.JMSBroadcastingListener {
	
	Log log = LogFactory.getLog(JMSBroadcastingListener.class);
	private static final int REMOVE_KEY = 10;

	private Config config = null;

	/**
	 * use config to access JMS Server using JDNI properties.
	 */
	public void initialize(Cache cache, Config config)
			throws InitializationException {
		this.config = config;
		super.initialize(cache, config);
	}

	/**
	 * when a entity is update, send flush event to messaging server for
	 * removing cache entry from oscache.
	 */
	public void cacheEntryUpdated(CacheEntryEvent event) {
		if (!Cache.NESTED_EVENT.equals(event.getOrigin())
				&& !CLUSTER_ORIGIN.equals(event.getOrigin())) {
			if (log.isDebugEnabled()) {
				log.debug("cacheEntryFlushed called (" + event + ")");
			}

			sendNotification(new ClusterNotification(REMOVE_KEY, event.getKey()));
		}
	}

	/**
	 * Removing a cache entry if a message with remove key arrives.
	 * {@inheritDoc}
	 */

	public void handleClusterNotification(ClusterNotification message) {
		if (cache == null) {
			log
					.warn("A cluster notification ("
							+ message
							+ ") was received, but no cache is registered on this machine. Notification ignored.");
			return;
		}

		if (log.isInfoEnabled()) {
			log.info("Cluster notification (" + message + ") was received.");
		}

		switch (message.getType()) {
		case ClusterNotification.FLUSH_KEY:
			cache.flushEntry((String) message.getData(), CLUSTER_ORIGIN);
			break;
		case ClusterNotification.FLUSH_GROUP:
			cache.flushGroup((String) message.getData(), CLUSTER_ORIGIN);
			break;
		case ClusterNotification.FLUSH_PATTERN:
			cache.flushPattern((String) message.getData(), CLUSTER_ORIGIN);
			break;
		case ClusterNotification.FLUSH_CACHE:
			cache.flushAll((Date) message.getData(), CLUSTER_ORIGIN);
			break;
		case REMOVE_KEY:
			cache.removeEntry((String) message.getData());
			break;
		default:
			log.error("The cluster notification (" + message
					+ ") is of an unknown type. Notification ignored.");
		}
	}

	/**
	 * @return creates a context for performing naming operations.
	 * @throws NamingException
	 *             if a naming exception is encountered
	 */
	public InitialContext getInitialContext() throws NamingException {

		String url = config.getProperty("cache.cluster.jndi.cofig");
		InputStream in = this.getClass().getClassLoader().getResourceAsStream(
				"jndi.properties");

		Properties prop = new Properties();
		try {
			prop.load(in);
			in.close();
		} catch (IOException e) {
			log.error("Cannot read from (or close) the input stream. Error : " + e.getMessage());
		}

		return new InitialContext(prop);
	}

}
