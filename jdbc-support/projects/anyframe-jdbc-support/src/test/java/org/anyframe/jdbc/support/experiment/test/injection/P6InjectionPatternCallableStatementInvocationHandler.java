package org.anyframe.jdbc.support.experiment.test.injection;

import java.sql.CallableStatement;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;

public class P6InjectionPatternCallableStatementInvocationHandler extends P6InjectionPatternPreparedStatementInvocationHandler{

	public P6InjectionPatternCallableStatementInvocationHandler(CallableStatement underlying, ConnectionInformation connectionInformation,
			InjectionPatternPostProcessor injectionPatternPostProcessor, String query) {
		super(underlying, connectionInformation, injectionPatternPostProcessor, query);
	}
}