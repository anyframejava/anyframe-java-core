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
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.oscache.OSCacheService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.opensymphony.oscache.base.NeedsRefreshException;

/**
 * For testing functions which Anyframe's CacheService supports, there are some
 * test scenarios in this TestCase. This cache should cache objects in memory.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/spring/context-memory-oscache.xml" })
public class OSCacheServiceWithMemoryTest {

	@Inject
	@Named("cacheService")
	private OSCacheService cacheService;

	/**
	 * [Flow #-1] Positive Case : Using CacheService, put some contents and get
	 * a value by key.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testCacheWithMemory() throws Exception {
		// 1. Put some content in cache.
		for (int i = 0; i < 11; i++)
			cacheService.putInCache("KEY-" + i, "VALUE-" + i);

		// 2. Get one item from Cache.
		assertEquals("VALUE-10", cacheService.getFromCache("KEY-10"));

		// 3. Get one item from Cache which doesn't exist in current cache.
		// because maximum size of this cache is 10.
		try {
			cacheService.getFromCache("KEY-0");
			fail("fail to get a content from cache.");
		} catch (Exception e) {
			assertTrue(e instanceof NeedsRefreshException);
		}
	}
}
