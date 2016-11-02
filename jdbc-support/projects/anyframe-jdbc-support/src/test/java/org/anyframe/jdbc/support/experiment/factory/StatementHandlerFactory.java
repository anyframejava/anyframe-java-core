package org.anyframe.jdbc.support.experiment.factory;

import java.sql.Statement;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;

public interface StatementHandlerFactory {
	GenericInvocationHandler<Statement> createStatementHandler(Statement underlying, ConnectionInformation connectionInformation);
}
