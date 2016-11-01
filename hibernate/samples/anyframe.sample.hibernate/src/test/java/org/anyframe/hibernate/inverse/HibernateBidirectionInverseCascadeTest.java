package org.anyframe.hibernate.inverse;

import org.anyframe.hibernate.AbstractTest;
import org.anyframe.sample.hibernate.model.bidirection.inverse.Country;
import org.anyframe.sample.hibernate.model.bidirection.inverse.Movie;
import org.anyframe.util.DateUtil;

/**
 * TestCase Name : HibernateBidirectionInverseCascadeTest<br>
 * <br>
 * [Description] : 1:m 관계에 놓인 두 객체가 양방향 관계일 경우 inverse, cascade 속성 정의에 따라 실행되는
 * 쿼리문이 달라짐을 확인할 수 있다. 또한 이 테스트케이스 결과를 통해 양방향 관계에서 inverse, cascade를 어떻게 활용해야 할
 * 지 알 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Country : Movie = 1:m 이고 양방향 관계. Country 관련
 * Hibernate Mapping XML 파일 내에 inverse="false", cascade 속성 정의하지 않음</li>
 * <li>#-2 Positive Case : Country : Movie = 1:m 이고 양방향 관계. Country 관련
 * Hibernate Mapping XML 파일 내에 inverse="true", cascade 속성 정의하지 않음.</li>
 * <li>#-3 Positive Case : Country : Movie = 1:m 이고 양방향 관계. Country 관련
 * Hibernate Mapping XML 파일 내에 inverse="false", cascade="save-update"로 정의함.</li>
 * <li>#-4 Positive Case : Country : Movie = 1:m 이고 양방향 관계. Country 관련
 * Hibernate Mapping XML 파일 내에 inverse="true", cascade="save-update"로 정의함.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateBidirectionInverseCascadeTest extends AbstractTest {

	/**
	 * [Flow #-1] Positive Case : Country : Movie = 1:m 이고 양방향 관계. Country 관련
	 * Hibernate Mapping XML 파일 내에 inverse="false", cascade 속성 정의하지 않음. <br/>
	 * 기본적으로 Country, Movie 각각을 추가하기 위해 2번의 INSERT 문이 수행된다. 또한,
	 * inverse="false'이므로 country.getMovies().add(movie); 코드 수행으로 인해 MOVIE 테이블의
	 * COUNTRY_CODE 정보가 null -> 'CTR-0001'로 셋팅하기 위한 UPDATE 쿼리가 추가적으로 실행된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryMovieWithoutInverseCascade() throws Exception {
		// 1. make init data
		newSession("org/anyframe/hibernate/inverse/bidirection/hibernate-without-inversecascade.cfg.xml");
		Country country = makeCountry();
		Movie movie = makeMovie();

		// 2. try to make a relation between country and movie
		country.getMovies().add(movie);
		// movie.setCountry(country);

		// 3. try to insert a country, movie
		session.save(country);
		session.save(movie);

		closeSession();
	}

	/**
	 * [Flow #-2] Positive Case : Country : Movie = 1:m 이고 양방향 관계. Country 관련
	 * Hibernate Mapping XML 파일 내에 inverse="true", cascade 속성 정의하지 않음. <br/>
	 * 기본적으로 Country, Movie 각각을 추가하기 위해 2번의 INSERT 문이 수행된다. Movie INSERT 시점에는
	 * movie.setCountry(country); 코드 수행으로 인해 COUNTRY_CODE 정보가 null이 아닌
	 * 'CTR-0001'로 셋팅되어 있다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryMovieWithoutCascade() throws Exception {
		// 1. make init data
		newSession("org/anyframe/hibernate/inverse/bidirection/hibernate-without-cascade.cfg.xml");
		Country country = makeCountry();
		Movie movie = makeMovie();

		// 2. try to make a relation between movie and country
		// country.getMovies().add(movie);
		movie.setCountry(country);

		// 3. try to insert a country, movie
		session.save(country);
		session.save(movie);

		closeSession();
	}

	/**
	 * [Flow #-3] Positive Case : Country : Movie = 1:m 이고 양방향 관계. Country 관련
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
		newSession("org/anyframe/hibernate/inverse/bidirection/hibernate-without-inverse.cfg.xml");
		Country country = makeCountry();
		Movie movie = makeMovie();

		// 2. try to make a relation between country and movie
		country.getMovies().add(movie);
		// movie.setCountry(country);

		// 3. try to insert a country
		session.save(country);

		closeSession();
	}

	/**
	 * [Flow #-4] Positive Case : Country : Movie = 1:m 이고 양방향 관계. Country 관련
	 * Hibernate Mapping XML 파일 내에 inverse="true", cascade="save-update"로 정의함.
	 * <br/> cascade 속성에 의해 별도의 session.save(movie) 로직을 정의하지 않아도 Country와 함께
	 * Movie 정보를 등록하기 위해 2번의 INSERT문이 실행된다. 이 경우 movie.setCountry(country); 코드
	 * 수행으로 인해 Movie INSERT 시점에 COUNTRY_CODE 정보가 'CTR-0001'로 셋팅되어 있다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryMovie() throws Exception {
		// 1. make init data
		newSession("org/anyframe/hibernate/inverse/bidirection/hibernate.cfg.xml");
		Country country = makeCountry();
		Movie movie = makeMovie();

		// 2. try to make a relation between country and movie
		country.getMovies().add(movie);
		// 3. try to make a relation between movie and country
		movie.setCountry(country);

		// 4. try to insert a country
		session.save(country);

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
