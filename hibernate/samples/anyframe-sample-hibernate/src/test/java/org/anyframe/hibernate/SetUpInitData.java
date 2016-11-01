package org.anyframe.hibernate;

import java.util.HashSet;
import java.util.Set;

import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.anyframe.util.DateUtil;
import org.hibernate.Session;

public class SetUpInitData {

	/**
	 * Initial data is set for searching data.  <br>
	 * Category : Movie = Category : Movie = m:n is defined as two-way relation and Category class serves as Master. 
	 * Country : Movie = Category : Movie = m:n is defined as one-way relation and Movie class serves as Master. 
	 * <ul>
	 * <li>Category : [CTGR-0001, Romantic, Romantic genre], [CTGR-0002,
	 * Comedy, Comedy genre], [CTGR-0003,Horror,Thriller genre]</li>
	 * <li>Country : [COUNTRY-0001, KR, Korea], [COUNTRY-0002, JP, Japan],
	 * [COUNTRY-0003, US, U.S.A]</li>
	 * <li>Movie : [MV-00001, My Sassy Girl, Jaeyong Gwak, 2001-07-27],
	 * [MV-00002, My Little Bride, Hojun Kim, 2004-04-02], [MV-00003, Ring2,
	 * Hideo Nakata, 2005-06-03]</li>
	 * </ul>
	 * 
	 * @throws Exception
	 */
	public static void initializeData(Session session) throws Exception {
		// 1. insert a new category information
		Category category1 = new Category();
		category1.setCategoryId("CTR-0001");
		category1.setCategoryName("Romantic");
		category1.setCategoryDesc("Romantic genre");
		session.save(category1);

		Category category2 = new Category();
		category2.setCategoryId("CTR-0002");
		category2.setCategoryName("Comedy");
		category2.setCategoryDesc("Comedy genre");
		session.save(category2);

		Category category3 = new Category();
		category3.setCategoryId("CTR-0003");
		category3.setCategoryName("Horror");
		category3.setCategoryDesc("Thriller genre");
		session.save(category3);

		Category category4 = new Category();
		category4.setCategoryId("CTR-0004");
		category4.setCategoryName("SF");
		category4.setCategoryDesc("Fantasy genre");
		session.save(category4);

		// 2. insert a country information with movies
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("Jaeyong Gwak");
		movie1.setReleaseDate(DateUtil.stringToDate("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");

		Set<Category> categories = new HashSet<Category>();
		categories.add(category1);
		categories.add(category2);
		movie1.setCategories(categories);

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.stringToDate("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");

		categories = new HashSet<Category>();
		categories.add(category1);
		categories.add(category2);
		movie2.setCategories(categories);

		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Set<Movie> movies = new HashSet<Movie>();
		movie1.setCountry(country1);
		movies.add(movie1);
		movie2.setCountry(country1);
		movies.add(movie2);
		country1.setMovies(movies);

		session.save(country1);

		Movie movie3 = new Movie();
		movie3.setMovieId("MV-00003");
		movie3.setDirector("Hideo Nakata");
		movie3.setReleaseDate(DateUtil.stringToDate("2005-06-03", "yyyy-MM-dd"));
		movie3.setTitle("Ring 2");

		categories = new HashSet<Category>();
		categories.add(category3);
		movie3.setCategories(categories);

		Country country2 = new Country();
		countryCode = "CTR-0002";
		country2.setCountryCode(countryCode);
		country2.setCountryId("JP");
		country2.setCountryName("Japan");

		movies = new HashSet<Movie>();
		movie3.setCountry(country2);
		movies.add(movie3);
		country2.setMovies(movies);

		session.save(country2);

		Country country3 = new Country();
		countryCode = "CTR-0003";
		country3.setCountryCode(countryCode);
		country3.setCountryId("US");
		country3.setCountryName("U.S.A");

		session.save(country3);
	}

}
