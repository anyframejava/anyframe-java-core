package org.anyframe.jdbc.support.p6spy.logging;

import java.lang.reflect.Method;
import java.sql.CallableStatement;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.Delegate;
import com.p6spy.engine.proxy.ProxyFactory;

public class P6CompleteQueryConnectionPrepareCallDelegate implements Delegate {

	private ConnectionInformation connectionInformation;
	private CompleteQueryPostProcessor completeQueryPostProcessor;

	public P6CompleteQueryConnectionPrepareCallDelegate(ConnectionInformation connectionInformation,
			CompleteQueryPostProcessor completeQueryPostProcessor) {
		this.connectionInformation = connectionInformation;
		this.completeQueryPostProcessor = completeQueryPostProcessor;
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
		CallableStatement statement = (CallableStatement) method.invoke(underlying, args);

		String query = (String) args[0];

		P6CompleteQueryCallableStatementInvocationHandler invocationHandler = new P6CompleteQueryCallableStatementInvocationHandler(statement,
				connectionInformation, completeQueryPostProcessor, query);

		return ProxyFactory.createProxy(statement, invocationHandler);
	}

}
