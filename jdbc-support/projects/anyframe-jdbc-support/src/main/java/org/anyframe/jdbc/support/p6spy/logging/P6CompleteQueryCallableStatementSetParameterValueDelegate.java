package org.anyframe.jdbc.support.p6spy.logging;

import java.lang.reflect.Method;
import java.sql.Statement;

import com.p6spy.engine.common.CallableStatementInformation;
import com.p6spy.engine.proxy.Delegate;

public class P6CompleteQueryCallableStatementSetParameterValueDelegate implements Delegate {

	private CallableStatementInformation callableStatementInformation;

	public P6CompleteQueryCallableStatementSetParameterValueDelegate(CallableStatementInformation callableStatementInformation) {
		this.callableStatementInformation = callableStatementInformation;
	}

	@Override
	public Object invoke(Object proxy, Object underlying, Method method, Object[] args) throws Throwable {

		// ignore calls to any methods defined on the Statement interface!
		if (!Statement.class.equals(method.getDeclaringClass())) {
			String name = (String) args[0];
			Object value = null;
			if (!method.getName().equals("setNull") && args.length > 1) {
				value = args[1];
			}
			this.callableStatementInformation.setParameterValue(name, value);
		}
		return method.invoke(underlying, args);
	}

}
