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
package org.anyframe.idgen.impl.strategy;

import org.anyframe.util.DateUtil;

/**
 * TimestampStrategy is a kind of id generation strategy. TimestampStrategy
 * assembles current time based on {@link java.text.SimpleDateFormat} pattern
 * (default is 'yyyyMMdd'), separator between current time and sequence (default
 * is ''), original string, paddingChar into new id. For example, <br>
 * today is 2011.05.24, pattern is a 'yyyyMMdd' <br>
 * separator is a '-'<br>
 * paddingChar is a '0' <br>
 * original string is a '12' <br>
 * and maxCiphers is a 5 <br>
 * and prefix is true <br>
 * in result, new id is a '20110524-00012'.
 * 
 * * The Configuration to use a TimestampStrategy looks like the following:
 * 
 * <pre>
 *  &lt;property name=&quot;pattern&quot; value=&quot;yyyyMMdd&quot;/&gt;	
 *  &lt;property name=&quot;separator&quot; value=&quot;-&quot;/&gt;	
 *  &lt;property name=&quot;maxCiphers&quot; value=&quot;5&quot;/&gt;
 *  &lt;property name=&quot;paddingChar&quot; value=&quot;0&quot;/&gt;
 *  &lt;property name=&quot;prefix&quot; value=&quot;true&quot;/&gt;
 * </pre>
 * 
 * 
 * @author SoYon Lim
 */
public class TimestampStrategy extends AbstractStrategy {

	String pattern = "yyyyMMdd";

	public String makeId(String originalId, Class<?> clazz) {
		return super.getId(originalId, DateUtil.getCurrentDateTime(pattern));
	}

	/**
	 * set date pattern for current time. define based on
	 * {@link java.text.SimpleDateFormat} pattern.
	 * 
	 * @param pattern
	 *            date pattern
	 */
	public void setPattern(String pattern) {
		this.pattern = pattern;
	}
}
