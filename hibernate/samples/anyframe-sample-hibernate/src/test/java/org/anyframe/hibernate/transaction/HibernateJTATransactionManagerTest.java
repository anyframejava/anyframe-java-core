package org.anyframe.hibernate.transaction;

import javax.inject.Inject;

import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.test.AbstractTransactionalDataSourceSpringContextTests;

/**
 * TestCase Name : HibernateJTATransactionManager<br>
 * <br>
 * [Description] : It is checked whether transaction is well managed with
 * WebLogicJtaTransactionManager, one of JTA Transaction Manager provided at
 * Spring Framework.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By using WebLogicJtaTransactionManager Rollback,
 * entering initialization data is cancelled. After that, it is verified whether
 * data is properly rolled back.</li>
 * <li>#-2 Positive Case : By using WebLogicJtaTransactionManager commit,
 * entering initialization data is applied on to DB. After that, it is verified
 * whether data is properly committed.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateJTATransactionManagerTest extends
		AbstractTransactionalDataSourceSpringContextTests {
	protected String[] getConfigLocations() {
		return new String[] { "file:./src/test/resources/org/anyframe/hibernate/transaction/jta/context-*.xml" };
	}

	// @Inject
	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	/**
	 * [Flow #-1] Positive Case : By using WebLogicJtaTransactionManager
	 * Rollback, entering initialization data is applied on to DB. After that,
	 * it is verified whether data is properly rolled back.
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
	 * [Flow #-2] Positive Case : By using WebLogicJtaTransactionManager commit,
	 * entering initialization data is applied on to DB. After that, it is
	 * verified whether data is properly committed.
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
