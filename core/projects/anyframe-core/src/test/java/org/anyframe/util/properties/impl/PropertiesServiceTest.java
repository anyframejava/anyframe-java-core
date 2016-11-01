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
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Vector;

import javax.inject.Inject;

import org.anyframe.util.properties.PropertiesService;
import org.junit.Test;
import org.junit.runner.RunWith;
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
public class PropertiesServiceTest {

	@Inject
	protected PropertiesService propertiesService;

	/**
	 * [Flow #-1] Positive Case : try to get some properties using Properties
	 * Service.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void testPropertiesService() throws Exception {
		// 1. get tokens_on_multiple_lines which defined properties file using
		// Properties Service.
		assertNotNull(propertiesService.getString("tokens_on_multiple_lines"));
		// 2. get number.double which defined properties file using Properties
		// Service.
		assertEquals(new Double(1234), new Double(propertiesService
				.getDouble("number.double")));
		// 3. get number.float which defined properties file using Properties
		// Service.
		assertEquals(new Float(1234), new Float(propertiesService
				.getFloat("number.float")));
		// 4. get number.int which defined properties file using Properties
		// Service.
		assertEquals(new Integer(1234), new Integer(propertiesService
				.getInt("number.int")));
		// 5. get number.long which defined properties file using Properties
		// Service.
		assertEquals(new Long(1234), new Long(propertiesService
				.getLong("number.long")));
		// 6. get tokens_on_a_line which defined properties file using
		// Properties Service.
		assertEquals(2, propertiesService.getVector("tokens_on_a_line").size());

		// 7. get tokens_on_a_line which doesn't defined properties file using
		// Properties Service.
		assertEquals(0, propertiesService.getVector(
				"notexist_tokens_on_a_line", new Vector()).size());

		// 8. get AAAA defined as property element with default value.
		assertNotNull(propertiesService.getString("AAAA", ""));
		// 9. With default value, get number.double which defined properties
		// file using Properties Service.
		assertEquals(new Double(1234), new Double(propertiesService.getDouble(
				"number.double", 123.4)));
		// 10. With default value, get number.float which defined properties
		// file using Properties Service.
		assertEquals(new Float(1234), new Float(propertiesService.getFloat(
				"number.float", (float) 123.4)));
		// 11. With default value, get number.int which defined properties file
		// using Properties Service.
		assertEquals(new Integer(1234), new Integer(propertiesService.getInt(
				"number.int", 123)));
		// 12. With default value, get number.long which defined properties file
		// using Properties Service.
		assertEquals(new Long(1234), new Long(propertiesService.getLong(
				"number.long", 1234)));

		// 13. get the list of the keys contained in the configuration
		// repository.
		assertNotNull(propertiesService.getKeys());
		// 14. Get the list of the keys contained in the configuration
		// repository that match the specified prefix number.
		assertNotNull(propertiesService.getKeys("number"));

		// 15. get boolean which defined properties file using Properties
		// Service.
		assertTrue(propertiesService.getBoolean("boolean"));
		// 16. get boolean which doesn't defined properties file using
		// Properties Service.
		assertTrue(!propertiesService.getBoolean("notexistboolean", false));

		// 17. get String[] which defined properties file using Properties
		// Service.
		assertEquals(2,
				propertiesService.getStringArray("tokens_on_a_line").length);

		// 18. get special characters
		System.out.println(propertiesService.getString("special.test"));
		assertEquals("~!@#$%^&*()_+;{}|", propertiesService
				.getString("special.test"));

		System.out.println(propertiesService.getString("special.test.sign"));
	}

	@Test
	public void testKoreanLangFromPropertiesFile() throws Exception {
		assertEquals("안녕하세요.", propertiesService.getString("greet.message"));

	}

	/**
	 * [Flow #-2] Positive Case : after refresh, try to get some chagned
	 * properties using Properties Service.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testRefreshPropertiesFiles() throws Exception {

		// 1. get tokens_on_multiple_lines which defined properties file using
		// Properties Service.
		assertEquals("first token", propertiesService
				.getString("tokens_on_multiple_lines"));
		// 2. get number.double which defined properties file using Properties
		// Service.
		assertEquals(new Double(1234), new Double(propertiesService
				.getDouble("number.double")));

		// 3. refresh property resources
		propertiesService.refreshPropertyFiles();

		// 4. get tokens_on_multiple_lines which defined properties file using
		// Properties Service.
		assertEquals("first token", propertiesService
				.getString("tokens_on_multiple_lines"));
		// 5. get number.double which defined properties file using Properties
		// Service.
		assertEquals(new Double(1234), new Double(propertiesService
				.getDouble("number.double")));

	}
}
