/*
 * Copyright 2002-2008 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.query.impl.jdbc.lob;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import oracle.sql.CLOB;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.support.lob.LobCreator;
import org.springframework.jdbc.support.lob.OracleLobHandler;
import org.springframework.jdbc.support.nativejdbc.NativeJdbcExtractor;
import org.springframework.util.FileCopyUtils;

/**
 * LobHandler implementation for Oracle databases. Uses proprietary API to
 * create oracle.sql.BLOB and oracle.sql.CLOB instances, as necessary when
 * working with Oracle's JDBC driver. Developed and tested on Oracle 9i.
 * <p>
 * While most databases are able to work with DefaultLobHandler, Oracle just
 * accepts Blob/Clob instances created via its own proprietary BLOB/CLOB API,
 * and additionally doesn't accept large streams for PreparedStatement's
 * corresponding setter methods. Therefore, you need to use a strategy like this
 * LobHandler implementation.
 * <p>
 * Needs to work on a native JDBC Connection, to be able to cast it to
 * oracle.jdbc.OracleConnection. If you pass in Connections from a connection
 * pool (the usual case in a J2EE environment), you need to set an appropriate
 * NativeJdbcExtractor to allow for automatical retrieval of the underlying
 * native JDBC Connection. LobHandler and NativeJdbcExtractor are separate
 * concerns, therefore they are represented by separate strategy interfaces.
 * <p>
 * Coded via reflection to avoid dependencies on Oracle classes. Even reads in
 * Oracle constants via reflection because of different Oracle drivers
 * (classes12, ojdbc14) having different constant values! As it initializes the
 * Oracle classes on instantiation, do not define this as eager-initializing
 * singleton if you do not want to depend on the Oracle JAR being in the class
 * path: use "lazy-init=true" to avoid this issue. We changed
 * org.springframework.jdbc.support.lob.OracleLobHandler Class into
 * org.anyframe.query.impl.jdbc.lob.Oracle8iLobHandler Class in Anyframe.
 * <ul>
 * <li>Add some operations for supporting Oracle 8i.</li>
 * </ul>
 * 
 * @author Juergen Hoeller
 * @author modified by SoYon Lim
 */
public class Oracle8iLobHandler extends OracleLobHandler {
	
	private static Log log = LogFactory.getLog(Oracle8iLobHandler.class);
	
	private static final String CONNECTION_CLASS_NAME = "oracle.jdbc.OracleConnection";

	private static final String BLOB_CLASS_NAME = "oracle.sql.BLOB";

	private static final String CLOB_CLASS_NAME = "oracle.sql.CLOB";

	private final Class connectionClass;

	private final Class blobClass;

	private final Class clobClass;

	private final Method getCLOBMethod;

	private final Method getBLOBMethod;

	private final Method getCLOBStream;

	private final Method getBLOBStream;

	private final Map durationSessionConstants = new HashMap(2);

	private final Map modeReadWriteConstants = new HashMap(2);

	private NativeJdbcExtractor nativeJdbcExtractor;

	private Boolean cache = Boolean.TRUE;

	public Oracle8iLobHandler() {
		this("oracle.jdbc.OracleResultSet");
	}

	/**
	 * This constructor retrieves the oracle.sql.BLOB and oracle.sql.CLOB
	 * classes via reflection, and initializes the values for the
	 * DURATION_SESSION and MODE_READWRITE constants defined there.
	 */
	public Oracle8iLobHandler(String resultSetSpyName) {
		try {
			Class rsClass = getClass().getClassLoader().loadClass(
					resultSetSpyName);
			this.connectionClass = getClass().getClassLoader().loadClass(
					CONNECTION_CLASS_NAME);

			// initialize oracle.sql.BLOB class
			this.blobClass = getClass().getClassLoader().loadClass(
					BLOB_CLASS_NAME);

			// initialize oracle.sql.CLOB class
			this.clobClass = getClass().getClassLoader().loadClass(
					CLOB_CLASS_NAME);

			if (resultSetSpyName.endsWith("OracleResultSet")) {
				this.getCLOBMethod = rsClass.getMethod("getCLOB",
						new Class[] { int.class });
				this.getBLOBMethod = rsClass.getMethod("getBLOB",
						new Class[] { int.class });

			} else {
				this.getCLOBMethod = rsClass.getMethod("getClob",
						new Class[] { int.class });
				this.getBLOBMethod = rsClass.getMethod("getBlob",
						new Class[] { int.class });
			}

			this.getCLOBStream = clobClass.getMethod(
					"getCharacterOutputStream", new Class[] {});
			this.getBLOBStream = blobClass.getMethod("getBinaryOutputStream",
					new Class[] {});
		} catch (Exception ex) {
			throw new RuntimeException(
					"Query Service : Couldn't initialize OracleLobHandler because Oracle driver classes are not available",
					ex);
		}
	}

