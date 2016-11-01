package org.anyframe.hibernate.nativesql;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Query;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;


/**
 * TestCase Name : HibernateNamedNativeSQLTest<br>
 * <br>
 * [Description] : Native SQL을 별도 Hibernate Mapping XML 파일 내에 정의하고 정의된 SLQ의
 * name을 입력하여 실행시켜 본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : 하나의 테이블을 대상으로 Named Native SQL을 이용한 조회 작업을 수행한다.</li>
 * <li>#-2 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Named Native
 * SQL(Inner Join)을 이용한 조회 작업을 수행한다.</li>
 * <li>#-3 Positive Case : 두개의 테이블을 대상으로 검색 조건을 별도 명시한 Named Native SQL을 이용하여
 * 조회 작업을 수행한다.</li>
 * <li>#-4 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Named Native
 * SQL(Right Outer Join)을 이용한 조회 작업을 수행한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateNamedNativeSQLTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : 하나의 테이블을 대상으로 Named Native SQL을 이용한 조회 작업을
	 * 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testFindCountryList() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute named native SQL
		Query query = session.getNamedQuery("nativeFindCountryList");
		query.setParameter("condition", "%%");
		List countryList = query.list();

		// 3. assert result - country
		Assert.assertEquals("fail to match the size of country list.", 3, countryList
				.size());

		Country country = (Country) countryList.get(1);
		Assert.assertEquals("fail to match a country name.", "Korea", country
				.getCountryName());

		// 4. assert result - movies
		Set movies = country.getMovies();
		Assert.assertEquals("fail to match the size of movie list.", 2, movies.size());
		Movie movie = (Movie) movies.iterator().next();
		Assert.assertTrue("fail to match the title of movie.", movie.getTitle()
				.equals("My Sassy Girl")
				|| movie.getTitle().equals("My Little Bride"));

		// 5. assert result - categories
		Set categories = movie.getCategories();
		Assert.assertEquals("fail to match the size of category list.", 2, categories
				.size());

		Iterator categoryItr = categories.iterator();
		Category category = (Category) categoryItr.next();
		Assert.assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-2] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Named Native
	 * SQL(Inner Join)을 이용한 조회 작업을 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testFindMovieListByCategory() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute named native SQL
		Query query = session.getNamedQuery("nativeFindMovieListByCategory");
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
		Set categories = movie1.getCategories();
		Assert.assertEquals("fail to match the size of category list.", 2, movie1
				.getCategories().size());
	}

	/**
	 * [Flow #-3] Positive Case : 두개의 테이블을 대상으로 검색 조건을 별도 명시한 Named Native SQL을
	 * 이용하여 조회 작업을 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testFindMovieListByCountry() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute named native SQL
		Query query = session.getNamedQuery("nativeFindMovieListByCountry");
		query.setParameter("condition1", "KR");
		query.setParameter("condition2", "%%");
		List movieList = query.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		Movie movie1 = (Movie) movieList.get(0);
		Assert.assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.getTitle());
		Assert.assertEquals("fail to match a movie title.", "Jaeyong Gwak", movie1
				.getDirector());

		// 4. assert result - categories
		Set categories = movie1.getCategories();
		Assert.assertEquals("fail to match the size of category list.", 2, movie1
				.getCategories().size());

		Iterator categoryItr = categories.iterator();
		Category category = (Category) categoryItr.next();
		Assert.assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-4] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Named Native
	 * SQL(Right Outer Join)을 이용한 조회 작업을 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testFindCategoryList() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute named native SQL
		Query query = session.getNamedQuery("nativeFindCategoryList");
		List categoryList = query.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of category list.", 4,
				categoryList.size());

		Category category1 = (Category) categoryList.get(0);
		Assert.assertEquals("fail to match the name of category.", "Comedy", category1
				.getCategoryName());

		Set movies = category1.getMovies();
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
