/*
 * Copyright 2002-2008 the original author or authors.
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
 * original string, fillChar into new id. For example, <br>
 * prefix is a 'TEST-' <br>
 * fillChar is a '0' <br>
 * original string is a '12' <br>
 * and cipers is a 5 <br>
 * in result, new id is a 'TEST-00012'.
 * 
 * @author SoYon Lim 
 */
public class MixPrefixStrategy implements IdGenStrategy {
	private String prefix;

	private int cipers = 5;

	private char fillChar = '0';

	/**
	 * convert original id to a new id which apply a specific assembling rule
	 * 
	 * @param originalId
	 *            original id to be converted
	 * @return assembled id
	 */
	public String makeId(String originalId) {
		return prefix + StringUtil.fillString(originalId, fillChar, cipers);
	}

	/**
	 * properties
	 * 
	 * @param cipers
	 *            cipers
	 */
	public void setCipers(int cipers) {
		this.cipers = cipers;
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
	 * @param fillChar
	 *            fillChar
	 */
	public void setFillChar(char fillChar) {
		this.fillChar = fillChar;
	}

	/**
	 * constructor
	 * 
	 * @param prefix
	 *            prefix
	 * @param cipers
	 *            cipers
	 * @param fillChar
	 *            fillChar
	 */
	public MixPrefixStrategy(String prefix, int cipers, char fillChar) {
		super();
		this.prefix = prefix;
		this.cipers = cipers;
		this.fillChar = fillChar;
	}

	/**
	 * default constructor
	 */
	public MixPrefixStrategy() {
		super();
	}
}
