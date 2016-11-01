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
package org.anyframe.plugin.common.aspect;

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
 * @author Sooyeon Park
 */
@Aspect
@Service
public class LoggingAspect {

	@Pointcut("execution(* org.anyframe.plugin..*Impl.*(..)) || execution(* org.anyframe.mip.query..*MiPServiceImpl.*(..))")
	public void serviceMethod() {
	}

	@Before("serviceMethod()")
	public void beforeLogging(JoinPoint thisJoinPoint) {
		Class<? extends Object> clazz = thisJoinPoint.getTarget().getClass();
		String methodName = thisJoinPoint.getSignature().getName();
		Object[] arguments = thisJoinPoint.getArgs();

		StringBuffer argBuf = new StringBuffer();
		StringBuffer argValueBuf = new StringBuffer();
		int i = 0;
		for (Object argument : arguments) {
			String argClassName = argument.getClass().getSimpleName();
			if (i > 0) {
				argBuf.append(", ");
			}
			argBuf.append(argClassName + " arg" + ++i);
			argValueBuf.append(".arg" + i + " : " + argument.toString() + "\n");
		}

		if (i == 0) {
			argValueBuf.append("No arguments\n");
		}

		StringBuffer messageBuf = new StringBuffer();
		messageBuf.append("before executing " + methodName + "("
				+ argBuf.toString() + ") method");
		messageBuf
				.append("\n-------------------------------------------------------------------------------\n");
		messageBuf.append(argValueBuf.toString());
		messageBuf
				.append("-------------------------------------------------------------------------------");

		Log logger = LogFactory.getLog(clazz);
		if (logger.isDebugEnabled()) {
			logger.debug(messageBuf.toString());
		}
	}
}
