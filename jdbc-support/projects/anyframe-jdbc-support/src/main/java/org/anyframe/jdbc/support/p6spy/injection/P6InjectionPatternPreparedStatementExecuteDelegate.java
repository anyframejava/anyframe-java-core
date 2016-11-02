package org.anyframe.jdbc.support.p6spy.injection;

import java.lang.reflect.Method;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.PreparedStatementInformation;

public class P6InjectionPatternPreparedStatementExecuteDelegate extends P6InjectionPatternStatementExecuteDelegate {

	public P6InjectionPatternPreparedStatementExecuteDelegate(PreparedStatementInformation preparedStatementInformation,
			InjectionPatternPostProcessor injectionPatternPostProcessor) {
		super(preparedStatementInformation, injectionPatternPostProcessor);
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {

		if (null != args && args.length != 0) {
			// For methods for Statement interface
			String query = (String) args[0];
			InjectionPatternPostProcessor injectionPatternPostProcessor = getInjectionPatternPostProcessor();

			injectionPatternPostProcessor.warningPattern(query);
			query = injectionPatternPostProcessor.replacePattern(query);

			args[0] = query;

			super.invoke(proxy, underlying, method, args);
		}

		return method.invoke(underlying, args);
	}
}
