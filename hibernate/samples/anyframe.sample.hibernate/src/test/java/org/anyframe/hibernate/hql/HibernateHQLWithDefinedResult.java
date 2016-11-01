package org.anyframe.hibernate.hql;

import java.util.List;
import java.util.Map;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Query;


/**
 * TestCase Name : HibernateHQLWithDefinedResult<br>
 * <br>
 * [Description] : HQL(Hibernate Query Language)을 통해 조회 작업을 수행한 후, 조회 작업의 결과를
 * 원하는 객체 형태로 전달받는다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Inner Join)을
 * 이용한 조회 결과를 Movie 객체 형태로를 전달받는다.</li>
 * <li>#-2 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Inner Join)을
 * 이용한 조회 결과를 Map 형태로 전달받는다.</li>
 * <li>#-3 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Inner Join)을
 * 이용한 조회 결과를 List 형태로 전달받는다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateHQLWithDefinedResult extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Inner
	 * Join)을 이용한 조회 결과를 Movie 객체 형태로를 전달받는다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindMoviesByCategory() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("SELECT new Movie(movie.movieId as movieId, ");
		hqlBuf.append("	movie.title as title, movie.director as director, ");
		hqlBuf.append("	category.categoryName as categoryName, ");
		hqlBuf.append("	movie.country.countryName as countryName) ");
		hqlBuf.append("FROM Movie movie join movie.categories category ");
		hqlBuf.append("WHERE category.categoryName = :condition");
		Query query = session.createQuery(hqlBuf.toString());
		query.setParameter("condition", "Romantic");
		List movieList = query.list();

		// 3. assert result - movie
		assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		Movie movie1 = (Movie) movieList.get(0);
		assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.getTitle());
		assertEquals("fail to match a movie director.", "Jaeyong Gwak", movie1
				.getDirector());
		assertEquals("fail to match a movie category.", "Romantic", movie1
				.getCategoryName());
		assertEquals("fail to match a country of the movie.", "Korea", movie1
				.getCountryName());

		Movie movie2 = (Movie) movieList.get(1);
		assertEquals("fail to match a movie title.", "My Little Bride", movie2
				.getTitle());
		assertEquals("fail to match a movie director.", "Hojun Kim", movie2
				.getDirector());
		assertEquals("fail to match a movie category.", "Romantic", movie2
				.getCategoryName());
		assertEquals("fail to match a country of the movie.", "Korea", movie2
				.getCountryName());
	}

	/**
	 * [Flow #-2] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Inner
	 * Join)을 이용한 조회 결과를 Map 형태로 전달받는다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindMovieMapByCategory() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("SELECT new Map(movie.movieId as movieId, ");
		hqlBuf.append("	movie.title as title, movie.director as director, ");
		hqlBuf.append("	category.categoryName as categoryName, ");
		hqlBuf.append("	movie.country.countryName as countryName) ");
		hqlBuf.append("FROM Movie movie join movie.categories category ");
		hqlBuf.append("WHERE category.categoryName = :condition");
		Query query = session.createQuery(hqlBuf.toString());
		query.setParameter("condition", "Romantic");
		List movieList = query.list();

		// 3. assert result - movie
		assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		Map movie1 = (Map) movieList.get(0);
		assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.get("title"));
		assertEquals("fail to match a movie director.", "Jaeyong Gwak", movie1
				.get("director"));
		assertEquals("fail to match a movie category.", "Romantic", movie1
				.get("categoryName"));
		assertEquals("fail to match a country of the movie.", "Korea", movie1
				.get("countryName"));

		Map movie2 = (Map) movieList.get(1);
		assertEquals("fail to match a movie title.", "My Little Bride", movie2
				.get("title"));
		assertEquals("fail to match a movie director.", "Hojun Kim", movie2
				.get("director"));
		assertEquals("fail to match a movie category.", "Romantic", movie2
				.get("categoryName"));
		assertEquals("fail to match a country of the movie.", "Korea", movie2
				.get("countryName"));
	}

	/**
	 * [Flow #-3] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Inner
	 * Join)을 이용한 조회 결과를 List 형태로 전달받는다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindMovieListByCategory() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("SELECT new List(movie.movieId as movieId, ");
		hqlBuf.append("	movie.title as title, movie.director as director, ");
		hqlBuf.append("	category.categoryName as categoryName, ");
		hqlBuf.append("	movie.country.countryName as countryName) ");
		hqlBuf.append("FROM Movie movie join movie.categories category ");
		hqlBuf.append("WHERE category.categoryName = :condition");
		Query query = session.createQuery(hqlBuf.toString());
		query.setParameter("condition", "Romantic");
		List movieList = query.list();

		// 3. assert result - movie
		assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		List movie1 = (List) movieList.get(0);
		assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.get(1));
		assertEquals("fail to match a movie director.", "Jaeyong Gwak", movie1
				.get(2));
		assertEquals("fail to match a movie category.", "Romantic", movie1
				.get(3));
		assertEquals("fail to match a country of the movie.", "Korea", movie1
				.get(4));

		List movie2 = (List) movieList.get(1);
		assertEquals("fail to match a movie title.", "My Little Bride", movie2
				.get(1));
		assertEquals("fail to match a movie director.", "Hojun Kim", movie2
				.get(2));
		assertEquals("fail to match a movie category.", "Romantic", movie2
				.get(3));
		assertEquals("fail to match a country of the movie.", "Korea", movie2
				.get(4));
	}
}
