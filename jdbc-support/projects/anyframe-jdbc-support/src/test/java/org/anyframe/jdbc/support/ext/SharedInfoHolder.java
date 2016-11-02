package org.anyframe.jdbc.support.ext;

import java.util.HashMap;
import java.util.Map;

public class SharedInfoHolder {

	/**
	 * keep thread-time shared info in ThreadLocal
	 */
	private static ThreadLocal<Map<String, Object>> sharedInfoHolder = new ThreadLocal<Map<String, Object>>();

	private static Map<String, Object> getSharedInfo() {
		if (sharedInfoHolder.get() == null) {
			Map<String, Object> sharedInfo = new HashMap<String, Object>();
			sharedInfoHolder.set(sharedInfo);
		}
		return sharedInfoHolder.get();
	}

	public static void setSvcId(String svcId) {
		getSharedInfo().put("svcId", svcId);
	}

	public static String getSvcId() {
		return (String) getSharedInfo().get("svcId");
	}

	public static void setJobType(String jobType) {
		getSharedInfo().put("jobType", jobType);
	}

	public static String getJobType() {
		return (String) getSharedInfo().get("jobType");
	}

	public static void setExecutedQuery(String executedQuery) {
		getSharedInfo().put("executedQuery", executedQuery);
	}

	public static String getExecutedQuery() {
		return (String) getSharedInfo().get("executedQuery");
	}

	public static void clearSharedInfo() {
		getSharedInfo().clear();
		sharedInfoHolder.set(null);
	}

}
