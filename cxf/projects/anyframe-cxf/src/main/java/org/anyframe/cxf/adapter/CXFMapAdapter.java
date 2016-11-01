/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.cxf.adapter;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class CXFMapAdapter extends XmlAdapter<CXFMap, Map<String, Object>> {
	public CXFMap marshal(Map<String, Object> v) {
		CXFMap map = new CXFMap();
		for (Map.Entry<String, Object> e : v.entrySet()) {
			CXFMap.CXFEntry iue = new CXFMap.CXFEntry();
			iue.setValue(e.getValue());
			iue.setKey(e.getKey());
			map.getEntries().add(iue);
		}
		return map;
	}

	public Map<String, Object> unmarshal(CXFMap v) {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		for (CXFMap.CXFEntry e : v.getEntries()) {
			map.put(e.getKey(), e.getValue());
		}
		return map;
	}
}
