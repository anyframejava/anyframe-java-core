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
package org.anyframe.sample.javaconfig.common.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
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
	
	public LoggingAspect(){
		System.out.println("Calling constructor of LoggingAspect");
	}

	@Before("execution(* org.anyframe.sample.javaconfig..*Impl.*(..))")
	public void beforeLogging(JoinPoint thisJoinPoint) {
		Class<? extends Object> clazz = thisJoinPoint.getTarget().getClass();
		String methodName = thisJoinPoint.getSignature().getName();
		System.out.println("Aspect class Logging! \n \t class : " + clazz.getSimpleName() + " \n \t method : " + methodName);
	}
}
