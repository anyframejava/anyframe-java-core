/*
 * #%L
 * P6Spy
 * %%
 * Copyright (C) 2013 P6Spy
 * %%
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
 * #L%
 */
package org.anyframe.jdbc.support.p6spy.logging;

import java.sql.Connection;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;
import com.p6spy.engine.proxy.MethodNameMatcher;

/**
 * Invocation handler for {@link java.sql.Connection}
 */
public class P6CompleteQueryConnectionInvocationHandler extends GenericInvocationHandler<Connection> {

	public P6CompleteQueryConnectionInvocationHandler(Connection underlying, CompleteQueryPostProcessor completeQueryPostProcessor) {
		super(underlying);
		ConnectionInformation connectionInformation = new ConnectionInformation();

		P6CompleteQueryConnectionPrepareStatementDelegate prepareStatementDelegate = new P6CompleteQueryConnectionPrepareStatementDelegate(
				connectionInformation, completeQueryPostProcessor);
		P6CompleteQueryConnectionCreateStatementDelegate createStatementDelegate = new P6CompleteQueryConnectionCreateStatementDelegate(
				connectionInformation, completeQueryPostProcessor);
		P6CompleteQueryConnectionPrepareCallDelegate prepareCallDelegate = new P6CompleteQueryConnectionPrepareCallDelegate(connectionInformation,
				completeQueryPostProcessor);

		// add delegates to return proxies for other methods
		addDelegate(new MethodNameMatcher("prepareStatement"), prepareStatementDelegate);
		addDelegate(new MethodNameMatcher("createStatement"), createStatementDelegate);
		addDelegate(new MethodNameMatcher("prepareCall"), prepareCallDelegate);

		// TODO add proxy for getDatabaseMetaData - but not used for logging module?

	}

}
