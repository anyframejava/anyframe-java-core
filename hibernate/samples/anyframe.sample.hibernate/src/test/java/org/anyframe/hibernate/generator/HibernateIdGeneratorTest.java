package org.anyframe.hibernate.generator;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithHilo;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithIdentity;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithIncrement;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithSeqHilo;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithSequence;
import org.anyframe.sample.hibernate.model.unidirection.generator.CountryWithUUID;


/**
 * TestCase Name : HibernateIdGeneratorTest<br>
 * <br>
 * [Description] : Hibernate에서 기본 제공하는 각종 Id Generator 정의 방법에 대해 알아보고 신규 Id가 제대로
 * 생성되었는지 확인해본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Hibernate에서 제공하는 identity generator를 이용하여 COUNTRY
 * 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다.</li>
 * <li>#-2 Positive Case : Hibernate에서 제공하는 sequence generator를 이용하여 COUNTRY
 * 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다.</li>
 * <li>#-3 Positive Case : Hibernate에서 제공하는 increment generator를 이용하여 COUNTRY
 * 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다.</li>
 * <li>#-4 Positive Case : Hibernate에서 제공하는 Hilo generator를 이용하여 COUNTRY 테이블의
 * PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다. 이때 Hilo Generator의 속성 정보에 max_lo를 2로
 * 설정하였기 때문에 처음 Hilo Generator 실행시 2개의 신규 Id가 생성된다.</li>
 * <li>#-5 Positive Case : Hibernate에서 제공하는 SeqHilo generator를 이용하여 COUNTRY
 * 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다. 이때 SeqHilo Generator의 속성 정보에
 * max_lo를 2로 설정하였기 때문에 처음 SeqHilo Generator 실행시 2개의 신규 Id가 생성된다.</li>
 * <li>#-6 Positive Case : Hibernate에서 제공하는 UUID generator를 이용하여 COUNTRY 테이블의
 * PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateIdGeneratorTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/generator/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Hibernate에서 제공하는 identity generator를 이용하여
	 * COUNTRY 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryWithIdentityGenerator() throws Exception {
		CountryWithIdentity country1 = new CountryWithIdentity();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode = (Integer) session.save(country1);
		System.out.println("generated country code using identity : "
				+ countryCode);
		assertNotNull("fail to add a new country with identity generator.",
				countryCode);
	}

	/**
	 * [Flow #-2] Positive Case : Hibernate에서 제공하는 sequence generator를 이용하여
	 * COUNTRY 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryWithSequenceGenerator() throws Exception {
		CountryWithSequence country1 = new CountryWithSequence();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode = (Integer) session.save(country1);
		assertEquals("fail to generate a new countryCode.", 0, countryCode
				.intValue());
		assertNotNull("fail to add a new country with sequence generator.",
				countryCode);
	}

	/**
	 * [Flow #-3] Positive Case : Hibernate에서 제공하는 increment generator를 이용하여
	 * COUNTRY 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryWithIncrementGenerator() throws Exception {
		CountryWithIncrement country1 = new CountryWithIncrement();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode1 = (Integer) session.save(country1);
		assertEquals("fail to generate a new countryCode.", 1, countryCode1
				.intValue());
		assertNotNull("fail to add a new country with increment generator.",
				countryCode1);

		CountryWithIncrement country2 = new CountryWithIncrement();
		country2.setCountryId("JP");
		country2.setCountryName("Japan");

		Integer countryCode2 = (Integer) session.save(country2);
		assertEquals("fail to generate a new countryCode.", 2, countryCode2
				.intValue());
		assertNotNull("fail to add a new country with increment generator.",
				countryCode2);

		CountryWithIncrement country3 = new CountryWithIncrement();
		country3.setCountryId("US");
		country3.setCountryName("U.S.A");

		Integer countryCode3 = (Integer) session.save(country3);
		assertEquals("fail to generate a new countryCode.", 3, countryCode3
				.intValue());
		assertNotNull("fail to add a new country with increment generator.",
				countryCode3);
	}

	/**
	 * [Flow #-4] Positive Case : Hibernate에서 제공하는 Hilo generator를 이용하여 COUNTRY
	 * 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다. 이때 Hilo Generator의 속성 정보에
	 * max_lo를 2로 설정하였기 때문에 처음 Hilo Generator 실행시 2개의 신규 Id가 생성된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryWithHiloGenerator() throws Exception {
		// 1. insert a new country using countryCode which HiloGenerator
		// generate
		CountryWithHilo country1 = new CountryWithHilo();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode1 = (Integer) session.save(country1);
		assertEquals("fail to generate a new countryCode.", 1, countryCode1
				.intValue());
		assertNotNull("fail to add a new country with hilo generator.",
				countryCode1);

		// 2. just use an id which HiloGenerator generate in first step. because
		// max_lo attribute = 2 in hibernate mapping file.
		CountryWithHilo country2 = new CountryWithHilo();
		country2.setCountryId("JP");
		country2.setCountryName("Japan");

		Integer countryCode2 = (Integer) session.save(country2);
		assertEquals("fail to generate a new countryCode.", 2, countryCode2
				.intValue());
		assertNotNull("fail to add a new country with hilo generator.",
				countryCode2);

		// 2. HiloGenerator generate a new id. because max_lo attribute = 2 in
		// hibernate mapping file.
		CountryWithHilo country3 = new CountryWithHilo();
		country3.setCountryId("US");
		country3.setCountryName("U.S.A");

		Integer countryCode3 = (Integer) session.save(country3);
		assertEquals("fail to generate a new countryCode.", 3, countryCode3
				.intValue());
		assertNotNull("fail to add a new country with hilo generator.",
				countryCode3);
	}

	/**
	 * [Flow #-5] Positive Case : Hibernate에서 제공하는 SeqHilo generator를 이용하여
	 * COUNTRY 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다. 이때 SeqHilo Generator의
	 * 속성 정보에 max_lo를 2로 설정하였기 때문에 처음 SeqHilo Generator 실행시 2개의 신규 Id가 생성된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryWithSeqHiloGenerator() throws Exception {
		// 1. insert a new country using countryCode which HiloGenerator
		// generate
		CountryWithSeqHilo country1 = new CountryWithSeqHilo();
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Integer countryCode1 = (Integer) session.save(country1);
		assertEquals("fail to generate a new countryCode.", 1, countryCode1
				.intValue());
		assertNotNull(
				"fail to add a new country with sequence hilo generator.",
				countryCode1);

		// 2. just use an id which HiloGenerator generate in first step. because
		// max_lo attribute = 2 in hibernate mapping file.
		CountryWithSeqHilo country2 = new CountryWithSeqHilo();
		country2.setCountryId("JP");
		country2.setCountryName("Japan");

		Integer countryCode2 = (Integer) session.save(country2);
		assertEquals("fail to generate a new countryCode.", 2, countryCode2
				.intValue());
		assertNotNull(
				"fail to add a new country with sequence hilo generator.",
				countryCode2);

		// 2. HiloGenerator generate a new id. because max_lo attribute = 2 in
		// hibernate mapping file.
		CountryWithSeqHilo country3 = new CountryWithSeqHilo();
		country3.setCountryId("US");
		country3.setCountryName("U.S.A");

		Integer countryCode3 = (Integer) session.save(country3);
		assertEquals("fail to generate a new countryCode.", 3, countryCode3
				.intValue());
		assertNotNull(
				"fail to add a new country with sequence hilo generator.",
				countryCode3);
	}

	/**
	 * [Flow #-6] Positive Case : Hibernate에서 제공하는 UUID generator를 이용하여 COUNTRY
	 * 테이블의 PRIMARY KEY인 COUNTRY_CODE를 자동생성하도록 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testAddCountryWithUUIDGenerator() throws Exception {
		CountryWithUUID country1 = new CountryWithUUID();
		country1.setCountryId("KR");
		country1.setCountryName("대한민국");

		String countryCode = (String) session.save(country1);
		assertTrue("fail to generate a new countryCode.", countryCode
				.indexOf("#") != -1);
		assertNotNull("fail to add a new country with UUID generator.",
				countryCode);
	}

}
