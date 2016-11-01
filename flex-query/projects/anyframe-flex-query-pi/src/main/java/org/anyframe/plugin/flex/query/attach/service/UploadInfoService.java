package org.anyframe.plugin.flex.query.attach.service;

import java.util.List;

import org.anyframe.plugin.flex.query.domain.Attached;

public interface UploadInfoService {
	
	public int create(List<Attached> attachedList) throws Exception;
	
	public int remove(List<Attached> attachedList) throws Exception;
	
	public List<Attached> getList(String refId) throws Exception;
}
