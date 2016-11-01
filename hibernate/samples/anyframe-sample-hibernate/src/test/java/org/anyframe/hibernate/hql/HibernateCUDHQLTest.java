package org.anyframe.hibernate.hql;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.hibernate.Query;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateCUDHQLTest<br>
 * <br>
 * [Description] : CUD work is conducted by using HQL(Hibernate Query Language).<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : New country information is registered by using HQL.</li>
 * <li>#-2 Positive Case : Country information is modified by using HQL.</li>
 * <li>#-3 Positive Case : Registered country information is deleted by using
 * HQL.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateCUDHQLTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : New country information is registered by using
	 * HQL. Hibernate does not support INSERT statement in the format of INSERT
	 * INTO…VALUES and only supports INSERT in the format of INSERT INTO…SELECT.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountry() throws Exception {
		// 1. insert a new country information
		newSession();
		addCountry();
		closeSession();

		// 2. insert a new country after selecting a country
		newSession();
		Country country = new Country();
		String countryCode = "CTR-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");

		StringBuffer hql = new StringBuffer();
		hql.append("INSERT INTO Country (countryCode,countryId,countryName) ");
		hql
				.append("SELECT CONCAT(countryCode,'UPD'), countryId, countryName ");
		hql.append("FROM Country country ");
		hql.append("WHERE countryCode = :countryCode");
		Query query = session.createQuery(hql.toString());
		query.setParameter("countryCode", "CTR-0001");

		query.executeUpdate();
		closeSession();

		// 3. assert
		newSession();
				Country result = (Country) session
				.get(Country.class, "CTR-0001UPD");
		Assert.assertNotNull("fail to insert country.", result);
		closeSession();
	}

	/**
	 * [Flow #-2] Positive Case : Country information is modified by using HQL.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testUpdateCountry() throws Exception {
		// 1. insert a new country information
		newSession();
		addCountry();
		closeSession();

		// 2. update a country
		newSession();
		StringBuffer hql = new StringBuffer();
		hql.append("UPDATE Country country ");
		hql.append("SET country.countryName = :countryName ");
		hql
				.append("WHERE country.countryCode = :countryCode and country.countryId = :countryId ");

		Query query = session.createQuery(hql.toString());
		query.setParameter("countryName", "Republic of Korea");
		query.setParameter("countryCode", "CTR-0001");
		query.setParameter("countryId", "KR");

		query.executeUpdate();
		closeSession();

		// 3. assert
		newSession();
		Country result = (Country) session.get(Country.class, "CTR-0001");
		Assert.assertEquals("fail to match country name.", "Republic of Korea", result
				.getCountryName());
		closeSession();
	}

	/**
	 * [Flow #-3] Positive Case : Registered country information is removed by
	 * using HQL
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testDeleteCountry() throws Exception {
		// 1. insert a new country information
		newSession();
		addCountry();
		closeSession();

		// 2. delete a country
		newSession();
		StringBuffer hql = new StringBuffer();
		hql.append("DELETE Country country ");
		hql.append("WHERE country.countryCode = :countryCode ");

		Query query = session.createQuery(hql.toString());
		query.setParameter("countryCode", "COUNTRY-0001");

		query.executeUpdate();
		closeSession();

		// 3. assert
		newSession();
		Country result = (Country) session.get(Country.class, "COUNTRY-0001");
		Assert.assertNull("fail to delete country.", result);
		closeSession();
	}

	/**
	 * By calling for Hibernate API, single item of country information is
	 * registered and registration is verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	private Country addCountry() throws Exception {
		// 1. insert a new country information
		Country country = new Country();
		String countryCode = "CTR-0001";
		country.setCountryCode(countryCode);
		country.setCountryId("KR");
		country.setCountryName("Korea");
		session.save(country);

		// 2. check if creation is successful
		assertCountryInfo(countryCode, country);

		return country;
	}

	/**
	 * By using countryCode, the match between country information retrieved
	 * from DB and entered country information is verified.
	 * 
	 * @param countryCode
	 *            Country Code
	 * @param country
	 *            Country Information
	 * @throws Exception
	 *             throws Exception in case assertion is fail
	 */
	private void assertCountryInfo(String countryCode, Country country)
			throws Exception {
		Country result = (Country) session.get(Country.class, countryCode);

		Assert.assertEquals("fail to match country id.", country.getCountryId(),
				result.getCountryId());
		Assert.assertEquals("fail to match country name.", country.getCountryName(),
				result.getCountryName());
	}
}
