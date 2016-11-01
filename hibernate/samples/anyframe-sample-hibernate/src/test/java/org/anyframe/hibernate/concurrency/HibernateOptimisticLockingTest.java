package org.anyframe.hibernate.concurrency;

import java.util.HashSet;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.concurrency.optimistic.Country;
import org.anyframe.sample.hibernate.model.bidirection.concurrency.optimistic.Movie;
import org.anyframe.util.DateUtil;
import org.hibernate.StaleObjectStateException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateOptimisticLockingTest <br>
 * <br>
 * [Description] : Optimistic Locking test is carried out. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Country with VERSION field. After entering new data
 * for test within the first transaction, Country information is twice searched
 * with the same identifier within the second transaction. After the second
 * transaction finishes, Country’s countryName before searched is set as
 * different name. With the third transaction, secondly searched Country
 * information is set as different countryName and reflected in DB.</li>
 * <li>#-2 Negative Case : Movie without VERSION field. After entering new data
 * for test within the first transaction, Movie information is twice searched
 * with the same identifier within the second transaction. After the second
 * transaction finishes, searched Movie title is set as different name. With the
 * third transaction, secondly searched Movie information is set as different
 * title and reflected in DB. <br/>
 * At the fourth transaction, update() method on first searched Movie
 * information is called for.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateOptimisticLockingTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/concurrency/hibernate-optimistic.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : After entering new data for test within the
	 * first transaction, Country information is twice searched with the same
	 * identifier within the second transaction. After the second transaction
	 * finishes, Country’s countryName before searched is set as different name.
	 * With the third transaction, secondly searched Country information is set
	 * as different countryName and reflected in DB. <br/>
	 * At the fourth transaction, update() method on first searched Country
	 * information is called for . In this case, the third transaction change
	 * led to COUNTRY_VERSION change. Therefore, StaleObjectStateException is
	 * expected to occur.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testUpdateCountryWithOptimisticLocking() throws Exception {
		// 1. insert a new country, movies information
		newSession();
		addCountryMovieAtOnce();
		closeSession();

		// 2. select a country
		newSession();
				Country fstCountry = (Country) session.get(Country.class,
				"CTR-0001");
		Assert.assertEquals("fail to check a version of country.", 0, fstCountry
				.getVersion());
		Country scdCountry = (Country) session.get(Country.class,
				"CTR-0001");
		closeSession();

		// 3. set country name
		fstCountry.setCountryName("First : Republic of Korea.");

		// 4. select a country again with same id and update country name
		newSession();
		scdCountry.setCountryName("Second : Republic of Korea.");
		closeSession();

		// 5. try to update with detached object
		newSession();
		try {
			session.update(fstCountry);
			closeSession();
		} catch (Exception e) {
			e.printStackTrace();
			Assert.assertTrue("fail to throw StaleObjectStateException.",
					e instanceof StaleObjectStateException);
		}
	}

	/**
	 * [Flow #-2] Negative Case : After entering new data for test within the
	 * first transaction, Movie information is twice searched with the same
	 * identifier within the second transaction. After the second transaction
	 * finishes, searched Movie title is set as different name. With the third
	 * transaction, secondly searched Movie information is set as different
	 * title and reflected in DB. <br/>
	 * Update()method on first searched Movie information is called for at the
	 * fourth transaction. In this case, correction is completed at the fourth
	 * transaction, nullifying correction at the third transaction.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testUpdateMovieWithoutOptimisticLocking() throws Exception {
		// 1. insert a new country, movies information
		newSession();
		addCountryMovieAtOnce();
		closeSession();

		// 2. select a country
		newSession();
		Movie fstMovie = (Movie) session.get(Movie.class, "MV-00001");
		Movie scdMovie = (Movie) session.get(Movie.class, "MV-00001");
		closeSession();

		// 3. set country name
		fstMovie.setTitle("First : My Sassy Girl");

		// 4. select a country again with same id and update country name
		newSession();
		scdMovie.setTitle("Second : My Sassy Girl");
		closeSession();

		// 5. try to update with detached object
		newSession();
		session.update(fstMovie);
		closeSession();
	}

	private String addCountryMovieAtOnce() throws Exception {
		// 1. insert a country information with movies
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("J.Y.Gwak");
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

}
