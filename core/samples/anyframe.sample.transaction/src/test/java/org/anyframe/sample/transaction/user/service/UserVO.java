package org.anyframe.sample.transaction.user.service;

import java.io.Serializable;
import java.math.BigDecimal;

public class UserVO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String userId;

    private String userName;

    private String password;

    private String role;

    private String ssn;

    private String slYn;

    private String birthDay;

    private java.math.BigDecimal age = new java.math.BigDecimal(0);

    private String cellPhone;

    private String addr;

    private String email;

    private String emailYn;

    private String imageFile;

    private java.sql.Timestamp regDate = new java.sql.Timestamp(
	    new java.util.Date().getTime());

    public String getUserId() {
	return this.userId;
    }

    public void setUserId(String param) {
	this.userId = param;
    }

    public String getUserName() {
	return this.userName;
    }

    public void setUserName(String param) {
	this.userName = param;
    }

    public String getPassword() {
	return this.password;
    }

    public void setPassword(String param) {
	this.password = param;
    }

    public String getRole() {
	return this.role;
    }

    public void setRole(String param) {
	this.role = param;
    }

    public String getSsn() {
	return this.ssn;
    }

    public void setSsn(String param) {
	this.ssn = param;
    }

    public String getSlYn() {
	return this.slYn;
    }

    public void setSlYn(String param) {
	this.slYn = param;
    }

    public String getBirthDay() {
	return this.birthDay;
    }

    public void setBirthDay(String param) {
	this.birthDay = param;
    }

    public java.math.BigDecimal getAge() {
	return this.age;
    }

    public void setAge(BigDecimal i) {
	this.age = i;
    }

    public String getCellPhone() {
	return this.cellPhone;
    }

    public void setCellPhone(String param) {
	this.cellPhone = param;
    }

    public String getAddr() {
	return this.addr;
    }

    public void setAddr(String param) {
	this.addr = param;
    }

    public String getEmail() {
	return this.email;
    }

    public void setEmail(String param) {
	this.email = param;
    }

    public String getEmailYn() {
	return this.emailYn;
    }

    public void setEmailYn(String param) {
	this.emailYn = param;
    }

    public String getImageFile() {
	return this.imageFile;
    }

    public void setImageFile(String param) {
	this.imageFile = param;
    }

    public java.sql.Timestamp getRegDate() {
	return this.regDate;
    }

    public void setRegDate(java.sql.Timestamp param) {
	this.regDate = param;
    }

    public String toString() {
	return " [userId] " + userId + " [userName] " + userName
		+ " [password] " + password + " [role] " + role + " [ssn] "
		+ ssn + " [slYn] " + slYn + " [birthDay] " + birthDay
		+ " [age] " + age + " [cellPhone] " + cellPhone + " [addr] "
		+ addr + " [email] " + email + " [emailYn] " + emailYn
		+ " [imageFile] " + imageFile + " [regDate] " + regDate;
    }

}
