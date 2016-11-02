package org.anyframe.jdbc.support.p6spy.injection;

import java.sql.PreparedStatement;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.common.PreparedStatementInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;
import com.p6spy.engine.proxy.MethodNameMatcher;

public class P6InjectionPatternPreparedStatementInvocationHandler extends GenericInvocationHandler<PreparedStatement> {

	public P6InjectionPatternPreparedStatementInvocationHandler(PreparedStatement underlying, ConnectionInformation connectionInformation,
			InjectionPatternPostProcessor injectionPatternPostProcessor, String query) {

		super(underlying);

		PreparedStatementInformation preparedStatementInformation = new PreparedStatementInformation(connectionInformation);
		preparedStatementInformation.setStatementQuery(query);

		P6InjectionPatternPreparedStatementExecuteDelegate executeDelegate = new P6InjectionPatternPreparedStatementExecuteDelegate(
				preparedStatementInformation, injectionPatternPostProcessor);

		// addDelegate(new MethodNameMatcher("executeBatch"), executeDelegate); // addBatch 때 로깅할건데 executeBatch에서 또 로깅할 필요가 있나?
		addDelegate(new MethodNameMatcher("addBatch"), executeDelegate);
		addDelegate(new MethodNameMatcher("execute"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeQuery"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeUpdate"), executeDelegate);
	}

}
