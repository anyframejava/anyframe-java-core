package org.anyframe.hibernate.transaction;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import javax.inject.Inject;

import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

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
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/org/anyframe/hibernate/transaction/jta/context-*.xml" })
public class HibernateJTATransactionManagerTest {

	@Inject
	private SessionFactory sessionFactory;

	// public void setSessionFactory(SessionFactory sessionFactory) {
	// this.sessionFactory = sessionFactory;
	// }

	/**
	 * [Flow #-1] Positive Case : By using WebLogicJtaTransactionManager
	 * Rollback, entering initialization data is applied on to DB. After that,
	 * it is verified whether data is properly rolled back.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testRollback() throws Exception {
		// 1. insert init data
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		SetUpInitData.initializeData(session);

		// 2. rollback transaction
		session.getTransaction().rollback();
		session.close();

		// 3. begin a new transaction
		session = sessionFactory.openSession();
		session.beginTransaction();

		// 4. check if insertion is rollbacked
		Movie movie = (Movie) session.get(Movie.class, "MV-00001");
		assertNull("fail to rollback init data.", movie);
		
		session.close();
	}

	/**
	 * [Flow #-2] Positive Case : By using WebLogicJtaTransactionManager commit,
	 * entering initialization data is applied on to DB. After that, it is
	 * verified whether data is properly committed.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testCommit() throws Exception {
		// 1. insert init data
		Session session = sessionFactory.openSession();
		SetUpInitData.initializeData(session);
		session.beginTransaction();

		// 2. commit transaction
		session.getTransaction().commit();
		session.close();

		// 3. begin a new transaction
		session = sessionFactory.openSession();
		session.beginTransaction();

		// 4. check if insertion is successful
		Movie movie = (Movie) session.get(Movie.class, "MV-00001");
		assertNotNull("fail to add a movie.", movie);
		
		session.close();
	}
}
