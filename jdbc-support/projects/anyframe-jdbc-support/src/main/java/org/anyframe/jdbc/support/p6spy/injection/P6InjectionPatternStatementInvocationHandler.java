package org.anyframe.jdbc.support.p6spy.injection;

import java.sql.Statement;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.common.StatementInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;
import com.p6spy.engine.proxy.MethodNameMatcher;

public class P6InjectionPatternStatementInvocationHandler extends GenericInvocationHandler<Statement> {

	public P6InjectionPatternStatementInvocationHandler(Statement underlying, ConnectionInformation connectionInformation,
			InjectionPatternPostProcessor injectionPatternPostProcessor) {

		super(underlying);

		StatementInformation statementInformation = new StatementInformation(connectionInformation);

		P6InjectionPatternStatementExecuteDelegate executeDelegate = new P6InjectionPatternStatementExecuteDelegate(statementInformation,
				injectionPatternPostProcessor);
		P6InjectionPatternStatementExecuteBatchDelegate executeBatchDelegate = new P6InjectionPatternStatementExecuteBatchDelegate(
				statementInformation, injectionPatternPostProcessor);

		addDelegate(new MethodNameMatcher("executeBatch"), executeBatchDelegate);
		addDelegate(new MethodNameMatcher("addBatch"), executeDelegate);
		addDelegate(new MethodNameMatcher("execute"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeQuery"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeUpdate"), executeDelegate);
	}

}
