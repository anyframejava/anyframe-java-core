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
package org.anyframe.plugin.cache.moviefinder.service;

import java.util.List;

import org.anyframe.plugin.cache.domain.Genre;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This GenreService class is an Interface class to provide genre CRUD
 * functionality.
 * 
 * @author Sooyeon Park
 */
public interface GenreService {

	final Logger LOGGER = LoggerFactory.getLogger(GenreService.class);

	void create(Genre genre) throws Exception;

	Genre get(String genreId) throws Exception;

	void update(Genre genre) throws Exception;

	Genre updateAndGet(Genre genre) throws Exception;
	
	void remove(String genreId) throws Exception;

	List<Genre> getList() throws Exception;
}
