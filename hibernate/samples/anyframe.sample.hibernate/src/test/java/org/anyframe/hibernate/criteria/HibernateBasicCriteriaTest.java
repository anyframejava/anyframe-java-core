package org.anyframe.hibernate.criteria;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;


/**
 * TestCase Name : HibernateBasicCriteriaTest<br>
 * <br>
 * [Description] : Hibernate Criteria를 이용하여 특정 객체 정보에 대해 조회해본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : 하나의 테이블을 대상으로 Hibernate Criteria를 이용한 조회 작업을 수행한다.</li>
 * <li>#-2 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Hibernate
 * Criteria(Inner Join)를 이용한 조회 작업을 수행한다.</li>
 * <li>#-3 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Hibernate
 * Criteria(Inner Join)를 이용한 조회 작업을 수행한다.</li>
 * <li>#-4 Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 HQL(Right Outer
 * Join)을 이용한 조회 작업을 수행한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateBasicCriteriaTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : 하나의 테이블을 대상으로 Hibernate Criteria를 이용한 조회 작업을
	 * 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindCountryList() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute criteria
		Criteria criteria = session.createCriteria(Country.class);
		criteria.add(Restrictions.like("countryName", "", MatchMode.ANYWHERE));
		criteria.addOrder(Order.asc("countryName"));
		List countryList = criteria.list();

		// 3. assert result - country
		assertEquals("fail to match the size of country list.", 3, countryList
				.size());

		Country country = (Country) countryList.get(0);
		assertEquals("fail to match a country name.", "Japan", country
				.getCountryName());

		// 4. assert result - movies
		Set movies = country.getMovies();
		assertEquals("fail to match the size of movie list.", 1, movies.size());
		Movie movie = (Movie) movies.iterator().next();
		assertTrue("fail to match the title of movie.", movie.getTitle()
				.equals("Ring 2"));

		// 5. assert result - categories
		Set categories = movie.getCategories();
		assertEquals("fail to match the size of category list.", 1, categories
				.size());

		Iterator categoryItr = categories.iterator();
		Category category = (Category) categoryItr.next();
		assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Horror"));
	}

	/**
	 * [Flow #-2] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Hibernate
	 * Criteria(Inner Join)를 이용한 조회 작업을 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindMovieListByCategory() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute criteria
		Criteria movieCriteria = session.createCriteria(Movie.class);
		Criteria categoryCriteria = movieCriteria.createCriteria("categories");
		categoryCriteria.add(Restrictions.eq("categoryName", "Romantic"));
		List movieList = movieCriteria.list();

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
	 * [Flow #-3] Positive Case : Relation 관계에 놓여 있는 두개의 테이블을 대상으로 Hibernate
	 * Criteria(Inner Join)를 이용한 조회 작업을 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindMovieListByCountry() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute criteria
		Criteria movieCriteria = session.createCriteria(Movie.class);
		Criteria countryCriteria = movieCriteria.createCriteria("country");
		countryCriteria.add(Restrictions.eq("countryId", "KR"));
		movieCriteria.add(Restrictions.like("title", "", MatchMode.ANYWHERE));
		List movieList = movieCriteria.list();

		// 3. assert result - movie
		assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

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

		// 2. execute criteria
		Criteria categoryCriteria = session.createCriteria(Category.class);
		Criteria movieCriteria = categoryCriteria.createCriteria("movies",
				CriteriaSpecification.LEFT_JOIN);
		categoryCriteria.addOrder(Order.asc("categoryName"));
		categoryCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

		List categoryList = categoryCriteria.list();

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
