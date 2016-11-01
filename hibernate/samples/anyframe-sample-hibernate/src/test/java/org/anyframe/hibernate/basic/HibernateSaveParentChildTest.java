package org.anyframe.hibernate.basic;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.anyframe.util.DateUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateSaveParentChildTest<br>
 * <br>
 * [Description] : 1:n 관계에 놓여 있는 Country:Movie를 대상으로 여러 가지 유형의 순서에 따라 등록 작업을
 * 수행시켜 본다. 이 때, DEBUG 모드에서 각 순서에서 수행되는 쿼리문을 확인해 볼 것을 권장한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : 1:n 관계에 놓여 있는 Country:Movie를 대상으로 주어진 순서에 따라
 * Category와 Movie 정보를 등록한 후, 추가 작업이 제대로 이루어졌는지 확인한다.</li>
 * <li>#-2 Positive Case : 1:n 관계에 놓여 있는 Country:Movie를 대상으로 주어진 순서에 따라
 * Category와 Movie 정보를 등록한 후, 추가 작업이 제대로 이루어졌는지 확인한다.</li>
 * <li>#-3 Positive Case : 1:n 관계에 놓여 있는 Country:Movie를 대상으로 주어진 순서에 따라
 * Category와 Movie 정보를 등록한 후, 추가 작업이 제대로 이루어졌는지 확인한다.</li>
 * <li>#-4 Positive Case : 1:n 관계에 놓여 있는 Country:Movie를 대상으로 주어진 순서에 따라
 * Category와 Movie 정보를 등록한 후, 추가 작업이 제대로 이루어졌는지 확인한다.</li>
 * <li>#-5 Positive Case : 1:n 관계에 놓여 있는 Country:Movie를 대상으로 주어진 순서에 따라
 * Category와 Movie 정보를 등록한 후, 추가 작업이 제대로 이루어졌는지 확인한다.</li>
 * </ul>
 * (*테스트 케이스의 주어진 순서는 각 메소드 주석을 참고한다.)
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateSaveParentChildTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : 이 테스트케이스는 1:n 관계에 놓여 있는 Country:Movie를 대상으로
	 * 하며, 다음과 같이 진행된다.
	 * <ol>
	 * <li>Session 시작</li>
	 * <li>Country instance 생성</li>
	 * <li>Movie instance들 생성</li>
	 * <li>Country와 Movies 사이에 연관 관계 맺음</li>
	 * <li>session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Session 종료</li>
	 * </ol>
	 * 위와 같은 순서로 데이터 추가 작업이 완료된 후에는 추가 작업이 제대로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryMovieAtOnce() throws Exception {
		// 1. start a new session and transaction, insert init data, end
		// transaction and session
		newSession();
		String countryCode = addCountryMovieAtOnce();
		closeSession();

		// 2. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Korea", country.getCountryName());
		Assert.assertEquals(2, country.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-2] Positive Case : 이 테스트케이스는 1:n 관계에 놓여 있는 Country:Movie를 대상으로
	 * 하면, 다음과 같이 진행된다.
	 * <ol>
	 * <li>Session 시작</li>
	 * <li>Country instance 생성후, session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Movie instance들 생성</li>
	 * <li>Country와 Movies 사이에 연관 관계 맺음</li>
	 * <li>session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Session 종료</li>
	 * </ol>
	 * 위와 같은 순서로 데이터 추가 작업이 완료된 후에는 추가 작업이 제대로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryAndMovies() throws Exception {
		// 1. start a new session and transaction, insert init data, end
		// transaction and session
		newSession();
		String countryCode = addCountryAndMovies();
		closeSession();

		// 2. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Republic of Korea", country.getCountryName());
		Assert.assertEquals(2, country.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-3] Positive Case : 이 테스트케이스는 1:n 관계에 놓여 있는 Country:Movie를 대상으로
	 * 하면, 다음과 같이 진행된다.
	 * <ol>
	 * <li>Session 시작</li>
	 * <li>Country instance 생성후, session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Session 종료</li>
	 * <li>Session 시작</li>
	 * <li>Movie instance들 생성</li>
	 * <li>Country와 Movies 사이에 연관 관계 맺음</li>
	 * <li>session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Session 종료</li>
	 * </ol>
	 * 위와 같은 순서로 데이터 추가 작업이 완료된 후에는 추가 작업이 제대로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCategory() throws Exception {
		// 1. start a new session and transaction, insert init data (country),
		// end transaction and session
		newSession();
		String countryCode = addCountry();
		closeSession();

		// 2. start a new session again, insert init data (movies), end
		// transaction and session
		newSession();
		addMovies(countryCode);
		closeSession();

		// 2. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Republic of Korea", country.getCountryName());
		Assert.assertEquals(2, country.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-4] Positive Case : 이 테스트케이스는 1:n 관계에 놓여 있는 Country:Movie를 대상으로
	 * 하면, 다음과 같이 진행된다.
	 * <ol>
	 * <li>Session 시작</li>
	 * <li>Country instance 생성후, session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Session 종료</li>
	 * <li>Session 시작</li>
	 * <li>Movie instance들 생성</li>
	 * <li>Country와 Movies 사이에 연관 관계 맺음</li>
	 * <li>session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Session 종료</li>
	 * <li>Session 시작</li>
	 * <li>해당 Country와 연관 관계에 있는 Movie 각각에 대해 수정함.</li>
	 * <li>해당 Country와 연관 관계에 있는 Movie Set으로부터 마지막 Movie instance 제거.</li>
	 * <li>session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Session 종료</li>
	 * </ol>
	 * 위와 같은 순서로 데이터 추가 작업이 완료된 후에는 추가 작업이 제대로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testUpdateMovies() throws Exception {
		// 1. start a new session and transaction, insert init data (country),
		// end transaction and session
		newSession();
		String countryCode = addCountry();
		closeSession();

		// 2. start a new session again, insert init data (movies), end
		// transaction and session
		newSession();
		addMovies(countryCode);
		closeSession();

		// 3. start a new session again, update data (movies), end
		// transaction and session
		newSession();
		updateMovies(countryCode);
		closeSession();

		// 4. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Republic of Korea", country.getCountryName());
		// movie 데이터가 삭제되지 않았음.
		Assert.assertEquals(2, country.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-5] Positive Case : 이 테스트케이스는 1:n 관계에 놓여 있는 Country:Movie를 대상으로
	 * 하면, 다음과 같이 진행된다.
	 * <ol>
	 * <li>Session 시작</li>
	 * <li>Country instance 생성후, session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Movie instance들 생성</li>
	 * <li>Country와 Movies 사이에 연관 관계 맺음</li>
	 * <li>session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Session 종료</li>
	 * <li>Session 시작</li>
	 * <li>해당 Country와 연관 관계에 있는 Movie 각각에 대해 수정함.</li>
	 * <li>신규 Movie instance 생성</li>
	 * <li>신규 Movie와 해당 Country 사이에 연관 관계 맺음</li>
	 * <li>session.save() 호출을 통해 DB에 반영 요청</li>
	 * <li>Session 종료</li>
	 * </ol>
	 * 위와 같은 순서로 데이터 추가 작업이 완료된 후에는 추가 작업이 제대로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testUpdateMovieAddMovieAtOnce() throws Exception {
		// 1. start a new session and transaction, insert init data, end
		// transaction and session
		newSession();
		String countryCode = addCountryAndMovies();
		closeSession();

		// 2. start a new session again, insert init data (movies), end
		// transaction and session
		newSession();
		updateMoveAddMovieAtOnce(countryCode);
		closeSession();

		// 2. assert country information with another session
		newSession();
		Country country = (Country) session.get(Country.class, countryCode);
		Assert.assertEquals("Republic of Korea", country.getCountryName());
		Assert.assertEquals(3, country.getMovies().size());
		closeSession();
	}

	private String addCountryMovieAtOnce() throws Exception {
		// 1. insert a country information with movies
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("Jaeyong Gwak");
		movie1.setReleaseDate(DateUtil.string2Date("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.string2Date("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");

		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Set movies = new HashSet();
		movie1.setCountry(country1);
		movies.add(movie1);
		movie2.setCountry(country1);
		movies.add(movie2);
		country1.setMovies(movies);

		session.save(country1);

		return countryCode;
	}

	private String addCountryAndMovies() throws Exception {
		// 1. insert a country information without movies
		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");
		session.save(country1);

		// 2. update country information
		country1.setCountryName("Republic of Korea");

		// 3. make movie list and related to country. insert a country
		// information
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("Jaeyong Gwak");
		movie1.setReleaseDate(DateUtil.string2Date("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.string2Date("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");

		Set movies = new HashSet();
		movie1.setCountry(country1);
		movies.add(movie1);
		movie2.setCountry(country1);
		movies.add(movie2);
		country1.setMovies(movies);
		session.save(country1);

		return countryCode;
	}

	private String addCountry() throws Exception {
		// 1. insert a country information without movies
		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");
		session.save(country1);

		return countryCode;
	}

	private void addMovies(String countryCode) throws Exception {
		Country country = (Country) session.get(Country.class, countryCode);
		country.setCountryName("Republic of Korea");

		// 1. make movie list and related to country. insert a country
		// information
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("Jae Gwak");
		movie1.setReleaseDate(DateUtil.string2Date("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.string2Date("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");

		Set movies = new HashSet();
		movie1.setCountry(country);
		movies.add(movie1);
		movie2.setCountry(country);
		movies.add(movie2);
		country.setMovies(movies);

		session.save(country);
	}

	/**
	 * 특정 Country에 속한 Movie 목록을 조회한 후, Movie 정보를 수정한다. 이때, 제일 마지막으로 조회된 Movie
	 * 정보를 Movie Set에서 제거한 후, 저장한다. 이러한 경우 Movie Set으로부터 마지막 데이터를 제거하여도 수정된 전체
	 * Movie 객체에 대한 수정 작업이 이루어진다. 그러나 만일, Movie Set이 <composite-element> 형태로
	 * 정의되어 있다면, Movie Set으로부터 제거된 마지막 데이터는 DB로부터 삭제된다는 것에 유의해야 한다. <br/> 마지막으로
	 * 조회된 Movie 정보를 수정 대상에서 제외하고자 하는 경우에는 Session.evict(movie)를 호출함으로써, 해당 객체의
	 * 변경 사항이 DB에 반영되지 않도록 할 수 있다.
	 * 
	 * @param countryCode
	 * @throws Exception
	 */
	private void updateMovies(String countryCode) throws Exception {
		Country country = (Country) session.get(Country.class, countryCode);

		Set movies = country.getMovies();
		Iterator movieItr = movies.iterator();

		Movie movie = null;

		// 1. update all movies
		while (movieItr.hasNext()) {
			movie = (Movie) movieItr.next();
			movie.setTitle("UPD" + movie.getTitle());
		}

		// 2. extract a last movie from movie set
		movies.remove(movie);
		session.update(country);
	}

	private void updateMoveAddMovieAtOnce(String countryCode) throws Exception {
		Country country = (Country) session.get(Country.class, countryCode);

		Set movies = country.getMovies();
		Iterator movieItr = movies.iterator();

		Movie movie = null;

		// 1. update all movies
		while (movieItr.hasNext()) {
			movie = (Movie) movieItr.next();
			movie.setTitle("UPD" + movie.getTitle());
		}

		// 2. add a new movie
		Movie movie3 = new Movie();
		movie3.setMovieId("MV-00003");
		movie3.setDirector("Jiun Kim");
		movie3.setReleaseDate(DateUtil.string2Date("2008-07-17", "yyyy-MM-dd"));
		movie3.setTitle("The Good,The Bad,The Weird");
		movie3.setCountry(country);

		movies.add(movie3);

		session.save(country);
	}
}
