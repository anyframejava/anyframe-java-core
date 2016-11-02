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
package org.anyframe.plugin.flex.query.domain;

import java.io.Serializable;

/**
 * This Board class is a Value Object class for Board domain.
 * 
 * @author Jonghoon Kim
 */
public class Board extends FlexDataGrid implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String postId;
	private String title;
	private String contents;
	private String regId;
	private String regDate;
	private String communityId;
	private String communityName;
	
	public String getPostId() {
		return postId;
	}
	public void setPostId(String postId) {
		this.postId = postId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public String getRegId() {
		return regId;
	}
	public void setRegId(String regId) {
		this.regId = regId;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getCommunityId() {
		return communityId;
	}
	public void setCommunityId(String communityId) {
		this.communityId = communityId;
	}
	public String getCommunityName() {
		return communityName;
	}
	public void setCommunityName(String communityName) {
		this.communityName = communityName;
	}
	
	public String toString() {
        StringBuffer sb = new StringBuffer(getClass().getSimpleName());

        sb.append(" [");
        sb.append("postId").append("='").append(getPostId()).append("', ");
        sb.append("title").append("='").append(getTitle()).append("', ");
        sb.append("contents").append("='").append(getContents()).append("', ");
        sb.append("regId").append("='").append(getRegId()).append("', ");
        sb.append("regDate").append("='").append(getRegDate()).append("', ");
        sb.append("communityId").append("='").append(getCommunityId()).append("', ");
        sb.append("communityName").append("='").append(getCommunityName()).append("', ");
        sb.append("]");

        return sb.toString();
    }
}
