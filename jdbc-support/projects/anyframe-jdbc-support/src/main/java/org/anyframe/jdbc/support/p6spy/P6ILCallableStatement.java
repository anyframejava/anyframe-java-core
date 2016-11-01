/*
 *
 * ====================================================================
 *
 * The P6Spy Software License, Version 1.1
 *
 * This license is derived and fully compatible with the Apache Software
 * license, see http://www.apache.org/LICENSE.txt
 *
 * Copyright (c) 2001-2002 Andy Martin, Ph.D. and Jeff Goke
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in
 * the documentation and/or other materials provided with the
 * distribution.
 *
 * 3. The end-user documentation included with the redistribution, if
 * any, must include the following acknowlegement:
 * "The original concept and code base for P6Spy was conceived
 * and developed by Andy Martin, Ph.D. who generously contribued
 * the first complete release to the public under this license.
 * This product was due to the pioneering work of Andy
 * that began in December of 1995 developing applications that could
 * seamlessly be deployed with minimal effort but with dramatic results.
 * This code is maintained and extended by Jeff Goke and with the ideas
 * and contributions of other P6Spy contributors.
 * (http://www.p6spy.com)"
 * Alternately, this acknowlegement may appear in the software itself,
 * if and wherever such third-party acknowlegements normally appear.
 *
 * 4. The names "P6Spy", "Jeff Goke", and "Andy Martin" must not be used
 * to endorse or promote products derived from this software without
 * prior written permission. For written permission, please contact
 * license@p6spy.com.
 *
 * 5. Products derived from this software may not be called "P6Spy"
 * nor may "P6Spy" appear in their names without prior written
 * permission of Jeff Goke and Andy Martin.
 *
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE APACHE SOFTWARE FOUNDATION OR
 * ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
 * USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
 * OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */
package org.anyframe.jdbc.support.p6spy;

import java.lang.reflect.Method;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;
import org.anyframe.jdbc.support.InjectionPatternPostProcessor;
import org.springframework.util.ReflectionUtils;

import com.p6spy.engine.spy.P6CallableStatement;
import com.p6spy.engine.spy.P6Connection;
import com.p6spy.engine.spy.P6Factory;

/**
 * P6Spy CallableStatement Extension for jdbc support functions
 * (InjectionPattern, CompleteQuery)
 *
 * @author Changje Kim
 * @author Byunghun Woo
 *
 */
public class P6ILCallableStatement extends P6CallableStatement {

	private final InjectionPatternPostProcessor injectionPatternPostProcessor;

	private final CompleteQueryPostProcessor completeQueryPostProcessor;
	
	private static  boolean log4jdbc=true; 
	
	static {
		try {
			P6ILCallableStatement.class.getClassLoader().loadClass(
					"net.sf.log4jdbc.CallableStatementSpy");
		} catch (ClassNotFoundException e) {
			log4jdbc = false;
		}
	}

	public P6ILCallableStatement(P6Factory factory, CallableStatement statement, P6Connection conn, String query,
			InjectionPatternPostProcessor injectionPatternPostProcessor,
			CompleteQueryPostProcessor completeQueryPostProcessor) {
		super(factory, statement, conn, query);
		this.injectionPatternPostProcessor = injectionPatternPostProcessor;
		this.completeQueryPostProcessor = completeQueryPostProcessor;
	}

	@Override
	public void addBatch() throws SQLException {
		completeQueryPostProcessor.processCompleteQuery(getQueryFromPreparedStatement());
		callStmtPassthru.addBatch();
	}

	@Override
	public boolean execute() throws SQLException {
		completeQueryPostProcessor.processCompleteQuery(getQueryFromPreparedStatement());
		return callStmtPassthru.execute();
	}

	@Override
	public ResultSet executeQuery() throws SQLException {
		completeQueryPostProcessor.processCompleteQuery(getQueryFromPreparedStatement());
		return getP6Factory().getResultSet(callStmtPassthru.executeQuery(), this, callableQuery,
				getQueryFromPreparedStatement());
	}

