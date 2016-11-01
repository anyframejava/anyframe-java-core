package org.anyframe.hibernate.fetch;

import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Query;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateFetchWithBatchSizeTest<br>
 * <br>
 * [Description] : One Fetch strategy to resolve Hibernate Laze Loading-led N+1
 * SELECT issue is looked into. In the case where batch-size condition on a
 * specific object within Hibernate Mapping XML file is defined, executed query
 * statements and its number can be checked. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Search work for COUNTRY table is carried out with
 * HQL. (at Country:Movie relation defined at Mapping XML file, Fetch Strategy
 * on Movie Set is defined as Batch Fetching(batch-size=”2”). When Movie Set
 * belonging to a specific Country is searched, SELECT statement is executed
 * based on batch-size.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateFetchWithBatchSizeTest extends
		AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/fetch/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Search work for COUNTRY table is carried out
	 * with HQL. (at Country:Movie relation defined at Hibernate Mapping XML
	 * file, Fetch Strategy on Movie Set is defined as Batch
	 * Fetching(batch-size=”2”). When Movie Set belonging to a specific Country
	 * is searched, SELECT statement is executed based on batch-size.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	@SuppressWarnings("unchecked")
	public void testFindCountryList() throws Exception {
		// 1. insert init data
		session = initialSessionFactory.openSession();
		session.beginTransaction();
		SetUpInitData.initializeData(session);
		session.getTransaction().commit();
		session.close();

		// 2. execute hql with another session
		session = initialSessionFactory.openSession();
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("FROM Country");
		Query query = session.createQuery(hqlBuf.toString());
		List countryList = query.list();

		// 3. assert result - country
		Assert.assertEquals("fail to match the size of movie list.", 3, countryList
				.size());

		for (int i = 0; i < countryList.size(); i++) {
			Country country = (Country) countryList.get(i);

			if (i == 0) {
				Assert.assertEquals("fail to match a country name.", "Korea", country
						.getCountryName());

				Set<Movie> movies = country.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 2, movies
						.size());
			} else if (i == 1) {
				Assert.assertEquals("fail to match a country name.", "Japan", country
						.getCountryName());

				Set<Movie> movies = country.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 1, movies
						.size());
			} else if (i == 2) {
				Assert.assertEquals("fail to match a country name.", "U.S.A", country
						.getCountryName());

				Set<Movie> movies = country.getMovies();
				Assert.assertEquals("fail to match the size of movie list.", 0, movies
						.size());
			}

		}
		session.close();
	}
}
