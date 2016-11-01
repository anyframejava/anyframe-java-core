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

/**
 * Description: JDBC Driver Extension implementing PreparedStatement.
 *
 * $Author: cheechq $
 * $Revision: 1.6 $
 * $Date: 2003/06/03 19:20:22 $
 *
 * $Id: P6LogPreparedStatement.java,v 1.6 2003/06/03 19:20:22 cheechq Exp $
 * $Source: /cvsroot/p6spy/p6spy/com/p6spy/engine/logging/P6LogPreparedStatement.java,v $
 * $Log: P6LogPreparedStatement.java,v $
 * Revision 1.6  2003/06/03 19:20:22  cheechq
 * removed unused imports
 *
 * Revision 1.5  2002/12/19 16:59:44  aarvesen
 * remove getTrace from the driver level
 *
 * Revision 1.4  2002/12/19 16:31:18  aarvesen
 * Removed the checkReload call
 *
 * Revision 1.3  2002/12/06 22:28:08  aarvesen
 * new factory registration in the constructor
 * added submitted jdk 1.4 code
 *
 * Revision 1.2  2002/10/06 18:22:12  jeffgoke
 * no message
 *
 * Revision 1.1  2002/05/24 07:31:45  jeffgoke
 * version 1 rewrite
 *
 * Revision 1.8  2002/05/18 06:39:52  jeffgoke
 * Peter Laird added Outage detection.  Added junit tests for outage detection.
 * Fixed multi-driver tests.
 *
 * Revision 1.7  2002/05/16 04:58:40  jeffgoke
 * Viktor Szathmary added multi-driver support.
 * Rewrote P6SpyOptions to be easier to manage.
 * Fixed several bugs.
 *
 * Revision 1.6  2002/04/21 06:15:34  jeffgoke
 * added test cases, fixed batch bugs
 *
 * Revision 1.5  2002/04/18 06:54:39  jeffgoke
 * added batch statement logging support
 *
 * Revision 1.4  2002/04/15 05:13:32  jeffgoke
 * Simon Sadedin added timing support.  Fixed bug where batch execute was not
 * getting logged.  Added result set timing.  Updated the log format to include
 * categories, and updated options to control the categories.  Updated
 * documentation.
 *
 * Revision 1.3  2002/04/11 04:18:03  jeffgoke
 * fixed bug where callable & prepared were not passing their ancestors the correct constructor information
 *
 * Revision 1.2  2002/04/10 04:24:26  jeffgoke
 * added support for callable statements and fixed numerous bugs that allowed the real class to be returned
 *
 * Revision 1.1.1.1  2002/04/07 04:52:25  jeffgoke
 * no message
 *
 * Revision 1.2  2001-08-05 09:16:04-05  andy
 * final version on the website
 *
 * Revision 1.1  2001-08-02 07:52:43-05  andy
 * <>
 *
 * Revision 1.0  2001-08-02 06:37:42-05  andy
 * Initial revision
 *
 *
 */

package org.anyframe.jdbc.support.p6spy;

import java.lang.reflect.Method;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;
import org.anyframe.jdbc.support.InjectionPatternPostProcessor;
import org.springframework.util.ReflectionUtils;

import com.p6spy.engine.spy.P6Connection;
import com.p6spy.engine.spy.P6Factory;
import com.p6spy.engine.spy.P6PreparedStatement;

/**
 * P6Spy PreparedStatement Extension for jdbc support functions
 * (InjectionPattern, CompleteQuery)
 *
 * @author Changje Kim
 * @author Byunghun Woo
 *
 */
public class P6ILPreparedStatement extends P6PreparedStatement {

	private InjectionPatternPostProcessor injectionPatternPostProcessor;
	private CompleteQueryPostProcessor completeQueryPostProcessor;
	private static  boolean log4jdbc=true;
	
	static {
		try {
			P6ILPreparedStatement.class.getClassLoader().loadClass(
					"net.sf.log4jdbc.PreparedStatementSpy");
		} catch (ClassNotFoundException e) {
			log4jdbc = false;
		}
	}
	

	public P6ILPreparedStatement(P6Factory factory, PreparedStatement statement, P6Connection conn, String query,
			InjectionPatternPostProcessor injectionPatternPostProcessor,
			CompleteQueryPostProcessor completeQueryPostProcessor) {
		super(factory, statement, conn, query);
		this.injectionPatternPostProcessor = injectionPatternPostProcessor;
		this.completeQueryPostProcessor = completeQueryPostProcessor;
	}

	@Override
	public void addBatch() throws SQLException {
		completeQueryPostProcessor.processCompleteQuery(getQueryFromPreparedStatement());
		prepStmtPassthru.addBatch();
	}

	@Override
	public boolean execute() throws SQLException {
		completeQueryPostProcessor.processCompleteQuery(getQueryFromPreparedStatement());
		return prepStmtPassthru.execute();
	}

