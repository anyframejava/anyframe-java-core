package org.anyframe.jdbc.support.p6spy.injection;

import java.sql.Connection;
import java.sql.SQLException;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.proxy.ProxyFactory;
import com.p6spy.engine.spy.P6Factory;
import com.p6spy.engine.spy.P6LoadableOptions;
import com.p6spy.engine.spy.option.P6OptionsRepository;

/**
 * P6Spy Connection Factory Extension for jdbc support InjectionPattern
 * 
 * @author SDS
 * 
 */
public class P6InjectionPatternFactory implements P6Factory {

	private final InjectionPatternPostProcessor injectionPatternPostProcessor;

	public P6InjectionPatternFactory(InjectionPatternPostProcessor injectionPatternPostProcessor) {
		this.injectionPatternPostProcessor = injectionPatternPostProcessor;
	}

	@Override
	public Connection getConnection(Connection conn) throws SQLException {
		P6InjectionPatternConnectionInvocationHandler invocationHandler = new P6InjectionPatternConnectionInvocationHandler(conn,
				injectionPatternPostProcessor);
		return ProxyFactory.createProxy(conn, invocationHandler);
	}

	@Override
	public P6LoadableOptions getOptions(P6OptionsRepository optionsRepository) {
		// DataSource를 P6Spy로 Wrapping해서 사용할 때 필요한 메소드
		throw new UnsupportedOperationException();
	}
}
