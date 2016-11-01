/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.simpleweb.beans.support;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


/**
 * Simple test bean used for testing bean factories, the AOP framework etc.
 *
 * @author Rod Johnson
 * @author Juergen Hoeller
 * @since 15 April 2001
 */
public class ServiceTestBean {


	public String getStringValue() {
		return "KOREA";
	}

	public ArrayList<String> getArrayListValue(ArrayList<String> array){
		ArrayList<String> result = new ArrayList<String>();
		result.add("KOREA");
		result.add("JAPAN");
		result.add("USA");
		return result;
	}

	public Map<String, Object> getMapValue(Map<String,Object> map){
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("1","KOREA");
		result.put("2","JAPAN");
		result.put("3", "USA");
		return result;
	}
}