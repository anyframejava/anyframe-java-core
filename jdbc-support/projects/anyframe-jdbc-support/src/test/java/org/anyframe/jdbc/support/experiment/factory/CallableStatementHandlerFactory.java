package org.anyframe.jdbc.support.experiment.factory;


import java.sql.CallableStatement;
import java.sql.Statement;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;

public interface CallableStatementHandlerFactory {
	GenericInvocationHandler<Statement> createCallableStatementHandler(CallableStatement statement, ConnectionInformation connectionInformation, String query);
}
