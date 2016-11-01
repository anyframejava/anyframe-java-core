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
import java.util.List;

/**
 * This Category class is a Value Object class for Category domain.
 * 
 * @author Jonghoon Kim
 */
public class Category extends FlexDataGrid implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
    private String categoryId;
    private String categoryName;
    private String categoryDesc;
    private String regDate;
    private String label;
    private List<Community> children;
    
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
	public String getCategoryDesc() {
		return categoryDesc;
	}
	public void setCategoryDesc(String categoryDesc) {
		this.categoryDesc = categoryDesc;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public List<Community> getChildren() {
		return children;
	}
	public void setChildren(List<Community> children) {
		this.children = children;
	}

	public String toString() {
        StringBuffer sb = new StringBuffer(getClass().getSimpleName());

        sb.append(" [");
        sb.append("categoryId").append("='").append(getCategoryId()).append("', ");
        sb.append("categoryName").append("='").append(getCategoryName()).append("', ");
        sb.append("categoryDesc").append("='").append(getCategoryDesc()).append("', ");
        sb.append("regDate").append("='").append(getRegDate()).append("', ");
        sb.append("label").append("='").append(getLabel()).append("', ");
        sb.append("]");

        return sb.toString();
    }
}
