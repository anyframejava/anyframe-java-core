package org.anyframe.jdbc.support.experiment.test.injection;
import java.lang.reflect.Method;
import java.sql.PreparedStatement;
import java.util.Arrays;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;
import org.anyframe.jdbc.support.p6spy.injection.P6InjectionPatternStatementExecuteDelegate;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.common.PreparedStatementInformation;
import com.p6spy.engine.proxy.MethodNameAndParameterMatcher;

public class P6InjectionPatternPreparedStatementInvocationHandler extends P6InjectionPatternStatementInvocationHandler{

	public P6InjectionPatternPreparedStatementInvocationHandler(PreparedStatement underlying, ConnectionInformation connectionInformation,
			InjectionPatternPostProcessor injectionPatternPostProcessor, String query) {

		super(underlying, connectionInformation, injectionPatternPostProcessor);

		PreparedStatementInformation preparedStatementInformation = new PreparedStatementInformation(connectionInformation);
		preparedStatementInformation.setStatementQuery(query);

		P6InjectionPatternPreparedStatementExecuteDelegate executeDelegate = new P6InjectionPatternPreparedStatementExecuteDelegate(
				preparedStatementInformation, injectionPatternPostProcessor);

		// addDelegate(new MethodNameMatcher("executeBatch"), executeDelegate); // addBatch 때 로깅할건데 executeBatch에서 또 로깅할 필요가 있나?
		addDelegate(new MethodNameAndParameterMatcher("addBatch"), executeDelegate);
		addDelegate(new MethodNameAndParameterMatcher("execute"), executeDelegate);
		addDelegate(new MethodNameAndParameterMatcher("executeQuery"), executeDelegate);
		addDelegate(new MethodNameAndParameterMatcher("executeUpdate"), executeDelegate);
	}
	
	class P6InjectionPatternPreparedStatementExecuteDelegate extends P6InjectionPatternStatementExecuteDelegate {

		public P6InjectionPatternPreparedStatementExecuteDelegate(PreparedStatementInformation preparedStatementInformation,
				InjectionPatternPostProcessor injectionPatternPostProcessor) {
			super(preparedStatementInformation, injectionPatternPostProcessor);
		}

		@Override
		public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
			
			System.out.println(this.getClass().getSimpleName() + ", " + method.getName()+ ": "+ Arrays.toString(args));

//			if (null != args && args.length != 0) {
//				// For methods for Statement interface
//				String query = (String) args[0];
//				InjectionPatternPostProcessor injectionPatternPostProcessor = getInjectionPatternPostProcessor();
//
//				injectionPatternPostProcessor.warningPattern(query);
//				query = injectionPatternPostProcessor.replacePattern(query);
//
//				args[0] = query;
//
//				super.invoke(proxy, underlying, method, args);
//			}

			return method.invoke(underlying, args);
		}
	}
	
}
