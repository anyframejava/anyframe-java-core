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
package org.anyframe.util.properties.impl;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import org.anyframe.exception.FileReloadException;
import org.anyframe.exception.InitializationException;
import org.anyframe.util.StringUtil;
import org.anyframe.util.properties.PropertiesService;
import org.apache.commons.collections.ExtendedProperties;
import org.springframework.beans.factory.BeanDefinitionStoreException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.util.Assert;

/**
 * This service enables applications to approach the value of singular key
 * Containing the pairs of key-value internally. It enhances the flexibility
 * through managing the information for system environment. It is not needed for
 * EJB components because they present the functions originally.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class PropertiesServiceImpl implements PropertiesService,
		InitializingBean, DisposableBean, ResourceLoaderAware {
	private ExtendedProperties anyframeProperties = null;
	private ResourceLoader resourceLoader = null;

	private Watcher watcher;
	private long dynamicReload = -1; 
	private String fileNames = "";
	private String encoding = "";

	public void setDynamicReload(long dynamicReload) {
		this.dynamicReload = dynamicReload;
	}

	public void setFileNames(String fileNames) {
		this.fileNames = fileNames;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a boolean value.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a boolean
	 */
	public boolean getBoolean(String name) {
		return getConfiguration().getBoolean(name);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a boolean value, or a default value.
	 * 
	 * @param name
	 *            The resource name
	 * @param def
	 *            The default value of the resource.
	 * @return The value of the named resource as a boolean
	 */
	public boolean getBoolean(String name, boolean def) {
		return getConfiguration().getBoolean(name, def);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a double.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a double
	 */
	public double getDouble(String name) {
		return getConfiguration().getDouble(name);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a double, or a default value.
	 * 
	 * @param name
	 *            The resource name
	 * @param def
	 *            The default value of the resource
	 * @return The value of the named resource as a double
	 */
	public double getDouble(String name, double def) {
		return getConfiguration().getDouble(name, def);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a float.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a float
	 */
	public float getFloat(String name) {
		return getConfiguration().getFloat(name);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a float, or a default value.
	 * 
	 * @param name
	 *            The resource name
	 * @param def
	 *            The default value of the resource
	 * @return The value of the named resource as a float
	 */
	public float getFloat(String name, float def) {
		return getConfiguration().getFloat(name, def);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as an integer.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as an integer
	 */
	public int getInt(String name) {
		return getConfiguration().getInt(name);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as an integer, or a default value.
	 * 
	 * @param name
	 *            The resource name
	 * @param def
	 *            The default value of the resource
	 * @return The value of the named resource as an integer
	 */
	public int getInt(String name, int def) {
		return getConfiguration().getInt(name, def);
	}

	/**
	 * Get keys contained in the configuration repository.
	 * 
	 * @return all the keys
	 */
	@SuppressWarnings("unchecked")
	public Iterator<String> getKeys() {
		return getConfiguration().getKeys();
	}

	/**
	 * Get keys contained in the configuration repository that match the
	 * specified prefix.
	 * 
	 * @param prefix
	 *            A String prefix to test against
	 * @return all the keys that match the prefix
	 */
	@SuppressWarnings("unchecked")
	public Iterator<String> getKeys(String prefix) {
		return getConfiguration().getKeys(prefix);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a long.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a long
	 */
	public long getLong(String name) {
		return getConfiguration().getLong(name);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a long, or a default value.
	 * 
	 * @param name
	 *            The resource name
	 * @param def
	 *            The default value of the resource
	 * @return The value of the named resource as a long
	 */
	public long getLong(String name, long def) {
		return getConfiguration().getLong(name, def);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a string.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a string
	 */
	public String getString(String name) {
		return getConfiguration().getString(name);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a string, or a default value.
	 * 
	 * @param name
	 *            The resource name
	 * @param def
	 *            The default value of the resource
	 * @return The value of the named resource as a string
	 */
	public String getString(String name, String def) {
		return getConfiguration().getString(name, def);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a string array.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a string array
	 */
	public String[] getStringArray(String name) {
		return getConfiguration().getStringArray(name);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a vector.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a vector
	 */
	public Vector<?> getVector(String name) {
		return getConfiguration().getVector(name);
	}

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a vector, or a default value.
	 * 
	 * @param name
	 *            The resource name
	 * @param def
	 *            The default value of the resource
	 * @return The value of the named resource as a vector
	 */
	public Vector<?> getVector(String name, Vector<?> def) {
		return getConfiguration().getVector(name, def);
	}

	/**
	 * Returns the Configuration of a specific service. Generic ServiceBroker
	 * returns empty Configuration
	 * 
	 * @return Properties of requested Service.
	 */
	private ExtendedProperties getConfiguration() {
		return anyframeProperties;
	}

	/**
	 * The purpose of this method is to refresh the configuration resource if
	 * some configuration resources is changed.
	 * 
	 * @throws FileReloadException
	 *             if there is any problem refreshing the property files
	 * 
	 */
	public void refreshPropertyFiles() {
		String fileName = null;

		try {
			List<String> fileNameList = StringUtil.getTokens(this.fileNames);
			for (int i = 0; i < fileNameList.size(); i++) {
				fileName = fileNameList.get(i).trim();
				loadPropertiesDefinition(fileName, this.encoding);
			}
		} catch (Exception ex) {
			PropertiesService.LOGGER.error(
					"Properties Service : Fail to refresh file properties {}.",
					new Object[] { fileName });
			PropertiesService.LOGGER
					.error("Properties Service : Some property files doesn't exist or there are wrong definitions in property files.");

			throw new FileReloadException(
					"Properties Service : Fail to refresh file properties "
							+ fileName + ".", ex);
		}
	}

	/**
	 * initialize PropertiesService
	 * 
	 * @throws InitializationException
	 */
	public void afterPropertiesSet() {
		try {
			setUpWatcher();

			anyframeProperties = new ExtendedProperties();

			List<String> fileNameList = StringUtil.getTokens(this.fileNames);
			for (int i = 0; i < fileNameList.size(); i++) {
				String fileName = fileNameList.get(i).trim();
				loadPropertiesDefinition(fileName, this.encoding);
			}

			if (dynamicReload > 0) {
				watcher.start();
				PropertiesService.LOGGER
						.debug("Properties Service : Watcher is started...");
			}
		} catch (Exception ex) {
			PropertiesService.LOGGER
					.error("[Properties Service] There are something wrong definitions in a service configuration file or property files.");
			throw new InitializationException(
					"[Properties Service] Fail to initialize a Properties Service.\n Reason = ["
							+ ex.getMessage() + "]", ex);
		}
	}

	private void setUpWatcher() {
		if (dynamicReload > 0) {
			watcher = new Watcher(this);
			watcher.setRefreshRate(dynamicReload);
		}
	}

	/**
	 * destroy PropertiesService
	 */
	public void destroy() {
		anyframeProperties = new ExtendedProperties();
	}

	public void setResourceLoader(ResourceLoader resourceLoader) {
		this.resourceLoader = resourceLoader;
	}

	private void loadPropertiesDefinition(String location, String encoding)
			throws IOException {
		if (resourceLoader instanceof ResourcePatternResolver) {
			// Resource pattern matching available.
			try {
				Resource[] resources = ((ResourcePatternResolver) resourceLoader)
						.getResources(location);
				loadPropertiesDefinitions(resources, encoding);
			} catch (IOException ex) {
				throw new BeanDefinitionStoreException(
						"Could not resolve Properties resource pattern ["
								+ location + "]", ex);
			}
		} else {
			// Can only load single resources by absolute URL.
			Resource resource = resourceLoader.getResource(location);
			loadPropertiesDefinition(resource, encoding);
		}
	}

	private void loadPropertiesDefinitions(Resource[] resources, String encoding)
			throws IOException {
		Assert.notNull(resources, "Resource array must not be null");
		for (int i = 0; i < resources.length; i++) {
			loadPropertiesDefinition(resources[i], encoding);
		}
	}

	private void loadPropertiesDefinition(Resource resource, String encoding)
			throws IOException {
		PropertiesService.LOGGER
				.debug("[Properties Service] Property file is a "
						+ resource.getFilename()
						+ ". Encoding Type of the file is" + encoding + " .");
		ExtendedProperties anyframeProperty = new ExtendedProperties();
		anyframeProperty.load(resource.getInputStream(), encoding);
		if (dynamicReload > 0)
			watcher.addResource(resource);
		anyframeProperties.combine(anyframeProperty);
	}

	public Hashtable<Resource, Long> getResources() {
		return this.watcher.getResources();
	}

	class Watcher extends Thread {

		private final int scanRate = 10;

		private final Hashtable<Resource, Long> resources = new Hashtable<Resource, Long>();

		private final boolean done = false;

		private long refreshRate = 0;

		public Hashtable<Resource, Long> getResources() {
			return resources;
		}

		public Watcher(Object subscriber) {
			setDaemon(true);
			setPriority(Thread.MIN_PRIORITY);
		}

		public void setRefreshRate(long refresh) {
			if (refresh > scanRate)
				this.refreshRate = refresh;
			else
				this.refreshRate = scanRate;
		}

		/**
		 * @return the refresh rate, in seconds, of this watcher
		 */
		public long getRefreshRate() {
			return refreshRate;
		}

		public void addResource(Resource resource) throws IOException {
			resources
					.put(resource, new Long(resource.getFile().lastModified()));
			PropertiesService.LOGGER.info("appended " + resource.getFilename()
					+ " file for monitoring");
		}

		/**
		 * <p>
		 * Main routine for the monitor which periodically checks whether the
		 * filex have been modified.
		 * </p>
		 * The algorithm used does not guarantee a constant refresh rate between
		 * invocations.
		 */
		public void run() {
			try {
				while (!done) {
					synchronized (this) {
						boolean modificationChk = false;
						Enumeration<Resource> en = resources.keys();
						while (en.hasMoreElements()) {
							try {
								Resource resource = en.nextElement();

								long modified = resources.get(resource)
										.longValue();

								if (!resource.exists()) {
									resources.remove(resource);
									continue;
								}

								if (resource.getFile().getAbsoluteFile()
										.lastModified() > modified) {
									resources.put(resource, new Long(resource
											.getFile().lastModified()));
									modificationChk = true;
									PropertiesService.LOGGER
											.info("Properties Service : Properties Service is reloaded because "
													+ resource.getFile()
															.getAbsoluteFile()
													+ " is changed.");
									continue;
								}
							} catch (Exception ex) {
								PropertiesService.LOGGER
										.error(
												"Properties Service : Fail to check whether propertis files are modified.",
												ex);
							}
						}

						try {
							if (modificationChk) {
								anyframeProperties = new ExtendedProperties();
								refreshPropertyFiles();

							}
						} catch (Exception ex) {
							PropertiesService.LOGGER
									.error(
											"Properties Service : Fail to reload properties.",
											ex);
						}
						sleep(getRefreshRate());
					}
				}
			} catch (InterruptedException ex) {
				PropertiesService.LOGGER.error(
						"Properties Service : Fail to run Watcher.", ex);
			}
		}
	}
}
