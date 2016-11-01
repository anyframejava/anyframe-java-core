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
 * [Description] : When various cases of data are added within one transaction,
 * considerations via testcase are looked into. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Added are various amounts of data within one
 * transaction.</li>
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
	 * [Flow #-1] Positive Case : Added are various amounts of data. In the case
	 * where there are many sets of data, memory can be full so that it is
	 * recommended to somewhat flush in the middle of process and clear cache.
	 * This test code dictates to flush once ten pieces of data are collected.
	 * In this case, according to hibernate.jdbc.batch_size value defined in
	 * hibernate.cfg.xml, 10 pieces of data are inserted into the batch
	 * simultaneously. It is recommended to match data number for flush and
	 * value of save(), update(), saveOrUpdate().
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
