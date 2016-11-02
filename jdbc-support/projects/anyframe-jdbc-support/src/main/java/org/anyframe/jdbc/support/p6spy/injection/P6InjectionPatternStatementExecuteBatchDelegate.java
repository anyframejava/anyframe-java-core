package org.anyframe.jdbc.support.p6spy.injection;

import java.lang.reflect.Method;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;

import com.p6spy.engine.common.StatementInformation;
import com.p6spy.engine.proxy.Delegate;

public class P6InjectionPatternStatementExecuteBatchDelegate implements Delegate {

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
		
		// String replacePattern = injectionPatternPostProcessor.replacePattern(statementInformation.getStatementQuery());
		// addBatch() 호출 시, replace 처리를 다 할텐데...여기서 다시할 이유가...
		
		return method.invoke(underlying, args);
	}

}
