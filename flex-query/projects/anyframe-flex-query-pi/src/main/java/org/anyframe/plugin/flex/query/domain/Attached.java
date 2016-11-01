package org.anyframe.plugin.flex.query.domain;

import java.io.Serializable;

public class Attached implements Serializable {

	private static final long serialVersionUID = 1L;

	String id;
	String name;
	String refId;
	long fileSize;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRefId() {
		return refId;
	}

	public void setRefId(String refId) {
		this.refId = refId;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}

	@Override
	public String toString() {
		return "[id=" + id + 
				"\n name=" + name + 
				"\n refId=" + refId + 
				"\n fileSize=" + fileSize +
				"]";
	}
}
