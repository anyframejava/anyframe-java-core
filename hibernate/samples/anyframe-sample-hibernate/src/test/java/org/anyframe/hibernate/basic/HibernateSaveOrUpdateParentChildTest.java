package org.anyframe.hibernate.basic;

import java.util.HashSet;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.anyframe.util.DateUtil;
import org.hibernate.HibernateException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateSaveOrUpdateParentChildTest<br>
 * <br>
 * [Description] : 두 객체간의 관계가 1:m 인 관계에 있을 때, 1 측의 신규 객체에 대해 save(), update(),
 * saveOrUpdate() 메소드 호출을 통해 등록/수정 여부를 체크한다. 또한 기 등록된 1 측에 속한 객체를 통해 신규 m 측의 객체에
 * 대해서도 동일하게 save(), update(), saveOrUpdate() 메소드 호출을 통해 차이점을 살펴본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은 Country
 * 정보에 대해 update() 메소드를 호출하여 본다.</li>
 * <li>#-2 Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은 Country
 * 정보에 대해 save() 메소드를 호출하여 본다.</li>
 * <li>#-3 Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은 Country
 * 정보에 대해 saveOrUpdate() 메소드를 호출하하여 본다.</li>
 * <li>#-4 Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은 Country
 * 정보를 추가한 후, Movie 정보에 대해 update() 메소드를 호출하여 본다.</li>
 * <li>#-5 Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은 Country
 * 정보를 추가한 후, Movie 정보에 대해 save() 메소드를 호출하여 본다.</li>
 * <li>#-6 Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은 Country
 * 정보를 추가한 후, Movie 정보에 대해 saveOrUpdate() 메소드를 호출하여 본다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateSaveOrUpdateParentChildTest extends
		AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은
	 * Country 정보에 대해 update() 메소드를 호출하였을 경우, 해당 객체가 DB에 존재하지 않으므로 Transaction
	 * commit 수행시 Exception이 throw된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryCallingUpdate() throws Exception {
		// 1. start a new session and transaction
		newSession();

		// 2. try to insert a country information without movies
		Country country1 = makeNewCountry();
		session.update(country1);

		// 3. close session
		try {
			closeSession();
			Assert.fail("expected throw HibernateException");
		} catch (Exception e) {
			Assert.assertTrue("fail to check exception type.",
					e instanceof HibernateException);
		}
	}

	/**
	 * [Flow #-2] Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은
	 * Country 정보에 대해 save() 메소드를 호출하였을 경우, 해당 객체가 DB에 존재하지 않으므로 Transaction
	 * commit 수행시 해당 객체에 대해 INSERT문이 실행된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryCallingSave() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.save(country1);
		closeSession();

		// 2. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		closeSession();
	}

	/**
	 * [Flow #-3] Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은
	 * Country 정보에 대해 saveOrUpdate() 메소드를 호출하였을 경우, 해당 객체가 DB에 존재하지 않으므로
	 * Transaction commit 수행시 해당 객체에 대해 INSERT문이 실행된다. 해당 객체가 DB에 존재하는 경우에는 객체의
	 * 정보가 수정된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryCallingSaveOrUpdate() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.saveOrUpdate(country1);
		closeSession();

		// 2. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		closeSession();
	}

	/**
	 * [Flow #-4] Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은
	 * Country 정보를 추가한 후, Movie 정보에 대해 update() 메소드를 호출하였을 경우, 해당 객체가 DB에 존재하지
	 * 않으므로 Transaction commit 수행시 해당 객체에 대해 INSERT문이 실행된다. 해당 객체가 DB에 존재하는 경우에는
	 * 객체의 정보가 수정된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddMoviesCallingUpdate() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.save(country1);
		closeSession();

		// 2. try to insert a country information with movies.
		newSession();
		Country country2 = makeNewMovieSet(country1.getCountryCode());
		session.update(country2);
		closeSession();

		// 3. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		Assert.assertEquals("fail to match the size of movie list", 2, result
				.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-5] Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은
	 * Country 정보를 추가한 후, Movie 정보에 대해 save() 메소드를 호출하였을 경우, 해당 객체가 DB에 존재하지
	 * 않으므로 Transaction commit 수행시 해당 객체에 대해 INSERT문이 실행된다. 해당 객체가 DB에 존재하는 경우에는
	 * 객체의 정보가 수정된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddMoviesCallingSave() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.save(country1);
		closeSession();

		// 2. try to insert a country information with movies.
		newSession();
		Country country2 = makeNewMovieSet(country1.getCountryCode());
		session.save(country2);
		closeSession();

		// 3. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		Assert.assertEquals("fail to match the size of movie list", 2, result
				.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-6] Positive Case : Country:Movie = 1:m 관계에 있을 때, DB에 추가되어 있지 않은
	 * Country 정보를 추가한 후, Movie 정보에 대해 saveOrUpdate() 메소드를 호출하였을 경우, 해당 객체가 DB에
	 * 존재하지 않으므로 Transaction commit 수행시 해당 객체에 대해 INSERT문이 실행된다. 해당 객체가 DB에 존재하는
	 * 경우에는 객체의 정보가 수정된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddMoviesCallingSaveOrUpdate() throws Exception {
		// 1. try to insert a country information without movies
		newSession();
		Country country1 = makeNewCountry();
		session.save(country1);
		closeSession();

		// 2. try to insert a country information with movies.
		newSession();
		Country country2 = makeNewMovieSet(country1.getCountryCode());
		session.saveOrUpdate(country2);
		closeSession();

		// 3. assert
		newSession();
		Country result = (Country) session.get(Country.class, country1
				.getCountryCode());
		Assert.assertEquals("fail to match the name of country.", "Korea", result
				.getCountryName());
		Assert.assertEquals("fail to match the size of movie list", 2, result
				.getMovies().size());
		closeSession();
	}

	private Country makeNewMovieSet(String countryCode) {
		Country country = (Country) session.get(Country.class, countryCode);

		// 1. make movie list and related to country. insert a country
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
		movie1.setCountry(country);
		movies.add(movie1);
		movie2.setCountry(country);
		movies.add(movie2);
		country.setMovies(movies);

		return country;
	}

	private Country makeNewCountry() {
		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		return country1;
	}
}
