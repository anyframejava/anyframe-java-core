package org.anyframe.sample.domain;

import java.io.Serializable;

public class Genre implements Serializable {

	private static final long serialVersionUID = 1L;
	private String genreId;
	private String name;

	public String getGenreId() {
		return genreId;
	}

	public void setGenreId(String genreId) {
		this.genreId = genreId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return "[genreId=" + genreId + ", name=" + name + "]";
	}	
}
