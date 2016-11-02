package org.anyframe.jdbc.support.p6spy.injection;

import java.lang.reflect.Method;
import java.sql.PreparedStatement;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.Delegate;
import com.p6spy.engine.proxy.ProxyFactory;

/**
 * Proxy class of PrepareStatement
 * 
 * @author SDS
 *
 */
public class P6InjectionPatternConnectionPrepareStatementDelegate implements Delegate {

	private final ConnectionInformation connectionInformation;
	private final InjectionPatternPostProcessor injectionPatternPostProcessor;

	public P6InjectionPatternConnectionPrepareStatementDelegate(ConnectionInformation connectionInformation,
			InjectionPatternPostProcessor injectionPatternPostProcessor) {
		this.connectionInformation = connectionInformation;
		this.injectionPatternPostProcessor = injectionPatternPostProcessor;
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
		
		String query = (String) args[0];

		injectionPatternPostProcessor.warningPattern(query);
		query = injectionPatternPostProcessor.replacePattern(query);
		
		// target PreparedStatement는 원본 Query를 가지고 있도록 args[0]에 query를 assign하지 않음
		PreparedStatement preparedStatement = (PreparedStatement) method.invoke(underlying, args);

		P6InjectionPatternPreparedStatementInvocationHandler invocationHandler = new P6InjectionPatternPreparedStatementInvocationHandler(
				preparedStatement, connectionInformation, injectionPatternPostProcessor, query);
		return ProxyFactory.createProxy(preparedStatement, invocationHandler);
	}

}
