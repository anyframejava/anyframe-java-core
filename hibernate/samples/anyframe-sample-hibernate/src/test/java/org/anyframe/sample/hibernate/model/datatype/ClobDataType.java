package org.anyframe.sample.hibernate.model.datatype;

import java.sql.Clob;

public class ClobDataType {

	private int no;
	private String title;
	private Clob contentClob;

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Clob getContentClob() {
		return contentClob;
	}

	public void setContentClob(Clob contentClob) {
		this.contentClob = contentClob;
	}
}
