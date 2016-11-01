package org.anyframe.hibernate.basic;

import java.util.HashSet;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.anyframe.util.DateUtil;
import org.hibernate.HibernateException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateSaveOrUpdateParentChildTest<br>
 * <br>
 * [Description] : When the relation between two objects are 1:m, it is checked
 * whether registration/modification are conducted by calling for saveOrUpdate()
 * method. Also, via 1-side new object, save(), update(),saveOrUpdate()methods
 * are called for to check registration/modification. Also, via registered
 * object belonging to registered 1 side, save(), update(), saveOrUpdate()
 * methods on new m-side object are called for to compare differences. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : When there is Country:Movie=1:m relation, update()
 * method on Country information not reflected in DB is called for.</li>
 * <li>#-2 Positive Case : When there is Country:Movie=1:m relation, save()
 * method ON Country information not reflected in DB is called for.</li>
 * <li>#-3 Positive Case : When there is Country:Movie=1:m relation,
 * saveOrUpdate() method on Country information not reflected in DB is called
 * for.</li>
 * <li>#-4 Positive Case : When there is Country:Movie=1:m relation, update()
 * method on Country information not reflected in DB is called for.</li>
 * <li>#-5 Positive Case : When there is Country:Movie=1:m relation, after
 * adding Country information not reflected in DB and save() method on Movie
 * information is called for.</li>
 * <li>#-6 Positive Case : When there is Country:Movie=1:m relation, after
 * adding Country information not reflected in DB and saveOrUpdate() method on
 * Movie information is called for.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateSaveOrUpdateParentChildTest extends
		AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : When there is Country:Movie=1:m relation,
	 * update() method on Country information not reflected in DB is called for,
	 * DB does not include relevant object. Therefore, when Transaction commit
	 * is executed, Exception is thrown.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryCallingUpdate() throws Exception {
		// 1. start a new session and transaction
		newSession();

		// 2. try to insert a country information without movies
		Country country1 = makeNewCountry();
		session.update(country1);

		// 3. close session
		try {
			closeSession();
			Assert.fail("expected throw HibernateException");
		} catch (Exception e) {
			Assert.assertTrue("fail to check exception type.",
					e instanceof HibernateException);
		}
	}

	/**
	 * [Flow #-2] Positive Case : When there is Country:Movie=1:m relation,
	 * after adding Country information not reflected in DB and save() method on
	 * Movie information is called for, DB does not include relevant object.
	 * Therefore, in executing Transaction commit, INSERT statement on relevant
	 * object is executed.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryCallingSave() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.save(country1);
		closeSession();

		// 2. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		closeSession();
	}

	/**
	 * [Flow #-3] Positive Case : When there is Country:Movie=1:m relation,
	 * after adding Country information not reflected in DB and saveOrUpdate()
	 * method on Movie information is called for, DB does not include relevant
	 * object. Therefore, in executing Transaction commit, INSERT statement on
	 * relevant object is executed. In the case relevant object is in DB, object
	 * information is modified.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryCallingSaveOrUpdate() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.saveOrUpdate(country1);
		closeSession();

		// 2. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		closeSession();
	}

	/**
	 * [Flow #-4] Positive Case : When there is Country:Movie=1:m relation,
	 * after adding Country information not reflected in DB and update() method
	 * on Movie information is called for, DB does not include relevant object.
	 * Therefore, in executing Transaction commit, INSERT statement on relevant
	 * object is executed. In the case relevant object is in DB, object
	 * information is modified.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddMoviesCallingUpdate() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.save(country1);
		closeSession();

		// 2. try to insert a country information with movies.
		newSession();
		Country country2 = makeNewMovieSet(country1.getCountryCode());
		session.update(country2);
		closeSession();

		// 3. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		Assert.assertEquals("fail to match the size of movie list", 2, result
				.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-5] Positive Case : When there is Country:Movie=1:m relation,
	 * after adding Country information not reflected in DB and save() method on
	 * Movie information is called for, DB does not include relevant object.
	 * Therefore, in executing Transaction commit, INSERT statement on relevant
	 * object is executed. In the case relevant object is in DB, object
	 * information is modified.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddMoviesCallingSave() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.save(country1);
		closeSession();

		// 2. try to insert a country information with movies.
		newSession();
		Country country2 = makeNewMovieSet(country1.getCountryCode());
		session.save(country2);
		closeSession();

		// 3. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		Assert.assertEquals("fail to match the size of movie list", 2, result
				.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-6] Positive Case : When there is Country:Movie=1:m relation,
	 * after adding Country information not reflected in DB and saveOrUpdate()
	 * method on Movie information is called for, DB does not include relevant
	 * object. Therefore, in executing Transaction commit, INSERT statement on
	 * relevant object is executed. In the case relevant object is in DB, object
	 * information is modified.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddMoviesCallingSaveOrUpdate() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.save(country1);
		closeSession();

		// 2. try to insert a country information with movies.
		newSession();
		Country country2 = makeNewMovieSet(country1.getCountryCode());
		session.saveOrUpdate(country2);
		closeSession();

		// 3. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		Assert.assertEquals("fail to match the size of movie list", 2, result
				.getMovies().size());
		closeSession();
	}

	private Country makeNewMovieSet(String countryCode) {
		Country country = (Country) session.get(Country.class, countryCode);

		// 1. make movie list and related to country. insert a country
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
		movie1.setCountry(country);
		movies.add(movie1);
		movie2.setCountry(country);
		movies.add(movie2);
		country.setMovies(movies);

		return country;
	}

	private Country makeNewCountry() {
		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		return country1;
	}
}
