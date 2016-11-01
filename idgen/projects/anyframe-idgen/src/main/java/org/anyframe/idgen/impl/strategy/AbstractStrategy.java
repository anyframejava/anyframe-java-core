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

import org.anyframe.exception.IdCreationException;
import org.anyframe.idgen.IdGenStrategy;
import org.anyframe.util.StringUtil;

/**
 * AbstractStrategy is a abstract class for define several kind of strategy(eg. ClassNameStrategy, MixStrategy and so on.)
 * This class provide functionality that can make padded id using maxCiphers, paggingChar, ignoreMaxCiphers.
 * When make a class that extends this class, Must override makeId() method and define logic about making for id. 
 * 
 * @author Jonghwan Jeong
 * 
 */
public abstract class AbstractStrategy implements IdGenStrategy {
	/**
	 * Max length of generation Id 
	 */
	protected int maxCiphers = 5;
	/**
	 * Char to replace null space 
	 */
	protected char paddingChar = '0';
	/**
	 * MaxCiphers ignore(Y) or not ignore(N)
	 */
	protected boolean ignoreMaxCiphers = true;
	
	protected String prefix = "";
	
	protected String suffix = "";
	
	protected String separator ="";
	
	

	/**
	 * convert original id to a new id which apply a specific assembling rule
	 * 
	 * @param originalId
	 *            original id to be converted
	 * @param clazz
	 *  		  class information that call ID generation service.
	 * @return assembled id
	 */
	public abstract String makeId(String originalId, Class<?> clazz);
	
	protected String getId(String originalId, String generatedId) {
		String id = getPaddedId(originalId);
		
		if(!"true".equals(getPrefix()) && "true".equals(getSuffix())){
			return id + this.separator + generatedId;
		}
		
		return generatedId + this.separator + id;
	}

	/**
	 * get Id after fill padding character.
	 * 
	 * @param originalId
	 *            original id to be padded.
	 * @return padded id
	 */
	protected String getPaddedId(String originalId) {
		String paddingId = StringUtil.leftPad(originalId, maxCiphers, paddingChar );
		
		if(!ignoreMaxCiphers && paddingId.length() > maxCiphers){
			throw new IdCreationException("[IDGeneration Service] ID cannot be have length more than maxCiphers.");
		}
		return paddingId;
	}

	/**
	 * properties
	 * 
	 * @param maxCiphers
	 *            Max length of generation Id 
	 */
	public void setMaxCiphers(int maxCiphers) {
		this.maxCiphers = maxCiphers;
	}
	
	/**
	 * properties
	 * 
	 * @param paddingChar
	 *           Char to replace null space 
	 */
	public void setPaddingChar(char paddingChar) {
		this.paddingChar = paddingChar;
	}
	
	
	/**
	 * properties
	 * 
	 * @param ignoreMaxCiphers
	 *            set ignore(Y) or not ignore(N)
	 */
	public void setIgnoreMaxCiphers(boolean ignoreMaxCiphers) {
		this.ignoreMaxCiphers = ignoreMaxCiphers;
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
	 */
	public String getPrefix() {
		return this.prefix;
	}
	
	/**
	 * properties
	 * 
	 * @param suffix
	 *            suffix
	 */
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}
	
	/**
	 * properties
	 * 
	 */
	public String getSuffix() {
		return this.suffix;
	}
	
	
	/**
	 * properties
	 * 
	 * @param separator
	 *            separator
	 */
	public void setSeparator(String separator){
		this.separator = separator;
	}
}
