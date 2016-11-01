package org.anyframe.plugin.flex.query.attach.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.flex.query.attach.service.UploadInfoService;
import org.anyframe.plugin.flex.query.domain.Attached;
import org.springframework.flex.remoting.RemotingDestination;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("flexQueryUploadInfoService")
@RemotingDestination
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class UploadInfoServiceImpl implements UploadInfoService {

	@Inject
	@Named("flexQueryUploadInfoDao")
	private UploadInfoDao uploadInfoDao;
	
	public int create(List<Attached> attachedList) throws Exception {

		int countAttachedList = attachedList.size();
		
		int countCreateAttached = 0;
		for (int i = 0; i < countAttachedList; i++) {
			countCreateAttached = countCreateAttached
					+ uploadInfoDao.create(attachedList.get(i));
		}
		return countCreateAttached;
	}
	
	public List<Attached> getList(String refId) throws Exception {
		return uploadInfoDao.getList(refId);
	}


	public int remove(List<Attached> attachedList) throws Exception {
		
		int countAttachedList = attachedList.size();

		int countRemoveAttached = 0;
		for (int i = 0; i < countAttachedList; i++) {
			countRemoveAttached = countRemoveAttached
					+ uploadInfoDao.remove(attachedList.get(i));
		}
		return countRemoveAttached;
	}
}
