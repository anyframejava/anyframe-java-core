package org.anyframe.hibernate.paging;

import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.SQLQuery;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateNativeSQLPagingTest<br>
 * <br>
 * [Description] : How to get paging processed search result in Native SQL
 * execution is looked into. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Search work targeting MOVIE table is carried out with
 * Native SQL. In this case, Number(FirstResult) of Row to start search and
 * search list Number(MaxResult) are defined. Therefore, paging process becomes
 * possible.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)  
public class HibernateNativeSQLPagingTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Search work targeting MOVIE table is carried
	 * out with Native SQL. In this case, Number(FirstResult) of Row to start
	 * search and search list Number(MaxResult) are defined. Therefore, paging
	 * process becomes possible.
	 * 
	 * @throws Exception
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testMovieListWithPaging() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("SELECT * ");
		hqlBuf.append("FROM MOVIE ");
		SQLQuery query = session.createSQLQuery(hqlBuf.toString());
		query.addEntity(Movie.class);
		query.setFirstResult(1);
		query.setMaxResults(2);
		List movieList = query.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		for (int i = 0; i < movieList.size(); i++) {
			Movie movie = (Movie) movieList.get(i);

			if (i == 0) { 
				Assert.assertEquals("fail to match a movie title.", "My Little Bride",
						movie.getTitle());
				Assert.assertEquals("fail to match a movie director.", "Hojun Kim",
						movie.getDirector());

				Set<Category> categories = movie.getCategories();
				Assert.assertEquals("fail to match the size of category list.", 2,
						categories.size());
			} else if (i == 1) {
				Assert.assertEquals("fail to match a movie title.", "Ring 2", movie
						.getTitle());
				Assert.assertEquals("fail to match a movie director.", "Hideo Nakata",
						movie.getDirector());

				Set<Category> categories = movie.getCategories();
				Assert.assertEquals("fail to match the size of category list.", 1,
						categories.size());
			}
		}
	}
}
