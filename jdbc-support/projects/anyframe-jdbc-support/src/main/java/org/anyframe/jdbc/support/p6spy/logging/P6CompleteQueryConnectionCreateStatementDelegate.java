package org.anyframe.jdbc.support.p6spy.logging;

import java.lang.reflect.Method;
import java.sql.Statement;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.Delegate;
import com.p6spy.engine.proxy.ProxyFactory;

public class P6CompleteQueryConnectionCreateStatementDelegate implements Delegate {

	private final ConnectionInformation connectionInformation;
	private final CompleteQueryPostProcessor completeQueryPostProcessor;

	public P6CompleteQueryConnectionCreateStatementDelegate(final ConnectionInformation connectionInformation,
			CompleteQueryPostProcessor completeQueryPostProcessor) {
		this.connectionInformation = connectionInformation;
		this.completeQueryPostProcessor = completeQueryPostProcessor;
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
		Statement statement = (Statement) method.invoke(underlying, args);
		P6CompleteQueryStatementInvocationHandler invocationHandler = new P6CompleteQueryStatementInvocationHandler(statement, connectionInformation,
				completeQueryPostProcessor);
		return ProxyFactory.createProxy(statement, invocationHandler);
	}

}
