package org.anyframe.jdbc.support.p6spy.logging;

import java.lang.reflect.Method;
import java.sql.Statement;

import com.p6spy.engine.common.PreparedStatementInformation;
import com.p6spy.engine.proxy.Delegate;

public class P6CompleteQueryPreparedStatementSetParameterValueDelegate implements Delegate {

	private final PreparedStatementInformation preparedStatementInformation;


	public P6CompleteQueryPreparedStatementSetParameterValueDelegate(PreparedStatementInformation preparedStatementInformation) {
		this.preparedStatementInformation = preparedStatementInformation;
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {
		// ignore calls to any methods defined on the Statement interface!
		if (!Statement.class.equals(method.getDeclaringClass())) {
			int position = (Integer) args[0];
			Object value = null;
			if (!method.getName().equals("setNull") && args.length > 1) {
				value = args[1];
			}
			this.preparedStatementInformation.setParameterValue(position, value);
		}
		return method.invoke(underlying, args);
	}

	public PreparedStatementInformation getPreparedStatementInformation() {
		return preparedStatementInformation;
	}
}
