package org.anyframe.jdbc.support.p6spy.logging;

import java.lang.reflect.Method;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.p6spy.engine.common.PreparedStatementInformation;

public class P6CompleteQueryPreparedStatementExecuteDelegate extends P6CompleteQueryStatementExecuteDelegate {
	/**
	 * Logger with CompleteQueryPostProcessor.class
	 */
	protected static Logger logger = LoggerFactory.getLogger(P6CompleteQueryPreparedStatementExecuteDelegate.class);

	public P6CompleteQueryPreparedStatementExecuteDelegate(final PreparedStatementInformation preparedStatementInformation,
			CompleteQueryPostProcessor completeQueryPostProcessor) {
		super(preparedStatementInformation, completeQueryPostProcessor);
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
		try {
			return method.invoke(underlying, args);

		} finally {

			if (null == args || args.length == 0) {
				// For methods for PreparedStatement interface
				super.getCompleteQueryPostProcessor().processCompleteQuery(
						((PreparedStatementInformation) super.getStatementInformation()).getSqlWithValues());
			} else {
				// For methods for Statement interface
				super.invoke(proxy, underlying, method, args);
			}
		}
	}

}
