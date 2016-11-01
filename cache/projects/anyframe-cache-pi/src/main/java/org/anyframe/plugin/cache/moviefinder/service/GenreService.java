/*
 * Copyright 2008-2011 the original author or authors.
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

import org.anyframe.plugin.cache.domain.Genre;


/**
 * This GenreService class is an Interface class to provide genre list
 * functionality.
 * 
 * @author Sujeong Lee
 */
public interface GenreService {
	void create(Genre genre) throws Exception;
	void update(Genre genre) throws Exception;
	void remove(String genreId) throws Exception;
}
