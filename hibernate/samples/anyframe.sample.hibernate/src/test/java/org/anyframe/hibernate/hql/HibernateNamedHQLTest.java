package org.anyframe.hibernate.hql;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Query;


/**
 * TestCase Name : HibernateNamedHQLTest<br>
 * <br>
 * [Description] : Hibernate Query Language를 별도 Hibernate Mapping XML 파일 내에 정의하고
 * 정의된 HQL문의 name을 입력하여 실행시켜 본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : 하나의 테이블을 대상으로 Named HQL을 이용한 조회 작업을 수행한다.</li>
 * <li>#-2 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Named HQL(Inner
 * Join)을 이용한 조회 작업을 수행한다.</li>
 * <li>#-3 Positive Case : 두개의 테이블을 대상으로 조회 조건을 별도 명시한 Named HQL(Inner Join)을
 * 이용하여 조회 작업을 수행한다.</li>
 * <li>#-4 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Right Outer
 * Join)을 이용한 조회 작업을 수행한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateNamedHQLTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : 하나의 테이블을 대상으로 Named HQL을 이용한 조회 작업을 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindCountryList() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		Query hqlQuery = session.getNamedQuery("findCountryList");
		hqlQuery.setParameter("condition", "%%");
		List countryList = hqlQuery.list();

		// 3. assert result - country
		assertEquals("fail to match the size of country list.", 3, countryList
				.size());

		Country country = (Country) countryList.get(1);
		assertEquals("fail to match a country name.", "Korea", country
				.getCountryName());

		// 4. assert result - movies
		Set movies = country.getMovies();
		assertEquals("fail to match the size of movie list.", 2, movies.size());
		Movie movie = (Movie) movies.iterator().next();
		assertTrue("fail to match the title of movie.", movie.getTitle()
				.equals("My Sassy Girl")
				|| movie.getTitle().equals("My Little Bride"));

		// 5. assert result - categories
		Set categories = movie.getCategories();
		assertEquals("fail to match the size of category list.", 2, categories
				.size());

		Iterator categoryItr = categories.iterator();
		Category category = (Category) categoryItr.next();
		assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-2] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Named
	 * HQL(Inner Join)을 이용한 조회 작업을 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindMovieListByCategory() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		Query query = session.getNamedQuery("findMovieListByCategory");
		query.setParameter(0, "Romantic");
		List movieList = query.list();

		// 3. assert result - movie
		assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		Movie movie1 = (Movie) movieList.get(0);
		assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.getTitle());
		assertEquals("fail to match a movie title.", "Jaeyong Gwak", movie1
				.getDirector());

		// 4. asssert result - categories
		Set categories = movie1.getCategories();
		assertEquals("fail to match the size of category list.", 2, movie1
				.getCategories().size());

		Iterator categoryItr = categories.iterator();
		Category category = (Category) categoryItr.next();
		assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-3] Positive Case : 두개의 테이블을 대상으로 조회 조건을 별도 명시한 Named HQL(Inner
	 * Join)을 이용하여 조회 작업을 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindMovieListByCountry() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		Query query = session.getNamedQuery("findMovieListByCountry");
		query.setParameter("condition1", "KR");
		query.setParameter("condition2", "%%");
		List movieList = query.list();

		assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		// 3. assert result - movie
		Movie movie1 = (Movie) movieList.get(0);
		assertEquals("fail to match a movie title.", "My Sassy Girl", movie1
				.getTitle());
		assertEquals("fail to match a movie title.", "Jaeyong Gwak", movie1
				.getDirector());

		// 4. assert result - categories
		Set categories = movie1.getCategories();
		assertEquals("fail to match the size of category list.", 2, movie1
				.getCategories().size());

		Iterator categoryItr = categories.iterator();
		Category category = (Category) categoryItr.next();
		assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-4] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Right
	 * Outer Join)을 이용한 조회 작업을 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindCategoryList() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		Query query = session.getNamedQuery("findCategoryList");
		List categoryList = query.list();

		// 3. assert result - movie
		assertEquals("fail to match the size of category list.", 4,
				categoryList.size());

		Category category1 = (Category) categoryList.get(0);
		assertEquals("fail to match the name of category.", "Comedy", category1
				.getCategoryName());

		Set movies = category1.getMovies();
		assertTrue("fail to match the size of movie list.", movies.size() == 0);

		Category category2 = (Category) categoryList.get(1);
		assertEquals("fail to match the name of category.", "Horror", category2
				.getCategoryName());

		Category category3 = (Category) categoryList.get(2);
		assertEquals("fail to match the name of category.", "Romantic",
				category3.getCategoryName());

		Category category4 = (Category) categoryList.get(3);
		assertEquals("fail to match the name of category.", "SF", category4
				.getCategoryName());
	}
}
