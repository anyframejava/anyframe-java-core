package org.anyframe.jdbc.support.p6spy.logging;

import java.sql.PreparedStatement;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.common.PreparedStatementInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;
import com.p6spy.engine.proxy.MethodNameAndParameterLikeMatcher;
import com.p6spy.engine.proxy.MethodNameMatcher;

public class P6CompleteQueryPreparedStatementInvocationHandler extends GenericInvocationHandler<PreparedStatement> {

	public P6CompleteQueryPreparedStatementInvocationHandler(PreparedStatement underlying, ConnectionInformation connectionInformation,
			CompleteQueryPostProcessor completeQueryPostProcessor, String query) {
		super(underlying);

		PreparedStatementInformation preparedStatementInformation = new PreparedStatementInformation(connectionInformation);
		preparedStatementInformation.setStatementQuery(query);

		P6CompleteQueryPreparedStatementExecuteDelegate executeDelegate = new P6CompleteQueryPreparedStatementExecuteDelegate(
				preparedStatementInformation, completeQueryPostProcessor);
		P6CompleteQueryPreparedStatementSetParameterValueDelegate setParameterValueDelegate = new P6CompleteQueryPreparedStatementSetParameterValueDelegate(
				preparedStatementInformation);

		// addDelegate(new MethodNameMatcher("executeBatch"), executeDelegate); // addBatch 때 로깅할건데 executeBatch에서 또 로깅할 필요가 있나?
		addDelegate(new MethodNameMatcher("addBatch"), executeDelegate);
		addDelegate(new MethodNameMatcher("execute"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeQuery"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeUpdate"), executeDelegate);
		addDelegate(new MethodNameAndParameterLikeMatcher("set*", int.class), setParameterValueDelegate);
	}

}
