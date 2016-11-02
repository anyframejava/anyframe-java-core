/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.scheduling.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.sql.DataSource;

import org.anyframe.scheduling.JobInfo;
import org.anyframe.util.DateUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

/**
 * This is a DAO class to use database for handled quartz job data.
 * It can override query statement with setter methods.
 * 
 * @author Sujeong Lee
 */
public class JobDBManager extends JdbcDaoSupport {

	private static final String JOB_INFO_INSERT_QUERY = "INSERT INTO SCHEDULING_JOB      "
			+ "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

	private static final String JOB_INFO_UPDATE_QUERY = "UPDATE SCHEDULING_JOB        "
			+ "SET schedule = ?, schedule_type = ?, start_date = ?, end_date = ?, description = ?  "
			+ "WHERE job_name = ? AND group_name = ?";

	private static final String JOB_INFO_REMOVE_QUERY = "DELETE FROM SCHEDULING_JOB    "
			+ "WHERE job_name = ? AND group_name = ?";

	private static final String JOB_INFO_GET_QUERY = "SELECT job_name, group_name, target_class, target_method, "
			+ "schedule, schedule_type, start_date, end_date, description     "
			+ "FROM SCHEDULING_JOB      "
			+ "WHERE job_name = ? AND group_name = ?";

	private static final String JOB_INFO_GETLIST_QUERY = "SELECT job_name, group_name, target_class, target_method, "
			+ "schedule, schedule_type, start_date, end_date, description     "
			+ "FROM SCHEDULING_JOB      ";

	private static String FULL_DATE_PATTERN = "yyyy-MM-dd HH:mm:ss.SSS";
	
	private String sqlJobInsert;
	private String sqlJobUpdate;
	private String sqlJobRemove;
	private String sqlJobGet;
	private String sqlJobGetList;

	public JobDBManager() {
		this.sqlJobInsert = JOB_INFO_INSERT_QUERY;
		this.sqlJobUpdate = JOB_INFO_UPDATE_QUERY;
		this.sqlJobRemove = JOB_INFO_REMOVE_QUERY;
		this.sqlJobGet = JOB_INFO_GET_QUERY;
		this.sqlJobGetList = JOB_INFO_GETLIST_QUERY;
	}

	/**
	 * Set the jdbcDaoDataSource to use dataSource with JdbcDaoSupport.
	 * 
	 * @param jdbcDaoDataSource
	 * @throws Exception
	 */
	public void setJdbcDaoDataSource(DataSource jdbcDaoDataSource)
			throws Exception {
		super.setDataSource(jdbcDaoDataSource);
	}

	/**
	 * Get the sql with job insert query statement.
	 * 
	 * @return insert query statement
	 */
	public String getSqlJobInsert() {
		return sqlJobInsert;
	}

	/**
	 * Set the sql with job insert query statement.
	 * 
	 * @param sqlJobInsert
	 *            the query to insert job info
	 */
	public void setSqlJobInsert(String sqlJobInsert) {
		this.sqlJobInsert = sqlJobInsert;
	}

	/**
	 * Get the sql with job update query statement.
	 * 
	 * @return update query statement
	 */
	public String getSqlJobUpdate() {
		return sqlJobUpdate;
	}

	/**
	 * Set the sql with job update query statement.
	 * 
	 * @param sqlJobUpdate
	 *            the query to update job info
	 */
	public void setSqlJobUpdate(String sqlJobUpdate) {
		this.sqlJobUpdate = sqlJobUpdate;
	}

	/**
	 * Get the sql with job remove query statement.
	 * 
	 * @return remove query statement
	 */
	public String getSqlJobRemove() {
		return sqlJobRemove;
	}

	/**
	 * Set the sql with job remove query statement.
	 * 
	 * @param sqlJobRemove
	 *            the query to remove job info
	 */
	public void setSqlJobRemove(String sqlJobRemove) {
		this.sqlJobRemove = sqlJobRemove;
	}

	/**
	 * Get the sql with job get query statement.
	 * 
	 * @return get query statement
	 */
	public String getSqlJobGet() {
		return sqlJobGet;
	}

	/**
	 * Set the sql with job get query statement.
	 * 
	 * @param sqlJobGet
	 *            the query to get job info
	 */
	public void setSqlJobGet(String sqlJobGet) {
		this.sqlJobGet = sqlJobGet;
	}

	/**
	 * Get the sql with job getList query statement.
	 * 
	 * @return getList query statement
	 */
	public String getSqlJobGetList() {
		return sqlJobGetList;
	}

	/**
	 * Set the sql with job getList query statement.
	 * 
	 * @param sqlJobGetList
	 *            the query to get job info list
	 */
	public void setSqlJobGetList(String sqlJobGetList) {
		this.sqlJobGetList = sqlJobGetList;
	}

