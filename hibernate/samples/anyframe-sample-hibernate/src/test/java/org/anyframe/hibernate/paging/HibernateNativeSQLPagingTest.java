package org.anyframe.hibernate.paging;

import java.util.List;
import java.util.Set;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.SQLQuery;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;


/**
 * TestCase Name : HibernateNativeSQLPagingTest<br>
 * <br>
 * [Description] : Native SQL 수행시 페이징 처리된 조회 결과를 얻기 위한 방법에 대해 알아본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : MOVIE 테이블을 대상으로 Native SQL을 이용한 조회 작업을 수행한다. 이때, 조회를
 * 시작해야 하는 Row의 Number(FirstResult)와 조회 목록의 개수(MaxResult)를 정의함으로써, 페이징 처리가
 * 가능해진다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)  
public class HibernateNativeSQLPagingTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "hibernateconfig/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : MOVIE 테이블을 대상으로 Native SQL을 이용한 조회 작업을 수행한다.
	 * 이때, 조회를 시작해야 하는 Row의 Number(FirstResult)와 조회 목록의 개수(MaxResult)를 정의함으로써,
	 * 페이징 처리가 가능해진다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testMovieListWithPaging() throws Exception {
		// 1. insert init data
		SetUpInitData.initializeData(session);

		// 2. execute hql
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("SELECT * ");
		hqlBuf.append("FROM MOVIE ");
		SQLQuery query = session.createSQLQuery(hqlBuf.toString());
		query.addEntity(Movie.class);
		query.setFirstResult(1);
		query.setMaxResults(2);
		List movieList = query.list();

		// 3. assert result - movie
		Assert.assertEquals("fail to match the size of movie list.", 2, movieList
				.size());

		for (int i = 0; i < movieList.size(); i++) {
			Movie movie = (Movie) movieList.get(i);

			if (i == 0) { 
				Assert.assertEquals("fail to match a movie title.", "My Little Bride",
						movie.getTitle());
				Assert.assertEquals("fail to match a movie director.", "Hojun Kim",
						movie.getDirector());

				Set categories = movie.getCategories();
				Assert.assertEquals("fail to match the size of category list.", 2,
						categories.size());
			} else if (i == 1) {
				Assert.assertEquals("fail to match a movie title.", "Ring 2", movie
						.getTitle());
				Assert.assertEquals("fail to match a movie director.", "Hideo Nakata",
						movie.getDirector());

				Set categories = movie.getCategories();
				Assert.assertEquals("fail to match the size of category list.", 1,
						categories.size());
			}
		}
	}
}
