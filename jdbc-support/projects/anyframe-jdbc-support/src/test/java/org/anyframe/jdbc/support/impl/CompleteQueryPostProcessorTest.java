package org.anyframe.jdbc.support.impl;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.jdbc.SimpleJdbcTestUtils;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/context-*.xml" })
public class CompleteQueryPostProcessorTest {

	// @Autowired
	// private CompleteQueryPostProcessor completeQueryPostProcessor;

	@Autowired
	private DataSource dataSource;

	@Before
	public void onSetUp() {
		SimpleJdbcTestUtils.executeSqlScript(new SimpleJdbcTemplate(dataSource), new ClassPathResource("testdata.sql"),
				true);
	}

	@Test
	public void testCompleteQueryPostProcessor() {
		NamedParameterJdbcTemplate jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);

		StringBuffer testSql = new StringBuffer();
		testSql.append("SELECT LOGON_ID, NAME, PASSWORD FROM TB_USER \n");
		testSql.append("WHERE LOGON_ID = :logonId AND PASSWORD = :password \n");

		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("logonId", "admin");
		paramMap.put("password", "adminpw");

		Map<String, Object> resultMap = jdbcTemplate.queryForMap(testSql.toString(), paramMap);
		assertEquals("admin", resultMap.get("logon_id"));
		assertEquals("adminpw", resultMap.get("password"));

		// check org.anyframe.jdbc.support.CompleteQueryPostProcessor Logger
		// INFO Level logs
	}
}
