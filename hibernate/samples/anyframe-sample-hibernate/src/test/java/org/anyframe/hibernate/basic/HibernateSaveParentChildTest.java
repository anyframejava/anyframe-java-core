package org.anyframe.hibernate.basic;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.anyframe.util.DateUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateSaveParentChildTest<br>
 * <br>
 * [Description] : Country: Movie has 1:n relation. According to various types
 * of order, registration is carried out. In this case, it is recommended to
 * check executed query statement at each order in DEBUG mode. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Targeting Country:Movie which has 1:n relation.
 * According to given order, Category and Movie information is registered and
 * then it is checked addition is correctively carried out.</li>
 * <li>#-2 Positive Case : Targeting Country:Movie which has 1:n relation.
 * According to given order, Category and Movie information is registered and
 * then it is checked addition is correctively carried out.</li>
 * <li>#-3 Positive Case : Targeting Country:Movie which has 1:n relation.
 * According to given order, Category and Movie information is registered and
 * then it is checked addition is correctively carried out.</li>
 * <li>#-4 Positive Case : Targeting Country:Movie which has 1:n relation.
 * According to order, Category and Movie information is registered and then it
 * is checked addition is correctively carried out.</li>
 * <li>#-5 Positive Case : Targeting Country:Movie which has 1:n relation.
 * According to order, Category and Movie information is registered and then it
 * is checked addition is correctively carried out.</li>
 * </ul>
 *(Given order of testcase refers to each method annotation.)
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateSaveParentChildTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : If this TestCase targets Country:Movie whose
	 * relation is 1:n, it proceeds as follows.
	 * <ol>
	 * <li>Session Started</li>
	 * <li>Country instance is created.</li>
	 * <li>Movie instance is created.</li>
	 * <li>Relation is formed between Movies and Country.</li>
	 * <li>Request is made to reflect instances in DB by calling for
	 * session.save()</li>
	 * <li>Session Finished</li>
	 * </ol>
	 * 
	 * According to order as above, addition is completed and then it is checked
	 * addition is correctively carried out.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryMovieAtOnce() throws Exception {
		// 1. start a new session and transaction, insert init data, end
		// transaction and session
		newSession();
		String countryCode = addCountryMovieAtOnce();
		closeSession();

		// 2. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Korea", country.getCountryName());
		Assert.assertEquals(2, country.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-2] Positive Case : If this TestCase targets Country:Movie whose
	 * relation is 1:n, it proceeds as follows.
	 * <ol>
	 * <li>Session Started</li>
	 * <li>After creating Country instance, request is made to reflect instances
	 * in DB by calling for session.save().</li>
	 * <li>Movie instances are created.</li>
	 * <li>Relation is formed between Country and Movies.</li>
	 * <li>Request is made to reflect instances in DB by calling for
	 * session.save().</li>
	 * <li>Session Finished</li>
	 * </ol>
	 * 
	 * According to order as above, addition is completed and then it is checked
	 * addition is correctively carried out.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryAndMovies() throws Exception {
		// 1. start a new session and transaction, insert init data, end
		// transaction and session
		newSession();
		String countryCode = addCountryAndMovies();
		closeSession();

		// 2. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Republic of Korea", country.getCountryName());
		Assert.assertEquals(2, country.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-3] Positive Case : If this TestCase targets Country:Movie whose
	 * relation is 1:n, it proceeds as follows.
	 * <ol>
	 * <li>Session Started</li>
	 * <li>After creating Country instance, request is made to reflect instances
	 * in DB by calling for session.save().</li>
	 * <li>Session Completed</li>
	 * <li>Session Started</li>
	 * <li>Movie instances are created.</li>
	 * <li>Relation is formed between Country and Movies.</li>
	 * <li>Request is made to reflect instances in DB by calling for
	 * session.save().</li>
	 * <li>Session Finished</li>
	 * </ol>
	 * According to order as above, addition is completed and then it is checked
	 * addition is correctively carried out.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCategory() throws Exception {
		// 1. start a new session and transaction, insert init data (country),
		// end transaction and session
		newSession();
		String countryCode = addCountry();
		closeSession();

		// 2. start a new session again, insert init data (movies), end
		// transaction and session
		newSession();
		addMovies(countryCode);
		closeSession();

		// 2. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Republic of Korea", country.getCountryName());
		Assert.assertEquals(2, country.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-4] Positive Case : If this TestCase targets Country:Movie whose
	 * relation is 1:n, it proceeds as follows.
	 * <ol>
	 * <li>Session Started</li>
	 * <li>After creating Country instance, request is made to reflect instances
	 * in DB by calling for session.save().</li>
	 * <li>Session Finished</li>
	 * <li>Session Started</li>
	 * <li>Movie instances are created.</li>
	 * <li>Relation is formed between new Movie and relevant Country.</li>
	 * <li>Request is made to reflect instances in DB by calling for
	 * session.save().</li>
	 * <li>Session Finished</li>
	 * <li>Session Started</li>
	 * <li>Relevant Country and related Movie is each modified.</li>
	 * <li>Latest Movie instance is removed from Movie Set which is related to
	 * relevant Country.</li>
	 * <li>Request is made to reflect instances in DB by calling for
	 * session.save().</li>
	 * <li>Session Finished</li>
	 * </ol>
	 * 
	 * After data addition is completed according to order as above, it is
	 * checked addition is properly completed.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testUpdateMovies() throws Exception {
		// 1. start a new session and transaction, insert init data (country),
		// end transaction and session
		newSession();
		String countryCode = addCountry();
		closeSession();

		// 2. start a new session again, insert init data (movies), end
		// transaction and session
		newSession();
		addMovies(countryCode);
		closeSession();

		// 3. start a new session again, update data (movies), end
		// transaction and session
		newSession();
		updateMovies(countryCode);
		closeSession();

		// 4. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Republic of Korea", country.getCountryName());
		// Movie data is not deleted.
		Assert.assertEquals(2, country.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-5] Positive Case : If this TestCase targets Country:Movie whose
	 * relation is 1:n, it proceeds as follows.
	 * <ol>
	 * <li>Session Started</li>
	 * <li>Session Started</li>
	 * <li>Movie instances are created.</li>
	 * <li>Relation is formed between new Movie and relevant Country.</li>
	 * <li>Request is made to reflect instances in DB by calling for
	 * session.save().</li>
	 * <li>Session Finished</li>
	 * <li>Session Started</li>
	 * <li>Relevant Country and related Movie is each modified.</li>
	 * <li>New Movie instance is created.</li>
	 * <li>Relation is formed between new Movie and relevant Country.</li>
	 * <li>Request is made to reflect instances in DB by calling for
	 * session.save().</li>
	 * <li>Session Finished</li>
	 * </ol>
	 * After completing data addition according to order as above, it is checked
	 * addition is correctively done.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testUpdateMovieAddMovieAtOnce() throws Exception {
		// 1. start a new session and transaction, insert init data, end
		// transaction and session
		newSession();
		String countryCode = addCountryAndMovies();
		closeSession();

		// 2. start a new session again, insert init data (movies), end
		// transaction and session
		newSession();
		updateMoveAddMovieAtOnce(countryCode);
		closeSession();

		// 2. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Republic of Korea", country.getCountryName());
		Assert.assertEquals(3, country.getMovies().size());
		closeSession();
	}

	private String addCountryMovieAtOnce() throws Exception {
		// 1. insert a country information with movies
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("Jaeyong Gwak");
		movie1.setReleaseDate(DateUtil.stringToDate("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.stringToDate("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");

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

		return countryCode;
	}

	private String addCountryAndMovies() throws Exception {
		// 1. insert a country information without movies
		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");
		session.save(country1);

		// 2. update country information
		country1.setCountryName("Republic of Korea");

		// 3. make movie list and related to country. insert a country
		// information
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("Jaeyong Gwak");
		movie1.setReleaseDate(DateUtil.stringToDate("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.stringToDate("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");

		Set<Movie> movies = new HashSet<Movie>();
		movie1.setCountry(country1);
		movies.add(movie1);
		movie2.setCountry(country1);
		movies.add(movie2);
		country1.setMovies(movies);
		session.save(country1);

		return countryCode;
	}

	private String addCountry() throws Exception {
		// 1. insert a country information without movies
		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");
		session.save(country1);

		return countryCode;
	}

	private void addMovies(String countryCode) throws Exception {
		Country country = (Country) session.get(Country.class, countryCode);
		country.setCountryName("Republic of Korea");

		// 1. make movie list and related to country. insert a country
		// information
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("Jae Gwak");
		movie1.setReleaseDate(DateUtil.stringToDate("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.stringToDate("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");

		Set<Movie> movies = new HashSet<Movie>();
		movie1.setCountry(country);
		movies.add(movie1);
		movie2.setCountry(country);
		movies.add(movie2);
		country.setMovies(movies);

		session.save(country);
	}

	/**
	 * After searching Movie list belonging to a specific Country, Movie
	 * information is modified. In this case, after removing latest searched
	 * Movie information from Movie Set, information is saved. In this case,
	 * even though latest data is removed from Movie Set, modified all Movie
	 * objects are subject to modification. However, if Movie Set is defined in
	 * the format of <composite-element>, user should remember that latest data
	 * removed from Movie Set is deleted from DB. In the case of excepting
	 * searched Movie information from modification, Session.evict(movie) is
	 * called for. By doing so, relevant object modification is not reflected in
	 * DB.
	 * 
	 * @param countryCode
	 * @throws Exception
	 */
	private void updateMovies(String countryCode) throws Exception {
		Country country = (Country) session.get(Country.class, countryCode);

		Set<Movie> movies = country.getMovies();
		Iterator<Movie> movieItr = movies.iterator();

		Movie movie = null;

		// 1. update all movies
		while (movieItr.hasNext()) {
			movie = (Movie) movieItr.next();
			movie.setTitle("UPD" + movie.getTitle());
		}

		// 2. extract a last movie from movie set
		movies.remove(movie);
		session.update(country);
	}

	private void updateMoveAddMovieAtOnce(String countryCode) throws Exception {
		Country country = (Country) session.get(Country.class, countryCode);

		Set<Movie> movies = country.getMovies();
		Iterator<Movie> movieItr = movies.iterator();

		Movie movie = null;

		// 1. update all movies
		while (movieItr.hasNext()) {
			movie = (Movie) movieItr.next();
			movie.setTitle("UPD" + movie.getTitle());
		}

		// 2. add a new movie
		Movie movie3 = new Movie();
		movie3.setMovieId("MV-00003");
		movie3.setDirector("Jiun Kim");
		movie3.setReleaseDate(DateUtil.stringToDate("2008-07-17", "yyyy-MM-dd"));
		movie3.setTitle("The Good,The Bad,The Weird");
		movie3.setCountry(country);

		movies.add(movie3);

		session.save(country);
	}
}
