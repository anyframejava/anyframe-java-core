package org.anyframe.hibernate.hql;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.hibernate.Query;


/**
 * TestCase Name : HibernateCUDHQLTest<br>
 * <br>
 * [Description] : HQL(Hibernate Query Language)을 통해 CUD 작업을 수행하여 본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : HQL을 이용하여 신규 Country 정보를 등록한다.</li>
 * <li>#-2 Positive Case : HQL을 이용하여 Country 정보를 수정한다.</li>
 * <li>#-3 Positive Case : HQL을 이용하여 등록된 Country 정보를 삭제한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateCUDHQLTest extends AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : HQL을 이용하여 신규 Country 정보를 등록한다. Hibernate에서는
	 * INSERT INTO ... VALUES 형태의 INSERT문은 지원되지 않으며, INSERT INTO ... SELECT 형태의
	 * INSERT문만 지원됨에 유의해야 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
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
		assertNotNull("fail to insert country.", result);
		closeSession();
	}

	/**
	 * [Flow #-2] Positive Case : HQL을 이용하여 Country 정보를 수정한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
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
		assertEquals("fail to match country name.", "Republic of Korea", result
				.getCountryName());
		closeSession();
	}

	/**
	 * [Flow #-3] Positive Case : HQL을 이용하여 등록된 Country 정보를 삭제한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
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
		assertNull("fail to delete country.", result);
		closeSession();
	}

	/**
	 * Hibernate API를 호출하여 한건의 Country를 등록한 후, 등록 여부를 검증한다.
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

		assertEquals("fail to match country id.", country.getCountryId(),
				result.getCountryId());
		assertEquals("fail to match country name.", country.getCountryName(),
				result.getCountryName());
	}
}
