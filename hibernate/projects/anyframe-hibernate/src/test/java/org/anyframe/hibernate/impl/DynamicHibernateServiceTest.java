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
package org.anyframe.hibernate.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.hibernate.sample.model.bidirection.Category;
import org.anyframe.hibernate.sample.model.bidirection.Country;
import org.anyframe.hibernate.sample.model.bidirection.Movie;
import org.anyframe.hibernate.sample.service.movie.MovieService;
import org.anyframe.util.DateUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/org/anyframe/hibernate/spring/context-*.xml" })
public class DynamicHibernateServiceTest {

	@Inject
	@Named("movieService")
	private MovieService movieService;

	@Before
	public void onSetUp() {
		initializeData();
	}

	/**
	 * [Flow #-1] Positive Case : Hibernate과 Velocity를 연계한
	 * DynamicHibernateService를 활용하여 입력한 검색 조건에 따라 실행할 HQL 구성이 달라질 수 있도록 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from MovieService
	 */
	@Test
	public void testDynamicHibernateService() {
		// Dynamic HQL
		List<Movie> movieList = movieService.findMovieList(0, "Hojun");
		assertEquals("Fail to execute dynamic HQL.", 1, movieList.size());

		movieList = movieService.findMovieList(1, "My");
		assertEquals("Fail to execute dynamic HQL.", 2, movieList.size());

		// Dynamic SQL with return
		List<Movie> movieListWithSQL = movieService.findMovieListWithSQL(0,
				"Hojun");
		assertEquals("Fail to execute dynamic SQL.", 1, movieListWithSQL.size());

		Movie movie = movieListWithSQL.get(0);
		assertEquals("Fail to compare a movie title", "My Little Bride", movie
				.getTitle());

		movieListWithSQL = movieService.findMovieListWithSQL(1, "My");
		assertEquals("Fail to execute dynamic SQL.", 2, movieListWithSQL.size());

		// Dynamic SQL with return-join
		List<Object[]> movieListByCountry = movieService
				.findMovieListByCountry("COUNTRY-0001");

		assertEquals("Fail to get movie list.", 2, movieListByCountry.size());
		for (int i = 0; i < movieListByCountry.size(); i++) {
			Object[] obj = movieListByCountry.get(i);
			Movie movieObj = (Movie) obj[0];
			Country countryObj = (Country) obj[1];

			assertTrue("Fail to compare a movie title.", movieObj.getTitle()
					.equals("My Little Bride")
					|| movieObj.getTitle().equals("My Sassy Girl"));
			assertEquals("Fail to compare a movie title.", "Korea", countryObj
					.getCountryName());
		}

		// Dynamic SQL without return mapping
		List<Object[]> movieListWithoutReturn = movieService
				.findMovieListWithoutReturn(0, "Hojun");
		assertEquals("Fail to execute dynamic SQL.", 1, movieListWithoutReturn
				.size());

		Object[] movieObjs = movieListWithoutReturn.get(0);
		assertEquals("Fail to compare a movie id", "MV-00002", movieObjs[0]);
		assertEquals("Fail to compare a country id of movie", "COUNTRY-0001",
				movieObjs[1]);
		assertEquals("Fail to compare a movie title", "My Little Bride",
				movieObjs[2]);
		assertEquals("Fail to compare a movie director", "Hojun Kim",
				movieObjs[3]);

		// Dynamic SQL with return-scalar
		List<Object[]> movieListWithScalar = movieService
				.findMovieListWithScalar(0, "Hojun");
		assertEquals("Fail to execute dynamic SQL.", 1, movieListWithScalar
				.size());

		Object[] movieScalar = movieListWithScalar.get(0);
		assertEquals("Fail to compare a movie director", "Hojun Kim",
				movieScalar[0]);
		assertEquals("Fail to compare a movie title", "My Little Bride",
				movieScalar[1]);
		assertEquals("Fail to compare a country code of movie", "COUNTRY-0001",
				movieScalar[2]);

	}

	private void initializeData() {
		Category category1 = new Category();
		category1.setCategoryId("CTGR-0001");
		category1.setCategoryName("Romantic");
		category1.setCategoryDesc("Romantic genre");
		movieService.createCategory(category1);

		Category category2 = new Category();
		category2.setCategoryId("CTGR-0002");
		category2.setCategoryName("Comedy");
		category2.setCategoryDesc("Comedy genre");
		movieService.createCategory(category2);

		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("Jaeyong Gwak");
		movie1
				.setReleaseDate(DateUtil.stringToDate("2001-07-27",
						"yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");
		movie1.setRank(new Integer(1));

		Set<Category> categories = new HashSet<Category>();
		categories.add(category1);
		categories.add(category2);
		movie1.setCategories(categories);

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2
				.setReleaseDate(DateUtil.stringToDate("2004-04-02",
						"yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");
		movie1.setRank(new Integer(2));

		categories = new HashSet<Category>();
		categories.add(category1);
		categories.add(category2);
		movie2.setCategories(categories);

		Country country1 = new Country();
		String countryCode = "COUNTRY-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Set<Movie> movies = new HashSet<Movie>();
		movie1.setCountry(country1);
		movies.add(movie1);
		movie2.setCountry(country1);
		movies.add(movie2);
		country1.setMovies(movies);

		movieService.createCountry(country1);
	}
}
