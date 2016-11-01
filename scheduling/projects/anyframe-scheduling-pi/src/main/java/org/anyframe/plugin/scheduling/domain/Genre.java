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
package org.anyframe.plugin.scheduling.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * This Genre class is a Value Object class for Genre domain.
 * 
 * @author hyunjung jeong
 */
public class Genre implements Serializable {

	private static final long serialVersionUID = 1L;
	private String genreId;
	private String name;
	private Set<Movie> movies = new HashSet<Movie>(0);

	public String getGenreId() {
		return genreId;
	}

	public void setGenreId(String genreId) {
		this.genreId = genreId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Movie> getMovies() {
		return this.movies;
	}

	public void setMovies(Set<Movie> movies) {
		this.movies = movies;
	}

	@Override
	public String toString() {
		return "[genreId=" + genreId + ", name=" + name + "]";
	}
}
