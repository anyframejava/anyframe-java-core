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
package org.anyframe.util.properties.impl;

import org.anyframe.exception.message.DetailMessageSource;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * For testing functions what Properties Service supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class PropertiesServiceImplTest extends
		AbstractDependencyInjectionSpringContextTests {

	private PropertiesServiceImpl propertiesService;

	/**
	 * overrided
	 * 
	 * @return String[]
	 */
	protected String[] getConfigLocations() {
		return new String[] { "spring/context-*.xml" };
	}

	/**
	 * [Flow #-1] Negative Case : test refreshPropertyFiles method after
	 * changing null configuration
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testRefreshPropertyFiles() throws Exception {
		// 1. initialize PropertiesService
		propertiesService = (PropertiesServiceImpl) applicationContext
				.getBean("propertiesService");

		try {
			// 2. try to refresh
			propertiesService.refreshPropertyFiles();
		} catch (Exception e) {
			assertTrue(e instanceof DetailMessageSource);
			assertEquals("error.properties.refresh.files",
					((DetailMessageSource) e).getMessages().getMessageKey());
		}
	}

	/**
	 * [Flow #-2] Negative Case : try to get property after destroying
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testDestroy() throws Exception {
		// 1. initialize
		propertiesService = (PropertiesServiceImpl) applicationContext
				.getBean("propertiesService");
		// 2. destroy propertiesService
		propertiesService.destroy();

		// 3. get a specific property
		assertNull(propertiesService.getString("tokens_on_multiple_lines"));
	}

}
