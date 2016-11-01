package org.anyframe.hibernate.cache;

import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateFirstLevelCacheTest<br>
 * <br>
 * [Description] : For once searched object via 1LC provided at Hibernate as
 * default within one transaction, it can be searched without accessing DB. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : One piece of the Movie information is searched for
 * MOVIE table.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateFirstLevelCacheTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/cache/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Single item of Movie information for MOVIE
	 * table is searched. Entitiy information once searched within the same
	 * Session is stored at 1LC(1 Level Cache). Therefore, for next search,
	 * there is no need to access DB and information can be searched via Cache.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindMovie() throws Exception {
		// 1. insert init data. hibernate put initial data into 1LC.
		newSession();
		SetUpInitData.initializeData(session);

		// 2. find a movie without accessing DB (using 1LC)
		Movie movie = (Movie) session.get(Movie.class, "MV-00001");

		Set<Category> categories = movie.getCategories();
		categories.iterator();

		// 3. find a movie again without accessing DB (using 1LC)
		movie = (Movie) session.get(Movie.class, "MV-00001");

		categories = movie.getCategories();
		categories.iterator();
		closeSession();
	}
}
