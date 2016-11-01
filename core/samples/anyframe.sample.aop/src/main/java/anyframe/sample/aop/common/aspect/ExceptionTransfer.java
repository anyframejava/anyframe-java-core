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

import java.util.Locale;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.aop.framework.Advised;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import anyframe.common.exception.BaseException;
import anyframe.sample.aop.common.SalesException;

@Aspect
@Service
public class ExceptionTransfer {

	@Resource
	private MessageSource messageSource;
	
	@Pointcut("execution(* *..GenericService+.*(..))")
	public void serviceMethod(){}
	
	@AfterThrowing(pointcut = "serviceMethod()", throwing = "exception")
	public void transfer(JoinPoint thisJoinPoint, Exception exception)
			throws SalesException {
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

		if (exception instanceof SalesException) {
			SalesException empEx = (SalesException) exception;
			logger.error(empEx.getMessage(), empEx);
			throw empEx;
		}
		
		if (exception instanceof BaseException) {
			BaseException baseEx = (BaseException) exception;
			logger.error(baseEx.getMessage(), baseEx);
			throw new SalesException(messageSource, "error." + className + "."
					+ opName, new String[] {}, exception);
		}		

		logger.error(messageSource.getMessage("error." + className + "."
				+ opName, new String[] {}, "no messages", Locale.getDefault()),
				exception);

		throw new SalesException(messageSource, "error." + className + "."
				+ opName, new String[] {}, exception);
	}
}
