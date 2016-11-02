package org.anyframe.jdbc.support.p6spy.logging;

import java.sql.CallableStatement;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;

import com.p6spy.engine.common.CallableStatementInformation;
import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;
import com.p6spy.engine.proxy.MethodNameAndParameterLikeMatcher;

public class P6CompleteQueryCallableStatementInvocationHandler extends GenericInvocationHandler<CallableStatement> {

	public P6CompleteQueryCallableStatementInvocationHandler(CallableStatement underlying, ConnectionInformation connectionInformation,
			CompleteQueryPostProcessor completeQueryPostProcessor, String query) {
		super(underlying);

		CallableStatementInformation callableStatementInformation = new CallableStatementInformation(connectionInformation);
		callableStatementInformation.setStatementQuery(query);

		P6CompleteQueryCallableStatementSetParameterValueDelegate setParameterValueDelegate = new P6CompleteQueryCallableStatementSetParameterValueDelegate(
				callableStatementInformation);

		addDelegate(new MethodNameAndParameterLikeMatcher("set*", String.class), setParameterValueDelegate);
	}

}
