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
package org.anyframe.plugin.jasypt.moviefinder.service.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jasypt.domain.Genre;
import org.anyframe.plugin.jasypt.domain.Movie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Joonbo Jang
 * @author Sooyeon Park
 */
@Repository("jasyptMovieDao")
@Order(value = 2)
public class MovieDao extends JdbcDaoSupport implements GenericDao<Movie> {

	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	//Velocity-Support-contextProperties-END

	@Inject
	public void setJdbcDaoDataSource(DataSource dataSource) {
		super.setDataSource(dataSource);
	}

	public void create(Movie movie) {
		// set movie id
		movie.setMovieId("MV-" + System.currentTimeMillis());
		String sql = "INSERT INTO MOVIE (movie_id, title, director, genre_id, actors, runtime, release_date, ticket_price, now_playing) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

		super.getJdbcTemplate().update(
				sql,
				new Object[] { movie.getMovieId(), movie.getTitle(), movie.getDirector(), movie.getGenre().getGenreId(), movie.getActors(), movie.getRuntime(),
						movie.getReleaseDate(), movie.getTicketPrice(), movie.getNowPlaying() });
	}

	public void remove(String movieId) {
		String sql = "DELETE FROM MOVIE WHERE movie_id = ?";
		super.getJdbcTemplate().update(sql, new Object[] { movieId });
	}

	public void update(Movie movie) {
		String sql = "UPDATE MOVIE SET title = ?, director = ?, genre_id = ?, actors = ?, runtime = ?, release_date = ?, ticket_price = ?, now_playing = ? WHERE movie_id = ?";
		super.getJdbcTemplate().update(
				sql,
				new Object[] { movie.getTitle(), movie.getDirector(), movie.getGenre().getGenreId(), movie.getActors(), movie.getRuntime(),
						movie.getReleaseDate(), movie.getTicketPrice(), movie.getNowPlaying(), movie.getMovieId() });

	}

	public Movie get(String movieId) {
		String sql = "SELECT movie_id, title, director, genre_id, release_date, ticket_price, actors, runtime, now_playing FROM MOVIE WHERE movie_id = ?";
		return super.getJdbcTemplate().queryForObject(sql, new BeanPropertyRowMapper<Movie>(Movie.class) {
			public Movie mapRow(ResultSet rs, int i) throws SQLException {
				return new Movie(rs.getString(1), rs.getString(2), rs.getString(3), new Genre(rs.getString(4), ""), rs.getDate(5), new Float(rs.getFloat(6)),
						rs.getString(7), new Long(rs.getLong(8)), rs.getString(9));
			}
		}, new Object[] { movieId });
	}

	/**
	 * [WARNING] Don't use below sample codes in real world because of
	 * performance issue. This is a simple example about how to use spring jdbc
	 * pagination.
	 */
	public Page getPagingList(Movie movie, int pageIndex) {
		String fromSql = " FROM MOVIE movie, GENRE genre";
		String CONCAT = "'%" + movie.getTitle() + "%'";
		String whereSql = " WHERE movie.genre_id = genre.genre_id AND title like " + CONCAT + " AND movie.now_playing = ?";

		Page result = fetchPage(super.getJdbcTemplate(), "SELECT count(*)" + fromSql + whereSql,
				"SELECT movie.movie_id, movie.title, movie.director, genre.genre_id, genre.name, "
						+ "movie.release_date, movie.ticket_price, movie.actors, movie.runtime, movie.now_playing " + fromSql + whereSql,
				new Object[] { movie.getNowPlaying() }, pageIndex, new ParameterizedRowMapper<Movie>() {
					public Movie mapRow(ResultSet rs, int i) throws SQLException {
						return new Movie(rs.getString(1), rs.getString(2), rs.getString(3), new Genre(rs.getString(4), rs.getString(5)), rs.getDate(6),
								new Float(rs.getFloat(7)), rs.getString(8), new Long(rs.getLong(9)), rs.getString(10));
					}
				});

		return result;
	}

	@SuppressWarnings("unchecked")
	private Page fetchPage(final JdbcTemplate jt, final String sqlCountRows, final String sqlFetchRows, final Object args[], final int pageNo,
			final ParameterizedRowMapper<Movie> rowMapper) {

		// determine how many rows are available
		final int rowCount = jt.queryForObject(sqlCountRows, args, Integer.class);

		// create the page object
		final Page page = new Page(new ArrayList<Movie>(), pageNo, rowCount, pageUnit, pageSize);

		// fetch a single page of results
		final int startRow = (pageNo - 1) * pageSize;
		jt.query(sqlFetchRows, args, new ResultSetExtractor() {
			public Object extractData(ResultSet rs) throws SQLException, DataAccessException {
				final List<Movie> pageItems = (List<Movie>) page.getList();
				int currentRow = 0;
				while (rs.next() && currentRow < startRow + pageSize) {
					if (currentRow >= startRow) {
						pageItems.add(rowMapper.mapRow(rs, currentRow));
					}
					currentRow++;
				}
				return page;
			}
		});
		return page;
	}

	@Override
	public List<Movie> getList() {
		// TODO Auto-generated method stub
		return null;
	}

	public String getDaoName() {
		return getClass().getName();
	}

}
