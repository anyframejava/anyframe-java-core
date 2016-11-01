package org.anyframe.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import junit.framework.TestCase;

public abstract class AbstractTest extends TestCase {
	protected SessionFactory initialSessionFactory;
	protected Session session;

	protected void newSession(String location) throws Exception {
		if (initialSessionFactory == null) {
			initialSessionFactory = newSessionFactory(location);
		}

		newSession();
	}

	protected void newSession() {
		session = initialSessionFactory.openSession();
		session.beginTransaction();
	}

	protected SessionFactory newSessionFactory(String configFilePath) {
		return new Configuration().configure(configFilePath)
				.buildSessionFactory();
	}

	protected void closeSession() {
		session.getTransaction().commit();
		session.close();
	}
}
