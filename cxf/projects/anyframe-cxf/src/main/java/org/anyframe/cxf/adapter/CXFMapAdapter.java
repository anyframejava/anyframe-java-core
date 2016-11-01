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
