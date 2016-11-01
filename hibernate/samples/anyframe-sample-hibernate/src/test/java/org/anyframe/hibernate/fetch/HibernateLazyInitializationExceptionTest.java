package org.anyframe.hibernate.fetch;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Hibernate;
import org.hibernate.LazyInitializationException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateLazyInitializationExceptionTest<br>
 * <br>
 * [Description] : When non-Initialized object is changed into Detached status
 * within on e Session thanks to relevant Session closing, it is checked object
 * information cannot be read. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Negative Case : Single item search work for MOIVE table is carried
 * out. And after closing current Session, relevant Category list information is
 * extracted form single item Movie information gained before.</li>
 * <li>#-2 Positive Case : Single item search work for MOVIE table is carried
 * out. The search work for Category list, relevant object, is initialized via
 * iterator() method. Also, after closing current Session, relevant Category
 * list information is extracted from single item Movie information gained
 * before. After Session closing, relevant object Movie is changed into Detached
 * status and list of Category, relevant object within Session is initialized.
 * Therefore, in the case of Category list search after Session closing, correct
 * result can be earned.</li>
 * <li>#-3 Positive Case : Single item search work for MOVIE table is carried
 * out. The search work for Category list, relevant object, is initialized via
 * Hibernate.initialize() method. Also, after closing current Session, relevant
 * Category list information is extracted from single item Movie information
 * gained before. After Session closing, relevant object Movie is changed into
 * Detached status and list of Category, relevant object within Session is
 * initialized. Therefore, in the case of Category list search after Session
 * closing, correct result can be earned.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateLazyInitializationExceptionTest extends
		AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Negative Case : Single item search work for MOIVE table is
	 * carried out. And after closing current Session, relevant Category list
	 * information is extracted form single item Movie information gained
	 * before. After Session closing, relevant object, Movie, is changed into
	 * detached status, list of Category, relevant Object within Session is not
	 * initialized. Therefore, after Session closing, in the case of list search
	 * of Category, relevant object, LazyInitializationException is thrown.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindMovie() throws Exception {
		// 1. insert init data
		session = initialSessionFactory.openSession();
		session.beginTransaction();
		SetUpInitData.initializeData(session);
		session.getTransaction().commit();
		session.close();

		// 2. get a movie
		session = initialSessionFactory.openSession();
		Movie movie = (Movie) session.get(Movie.class, "MV-00001");
		Assert.assertNotNull("fail to get a movie.", movie);
		session.close();

		// 3. get categories of that movie after closing session
		try {
			movie.getCategories().iterator();
			Assert.fail("expected LazyInitializationException");
		} catch (Exception e) {
			Assert.assertTrue("fail to throw LazyInitializationException.",
					e instanceof LazyInitializationException);
		}
	}

	/**
	 * [Flow #-2] Positive Case : Single item search work for MOIVE table is
	 * carried out. And after closing current Session, relevant Category list
	 * information is extracted form single item Movie information gained
	 * before. After Session closing, relevant object, Movie, is changed into
	 * detached status, list of Category, relevant Object within Session is not
	 * initialized. Therefore, after Session closing, in the case of list search
	 * of Category, relevant object, LazyInitializationException is thrown.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindMovieWithCallingIterator() throws Exception {
		// 1. insert init data
		session = initialSessionFactory.openSession();
		session.beginTransaction();
		SetUpInitData.initializeData(session);
		session.getTransaction().commit();
		session.close();

		// 2. get a movie
		session = initialSessionFactory.openSession();
		Movie movie = (Movie) session.get(Movie.class, "MV-00001");
		Assert.assertNotNull("fail to get a movie.", movie);

		// 3. initialize realated object calling iterator() or size()
		movie.getCategories().iterator();
		session.close();

		// 4. get categories of that movie after closing session
		Assert.assertEquals("fail to match the size of category list.", 2, movie
				.getCategories().size());
	}

	/**
	 * [Flow #-3] Positive Case : Single item search work for MOIVE table is
	 * carried out. And after closing current Session, relevant Category list
	 * information is extracted form single item Movie information gained
	 * before. After Session closing, relevant object, Movie, is changed into
	 * detached status, list of Category, relevant Object within Session is not
	 * initialized. Therefore, after Session closing, in the case of list search
	 * of Category, relevant object, LazyInitializationException is thrown.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindMovieWithHibernateInitialize() throws Exception {
		// 1. insert init data
		session = initialSessionFactory.openSession();
		session.beginTransaction();
		SetUpInitData.initializeData(session);
		session.getTransaction().commit();
		session.close();

		// 2. get a movie
		session = initialSessionFactory.openSession();
		Movie movie = (Movie) session.get(Movie.class, "MV-00001");
		Assert.assertNotNull("fail to get a movie.", movie);

		// 3. initialize realated object calling Hibernate.initialize()
		Hibernate.initialize(movie.getCategories());
		session.close();

		// 4. get categories of that movie after closing session
		Assert.assertEquals("fail to match the size of category list.", 2, movie
				.getCategories().size());
	}
}
