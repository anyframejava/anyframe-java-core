package org.anyframe.jdbc.support.experiment.factory;

import java.sql.PreparedStatement;
import java.sql.Statement;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.GenericInvocationHandler;

public interface PreparedStatementHandlerFactory {
	GenericInvocationHandler<Statement> createPreparedStatementHandler(PreparedStatement pstmt, ConnectionInformation conn , String query);
}
