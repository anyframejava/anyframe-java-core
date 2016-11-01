package org.anyframe.hibernate.generator;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithHilo;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithIdentity;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithIncrement;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithSeqHilo;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithSequence;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithUUID;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateIdGeneratorTest<br>
 * <br>
 * [Description] : Various Id Generator definition ways provided by Hibernate as
 * default are looked into and it is checked whether a new I.D. is properly
 * created. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : COUNTRY_CODE, PRIMARY KEY of table is automatically
 * created with identity generator provided by Hibernate.</li>
 * <li>#-2 Positive Case : COUNTRY_CODE, PRIMARY KEY of table is automatically
 * created with sequence generator provided by Hibernate.</li>
 * <li>#-3 Positive Case : COUNTRY_CODE, PRIMARY KEY of table is automatically
 * created with increment generator provided by Hibernate.</li>
 * <li>#-4 Positive Case : COUNTRY_CODE, PRIMARY KEY of table is automatically
 * created with Hilo generator provided by Hibernate. In this case, given that
 * maz lo is set as 2 at Hilo Generator property information, when Hilo
 * Generator is executed for the first time, two new I.D.s are created.</li>
 * <li>#-5 Positive Case : COUNTRY_CODE, PRIMARY KEY of table is automatically
 * created with SeqHilo generator provided by Hibernate. In this case, given
 * that max lo is set as 2 at SeqHilo Generator property information, when
 * SeqHilo Generator is executed for the first time, two new I.D.s are created.</li>
 * <li>#-6 Positive Case : COUNTRY_CODE, PRIMARY KEY of table is automatically
 * created with UUID generator provided by Hibernate.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateIdGeneratorTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/generator/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : COUNTRY_CODE, PRIMARY KEY of table is
	 * automatically created with identitiy generator provided by Hibernate.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryWithIdentityGenerator() throws Exception {
		CountryWithIdentity country1 = new CountryWithIdentity();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode = (Integer) session.save(country1);
		System.out.println("generated country code using identity : "
				+ countryCode);
		Assert.assertNotNull("fail to add a new country with identity generator.",
				countryCode);
	}

	/**
	 * [Flow #-2] Positive Case : COUNTRY_CODE, PRIMARY KEY of table is
	 * automatically created with sequence generator provided by Hibernate.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryWithSequenceGenerator() throws Exception {
		CountryWithSequence country1 = new CountryWithSequence();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode = (Integer) session.save(country1);
		Assert.assertEquals("fail to generate a new countryCode.", 0, countryCode
				.intValue());
		Assert.assertNotNull("fail to add a new country with sequence generator.",
				countryCode);
	}

	/**
	 * [Flow #-3] Positive Case : COUNTRY_CODE, PRIMARY KEY of table is
	 * automatically created with increment generator provided by Hibernate.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryWithIncrementGenerator() throws Exception {
		CountryWithIncrement country1 = new CountryWithIncrement();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode1 = (Integer) session.save(country1);
		Assert.assertEquals("fail to generate a new countryCode.", 1, countryCode1
				.intValue());
		Assert.assertNotNull("fail to add a new country with increment generator.",
				countryCode1);

		CountryWithIncrement country2 = new CountryWithIncrement();
		country2.setCountryId("JP");
		country2.setCountryName("Japan");

		Integer countryCode2 = (Integer) session.save(country2);
		Assert.assertEquals("fail to generate a new countryCode.", 2, countryCode2
				.intValue());
		Assert.assertNotNull("fail to add a new country with increment generator.",
				countryCode2);

		CountryWithIncrement country3 = new CountryWithIncrement();
		country3.setCountryId("US");
		country3.setCountryName("U.S.A");

		Integer countryCode3 = (Integer) session.save(country3);
		Assert.assertEquals("fail to generate a new countryCode.", 3, countryCode3
				.intValue());
		Assert.assertNotNull("fail to add a new country with increment generator.",
				countryCode3);
	}

	/**
	 * [Flow #-4] Positive Case : COUNTRY_CODE, PRIMARY KEY of table is
	 * automatically created with Hilo generator provided by Hibernate. In this
	 * case, given that max lo is set as 2 at Hilo Generator property
	 * information, when SeqHilo Generator is executed for the first time, two
	 * new I.D.s are created.
	 * 
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test  
	public void testAddCountryWithHiloGenerator() throws Exception {
		// 1. insert a new country using countryCode which HiloGenerator
		// generate
		CountryWithHilo country1 = new CountryWithHilo();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode1 = (Integer) session.save(country1);
		Assert.assertEquals("fail to generate a new countryCode.", 1, countryCode1
				.intValue());
		Assert.assertNotNull("fail to add a new country with hilo generator.",
				countryCode1);

		// 2. just use an id which HiloGenerator generate in first step. because
		// max_lo attribute = 2 in hibernate mapping file.
		CountryWithHilo country2 = new CountryWithHilo();
		country2.setCountryId("JP");
		country2.setCountryName("Japan");

		Integer countryCode2 = (Integer) session.save(country2);
		Assert.assertEquals("fail to generate a new countryCode.", 2, countryCode2
				.intValue());
		Assert.assertNotNull("fail to add a new country with hilo generator.",
				countryCode2);

		// 2. HiloGenerator generate a new id. because max_lo attribute = 2 in
		// hibernate mapping file.
		CountryWithHilo country3 = new CountryWithHilo();
		country3.setCountryId("US");
		country3.setCountryName("U.S.A");

		Integer countryCode3 = (Integer) session.save(country3);
		Assert.assertEquals("fail to generate a new countryCode.", 3, countryCode3
				.intValue());
		Assert.assertNotNull("fail to add a new country with hilo generator.",
				countryCode3);
	}

	/**
	 * [Flow #-5] Positive Case : COUNTRY_CODE, PRIMARY KEY of table is
	 * automatically created with Hilo generator provided by Hibernate. In this
	 * case, given that max lo is set as 2 at Hilo Generator property
	 * information, when SeqHilo Generator is executed for the first time, two
	 * new I.D.s are created.
	 * 
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryWithSeqHiloGenerator() throws Exception {
		// 1. insert a new country using countryCode which HiloGenerator
		// generate
		CountryWithSeqHilo country1 = new CountryWithSeqHilo();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode1 = (Integer) session.save(country1);
		Assert.assertEquals("fail to generate a new countryCode.", 1,
				countryCode1.intValue());
		Assert.assertNotNull(
				"fail to add a new country with sequence hilo generator.",
				countryCode1);

		// 2. just use an id which HiloGenerator generate in first step. because
		// max_lo attribute = 2 in hibernate mapping file.
		CountryWithSeqHilo country2 = new CountryWithSeqHilo();
		country2.setCountryId("JP");
		country2.setCountryName("Japan");

		Integer countryCode2 = (Integer) session.save(country2);
		Assert.assertEquals("fail to generate a new countryCode.", 2, countryCode2
				.intValue());
		Assert.assertNotNull(
				"fail to add a new country with sequence hilo generator.",
				countryCode2);

		// 2. HiloGenerator generate a new id. because max_lo attribute = 2 in
		// hibernate mapping file.
		CountryWithSeqHilo country3 = new CountryWithSeqHilo();
		country3.setCountryId("US");
		country3.setCountryName("U.S.A");

		Integer countryCode3 = (Integer) session.save(country3);
		Assert.assertEquals("fail to generate a new countryCode.", 3, countryCode3
				.intValue());
		Assert.assertNotNull(
				"fail to add a new country with sequence hilo generator.",
				countryCode3);
	}

	/**
	 * [Flow #-6] Positive Case : COUNTRY_CODE, PRIMARY KEY of table is
	 * automatically created with UUID generator provided by Hibernate.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testAddCountryWithUUIDGenerator() throws Exception {
		CountryWithUUID country1 = new CountryWithUUID();
		country1.setCountryId("KR");
		country1.setCountryName("korea");

		String countryCode = (String) session.save(country1);
		Assert.assertTrue("fail to generate a new countryCode.", countryCode
				.indexOf("#") != -1);
		Assert.assertNotNull("fail to add a new country with UUID generator.",
				countryCode);
	}

}
