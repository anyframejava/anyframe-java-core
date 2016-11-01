/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.plugin.login;

import org.anyframe.plugin.login.domain.UserInfo;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

/**
 * This LoggingAspect class is an Aspect class to provide logging functionality
 * on this project.
 * 
 * @author Yongmin Jo
 */
@Aspect
@Service
public class LoggingUserInfoAspect {

	@Pointcut("execution(* org.anyframe.plugin.login..*Impl.*(..))")
	public void loggingMethod() {
	}

	@Before("loggingMethod()")
	public void beforeLogging(JoinPoint thisJoinPoint) {
		Class<? extends Object> clazz = thisJoinPoint.getTarget().getClass();

		StringBuilder messageBuf = new StringBuilder();
		
		if( ThreadLocalUtil.isExist("userInfo")){
			UserInfo userInfo = (UserInfo)ThreadLocalUtil.get("userInfo");
			
			messageBuf
					.append("\n-------------------------------------------------------------------------------\n");
			messageBuf.append("  This method called by " + userInfo.getUserName() +"\n");
			messageBuf
					.append("-------------------------------------------------------------------------------");
		}

		Log logger = LogFactory.getLog(clazz);
		
		if (logger.isInfoEnabled()) {
			logger.info(messageBuf.toString());
		}
	}
}
