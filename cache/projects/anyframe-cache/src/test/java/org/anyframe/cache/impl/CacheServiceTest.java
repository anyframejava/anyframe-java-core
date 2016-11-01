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
package org.anyframe.cache.impl;

import java.util.Date;

import org.anyframe.cache.CacheService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;



import com.opensymphony.oscache.base.Cache;
import com.opensymphony.oscache.base.NeedsRefreshException;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

/**
 * For testing functions which Anyframe's CacheService supports, there are some
 * test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class CacheServiceTest extends
		AbstractDependencyInjectionSpringContextTests {
	private CacheService cacheService;

	private Cache cache;

	private GeneralCacheAdministrator cacheAdmin;

	/**
	 * setter
	 * 
	 * @param cacheAdmin
	 *            CacheAdmin to be set
	 */
	public void setCacheAdmin(GeneralCacheAdministrator cacheAdmin) {
		this.cacheAdmin = cacheAdmin;
	}

	/**
	 * setter
	 * 
	 * @param cacheService
	 *            CacheService to be set
	 */
	public void setCacheService(CacheService cacheService) {
		this.cacheService = cacheService;
	}

	/**
	 * setter
	 * 
	 * @param cache
	 *            Cache to be set
	 */
	public void setCache(Cache cache) {
		this.cache = cache;
	}

	/**
	 * overrided
	 * 
	 * @return String[]
	 */
	protected String[] getConfigLocations() {
		return new String[] { "spring/context-cache.xml" };
	}

	/**
	 * [Flow #-1] Positive Case : Using CacheService, put some values and plush
	 * those by group.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testFlushGroup() throws Exception {
		String group1 = "group1";
		String group2 = "group2";
		String group3 = "group3";

		// 1. Add some items to various group combinations
		// No groups
		cacheService.putInCache("1", "item 1");
		// Just group 1
		cacheService.putInCache("2", "item 2", new String[] { group1 });
		// Just group 2
		cacheService.putInCache("3", "item 3", new String[] { group2 });
		// groups 1 & 2
		cacheService.putInCache("4", "item 4", new String[] { group1, group2 });
		// groups 1,2 & 3
		cacheService.putInCache("5", "item 5", new String[] { group1, group2,
				group3 });

		// 2. Flush Group3, This should flush item 5 only
		cacheService.flushGroup(group3);
		assertNotNull(checkObj("5", true));
		assertEquals("item 4", checkObj("4", false));

		// 3. Flush Group2, This should flush items 3 and 4
		cacheService.flushGroup(group2);
		assertEquals("item 1", checkObj("1", false));
		assertEquals("item 2", checkObj("2", false));
		assertNotNull(checkObj("3", true));
		assertNotNull(checkObj("4", true));

		// 3. Flush Group1, Flushes item 2
		cacheService.flushGroup(group1);
		assertEquals("item 1", checkObj("1", false));
		assertNotNull(checkObj("2", true));

		// 4. Test if regrouping a cache entry works
		cacheService.putInCache("A", "ABC", new String[] { "A" });
		cacheService.putInCache("A", "DEF", new String[] { "A", "B" });
		cacheService.putInCache("B", "DEF", new String[] { "B" });
		cacheService.flushGroup("B");
		assertEquals("DEF", checkObj("A", true));
	}

	/**
	 * [Flow #-2] Positive Case : Using CacheService, put one value and get a
	 * value by key.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testGetFromCache() throws Exception {
		// 1. Put a content in cache.
		cacheService.putInCache("KEY-1", "VALUE-1");
		// 2. Get that item from Cache.
		Object value = cacheService.getFromCache("KEY-1");
		assertEquals("VALUE-1", value.toString());
	}

	/**
	 * [Flow #-3] Positive, Negative Case : Using CacheService, put one value
	 * and plush that after 5 seconds.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testFlushAllDate() throws Exception {
		// 1. Put a content in cache.
		cacheService.putInCache("KEY1", "VALUE1");

		// 2. Get that item from Cache.
		try {
			assertNotNull(cacheService.getFromCache("KEY1"));
		} catch (NeedsRefreshException e1) {
			fail("Previous cache KEY1 doesn't exsits.");
		}

		// 3. flush in 5 sec.
		cacheService.flushAll(new Date(System.currentTimeMillis() + 5000));

		// 4. Get that item from Cache.
		try {
			cacheService.getFromCache("KEY1");
		} catch (NeedsRefreshException e) {
			fail("NRE is thrown, but key will expire in 5s."); // it fails here
		}

		// 5. Wait for 5 seconds.
		Thread.sleep(10000);

		// 6. Get that item from Cache again.
		try {
			cacheService.getFromCache("KEY1");
			fail("fail to flush in 5s.");
		} catch (Exception e) {
			cacheService.cancelUpdate("KEY1");
			assertTrue(e instanceof NeedsRefreshException);
		}
	}

	/**
	 * [Flow #-4] Positive Case : Using CacheService, put one value and plush a
	 * specific value.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testFlushEntry() throws Exception {
		// 1. Put a content in cache.
		cacheService.putInCache("KEY1", "VALUE1");
		// 2. flush that entry.
		cacheService.flushEntry("KEY1");
		assertEquals("VALUE1", checkObj("KEY1", true));
	}

	/**
	 * [Flow #-5] Positive, Negative Case : Using CacheService, put one value
	 * and remove some specific value.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testRemoveEntry() throws Exception {
		String key1 = "KEY-1";
		String key2 = "KEY-2";
		// 1. Put some content in cache.
		cacheService.putInCache(key1, "VALUE-1");
		cacheService.putInCache(key2, "VALUE-2");
		// 2. remove that entry.
		cacheService.removeEntry(key1);

		// 4. Get that item from Cache.
		try {
			cacheService.getFromCache(key1);
			fail("fail to remove entry");
		} catch (Exception e) {
			cacheService.cancelUpdate(key1);
			assertTrue(e instanceof NeedsRefreshException);
		}
	}

	/**
	 * Utility method that tries to get an item from the cache and verify if all
	 * goes as expected
	 * <p>
	 * 
	 * @param key
	 *            The item key
	 * @param exceptionExpected
	 *            Specify if we expect a NeedsRefreshException
	 * @return Object
	 * @throws Exception
	 *             fail to test
	 */
	private Object checkObj(String key, boolean exceptionExpected)
			throws Exception {
		// Cache content
		Object content = null;

		try {
			// try to find an object
			content = cacheService.getFromCache(key);

			if (exceptionExpected) {
				fail("Expected NeedsRefreshException!");
			}
		} catch (NeedsRefreshException nre) {
			cacheService.cancelUpdate(key);
			if (!exceptionExpected) {
				fail("Did not expected NeedsRefreshException!");
			}

			// Return the cache content from the exception
			content = nre.getCacheContent();
		}

		return content;
	}

	/**
	 * [Flow #-6] Positive, Negative Case : Through Cache which OSCache
	 * supports, put some values into original cache and remove those.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testUseOSCache() throws Exception {
		// 1. put some values into original Cache which OSCache supports.
		String key1 = "KEY-1";
		String key2 = "KEY-2";
		cache.putInCache(key1, "VALUE-1");
		cache.putInCache(key2, "VALUE-2");
		// 2. remove a cached value from Cache.
		cache.removeEntry(key1);
	}

	/**
	 * [Flow #-7] Positive, Negative Case : Through CacheAdministrator which
	 * OSCache supports, put some values into original cache and remove those.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testUseGeneralCachAdmin() throws Exception {
		// 1. get an original Cache from CacheAdministrator
		Cache cache = cacheAdmin.getCache();
		assertNotNull(cache);

		// 2. put some values into that Cache.
		String key1 = "KEY-1";
		String key2 = "KEY-2";
		cache.putInCache(key1, "VALUE-1");
		cache.putInCache(key2, "VALUE-2");
		// 3. remove a cached value from that Cache.
		cache.removeEntry(key1);
	}
}
