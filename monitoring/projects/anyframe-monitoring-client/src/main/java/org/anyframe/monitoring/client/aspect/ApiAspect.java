/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.monitoring.client.aspect;

import net.sf.infrared.aspects.api.ApiContext;

import org.aopalliance.intercept.MethodInvocation;

/**
 * Aspect class that supports for collecting performance information of Anyframe
 * Java based service or application method calls and sending these information
 * to agent server which is provided by infrared solutions
 * 
 * This aspect is to modify Infrared's ApiAspect for applying Spring AOP
 *
 *@author binil.thomas, prashant.nair
 *@author modified by SoYon Lim
 */
public class ApiAspect extends AbstractAspect {
	private String layerName = null;

	/**
	 * {@inheritDoc}
	 */
	public Object invoke(MethodInvocation sjp) throws Throwable {
		if (!isMonitoringEnabled()) {
			return sjp.proceed();
		}

		final Class<?> classObj = sjp.getMethod().getDeclaringClass();
		final String methodName = sjp.getMethod().getName();
		ApiContext ctx = new ApiContext(classObj.getName(), methodName,
				layerName);
		return recordExecution(ctx, sjp);
	}

	/**
	 * Group name in summarized screens
	 * 
	 * @param layerName
	 */
	public void setLayerName(String layerName) {
		this.layerName = layerName;
	}
}