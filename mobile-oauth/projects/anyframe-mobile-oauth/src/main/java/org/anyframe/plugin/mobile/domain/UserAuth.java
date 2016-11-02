package org.anyframe.plugin.mobile.domain;

import javax.validation.constraints.NotNull;

public class UserAuth{

	@NotNull
	private String email;
	
	@NotNull
	private String name;
	
	@NotNull
	private String roleId;
	
	
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

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}


	@Override
	public String toString() {
		return "UserAuth [email=" + email + ", name=" + name + ", roleId="
				+ roleId + "]";
	}
	
}
