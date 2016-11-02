package org.anyframe.jdbc.support.experiment.factory;

import java.sql.Connection;

import com.p6spy.engine.proxy.GenericInvocationHandler;

public interface ConnectionHandlerFactory {
	GenericInvocationHandler<Connection> createConnectionHandler(Connection conn);
}
