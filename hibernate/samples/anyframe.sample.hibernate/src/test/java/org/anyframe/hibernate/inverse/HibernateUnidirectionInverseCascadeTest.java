package org.anyframe.hibernate.inverse;

import org.anyframe.hibernate.AbstractTest;
import org.anyframe.sample.hibernate.model.unidirection.inverse.Country;
import org.anyframe.sample.hibernate.model.unidirection.inverse.Movie;
import org.anyframe.util.DateUtil;

/**
 * TestCase Name : HibernateUnidirectionInverseCascadeTest<br>
 * <br>
 * [Description] : 1:m 관계에 놓인 두 객체가 단방향 관계일 경우 inverse, cascade 속성 정의에 따라 실행되는
 * 쿼리문이 달라짐을 확인할 수 있다. 또한 이 테스트케이스 결과를 통해 단방향 관계에서 inverse, cascade를 어떻게 활용해야 할
 * 지 알 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Country : Movie = 1:m 이고 단방향 관계. Country 관련
 * Hibernate Mapping XML 파일 내에 inverse="false", cascade 속성 정의하지 않음.</li>
 * <li>#-2 Positive Case : Country : Movie = 1:m 이고 단방향 관계. Country 관련
 * Hibernate Mapping XML 파일 내에 inverse="true", cascade 속성 정의하지 않음.</li>
 * <li>#-3 Positive Case : Country : Movie = 1:m 이고 단방향 관계. Country 관련
 * Hibernate Mapping XML 파일 내에 inverse="false", cascade="save-update"로 정의함.</li>
 * <li>#-4 Positive Case : Country : Movie = 1:m 이고 단방향 관계. Country 관련
 * Hibernate Mapping XML 파일 내에 inverse="true", cascade="save-update"로 정의함.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateUnidirectionInverseCascadeTest extends AbstractTest {

	/**
	 * [Flow #-1] Positive Case : Country : Movie = 1:m 이고 단방향 관계. Country 관련
	 * Hibernate Mapping XML 파일 내에 inverse="false", cascade 속성 정의하지 않음. <br/>
	 * 기본적으로 Country, Movie 각각을 추가하기 위해 2번의 INSERT 문이 수행된다. 또한, inverse="false"
	 * 이므로, country.getMovies().add(movie); 코드 수행으로 인해 MOVIE 테이블의 COUNTRY_CODE
	 * 정보가 null -> 'CTR-0001'로 셋팅하기 위한 UPDATE 쿼리가 추가적으로 실행된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryMovieWithoutInverseCascade() throws Exception {
		// 1. make init data
		newSession("org/anyframe/hibernate/inverse/unidirection/hibernate-without-inversecascade.cfg.xml");
		Country country = makeCountry();
		Movie movie = makeMovie();

		// 2. try to make a relation between country and movie
		country.getMovies().add(movie);
		// movie.setCountry(country);

		// 3. try to insert a country, movie
		session.save(country);
		session.save(movie);
		closeSession();

		// 4. check
		newSession();
		country = (Country) session.get(Country.class, "CTR-0001");
		assertEquals("fail to match the size of movie list.", 1, country
				.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-2] Positive Case : Country : Movie = 1:m 이고 단방향 관계. Country 관련
	 * Hibernate Mapping XML 파일 내에 inverse="true", cascade 속성 정의하지 않음. <br/>
	 * Country, Movie 등록을 위한 2번의 INSERT문이 실행된다. 이 경우 Country : Movie가 단방향 관계에
	 * 있으므로, movie.setCountry(country); 코드를 수행할 수 없게 된다. 따라서 Movie INSERT 시점에
	 * COUNTRY_CODE 정보를 'CTR-0001'로 셋팅해 줄 수 없어 Country와 Movie 사이의 Relation
	 * 정보가 셋팅되지 않는다. <br/> 이와 같은 경우에서는 Movie Mapping File 내에 COUNTRY_CODE 칼럼을 위한
	 * 별도 속성 정보를 정의하고, Movie 등록시에 countryCode를 셋팅해 줌으로써 두 객체 사이의 관계를 유지시킬 수 있도록
	 * 해야 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryMovieWithoutCascade() throws Exception {
		// 1. make init data
		newSession("org/anyframe/hibernate/inverse/unidirection/hibernate-without-cascade.cfg.xml");
		Country country = makeCountry();
		Movie movie = makeMovie();

		// country.getMovies().add(movie);
		// movie.setCountry(country);

		// 2. try to insert a country, movie
		session.save(country);
		// movie.setCountryCode(country.getCountryCode());
		session.save(movie);
		closeSession();

		// 3. check
		newSession();
		country = (Country) session.get(Country.class, "CTR-0001");
		assertEquals("fail to match the size of movie list.", 0, country
				.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-3] Positive Case : Country : Movie = 1:m 이고 단방향 관계. Country 관련
	 * Hibernate Mapping XML 파일 내에 inverse="false", cascade="save-update"로 정의함.
	 * <br/> cascade 속성에 의해 별도의 session.save(movie) 로직을 정의하지 않아도 기본적으로 Country와
	 * 함께 Movie 정보를 등록하기 위해 2번의 INSERT문이 실행된다 또한, inverse="false"이므로
	 * country.getMovies().add(movie); 코드 수행으로 인해 MOVIE 테이블의 COUNTRY_CODE 정보가
	 * null -> 'CTR-0001'로 셋팅하기 위해 UPDATE 쿼리가 추가적으로 실행된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryMovieWithoutInverse() throws Exception {
		// 1. make init data
		newSession("org/anyframe/hibernate/inverse/unidirection/hibernate-without-inverse.cfg.xml");
		Country country = makeCountry();
		Movie movie = makeMovie();

		// 2. try to make a relation between country and movie
		country.getMovies().add(movie);
		// movie.setCountry(country);

		// 3. try to insert a country
		session.save(country);
		closeSession();

		// 4. check
		newSession();
		country = (Country) session.get(Country.class, "CTR-0001");
		assertEquals("fail to match the size of movie list.", 1, country
				.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-4] Positive Case : Country : Movie = 1:m 이고 단방향 관계. Country 관련
	 * Hibernate Mapping XML 파일 내에 inverse="true", cascade="save-update"로 정의함.
	 * <br/> cascade 속성에 의해 별도의 session.save(movie) 로직을 정의하지 않아도 Country와 함께
	 * Movie 정보를 등록하기 위해 2번의 INSERT문이 실행된다. 이 경우 Country : Movie가 단방향 관계에 있으므로,
	 * movie.setCountry(country); 코드를 수행할 수 없게 된다. 따라서 Movie INSERT 시점에
	 * COUNTRY_CODE 정보를 'CTR-0001'로 셋팅해 줄 수 없어 Country와 Movie 사이의 Relation
	 * 정보가 셋팅되지 않는다. <br/> 이와 같은 경우에서는 Movie Mapping File 내에 COUNTRY_CODE 칼럼을 위한
	 * 별도 속성 정보를 정의하고, Movie 등록시에 countryCode를 셋팅해 줌으로써 두 객체 사이의 관계를 유지시킬 수 있도록
	 * 해야 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryMovie() throws Exception {
		// 1. make init data
		newSession("org/anyframe/hibernate/inverse/unidirection/hibernate.cfg.xml");
		Country country = makeCountry();
		Movie movie = makeMovie();

		// 2. try to make a relation between country and movie
		country.getMovies().add(movie);
		// 3. try to make a relation between movie and country
		// movie.setCountry(country);

		// 4. try to insert a country
		session.save(country);
		closeSession();

		// 4. check
		newSession();
		country = (Country) session.get(Country.class, "CTR-0001");
		assertEquals("fail to match the size of movie list.", 0, country
				.getMovies().size());
		closeSession();
	}

	private Country makeCountry() {
		Country country = new Country();
		String countryCode = "CTR-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		return country;
	}

	private Movie makeMovie() {
		Movie movie = new Movie();
		movie.setMovieId("MV-00001");
		movie.setDirector("Jaeyong Gwak");
		movie.setReleaseDate(DateUtil.string2Date("2001-07-27", "yyyy-MM-dd"));
		movie.setTitle("My Sassy Girl");

		return movie;
	}
}
