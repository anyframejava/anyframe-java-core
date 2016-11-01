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
 * [Description] : Hibernate API - save(), update(), delete(), get() 메소드를 호출함으로써
 * 하나의 엔티티 정보를 등록/수정/삭제/조회해 본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Hibernate API를 호출하여 신규 등록된 Country 정보를 수정한 후, 수정 여부를
 * 검증한다.</li>
 * <li>#-2 Positive Case : Hibernate API를 호출하여 신규 등록된 Country 정보를 삭제한 후, 삭제 여부를
 * 검증한다.</li>
 * <li>#-3 Positive Case : Hibernate API를 호출하여 한건의 Country를 등록한 후, 등록 여부를 검증한다.</li>
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
	 * [Flow #-1] Positive Case : Hibernate API를 호출하여 신규 등록된 Country 정보를 수정한 후,
	 * 수정 여부를 검증한다.
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
	 * [Flow #-2] Positive Case : Hibernate API를 호출하여 신규 등록된 Country 정보를 삭제한 후,
	 * 삭제 여부를 검증한다.
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
	 * [Flow #-3] Positive Case : Hibernate API를 호출하여 한건의 Country를 등록한 후, 등록 여부를
	 * 검증한다.
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
	 * countryCode를 이용하여 DB로부터 검색한 Country 정보와 입력된 Country 정보가 일치하는지 검증한다.
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