	/**
	 * Compared with the returned job list after refrected to context file,
	 * changed job are saved in Database.
	 * 
	 * @param jobList
	 *            an array of job info
	 */
	public void reflectChanges(ArrayList<JobInfo> jobList) {
		ArrayList<JobInfo> dbJobList = (ArrayList<JobInfo>) getList();

		ArrayList<JobInfo> insertList = new ArrayList<JobInfo>();
		ArrayList<JobInfo> updateList = new ArrayList<JobInfo>();
		ArrayList<JobInfo> removeList = dbJobList;

		Iterator<JobInfo> dbItr = dbJobList.iterator();
		Iterator<JobInfo> memoryItr = jobList.iterator();

		while (memoryItr.hasNext()) {
			boolean isInMemoryExist = false;
			JobInfo memJobInfo = (JobInfo) memoryItr.next();

			while (dbItr.hasNext()) {
				JobInfo dbJobInfo = (JobInfo) dbItr.next();
				if (isSameJob(dbJobInfo, memJobInfo)) {
					// update
					updateList.add(memJobInfo);
					removeList.remove(dbJobInfo);
					isInMemoryExist = true;
					break;
				}
			}
			if (!isInMemoryExist) {
				insertList.add(memJobInfo);
				removeList.remove(memJobInfo);
			}

		}

		Iterator<JobInfo> insertItr = insertList.iterator();
		while (insertItr.hasNext()) {
			JobInfo info = (JobInfo) insertItr.next();
			insert(info);
		}
		Iterator<JobInfo> updateItr = updateList.iterator();
		while (updateItr.hasNext()) {
			JobInfo info = (JobInfo) updateItr.next();
			update(info);
		}
		Iterator<JobInfo> removeItr = removeList.iterator();
		while (removeItr.hasNext()) {
			JobInfo info = (JobInfo) removeItr.next();
			remove(info);
		}

	}

	/**
	 * Execute INSERT query, with new quartz job info.
	 * 
	 * @param jobInfo
	 *            data of job info to insert
	 */
	public void insert(JobInfo jobInfo) {
		this.getJdbcTemplate().update(
				getSqlJobInsert(),
				new Object[] { jobInfo.getJobName(), jobInfo.getJobGroup(),
						jobInfo.getJobTarget(), jobInfo.getJobTargetMethod(),
						jobInfo.getJobSchedule(),
						jobInfo.getFlagScheduleType(), jobInfo.getStartDate(),
						jobInfo.getEndDate(), jobInfo.getDescription() });
	}

	/**
	 * Execute UPDATE query, with modified quartz job info.
	 * 
	 * @param jobInfo
	 *            data of job info to update
	 */
	public void update(JobInfo jobInfo) {
		this.getJdbcTemplate()
				.update(getSqlJobUpdate(),
						new Object[] { jobInfo.getJobSchedule(),
					jobInfo.getFlagScheduleType(),
					jobInfo.getStartDate(),
					jobInfo.getEndDate(),
					jobInfo.getDescription(),
					jobInfo.getJobName(),
					jobInfo.getJobGroup() });
	}

	/**
	 * Execute REMOVE query, with removed quartz job info.
	 * 
	 * @param jobInfo
	 *            data of job info to remove
	 */
	public void remove(JobInfo jobInfo) {
		this.getJdbcTemplate().update(
				getSqlJobRemove(),
				new Object[] { jobInfo.getJobName(),
					jobInfo.getJobGroup() });
	}

	/**
	 * Execute GETLIST query.
	 * 
	 * @return results. The list of job info.
	 */
	public List<JobInfo> getList() {
		List<JobInfo> result = new ArrayList<JobInfo>();

		try {
			result = this.getJdbcTemplate().query(getSqlJobGetList(),
					new Object[] {}, new RowMapper<JobInfo>() {
						public JobInfo mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							JobInfo jobInfo = new JobInfo();
							try {
								jobInfo.setJobName(rs
										.getString("job_name"));
								jobInfo.setJobGroup(rs
										.getString("group_name"));
								jobInfo.setJobTarget(rs
										.getString("target_class"));
								jobInfo.setJobTargetMethod(rs
										.getString("target_method"));
								jobInfo.setJobSchedule(rs
										.getString("schedule"));
								jobInfo.setFlagScheduleType(rs
										.getString("schedule_type"));
								jobInfo.setStartDate(DateUtil
										.string2Date(rs
												.getString("start_date"), FULL_DATE_PATTERN));
								if(rs.getString("end_date") != null){
									jobInfo.setEndDate(DateUtil
											.string2Date(rs
													.getString("end_date"), FULL_DATE_PATTERN));
								}
								jobInfo.setDescription(rs
										.getString("description"));
							} catch (Exception e) {
								logger.error(
										"Fail to parsing date with DateUtil.class",
										e);
							}
							return jobInfo;
						}
					});
		} catch (EmptyResultDataAccessException e) {
			// empty result
		}

		return result;
	}

	private boolean isSameJob(JobInfo dbJobInfo, JobInfo memJobInfo) {
		if (dbJobInfo.getJobName().equals(memJobInfo.getJobName())
				&& dbJobInfo.getJobGroup().equals(memJobInfo.getJobGroup())) {
			return true;
		} else {
			return false;
		}
	}

}
