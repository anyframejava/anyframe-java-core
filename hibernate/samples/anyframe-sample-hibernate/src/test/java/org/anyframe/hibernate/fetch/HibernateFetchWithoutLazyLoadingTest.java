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
 * TestCase Name : HibernateFetchWithoutLazyLoadingTest<br>
 * <br>
 * [Description] : : One Fetch strategy to resolve Hibernate Lazy Loading-led
 * N+SELECT issue is looked into. In the case of defining “join fetch” within
 * HQL for a specific object search, executed query statements and its number
 * can be checked. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Search work for two tables which have Relation is
 * carried out with HQL(Fetch Inner Join). Search result Category Set is loaded
 * without Lazy Loading.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateFetchWithoutLazyLoadingTest extends
		AbstractConfigurationalTest {

	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/fetch/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Search work for two tables which have Relation
	 * is carried out with HQL(Fetch Inner Join). Search result Category Set is
	 * loaded without Lazy Loading.
	 * 
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
		hqlBuf.append("SELECT movie ");
		hqlBuf.append("FROM Movie movie join fetch movie.categories category ");
		hqlBuf.append("WHERE category.categoryName = ?");
		Query query = session.createQuery(hqlBuf.toString());
		query.setParameter(0, "Romantic");
		List movieList = query.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		for (int i = 0; i < movieList.size(); i++) {
			Movie movie = (Movie) movieList.get(i);

			if (i == 0) {
				Assert.assertEquals("fail to match a movie title.", "My Sassy Girl",
						movie.getTitle());
				Assert.assertEquals("fail to match a movie director.", "Jaeyong Gwak",
						movie.getDirector());

				Set<Category> categories = movie.getCategories();
				Assert.assertEquals("fail to match the size of category list.", 1,
						categories.size());
			} else if (i == 1) {
				Assert.assertEquals("fail to match a movie title.", "My Little Bride",
						movie.getTitle());
				Assert.assertEquals("fail to match a movie director.", "Hojun Kim",
						movie.getDirector());

				Set<Category> categories = movie.getCategories();
				Assert.assertEquals("fail to match the size of category list.", 1,
						categories.size());
			}
		}
		session.close();
	}
}
