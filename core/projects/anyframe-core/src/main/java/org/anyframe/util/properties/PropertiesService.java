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
package org.anyframe.util.properties;

import java.util.Iterator;
import java.util.Vector;

import org.anyframe.exception.FileReloadException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This service enables applications to approach the value of singular key
 * Containing the pairs of key-value internally. It enhances the flexibility
 * through managing the information for system environment. It is not needed for
 * EJB components because they present the functions originally.
 * 
 * *
 * <p>
 * PropertiesService Configuration Example:
 * 
 * <pre>
 * &lt;property name=&quot;dynamicReload&quot; value=&quot;1000&quot; /&gt;
 * &lt;property name=&quot;encoding&quot; value=&quot;UTF-8&quot; /&gt;
 * &lt;property name=&quot;fileNames&quot;&gt;
 *   &lt;value&gt;
 *     file:./src/*-resource.properties,
 *     classpath:/resource.properties
 *   &lt;/value&gt;
 * &lt;/property&gt;
 * </pre>
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public interface PropertiesService {
	Logger LOGGER = LoggerFactory.getLogger(PropertiesService.class);

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a boolean value.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a boolean
	 */
	boolean getBoolean(String name);

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
	boolean getBoolean(String name, boolean def);

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a double.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a double
	 */
	double getDouble(String name);

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
	double getDouble(String name, double def);

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a float.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a float
	 */
	float getFloat(String name);

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
	float getFloat(String name, float def);

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as an integer.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as an integer
	 */
	int getInt(String name);

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
	int getInt(String name, int def);

	/**
	 * Get keys contained in the configuration repository.
	 * 
	 * @return all the keys
	 */
	Iterator<String> getKeys();

	/**
	 * Get keys contained in the configuration repository that match the
	 * specified prefix.
	 * 
	 * @param prefix
	 *            A String prefix to test against
	 * @return all the keys that match the prefix
	 */
	Iterator<String> getKeys(String prefix);

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a long.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a long
	 */
	long getLong(String name);

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
	long getLong(String name, long def);

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a string.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a string
	 */
	String getString(String name);

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
	String getString(String name, String def);

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a string array.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a string array
	 */
	String[] getStringArray(String name);

	/**
	 * The purpose of this method is to get the configuration resource with the
	 * given name as a vector.
	 * 
	 * @param name
	 *            The resource name
	 * @return The value of the named resource as a vector
	 */
	Vector<?> getVector(String name);

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
	Vector<?> getVector(String name, Vector<?> def);

	/**
	 * The purpose of this method is to refresh the configuration resource if
	 * some configuration resources is changed.
	 * 
	 * @throws FileReloadException
	 *             if there is any problem refreshing the property files
	 */
	void refreshPropertyFiles() throws FileReloadException;
}
