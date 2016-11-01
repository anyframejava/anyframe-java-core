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

import net.sf.infrared.agent.MonitorConfig;
import net.sf.infrared.agent.MonitorFacade;
import net.sf.infrared.agent.MonitorFactory;
import net.sf.infrared.agent.StatisticsCollector;
import net.sf.infrared.base.model.ExecutionContext;
import net.sf.infrared.base.model.ExecutionTimer;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

/**
 * Abstract aspect class that supports for collecting performance information and
 * sending these information to agent server which is provided by infrared solutions
 * This aspect is to modify Infrared's AbstractAspects for applying Spring AOP
 *
 *@author binil.thomas, prashant.nair
 *@author modified by SoYon Lim
 */

public abstract class AbstractAspect implements MethodInterceptor {

	private MonitorFacade monitorFacade = null;

	/**
	 * Helper method for logging execution information
	 * 
	 * @param ctx
	 * @param sjp
	 * @return Object includes logging execution information
	 * @throws Throwable
	 */
	public Object recordExecution(ExecutionContext ctx, MethodInvocation sjp)
			throws Throwable {
		if (monitorFacade == null)
			return recordExecution(ctx, sjp, MonitorFactory.getFacade());
		else
			return recordExecution(ctx, sjp, monitorFacade);

	}

	/**
	 * Helper method for logging execution information with given monitor facade
	 * 
	 * @param ctx
	 * @param sjp
	 * @param facade
	 * @return Object includes logging execution information
	 * @throws Throwable
	 */
	public Object recordExecution(ExecutionContext ctx, MethodInvocation sjp,
			MonitorFacade facade) throws Throwable {
		ExecutionTimer timer = new ExecutionTimer(ctx);
		StatisticsCollector collector = facade.recordExecutionBegin(timer);
		try {
			return sjp.proceed();
		} finally {
			facade.recordExecutionEnd(timer, collector);
		}
	}

	/**
	 * Check whether current configuration support performance monitoring or not
	 * 
	 * @return monitoring enable or disable
	 */
	public boolean isMonitoringEnabled() {
		MonitorFacade facade = monitorFacade == null ? MonitorFactory
				.getFacade() : monitorFacade;
		return isMonitoringEnabled(facade);
	}

	/**
	 * Check whether current configuration support performance monitoring or not
	 * with given monitor facade
	 * 
	 * @param facade
	 * @return monitoring enable or disable
	 */
	public boolean isMonitoringEnabled(MonitorFacade facade) {
		MonitorConfig cfg = facade.getConfiguration();
		return cfg.isMonitoringEnabled();
	}

	public void setMonitorFacade(MonitorFacade monitorFacade) {
		this.monitorFacade = monitorFacade;
	}

}
