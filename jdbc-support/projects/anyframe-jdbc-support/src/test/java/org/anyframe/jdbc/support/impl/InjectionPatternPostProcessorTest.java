package org.anyframe.jdbc.support.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Map;

import javax.sql.DataSource;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;
import org.springframework.test.annotation.ExpectedException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.jdbc.SimpleJdbcTestUtils;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/context-*.xml" })
public class InjectionPatternPostProcessorTest {

	@Autowired
	private InjectionPatternPostProcessor injectionPatternPostProcessor;

	@Autowired
	private DataSource dataSource;

	@Test
	public void testInjectionPatternPostProcessor() {
		StringBuffer testSql = new StringBuffer();
		testSql.append("SELECT LOGON_ID, NAME, PASSWORD FROM TB_USER \n");
		testSql.append("WHERE LOGON_ID = 'admin' AND PASSWORD = '1' or '1' = '1' -- \n");

		injectionPatternPostProcessor.warningPattern(testSql.toString());

		String changedSql = injectionPatternPostProcessor.replacePattern(testSql.toString());
		assertTrue(!changedSql.contains("--") && !changedSql.contains("'1'='1'"));
		assertEquals(
				"SELECT LOGON_ID, NAME, PASSWORD FROM TB_USER \nWHERE LOGON_ID = 'admin' AND PASSWORD = '1'  - \n",
				changedSql);
	}

	@Test
	@ExpectedException(BadSqlGrammarException.class)
	public void testInjectionPatternPostProcessorWithJdbc() {
		// initialize data
		SimpleJdbcTestUtils.executeSqlScript(new SimpleJdbcTemplate(dataSource), new ClassPathResource("testdata.sql"),
				true);

		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

		StringBuffer testSql = new StringBuffer();
		testSql.append("SELECT LOGON_ID, NAME, PASSWORD FROM TB_USER \n");
		testSql.append("WHERE LOGON_ID = 'admin' AND PASSWORD = '1' or '1' = '1' -- \n");

		Map<String, Object> resultMap = jdbcTemplate.queryForMap(testSql.toString());
		fail("Changed sql by replacePatterns should be SQL Syntax Error");

		// org.anyframe.jdbc.support.CompleteQueryPostProcessor Logger
		// INFO Level logs
	}

}
