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
package org.anyframe.plugin.jquery.communityfinder.domain;

import java.io.Serializable;

import javax.validation.constraints.Size;


/**
 * This Community class is a Value Object class for JQUERY-COMMUNITY domain.
 * 
 * @author jonghwan jeong
 */
public class CommunityTreeList implements Serializable {

	private static final long serialVersionUID = 1L;

	@Size(min = 1, max = 16)
	private String communityId;
	
	@Size(min = 1, max = 50)
	private String communityName;
	
	@Size(min = 1, max = 50)
	private String communityDesc;
	
	@Size(min = 1, max = 16)
	private String parentId;
	
	@Size(min = 1, max = 16)
	private String communityLevel;
	
	private String isCategory = "false";
	
	private boolean leaf;
	
	private boolean expanded;
	
	private boolean loaded;
	
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
	
	public String getCommunityDesc() {
		return communityDesc;
	}

	public void setCommunityDesc(String communityDesc) {
		this.communityDesc = communityDesc;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getCommunityLevel() {
		return communityLevel;
	}

	public void setCommunityLevel(String communityLevel) {
		this.communityLevel = communityLevel;
	}

	public String getIsCategory() {
		return isCategory;
	}

	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public boolean isExpanded() {
		return expanded;
	}

	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}

	public boolean isLoaded() {
		return loaded;
	}

	public void setLoaded(boolean loaded) {
		this.loaded = loaded;
	}
}
