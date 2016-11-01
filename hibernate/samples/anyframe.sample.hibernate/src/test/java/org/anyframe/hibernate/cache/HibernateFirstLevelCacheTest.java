package org.anyframe.hibernate.cache;

import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;


/**
 * TestCase Name : HibernateFirstLevelCacheTest<br>
 * <br>
 * [Description] : 하나의 트랜잭션 내에서는 Hibernate에서 기본 제공하는 1LC를 통해 한 번 조회된 객체에 대해서는 다시
 * DB에 접근하지 않고도 조회될 수 있음을 확인할 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : MOVIE 테이블을 대상으로 한건의 Movie 정보를 조회한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateFirstLevelCacheTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/cache/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : MOVIE 테이블을 대상으로 한건의 Movie 정보를 조회한다. 동일한
	 * Session 내에서 한 번 조회된 엔티티 정보는 1LC(1 Level Cache)에 저장되므로 다음 조회시 DB에 접근하지
	 * 않고도, Cache를 통해 조회할 수 있다.
	 * 
	 * @throws Exception
	 */
	public void testFindMovie() throws Exception {
		// 1. insert init data. hibernate put initial data into 1LC.
		newSession();
		SetUpInitData.initializeData(session);

		// 2. find a movie without accessing DB (using 1LC)
		Movie movie = (Movie) session.get(Movie.class, "MV-00001");

		Set categories = movie.getCategories();
		categories.iterator();

		// 3. find a movie again without accessing DB (using 1LC)
		movie = (Movie) session.get(Movie.class, "MV-00001");

		categories = movie.getCategories();
		categories.iterator();
		closeSession();
	}
}
