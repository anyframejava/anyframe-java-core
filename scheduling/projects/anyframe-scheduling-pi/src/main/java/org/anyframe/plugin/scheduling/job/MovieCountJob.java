/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.plugin.scheduling.job;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * @author Sujeong Lee
 */
public class MovieCountJob extends QuartzJobBean {
	
	@Override
	protected void executeInternal(JobExecutionContext context)
			throws JobExecutionException {
		new MovieCountInnerJob().execute();
	}
	
	class MovieCountInnerJob extends JdbcDaoSupport{

		public void execute(){
			
			initDataSource();
			
			String sql = "SELECT count(*) totalCount from MOVIE";
			this.getJdbcTemplate().queryForObject(sql,
					new BeanPropertyRowMapper<String>(String.class) {
						public String mapRow(ResultSet rs, int i)
								throws SQLException {
							String totalCount = rs.getString("totalCount");
							System.out.println("------------------------------------------------------");
							System.out.println("Movie Table Row Count : " + totalCount);
							System.out.println("------------------------------------------------------");
							return null;
						}
					}, new Object[] {});
		}
		
		private void initDataSource() {
			ApplicationContext context = new ClassPathXmlApplicationContext(
					new String[] { "classpath:spring/context-transaction.xml", "classpath:spring/context-hibernate*.xml" });
			DataSource dataSource = (DataSource) context.getBean("dataSource");
			super.setDataSource(dataSource);
		}
		
	}
}
