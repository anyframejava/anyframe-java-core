package org.anyframe.hibernate.fetch;

import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Query;


/**
 * TestCase Name : HibernateFetchWithoutLazyLoadingTest<br>
 * <br>
 * [Description] : : Hibernate Lazy Loading으로 발생할 수 있는 N+1 SELECT 문제를 해결하기 위한
 * 하나의 Fetch 전략에 대해 알아본다. 특정 객체 조회를 위한 HQL 내에 "join fetch"를 정의한 경우, 수행되는 쿼리문의
 * 개수와 쿼리문을 확인해 볼 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Fetch Inner
 * Join)을 이용한 조회 작업을 수행한다. 조회 결과 Category Set은 Lazy Loading 없이 한번에 로드된다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateFetchWithoutLazyLoadingTest extends
		AbstractConfigurationalTest {

	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/fetch/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Fetch
	 * Inner Join)을 이용한 조회 작업을 수행한다. 조회 결과 Category Set은 Lazy Loading 없이 한번에
	 * 로드된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
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
		assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		for (int i = 0; i < movieList.size(); i++) {
			Movie movie = (Movie) movieList.get(i);

			if (i == 0) {
				assertEquals("fail to match a movie title.", "My Sassy Girl",
						movie.getTitle());
				assertEquals("fail to match a movie director.", "Jaeyong Gwak",
						movie.getDirector());

				Set categories = movie.getCategories();
				assertEquals("fail to match the size of category list.", 1,
						categories.size());
			} else if (i == 1) {
				assertEquals("fail to match a movie title.", "My Little Bride",
						movie.getTitle());
				assertEquals("fail to match a movie director.", "Hojun Kim",
						movie.getDirector());

				Set categories = movie.getCategories();
				assertEquals("fail to match the size of category list.", 1,
						categories.size());
			}
		}
		session.close();
	}
}
