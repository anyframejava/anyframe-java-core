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
package org.anyframe.jdbc.support.impl;

import java.util.List;
import java.util.Map;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Default Implementation of InjectionPatternPostProcessor
 * 
 * @author Byunghun Woo
 * 
 */
public class DefaultInjectionPatternPostProcessor implements InjectionPatternPostProcessor {

	/**
	 * "(?s).*"
	 */
	protected static final String MULTILINE_IGNORE_PREFIX = "(?s).*";

	/**
	 * ".*(?-s)"
	 */
	protected static final String MULTILINE_IGNORE_SUFFIX = ".*(?-s)";

	/**
	 * Logger with InjectionPatternPostProcessor.class
	 */
//	protected static Log log = LogFactory.getLog(InjectionPatternPostProcessor.class);
	
	protected static Logger log = LoggerFactory.getLogger(InjectionPatternPostProcessor.class);

	private List<String> warningPatterns;

	private Map<String, String> replacePatterns;

	/**
	 * default implementation of detecting injection pattern and process
	 * logging. loop while warningPatterns List. Using regular expressions.
	 */
	public void warningPattern(String sql) {
		if (warningPatterns == null) {
			return;
		}

		for (String pattern : warningPatterns) {
			// String.matches needs whole string matching
			// Simplifies User input for multiline mode [(?s) ~ (?-s)]
			String wholeRegexPattern = MULTILINE_IGNORE_PREFIX + pattern + MULTILINE_IGNORE_SUFFIX;

			if (sql.matches(wholeRegexPattern)) {
				log
						.warn(
								"SQL Injection pattern detected. - pattern : {} , sql : {}",
								new Object[] { pattern, sql });
			}
		}
	}

	/**
	 * default implementation of changing the original sql with replacePatterns.
	 * loop while replacePatterns entry exists. Using regular expressions
	 * replacement(String.replaceAll).
	 */
	public String replacePattern(String sql) {
		if (replacePatterns == null) {
			return sql;
		}

		for (Map.Entry<String, String> entry : replacePatterns.entrySet()) {
			sql = sql.replaceAll(entry.getKey(), entry.getValue());
		}
		return sql;
	}

	/**
	 * set replacePatterns - Using Map<String, String> with regex pattern is
	 * key, replacement is value.
	 * @param replacePatterns
	 */
	public void setReplacePatterns(Map<String, String> replacePatterns) {
		this.replacePatterns = replacePatterns;
	}

	public Map<String, String> getReplacePatterns() {
		return replacePatterns;
	}

	/**
	 * set warningPatterns - Using List<String>
	 * @param warningPatterns
	 */
	public void setWarningPatterns(List<String> warningPatterns) {
		this.warningPatterns = warningPatterns;
	}

	public List<String> getWarningPatterns() {
		return warningPatterns;
	}
}
