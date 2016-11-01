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
package org.anyframe.oscache.impl;

import static org.junit.Assert.assertEquals;

import java.io.File;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.oscache.OSCacheService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions which Anyframe's CacheService supports, there are some
 * test scenarios in this TestCase. If This cache persistence will only be used
 * in overflow mode, that is, when the memory cache capacity has been reached.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/spring/context-memory-overflowtodisk-oscache.xml" })
public class OSCacheServiceWithMemoryOverflowToDiskTest {

	@Inject
	@Named("cacheService")
	private OSCacheService cacheService;

	/**
	 * initialize test environment
	 */
	@Before
	public void onSetUp() {
		File file = new File("./temp/cache/application");
		File[] files = file.listFiles();

		if (files != null)
			for (int i = 0; i < files.length; i++)
				files[i].delete();
	}

	/**
	 * [Flow #-1] Positive Case : Using CacheService, put some contents and get
	 * a value by key and check number of files.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testCacheWithMemoryOverflowToDisk() throws Exception {
		// 1. Put some content in cache.
		for (int i = 0; i < 15; i++)
			cacheService.putInCache("KEY-" + i, "VALUE-" + i);

		// KEY-5 ~ KEY-14 stored in memory
		// KEY-0 ~ KEY-4 stored in disk

		// 2. Check number of files.
		File cachefiles = new File("./temp/cache/application");
		assertEquals(5, cachefiles.listFiles().length);

		// 3. Get some items from Cache.
		assertEquals("VALUE-5", cacheService.getFromCache("KEY-5"));
		assertEquals("VALUE-14", cacheService.getFromCache("KEY-14"));
	}
}
