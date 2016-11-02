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

import java.sql.Connection;
import java.sql.SQLException;

import net.sf.infrared.aspects.jdbc.p6spy.InfraREDP6Connection;
import net.sf.infrared.aspects.jdbc.p6spy.InfraREDP6Factory;

import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Aspect class that supports for collecting performance information of Anyframe
 * Java based service or application's JDBC related jobs and sending these
 * information to agent server which is provided by infrared solutions
 * 
 * This aspect is modified from Infrared's JdbcAspect for applying Spring AOP
 *
 *@author binil.thomas, prashant.nair
 *@author modified by SoYon Lim
  */
public class JdbcAspect extends AbstractAspect {
	public static final String MONITORING_LOGGER = "anyframe.monitoring";
	
	private static Logger log = LoggerFactory.getLogger(MONITORING_LOGGER);
	private InfraREDP6Factory factory = new InfraREDP6Factory();

	/**
	 * {@inheritDoc}
	 */
	public Object invoke(MethodInvocation jp) throws Throwable {
		Object rtObject = jp.proceed();
		if (rtObject == null || !(rtObject instanceof Connection)) {
			return rtObject;
		}
		Connection con = (Connection) rtObject;
		if (!(con instanceof InfraREDP6Connection)) {
			try {
				con = factory.getConnection(con);
				if (log.isDebugEnabled()) {
					log
							.debug("Wrapped Connection with the Infrared P6 connection "
									+ con);
				}
			} catch (SQLException sqlex) {
				log
						.error(
								"Failed to wrap Connection with the Infrared P6 connection",
								sqlex);
			}
		}
		return con;
	}

}
