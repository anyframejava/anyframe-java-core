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
 * ClassNameStrategy is a kind of id generation strategy. ClassNameStrategy assembles class name,
 * prefix or suffix(or prefix&suffix), original string, paddingChar into new id. For example, <br>
 * prefix is a 'true'<br>
 * paddingChar is a '0' <br>
 * original string is a '12' <br>
 * and maxCiphers is a 5 <br>
 * and class name is a UserDao <br>
 * and separator is a - <br>
 * in result, new id is a 'UserDao-00012'.
 * 
 * * The Configuration to use a MixPrefixStrategy looks like the following:
 * 
 * <pre>
 *  &lt;property name=&quot;prefix&quot; value=&quot;true&quot;/&gt;
 *  &lt;property name=&quot;separator&quot; value=&quot;-&quot;/&gt;
 *  &lt;property name=&quot;maxCiphers&quot; value=&quot;5&quot;/&gt;
 *  &lt;property name=&quot;paddingChar&quot; value=&quot;0&quot;/&gt;
 * </pre>
 * 
 * 
 * @author Heewon Jung
 * 
 */
public class ClassNameStrategy extends AbstractStrategy {
	

	/**
	 * convert original id to a new id which apply a specific assembling rule
	 * 
	 * @param originalId
	 *            original id to be converted
	 * @param clazz
	 *  		  class information that call ID generation service.
	 * @return assembled id
	 */
	@Override
	public String makeId(String originalId, Class<?> clazz) {
		
		String className ="";
		
		if(clazz != null){
			className = clazz.getSimpleName();
		}
		
		return super.getId(originalId, className);
	}

}
