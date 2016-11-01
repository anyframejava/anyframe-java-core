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



import com.opensymphony.oscache.base.Cache;
import com.opensymphony.oscache.base.NeedsRefreshException;

/**
 * The public API provides methods to manage objects in the cache. <br>
 * This Service caches objects to share. It provides some profits as follows,
 * especially when it handles a object that is changed rarely, used frequently
 * and needs much cost to create. It reduces overheads because it doesn't need
 * to fetch data from DB everytime. It enables to use memory more efficiently
 * through avoiding creating the object everytime.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class CacheServiceImpl implements CacheService {
	private Cache cache;

	/**
	 * getter
	 * 
	 * @return Cache
	 */
	public Cache getCache() {
		return cache;
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
	 * Flush the entire cache at the given date.
	 * 
	 * @param date
	 *            The time to flush
	 */
	public void flushAll(Date date) {
		cache.flushAll(date);
	}

	/**
	 * Flushes a single cache entry.
	 * 
	 * @param key
	 *            The key entered by the user.
	 */
	public void flushEntry(String key) {
		cache.flushEntry(key);
	}

	/**
	 * Flushes all items that belong to the specified group.
	 * 
	 * @param group
	 *            The name of the group to flush
	 */
	public void flushGroup(String group) {
		cache.flushGroup(group);
	}

	/**
	 * Get an object from the cache
	 * 
	 * @param key
	 *            The key entered by the user.
	 * @return The object from cache
	 * @throws NeedsRefreshException
	 *             when no cache entry could be found with the supplied key, or
	 *             when an entry was found but is considered out of date. If the
	 *             cache entry is a new entry that is currently being
	 *             constructed this method will block until the new entry
	 *             becomes available. Similarly, it will block if a stale entry
	 *             is currently being rebuilt by another thread and cache
	 *             blocking is enabled (<code>cache.blocking=true</code>).
	 */
	public Object getFromCache(String key) throws NeedsRefreshException {
		return cache.getFromCache(key);
	}

	/**
	 * Put an object in a cache
	 * 
	 * @param key
	 *            The key entered by the user
	 * @param content
	 *            The object to store
	 */
	public void putInCache(String key, Object content) {
		cache.putInCache(key, content);
	}

	/**
	 * Puts an object in a cache
	 * 
	 * @param key
	 *            The unique key for this cached object
	 * @param content
	 *            The object to store
	 * @param groups
	 *            The groups that this object belongs to
	 */
	public void putInCache(String key, Object content, String[] groups) {
		cache.putInCache(key, content, groups);
	}

	/**
	 * Remove an object from the cache
	 * 
	 * @param key
	 *            The key entered by the user.
	 */
	public void removeEntry(String key) {
		cache.removeEntry(key);
	}

	/**
	 * Cancels any pending update for this cache entry. This should
	 * <em>only</em> be called by the thread that is responsible for
	 * performing the update ie the thread that received the original
	 * {@link NeedsRefreshException}.<p/> If a cache entry is not updated (via
	 * {@link #putInCache} and this method is not called to let OSCache know the
	 * update will not be forthcoming, subsequent requests for this cache entry
	 * will either block indefinitely (if this is a new cache entry or
	 * cache.blocking=true), or forever get served stale content. Note however
	 * that there is no harm in cancelling an update on a key that either does
	 * not exist or is not currently being updated.
	 * 
	 * @param key
	 *            The key for the cache entry in question.
	 */
	public void cancelUpdate(String key) {
		cache.cancelUpdate(key);
	}
}
