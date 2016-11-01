/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.plugin.jquery.community.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.category.service.impl.JqueryCategoryDao;
import org.anyframe.plugin.jquery.community.service.JqueryCommunityService;
import org.anyframe.plugin.jquery.domain.JqueryCategory;
import org.anyframe.plugin.jquery.domain.JqueryCommunity;
import org.anyframe.plugin.jquery.util.Tree;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * This class is a Implementation class to provide community crud functionality.
 * 
 * @author Sujeong Lee
 *
 */
@Service("jqueryCommunityService")
@Transactional(rollbackFor = { Exception.class })
public class JqueryCommunityServiceImpl implements JqueryCommunityService {

	@Inject
	@Named("jqueryCategoryDao")
	private JqueryCategoryDao categoryDao;

	@Inject
	@Named("jqueryCommunityDao")
	private JqueryCommunityDao communityDao;

	public String create(JqueryCommunity community) throws Exception {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS", new Locale("ko", "KR"));
		String communityId = "COMMUNITY-" + formatter.format(new Date());
		community.setCommunityId(communityId);
		community.setRegDate((new SimpleDateFormat("yyyy/MM/dd"))
				.format(new Date()));
		communityDao.create(community);
		return communityId;
	}

	public int update(JqueryCommunity community) throws Exception {
		return communityDao.update(community);
	}
	
	public int updateCell(JqueryCommunity community) throws Exception {
		return communityDao.updateCell(community);
	}

	public int remove(String communityId) throws Exception {
		JqueryCommunity community = new JqueryCommunity();
		community.setCommunityId(communityId);
		return communityDao.remove(community);
	}

	public JqueryCommunity get(String communityId) throws Exception {
		JqueryCommunity community = new JqueryCommunity();
		community.setCommunityId(communityId);
		return communityDao.get(community);
	}

	public Page getPagingList(JqueryCommunity community)
			throws Exception {
		return communityDao.getPagingList(community, community.getPage());
	}

	public List<JqueryCommunity> getList() throws Exception {
		return communityDao.getList(new JqueryCommunity());
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, String>> getTreeList() throws Exception {
		List<Map<String, String>> trees = new ArrayList<Map<String, String>>();
		List<JqueryCommunity> communities = (List<JqueryCommunity>) communityDao.getList(new JqueryCommunity());
		List<JqueryCategory> categories = (List<JqueryCategory>) categoryDao.getList(new JqueryCategory());
		Tree tree = null;
		if (categories != null) {
			tree = new Tree();
			int cL = categories.size();
			for (int i = 0; i < cL; i++) {
				JqueryCategory ca = (JqueryCategory) categories.get(i);
				Map<String, String> item = new HashMap<String, String>();
				item.put("nodeId", ca.getCategoryId());
				item.put("parentId", "ROOT");
				item.put("depth", "0");
				item.put("displayOrder", Integer.toString(i));
				item.put("nodeName", ca.getCategoryName());
				item.put("type", "CA");
				tree.add(ca.getCategoryId(), "ROOT", item);
			}

			if (communities != null) {
				int ccL = communities.size();
				for (int i = 0; i < ccL; i++) {
					JqueryCommunity co = (JqueryCommunity) communities.get(i);
					Map<String, String> item = new HashMap<String, String>();
					item.put("nodeId", co.getCommunityId());
					item.put("parentId", co.getCategoryId());
					item.put("depth", "1");
					item.put("displayOrder", "0");
					item.put("nodeName", co.getCommunityName());
					item.put("type", "CO");
					tree.add(co.getCommunityId(), co.getCategoryId(), item);
				}
			}

			trees = (List<Map<String, String>>) tree.getList();
		}
		return trees;
	}

	public List<String> getSearchKeyword(String keyword, String condition, String categoryId) throws Exception {
		List<String> r = null;
		JqueryCommunity param = new JqueryCommunity();
		param.setCategoryId(categoryId);
		
		if ("name".equals(condition)) {
			param.setCommunityName(keyword);
		} else if ("desc".equals(condition)) {
			param.setCommunityDesc(keyword);
		} else {
			throw new Exception("condition is null");
		}
		
		List<JqueryCommunity> list = communityDao.getList(param);
		int listSize = 0;
		if (list != null) {
			listSize = list.size();
			r = new ArrayList<String>();
			for (int i = 0; i < listSize; i++) {
				JqueryCommunity item = (JqueryCommunity) list.get(i);
				if ("name".equals(condition)) {
					r.add(item.getCommunityName());
				} else if ("desc".equals(condition)) {
					r.add(item.getCommunityDesc());
				}
			}
		}
		return r;
	}

}
