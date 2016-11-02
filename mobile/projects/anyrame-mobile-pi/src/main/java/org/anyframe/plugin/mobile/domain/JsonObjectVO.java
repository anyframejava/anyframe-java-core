package org.anyframe.plugin.mobile.domain;

import java.util.List;

public class JsonObjectVO {
	
	private String total;
	private String page;
	private String records;
	private List<?> rows = null;
	private Movie movie = null;

	public Movie getCategoryDVO() {
		return movie;
	}

	public void setCategoryDVO(Movie movie) {
		this.movie = movie;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRecords() {
		return records;
	}

	public void setRecords(String records) {
		this.records = records;
	}

	public List<?> getRows() {
		return rows;
	}

	public void setRows(List<?> list) {
		this.rows = list;
	}

	@Override
	public String toString() {
		return "JsonObjectVO [total=" + total + ", page=" + page + ", records="
				+ records + ", rows=" + rows + ", categoryDVO=" + movie
				+ "]";
	}
}
