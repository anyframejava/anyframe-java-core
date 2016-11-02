package org.anyframe.jdbc.support.p6spy.injection;

import java.lang.reflect.Method;
import java.sql.CallableStatement;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.Delegate;
import com.p6spy.engine.proxy.ProxyFactory;

public class P6InjectionPatternConnectionPrepareCallDelegate implements Delegate {

	private ConnectionInformation connectionInformation;
	private InjectionPatternPostProcessor injectionPatternPostProcessor;

	public P6InjectionPatternConnectionPrepareCallDelegate(ConnectionInformation connectionInformation,
			InjectionPatternPostProcessor injectionPatternPostProcessor) {
		this.connectionInformation = connectionInformation;
		this.injectionPatternPostProcessor = injectionPatternPostProcessor;
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
		CallableStatement statement = (CallableStatement) method.invoke(underlying, args);

		String query = (String) args[0];

		P6InjectionPatternCallableStatementInvocationHandler invocationHandler = new P6InjectionPatternCallableStatementInvocationHandler(statement,
				connectionInformation, injectionPatternPostProcessor, query);

		return ProxyFactory.createProxy(statement, invocationHandler);
	}

}
