package org.anyframe.logback.appender.db;

import java.util.HashMap;
import java.util.Map;

import ch.qos.logback.classic.db.names.DBNameResolver;

/**
 * This class is a sample DBNameResolver for Logback DBAppender 
 * to use custom column name.
 * 
 * @author Sunghoon Son
 */

public class MyDBNameResolver implements DBNameResolver{
	
	private static Map<String, String> columnNameMap = new HashMap<String, String>();
	private static Map<String, String> tableNameMap = new HashMap<String, String>();
	
	static{
		tableNameMap.put("LOGGING_EVENT", "MY_LOGGING_EVENT");
		tableNameMap.put("LOGGING_EVENT_PROPERTY", "MY_LOGGING_EVENT_PROPERTY");
		tableNameMap.put("LOGGING_EVENT_EXCEPTION", "MY_LOGGING_EVENT_EXCEPTION");
	}
	
	public <N extends Enum<?>> String getColumnName(N columnName) {
		return columnNameMap.get(columnName.toString());
	}

	public <N extends Enum<?>> String getTableName(N tableName) {
		return tableNameMap.get(tableName.toString());
	}
	
	static{
		// PRIMARY KEY
		columnNameMap.put("EVENT_ID", "EVENT_ID");
		
		columnNameMap.put("TIMESTMP", "MY_TIMESTMP");
		columnNameMap.put("FORMATTED_MESSAGE", "MY_FORMATTED_MESSAGE");
		columnNameMap.put("LOGGER_NAME", "MY_LOGGER_NAME");
		columnNameMap.put("LEVEL_STRING", "MY_LEVEL_STRING");
		columnNameMap.put("THREAD_NAME", "MY_THREAD_NAME");
		columnNameMap.put("REFERENCE_FLAG", "MY_REFERENCE_FLAG");
		columnNameMap.put("ARG0", "MY_ARG0");
		columnNameMap.put("ARG1", "MY_ARG1");
		columnNameMap.put("ARG2", "MY_ARG2");
		columnNameMap.put("ARG3", "MY_ARG3");
		columnNameMap.put("CALLER_FILENAME", "MY_CALLER_FILENAME");
		columnNameMap.put("CALLER_CLASS", "MY_CALLER_CLASS");
		columnNameMap.put("CALLER_METHOD", "MY_CALLER_METHOD");
		columnNameMap.put("CALLER_LINE", "MY_CALLER_LINE");
		
		columnNameMap.put("MAPPED_KEY", "MY_MAPPED_KEY");
		columnNameMap.put("MAPPED_VALUE", "MY_MAPPED_VALUE");
		
		columnNameMap.put("I", "MY_I");
		columnNameMap.put("TRACE_LINE", "MY_TRACE_LINE");
	}
	
	

}
