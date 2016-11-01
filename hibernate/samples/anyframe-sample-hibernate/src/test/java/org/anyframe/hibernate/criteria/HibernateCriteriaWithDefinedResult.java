package org.anyframe.hibernate.criteria;

import java.util.List;
import java.util.Map;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateCriteriaWithDefinedResult<br>
 * <br>
 * [Description] : Search result using Criteria can be passed in the type of
 * Object.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Search result using Criteria for two tables witch
 * have Relation is passed in the type of Movie object.</li>
 * <li>#-2 Positive Case : Search result using Criteria for two tables witch
 * have Relation is passed in the type of Map.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateCriteriaWithDefinedResult extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Search result using Criteria for two tables
	 * witch have Relation is passed in the type of Movie object.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindMoviesByCategory() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute criteria
		Criteria movieCriteria = session.createCriteria(Movie.class);
		ProjectionList projectionList = Projections.projectionList();
		projectionList.add(Projections.id().as("movieId"));
		projectionList.add(Projections.property("title").as("title"));
		projectionList.add(Projections.property("director").as("director"));
		projectionList.add(Projections.property("category.categoryName").as(
				"categoryName"));
		projectionList.add(Projections.property("country.countryName").as(
				"countryName"));
		movieCriteria.setProjection(projectionList);
		movieCriteria.setResultTransformer(new AliasToBeanResultTransformer(
				Movie.class));

		Criteria categoryCriteria = movieCriteria.createCriteria("categories",
				"category");
		Criteria countryCriteria = movieCriteria.createCriteria("country",
				"country");
		categoryCriteria.add(Restrictions.eq("categoryName", "Romantic"));
		countryCriteria.add(Restrictions.like("countryName", "",
				MatchMode.ANYWHERE));

		List movieList = movieCriteria.list();

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
	 * [Flow #-2] Positive Case : Search result using Criteria for two tables
	 * witch have Relation is passed in the type of Map.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindMovieMapByCategory() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute criteria
		Criteria movieCriteria = session.createCriteria(Movie.class);
		ProjectionList projectionList = Projections.projectionList();
		projectionList.add(Projections.id().as("movieId"));
		projectionList.add(Projections.property("title").as("title"));
		projectionList.add(Projections.property("director").as("director"));
		projectionList.add(Projections.property("category.categoryName").as(
				"categoryName"));
		projectionList.add(Projections.property("country.countryName").as(
				"countryName"));
		movieCriteria.setProjection(projectionList);
		movieCriteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		Criteria categoryCriteria = movieCriteria.createCriteria("categories",
				"category");
		Criteria countryCriteria = movieCriteria.createCriteria("country",
				"country");
		categoryCriteria.add(Restrictions.eq("categoryName", "Romantic"));
		countryCriteria.add(Restrictions.like("countryName", "",
				MatchMode.ANYWHERE));

		List movieList = movieCriteria.list();

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
}
