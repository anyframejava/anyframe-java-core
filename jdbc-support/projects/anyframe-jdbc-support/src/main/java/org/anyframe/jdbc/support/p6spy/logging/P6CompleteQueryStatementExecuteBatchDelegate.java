package org.anyframe.jdbc.support.p6spy.logging;

import java.lang.reflect.Method;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.p6spy.engine.common.StatementInformation;
import com.p6spy.engine.proxy.Delegate;

public class P6CompleteQueryStatementExecuteBatchDelegate implements Delegate {
	/**
	 * Logger with CompleteQueryPostProcessor.class
	 */
	protected static Logger logger = LoggerFactory.getLogger(P6CompleteQueryStatementExecuteBatchDelegate.class);
	
	private final StatementInformation statementInformation;
	private final CompleteQueryPostProcessor completeQueryPostProcessor;

	public P6CompleteQueryStatementExecuteBatchDelegate(final StatementInformation statementInformation,
			CompleteQueryPostProcessor completeQueryPostProcessor) {
		this.statementInformation = statementInformation;
		this.completeQueryPostProcessor = completeQueryPostProcessor;
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
		try {
			return method.invoke(underlying, args);
		} finally {
			// statement.executeBatch를 실행하면 이미 addBatch에서 실행한 마지막 Query문 하나만 logging될 것 같은데, 이게 의미가 있나?
			completeQueryPostProcessor.processCompleteQuery(statementInformation.getStatementQuery());
		}
	}

}
