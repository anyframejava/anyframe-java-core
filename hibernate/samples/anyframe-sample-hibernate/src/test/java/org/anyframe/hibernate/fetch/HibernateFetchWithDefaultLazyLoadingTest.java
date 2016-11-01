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
 * TestCase Name : HibernateFetchWithDefaultLazyLoadingTest<br>
 * <br>
 * [Description] : Hibernate Lazy Loading-led N+1 SELECT issue is looked into.
 * Executed query statement and its number can be checked by user. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Search work for CATEGORY table is carried out with
 * HQL. In the case of searching Movie Set belonging to a specific Category,
 * SELECT statement is executed for Movie information search.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateFetchWithDefaultLazyLoadingTest extends
		AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/fetch/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Search work for CATEGORY table is carried out
	 * with HQL. In the case of searching Movie Set belonging to a specific
	 * Category, SELECT statement is executed for Movie information search.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testCategoryList() throws Exception {
		// 1. insert init data
		session = initialSessionFactory.openSession();
		session.beginTransaction();
		SetUpInitData.initializeData(session);
		session.getTransaction().commit();
		session.close();

		// 2. execute hql with another session
		session = initialSessionFactory.openSession();
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("FROM Category category ");
		hqlBuf.append("ORDER BY category.categoryName ASC");
		Query query = session.createQuery(hqlBuf.toString());
		List categoryList = query.list();

		// 3. assert result - category
		Assert.assertEquals("fail to match the size of category list.", 4,
				categoryList.size());

		for (int i = 0; i < categoryList.size(); i++) {
			Category category = (Category) categoryList.get(i);

			if (i == 0) {
				Assert.assertEquals("fail to match a category name.", "Comedy",
						category.getCategoryName());

				Set<Movie> movies = category.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 2, movies
						.size());
			} else if (i == 1) {
				Assert.assertEquals("fail to match a category name.", "Horror",
						category.getCategoryName());

				Set<Movie> movies = category.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 1, movies
						.size());
			} else if (i == 2) {
				Assert.assertEquals("fail to match a category name.", "Romantic",
						category.getCategoryName());

				Set<Movie> movies = category.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 2, movies
						.size());
			} else if (i == 3) {
				Assert.assertEquals("fail to match a category name.", "SF", category
						.getCategoryName());

				Set<Movie> movies = category.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 0, movies
						.size());

			}
		}
		session.close();
	}
}
