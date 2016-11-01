package org.anyframe.hibernate.cache;

import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;


/**
 * TestCase Name : HibernateSecondLevelCacheTest<br>
 * <br>
 * [Description] : Hibernate 속성 정의 파일 내에 hibernate.cache.use_second_level_cache,
 * hibernate.cache.provider_class 등을 정의하고, 2LC에 저장되어야 할 객체에 대해 &lt;cache&gt; 속성을
 * 정의한 후, DEBUG 모드에서 테스트케이스를 실행시켜보면서 2nd Level Cache 적용으로 인해 DB에 접근하지 않고도 2LC를
 * 통해 객체가 조회되는 것을 살펴볼 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : COUNTRY 테이블을 대상으로 한건의 Country 정보를 조회한다.</li>
 * <li>#-2 Positive Case : MOVIE 테이블을 대상으로 한건의 Movie 정보를 조회한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateSecondLevelCacheTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/cache/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : COUNTRY 테이블을 대상으로 한건의 Country 정보를 조회한다. 한
	 * 어플리케이션 내에서 한 번 조회된 엔티티 정보는 2LC(2 Level Cache)에 저장되므로 다음 조회시 DB에 접근하지 않고도,
	 * Cache를 통해 조회할 수 있다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindCountry() throws Exception {
		// 1. insert init data. hibernate put initial data into 1LC.
		newSession();
		SetUpInitData.initializeData(session);
		closeSession();

		// 2. find a movie without accessing DB (using 2LC)
		newSession();
		Country country = (Country) session.get(Country.class, "CTR-0001");

		Set movies = country.getMovies();
		movies.iterator();
		closeSession();

		// 3. find a movie again without accessing DB (using 2LC)
		newSession();
		country = (Country) session.get(Country.class, "CTR-0001");

		movies = country.getMovies();
		movies.iterator();
		closeSession();
	}

	/**
	 * [Flow #-2] Positive Case : MOVIE 테이블을 대상으로 한건의 Movie 정보를 조회한다. Movie 관련
	 * Hibernate Mapping XML 파일 내에 2LC 사용 여부를 정의하지 않았으므로, 다른 Session 에서 해당 객체를
	 * 조회할 경우 매번 DB에 접근하게 된다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindMovie() throws Exception {
		// 1. insert init data. hibernate put initial data into 1LC.
		newSession();
		SetUpInitData.initializeData(session);
		closeSession();

		// 2. find a movie with accessing DB (not using 2LC)
		newSession();
		Movie movie = (Movie) session.get(Movie.class, "MV-00001");

		Set categories = movie.getCategories();
		categories.iterator();
		closeSession();

		// 3. find a movie agagin with accessing DB (not using 2LC)
		newSession();
		movie = (Movie) session.get(Movie.class, "MV-00001");

		categories = movie.getCategories();
		categories.iterator();
		closeSession();
	}
}
