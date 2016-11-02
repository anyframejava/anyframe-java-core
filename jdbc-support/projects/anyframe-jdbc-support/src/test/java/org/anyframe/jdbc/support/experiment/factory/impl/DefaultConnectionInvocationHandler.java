package org.anyframe.jdbc.support.experiment.factory.impl;

import java.lang.reflect.Method;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;

import org.anyframe.jdbc.support.experiment.factory.CallableStatementHandlerFactory;
import org.anyframe.jdbc.support.experiment.factory.PreparedStatementHandlerFactory;
import org.anyframe.jdbc.support.experiment.factory.StatementHandlerFactory;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.Delegate;
import com.p6spy.engine.proxy.GenericInvocationHandler;
import com.p6spy.engine.proxy.MethodNameMatcher;
import com.p6spy.engine.proxy.ProxyFactory;

public class DefaultConnectionInvocationHandler extends GenericInvocationHandler<Connection> {
	
	public DefaultConnectionInvocationHandler(final Connection underlying, final StatementHandlerFactory statementHandlerFactory, final PreparedStatementHandlerFactory pstmtHanlderFactory, final CallableStatementHandlerFactory callablestatementHandlerFactory) {
		super(underlying);
		
		final ConnectionInformation connectionInformation = new ConnectionInformation();
		
		addDelegate(new MethodNameMatcher("createStatement"), new Delegate() {
			@Override
			public Object invoke(Object proxy, Object underlying, Method method,
					Object[] args) throws Throwable {
				Statement statement = (Statement) method.invoke(underlying, args);
				return ProxyFactory.createProxy(statement, statementHandlerFactory.createStatementHandler(statement, connectionInformation));
			}
		});
		
		// add delegates to return proxies for other methods
		addDelegate(new MethodNameMatcher("prepareStatement"), new Delegate() {
			@Override
			public Object invoke(Object proxy, Object underlying, Method method,
					Object[] args) throws Throwable {
				// TODO FIXME prepareStatment(String) 인 경우 method.invoke에 전달될 파라미터에 대한 처리를 할수 없음
				
				PreparedStatement preparedStatement = (PreparedStatement) method.invoke(underlying, args);
				String query = (String) args[0];
				return ProxyFactory.createProxy(preparedStatement, pstmtHanlderFactory.createPreparedStatementHandler(preparedStatement, connectionInformation,  query));
			}
		});
		
		addDelegate(new MethodNameMatcher("prepareCall"), new Delegate() {
			@Override
			public Object invoke(Object proxy, Object underlying, Method method,
					Object[] args) throws Throwable {
				// TODO FIXME prepareCall(String) 인 경우 method.invoke에 전달될 파라미터에 대한 처리를 할수 없음
				
				CallableStatement statement = (CallableStatement) method.invoke(underlying, args);
				String query = (String) args[0];
				return ProxyFactory.createProxy(statement, callablestatementHandlerFactory.createCallableStatementHandler(statement, connectionInformation, query));
			}
		});
		
		addExtraDelegate(connectionInformation);
	}
	
	protected void addExtraDelegate(ConnectionInformation connectionInformation){
		// do nothing
		
	}
	
}
