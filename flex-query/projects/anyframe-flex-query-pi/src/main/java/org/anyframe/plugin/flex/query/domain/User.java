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
 * This User class is a Value Object class for User domain.
 * 
 * @author Jonghoon Kim
 */
public class User extends FlexDataGrid implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String userId;
    private Dept dept;
    private String userName;
    private String enName;
    private String compPhone;
    private String phone;
    private String cellPhone;
    private String company;
    private String jobPosition;
    private String assignment;
    private String officerYn;
    private String fax;
    private String zipCode;
    private String address;
    private String compZipCode;
    private String compAddress;
    private String email;
    private String password;
    private String deptName;
	private String deptId;
	
    public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Dept getDept() {
		return dept;
	}
	public void setDept(Dept dept) {
		this.dept = dept;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEnName() {
		return enName;
	}
	public void setEnName(String enName) {
		this.enName = enName;
	}
	public String getCompPhone() {
		return compPhone;
	}
	public void setCompPhone(String compPhone) {
		this.compPhone = compPhone;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getCellPhone() {
		return cellPhone;
	}
	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getJobPosition() {
		return jobPosition;
	}
	public void setJobPosition(String jobPosition) {
		this.jobPosition = jobPosition;
	}
	public String getAssignment() {
		return assignment;
	}
	public void setAssignment(String assignment) {
		this.assignment = assignment;
	}
	public String getOfficerYn() {
		return officerYn;
	}
	public void setOfficerYn(String officerYn) {
		this.officerYn = officerYn;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCompZipCode() {
		return compZipCode;
	}
	public void setCompZipCode(String compZipCode) {
		this.compZipCode = compZipCode;
	}
	public String getCompAddress() {
		return compAddress;
	}
	public void setCompAddress(String compAddress) {
		this.compAddress = compAddress;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getDeptId() {
		return deptId;
	}
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	
	public String toString() {
        StringBuffer sb = new StringBuffer(getClass().getSimpleName());

        sb.append(" [");
        sb.append("userId").append("='").append(getUserId()).append("', ");
        sb.append("userName").append("='").append(getUserName()).append("', ");
        sb.append("enName").append("='").append(getEnName()).append("', ");
        sb.append("compPhone").append("='").append(getCompPhone()).append("', ");
        sb.append("phone").append("='").append(getPhone()).append("', ");
        sb.append("cellPhone").append("='").append(getCellPhone()).append("', ");
        sb.append("company").append("='").append(getCompany()).append("', ");
        sb.append("jobPosition").append("='").append(getJobPosition()).append("', ");
        sb.append("assignment").append("='").append(getAssignment()).append("', ");
        sb.append("officerYn").append("='").append(getOfficerYn()).append("', ");
        sb.append("fax").append("='").append(getFax()).append("', ");
        sb.append("zipCode").append("='").append(getZipCode()).append("', ");
        sb.append("address").append("='").append(getAddress()).append("', ");
        sb.append("compZipCode").append("='").append(getCompZipCode()).append("', ");
        sb.append("compAddress").append("='").append(getCompAddress()).append("', ");
        sb.append("email").append("='").append(getEmail()).append("', ");
        sb.append("password").append("='").append(getPassword()).append("', ");
        sb.append("deptName").append("='").append(getDeptName()).append("', ");
        sb.append("deptId").append("='").append(getDeptId()).append("', ");
        sb.append("]");

        return sb.toString();
    }

	
}
