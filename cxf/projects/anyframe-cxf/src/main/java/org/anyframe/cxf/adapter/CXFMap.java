package org.anyframe.cxf.adapter;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlType(name = "CXFMap")
@XmlAccessorType(XmlAccessType.FIELD)
public class CXFMap {
	@XmlElement(nillable = false, name = "entry")
	private List<CXFEntry> entries = new ArrayList<CXFEntry>();

	public List<CXFEntry> getEntries() {
		return entries;
	}

	@XmlAccessorType(XmlAccessType.FIELD)
	@XmlType(name = "IdentifiedCXF")
	static class CXFEntry {
		// Map keys cannot be null
		@XmlElement(required = true, nillable = false)
		private String key;

		private Object value;

		public String getKey() {
			return key;
		}

		public void setKey(String key) {
			this.key = key;
		}

		public Object getValue() {
			return value;
		}

		public void setValue(Object value) {
			this.value = value;
		}
	}
}
