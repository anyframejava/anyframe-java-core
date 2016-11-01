package org.anyframe.jdbc.support.ext;

public class QueryLogException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private String sql;

	public QueryLogException(String sql) {
		this.sql = sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public String getSql() {
		return sql;
	}

	@Override
	public String getMessage() {
		return sql;
	}

}
