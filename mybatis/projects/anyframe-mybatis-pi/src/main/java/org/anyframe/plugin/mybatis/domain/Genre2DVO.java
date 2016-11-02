package org.anyframe.plugin.mybatis.domain;

import java.math.BigDecimal;

/**
 * @author SDS
 * @voType
 */
public class Genre2DVO{


	private String genreId;

	private String name;

	private BigDecimal c1;
	public String getGenreId() {
		return this.genreId;
	}

	public void setGenreId(String genreId) {
		this.genreId = genreId;
	}
	
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public BigDecimal getC1() {
		return this.c1;
	}

	public void setC1(BigDecimal c1) {
		this.c1 = c1;
	}
	
}