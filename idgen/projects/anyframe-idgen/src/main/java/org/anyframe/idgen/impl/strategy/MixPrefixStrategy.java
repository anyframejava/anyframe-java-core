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

import org.anyframe.idgen.IdGenStrategy;
import org.anyframe.util.StringUtil;

/**
 * MixPrefix is a kind of id generation strategy. MixPrefix assembles prefix,
 * original string, paddingChar into new id. For example, <br>
 * prefix is a 'TEST-' <br>
 * paddingChar is a '0' <br>
 * original string is a '12' <br>
 * and maxCiphers is a 5 <br>
 * in result, new id is a 'TEST-00012'.
 * 
 * * The Configuration to use a MixPrefixStrategy looks like the following:
 * 
 * <pre>
 *  &lt;property name=&quot;prefix&quot; value=&quot;TEST-&quot;/&gt;	
 *  &lt;property name=&quot;maxCiphers&quot; value=&quot;5&quot;/&gt;
 *  &lt;property name=&quot;paddingChar&quot; value=&quot;0&quot;/&gt;
 * </pre>
 * 
 * 
 * @author SoYon Lim
 * @deprecated This class is replaced to MixStrategy.class. Use MixStrategy class.
 * 
 */
public class MixPrefixStrategy implements IdGenStrategy {
	private String prefix;

	protected int maxCiphers = 5;
	
	protected char paddingChar = '0';

	/**
	 * convert original id to a new id which apply a specific assembling rule
	 * 
	 * @param originalId
	 *            original id to be converted
     * @param clazz
	 *  		  class information that call ID generation service.
	 * @return assembled id
	 */
	public String makeId(String originalId, Class<?> clazz) {
		return prefix + StringUtil.leftPad(originalId, maxCiphers, paddingChar );
	}

	/**
	 * properties
	 * 
	 * @param maxCiphers
	 *            maxCiphers
	 */
	public void setMaxCiphers(int maxCiphers) {
		this.maxCiphers = maxCiphers;
	}

	/**
	 * properties
	 * 
	 * @param prefix
	 *            prefix
	 */
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	/**
	 * properties
	 * 
	 * @param paddingChar
	 *            paddingChar
	 */
	public void setPaddingChar(char paddingChar) {
		this.paddingChar = paddingChar;
	}

}