	@Override
	public ResultSet executeQuery() throws SQLException {
		completeQueryPostProcessor.processCompleteQuery(getQueryFromPreparedStatement());
		return getP6Factory().getResultSet(prepStmtPassthru.executeQuery(), this, preparedQuery,
				getQueryFromPreparedStatement());
	}

	@Override
	public int executeUpdate() throws SQLException {
		completeQueryPostProcessor.processCompleteQuery(getQueryFromPreparedStatement());
		return prepStmtPassthru.executeUpdate();
	}

	// ---------------------------------------------------------------------------------------
	// we need to override the same methods that P6SLogStatement overrides
	// because we don't have
	// multiple inheritance. considering the alternatives (delegation), it seems
	// cleaner
	// to just override the methods. to understand why this is true, realize
	// P6LogPreparedStatement inherits from P6PreparedStatement which inherits
	// from P6Statement,
	// so P6LogPreparedStatement never inherits from P6LogStatement and
	// therefore it does not
	// inherit any of the functionality we define in P6LogStatement.
	// ---------------------------------------------------------------------------------------

	@Override
	public boolean execute(String sql) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return passthru.execute(statementQuery);
	}

	// Since JDK 1.4
	@Override
	public boolean execute(String sql, int autoGeneratedKeys) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return passthru.execute(statementQuery, autoGeneratedKeys);
	}

	// -----------

	// Since JDK 1.4
	@Override
	public boolean execute(String sql, int[] columnIndexes) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return passthru.execute(statementQuery, columnIndexes);
	}

	// Since JDK 1.4
	@Override
	public boolean execute(String sql, String columnNames[]) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return passthru.execute(sql, columnNames);
	}

	@Override
	public ResultSet executeQuery(String sql) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return getP6Factory().getResultSet(passthru.executeQuery(sql), this, "", sql);
	}

	@Override
	public int executeUpdate(String sql) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (passthru.executeUpdate(sql));
	}

	// Since JDK 1.4
	@Override
	public int executeUpdate(String sql, int autoGeneratedKeys) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (passthru.executeUpdate(statementQuery, autoGeneratedKeys));
	}

	// Since JDK 1.4
	@Override
	public int executeUpdate(String sql, int[] columnIndexes) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (passthru.executeUpdate(statementQuery, columnIndexes));
	}

	// Since JDK 1.4
	@Override
	public int executeUpdate(String sql, String columnNames[]) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (passthru.executeUpdate(statementQuery, columnNames));
	}

	@Override
	public void addBatch(String sql) throws SQLException {
		injectionPatternPostProcessor.warningPattern(sql);
		statementQuery = injectionPatternPostProcessor.replacePattern(sql);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		passthru.addBatch(sql);
	}

	@Override
	public int[] executeBatch() throws SQLException {
		// injectionPatternPostProcessor.warningPattern(sql);
		// statementQuery =
		// injectionPatternPostProcessor.replacePattern(statementQuery);
		completeQueryPostProcessor.processCompleteQuery(statementQuery);

		return (passthru.executeBatch());
	}

	/**
	 * for Oracle - executeBatch with Anyframe OraclePagingJdbcTemplate
	 * @param paramInt
	 * @throws SQLException
	 */
	public void setExecuteBatch(int paramInt) throws SQLException {
		Method method = null;
		Statement stmt = null;
		if (passthru instanceof org.apache.commons.dbcp.DelegatingPreparedStatement) {
			stmt = ((org.apache.commons.dbcp.DelegatingPreparedStatement) passthru).getInnermostDelegate();
			if (log4jdbc && stmt instanceof net.sf.log4jdbc.PreparedStatementSpy) {
				stmt = ((net.sf.log4jdbc.PreparedStatementSpy) stmt).getRealPreparedStatement();
				method = ReflectionUtils.findMethod(stmt.getClass(), "setExecuteBatch", new Class[] { int.class });
			}
			else {
				method = ReflectionUtils.findMethod(stmt.getClass(), "setExecuteBatch", new Class[] { int.class });
			}
		}
		else if (log4jdbc &&passthru instanceof net.sf.log4jdbc.PreparedStatementSpy) {
			method = ReflectionUtils.findMethod(((net.sf.log4jdbc.PreparedStatementSpy) passthru)
					.getRealPreparedStatement().getClass(), "setExecuteBatch", new Class[] { int.class });
			stmt = ((net.sf.log4jdbc.PreparedStatementSpy) passthru).getRealPreparedStatement();
		}
		else {
			method = ReflectionUtils.findMethod(passthru.getClass(), "setExecuteBatch", new Class[] { int.class });
		}
		// 2011.08.29 - for ojdbc6 - makeAccessible
		ReflectionUtils.makeAccessible(method);
		ReflectionUtils.invokeMethod(method, stmt == null ? passthru : stmt, new Object[] { new Integer(paramInt) });
	}
	
}