	@Override
	public int executeUpdate() throws SQLException {
		completeQueryPostProcessor.processCompleteQuery(getQueryFromPreparedStatement());
		return callStmtPassthru.executeUpdate();
	}

	@Override
	public boolean execute(String sql) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return callStmtPassthru.execute(statementQuery);

	}

	// Since JDK 1.4
	@Override
	public boolean execute(String sql, int autoGeneratedKeys) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return callStmtPassthru.execute(statementQuery, autoGeneratedKeys);
	}

	// Since JDK 1.4
	@Override
	public boolean execute(String sql, int[] columnIndexes) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return callStmtPassthru.execute(statementQuery, columnIndexes);
	}

	// Since JDK 1.4
	@Override
	public boolean execute(String sql, String columnNames[]) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return callStmtPassthru.execute(statementQuery, columnNames);
	}

	@Override
	public ResultSet executeQuery(String sql) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return getP6Factory().getResultSet(callStmtPassthru.executeQuery(sql), this, "", sql);
	}

	@Override
	public int executeUpdate(String sql) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (callStmtPassthru.executeUpdate(statementQuery));
	}

	// Since JDK 1.4
	@Override
	public int executeUpdate(String sql, int autoGeneratedKeys) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (callStmtPassthru.executeUpdate(statementQuery, autoGeneratedKeys));
	}

	// Since JDK 1.4
	@Override
	public int executeUpdate(String sql, int[] columnIndexes) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (callStmtPassthru.executeUpdate(statementQuery, columnIndexes));
	}

	// Since JDK 1.4
	@Override
	public int executeUpdate(String sql, String columnNames[]) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (callStmtPassthru.executeUpdate(statementQuery, columnNames));
	}

	@Override
	public void addBatch(String sql) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		callStmtPassthru.addBatch(statementQuery);
	}

	@Override
	public int[] executeBatch() throws SQLException {
		// injectionPatternPostProcessor.warningPattern(sql);
		// statementQuery =
		// injectionPatternPostProcessor.replace(statementQuery);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (callStmtPassthru.executeBatch());
	}
	
	/**
	 * for Oracle - executeBatch with Anyframe OraclePagingJdbcTemplate
	 * @param paramInt
	 * @throws SQLException
	 */
	public void setExecuteBatch(int paramInt) throws SQLException {
		Method method = null;
		Statement stmt = null;
		if (passthru instanceof org.apache.commons.dbcp.DelegatingCallableStatement) {
			stmt = ((org.apache.commons.dbcp.DelegatingCallableStatement) passthru).getInnermostDelegate();
			if (log4jdbc && stmt instanceof net.sf.log4jdbc.CallableStatementSpy) {
				stmt = ((net.sf.log4jdbc.CallableStatementSpy) stmt).getRealCallableStatement();
				method = ReflectionUtils.findMethod(stmt.getClass(), "setExecuteBatch", new Class[] { int.class });
			}
			else {
				method = ReflectionUtils.findMethod(stmt.getClass(), "setExecuteBatch", new Class[] { int.class });
			}
		}
		else if (log4jdbc &&passthru instanceof net.sf.log4jdbc.CallableStatementSpy) {
			method = ReflectionUtils.findMethod(((net.sf.log4jdbc.CallableStatementSpy) passthru)
					.getRealCallableStatement().getClass(), "setExecuteBatch", new Class[] { int.class });
			stmt = ((net.sf.log4jdbc.CallableStatementSpy) passthru).getRealCallableStatement();
		}
		else {
			method = ReflectionUtils.findMethod(passthru.getClass(), "setExecuteBatch", new Class[] { int.class });
		}
		// 2011.08.29 - for ojdbc6 - makeAccessible
		ReflectionUtils.makeAccessible(method);
		ReflectionUtils.invokeMethod(method, stmt == null ? passthru : stmt, new Object[] { new Integer(paramInt) });
	}
		

}
