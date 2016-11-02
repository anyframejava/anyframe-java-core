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
package org.anyframe.plugin.jquery.userfinder.domain;

import java.io.Serializable;

import javax.validation.constraints.Size;

/**
 * This User class is a Value Object class for JQUERY-USER domain.
 * 
 * @author jonghwan jeong
 */
public class User implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Size(min = 1, max = 20)
	private String userName;
	
	@Size(min = 1, max = 20)
	private String enName;

	@Size(min = 1, max = 20)
	private String compPhone;

	@Size(min = 1, max = 20)
	private String phone;
	
	@Size(min = 1, max = 20)
	private String cellPhone;

	@Size(min = 1, max = 20)
	private String company;

	@Size(min = 1, max = 20)
	private String jobPosition;

	@Size(min = 1, max = 20)
	private String assignment;

	@Size(min = 1, max = 1)
	private String officerYn;

	@Size(min = 1, max = 20)
	private String fax;
	
	@Size(min = 1, max = 10)
	private String zipCode;

	@Size(min = 1, max = 100)
	private String address;
	
	@Size(min = 1, max = 10)
	private String compZipCode;

	@Size(min = 1, max = 100)
	private String compAddress;
	
	@Size(min = 1, max = 30)
	private String email;

	@Size(min = 1, max = 16)
	private String userId;

	@Size(min = 1, max = 16)
	private String deptId;

	@Size(min = 1, max = 16)
	private String password;

	@Size(min = 1, max = 5)
	private String firstHalfVolunteerWork;
	
	@Size(min = 1, max = 5)
	private String secondHalfVolunteerWork;

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

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstHalfVolunteerWork() {
		return firstHalfVolunteerWork;
	}

	public void setFirstHalfVolunteerWork(String firstHalfVolunteerWork) {
		this.firstHalfVolunteerWork = firstHalfVolunteerWork;
	}

	public String getSecondHalfVolunteerWork() {
		return secondHalfVolunteerWork;
	}

	public void setSecondHalfVolunteerWork(String secondHalfVolunteerWork) {
		this.secondHalfVolunteerWork = secondHalfVolunteerWork;
	}
}