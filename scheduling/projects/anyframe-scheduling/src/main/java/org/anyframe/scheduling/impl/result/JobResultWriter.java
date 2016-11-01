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
package org.anyframe.scheduling.impl.result;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.scheduling.JobResultInfo;
import org.anyframe.scheduling.SchedulingService;
import org.anyframe.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Support to manage result file.
 * 
 * @author Sujeong Lee
 */
public class JobResultWriter {

	// default path
	private String resultPath = "C:/Anyframe/SchedulingResultFiles";
	private String resultJobRootPath = resultPath + "/jobs";

	private static String PATH_SEPARATOR = System.getProperty("file.separator");
	private static String FILE_SEPARATOR_START = "[";
	private static String FILE_SEPARATOR_END = "]";
	private static String FILE_EXTENTION = ".log";
	private static String JOB_SUCCESS = "S";
	private static String JOB_FAIL = "F";
	
	private static String KEY_SF = "key_sf";
	private static String KEY_START_DATE = "key_start";
	private static String KEY_END_DATE = "key_end";
	
	private static String FULL_DATE_DIR_PATTERN = "yyyy-MM-dd_HH-mm-ss-SSS";
	private static String DATE_DIR_PATTERN = "yyyy-MM-dd";
	
	Logger logger = LoggerFactory.getLogger(SchedulingService.class);
	
	/**
	 * @param resultPath 
	 */
	public void setResultPath(String resultPath) {
		this.resultPath = resultPath;
		this.resultJobRootPath = resultPath + "/jobs";
	}
	
	/**
	 * Execute to make a result file with jobResultInfo.
	 * 
	 * @param jobResultInfo Object including the inforamtion about make a result file.
	 * @throws Exception
	 */
	public void create(JobResultInfo jobResultInfo) throws Exception {
		makeFile(jobResultInfo);
	}

	/**
	 * Execute to get result list with jobResultInfo.
	 * 
	 * @param jobResultInfo Object with job result info
	 * @return Array including the object about job results
	 * @throws Exception
	 */
	public List<JobResultInfo> getList(
			JobResultInfo jobResultInfo) throws Exception {
		return getFileList(jobResultInfo);
	}

	/**
	 * Execute to get result with jobResultInfo 
	 * 
	 * @param jobResultInfo Object with job result info
	 * @return JobResultInfo object containing the job result information
	 * @throws Exception
	 */
	public JobResultInfo get(JobResultInfo jobResultInfo)
			throws Exception {
		logger.debug("Get job information with job name is "
				+ jobResultInfo.getJobName() + "and job group name is "
				+ jobResultInfo.getJobGroup() + ".");
		// job name, job group, job start time
		JobResultInfo resultInfo = jobResultInfo;
		String resultJobDatePath = getFilePath(jobResultInfo);

		File jobDateDir = new File(resultJobDatePath);

		String[] resultFileList = jobDateDir.list(new FilenameFilter() {
			public boolean accept(File dir, String name) {
				return name.endsWith(FILE_EXTENTION);
			}
		});

		for (int n = 0; n < resultFileList.length; n++) {
			String fileName = resultFileList[n];
			Map<String, String> fileInfo = fileNameSplit(fileName);
			
			if (DateUtil.string2Date(fileInfo.get(KEY_START_DATE), FULL_DATE_DIR_PATTERN).equals(jobResultInfo.getStartDate())) {
				resultInfo.setEndDate(DateUtil.string2Date(fileInfo.get(KEY_END_DATE), FULL_DATE_DIR_PATTERN));
				resultInfo.setIsSuccess(convertStringToBoolean(fileInfo
						.get(KEY_SF)));

				File resultFile = new File(resultJobDatePath + PATH_SEPARATOR
						+ fileName);

				if (resultFile.length() > 0 && !resultInfo.getIsSuccess()) {
					char[] exceptionContents = new char[(int) resultFile
							.length()];
					BufferedReader reader = new BufferedReader(new FileReader(
							resultFile));
					reader.read(exceptionContents);
					String exceptionStackTrace = String
							.valueOf(exceptionContents);
					resultInfo.setException(exceptionStackTrace);
				}

				break;
			}
		}

		return resultInfo;
	}

	private void makeFile(JobResultInfo jobResultInfo)
			throws Exception {
		boolean isSuccess = jobResultInfo.getIsSuccess();

		String resultFullPath = getFilePath(jobResultInfo);
		String resultFileName = getFileName(jobResultInfo);

		File checkFolder = new File(resultFullPath);
		File file = new File(resultFullPath, resultFileName);

		logger.debug("Job result file is made with name like " + resultFileName);
		
		if (!checkFolder.exists()) {
			checkFolder.mkdirs();
		}
		file.createNewFile();

		if (!isSuccess) {
			// fail job result contains exception to file contents
			BufferedWriter out = new BufferedWriter(new FileWriter(file));
			out.write(jobResultInfo.getException());
			out.close();
		}
	}

