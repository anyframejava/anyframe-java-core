package org.anyframe.hibernate.fetch;

import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Query;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateFetchWithSubselectTest<br>
 * <br>
 * [Description] : A Fetch strategy is looked into in order to resolve N+1
 * SELECT issue that can happen due to Hibernate Lazy Loading. In the case of
 * defining fetch condition on a specific object within Hibernate Mapping XML
 * file as subselect, the number of executed query statement and query statement
 * can be checked. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Search work for MOVIE table is carried out with
 * HQL.(at Movie:Category relation defined at Hibernate Mapping XML file, Fetch
 * Strategy on Category Set is defined as Subselect Fetching
 * ((fetch="subselect").). In the case of searching Category Set belonging to a
 * specific Movie, SELECT statement is executed in the form of Sub Query.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateFetchWithSubselectTest extends
		AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/fetch/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Search work for MOVIE table is carried out
	 * with HQL.(at Movie:Category relation defined at Hibernate Mapping XML
	 * file, Fetch Strategy on Category Set is defined as Subselect Fetching
	 * ((fetch="subselect").). In the case of searching Category Set belonging
	 * to a specific Movie, SELECT statement is executed in the form of Sub
	 * Query.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindMovieList() throws Exception {
		// 1. insert init data
		session = initialSessionFactory.openSession();
		session.beginTransaction();
		SetUpInitData.initializeData(session);
		session.getTransaction().commit();
		session.close();

		// 2. execute hql with another session
		session = initialSessionFactory.openSession();
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("FROM Movie");
		Query query = session.createQuery(hqlBuf.toString());
		List movieList = query.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of movie list.", 3, movieList
				.size());

		for (int i = 0; i < movieList.size(); i++) {
			Movie movie = (Movie) movieList.get(i);

			if (i == 0) {
				Assert.assertEquals("fail to match a movie title.", "My Sassy Girl",
						movie.getTitle());
				Assert.assertEquals("fail to match a movie director.", "Jaeyong Gwak",
						movie.getDirector());

				Set<Category> categories = movie.getCategories();
				Assert.assertEquals("fail to match the size of category list.", 2,
						categories.size());
			} else if (i == 1) {
				Assert.assertEquals("fail to match a movie title.", "My Little Bride",
						movie.getTitle());
				Assert.assertEquals("fail to match a movie director.", "Hojun Kim",
						movie.getDirector());

				Set<Category> categories = movie.getCategories();
				Assert.assertEquals("fail to match the size of category list.", 2,
						categories.size());
			} else if (i == 2) {
				Assert.assertEquals("fail to match a movie title.", "Ring 2", movie
						.getTitle());
				Assert.assertEquals("fail to match a movie director.", "Hideo Nakata",
						movie.getDirector());

				Set<Category> categories = movie.getCategories();
				Assert.assertEquals("fail to match the size of category list.", 1,
						categories.size());
			}

		}
		session.close();
	}
}
