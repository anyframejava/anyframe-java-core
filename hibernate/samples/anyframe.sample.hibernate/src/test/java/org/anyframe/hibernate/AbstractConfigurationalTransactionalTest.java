package org.anyframe.hibernate;

import junit.framework.TestCase;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public abstract class AbstractConfigurationalTransactionalTest extends TestCase {
	private SessionFactory initialSessionFactory;
	protected Session session;

	protected void setUp() throws Exception {
		super.setUp();
		if (initialSessionFactory == null) {
			initialSessionFactory = newSessionFactory(getHibernateConfigLocation());
		}
		session = initialSessionFactory.openSession();
		session.beginTransaction();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
		session.getTransaction().commit();
		session.close();
	}

	private SessionFactory newSessionFactory(String configFilePath) {
		return new Configuration().configure(configFilePath)
				.buildSessionFactory();
	}

	protected abstract String getHibernateConfigLocation();
}
