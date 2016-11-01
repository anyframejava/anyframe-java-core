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
package org.anyframe.util.system;

import java.io.IOException;
import java.util.Properties;

import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

/**
 * Load scripts.properties.
 * 
 * @author ByungHun Woo
 * 
 */
public class ScriptPropertiesLoader {

	private final Properties scripts = new Properties(); 

	/**
	 * Basic scripts.properties path -
	 * classpath:/org/anyframe/util/system/scripts.properties
	 */
	public static final String DEFAULT_SCRIPTS_PROPERTIES_LOCATION = "classpath:/org/anyframe/util/system/scripts.properties";

	private boolean loaded = false;

	/**
	 * Load scripts.properties of basic path.
	 */
	public void load() {
		load(DEFAULT_SCRIPTS_PROPERTIES_LOCATION);
	}

	/**
	 * Load scripts.properties of path returned as parameter. In this case, use
	 * ResourceLoader of Spring.
	 * @param location
	 */
	public void load(String location) {
		// properties loading
		ResourceLoader resourceLoader = new DefaultResourceLoader();
		Resource resource = resourceLoader.getResource(location);
		try {
			scripts.load(resource.getInputStream());
			loaded = true;
		}
		catch (IOException e) {
			throw new IllegalStateException("scripts.properteis Loading Error", e);
		}
	}

	/**
	 * Whether scripts.properties is loaded
	 * @return true if scripts.properties is loaded.
	 */
	public boolean isLoaded() {
		return loaded;
	}

	/**
	 * Loaded scripts.properties is used in java.util.Properties format.
	 * @return properties
	 */
	public Properties getScripts() {
		return scripts;
	}

}
