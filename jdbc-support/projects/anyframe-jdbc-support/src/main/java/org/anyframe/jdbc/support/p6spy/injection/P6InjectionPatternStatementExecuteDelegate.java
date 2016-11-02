package org.anyframe.jdbc.support.p6spy.injection;

import java.lang.reflect.Method;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.StatementInformation;
import com.p6spy.engine.proxy.Delegate;

public class P6InjectionPatternStatementExecuteDelegate implements Delegate {

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

		this.statementInformation.setStatementQuery(query);
		injectionPatternPostProcessor.warningPattern(query);
		query = injectionPatternPostProcessor.replacePattern(query);

		args[0] = query;

		return method.invoke(underlying, args);
	}

	public InjectionPatternPostProcessor getInjectionPatternPostProcessor() {
		return this.injectionPatternPostProcessor;
	}

	public StatementInformation getStatementInformation() {
		return this.statementInformation;
	}
}
