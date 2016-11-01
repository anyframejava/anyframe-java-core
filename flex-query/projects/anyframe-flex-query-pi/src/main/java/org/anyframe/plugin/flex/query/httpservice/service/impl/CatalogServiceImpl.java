package org.anyframe.plugin.flex.query.httpservice.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.flex.query.dao.FlexDao;
import org.anyframe.plugin.flex.query.httpservice.service.CatalogService;
import org.springframework.stereotype.Service;

@Service("catalogService")
public class CatalogServiceImpl implements CatalogService{

	@Inject
	@Named("flexDao")
	private FlexDao flexDao;
	
	public List getProduct() throws Exception {
		return (List) flexDao.getList("findFlexQueryProductList", new HashMap());
	}

}
