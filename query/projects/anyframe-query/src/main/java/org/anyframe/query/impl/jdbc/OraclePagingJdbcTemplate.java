package org.anyframe.query.impl.jdbc;

import java.lang.reflect.Method;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.anyframe.query.QueryService;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.InterruptibleBatchPreparedStatementSetter;
import org.springframework.jdbc.core.ParameterDisposer;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.jdbc.support.nativejdbc.NativeJdbcExtractor;


public class OraclePagingJdbcTemplate extends PagingJdbcTemplate {

	private NativeJdbcExtractor nativeJdbcExtractor;

	public void setNativeJdbcExtractor(NativeJdbcExtractor nativeJdbcExtractor) {
		this.nativeJdbcExtractor = nativeJdbcExtractor;
	}

	public int[] batchUpdate(String sql, final BatchPreparedStatementSetter pss)
			throws DataAccessException {
		if (logger.isDebugEnabled()) {
			logger.debug("Executing SQL batch update [" + sql + "]");
		}

		return (int[]) execute(sql, new PreparedStatementCallback() {
			public Object doInPreparedStatement(PreparedStatement ps)
					throws SQLException {
				try {
					int batchSize = pss.getBatchSize();

					if (JdbcUtils.supportsBatchUpdates(ps.getConnection())) {
						logger.debug("Oracle JDBC driver");

						// DataSource 구현체에 맞게 Native PreparedStatement 추출
						if (nativeJdbcExtractor != null) {
							ps = nativeJdbcExtractor
									.getNativePreparedStatement(ps);
						}
						if (ps instanceof net.sf.log4jdbc.PreparedStatementSpy) {
							ps = (PreparedStatement) ((net.sf.log4jdbc.PreparedStatementSpy) ps)
									.getRealPreparedStatement();

						}

						try {
							Method setExecuteBatchMethod = ps.getClass()
									.getMethod("setExecuteBatch",
											new Class[] { int.class });
							setExecuteBatchMethod.invoke(ps,
									new Object[] { new Integer(batchSize) });
						} catch (Exception e) {
							if (QueryService.LOGGER.isErrorEnabled()) {
								QueryService.LOGGER
										.error(
												"Query Service : Not supported a implementation of DataSource service. Fail to find a method from current preparedStatement ["
														+ ps + "]", e);
							}
							throw new SQLException(
									"Query Service : Not supported a implementation of DataSource service. Fail to find a method from current preparedStatement ["
											+ ps + "]");
						}

						int[] updateCountArray = new int[batchSize];
						for (int i = 0; i < batchSize; i++) {
							pss.setValues(ps, i);
							int updateCount = ps.executeUpdate();
							updateCountArray[i] = updateCount;
						}
						return updateCountArray;
					} else {
						List rowsAffected = new ArrayList();

						InterruptibleBatchPreparedStatementSetter ipss = (pss instanceof InterruptibleBatchPreparedStatementSetter ? (InterruptibleBatchPreparedStatementSetter) pss
								: null);

						for (int i = 0; i < batchSize; i++) {
							pss.setValues(ps, i);
							if (ipss != null && ipss.isBatchExhausted(i)) {
								break;
							}
							rowsAffected.add(new Integer(ps.executeUpdate()));
						}
						int[] rowsAffectedArray = new int[rowsAffected.size()];
						for (int i = 0; i < rowsAffectedArray.length; i++) {
							rowsAffectedArray[i] = ((Integer) rowsAffected
									.get(i)).intValue();
						}
						return rowsAffectedArray;
					}
				} finally {
					if (pss instanceof ParameterDisposer) {
						((ParameterDisposer) pss).cleanupParameters();
					}
				}
			}
		});
	}
}
