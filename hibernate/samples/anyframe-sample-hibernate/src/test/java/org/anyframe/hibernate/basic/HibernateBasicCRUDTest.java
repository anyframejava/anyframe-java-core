package org.anyframe.hibernate.basic;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateBasicCRUDTest <br>
 * <br>
 * [Description] : Hibernate API - By calling for save(), update(), delete() and
 * get() methods, a piece of entity information can be registered, modified,
 * deleted and searched. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for Hibernate API, newly registered
 * Country information is modified and verified for modification.</li>
 * <li>#-2 Positive Case : By calling for Hiberate API, newly registered Country
 * information is deleted and verified for deletion.</li>
 * <li>#-3 Positive Case : By calling for Hibernate API, one country name is
 * registered and verified for registration.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateBasicCRUDTest extends
		AbstractConfigurationalTransactionalTest {

	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : By calling for Hibernate API, newly registered
	 * country information is modified and verified for modification.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testUpdateCountry() throws Exception {
		// 1. insert a new country information
		Country country = addCountry();

		// 2. update a country information
		country.setCountryName("Republic of Korea");
		session.update(country);

		// 3. check if update is successful
		assertCountryInfo(country.getCountryCode(), country);
	}

	/**
	 * [Flow #-2] Positive Case : By calling for Hibernate API, newly registered
	 * Country information is deleted and verified for deletion.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testDeleteCountry() throws Exception {
		// 1. insert a new country information
		Country country = addCountry();

		// 2. delete a country information
		session.delete(country);

		// 3. check if delete is successful
		Country result = (Country) session.get(Country.class, country
				.getCountryCode());
		Assert.assertNull("Fail to delete", result);
	}

	/**
	 * [Flow #-3] Positive Case : By calling for Hibernate API, one country name
	 * is registered and verified for registration.
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
	 * By using countrycode, the match between country information searched from
	 * DB and entered country information is verified.
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
