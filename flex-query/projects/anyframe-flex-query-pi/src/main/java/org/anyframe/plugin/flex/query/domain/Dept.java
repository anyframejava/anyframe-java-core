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
 * This Dept class is a Value Object class for Dept domain.
 * 
 * @author Jonghoon Kim
 */
public class Dept extends FlexDataGrid implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private String deptId;
    private String deptName;
    private String deptLevel;
    private String deptDesc;
    private List<Dept> children;
	public String getDeptId() {
		return deptId;
	}
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getDeptLevel() {
		return deptLevel;
	}
	public void setDeptLevel(String deptLevel) {
		this.deptLevel = deptLevel;
	}
	public String getDeptDesc() {
		return deptDesc;
	}
	public void setDeptDesc(String deptDesc) {
		this.deptDesc = deptDesc;
	}
	public List<Dept> getChildren() {
		return children;
	}
	public void setChildren(List<Dept> children) {
		this.children = children;
	}
	
	public String toString() {
        StringBuffer sb = new StringBuffer(getClass().getSimpleName());

        sb.append(" [");
        sb.append("deptId").append("='").append(getDeptId()).append("', ");
        sb.append("deptName").append("='").append(getDeptName()).append("', ");
        sb.append("deptLevel").append("='").append(getDeptName()).append("', ");
        sb.append("deptDesc").append("='").append(getDeptDesc()).append("', ");
        sb.append("]");

        return sb.toString();
    }
}
