package org.anyframe.hibernate.transaction;

import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.test.AbstractTransactionalDataSourceSpringContextTests;


/**
 * TestCase Name : HibernateJDBCTransactionManager<br>
 * <br>
 * [Description] : Spring Framework에서 제공하는 Hibernate JDBC Transaction Manager인
 * HibernateTransactionManager를 이용하여 트랜잭션이 제대로 관리되는지 확인한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : HibernateTransactionManager Rollback을 이용하여, 초기화 데이터의
 * 입력 작업을 취소시킨 후, 데이터가 제대로 Rollback되었는지 검증한다.</li>
 * <li>#-2 Positive Case : HibernateTransactionManager Commit을 이용하여, 초기화 데이터의
 * 입력 작업을 DB에 반영시킨 후, 데이터가 제대로 Commit되었는지 검증한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateJDBCTransactionManagerTest extends
		AbstractTransactionalDataSourceSpringContextTests {
	protected String[] getConfigLocations() {
		return new String[] { "classpath:/org/anyframe/hibernate/transaction/jdbc/context-*.xml" };
	}

	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	/**
	 * [Flow #-1] Positive Case : HibernateTransactionManager Rollback을 이용하여,
	 * 초기화 데이터의 입력 작업을 취소시킨 후, 데이터가 제대로 Rollback되었는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testRollback() throws Exception {
		// 1. insert init data
		Session session = sessionFactory.getCurrentSession();
		SetUpInitData.initializeData(session);

		// 2. rollback transaction
		isRollback();
		endTransaction();

		// 3. begin a new transaction
		startNewTransaction();

		// 4. check if insertion is rollbacked
		Movie movie = (Movie) sessionFactory.getCurrentSession().get(
				Movie.class, "MV-00001");
		assertNull("fail to rollback init data.", movie);
	}

	/**
	 * [Flow #-2] Positive Case : HibernateTransactionManager Commit을 이용하여, 초기화
	 * 데이터의 입력 작업을 DB에 반영시킨 후, 데이터가 제대로 Commit되었는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testCommit() throws Exception {
		// 1. insert init data
		Session session = sessionFactory.getCurrentSession();
		SetUpInitData.initializeData(session);

		// 2. commit transaction
		setComplete();
		endTransaction();

		// 3. begin a new transaction
		startNewTransaction();

		// 4. check if insertion is successful
		Movie movie = (Movie) sessionFactory.getCurrentSession().get(
				Movie.class, "MV-00001");
		assertNotNull("fail to add a movie.", movie);
	}
}
