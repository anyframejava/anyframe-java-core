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
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateBasicCriteriaTest<br>
 * <br>
 * [Description] : Search work for one table is carried out with Hibernate
 * Criteria.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Search work for one table is carried out with
 * Hibernate Criteria.</li>
 * <li>#-2 Positive Case : Search work for two tables which have Relation is
 * carried out with Hibernate Criteria(Inner Join).</li>
 * <li>#-3 Positive Case : Search work for two tables which have Relation is
 * carried out with Hibernate Criteria(Inner Join).</li>
 * <li>#-4 Positive Case : Search work for two tables which have Relation is
 * carried out with HQL(Right Outer Join).</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateBasicCriteriaTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Search work for one table is carried out with
	 * Hibernate Criteria(Inner Join).
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindCountryList() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute criteria
		Criteria criteria = session.createCriteria(Country.class);
		criteria.add(Restrictions.like("countryName", "", MatchMode.ANYWHERE));
		criteria.addOrder(Order.asc("countryName"));
		List countryList = criteria.list();

		// 3. assert result - country
		Assert.assertEquals("fail to match the size of country list.", 3,
				countryList.size());

		Country country = (Country) countryList.get(0);
		Assert.assertEquals("fail to match a country name.", "Japan", country
				.getCountryName());

		// 4. assert result - movies
		Set<Movie> movies = country.getMovies();
		Assert.assertEquals("fail to match the size of movie list.", 1, movies
				.size());
		Movie movie = movies.iterator().next();
		Assert.assertTrue("fail to match the title of movie.", movie.getTitle()
				.equals("Ring 2"));

		// 5. assert result - categories
		Set<Category> categories = movie.getCategories();
		Assert.assertEquals("fail to match the size of category list.", 1,
				categories.size());

		Iterator<Category> categoryItr = categories.iterator();
		Category category = categoryItr.next();
		Assert.assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Horror"));
	}

	/**
	 * [Flow #-2] Positive Case : Search work for two tables which have Relation
	 * is carried out with Hibernate Criteria(Inner Join).
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindMovieListByCategory() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute criteria
		Criteria movieCriteria = session.createCriteria(Movie.class);
		Criteria categoryCriteria = movieCriteria.createCriteria("categories");
		categoryCriteria.add(Restrictions.eq("categoryName", "Romantic"));
		List movieList = movieCriteria.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of movie list.", 2,
				movieList.size());

		Movie movie1 = (Movie) movieList.get(0);
		Assert.assertEquals("fail to match a movie title.", "My Sassy Girl",
				movie1.getTitle());
		Assert.assertEquals("fail to match a movie title.", "Jaeyong Gwak",
				movie1.getDirector());

		// 4. asssert result - categories
		Set<Category> categories = movie1.getCategories();
		Assert.assertEquals("fail to match the size of category list.", 2,
				movie1.getCategories().size());

		Iterator<Category> categoryItr = categories.iterator();
		Category category = categoryItr.next();
		Assert.assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-3] Positive Case : Search work for two tables which have Relation
	 * is carried out with Hibernate Criteria(Inner Join).
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
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
		Assert.assertEquals("fail to match the size of movie list.", 2,
				movieList.size());

		Movie movie1 = (Movie) movieList.get(0);
		Assert.assertEquals("fail to match a movie title.", "My Sassy Girl",
				movie1.getTitle());
		Assert.assertEquals("fail to match a movie title.", "Jaeyong Gwak",
				movie1.getDirector());

		// 4. assert result - categories
		Set<Category> categories = movie1.getCategories();
		Assert.assertEquals("fail to match the size of category list.", 2,
				movie1.getCategories().size());

		Iterator<Category> categoryItr = categories.iterator();
		Category category = categoryItr.next();
		Assert.assertTrue("fail to match the name of category.", category
				.getCategoryName().equals("Romantic")
				|| category.getCategoryName().equals("Comedy"));
	}

	/**
	 * [Flow #-4] Positive Case : Search work for two tables which have Relation
	 * is carried out with HQL(Right Outer Join).
	 * 
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindCategoryList() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute criteria
		Criteria categoryCriteria = session.createCriteria(Category.class);
		@SuppressWarnings("unused")
		Criteria movieCriteria = categoryCriteria.createCriteria("movies",
				CriteriaSpecification.LEFT_JOIN);
		categoryCriteria.addOrder(Order.asc("categoryName"));
		categoryCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

		List categoryList = categoryCriteria.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of category list.", 4,
				categoryList.size());

		Category category1 = (Category) categoryList.get(0);
		Assert.assertEquals("fail to match the name of category.", "Comedy",
				category1.getCategoryName());

		Set<Movie> movies = category1.getMovies();
		Assert.assertTrue("fail to match the size of movie list.", movies
				.size() == 0);

		Category category2 = (Category) categoryList.get(1);
		Assert.assertEquals("fail to match the name of category.", "Horror",
				category2.getCategoryName());

		Category category3 = (Category) categoryList.get(2);
		Assert.assertEquals("fail to match the name of category.", "Romantic",
				category3.getCategoryName());

		Category category4 = (Category) categoryList.get(3);
		Assert.assertEquals("fail to match the name of category.", "SF",
				category4.getCategoryName());
	}
}
