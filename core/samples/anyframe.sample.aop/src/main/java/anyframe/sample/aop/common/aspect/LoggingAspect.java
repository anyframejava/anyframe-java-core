/*
 * Copyright 2002-2009 the original author or authors.
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
package anyframe.sample.aop.common.aspect;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class LoggingAspect {
	@Pointcut("execution(* *..GenericService+.*(..))")
	public void serviceMethod(){}
	
	@Before("serviceMethod()")
	public void beforeLogging(JoinPoint thisJoinPoint) {
		Class clazz = thisJoinPoint.getTarget().getClass();
		String className = (thisJoinPoint.getTarget().getClass().getName())
				.toLowerCase();
		String methodName = thisJoinPoint.getSignature().getName();

		StringBuffer buf = new StringBuffer();
		buf.append("\n** Logging Aspect : executed " + methodName + "() in "
				+ className + " Class.");
		Object[] arguments = thisJoinPoint.getArgs();
		if (arguments.length > 0) {
			for (int i = 0; i < arguments.length; i++) {
				buf
						.append("\n*************"
								+ arguments[i].getClass().getName()
								+ "*************\n");
				buf.append(arguments[i].toString());
				buf.append("\n*******************************************\n");
			}
		} else
			buf.append("\nNo arguments\n");

		Log logger = LogFactory.getLog(clazz);
		if (logger.isDebugEnabled())
			logger.debug(buf.toString());
	}
}
