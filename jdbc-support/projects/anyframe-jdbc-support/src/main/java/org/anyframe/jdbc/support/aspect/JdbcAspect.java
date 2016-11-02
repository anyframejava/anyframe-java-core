/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.jdbc.support.aspect;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;

import com.p6spy.engine.spy.P6Factory;

/**
 * It is a Aspect class for JDBC Connection Wrapping. Using P6Spy
 * 
 * @author Changje Kim
 * @author Byunghun Woo
 * 
 */
public class JdbcAspect implements MethodInterceptor, InitializingBean {

	private List<P6Factory> factories;

	// private InjectionPatternPostProcessor injectionPatternPostProcessor;
	//
	// private CompleteQueryPostProcessor completeQueryPostProcessor;

	private static Logger log = LoggerFactory.getLogger(JdbcAspect.class);

	/**
	 * Decorate the connection
	 */
	public Object invoke(MethodInvocation jp) throws Throwable {
		Object rtObject = jp.proceed();
		if (rtObject == null || !(rtObject instanceof Connection)) {
			return rtObject;
		}
		Connection con = (Connection) rtObject;

		// TODO check already proxy
		// if (!(con instanceof P6ILConnection)) {
		try {
			for (P6Factory factory : factories) {
				con = factory.getConnection(con);
			}
		} catch (SQLException sqlex) {
			log.error("Failed to wrap Connection with the P6 connection", sqlex);
		}
		// }
		return con;
	}

	/**
	 * Using P6ILFactory
	 */
	public void afterPropertiesSet() {
		if (this.factories == null) {
			// init with defaults
			// this.factory = new P6ILFactory(injectionPatternPostProcessor, completeQueryPostProcessor);
		}
	}

	public void setFactories(List<P6Factory> factories) {
		this.factories = factories;
	}

	public void setFactory(P6Factory factory) {
		this.factories = new ArrayList<P6Factory>();
		this.factories.add(factory);
	}

	// public InjectionPatternPostProcessor getInjectionPatternPostProcessor() {
	// return injectionPatternPostProcessor;
	// }
	//
	// /**
	// * set InjectionPatternPostProcessor
	// *
	// * @param injectionPatternPostProcessor
	// */
	// public void setInjectionPatternPostProcessor(InjectionPatternPostProcessor injectionPatternPostProcessor) {
	// this.injectionPatternPostProcessor = injectionPatternPostProcessor;
	// }
	//
	// public CompleteQueryPostProcessor getCompleteQueryPostProcessor() {
	// return completeQueryPostProcessor;
	// }
	//
	// /**
	// * set CompleteQueryPostProcessor
	// *
	// * @param completeQueryPostProcessor
	// */
	// public void setCompleteQueryPostProcessor(CompleteQueryPostProcessor completeQueryPostProcessor) {
	// this.completeQueryPostProcessor = completeQueryPostProcessor;
	// }

}
