package org.anyframe.hibernate.fetch;

import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Query;


/**
 * TestCase Name : HibernateFetchWithSubselectTest<br>
 * <br>
 * [Description] : Hibernate Lazy Loading으로 발생할 수 있는 N+1 SELECT 문제를 해결하기 위한 하나의
 * Fetch 전략에 대해 알아본다. Hibernate Mapping XML 파일 내에 특정 객체에 대한 fetch 조건을 subselect로
 * 정의하였을 경우, 수행되는 쿼리문의 개수와 쿼리문을 확인해 볼 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : MOVIE 테이블을 대상으로 HQL을 이용한 조회 작업을 수행한다. (Hibernate
 * Mapping XML 파일에 정의된 Movie:Category 관계에서 Category Set에 대한 Fetch Strategy를
 * Subselect Fetching (fetch="subselect") 으로 정의하였음.) 특정 Movie에 속한 Category Set을
 * 조회하고자 할 때 Sub Query 형태의 SELECT문이 수행된다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateFetchWithSubselectTest extends
		AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/fetch/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : MOVIE 테이블을 대상으로 HQL을 이용한 조회 작업을 수행한다.
	 * (Hibernate Mapping XML 파일에 정의된 Movie:Category 관계에서 Category Set에 대한 Fetch
	 * Strategy를 Subselect Fetching (fetch="subselect") 으로 정의하였음.) 특정 Movie에 속한
	 * Category Set을 조회하고자 할 때 Sub Query 형태의 SELECT문이 수행된다.
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
		hqlBuf.append("FROM Movie");
		Query query = session.createQuery(hqlBuf.toString());
		List movieList = query.list();

		// 3. assert result - movie
		assertEquals("fail to match the size of movie list.", 3, movieList
				.size());

		for (int i = 0; i < movieList.size(); i++) {
			Movie movie = (Movie) movieList.get(i);

			if (i == 0) {
				assertEquals("fail to match a movie title.", "My Sassy Girl",
						movie.getTitle());
				assertEquals("fail to match a movie director.", "Jaeyong Gwak",
						movie.getDirector());

				Set categories = movie.getCategories();
				assertEquals("fail to match the size of category list.", 2,
						categories.size());
			} else if (i == 1) {
				assertEquals("fail to match a movie title.", "My Little Bride",
						movie.getTitle());
				assertEquals("fail to match a movie director.", "Hojun Kim",
						movie.getDirector());

				Set categories = movie.getCategories();
				assertEquals("fail to match the size of category list.", 2,
						categories.size());
			} else if (i == 2) {
				assertEquals("fail to match a movie title.", "Ring 2", movie
						.getTitle());
				assertEquals("fail to match a movie director.", "Hideo Nakata",
						movie.getDirector());

				Set categories = movie.getCategories();
				assertEquals("fail to match the size of category list.", 1,
						categories.size());
			}

		}
		session.close();
	}
}
