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
 * [Description] : 한 Session 내에서 Initialize 되지 않은 객체는 해당 Session 종료로 인해 Detached
 * 상태로 변경되었을 때, 객체 정보를 읽어낼 수 없음을 확인할 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Negative Case : MOVIE 테이블을 대상으로 단건 조회 작업을 수행한다. 그리고, 현재 Session을
 * 종료시킨 후, 앞서 얻어낸 단건의 Movie 정보로부터 관련된 Category 목록 정보를 추출해본다. Session 종료 후, 해당 객체
 * Movie는 Detached 상태로 변경되고 Session 내에서 연관 객체인 Category 목록이 initialize되지 않았으므로,
 * Session 종료 후 연관 객체인 Category 목록 조회시 LazyInitializationException이 throw된다.</li>
 * <li>#-2 Positive Case : MOVIE 테이블을 대상으로 단건 조회 작업을 수행하고 연관 객체인 Category 목록에
 * 대해 iterator() 메소드 호출을 통해 초기화한한다. 그리고, 현재 Session을 종료시킨 후, 앞서 얻어낸 단건의 Movie
 * 정보로부터 관련된 Category 목록 정보를 추출해본다. Session 종료 후, 해당 객체 Movie는 Detached 상태로 변경되고
 * Session 내에서 연관 객체인 Category 목록이 initialize되었으므로, Session 종료 후 연관 객체인 Category
 * 목록 조회시 제대로 된 결과를 얻을 수 있다.</li>
 * <li>#-3 Positive Case : MOVIE 테이블을 대상으로 단건 조회 작업을 수행하고 연관 객체인 Category 목록에
 * 대해 Hibernate.initialize() 메소드 호출을 통해 초기화한한다. 그리고, 현재 Session을 종료시킨 후, 앞서 얻어낸
 * 단건의 Movie 정보로부터 관련된 Category 목록 정보를 추출해본다. Session 종료 후, 해당 객체 Movie는
 * Detached 상태로 변경되고 Session 내에서 연관 객체인 Category 목록이 initialize되었으므로, Session 종료
 * 후 연관 객체인 Category 목록 조회시 제대로 된 결과를 얻을 수 있다.</li>
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
	 * [Flow #-1] Negative Case : MOVIE 테이블을 대상으로 단건 조회 작업을 수행한다. 그리고, 현재
	 * Session을 종료시킨 후, 앞서 얻어낸 단건의 Movie 정보로부터 관련된 Category 목록 정보를 추출해본다.
	 * Session 종료 후, 해당 객체 Movie는 Detached 상태로 변경되고 Session 내에서 연관 객체인 Category
	 * 목록이 initialize되지 않았으므로, Session 종료 후 연관 객체인 Category 목록 조회시
	 * LazyInitializationException이 throw된다.
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
	 * [Flow #-2] Positive Case : MOVIE 테이블을 대상으로 단건 조회 작업을 수행하고 연관 객체인 Category
	 * 목록에 대해 iterator() 메소드 호출을 통해 초기화한한다. 그리고, 현재 Session을 종료시킨 후, 앞서 얻어낸 단건의
	 * Movie 정보로부터 관련된 Category 목록 정보를 추출해본다. Session 종료 후, 해당 객체 Movie는
	 * Detached 상태로 변경되고 Session 내에서 연관 객체인 Category 목록이 initialize되었으므로,
	 * Session 종료 후 연관 객체인 Category 목록 조회시 제대로 된 결과를 얻을 수 있다.
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
	 * [Flow #-3] Positive Case : MOVIE 테이블을 대상으로 단건 조회 작업을 수행하고 연관 객체인 Category
	 * 목록에 대해 Hibernate.initialize() 메소드 호출을 통해 초기화한한다. 그리고, 현재 Session을 종료시킨 후,
	 * 앞서 얻어낸 단건의 Movie 정보로부터 관련된 Category 목록 정보를 추출해본다. Session 종료 후, 해당 객체
	 * Movie는 Detached 상태로 변경되고 Session 내에서 연관 객체인 Category 목록이 initialize되었으므로,
	 * Session 종료 후 연관 객체인 Category 목록 조회시 제대로 된 결과를 얻을 수 있다.
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
