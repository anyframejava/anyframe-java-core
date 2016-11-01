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
 * [Description] : Pessimistic Locking 테스트를 수행해본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : LockMode.UPGRADE를 이용하여 Pessimistic Locking을 수행한다.</li>
 * <li>#-2 Positive Case : LockMode.UPGRADE_NOWAIT를 이용하여 Pessimistic Locking을
 * 수행한다.</li>
 * <li>#-3 Positive Case : LockMode.NONE을 이용하여 Pessimistic Locking을 수행한다.</li>
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
	 * [Flow #-1] Positive Case : LockMode.UPGRADE를 이용하여 Pessimistic Locking을
	 * 수행한다. 두번째 Thread에 sleeptime을 줌으로써, 첫번째 Thread를 명시적으로 먼저 start할 수 있도록 하여
	 * 첫번째 Thread를 통해 먼저 select ... for update 문이 수행되면서 해당 Row에 Lock이 생긴다. 그리고
	 * 첫번째 Thread에서는 session.flush()를 수행하기 전에 주어진 시간만큼 sleep()하게 된다. <br/> 따라서
	 * 뒤이은 두번째 Thread에서는 첫번째 Thread의 update 작업이 완료될 때까지 blocking되어 있다가 첫번째
	 * Thread에서 변경한 값을 기반으로 수정 작업을 시도하게 되는 것을 알 수 있다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testUpdateCountryWithLockModeUpgrade() throws Exception {
		// 1. insert a new country, movies information
		newSession();
		addCountryMovieAtOnce();
		closeSession();

		// 2. define a first thread with LockMode.UPGRADE. sleep for 10000
		// milliseconds before committing
		CountryThread fstThread = new CountryThread(initialSessionFactory,
				LockMode.UPGRADE, 10000);
		fstThread.setThreadId("first");

		// 3. define a second thread with LockMode.UPGRADE. no sleep before
		// committing
		CountryThread scdThread = new CountryThread(initialSessionFactory,
				LockMode.UPGRADE, 0);
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
	 * [Flow #-2] Positive Case : LockMode.UPGRADE_NOWAIT를 이용하여 Pessimistic
	 * Locking을 수행한다. 두번째 Thread에 sleeptime을 줌으로써, 첫번째 Thread를 명시적으로 먼저 start할 수
	 * 있도록 하여 첫번째 Thread를 통해 먼저 select ... for update nowait 문이 수행되면서 해당 Row에
	 * Lock이 생긴다. 그리고 첫번째 Thread에서는 session.flush()를 수행하기 전에 주어진 시간만큼 sleep()하게
	 * 된다. <br/> 따라서 뒤이은 두번째 Thread에서 select ... for update nowait을 시도하면 기다리지 않고
	 * 바로 LockAcquisitionException이 throw되면서 두번째 Thread를 통한 수정 작업은 이루어지지 않음을 알 수
	 * 있다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
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
	 * [Flow #-3] Positive Case : LockMode.NONE를 이용하여 Pessimistic Locking을 수행한다.
	 * 두번째 Thread에 sleeptime을 줌으로써, 첫번째 Thread를 명시적으로 먼저 start할 수 있도록 하여 첫번째
	 * Thread를 통해 먼저 select ... 문이 수행되나 Lock이 걸리지는 않는다. 그리고 첫번째 Thread에서는
	 * session.flush()를 수행하기 전에 주어진 시간만큼 sleep()하게 된다. <br/> 따라서 뒤이은 두번째
	 * Thread에서 select를 시도하면 기다리지 않고 바로 두번째 Thread를 통한 수정 작업이 이루어진다. 첫번째
	 * Thread에서는 주어진 시간만큼 sleep()한 후, 두번째 Thread의 변경 내용을 무시한 채 수정 작업을 처리한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
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
				this.sleep(sleepTime);

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
		movie1.setReleaseDate(DateUtil.string2Date("2001-07-27", "yyyy-MM-dd"));
		movie1.setTitle("My Sassy Girl");

		Movie movie2 = new Movie();
		movie2.setMovieId("MV-00002");
		movie2.setDirector("Hojun Kim");
		movie2.setReleaseDate(DateUtil.string2Date("2004-04-02", "yyyy-MM-dd"));
		movie2.setTitle("My Little Bride");

		Country country1 = new Country();
		String countryCode = "CTR-0001";
		country1.setCountryCode(countryCode);
		country1.setCountryId("KR");
		country1.setCountryName("Korea");

		Set movies = new HashSet();
		movie1.setCountry(country1);
		movies.add(movie1);
		movie2.setCountry(country1);
		movies.add(movie2);
		country1.setMovies(movies);

		session.save(country1);

		return countryCode;
	}
}
