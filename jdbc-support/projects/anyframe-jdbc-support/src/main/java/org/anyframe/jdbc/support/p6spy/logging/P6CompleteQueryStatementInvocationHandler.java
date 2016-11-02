package org.anyframe.jdbc.support.p6spy.logging;

import java.sql.Statement;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.common.StatementInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;
import com.p6spy.engine.proxy.MethodNameMatcher;

public class P6CompleteQueryStatementInvocationHandler extends GenericInvocationHandler<Statement> {

	public P6CompleteQueryStatementInvocationHandler(Statement underlying, final ConnectionInformation connectionInformation,
			CompleteQueryPostProcessor completeQueryPostProcessor) {
		
		super(underlying);
		
		StatementInformation statementInformation = new StatementInformation(connectionInformation);

		P6CompleteQueryStatementExecuteDelegate executeDelegate = new P6CompleteQueryStatementExecuteDelegate(statementInformation,
				completeQueryPostProcessor);
		P6CompleteQueryStatementExecuteBatchDelegate executeBatchDelegate = new P6CompleteQueryStatementExecuteBatchDelegate(statementInformation,
				completeQueryPostProcessor);

		addDelegate(new MethodNameMatcher("executeBatch"), executeBatchDelegate);
		addDelegate(new MethodNameMatcher("addBatch"), executeDelegate);
		addDelegate(new MethodNameMatcher("execute"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeQuery"), executeDelegate);
		addDelegate(new MethodNameMatcher("executeUpdate"), executeDelegate);
	}

}
