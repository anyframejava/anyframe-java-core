/* 
 * Copyright (C) 2002-2012 Robert Stewart (robert@wombatnation.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package org.anyframe.logmanager.log4j;

import org.apache.log4j.helpers.PatternConverter;
import org.apache.log4j.spi.LoggingEvent;

/**
 *
 *
 * @author jaehyoung.eum
 * @deprecated
 */
public class PatternLayout extends org.apache.log4j.PatternLayout {
	private final static String DEFAULT_COLUMN_DELIMITER ="|";
	private final static String DEFAULT_ROW_DELIMITER = "^";
	private final static String DEFAULT_LOGMANAGER_PATTERN = "timestamp:%d,message:%1";
	
	private StringBuffer sbuf = new StringBuffer(BUF_SIZE);
	private PatternConverter head;
	private String pattern;
	private String logmanagerPattern;
	private String columnDelimiter;
	private String rowDelimiter;

	/**
	 * Constructs a PatternLayout using the DEFAULT_LAYOUT_PATTERN.
	 * 
	 * The default pattern just produces the application supplied message.
	 */
	public PatternLayout() {
		super();
		columnDelimiter = DEFAULT_COLUMN_DELIMITER;
		rowDelimiter = DEFAULT_ROW_DELIMITER;
		logmanagerPattern = DEFAULT_LOGMANAGER_PATTERN;
	}

	/**
	 * Constructs a PatternLayout using the supplied conversion pattern.
	 */
	public PatternLayout(String pattern) {
		this.pattern = pattern;
		head = createPatternParser((pattern == null) ? DEFAULT_CONVERSION_PATTERN : pattern).parse();
		columnDelimiter = DEFAULT_COLUMN_DELIMITER;
	}

	public void setColumnDelimiter(String ascii) {
		try{
			this.columnDelimiter = Character.toString((char)Integer.parseInt(ascii));
		}catch(Exception e){
			this.columnDelimiter = DEFAULT_COLUMN_DELIMITER;	
		}
	}
	
	public void setRowDelimiter(String ascii) {
		try{
			this.rowDelimiter = Character.toString((char)Integer.parseInt(ascii));
		}catch(Exception e){
			this.rowDelimiter = DEFAULT_ROW_DELIMITER;	
		}
	}
	
	public String getColumnDelimiter() {
		return columnDelimiter;
	}
	
	public String getRowDelimiter() {
		return rowDelimiter;
	}
	
	/**
	 * Set the <b>ConversionPattern</b> option. This is the string which
	 * controls formatting and consists of a mix of literal content and
	 * conversion specifiers.
	 */
	@Override
	public void setConversionPattern(String conversionPattern) {
		pattern = conversionPattern;
		head = createPatternParser(conversionPattern).parse();
	}

	/**
	 * Returns the value of the <b>ConversionPattern</b> option.
	 */
	@Override
	public String getConversionPattern() {
		return pattern;
	}
	
	public String getLogmanagerPattern() {
		return logmanagerPattern;
	}

	public void setLogmanagerPattern(String logmanagerPattern) {
		this.logmanagerPattern = logmanagerPattern;
	}

	@Override
	public String format(LoggingEvent event) {
		// Reset working stringbuffer
		if (sbuf.capacity() > MAX_CAPACITY) {
			sbuf = new StringBuffer(BUF_SIZE);
		} else {
			sbuf.setLength(0);
		}

		PatternConverter c = head;

		while (c != null) {
			c.format(sbuf, event);
			c = c.next;
			sbuf.append(columnDelimiter);
		}
		return sbuf.append(rowDelimiter).toString();
	}
}
