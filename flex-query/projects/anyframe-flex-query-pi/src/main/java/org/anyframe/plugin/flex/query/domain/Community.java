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
 * This Community class is a Value Object class for Community domain.
 * 
 * @author Jonghoon Kim
 */
public class Community extends FlexDataGrid implements Serializable {
   
	private static final long serialVersionUID = 1L;
	private String communityId;
    private String communityName;
    private String communityDesc;
    private String regId;
    private String regDate;
    private String categoryId;
    private String categoryName;
    private String label;
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
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}

	public String toString() {
        StringBuffer sb = new StringBuffer(getClass().getSimpleName());

        sb.append(" [");
        sb.append("communityId").append("='").append(getCommunityId()).append("', ");
        sb.append("communityName").append("='").append(getCommunityName()).append("', ");
        sb.append("communityDesc").append("='").append(getCommunityDesc()).append("', ");
        sb.append("regId").append("='").append(getRegId()).append("', ");
        sb.append("regDate").append("='").append(getRegDate()).append("', ");
        sb.append("categoryId").append("='").append(getCategoryId()).append("', ");
        sb.append("categoryName").append("='").append(getCategoryName()).append("', ");
        sb.append("label").append("='").append(getLabel()).append("', ");
        sb.append("]");

        return sb.toString();
    }
    
}
