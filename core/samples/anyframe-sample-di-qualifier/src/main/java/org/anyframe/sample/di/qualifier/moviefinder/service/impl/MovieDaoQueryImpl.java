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
package org.anyframe.sample.di.qualifier.moviefinder.service.impl;

import javax.inject.Named;

import org.anyframe.sample.di.qualifier.DaoQualifier;
import org.anyframe.sample.di.qualifier.moviefinder.domain.Movie;

/**
 * This MovieDaoQueryImpl class is a DAO implementation class for queryservice
 * dao framework to provide movie service functionality to get movie
 * information.
 * 
 * @author Sooyeon Park
 */
@Named
@DaoQualifier
public class MovieDaoQueryImpl implements MovieDao {

	public Movie get(String movieId) {
		System.out.println("call get() in MovieDaoQueryImpl");
		Movie movie = new Movie();
		movie.setTitle("Alice in Wonderland");
		movie.setDirector("Tim Burton");

		return movie;
	}

}
