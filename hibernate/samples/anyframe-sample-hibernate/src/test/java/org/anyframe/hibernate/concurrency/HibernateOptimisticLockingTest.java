package org.anyframe.hibernate.concurrency;

import java.util.HashSet;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.concurrency.optimistic.Country;
import org.anyframe.sample.hibernate.model.bidirection.concurrency.optimistic.Movie;
import org.anyframe.util.DateUtil;
import org.hibernate.StaleObjectStateException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateOptimisticLockingTest <br>
 * <br>
 * [Description] : Optimistic Locking 테스트를 수행해본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : VERSION 필드를 가진 Country. 첫번째 트랜잭션 내에서 테스트를 위한 신규 데이터를
 * 입력한 후, 두번째 트랜잭션 내에서 동일한 식별자를 이용하여 Country 정보를 두번 조회한다. 두번째 트랜잭션이 종료된 후에 앞서
 * 조회한 Country의 countryName을 다른 것으로 셋팅해둔다. 세번째 트랜잭션 내에서는 두번째 조회한 Country 정보에 다른
 * countryName을 셋팅하여 DB에 반영한다. <br/> 네번째 트랜잭션에서 첫번째 조회한 Country 정보에 대해 update()
 * 메소드를 호출해본다.</li>
 * <li>#-2 Negative Case : VERSION 필드를 가지지 않은 Movie. 첫번째 트랜잭션 내에서 테스트를 위한 신규
 * 데이터를 입력한 후, 두번째 트랜잭션 내에서 동일한 식별자를 이용하여 Movie 정보를 두번 조회한다. 두번째 트랜잭션이 종료된 후에 앞서
 * 조회한 Movie의 title을 다른 것으로 셋팅해둔다. 세번째 트랜잭션 내에서는 두번째 조회한 Movie 정보에 다른 title을
 * 셋팅하여 DB에 반영한다. <br/> 네번째 트랜잭션에서 첫번째 조회한 Movie 정보에 대해 update() 메소드를 호출해본다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateOptimisticLockingTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/concurrency/hibernate-optimistic.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : 첫번째 트랜잭션 내에서 테스트를 위한 신규 데이터를 입력한 후, 두번째 트랜잭션
	 * 내에서 동일한 식별자를 이용하여 Country 정보를 두번 조회한다. 두번째 트랜잭션이 종료된 후에 앞서 조회한 Country의
	 * countryName을 다른 것으로 셋팅해둔다. 세번째 트랜잭션 내에서는 두번째 조회한 Country 정보에 다른
	 * countryName을 셋팅하여 DB에 반영한다. <br/> 네번째 트랜잭션에서 첫번째 조회한 Country 정보에 대해
	 * update() 메소드를 호출해본다. 이때, 세번째 트랜잭션에서의 수정으로 인해 COUNTRY_VERSION이 이미 변경되었기
	 * 때문에 StaleObjectStateException 발생이 예상된다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testUpdateCountryWithOptimisticLocking() throws Exception {
		// 1. insert a new country, movies information
		newSession();
		addCountryMovieAtOnce();
		closeSession();

		// 2. select a country
		newSession();
		Country fstCountry = (Country) session.get(Country.class,
				"CTR-0001");
		Assert.assertEquals("fail to check a version of country.", 0, fstCountry
				.getVersion());
		Country scdCountry = (Country) session.get(Country.class,
				"CTR-0001");
		closeSession();

		// 3. set country name
		fstCountry.setCountryName("First : Republic of Korea.");

		// 4. select a country again with same id and update country name
		newSession();
		scdCountry.setCountryName("Second : Republic of Korea.");
		closeSession();

		// 5. try to update with detached object
		newSession();
		try {
			session.update(fstCountry);
			closeSession();
		} catch (Exception e) {
			e.printStackTrace();
			Assert.assertTrue("fail to throw StaleObjectStateException.",
					e instanceof StaleObjectStateException);
		}
	}

	/**
	 * [Flow #-2] Negative Case : 첫번째 트랜잭션 내에서 테스트를 위한 신규 데이터를 입력한 후, 두번째 트랜잭션
	 * 내에서 동일한 식별자를 이용하여 Movie 정보를 두번 조회한다. 두번째 트랜잭션이 종료된 후에 앞서 조회한 Movie의
	 * title을 다른 것으로 셋팅해둔다. 세번째 트랜잭션 내에서는 두번째 조회한 Movie 정보에 다른 title을 셋팅하여 DB에
	 * 반영한다. <br/> 네번째 트랜잭션에서 첫번째 조회한 Movie 정보에 대해 update() 메소드를 호출해본다. 이때, 네번째
	 * 트랜잭션에서의 수정이 정상적으로 처리되면서, 세번째 트랜잭션에서의 수정이 무효화되게 된다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testUpdateMovieWithoutOptimisticLocking() throws Exception {
		// 1. insert a new country, movies information
		newSession();
		addCountryMovieAtOnce();
		closeSession();

		// 2. select a country
		newSession();
		Movie fstMovie = (Movie) session.get(Movie.class, "MV-00001");
		Movie scdMovie = (Movie) session.get(Movie.class, "MV-00001");
		closeSession();

		// 3. set country name
		fstMovie.setTitle("First : My Sassy Girl");

		// 4. select a country again with same id and update country name
		newSession();
		scdMovie.setTitle("Second : My Sassy Girl");
		closeSession();

		// 5. try to update with detached object
		newSession();
		session.update(fstMovie);
		closeSession();
	}

	private String addCountryMovieAtOnce() throws Exception {
		// 1. insert a country information with movies
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("J.Y.Gwak");
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

}
