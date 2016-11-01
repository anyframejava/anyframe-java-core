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
 * [Description] : Data type(Set, List, Map, Bag, IdBag is to map m-side object
 * on two objects which has 1:m relation. Each data type and each handling way
 * are looked into. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Movie Collection has Country:Movie= 1:m relation and
 * belongs to a specific Country. After mapping this in the type of Set, new
 * Country information is registered. In this case, Movie Collection is managed
 * in the type of Set. Therefore, there is no repetitive data and no order.</li>
 * <li>#-2 Positive Case : Country : Movie Collection has Country:Movie= 1:m
 * relation and belongs to a specific Country. After mapping this in the type of
 * List, new Country information is registered. In this case, Movie Collection
 * is managed in the type of List. Therefore, order is managed.</li>
 * <li>#-3 Positive Case : Movie Collection has Country:Movie= 1:m relation and
 * belongs to a specific Country. After mapping this in the type of Map, new
 * Country information is registered. In this case, Movie Collection is managed
 * in the type of Map. Therefore, it is stored in the type of (key, value).</li>
 * <li>#-4 Positive Case : Movie Collection has Country : Movie = 1:m relation
 * and belongs to a specific Country. After mapping this in the type of
 * IdBag(Collection), new Country information is registered. Bag is similar to
 * Set. However, given that Bag can add new Movie object without loading all
 * Movie objects belonging to Country, it has advantage performance-wise.</li>
 * <li>#-5 Positive Case : Movie Collection has Country : Movie = 1:m relation
 * and belongs to a specific Country. After mapping this in the type of
 * IdBag(Collection), new Country information is registered.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateCollectionMappingTest extends AbstractTest {

	/**
	 * [Flow #-1] Positive Case : Movie Collection has Country:Movie= 1:m
	 * relation and belongs to a specific Country. After mapping this in the
	 * type of Set, new Country information is registered. In this case, Movie
	 * Collection is managed in the type of Set. Therefore, there is no
	 * repetitive data and no order.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@SuppressWarnings("unchecked")
	public void testAddMovieWithSet() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/set/hibernate.cfg.xml");
		CountryWithSet country = new CountryWithSet();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		Set<Movie> movieSet = new HashSet<Movie>();
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
	 * [Flow #-2] Positive Case : Movie Collection has Country:Movie= 1:m
	 * relation and belongs to a specific Country. After mapping this in the
	 * type of List, new Country information is registered. In this case, Movie
	 * Collection is managed in the type of List. Therefore, order is managed.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@SuppressWarnings("unchecked")
	public void testAddMovieWithList() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/list/hibernate.cfg.xml");
		CountryWithList country = new CountryWithList();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		List<Movie> movieList = new ArrayList<Movie>();
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
	 * [Flow #-3] Positive Case : Movie Collection has Country:Movie= 1:m
	 * relation and belongs to a specific Country. After mapping this in the
	 * type of Map, new Country information is registered. In this case, Movie
	 * Collection is managed in the type of Map. Therefore, it is stored in the
	 * type of (key, value).
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@SuppressWarnings("unchecked")
	public void testAddMovieWithMap() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/map/hibernate.cfg.xml");
		CountryWithMap country = new CountryWithMap();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		Map<String, Movie> movieMap = new HashMap<String, Movie>();
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
	 * [Flow #-4] Positive Case : Movie Collection has Country : Movie = 1:m
	 * relation and belongs to a specific Country. After mapping this in the
	 * type of IdBag(Collection), new Country information is registered. Bag is
	 * similar to Set. However, given that Bag can add new Movie object without
	 * loading all Movie objects belonging to Country, it has advantage
	 * performance-wise.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@SuppressWarnings("unchecked")
	public void testAddMovieWithBag() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/bag/hibernate.cfg.xml");
		CountryWithBag country = new CountryWithBag();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		List<Movie> movieList = new ArrayList<Movie>();
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
	 * [Flow #-5] Positive Case : Movie Collection has Country : Movie = 1:m
	 * relation and belongs to a specific Country. After mapping this in the
	 * type of IdBag(Collection), new Country information is registered.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@SuppressWarnings("unchecked")
	public void testAddMovieWithIdBag() throws Exception {
		// 1. insert init data
		newSession("org/anyframe/hibernate/relation/collection/idbag/hibernate.cfg.xml");
		CountryWithIdBag country = new CountryWithIdBag();
		String countryCode = "COUNTRY-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		Movie[] movies = makeMovies(countryCode);
		List<Movie> movieList = new ArrayList<Movie>();
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
		movie3.setReleaseDate(DateUtil.stringToDate("2008-07-17", "yyyy-MM-dd"));
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
		movie1.setReleaseDate(DateUtil.stringToDate("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");
		movies[0] = movie1;

		Movie movie2 = new Movie();
		movie2.setCountryCode(countryCode);
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.stringToDate("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");
		movies[1] = movie2;

		movies[2] = movie2;

		return movies;
	}
}
