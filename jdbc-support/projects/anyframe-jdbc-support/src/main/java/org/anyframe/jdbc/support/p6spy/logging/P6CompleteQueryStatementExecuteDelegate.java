package org.anyframe.jdbc.support.p6spy.logging;

import java.lang.reflect.Method;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.p6spy.engine.common.StatementInformation;
import com.p6spy.engine.proxy.Delegate;

public class P6CompleteQueryStatementExecuteDelegate implements Delegate {
	/**
	 * Logger with CompleteQueryPostProcessor.class
	 */
	protected static Logger logger = LoggerFactory.getLogger(P6CompleteQueryStatementExecuteDelegate.class);
	private final StatementInformation statementInformation;
	private final CompleteQueryPostProcessor completeQueryPostProcessor;

	public P6CompleteQueryStatementExecuteDelegate(final StatementInformation statementInformation,
			CompleteQueryPostProcessor completeQueryPostProcessor) {
		this.statementInformation = statementInformation;
		this.completeQueryPostProcessor = completeQueryPostProcessor;
	}

	@Override
	public Object invoke(final Object proxy, final Object underlying, final Method method, final Object[] args) throws Throwable {

		this.statementInformation.setStatementQuery((String) args[0]);

		try {
			return method.invoke(underlying, args);
		} finally {
			this.completeQueryPostProcessor.processCompleteQuery((String) args[0]);
		}
	}

	protected CompleteQueryPostProcessor getCompleteQueryPostProcessor() {
		return this.completeQueryPostProcessor;
	}

	protected StatementInformation getStatementInformation() {
		return this.statementInformation;
	}

}
