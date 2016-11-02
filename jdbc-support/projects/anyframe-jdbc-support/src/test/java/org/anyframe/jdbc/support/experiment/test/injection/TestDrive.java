package org.anyframe.jdbc.support.experiment.test.injection;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;

import org.anyframe.jdbc.support.InjectionPatternPostProcessor;
import org.anyframe.jdbc.support.experiment.P6ConnectionFactory;
import org.anyframe.jdbc.support.experiment.factory.impl.DefaultConnectionHandlerFactory;
import org.anyframe.jdbc.support.impl.DefaultInjectionPatternPostProcessor;
import org.junit.Before;
import org.junit.Test;

public class TestDrive {
	
	private Connection proxyConn;
	
	@Before
	public void init(){
		
		InjectionPatternPostProcessor injectionPatternPostProcessor = new DefaultInjectionPatternPostProcessor();
		
		InjectionPatternStatementsHandlerFactory injectionStatmentsFactory = new InjectionPatternStatementsHandlerFactory(injectionPatternPostProcessor);
		
		DefaultConnectionHandlerFactory conn = new DefaultConnectionHandlerFactory(injectionStatmentsFactory, injectionStatmentsFactory, injectionStatmentsFactory);
		
		P6ConnectionFactory p6ConnectionFactory = new P6ConnectionFactory(conn);
		
		Connection rawConn = mock(Connection.class);
		
		Statement stmt = mock(Statement.class);
		PreparedStatement pstmt = mock(PreparedStatement.class);
		CallableStatement cstmt = mock(CallableStatement.class);
		try{
			when(rawConn.prepareStatement(any(String.class))).thenReturn(pstmt);
			when(rawConn.createStatement()).thenReturn(stmt);
			when(rawConn.prepareCall(any(String.class))).thenReturn(cstmt);
			proxyConn = p6ConnectionFactory.getConnection(rawConn);
		}catch(Exception e){
			throw new RuntimeException("Failed to initialize!!.", e);
		}
		
	}
	
	@Test
	public void testProxyStatement() throws Exception {
		Statement proxyStmt = proxyConn.createStatement();
		String query = "SELECT 1 FROM SAMPLE_TABLE";
		proxyStmt.executeQuery(query);
		proxyStmt.execute("SELECT 2 FROM SAMPLE_TABLE");
		
		proxyStmt.executeUpdate("update sample");
		
		// test batch 
		proxyStmt.addBatch("INSERT INTO SAMPLE_BACH");
		proxyStmt.addBatch("INSERT INTO SAMPLE_BACH");
		
		proxyStmt.executeBatch();
		
	}
	
	@Test
	public void testProxyPreparedStatement() throws Exception{
		PreparedStatement proxyPStmt = proxyConn.prepareStatement("INSERT INTO");
		proxyPStmt.executeUpdate();
		proxyPStmt.addBatch();
	}
	
	@Test
	public void testProxyCallableStatment() throws Exception{
		
	}

	

}
