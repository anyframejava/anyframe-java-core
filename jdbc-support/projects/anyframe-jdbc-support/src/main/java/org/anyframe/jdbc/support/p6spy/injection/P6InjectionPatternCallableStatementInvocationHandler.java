package org.anyframe.jdbc.support.p6spy.injection;

import java.sql.CallableStatement;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.CallableStatementInformation;
import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;
import com.p6spy.engine.proxy.MethodNameMatcher;

public class P6InjectionPatternCallableStatementInvocationHandler extends GenericInvocationHandler<CallableStatement> {

	public P6InjectionPatternCallableStatementInvocationHandler(CallableStatement underlying, ConnectionInformation connectionInformation,
			InjectionPatternPostProcessor injectionPatternPostProcessor, String query) {
		super(underlying);

		CallableStatementInformation callableStatementInformation = new CallableStatementInformation(connectionInformation);
		callableStatementInformation.setStatementQuery(query);

		P6InjectionPatternPreparedStatementExecuteDelegate executeDelegate = new P6InjectionPatternPreparedStatementExecuteDelegate(
				callableStatementInformation, injectionPatternPostProcessor);

		// addDelegate(new MethodNameMatcher("executeBatch"), executeDelegate); // addBatch 때 로깅할건데 executeBatch에서 또 로깅할 필요가 있나?
		addDelegate(new MethodNameMatcher("addBatch"), executeDelegate);
		addDelegate(new MethodNameMatcher("execute"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeQuery"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeUpdate"), executeDelegate);

	}

}
