package org.anyframe.plugin.simpleweb.jquery.domain;

import java.io.Serializable;

public class Genre implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9048026782797973222L;

	private String genreId;
	
	private String name;

	private String state;
	
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

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

}
