package org.anyframe.plugin.flex.query.attach.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.plugin.flex.query.domain.Attached;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.stereotype.Repository;

@Repository("flexQueryUploadInfoDao")
public class UploadInfoDao extends AbstractDao{
	
	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}
	
	public int create(Attached attached) throws Exception {
		return create("FlexQueryAttached", attached);
	}
	
	@SuppressWarnings("unchecked")
	public List<Attached> getList(String refId) throws Exception {
		Attached attached = new Attached();
		attached.setRefId(refId);
		return (List<Attached>) this.findList("FlexQueryAttached", attached);
	}
	
	public int remove(Attached attached) throws Exception {
		return remove("FlexQueryAttached", attached);
	}
}
