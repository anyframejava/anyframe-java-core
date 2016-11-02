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

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Update.update;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.hsqldb.lib.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import org.anyframe.mongodb.mongo.domain.Genre;
import org.anyframe.mongodb.mongo.domain.Movie;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Joonbo Jang
 * @author Sooyeon Park
 */
@Repository("mongoMovieDao")
public class MovieDao {

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	@Value("#{contextProperties['mongo.movie'] ?: Movie}")
	String movieCollection;
	
	@Value("#{contextProperties['mongo.genre'] ?: Genre}")
	String genreCollection;

	@Inject
	@Named("mongoTemplate")
	private MongoOperations mongoOperations;

	public void create(Movie movie) {
		// set movie id
		movie.setMovieId("MV-" + System.currentTimeMillis());
		mongoOperations.insert(movie, movieCollection);
	}

	public void remove(String movieId) {
		mongoOperations.remove(query(where("movieId").is(movieId)), movieCollection);
	}

	// update method명 사용 불가
	public void save(Movie movie) {
		mongoOperations.updateFirst(query(where("movieId").is(movie.getMovieId())), update("title", movie.getTitle()), movieCollection);
		mongoOperations.updateFirst(query(where("movieId").is(movie.getMovieId())), update("director", movie.getDirector()), movieCollection);
		mongoOperations.updateFirst(query(where("movieId").is(movie.getMovieId())), update("genreId", movie.getGenre().getGenreId()), movieCollection);
		mongoOperations.updateFirst(query(where("movieId").is(movie.getMovieId())), update("actors", movie.getActors()), movieCollection);
		mongoOperations.updateFirst(query(where("movieId").is(movie.getMovieId())), update("runtime", movie.getRuntime()), movieCollection);
		mongoOperations.updateFirst(query(where("movieId").is(movie.getMovieId())), update("releaseDate", movie.getReleaseDate()), movieCollection);
		mongoOperations.updateFirst(query(where("movieId").is(movie.getMovieId())), update("ticketPrice", movie.getTicketPrice()), movieCollection);
		mongoOperations.updateFirst(query(where("movieId").is(movie.getMovieId())), update("nowPlaying", movie.getNowPlaying()), movieCollection);
	}

	public Movie get(String movieId) {
		return mongoOperations.findOne(query(where("movieId").is(movieId)), Movie.class, movieCollection);
	}

	public Page getPagingList(Movie movie, int pageIndex) {
		Criteria criteria = new Criteria();
		Query query = new Query();

		criteria = where("nowPlaying").is(movie.getNowPlaying());
		if (!StringUtil.isEmpty(movie.getTitle())) {
			criteria = criteria.and("title").regex(movie.getTitle(), "i");
		}

		if (criteria != null) {
			query = query(criteria);
		}

		if (pageIndex > 0) { // paging
			query = query.skip((pageIndex - 1) * pageSize).limit(pageSize);
		}

		int totalCount = (int) mongoOperations.count(query, movieCollection);
		List<Movie> movies = mongoOperations.find(query, Movie.class, movieCollection);
		
		// TODO
		// MongoDB는 RDB의 형식이 아니므로 FK에 대한 데이터를 한번에 로딩할 수 없음
		// genreId만 가지고 있을 경우, Genre Collection의 재조회를 통해 GenreName을 담을 수 있도록 정의했으나, 실사례에서는 성능 문제가 발생
		// form.jsp의 save event에서 GenreId 이외의 다른 정보도 저장할 수 있도록 하는 방법이 있지 않을까?
		// 해당 문제의 해결 방법에 대한 고민이 필요할 듯
		// LogManager에서도 동일한 고민이 있었는지에 대한 확인이 필요 
		for(Movie inMovie : movies){
			inMovie.setGenre(mongoOperations.findOne(query(where("genreId").is(inMovie.getGenre().getGenreId())), Genre.class, genreCollection));
		}
		
		return new Page(movies, pageIndex, totalCount, pageUnit, pageSize);
	}
	
	public List<Movie> getList(){
		return mongoOperations.findAll(Movie.class, movieCollection);
	}

	// for example. init data
	public void init() throws ParseException{
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		Movie movie = new Movie("MV-00001", "Alice in Wonderland", "Tim Burton", new Genre("GR-02", "Adventure"), format.parse("2011-03-04"), (float)8000, "Johnny Depp", (long)110, "Y", "");
		mongoOperations.insert(movie, movieCollection);
		
		movie = new Movie("MV-00002", "Avatar", "James Cameron", new Genre("GR-09", "Sci-Fi"), format.parse("2011-02-16"), (float)7000, "Sigourney Weaver", (long)100, "Y", "");
		mongoOperations.insert(movie, movieCollection);
		
		movie = new Movie("MV-00003", "Green Zone", "Paul Greengrass", new Genre("GR-01", "Action"), format.parse("2011-03-25"), (float)7000, "Yigal Naor", (long)100, "Y", "");
		mongoOperations.insert(movie, movieCollection);
		
		movie = new Movie("MV-00004", "Remember Me", "Allen Coulter", new Genre("GR-06", "Drama"), format.parse("2011-03-12"), (float)8000, "Caitlyn Rund", (long)100, "Y", "");
		mongoOperations.insert(movie, movieCollection);
		
		movie = new Movie("MV-00005", "She is Out of My League", "Jim Field Smith", new Genre("GR-04", "Comedy"), format.parse("2011-03-12"), (float)7500, "Jay Baruchel", (long)100, "Y", "");
		mongoOperations.insert(movie, movieCollection);
		
		movie = new Movie("MV-00006", "Shutter Island", "Martin Scorsese", new Genre("GR-05", "Crime"), format.parse("2011-03-18"), (float)8000, "Leonardo DiCaprio", (long)100, "Y", "");
		mongoOperations.insert(movie, movieCollection);
	}

}
