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
package org.anyframe.plugin.login.authentication.service.impl;

import org.anyframe.plugin.login.authentication.service.AuthenticationService;
import org.anyframe.plugin.login.domain.LoginInfo;
import org.springframework.stereotype.Service;

/**
 * This AuthenticationServiceImpl class is an implementation class to
 * authenticate user from login information.
 * 
 * @author Yongmin Jo
 */
@Service("loginAuthenticationService")
public class AuthenticationServiceImpl implements AuthenticationService {

	public boolean authenticate(LoginInfo loginInfo) throws Exception {
		boolean certification = false;

		String id = loginInfo.getId();
		String password = loginInfo.getPassword();

		if (id.equals("anyframe_ko") && password.equals("anyframe0")) {
			certification = true;
		} else if (id.equals("anyframe_en") && password.equals("anyframe1")) {
			certification = true;
		}

		return certification;
	}

}
