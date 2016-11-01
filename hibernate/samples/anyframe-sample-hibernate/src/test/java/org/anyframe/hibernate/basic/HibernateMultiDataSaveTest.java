package org.anyframe.hibernate.basic;


import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.hibernate.CacheMode;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateMultiDataSaveTest <br>
 * <br>
 * [Description] : 하나의 트랜잭션 내에서 여러 건의 데이터를 추가할 때, 고려해야 할 사항들을 테스트케이스를 통해 알아보고자
 * 한다. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : 하나의 트랜잭션 내에서 여러 건의 데이터를 추가한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateMultiDataSaveTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : 여러 건의 데이터를 추가한다. 이때, 추가해야 하는 데이터의 건수가 많은 경우
	 * Memory Full이 발생할 수 있으므로 적당히 중간에 flush를 수행하고 Cache를 clear해 주는 것이 좋다. 이 테스트
	 * 코드에서는 10건의 신규 데이터가 쌓이면 flush를 시도하게 되는데 hibernate.cfg.xml 파일에 정의된
	 * hibernate.jdbc.batch_size 값에 따라 10건의 데이터가 한꺼번에씩 batch로 INSERT된다. flush
	 * 하려는 데이터의 건수와 hibernate.jdbc.batch_size의 값을 맞춰주는 것이 좋다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testMultiSave() throws Exception {
		// 1. bypass 2nd level cache. each modification of an object durign the
		// batch procedure must be propagated to the 2nd leve cache. this
		// results into unnecessary overhead.
		session.setCacheMode(CacheMode.IGNORE);

		// 2. insert country
		for (int i = 0; i < 90; i++) {
			Country country = new Country();
			String countryCode = "CTR-000" + i;
			country.setCountryCode(countryCode);
			country.setCountryId("KR" + i);
			country.setCountryName("Korea" + i);

			session.save(country);

			// prevent OutOfMemoryException
			if (i != 0 && i % 9 == 0) {
				// if flush generated 100 updates hibernate will send them in
				// batches of 10
				session.flush();
				// clear session (1st level cache)
				// Without session.clear hibernate will keep every loaded object
				// in the session and eventually will run out of memory
				session.clear();
			}
		}
	}
}
