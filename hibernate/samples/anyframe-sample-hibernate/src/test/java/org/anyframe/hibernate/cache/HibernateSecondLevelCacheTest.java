package org.anyframe.hibernate.cache;

import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateSecondLevelCacheTest<br>
 * <br>
 * [Description] : hibernate.cache.use_second_level_cache,
 * hibernate.cache.provider_class are defined within Hibernate property
 * definition file. And &lt;cache&gt; property for object to be stored in 2LC is
 * defined. While carrying out TestCase at DEBUG mode, it is looked into that
 * applying the 2nd Level Cache allows to search object via 2LC without
 * accessing DB. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Single item of Country information for COUNTRY table
 * is searched.</li>
 * <li>#-2 Positive Case : Single item of Country information for MOVIE table is
 * searched.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateSecondLevelCacheTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/cache/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Single item of Movie information for COUNTRY
	 * table is searched. Entity information once searched within one
	 * application is stored in 2LC(2 Level Cache). Therefore, for next search,
	 * there is no need to access DB and information can be searched via Cache.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindCountry() throws Exception {
		// 1. insert init data. hibernate put initial data into 1LC.
		newSession();
		SetUpInitData.initializeData(session);
		closeSession();

		// 2. find a movie without accessing DB (using 2LC)
		newSession();
		Country country = (Country) session.get(Country.class, "CTR-0001");

		Set<Movie> movies = country.getMovies();
		movies.iterator();
		closeSession();

		// 3. find a movie again without accessing DB (using 2LC)
		newSession();
		country = (Country) session.get(Country.class, "CTR-0001");

		movies = country.getMovies();
		movies.iterator();
		closeSession();
	}

	/**
	 * [Flow #-2] Positive Case : Single item of Movie information for MOVIE
	 * table is searched. whether 2LC is used is not defined within Hibernate
	 * Mapping XML file. In the case where relevant object is searched in
	 * another Session, every time DB is accessed.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindMovie() throws Exception {
		// 1. insert init data. hibernate put initial data into 1LC.
		newSession();
		SetUpInitData.initializeData(session);
		closeSession();

		// 2. find a movie with accessing DB (not using 2LC)
		newSession();
		Movie movie = (Movie) session.get(Movie.class, "MV-00001");

		Set<Category> categories = movie.getCategories();
		categories.iterator();
		closeSession();

		// 3. find a movie agagin with accessing DB (not using 2LC)
		newSession();
		movie = (Movie) session.get(Movie.class, "MV-00001");

		categories = movie.getCategories();
		categories.iterator();
		closeSession();
	}
}
