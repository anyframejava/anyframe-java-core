package org.anyframe.hibernate.nativesql;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.SQLQuery;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateNativeSQLTest<br>
 * <br>
 * [Description] : How to execute Native SQL IS looked into via Hibernate. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Search work targeting one table is conducted by using
 * Native SQL.</li>
 * <li>#-2 Positive Case : Search work is conducted by using Named Native
 * SQL(Inner Join) targeting two tables which have Relation.</li>
 * <li>#-3 Positive Case : Search work is conducted by using Named Native SQL
 * targeting two tables separately dictating search condition.</li>
 * <li>#-4 Positive Case : Search work is conducted by using Named Native
 * SQL(Right Outer Join) targeting two tables which has Relation.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateNativeSQLTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Search work is conducted by using Named Native
	 * SQL(Right Outer Join) targeting two tables which has Relation.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindCountryList() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("SELECT * ");
		hqlBuf.append("FROM COUNTRY ");
		hqlBuf.append("WHERE COUNTRY_NAME like :condition ");
		hqlBuf.append("ORDER BY COUNTRY_NAME");

		SQLQuery query = session.createSQLQuery(hqlBuf.toString());
		query.addEntity(Country.class);
		query.setParameter("condition", "%%");
		List countryList = query.list();

		// 3. assert result - country
		Assert.assertEquals("fail to match the size of country list.", 3, countryList
				.size());

		Country country = (Country) countryList.get(1);
		Assert.assertEquals("fail to match a country name.", "Korea", country
				.getCountryName());

		// 4. assert result - movies
		Set<Movie> movies = country.getMovies();
		Assert.assertEquals("fail to match the size of movie list.", 2, movies.size());
		Movie movie = movies.iterator().next();
		Assert.assertTrue("fail to match the title of movie.", movie.getTitle()
				.equals("My Sassy Girl")
				|| movie.getTitle().equals("My Little Bride"));

		// 5. assert result - categories
		Set<Category> categories = movie.getCategories();
		Assert.assertEquals("fail to match the size of category list.", 2, categories
				.size());

		Iterator<Category> categoryItr = categories.iterator();
		Category category = categoryItr.next();
		Assert.assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-2] Positive Case : Search work is conducted by using Named Native
	 * SQL(Inner Join) targeting two tables which have Relation.
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
		hqlBuf.append("SELECT movie.* ");
		hqlBuf.append("FROM MOVIE movie ");
		hqlBuf
				.append("join MOVIE_CATEGORY moviecategory on movie.MOVIE_ID = moviecategory.MOVIE_ID ");
		hqlBuf
				.append("join CATEGORY category on moviecategory.CATEGORY_ID = category.CATEGORY_ID ");
		hqlBuf.append("WHERE category.CATEGORY_NAME = ?");
		SQLQuery query = session.createSQLQuery(hqlBuf.toString());
		query.addEntity(Movie.class);
		query.setParameter(0, "Romantic");
		List movieList = query.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		Movie movie1 = (Movie) movieList.get(0);
		
		Assert.assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.getTitle());
		Assert.assertEquals("fail to match a movie title.", "Jaeyong Gwak", movie1
				.getDirector());

		// 4. asssert result - categories
		Set<Category> categories = movie1.getCategories();
		Assert.assertEquals("fail to match the size of category list.", 2, movie1
				.getCategories().size());

		Iterator<Category> categoryItr = categories.iterator();
		Category category = categoryItr.next();
		Assert.assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-3] Positive Case : Search work is conducted by using Named Native
	 * SQL targeting two tables separately dictating search condition.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindMovieListByCountry() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("SELECT distinct movie.*, country.* ");
		hqlBuf.append("FROM MOVIE movie, COUNTRY country ");
		hqlBuf.append("WHERE movie.COUNTRY_CODE = country.COUNTRY_CODE ");
		hqlBuf.append("AND country.COUNTRY_ID = :condition1 ");
		hqlBuf.append("AND movie.TITLE like :condition2 ");

		SQLQuery query = session.createSQLQuery(hqlBuf.toString());
		query.addEntity("movie", Movie.class);
		query.addJoin("country", "movie.country");
		query.setParameter("condition1", "KR");
		query.setParameter("condition2", "%%");
		List movieList = query.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		Object[] results = (Object[]) movieList.get(0);
		
		Movie movie1 = (Movie)results[0];
		@SuppressWarnings("unused")
		Country country = (Country)results[1];
		Assert.assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.getTitle());
		Assert.assertEquals("fail to match a movie title.", "Jaeyong Gwak", movie1
				.getDirector());

		// 4. assert result - categories
		Set<Category> categories = movie1.getCategories();
		Assert.assertEquals("fail to match the size of category list.", 2, movie1
				.getCategories().size());

		Iterator<Category> categoryItr = categories.iterator();
		Category category = categoryItr.next();
		Assert.assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-4] Positive Case : Search work is conducted by using Named Native
	 * SQL(Right Outer Join) targeting two tables which has Relation.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindCategoryList() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("SELECT distinct category.* ");
		hqlBuf.append("FROM MOVIE movie ");
		hqlBuf
				.append("right join MOVIE_CATEGORY moviecategory on movie.MOVIE_ID=moviecategory.MOVIE_ID ");
		hqlBuf
				.append("right join CATEGORY category on moviecategory.CATEGORY_ID=category.CATEGORY_ID ");
		hqlBuf.append("ORDER BY category.CATEGORY_NAME ASC ");
		SQLQuery query = session.createSQLQuery(hqlBuf.toString());
		query.addEntity(Category.class);
		List categoryList = query.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of category list.", 4,
				categoryList.size());

		Category category1 = (Category) categoryList.get(0);
		Assert.assertEquals("fail to match the name of category.", "Comedy", category1
				.getCategoryName());

		Set<Movie> movies = category1.getMovies();
		Assert.assertTrue("fail to match the size of movie list.", movies.size() == 0);

		Category category2 = (Category) categoryList.get(1);
		Assert.assertEquals("fail to match the name of category.", "Horror", category2
				.getCategoryName());

		Category category3 = (Category) categoryList.get(2);
		Assert.assertEquals("fail to match the name of category.", "Romantic",
				category3.getCategoryName());

		Category category4 = (Category) categoryList.get(3);
		Assert.assertEquals("fail to match the name of category.", "SF", category4
				.getCategoryName());
	}
}
