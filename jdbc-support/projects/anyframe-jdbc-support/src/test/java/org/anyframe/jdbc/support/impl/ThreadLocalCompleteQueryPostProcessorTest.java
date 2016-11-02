package org.anyframe.jdbc.support.impl;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.anyframe.jdbc.support.ext.SharedInfoHolder;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.jdbc.JdbcTestUtils;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/threadlocal/context-*.xml" })
public class ThreadLocalCompleteQueryPostProcessorTest {

	@Autowired
	private DataSource dataSource;

	@Before
	public void onSetUp() {
		JdbcTestUtils.executeSqlScript(new JdbcTemplate(dataSource),
				new ClassPathResource("testdata.sql"), true);
	}

	@Test
	public void testCompleteQueryPostProcessor() {
		NamedParameterJdbcTemplate jdbcTemplate = new NamedParameterJdbcTemplate(
				dataSource);

		StringBuffer testSql = new StringBuffer();
		testSql.append("SELECT LOGON_ID, NAME, PASSWORD FROM TB_USER \n");
		testSql.append("WHERE LOGON_ID = :logonId AND PASSWORD = :password \n");

		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("logonId", "admin");
		paramMap.put("password", "adminpw");

		// if ThreadLocal flag set - jobType = "Q"
		SharedInfoHolder.setJobType("Q");

		// execute jdbc - cf.) in ThreadLocalCompleteQueryPostProcessor,
		// executes query actually cause it does not throw Exception
		Map<String, Object> resultMap = jdbcTemplate.queryForMap(testSql
				.toString(), paramMap);
		assertEquals("admin", resultMap.get("logon_id"));
		assertEquals("adminpw", resultMap.get("password"));

		// check the last executed query (CompleteQuery) in ThreadLocal
		assertEquals(
				"SELECT LOGON_ID, NAME, PASSWORD FROM TB_USER \nWHERE LOGON_ID = 'admin' AND PASSWORD = 'adminpw' \n",
				SharedInfoHolder.getExecutedQuery());

		// ThreadLocal must be cleared!
		SharedInfoHolder.clearSharedInfo();
	}
}
