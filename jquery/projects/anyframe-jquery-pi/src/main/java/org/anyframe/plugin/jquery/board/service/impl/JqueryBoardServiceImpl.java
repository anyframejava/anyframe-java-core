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
package org.anyframe.plugin.jquery.board.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.attach.service.UploadInfoService;
import org.anyframe.plugin.jquery.board.service.JqueryBoardService;
import org.anyframe.plugin.jquery.domain.JqueryBoard;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * This class is a Implementation class to provide board crud functionality.
 * 
 * @author Sujeong Lee
 *
 */
@Service("jqueryBoardService")
@Transactional(rollbackFor = { Exception.class })
public class JqueryBoardServiceImpl implements JqueryBoardService{

	@Inject
	@Named("jqueryBoardDao")
	private JqueryBoardDao boardDao;
	
	@Inject
	@Named("jqueryUploadInfoService")
	private UploadInfoService uploadService;
	
	public Page getPagingList(JqueryBoard board) throws Exception {
		return boardDao.getPagingList(board, board.getPage());
	}

	public int create(JqueryBoard board, String fileRefId) throws Exception {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS", new Locale("ko", "KR"));
		String postId = "POST-" + formatter.format(new Date());
		board.setPostId(postId);
		board.setRegDate((new SimpleDateFormat("yyyy/MM/dd")).format(new Date()));
		int r = boardDao.create(board);
		if(r > 0) uploadService.updateFileRefId(fileRefId, postId);
		return r;
	}

	public int update(JqueryBoard board) throws Exception {
		return boardDao.update(board);
	}

	public int remove(String boardId) throws Exception {
		return boardDao.remove(boardId);
	}

	public JqueryBoard get(String boardId) throws Exception {
		return boardDao.get(boardId);
	}

	public List<String> getSearchKeyword(String keyword, String condition, String communityId) throws Exception {
		List<String> r = null;
		JqueryBoard board = new JqueryBoard();
		board.setCommunityId(communityId);
		if("title".equals(condition)) {
			board.setTitle(keyword);
		}else if("contents".equals(condition)) {
			board.setContents(keyword);
		}else{
			throw new Exception("condition is null");
		}
		List<JqueryBoard> list = boardDao.getList(board);
		int listSize = 0;
		if(list != null) {
			listSize = list.size();
			r = new ArrayList<String>();
			for(int i=0;i<listSize;i++){
				JqueryBoard item = (JqueryBoard)list.get(i);
				if("title".equals(condition)) {
					r.add(item.getTitle());
				}else if("contents".equals(condition)) {
					r.add(item.getContents());
				}
			}
		}
		return r;
	}

}
