package org.anyframe.hibernate.fetch;

import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.hibernate.Query;


/**
 * TestCase Name : HibernateFetchWithBatchSizeTest<br>
 * <br>
 * [Description] : Hibernate Lazy Loading으로 발생할 수 있는 N+1 SELECT 문제를 해결하기 위한 하나의
 * Fetch 전략에 대해 알아본다. Hibernate Mapping XML 파일 내에 특정 객체에 대한 batch-size 조건을 정의하였을
 * 경우, 수행되는 쿼리문의 개수와 쿼리문을 확인해 볼 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : COUNTRY 테이블을 대상으로 HQL을 이용한 조회 작업을 수행한다. (Hibernate
 * Mapping XML 파일에 정의된 Country:Movie 관계에서 Movie Set에 대한 Fetch Strategy를 Batch
 * Fetching (batch-size="2") 으로 정의하였음.) 특정 Country에 속한 Movie Set을 조회하고자 할 때
 * batch-size를 기반으로 SELECT문이 수행된다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateFetchWithBatchSizeTest extends
		AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/fetch/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : COUNTRY 테이블을 대상으로 HQL을 이용한 조회 작업을 수행한다.
	 * (Hibernate Mapping XML 파일에 정의된 Country:Movie 관계에서 Movie Set에 대한 Fetch
	 * Strategy를 Batch Fetching (batch-size="2") 으로 정의하였음.) 특정 Country에 속한 Movie
	 * Set을 조회하고자 할 때 batch-size를 기반으로 SELECT문이 수행된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
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
		assertEquals("fail to match the size of movie list.", 3, countryList
				.size());

		for (int i = 0; i < countryList.size(); i++) {
			Country country = (Country) countryList.get(i);

			if (i == 0) {
				assertEquals("fail to match a country name.", "Korea", country
						.getCountryName());

				Set movies = country.getMovies();
				assertEquals("fail to match the size of movie list.", 2, movies
						.size());
			} else if (i == 1) {
				assertEquals("fail to match a country name.", "Japan", country
						.getCountryName());

				Set movies = country.getMovies();
				assertEquals("fail to match the size of movie list.", 1, movies
						.size());
			} else if (i == 2) {
				assertEquals("fail to match a country name.", "U.S.A", country
						.getCountryName());

				Set movies = country.getMovies();
				assertEquals("fail to match the size of movie list.", 0, movies
						.size());
			}

		}
		session.close();
	}
}
