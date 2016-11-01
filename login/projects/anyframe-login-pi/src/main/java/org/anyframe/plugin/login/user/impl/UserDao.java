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
package org.anyframe.plugin.login.user.impl;

import java.util.Locale;

import org.anyframe.plugin.login.domain.UserInfo;
import org.springframework.stereotype.Repository;

/**
 * This UserDao class is a dao class to set user information by user id.
 * 
 * @author Yongmin Jo
 */
@Repository("loginUserDao")
public class UserDao {
	public UserInfo getUserInfo(String id) throws Exception {
		String userId = id;

		UserInfo userInfo = new UserInfo();

		if (id.equals("anyframe_ko")) {
			userInfo.setUserId(userId);
			userInfo.setUserName("애니프레임");
			userInfo.setLanguage(Locale.KOREAN);
			userInfo.setLocale(Locale.KOREA);
		} else if (id.equals("anyframe_en")) {
			userInfo.setUserId(userId);
			userInfo.setUserName("Anyframe");
			userInfo.setLanguage(Locale.ENGLISH);
			userInfo.setLocale(Locale.US);
		}
		return userInfo;
	}
}
