package org.anyframe.hibernate.hql;

import java.util.List;
import java.util.Map;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Query;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateHQLWithDefinedResult<br>
 * <br>
 * [Description] : After conducting search work via HQL(Hibernate Query
 * Language), the result is passed in the wanted object type. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : HQL(Inner Join) is used for two tables who has
 * Relation. The search result is passed in the Movie object type.</li>
 * <li>#-2 Positive Case : HQL(Inner Join) is used for two tables who has
 * Relation. The search result is passed in Map type.</li>
 * <li>#-3 Positive Case : HQL(Inner Join) is used for two tables who has
 * Relation. The search result is passed in List type.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateHQLWithDefinedResult extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : HQL(Inner Join) is used for two tables who has
	 * Relation. The search result is passed in the Movie object type.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
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
		Assert.assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		Movie movie1 = (Movie) movieList.get(0);
		Assert.assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.getTitle());
		Assert.assertEquals("fail to match a movie director.", "Jaeyong Gwak", movie1
				.getDirector());
		Assert.assertEquals("fail to match a movie category.", "Romantic", movie1
				.getCategoryName());
		Assert.assertEquals("fail to match a country of the movie.", "Korea", movie1
				.getCountryName());

		Movie movie2 = (Movie) movieList.get(1);
		Assert.assertEquals("fail to match a movie title.", "My Little Bride", movie2
				.getTitle());
		Assert.assertEquals("fail to match a movie director.", "Hojun Kim", movie2
				.getDirector());
		Assert.assertEquals("fail to match a movie category.", "Romantic", movie2
				.getCategoryName());
		Assert.assertEquals("fail to match a country of the movie.", "Korea", movie2
				.getCountryName());
	}

	/**
	 * [Flow #-2] Positive Case : HQL(Inner Join) is used for two tables who has
	 * Relation. The search result is passed in Map type.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
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
		Assert.assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		Map movie1 = (Map) movieList.get(0);
		Assert.assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.get("title"));
		Assert.assertEquals("fail to match a movie director.", "Jaeyong Gwak", movie1
				.get("director"));
		Assert.assertEquals("fail to match a movie category.", "Romantic", movie1
				.get("categoryName"));
		Assert.assertEquals("fail to match a country of the movie.", "Korea", movie1
				.get("countryName"));

		Map movie2 = (Map) movieList.get(1);
		Assert.assertEquals("fail to match a movie title.", "My Little Bride", movie2
				.get("title"));
		Assert.assertEquals("fail to match a movie director.", "Hojun Kim", movie2
				.get("director"));
		Assert.assertEquals("fail to match a movie category.", "Romantic", movie2
				.get("categoryName"));
		Assert.assertEquals("fail to match a country of the movie.", "Korea", movie2
				.get("countryName"));
	}

	/**
	 * [Flow #-3] Positive Case : HQL(Inner Join) is used for two tables who has
	 * Relation. The search result is passed in List type.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
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
		Assert.assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		List movie1 = (List) movieList.get(0);
		Assert.assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.get(1));
		Assert.assertEquals("fail to match a movie director.", "Jaeyong Gwak", movie1
				.get(2));
		Assert.assertEquals("fail to match a movie category.", "Romantic", movie1
				.get(3));
		Assert.assertEquals("fail to match a country of the movie.", "Korea", movie1
				.get(4));

		List movie2 = (List) movieList.get(1);
		Assert.assertEquals("fail to match a movie title.", "My Little Bride", movie2
				.get(1));
		Assert.assertEquals("fail to match a movie director.", "Hojun Kim", movie2
				.get(2));
		Assert.assertEquals("fail to match a movie category.", "Romantic", movie2
				.get(3));
		Assert.assertEquals("fail to match a country of the movie.", "Korea", movie2
				.get(4));
	}
}
