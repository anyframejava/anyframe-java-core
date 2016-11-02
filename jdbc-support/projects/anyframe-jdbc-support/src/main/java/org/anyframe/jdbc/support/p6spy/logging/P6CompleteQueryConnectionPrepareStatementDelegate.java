package org.anyframe.jdbc.support.p6spy.logging;

import java.lang.reflect.Method;
import java.sql.PreparedStatement;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.Delegate;
import com.p6spy.engine.proxy.ProxyFactory;

public class P6CompleteQueryConnectionPrepareStatementDelegate implements Delegate {

	private final ConnectionInformation connectionInformation;
	private final CompleteQueryPostProcessor completeQueryPostProcessor;

	public P6CompleteQueryConnectionPrepareStatementDelegate(final ConnectionInformation connectionInformation,
			CompleteQueryPostProcessor completeQueryPostProcessor) {
		this.connectionInformation = connectionInformation;
		this.completeQueryPostProcessor = completeQueryPostProcessor;
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
		PreparedStatement preparedStatement = (PreparedStatement) method.invoke(underlying, args);
		String query = (String) args[0];
		P6CompleteQueryPreparedStatementInvocationHandler invocationHandler = new P6CompleteQueryPreparedStatementInvocationHandler(
				preparedStatement, connectionInformation, completeQueryPostProcessor, query);
		return ProxyFactory.createProxy(preparedStatement, invocationHandler);
	}

}
