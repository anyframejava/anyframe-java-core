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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotSame;

import java.io.FileOutputStream;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Properties;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.core.io.Resource;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what Properties Service supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/spring/context-*.xml" })
public class PropertiesServiceDynamicReloadTest {

	@Inject
	private PropertiesServiceImpl propertiesService;

	@Test
	public void testDynamicReload() throws Exception {
		Boolean fstDynamicReload = propertiesService
				.getBoolean("dynamic.reload");

		Hashtable<Resource, Long> resources = propertiesService.getResources();
		Enumeration<Resource> en = resources.keys();

		Resource dynamicReloadResource = null;
		while (en.hasMoreElements()) {
			Resource resource = en.nextElement();
			if (resource.getFilename().equals(
					"dynamic-reload-resource.properties")) {
				dynamicReloadResource = resource;
			}
		}

		Properties props = new Properties();
		props.put("dynamic.reload", fstDynamicReload ? "false" : "true");
		FileOutputStream fos = new FileOutputStream(dynamicReloadResource
				.getFile());
		props.store(fos, "");
		fos.flush();
		fos.close();

		Thread.sleep(3000);
		// After reloading properties files, the all existing properties are
		// deleted.

		Boolean scdDynamicReload = propertiesService
				.getBoolean("dynamic.reload");
		assertNotSame("fail to reload dynamically", fstDynamicReload,
				scdDynamicReload);
		assertEquals(propertiesService.getString("AAAA", ""), "");
	}
}
