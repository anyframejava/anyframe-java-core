package org.anyframe.hibernate.nativesql;

import java.util.List;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateProcedureTest<br>
 * <br>
 * [Description] : By using Hibernate, Procedure registered in DB or how to
 * execute Function are looked into. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : After calling for and executing Procedure defined
 * within Mapping XML file, its return value is checked.</li>
 * <li>#-2 Positive Case : By using Function created before, HQL is executed and
 * then its return value is checked.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateProcedureTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/nativesql/hibernate.cfg.xml";
	}

	/**
	 * Initial data is entered and Procedure(FIND_CATEGORY_LIST) and
	 * Function(FIND_MOVIE_LIST)are created for test.
	 */
	@Before
	public void setUp() throws Exception {
		super.setUp();
		SetUpInitData.initializeData(session);
		try {
			try {
				SQLQuery dropQuery = session
						.createSQLQuery("DROP PROCEDURE FIND_CATEGORY_LIST");
				dropQuery.executeUpdate();
			} catch (HibernateException e) {
				e.printStackTrace();
			}

			try {
				SQLQuery dropQuery = session
						.createSQLQuery("DROP FUNCTION FIND_MOVIE");
				dropQuery.executeUpdate();
			} catch (HibernateException e) {
				e.printStackTrace();
			}

			SQLQuery createQuery = session
					.createSQLQuery("CREATE OR REPLACE PROCEDURE FIND_CATEGORY_LIST ( "
							+ " OUT_RESULT out SYS_REFCURSOR, "
							+ " IN_COND in VARCHAR2 "
							+ " ) "
							+ " AS  "
							+ " BEGIN "
							+ "   	open OUT_RESULT for  "
							+ " 		SELECT  "
							+ " 			category.CATEGORY_ID	as CATEGORY_ID, "
							+ " 			category.CATEGORY_NAME	as CATEGORY_NAME, "
							+ " 			category.CATEGORY_DESC	as CATEGORY_DESC "
							+ " 		FROM "
							+ " 			HIBERNATE_CATEGORY category	 "
							+ " 		WHERE "
							+ " 			category.CATEGORY_NAME like IN_COND "
							+ " 		ORDER BY category.CATEGORY_NAME ASC; "
							+ " 	EXCEPTION "
							+ "     	WHEN OTHERS THEN "
							+ "         	DBMS_OUTPUT.PUT_LINE( 'Value : '|| IN_COND );  "
							+ "         	DBMS_OUTPUT.PUT_LINE( TO_CHAR(SQLCODE) || ' : ' || SQLERRM );  "
							+ " END;");
			createQuery.executeUpdate();

			createQuery = session
					.createSQLQuery("CREATE OR REPLACE FUNCTION FIND_MOVIE ( "
							+ "IN_COND VARCHAR2 " + ")  "
							+ "RETURN date is MOVIE_RELEASE_DATE date; "
							+ "BEGIN " + "		SELECT  " + "			RELEASE_DATE "
							+ "		INTO  " + "			MOVIE_RELEASE_DATE "
							+ "		FROM  " + "			HIBERNATE_MOVIE " + "		WHERE  "
							+ "			MOVIE_ID = IN_COND; "
							+ "		RETURN MOVIE_RELEASE_DATE; " + "END;");
			createQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	/**
	 * [Flow #-1] Positive Case : After calling for and executing Procedure
	 * defined within Mapping XML file, its return value is checked.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testFindCategoryList() throws Exception {
		// 1. execute procedure
		Query query = session.getNamedQuery("callFindCategoryList");
		query.setParameter("condition", "%%");
		
		@SuppressWarnings("unchecked")
		List categoryList = query.list();

		// 2. assert result - category
		Assert.assertEquals("fail to match the size of category list.", 4,
				categoryList.size());

		for (int i = 0; i < categoryList.size(); i++) {
			Category category = (Category) categoryList.get(i);

			if (i == 0) {
				Assert.assertEquals("fail to match a category name.", "Comedy",
						category.getCategoryName());
			} else if (i == 1) {
				Assert.assertEquals("fail to match a category name.", "Horror",
						category.getCategoryName());
			} else if (i == 2) {
				Assert.assertEquals("fail to match a category name.",
						"Romantic", category.getCategoryName());
			} else if (i == 3) {
				Assert.assertEquals("fail to match a category name.", "SF",
						category.getCategoryName());
			}
		}
	}

	/**
	 * [Flow #-2] Positive Case : By using Function created before, HQL is
	 * executed and then its return value is checked.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	@Test
	public void testFindMovieList() throws Exception {
		// 1. execute function
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("FROM Movie movie ");
		hqlBuf.append("WHERE movie.releaseDate > FIND_MOVIE(:condition)");
		Query query = session.createQuery(hqlBuf.toString());
		query.setParameter("condition", "MV-00002");
		
		@SuppressWarnings("unchecked")
		List movieList = query.list();

		// 2. assert result - movie
		Assert.assertEquals("fail to match the size of movie list.", 1,
				movieList.size());
	}
}
