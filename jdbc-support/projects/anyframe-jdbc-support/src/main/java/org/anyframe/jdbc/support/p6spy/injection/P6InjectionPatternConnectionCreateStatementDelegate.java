package org.anyframe.jdbc.support.p6spy.injection;

import java.lang.reflect.Method;
import java.sql.Statement;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.Delegate;
import com.p6spy.engine.proxy.ProxyFactory;

/**
 * 
 * @author SDS
 */
public class P6InjectionPatternConnectionCreateStatementDelegate implements Delegate {

	private final ConnectionInformation connectionInformation;
	private final InjectionPatternPostProcessor injectionPatternPostProcessor;

	public P6InjectionPatternConnectionCreateStatementDelegate(ConnectionInformation connectionInformation,
			InjectionPatternPostProcessor injectionPatternPostProcessor) {
		this.connectionInformation = connectionInformation;
		this.injectionPatternPostProcessor = injectionPatternPostProcessor;
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
		Statement statement = (Statement) method.invoke(underlying, args);
		P6InjectionPatternStatementInvocationHandler invocationHandler = new P6InjectionPatternStatementInvocationHandler(statement,
				connectionInformation, injectionPatternPostProcessor);
		return ProxyFactory.createProxy(statement, invocationHandler);
	}

	public ConnectionInformation getConnectionInformation() {
		return connectionInformation;
	}

	public InjectionPatternPostProcessor getInjectionPatternPostProcessor() {
		return injectionPatternPostProcessor;
	}

}