	public void setBlobOutputValue(ResultSet rs, int columnIndex,
			byte[] blobValue) throws SQLException {
		ResultSet oRs = nativeJdbcExtractor.getNativeResultSet(rs);
		try {
			Object blob = getBLOBMethod.invoke(oRs, new Object[] { new Integer(
					columnIndex) });
			BufferedOutputStream writer = new BufferedOutputStream(
					(OutputStream) (getBLOBStream.invoke(blob, new Object[0])));
			writer.write(blobValue);
			writer.close();
		} catch (IllegalArgumentException e) {
			log.error(e.getMessage());
		} catch (IllegalAccessException e) {
			log.error(e.getMessage());
		} catch (InvocationTargetException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		}
	}

	public void setClobOutputValue(ResultSet rs, int columnIndex,
			String clobValue) throws SQLException {
		ResultSet oRs = nativeJdbcExtractor.getNativeResultSet(rs);
		try {
			CLOB clob = (CLOB) getCLOBMethod.invoke(oRs,
					new Object[] { new Integer(columnIndex) });

			long pos = 0;

			pos = clob.length() + 1;

			clob.putString(pos, clobValue);
		} catch (IllegalArgumentException e) {
			log.error("Cannot invoke method " + getCLOBMethod.getName() + " because of illegal argument. Error : " + e.getMessage());
		} catch (IllegalAccessException e) {
			log.error("Cannot invoke method " + getCLOBMethod.getName() + " because this method is inaccessible. Error : " + e.getMessage());
		} catch (InvocationTargetException e) {
			log.error(getCLOBMethod.getName() + " method throws an exception. Error : " + e.getMessage());
		}
	}

	/**
	 * Set an appropriate NativeJdbcExtractor to be able to retrieve the
	 * underlying native oracle.jdbc.OracleConnection. This is necessary for
	 * DataSource-based connection pools, as those need to return wrapped JDBC
	 * Connection handles.
	 * <p>
	 * Effectively, this LobHandler just invokes a single NativeJdbcExtractor
	 * method, namely <code>getNativeConnectionFromStatement</code> with a
	 * PreparedStatement argument (falling back to a
	 * <code>PreparedStatement.getConnection()</code> call if no extractor is
	 * set).
	 * <p>
	 * A common choice is SimpleNativeJdbcExtractor, whose Connection unwrapping
	 * (which is what OracleLobHandler needs) will work with almost any
	 * connection pool. See SimpleNativeJdbcExtractor's javadoc for details.
	 */
	public void setNativeJdbcExtractor(NativeJdbcExtractor nativeJdbcExtractor) {
		this.nativeJdbcExtractor = nativeJdbcExtractor;
	}

	/**
	 * Set whether to cache the temporary LOB in the buffer cache. This value
	 * will be passed into BLOB/CLOB.createTemporary. Default is true.
	 */
	public void setCache(boolean cache) {
		this.cache = new Boolean(cache);
	}

	public byte[] getBlobAsBytes(ResultSet rs, int columnIndex)
			throws SQLException {

		Blob blob = rs.getBlob(columnIndex);
		if (blob != null)
			return blob.getBytes(1, (int) blob.length());

		return null;
	}

	public byte[] getBlobAsBytes(ResultSet rs, String columnName)
			throws SQLException {

		Blob blob = rs.getBlob(columnName);

		if (blob != null)
			return blob.getBytes(1, (int) blob.length());

		return null;
	}

	public InputStream getBlobAsBinaryStream(ResultSet rs, int columnIndex)
			throws SQLException {

		Blob blob = rs.getBlob(columnIndex);

		if (blob != null)
			return blob.getBinaryStream();

		return null;
	}

