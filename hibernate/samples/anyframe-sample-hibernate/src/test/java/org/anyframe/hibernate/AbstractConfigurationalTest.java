package org.anyframe.hibernate;

import net.sf.ehcache.CacheManager;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.junit.After;
import org.junit.Before;

public abstract class AbstractConfigurationalTest {
	protected SessionFactory initialSessionFactory;
	protected Session session;

	@Before
	public void setUp() {
		//super.setUp();
		if (initialSessionFactory == null) {
			initialSessionFactory = newSessionFactory(getHibernateConfigLocation());
		}
	}

	@After
	public void tearDown() {
		//super.tearDown();
		CacheManager.getInstance().shutdown();
	}

	private SessionFactory newSessionFactory(String configFilePath) {
		return new Configuration().configure(configFilePath)
				.buildSessionFactory();
	}
	
	protected void newSession() {
		session = initialSessionFactory.openSession();
		session.beginTransaction();
	}

	protected void closeSession() {
		session.getTransaction().commit();
		session.close();
	}	

	protected abstract String getHibernateConfigLocation();
}
