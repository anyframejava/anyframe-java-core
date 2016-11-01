package org.anyframe.hibernate.inverse;

import org.anyframe.hibernate.AbstractTest;
import org.anyframe.sample.hibernate.model.bidirection.inverse.Country;
import org.anyframe.sample.hibernate.model.bidirection.inverse.Movie;
import org.anyframe.util.DateUtil;

/**
 * TestCase Name : HibernateBidirectionInverseCascadeTest<br>
 * <br>
 * [Description] :In the case where two tables which has 1:m relation have
 * two-way relation, query statement changes according to inverse and cascade
 * properties definition. Also, the testcase result shows how to use inverse and
 * cascade in two-way relation. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Relation is Country:Movie =1:m and two-way.
 * Inverse="false", cascade property is not defined within Hibernate Mapping XML
 * file.</li>
 * <li>#-2 Positive Case : Relation is Country:Movie =1:m and two-way.
 * Inverse="true", cascade property is not defined within Hibernate Mapping XML
 * file.</li>
 * <li>#-3 Positive Case : Relation is Country:Movie =1:m and two-way.
 * Inverse="false", cascade="save-update" is defined within Hibernate Mapping
 * XML file.</li>
 * <li>#-4 Positive Case : Relation is Country:Movie =1:m and two-way.
 * Inverse="true", cascade="save-update" is defined within Hibernate Mapping XML
 * file.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateBidirectionInverseCascadeTest extends AbstractTest {

	/**
	 * [Flow #-1] Positive Case : Relation is Country: Movie =1:m and two-way.
	 * Inverse="false", cascade property is not defined within Hibernate Mapping
	 * XML file. <br/>
	 * Basically, in order to add each Country and Movie, INSERT statements are
	 * executed twice. Also, given that inverse="false', UPDATE query is
	 * additionally executed for setting MOVIE table COUNTRY_CODE as null->
	 * ‘CTR-0001’ thanks to country.getMovies().add(movie); code execution.
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
	 * [Flow #-2] Positive Case : Relation is Country: Movie =1:m and two-way.
	 * Inverse="true", cascade property is not defined within Hibernate Mapping
	 * XML file. <br/>
	 * Basically, in order to add each Country and Movie, INSERT statements are
	 * executed twice. When Movie INSERT is executed, COUNTRY_CODE information
	 * is set not as null but as ‘CTR-0001’ because of
	 * movie.setCountry(country); code execution.
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
	 * [Flow #-3] Positive Case : Relation is Country:Movie =1:m and two-way.
	 * Inverse="false", cascade cascade="save-update" is defined within
	 * Hibernate Mapping XML file. <br/>
	 * Thanks to cascade property, INSERT statements are twice executed to
	 * register Country and Movie information together as default without
	 * defining session.save(movie) logic. Also, given that inverse="false",
	 * UPDATE query is additionally executed for MOVIE table COUNTRY_CODE
	 * information is set as null -> 'CTR-0001' because of
	 * country.getMovies().add(movie); code execution.
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
	 * [Flow #-4] Positive Case : Relation is Country:Movie =1:m and two-way.
	 * Inverse="true", cascade="save-update" is defined within Hibernate Mapping
	 * XML file. Thanks to cascade property, INSERT statements are twice
	 * executed to register Country and Movie information together as default
	 * without defining session.save(movie) logic. In this case, when Movie
	 * INSERT is executed, COUNTRY_CODE information is set as 'CTR-0001' because
	 * of movie.setCountry(country); code execution.
	 * 
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
		movie.setReleaseDate(DateUtil.stringToDate("2001-07-27", "yyyy-MM-dd"));
		movie.setTitle("My Sassy Girl");

		return movie;
	}
}
