package org.anyframe.jdbc.support.experiment.factory.impl;

import java.sql.Connection;

import org.anyframe.jdbc.support.experiment.factory.CallableStatementHandlerFactory;
import org.anyframe.jdbc.support.experiment.factory.ConnectionHandlerFactory;
import org.anyframe.jdbc.support.experiment.factory.PreparedStatementHandlerFactory;
import org.anyframe.jdbc.support.experiment.factory.StatementHandlerFactory;

import com.p6spy.engine.proxy.GenericInvocationHandler;

public class DefaultConnectionHandlerFactory implements ConnectionHandlerFactory{

	private StatementHandlerFactory statementHandlerFactory;

	private PreparedStatementHandlerFactory pstmtHanlderFactory;

	private CallableStatementHandlerFactory callablestatementHandlerFactory;

	public DefaultConnectionHandlerFactory(
			StatementHandlerFactory statementHandlerFactory,
			PreparedStatementHandlerFactory pstmtHanlderFactory,
			CallableStatementHandlerFactory callablestatementHandlerFactory) {
		this.statementHandlerFactory = statementHandlerFactory;
		this.pstmtHanlderFactory = pstmtHanlderFactory;
		this.callablestatementHandlerFactory = callablestatementHandlerFactory;
	}

	@Override
	public GenericInvocationHandler<Connection> createConnectionHandler(Connection conn) {
		return new DefaultConnectionInvocationHandler(conn, statementHandlerFactory, pstmtHanlderFactory, callablestatementHandlerFactory );
	}

}