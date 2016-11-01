package org.anyframe.mip.query.web.controller;

import java.math.BigDecimal;

public class MappingVO {
	private String testString;
	private BigDecimal testBigDecimal;
	private int testInt;

	public String getTestString() {
		return testString;
	}

	public void setTestString(String testString) {
		this.testString = testString;
	}

	public BigDecimal getTestBigDecimal() {
		return testBigDecimal;
	}

	public void setTestBigDecimal(BigDecimal testBigDecimal) {
		this.testBigDecimal = testBigDecimal;
	}

	public int getTestInt() {
		return testInt;
	}

	public void setTestInt(int testInt) {
		this.testInt = testInt;
	}
}