	public String getClobAsString(ResultSet rs, int columnIndex)
			throws SQLException {

		Clob clob = rs.getClob(columnIndex);

		if (clob != null)
			return clob.getSubString(1, (int) clob.length() - 1);

		return null;
	}

	public String getClobAsString(ResultSet rs, String columnName)
			throws SQLException {

		Clob clob = rs.getClob(columnName);

		if (clob != null)
			return clob.getSubString(1, (int) clob.length());

		return null;
	}

	public InputStream getClobAsAsciiStream(ResultSet rs, int columnIndex)
			throws SQLException {

		Clob clob = rs.getClob(columnIndex);

		if (clob != null)
			return clob.getAsciiStream();

		return null;
	}

	public Reader getClobAsCharacterStream(ResultSet rs, int columnIndex)
			throws SQLException {

		Clob clob = rs.getClob(columnIndex);

		if (clob != null)
			return clob.getCharacterStream();
		return null;
	}

	public LobCreator getLobCreator() {
		return new OracleLobCreator();
	}

	/**
	 * LobCreator implementation for Oracle databases. Creates Oracle-style
	 * temporary BLOBs and CLOBs that it frees on close.
	 * 
	 * @see #close
	 */
	protected class OracleLobCreator implements LobCreator {

		private final List createdLobs = new LinkedList();

		public void setBlobAsBytes(PreparedStatement ps, int paramIndex,
				final byte[] content) throws SQLException {
			if (content != null) {
				Blob blob = (Blob) createLob(ps, blobClass, new LobCallback() {
					public void populateLob(Object lob) throws Exception {
						Method methodToInvoke = lob.getClass().getMethod(
								"getBinaryOutputStream", new Class[0]);
						OutputStream out = (OutputStream) methodToInvoke
								.invoke(lob, (Object[]) null);
						FileCopyUtils.copy(content, out);
					}
				});
				ps.setBlob(paramIndex, blob);

			} else {
				ps.setBlob(paramIndex, (Blob) null);

			}
		}

		public void setBlobAsBinaryStream(PreparedStatement ps, int paramIndex,
				final InputStream binaryStream, int contentLength)
				throws SQLException {
			if (binaryStream != null) {
				Blob blob = (Blob) createLob(ps, blobClass, new LobCallback() {
					public void populateLob(Object lob) throws Exception {
						Method methodToInvoke = lob.getClass().getMethod(
								"getBinaryOutputStream", (Class[]) null);
						OutputStream out = (OutputStream) methodToInvoke
								.invoke(lob, (Object[]) null);
						FileCopyUtils.copy(binaryStream, out);
					}
				});
				ps.setBlob(paramIndex, blob);

			} else {
				ps.setBlob(paramIndex, (Blob) null);

			}
		}

		public void setClobAsString(PreparedStatement ps, int paramIndex,
				final String content) throws SQLException {
			if (content != null) {
				Clob clob = (Clob) createLob(ps, clobClass, new LobCallback() {
					public void populateLob(Object lob) throws Exception {
						Method methodToInvoke = lob.getClass().getMethod(
								"getCharacterOutputStream", (Class[]) null);
						Writer writer = (Writer) methodToInvoke.invoke(lob,
								(Object[]) null);
						FileCopyUtils.copy(content, writer);
					}
				});
				ps.setClob(paramIndex, clob);

			} else {
				ps.setClob(paramIndex, (Clob) null);

			}
		}

		public void setClobAsAsciiStream(PreparedStatement ps, int paramIndex,
				final InputStream asciiStream, int contentLength)
				throws SQLException {
			if (asciiStream != null) {
				Clob clob = (Clob) createLob(ps, clobClass, new LobCallback() {
					public void populateLob(Object lob) throws Exception {
						Method methodToInvoke = lob.getClass().getMethod(
								"getAsciiOutputStream", (Class[]) null);
						OutputStream out = (OutputStream) methodToInvoke
								.invoke(lob, (Object[]) null);
						FileCopyUtils.copy(asciiStream, out);
					}
				});
				ps.setClob(paramIndex, clob);

			} else {
				ps.setClob(paramIndex, (Clob) null);

			}
		}

