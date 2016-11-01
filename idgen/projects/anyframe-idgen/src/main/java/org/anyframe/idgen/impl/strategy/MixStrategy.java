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


/**
 * MixStrategy is a kind of id generation strategy. MixStrategy assembles prefix, suffix,
 * original string, paddingChar, maxCiphers into new id. For example, <br>
 * prefix is a 'TEST-' <br>
 * paddingChar is a '0' <br>
 * original string is a '12' <br>
 * and maxCiphers is a 5 <br>
 * in result, new id is a 'TEST-00012'.
 * 
 * * The Configuration to use a MixStrategy looks like the following:
 * 
 * <pre>
 *  &lt;property name=&quot;prefix&quot; value=&quot;TEST-&quot;/&gt;
 *  &lt;property name=&quot;suffix&quot; value=&quot;-TEST&quot;/&gt;	
 *  &lt;property name=&quot;maxCiphers&quot; value=&quot;5&quot;/&gt;
 *  &lt;property name=&quot;paddingChar&quot; value=&quot;0&quot;/&gt;
 * </pre>
 * 
 * 
 * @author Jonghwan Jeong
 * 
 */
public class MixStrategy extends AbstractStrategy {

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
		return prefix + getPaddedId(originalId) + suffix;
	}

}
