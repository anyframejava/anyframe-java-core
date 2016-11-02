package org.anyframe.jdbc.support.experiment.test.injection;
import java.lang.reflect.Method;
import java.sql.Statement;
import java.util.Arrays;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.common.StatementInformation;
import com.p6spy.engine.proxy.Delegate;
import com.p6spy.engine.proxy.GenericInvocationHandler;
import com.p6spy.engine.proxy.MethodNameAndParameterLikeMatcher;
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
		
		addDelegate(new MethodNameAndParameterLikeMatcher("executeBatch"), executeBatchDelegate);
		addDelegate(new MethodNameMatcher("addBatch"), executeDelegate);
		addDelegate(new MethodNameAndParameterLikeMatcher("execute", String.class), executeDelegate);
		addDelegate(new MethodNameAndParameterLikeMatcher("executeQuery", String.class), executeDelegate);
		addDelegate(new MethodNameAndParameterLikeMatcher("executeUpdate", String.class), executeDelegate);
		
	}
	
	private static class P6InjectionPatternStatementExecuteDelegate implements Delegate {

		private final StatementInformation statementInformation;
		private final InjectionPatternPostProcessor injectionPatternPostProcessor;

		public P6InjectionPatternStatementExecuteDelegate(StatementInformation statementInformation,
				InjectionPatternPostProcessor injectionPatternPostProcessor) {
			this.statementInformation = statementInformation;
			this.injectionPatternPostProcessor = injectionPatternPostProcessor;
		}

		@Override
		public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
			
			String query = (String) args[0];
			System.out.println(this.getClass().getSimpleName() + ", " + method.getName()+ ": "+ Arrays.toString(args));
			
			this.statementInformation.setStatementQuery(query);
			injectionPatternPostProcessor.warningPattern(query);
			query = injectionPatternPostProcessor.replacePattern(query);
			args[0] = query;
			return method.invoke(underlying, args);
		}
	}
	
	private static class P6InjectionPatternStatementExecuteBatchDelegate implements Delegate {

		private StatementInformation statementInformation;
		private InjectionPatternPostProcessor injectionPatternPostProcessor;

		public P6InjectionPatternStatementExecuteBatchDelegate(StatementInformation statementInformation,
				InjectionPatternPostProcessor injectionPatternPostProcessor) {
			this.statementInformation = statementInformation;
			this.injectionPatternPostProcessor = injectionPatternPostProcessor;
		}

		@Override
		public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
			injectionPatternPostProcessor.warningPattern(statementInformation.getStatementQuery());
			System.out.println(this.getClass().getSimpleName() + ", " + method.getName()+ ": "+ Arrays.toString(args));
			// String replacePattern = injectionPatternPostProcessor.replacePattern(statementInformation.getStatementQuery());
			// addBatch() 호출 시, replace 처리를 다 할텐데...여기서 다시할 이유가...
			
			return method.invoke(underlying, args);
		}
	}

}