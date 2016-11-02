package org.anyframe.jdbc.support.experiment.test.injection;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.Statement;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;
import org.anyframe.jdbc.support.experiment.factory.CallableStatementHandlerFactory;
import org.anyframe.jdbc.support.experiment.factory.PreparedStatementHandlerFactory;
import org.anyframe.jdbc.support.experiment.factory.StatementHandlerFactory;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;

public class InjectionPatternStatementsHandlerFactory implements StatementHandlerFactory, PreparedStatementHandlerFactory, CallableStatementHandlerFactory{
	
	private InjectionPatternPostProcessor injectionPatternPostProcessor;
	
	public InjectionPatternStatementsHandlerFactory(
			InjectionPatternPostProcessor injectionPatternPostProcessor) {
		this.injectionPatternPostProcessor = injectionPatternPostProcessor;
	}

	@Override
	public GenericInvocationHandler<Statement> createStatementHandler(
			Statement underlying, ConnectionInformation connectionInformation) {
		return new P6InjectionPatternStatementInvocationHandler(underlying, connectionInformation, injectionPatternPostProcessor);
	}
	
	@Override
	public GenericInvocationHandler<Statement> createPreparedStatementHandler(
			PreparedStatement pstmt, ConnectionInformation conn, String query) {
		return new P6InjectionPatternPreparedStatementInvocationHandler(pstmt, conn, injectionPatternPostProcessor, query);
	}
	
	@Override
	public GenericInvocationHandler<Statement> createCallableStatementHandler(
			CallableStatement statement,
			ConnectionInformation conn, String query) {
		return new P6InjectionPatternCallableStatementInvocationHandler(statement, conn, injectionPatternPostProcessor, query);
	}
	
}
