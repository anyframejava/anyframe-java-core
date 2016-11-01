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
package org.anyframe.jdbc.support;

/**
 * This is a Interface for processing SQL Injection Prevention with Complete
 * Query. Using P6Spy Connection Wrapping. You may be careful of Using
 * replacePattern with Complete Query. It may leads SQL Syntax Error because of
 * your wrong Patterns.
 * 
 * @author Byunghun Woo
 * 
 */
public interface InjectionPatternPostProcessor {

	/**
	 * detect injection pattern and process logging the sql according to waring
	 * Patterns
	 * @param sql
	 */
	public void warningPattern(String sql);

	/**
	 * process changing the original sql according to replace Patterns
	 * @param sql
	 * @return changed sql
	 */
	public String replacePattern(String sql);

}