	private List<JobResultInfo> getFileList(
			JobResultInfo jobResultInfo) throws Exception {
		ArrayList<JobResultInfo> resultList = new ArrayList<JobResultInfo>();
		String jobGroup = jobResultInfo.getJobGroup();
		String jobName = jobResultInfo.getJobName();

		String resultJobPath = resultJobRootPath + PATH_SEPARATOR
				+ jobGroup + PATH_SEPARATOR + jobName;

		File jobDir = new File(resultJobPath);
		File[] dateList = jobDir.listFiles();
		for (int i = 0; i < dateList.length; i++) {
			String resultJobDate = dateList[i].getName();
			String resultJobDatePath = resultJobPath + PATH_SEPARATOR
					+ resultJobDate;
			File jobDateDir = new File(resultJobDatePath);

			String[] resultFileList = jobDateDir.list(new FilenameFilter() {
				public boolean accept(File dir, String name) {
					return name.endsWith(FILE_EXTENTION);
				}
			});

			for (int n = 0; n < resultFileList.length; n++) {
				String fileName = resultFileList[n];
				Map<String, String> fileInfo = fileNameSplit(fileName);

				JobResultInfo resultInfo = new JobResultInfo();
				resultInfo.setJobGroup(jobResultInfo.getJobGroup());
				resultInfo.setJobName(jobResultInfo.getJobName());
				resultInfo.setIsSuccess(convertStringToBoolean(fileInfo
						.get(KEY_SF)));
				resultInfo.setStartDate(DateUtil
						.string2Date(fileInfo
								.get(KEY_START_DATE), FULL_DATE_DIR_PATTERN));
				if(fileInfo.get(KEY_END_DATE) != null){
					resultInfo.setEndDate(DateUtil
							.string2Date(fileInfo
									.get(KEY_END_DATE), FULL_DATE_DIR_PATTERN));
				}
				

				File resultFile = new File(resultJobDatePath + PATH_SEPARATOR
						+ fileName);

				if (resultFile.length() > 0 && !resultInfo.getIsSuccess()) {
					char[] exceptionContents = new char[(int) resultFile
							.length()];
					BufferedReader reader = new BufferedReader(new FileReader(
							resultFile));
					reader.read(exceptionContents);
					String exceptionStackTrace = String
							.valueOf(exceptionContents);
					resultInfo.setException(exceptionStackTrace);
				}

				resultList.add(resultInfo);
			}
		}
		return resultList;
	}

	private String getFilePath(JobResultInfo jobResultInfo)
			throws Exception {
		Date startDate = jobResultInfo.getStartDate();

		String jobGroup = jobResultInfo.getJobGroup();
		String jobName = jobResultInfo.getJobName();
		String runDate = DateUtil.date2String(startDate, DATE_DIR_PATTERN);
		return resultJobRootPath + PATH_SEPARATOR + jobGroup + PATH_SEPARATOR
				+ jobName + PATH_SEPARATOR + runDate;
	}

	private String getFileName(JobResultInfo jobResultInfo)
			throws Exception {
		Date startDate = jobResultInfo.getStartDate();
		Date endDate = jobResultInfo.getEndDate();

		boolean isSuccess = jobResultInfo.getIsSuccess();
		String strIsSuccess = JOB_FAIL;
		if (isSuccess) {
			strIsSuccess = JOB_SUCCESS;
		}

		return wrapFileSeparator(strIsSuccess)
				+ wrapFileSeparator(DateUtil
						.date2String(startDate, FULL_DATE_DIR_PATTERN))
				+ wrapFileSeparator(DateUtil
						.date2String(endDate, FULL_DATE_DIR_PATTERN))
				+ FILE_EXTENTION;
	}

	private String wrapFileSeparator(String param) throws Exception {
		return FILE_SEPARATOR_START + param + FILE_SEPARATOR_END;
	}

	private boolean convertStringToBoolean(String param) throws Exception {
		if (param.equals(JOB_SUCCESS)) {
			return true;
		} else {
			return false;
		}
	}

	private Map<String, String> fileNameSplit(String param) {
		String[] strSplit = param.split(FILE_SEPARATOR_END);
		Map<String, String> result = new HashMap<String, String>();
		result.put(KEY_SF, strSplit[0].substring(1));
		result.put(KEY_START_DATE, strSplit[1].substring(1));
		result.put(KEY_END_DATE, strSplit[2].substring(1));
		return result;
	}
}
