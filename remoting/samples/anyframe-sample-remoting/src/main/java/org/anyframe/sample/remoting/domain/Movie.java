/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.sample.remoting.domain;

import java.io.Serializable;
import java.math.BigDecimal;

public class Movie implements Serializable {

	private static final long serialVersionUID = 1L;

	private String movieId = "";

	private String title = "";

	private String director = "";

	private byte[] posterImg = null;

	private int intVal = 0;

	private long longVal = 0;

	private short shortVal = 0;

	private float floatVal = 0;

	private double doubleVal = 0;

	private BigDecimal bdVal = new BigDecimal(0);

	// private char charVal = 'c';

	private boolean booleanVal = false;

	private Character characterVal = 'c';

	// default constructor
	public Movie() {
	}

	public Movie(String movidId, String title, String director) {
		this.movieId = movidId;
		this.title = title;
		this.director = director;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public byte[] getPosterImg() {
		return posterImg;
	}

	public void setPosterImg(byte[] posterImg) {
		this.posterImg = posterImg;
	}

	public String getMovieId() {
		return movieId;
	}

	public void setMovieId(String movieId) {
		this.movieId = movieId;
	}

	public int getIntVal() {
		return intVal;
	}

	public void setIntVal(int intVal) {
		this.intVal = intVal;
	}

	public long getLongVal() {
		return longVal;
	}

	public void setLongVal(long longVal) {
		this.longVal = longVal;
	}

	public short getShortVal() {
		return shortVal;
	}

	public void setShortVal(short shortVal) {
		this.shortVal = shortVal;
	}

	public float getFloatVal() {
		return floatVal;
	}

	public void setFloatVal(float floatVal) {
		this.floatVal = floatVal;
	}

	public double getDoubleVal() {
		return doubleVal;
	}

	public void setDoubleVal(double doubleVal) {
		this.doubleVal = doubleVal;
	}

	public BigDecimal getBdVal() {
		return bdVal;
	}

	public void setBdVal(BigDecimal bdVal) {
		this.bdVal = bdVal;
	}

	// public char getCharVal() {
	// return charVal;
	// }
	//
	// public void setCharVal(char charVal) {
	// this.charVal = charVal;
	// }

	public boolean isBooleanVal() {
		return booleanVal;
	}

	public void setBooleanVal(boolean booleanVal) {
		this.booleanVal = booleanVal;
	}

	public Character getCharacterVal() {
		return characterVal;
	}

	public void setCharacterVal(Character characterVal) {
		this.characterVal = characterVal;
	}
}
