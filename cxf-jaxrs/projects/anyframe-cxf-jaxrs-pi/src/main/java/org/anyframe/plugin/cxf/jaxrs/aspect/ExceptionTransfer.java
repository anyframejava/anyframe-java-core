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
package org.anyframe.plugin.cxf.jaxrs.aspect;

import java.util.Locale;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.anyframe.plugin.common.MovieFinderException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.aop.framework.Advised;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

@Aspect
@Service("cxfJaxRsExceptionTransfer")
public class ExceptionTransfer {

	@Pointcut("execution(* org.anyframe.plugin.cxf.jaxrs..*Impl.*(..))")
	public void serviceMethod() {
	}

	@Inject
	private MessageSource messageSource;

	@AfterThrowing(pointcut = "serviceMethod()", throwing = "exception")
	public void transfer(JoinPoint thisJoinPoint, Exception exception)
			throws MovieFinderException {
		Object target = thisJoinPoint.getTarget();
		while (target instanceof Advised) {
			try {
				target = ((Advised) target).getTargetSource().getTarget();
			} catch (Exception e) {
				LogFactory.getLog(this.getClass()).error(
						"Fail to get target object from JointPoint.", e);
				break;
			}
		}

		String className = target.getClass().getSimpleName().toLowerCase();
		String opName = (thisJoinPoint.getSignature().getName()).toLowerCase();
		Log logger = LogFactory.getLog(target.getClass());

		if (exception instanceof MovieFinderException) {
			MovieFinderException movieFinderEx = (MovieFinderException) exception;
			logger.error(movieFinderEx.getMessage(), movieFinderEx);
			throw movieFinderEx;
		}

		try {
			logger.error(messageSource.getMessage("error." + className + "."
					+ opName, new String[] {}, Locale.getDefault()), exception);
		} catch (Exception e) {
			logger.error(messageSource.getMessage("error.common",
					new String[] {}, Locale.getDefault()), exception);
			throw new MovieFinderException(messageSource, "error.common");
		}
		throw new MovieFinderException(messageSource, "error." + className
				+ "." + opName);
	}

	@Around("serviceMethod()")
	public Object aroundExecuteServiceMethod(ProceedingJoinPoint thisJoinPoint)
			throws Throwable {
		Object target = thisJoinPoint.getTarget();
		String className = target.getClass().getSimpleName().toLowerCase();
		String opName = (thisJoinPoint.getSignature().getName()).toLowerCase();

		Log logger = LogFactory.getLog(target.getClass());

		logger.debug("***** Around Advice of ExceptionTransfer [" + className
				+ "." + opName + "()]");

		// before logic
		Object retVal = null;
		try {
			retVal = thisJoinPoint.proceed();
		} catch (Exception e) {
			return Response.serverError().build();
		}
		// after logic
		return retVal;
	}
}
