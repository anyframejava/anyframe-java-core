package org.anyframe.hibernate.fetch;

import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.hibernate.Query;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;


/**
 * TestCase Name : HibernateFetchWithDefaultLazyLoadingTest<br>
 * <br>
 * [Description] : Hibernate Lazy Loading으로 발생할 수 있는 N+1 SELECT 문제에 대해 살펴본다.
 * 수행되는 쿼리문의 개수와 쿼리문을 직접 확인해 볼 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : CATEGORY 테이블을 대상으로 HQL을 이용한 조회 작업을 수행한다. 특정
 * Category에 속한 Movie Set 조회시 Movie 정보 조회를 위한 SELECT문이 수행된다.</li>
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
	 * [Flow #-1] Positive Case : CATEGORY 테이블을 대상으로 HQL을 이용한 조회 작업을 수행한다. 특정
	 * Category에 속한 Movie Set 조회시 Movie 정보 조회를 위한 SELECT문이 수행된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
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

				Set movies = category.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 2, movies
						.size());
			} else if (i == 1) {
				Assert.assertEquals("fail to match a category name.", "Horror",
						category.getCategoryName());

				Set movies = category.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 1, movies
						.size());
			} else if (i == 2) {
				Assert.assertEquals("fail to match a category name.", "Romantic",
						category.getCategoryName());

				Set movies = category.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 2, movies
						.size());
			} else if (i == 3) {
				Assert.assertEquals("fail to match a category name.", "SF", category
						.getCategoryName());

				Set movies = category.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 0, movies
						.size());

			}
		}
		session.close();
	}
}
