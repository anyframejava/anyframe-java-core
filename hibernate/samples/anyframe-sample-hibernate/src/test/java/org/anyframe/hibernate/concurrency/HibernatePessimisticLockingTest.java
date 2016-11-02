package org.anyframe.hibernate.concurrency;

import java.util.HashSet;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.concurrency.pessimistic.Country;
import org.anyframe.sample.hibernate.model.bidirection.concurrency.pessimistic.Movie;
import org.anyframe.util.DateUtil;
import org.hibernate.LockMode;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.exception.LockAcquisitionException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernatePessimisticLockingTest <br>
 * <br>
 * [Description] : Pessimistic Locking test is carried out. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Pessimistic Locking is executed by using
 * LockMode.UPGRADE.</li>
 * <li>#-2 Positive Case : Pessimistic Locking is executed by using
 * LockMode.UPGRADE_NOWAIT.</li>
 * <li>#-3 Positive Case : Pessimistic Locking is executed by using
 * LockMode.NONE.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernatePessimisticLockingTest extends
		AbstractConfigurationalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/concurrency/hibernate-pessimistic.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Pessimistic Locking is executed by using
	 * LockMode.UPGRADE. By giving sleeptime to the second Thread, the first
	 * Thread can start first. Therefore, select…for update statement is
	 * executed first via the first Thread, creating Lock on relevant Row. And
	 * the first Thread goes sleep() for given time before executing
	 * session.flush(). So, following the second Thread is blocked until the
	 * first Thread update is completed and later finds correction work is tried
	 * based on the value changed at the first Thread.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@SuppressWarnings("static-access")
	@Test
	public void testUpdateCountryWithLockModeUpgrade() throws Exception {
		// 1. insert a new country, movies information
		newSession();
		addCountryMovieAtOnce();
		closeSession();

		// 2. define a first thread with LockMode.UPGRADE. sleep for 10000
		// milliseconds before committing
		CountryThread fstThread = new CountryThread(initialSessionFactory,
				LockMode.PESSIMISTIC_WRITE, 10000);
		fstThread.setThreadId("first");

		// 3. define a second thread with LockMode.UPGRADE. no sleep before
		// committing
		CountryThread scdThread = new CountryThread(initialSessionFactory,
				LockMode.PESSIMISTIC_WRITE, 0);
		scdThread.setThreadId("second");

		// 4. start first thread
		fstThread.start();

		// 5. start second thread after 1000 milliseconds
		scdThread.start();
		scdThread.sleep(1000);

		// 6. assert the country name of second thread
		Assert.assertEquals("fail to wait for commiting of first transaction.",
				"[null] , [null]", scdThread.getCountryName());

		fstThread.join();
		scdThread.join();

		// 7. assert country names of each thread
		Assert.assertEquals("[Korea] , [first : Republic of Korea]", fstThread
				.getCountryName());
		Assert.assertEquals(
				"[first : Republic of Korea] , [second : Republic of Korea]",
				scdThread.getCountryName());
	}

	/**
	 * [Flow #-2] Positive Case : Pessimistic Locking is executed by using
	 * LockMode.UPGRADE NOWAIT. By giving sleeptime to the second Thread, the
	 * first Thread can start first. Therefore, select…for update nowait
	 * statement is executed first via the first Thread, creating Lock on
	 * relevant Row. And the first Thread goes sleep() for given time before
	 * executing session.flush(). So, if the second Thread tries slect…for
	 * update nowait, LockAcquisitionException is thrown right away and
	 * correction work via the second Thread is not carried out.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@SuppressWarnings("static-access")
	@Test
	public void testUpdateCountryWithLockModeUpgradeNoWait() throws Exception {
		// 1. insert a new country, movies information
		newSession();
		addCountryMovieAtOnce();
		closeSession();

		// 2. define a first thread with LockMode.UPGRADE_NOWAIT. sleep for
		// 10000 milliseconds before committing
		CountryThread fstThread = new CountryThread(initialSessionFactory,
				LockMode.UPGRADE_NOWAIT, 10000);
		fstThread.setThreadId("first");

		// 3. define a second thread with LockMode.UPGRADE_NOWAIT. no sleep
		// before committing
		CountryThread scdThread = new CountryThread(initialSessionFactory,
				LockMode.UPGRADE_NOWAIT, 0);
		scdThread.setThreadId("second");

		// 4. start first thread
		fstThread.start();

		// 5. start second thread after 1000 milliseconds
		scdThread.start();
		scdThread.sleep(1000);

		// 6. assert the country name of second thread
		Assert.assertEquals("fail to wait for commiting of first transaction.",
				"[null] , [null]", scdThread.getCountryName());

		fstThread.join();
		scdThread.join();

		// 7. assert country names of each thread
		Assert.assertEquals("[Korea] , [first : Republic of Korea]", fstThread
				.getCountryName());
		Assert.assertEquals("[null] , [null]", scdThread.getCountryName());
	}

	/**
	 * [Flow #-3] Positive Case : Pessimistic Locking is executed by using
	 * LockMode.NONE. By giving sleeptime to the second Thread, the first Thread
	 * can start first. Therefore, select…statement is executed first via the
	 * first Thread, but without Locking. And the first Thread goes sleep() for
	 * given time before executing session.flush(). Therefore, following the
	 * second Tread tries select, correction work is carried out right away.
	 * after Thread sleep() for given time, correction work is carried out
	 * without considering the second Tread change.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@SuppressWarnings("static-access")
	@Test
	public void testUpdateCountryWithLockModeNone() throws Exception {
		// 1. insert a new country, movies information
		newSession();
		addCountryMovieAtOnce();
		closeSession();

		// 2. define a first thread with LockMode.NONE. sleep for
		// 15000 milliseconds before committing
		CountryThread fstThread = new CountryThread(initialSessionFactory,
				LockMode.NONE, 20000);
		fstThread.setThreadId("first");

		// 3. define a second thread with LockMode.NONE. no sleep
		// before committing
		CountryThread scdThread = new CountryThread(initialSessionFactory,
				LockMode.NONE, 0);
		scdThread.setThreadId("second");

		// 4. start first thread
		fstThread.start();

		// 5. start second thread after 1000 milliseconds
		scdThread.start();
		scdThread.sleep(1000);

		// 6. assert the country name of second thread
		Assert.assertEquals("fail to no wait",
				"[Korea] , [second : Republic of Korea]", scdThread
						.getCountryName());

		fstThread.join();
		scdThread.join();

		// 7. assert country names of each thread
		Assert.assertEquals("[Korea] , [first : Republic of Korea]", fstThread
				.getCountryName());
		Assert.assertEquals("[Korea] , [second : Republic of Korea]", scdThread
				.getCountryName());
	}

	public class CountryThread extends Thread {
		private SessionFactory initialSessionFactory;
		private long sleepTime;
		private String id;
		private String beforeCountryName;
		private String afterCountryName;
		private LockMode lockMode;

		public CountryThread(SessionFactory initialSessionFactory,
				LockMode lockMode, long sleepTime) {
			this.initialSessionFactory = initialSessionFactory;
			this.lockMode = lockMode;
			this.sleepTime = sleepTime;
		}

		public void setThreadId(String id) throws Exception {
			this.id = id;
		}

		public void run() {
			try {

				Session session = initialSessionFactory.openSession();
				session.beginTransaction();

				Country country = (Country) session.get(Country.class,
						"CTR-0001", this.lockMode);
				this.beforeCountryName = country.getCountryName();

				country.setCountryName(id + " : Republic of Korea");
//				this.sleep(sleepTime);
				CountryThread.sleep(sleepTime);

				session.flush();

				country = (Country) session.get(Country.class, "CTR-0001");
				this.afterCountryName = country.getCountryName();

				session.getTransaction().commit();
				session.close();
			} catch (Exception e) {
				e.printStackTrace();
				// assert - if LockMode is UPGRADE_NOWAIT and the second
				// transaction start, expected to throw
				// LockAcquisitionException.
				if (this.lockMode == LockMode.UPGRADE_NOWAIT
						&& id.equals("second")) {
					Assert.assertTrue("fail to no wait.",
							e instanceof LockAcquisitionException);
				}
			}
		}

		public String getCountryName() {
			return "[" + beforeCountryName + "] , [" + afterCountryName + "]";
		}
	}

	private String addCountryMovieAtOnce() throws Exception {
		// 1. insert a country information with movies
		Movie movie1 = new Movie();
		movie1.setMovieId("MV-00001");
		movie1.setDirector("J.Y.Gwak");
		movie1.setReleaseDate(DateUtil.stringToDate("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.stringToDate("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");

		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Set<Movie> movies = new HashSet<Movie>();
		movie1.setCountry(country1);
		movies.add(movie1);
		movie2.setCountry(country1);
		movies.add(movie2);
		country1.setMovies(movies);

		session.save(country1);

		return countryCode;
	}
}
