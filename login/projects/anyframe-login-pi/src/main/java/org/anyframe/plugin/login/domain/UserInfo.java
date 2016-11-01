package org.anyframe.plugin.login.domain;

import java.io.Serializable;
import java.util.Locale;

public class UserInfo implements Serializable{

	private static final long serialVersionUID = 1L;

	private String userId ="";
	private String userName ="";
	private Locale locale;
	private Locale language;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Locale getLocale() {
		return locale;
	}
	public void setLocale(Locale locale) {
		this.locale = locale;
	}
	public Locale getLanguage() {
		return language;
	}
	public void setLanguage(Locale language) {
		this.language = language;
	}
	
	
}
