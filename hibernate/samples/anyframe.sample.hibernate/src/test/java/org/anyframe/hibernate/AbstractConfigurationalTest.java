package org.anyframe.hibernate;

import junit.framework.TestCase;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public abstract class AbstractConfigurationalTest extends TestCase {
	protected SessionFactory initialSessionFactory;
	protected Session session;

	protected void setUp() throws Exception {
		super.setUp();
		if (initialSessionFactory == null) {
			initialSessionFactory = newSessionFactory(getHibernateConfigLocation());
		}
	}

	protected void tearDown() throws Exception {
		super.tearDown();
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
