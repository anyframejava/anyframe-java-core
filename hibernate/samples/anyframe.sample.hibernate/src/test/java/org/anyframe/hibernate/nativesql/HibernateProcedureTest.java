package org.anyframe.hibernate.nativesql;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.hibernate.Query;


/**
 * TestCase Name : HibernateProcedureTest<br>
 * <br>
 * [Description] : Hibernate를 이용하여 DB에 기 등록된 Procedure 또는 Function 실행 방법에 대해
 * 살펴본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : 매핑 XML 파일 내에 정의한 Procedure를 호출하여 실행시킨 후, 결과값을 확인한다.</li>
 * <li>#-2 Positive Case : 앞서 생성한 Function을 이용하여 HQL을 실행시킨 후, 결과값을 확인한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateProcedureTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/nativesql/hibernate.cfg.xml";
	}

	/**
	 * 테스트를 위해 초기 데이터 입력 및 Procedure(FIND_CATEGORY_LIST),
	 * Function(FIND_MOVIE_LIST)을 생성한다.
	 */
	protected void setUp() throws Exception {
		super.setUp();
		SetUpInitData.initializeData(session);
		try {
			Connection conn = session.connection();
			try {
				Statement statement = conn.createStatement();

				try {
					statement
							.executeUpdate("DROP PROCEDURE FIND_CATEGORY_LIST");
				} catch (SQLException e) {
					e.printStackTrace();
				}

				try {
					statement.executeUpdate("DROP FUNCTION FIND_MOVIE");
				} catch (SQLException e) {
					e.printStackTrace();
				}

				statement
						.executeUpdate("CREATE OR REPLACE PROCEDURE FIND_CATEGORY_LIST ( "
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

				statement
						.executeUpdate("CREATE OR REPLACE FUNCTION FIND_MOVIE ( "
								+ "IN_COND VARCHAR2 "
								+ ")  "
								+ "RETURN date is MOVIE_RELEASE_DATE date; "
								+ "BEGIN "
								+ "		SELECT  "
								+ "			RELEASE_DATE "
								+ "		INTO  "
								+ "			MOVIE_RELEASE_DATE "
								+ "		FROM  "
								+ "			HIBERNATE_MOVIE "
								+ "		WHERE  "
								+ "			MOVIE_ID = IN_COND; "
								+ "		RETURN MOVIE_RELEASE_DATE; " + "END;");
			} catch (Exception e) {
				e.printStackTrace();

			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
		}
	}

	/**
	 * [Flow #-1] Positive Case : 매핑 XML 파일 내에 정의한 Procedure를 호출하여 실행시킨 후, 결과값을
	 * 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindCategoryList() throws Exception {
		// 1. execute procedure
		Query query = session.getNamedQuery("callFindCategoryList");
		query.setParameter("condition", "%%");
		List categoryList = query.list();

		// 2. assert result - category
		assertEquals("fail to match the size of category list.", 4,
				categoryList.size());

		for (int i = 0; i < categoryList.size(); i++) {
			Category category = (Category) categoryList.get(i);

			if (i == 0) {
				assertEquals("fail to match a category name.", "Comedy",
						category.getCategoryName());
			} else if (i == 1) {
				assertEquals("fail to match a category name.", "Horror",
						category.getCategoryName());
			} else if (i == 2) {
				assertEquals("fail to match a category name.", "Romantic",
						category.getCategoryName());
			} else if (i == 3) {
				assertEquals("fail to match a category name.", "SF", category
						.getCategoryName());
			}
		}
	}

	/**
	 * [Flow #-2] Positive Case : 앞서 생성한 Function을 이용하여 HQL을 실행시킨 후, 결과값을 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from hibernate
	 */
	public void testFindMovieList() throws Exception {
		// 1. execute function
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("FROM Movie movie ");
		hqlBuf.append("WHERE movie.releaseDate > FIND_MOVIE(:condition)");
		Query query = session.createQuery(hqlBuf.toString());
		query.setParameter("condition", "MV-00002");
		List movieList = query.list();

		// 2. assert result - movie
		assertEquals("fail to match the size of movie list.", 1, movieList
				.size());
	}
}
