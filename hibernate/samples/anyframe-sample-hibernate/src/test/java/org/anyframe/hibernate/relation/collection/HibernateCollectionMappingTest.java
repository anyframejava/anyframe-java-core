package org.anyframe.hibernate.relation.collection;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.anyframe.hibernate.AbstractTest;
import org.anyframe.sample.hibernate.model.unidirection.Movie;
import org.anyframe.sample.hibernate.model.unidirection.relation.collection.CountryWithBag;
import org.anyframe.sample.hibernate.model.unidirection.relation.collection.CountryWithIdBag;
import org.anyframe.sample.hibernate.model.unidirection.relation.collection.CountryWithList;
import org.anyframe.sample.hibernate.model.unidirection.relation.collection.CountryWithMap;
import org.anyframe.sample.hibernate.model.unidirection.relation.collection.CountryWithSet;
import org.anyframe.util.DateUtil;

/**
 * TestCase Name : HibernateCollectionMappingTest<br>
 * <br>
 * [Description] : 1:m 관계에 놓인 두 객체에 대해 m 측의 객체를 매핑하기 위한 데이터 형태(Set, List, Map,
 * Bag, IdBag)와 각 데이터 형태별 처리 방법의 차이에 대해 알아본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에 속한
 * Movie Collection을 Set 형태로 매핑한 후 신규 Country 정보를 등록한다. 이때, Movie Collection은
 * Set 형태로 관리되므로, 중복된 데이터가 존재하지 않고 순서가 없다. </li>
 * <li>#-2 Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에 속한
 * Movie Collection을 List 형태로 매핑한 후 신규 Country 정보를 등록한다. 이때, Movie Collection은
 * List 형태로 관리되므로, 순서가 관리된다.</li>
 * <li>#-3 Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에 속한
 * Movie Collection을 Map 형태로 매핑한 후 신규 Country 정보를 등록한다. 이때, Movie Collection은
 * Map 형태로 관리되므로, (key, value) 형태로 저장된다.</li>
 * <li>#-4 Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에 속한
 * Movie Collection을 Bag(Collection) 형태로 매핑한 후 신규 Country 정보를 등록한다. Bag은 Set과
 * 비슷하나 Country에 속한 모든 Movie 객체를 로드하지 않고도 신규 Movie 객체를 추가할 수 있으므로 성능면에서 유리하다.</li>
 * <li>#-5 Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에 속한
 * Movie Collection을 IdBag(Collection) 형태로 매핑한 후 신규 Country 정보를 등록한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateCollectionMappingTest extends AbstractTest {

	/**
	 * [Flow #-1] Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에
	 * 속한 Movie Collection을 Set 형태로 매핑한 후 신규 Country 정보를 등록한다. 이때, Movie
	 * Collection은 Set 형태로 관리되므로, 중복된 데이터가 존재하지 않고 순서가 없다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddMovieWithSet() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/set/hibernate.cfg.xml");
		CountryWithSet country = new CountryWithSet();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		Set movieSet = new HashSet();
		movieSet.add(movies[0]);
		movieSet.add(movies[1]);
		movieSet.add(movies[2]);

		country.setMovies(movieSet);
		session.save(country);
		closeSession();

		// 2. assert
		newSession();
		CountryWithSet result = (CountryWithSet) session.get(
				CountryWithSet.class, countryCode);

		result.getMovies().add(makeAnotherMovie(countryCode));
		session.save(result);
		closeSession();

		newSession();
		result = (CountryWithSet) session
				.get(CountryWithSet.class, countryCode);
		assertEquals("fail to match the size of movie list.", 3, result
				.getMovies().size());

		closeSession();
	}

	/**
	 * [Flow #-2] Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에
	 * 속한 Movie Collection을 List 형태로 매핑한 후 신규 Country 정보를 등록한다. 이때, Movie
	 * Collection은 List 형태로 관리되므로, 순서가 관리된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddMovieWithList() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/list/hibernate.cfg.xml");
		CountryWithList country = new CountryWithList();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		List movieList = new ArrayList();
		movieList.add(movies[0]);
		movieList.add(movies[1]);
		movieList.add(movies[2]);

		country.setMovies(movieList);
		session.save(country);
		closeSession();

		// 2. assert
		newSession();
		CountryWithList result = (CountryWithList) session.get(
				CountryWithList.class, countryCode);
		result.getMovies().add(makeAnotherMovie(countryCode));
		session.save(result);
		closeSession();

		newSession();
		result = (CountryWithList) session.get(CountryWithList.class,
				countryCode);
		assertEquals("fail to match the size of movie list.", 4, result
				.getMovies().size());
		assertEquals("fail to match the id of movie.", "MV-00001",
				((Movie) result.getMovies().get(0)).getMovieId());
		closeSession();
	}

	/**
	 * [Flow #-3] Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에
	 * 속한 Movie Collection을 Map 형태로 매핑한 후 신규 Country 정보를 등록한다. 이때, Movie
	 * Collection은 Map 형태로 관리되므로, (key, value) 형태로 저장된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddMovieWithMap() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/map/hibernate.cfg.xml");
		CountryWithMap country = new CountryWithMap();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		Map movieMap = new HashMap();
		movieMap.put("first", movies[0]);
		movieMap.put("second", movies[1]);
		movieMap.put("third", movies[2]);

		country.setMovies(movieMap);
		session.save(country);
		closeSession();

		// 2. assert
		newSession();
		CountryWithMap result = (CountryWithMap) session.get(
				CountryWithMap.class, countryCode);
		result.getMovies().put("third", makeAnotherMovie(countryCode));
		session.save(result);
		closeSession();

		newSession();
		result = (CountryWithMap) session
				.get(CountryWithMap.class, countryCode);
		assertEquals("fail to match the size of movie list.", 3, result
				.getMovies().size());
		Movie movie = (Movie) result.getMovies().get("second");
		assertEquals("fail to match the movie id.", "MV-00002", movie
				.getMovieId());
		closeSession();
	}

	/**
	 * [Flow #-4] Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에
	 * 속한 Movie Collection을 Bag(Collection) 형태로 매핑한 후 신규 Country 정보를 등록한다. Bag은
	 * Set과 비슷하나 Country에 속한 모든 Movie 객체를 로드하지 않고도 신규 Movie 객체를 추가할 수 있으므로 성능면에서
	 * 유리하다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddMovieWithBag() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/bag/hibernate.cfg.xml");
		CountryWithBag country = new CountryWithBag();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		List movieList = new ArrayList();
		movieList.add(movies[0]);
		movieList.add(movies[1]);
		movieList.add(movies[2]);

		country.setMovies(movieList);
		session.save(country);
		closeSession();

		// 2. assert
		newSession();
		CountryWithBag result = (CountryWithBag) session.get(
				CountryWithBag.class, countryCode);
		result.getMovies().add(makeAnotherMovie(countryCode));
		session.save(result);
		closeSession();

		newSession();
		result = (CountryWithBag) session
				.get(CountryWithBag.class, countryCode);
		assertEquals("fail to match the size of movie list.", 3, result
				.getMovies().size());
		closeSession();
	}

	/**
	 * [Flow #-5] Positive Case : Country : Movie = 1 : m 관계에 놓여 있고, 특정 Country에
	 * 속한 Movie Collection을 IdBag(Collection) 형태로 매핑한 후 신규 Country 정보를 등록한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddMovieWithIdBag() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/idbag/hibernate.cfg.xml");
		CountryWithIdBag country = new CountryWithIdBag();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		List movieList = new ArrayList();
		movieList.add(movies[0]);
		movieList.add(movies[1]);
		movieList.add(movies[2]);

		country.setMovies(movieList);
		session.save(country);
		closeSession();

		// 2. assert
		newSession();
		CountryWithIdBag result = (CountryWithIdBag) session.get(
				CountryWithIdBag.class, countryCode);
		result.getMovies().add(makeAnotherMovie(countryCode));
		session.save(result);
		closeSession();

		newSession();
		result = (CountryWithIdBag) session.get(CountryWithIdBag.class,
				countryCode);
		assertEquals("fail to match the size of movie list.", 4, result
				.getMovies().size());
		closeSession();
	}

	private Movie makeAnotherMovie(String countryCode) throws Exception {
		Movie movie3 = new Movie();
		movie3.setMovieId("MV-00003");
		movie3.setDirector("김지운");
		movie3.setReleaseDate(DateUtil.string2Date("2008-07-17", "yyyy-MM-dd"));
		movie3.setTitle("The Good, The Bad, The Weird");
		movie3.setCountryCode(countryCode);

		return movie3;
	}

	private Movie[] makeMovies(String countryCode) throws Exception {
		Movie[] movies = new Movie[3];
		// 1. insert a country information with movies
		Movie movie1 = new Movie();
		movie1.setCountryCode(countryCode);
		movie1.setMovieId("MV-00001");
		movie1.setDirector("Jaeyong Gwak");
		movie1.setReleaseDate(DateUtil.string2Date("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");
		movies[0] = movie1;

		Movie movie2 = new Movie();
		movie2.setCountryCode(countryCode);
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.string2Date("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");
		movies[1] = movie2;

		movies[2] = movie2;

		return movies;
	}
}