		public void setClobAsCharacterStream(PreparedStatement ps,
				int paramIndex, final Reader characterStream, int contentLength)
				throws SQLException {
			if (characterStream != null) {
				Clob clob = (Clob) createLob(ps, clobClass, new LobCallback() {
					public void populateLob(Object lob) throws Exception {
						Method methodToInvoke = lob.getClass().getMethod(
								"getCharacterOutputStream", (Class[]) null);
						Writer writer = (Writer) methodToInvoke.invoke(lob,
								(Object[]) null);
						FileCopyUtils.copy(characterStream, writer);
					}
				});
				ps.setClob(paramIndex, clob);

			} else {
				ps.setClob(paramIndex, (Clob) null);

			}
		}

		/**
		 * Create a LOB instance for the given PreparedStatement, populating it
		 * via the given callback.
		 */
		protected Object createLob(PreparedStatement ps, Class lobClass,
				LobCallback callback) throws SQLException {
			try {
				Object lob = prepareLob(getOracleConnection(ps), lobClass);
				callback.populateLob(lob);
				lob.getClass().getMethod("close", (Class[]) null).invoke(lob,
						(Object[]) null);
				this.createdLobs.add(lob);

				return lob;
			} catch (SQLException ex) {
				throw ex;
			} catch (InvocationTargetException ex) {
				if (ex.getTargetException() instanceof SQLException) {
					throw (SQLException) ex.getTargetException();
				} else {
					throw new RuntimeException(
							"Query Service : Could not create Oracle LOB", ex
									.getTargetException());
				}
			} catch (Exception ex) {
				throw new RuntimeException(
						"Query Service : Could not create Oracle LOB", ex);
			}
		}

		/**
		 * Retrieve the underlying OracleConnection, using a NativeJdbcExtractor
		 * if set.
		 */
		protected Connection getOracleConnection(PreparedStatement ps)
				throws SQLException, ClassNotFoundException {
			Connection conToUse = null;

			if (nativeJdbcExtractor != null)
				conToUse = nativeJdbcExtractor
						.getNativeConnectionFromStatement(ps);
			else
				conToUse = ps.getConnection();
			if (!connectionClass.isAssignableFrom(conToUse.getClass())) {
				throw new RuntimeException(
						"Query Service : OracleLobCreator needs to work on [oracle.jdbc.OracleConnection], not on ["
								+ conToUse.getClass()
								+ "] - specify a corresponding NativeJdbcExtractor");
			}
			return conToUse;
		}

		/**
		 * Create and open an oracle.sql.BLOB/CLOB instance via reflection.
		 */
		protected Object prepareLob(Connection con, Class lobClass)
				throws Exception {
			/*
			 * BLOB blob = BLOB.createTemporary(con, false,
			 * BLOB.DURATION_SESSION); blob.open(BLOB.MODE_READWRITE); return
			 * blob;
			 */
			Method createTemporary = lobClass.getMethod("createTemporary",
					new Class[] { Connection.class, boolean.class, int.class });
			Object lob = createTemporary.invoke(null, new Object[] { con,
					cache, durationSessionConstants.get(lobClass) });
			Method open = lobClass.getMethod("open", new Class[] { int.class });
			open.invoke(lob, new Object[] { modeReadWriteConstants
					.get(lobClass) });
			return lob;
		}

		/**
		 * Free all temporary BLOBs and CLOBs created by this creator.
		 */
		public void close() {
			try {
				for (Iterator it = this.createdLobs.iterator(); it.hasNext();) {
					/*
					 * BLOB blob = (BLOB) it.next(); blob.freeTemporary();
					 */
					Object lob = it.next();
					Method freeTemporary = lob.getClass().getMethod(
							"freeTemporary", new Class[0]);
					freeTemporary.invoke(lob, new Object[0]);
					it.remove();
				}
			} catch (InvocationTargetException ex) {
				log.error("Cannot invoke method. Error : " + ex.getMessage());

			} catch (Exception ex) {
				throw new RuntimeException(
						"Query Service : Could not free Oracle LOB", ex);
			}
		}
	}

	/**
	 * Internal callback interface for use with createLob.
	 */
	protected static interface LobCallback {

		/**
		 * Populate the given BLOB or CLOB instance with content.
		 * 
		 * @throws Exception
		 *             any exception including InvocationTargetException
		 */
		void populateLob(Object lob) throws Exception;
	}
}
