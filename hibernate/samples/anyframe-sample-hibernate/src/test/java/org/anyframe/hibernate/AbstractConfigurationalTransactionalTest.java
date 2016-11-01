package org.anyframe.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.junit.After;
import org.junit.Before;

public abstract class AbstractConfigurationalTransactionalTest {
	private SessionFactory initialSessionFactory;
	protected Session session;

	@Before
	public void setUp() throws Exception {
		if (initialSessionFactory == null) {
			initialSessionFactory = newSessionFactory(getHibernateConfigLocation());
		}
		session = initialSessionFactory.openSession();
		session.beginTransaction();
	}

	@After
	public void tearDown() throws Exception {
		session.getTransaction().commit();
		session.close();
	}

	private SessionFactory newSessionFactory(String configFilePath) {
		return new Configuration().configure(configFilePath)
				.buildSessionFactory();
	}

	protected abstract String getHibernateConfigLocation();
}
