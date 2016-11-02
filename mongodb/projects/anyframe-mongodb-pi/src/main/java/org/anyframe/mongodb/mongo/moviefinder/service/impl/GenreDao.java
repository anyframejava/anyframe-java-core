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
package org.anyframe.mongodb.mongo.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;

import org.anyframe.mongodb.mongo.domain.Genre;

/**
 * This GenreDao class is a DAO class to provide genre list functionality.
 * 
 * @author Joonbo Jang
 * @author Sooyeon Park
 */
@Repository("mongoGenreDao")
public class GenreDao {

	@Value("#{contextProperties['mongo.genre'] ?: Genre}")
	String genreCollection;

	@Inject
	@Named("mongoTemplate")
	private MongoOperations mongoOperations;

	public List<Genre> getList() {
		return mongoOperations.findAll(Genre.class, genreCollection);
	}

	// for example. init data
	public void init(){
		Genre genre = new Genre("GR-01", "Action");
		mongoOperations.insert(genre, genreCollection);
		
		genre = new Genre("GR-02", "Adventure");
		mongoOperations.insert(genre, genreCollection);
		
		genre = new Genre("GR-03", "Animation");
		mongoOperations.insert(genre, genreCollection);
		
		genre = new Genre("GR-04", "Comedy");
		mongoOperations.insert(genre, genreCollection);
		
		genre = new Genre("GR-05", "Crime");
		mongoOperations.insert(genre, genreCollection);
		
		genre = new Genre("GR-06", "Drama");
		mongoOperations.insert(genre, genreCollection);
		
		genre = new Genre("GR-07", "Fantasy");
		mongoOperations.insert(genre, genreCollection);
		
		genre = new Genre("GR-08", "Romance");
		mongoOperations.insert(genre, genreCollection);
		
		genre = new Genre("GR-09", "Sci-Fi");
		mongoOperations.insert(genre, genreCollection);
		
		genre = new Genre("GR-10", "Thriller");
		mongoOperations.insert(genre, genreCollection);
	}
}
