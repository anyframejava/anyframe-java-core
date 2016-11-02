package org.anyframe.plugin.mobile.domain;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class User{
	
	
	@NotNull
	private String email;

	@NotNull
	private String name;
	
	@NotNull
	@Size(min = 8, max = 12)
	private String password;
	
	private String gender;
	
	@NotNull
	private String passcode;
	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPasscode() {
		return passcode;
	}

	public void setPasscode(String passcode) {
		this.passcode = passcode;
	}


	@Override
	public String toString() {
		return "User [email=" + email + ", name=" + name + ", password="
				+ password + ", gender=" + gender + ", passcode=" + passcode
				+ "]";
	}
}
