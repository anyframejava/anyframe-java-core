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
package org.anyframe.sample.validation.groups.domain;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.anyframe.sample.validation.groups.constraint.Draft;
import org.anyframe.sample.validation.groups.constraint.Playing;

/**
 * This Movie class is a Value Object class for Movie domain.
 * 
 * @author Jeryeon Kim
 */
public class Movie implements Serializable {

	private static final long serialVersionUID = 1L;

	private String movieId;

	@NotNull(groups = { Draft.class, Playing.class })
	@Size(min = 1, max = 50, groups = { Draft.class, Playing.class })
	private String title = "";

	@NotNull(groups = { Draft.class, Playing.class })
	@Size(min = 1, max = 50, groups = { Draft.class, Playing.class })
	private String director;

	@NotNull(groups = { Draft.class, Playing.class })
	@Size(min = 5, max = 100, groups = { Draft.class, Playing.class })
	private String actors;

	@DecimalMax(value = "180", groups = Playing.class)
	@Digits(integer = 3, fraction = 0, groups = Playing.class)
	private int runtime;

	@Future(groups = Playing.class)
	private Date releaseDate;

	@Digits(integer = 5, fraction = 0, groups = Playing.class)
	private int ticketPrice;

	private String posterFile;

	private String nowPlaying = "Y";

	public String getMovieId() {
		return movieId;
	}

	public void setMovieId(String movieId) {
		this.movieId = movieId;
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

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public int getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(int ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public String getActors() {
		return actors;
	}

	public void setActors(String actors) {
		this.actors = actors;
	}

	public int getRuntime() {
		return runtime;
	}

	public void setRuntime(int runtime) {
		this.runtime = runtime;
	}

	public String getNowPlaying() {
		return nowPlaying;
	}

	public void setNowPlaying(String nowPlaying) {
		this.nowPlaying = nowPlaying;
	}

	public String getPosterFile() {
		return posterFile;
	}

	public void setPosterFile(String posterFile) {
		this.posterFile = posterFile;
	}

	@Override
	public String toString() {
		return "[actors=" + actors + ", director=" + director + ", movieId="
				+ movieId + ", nowPlaying=" + nowPlaying + ", \nposterFile="
				+ posterFile + ", releaseDate=" + releaseDate + ", runtime="
				+ runtime + ", ticketPrice=" + ticketPrice + ", \ntitle="
				+ title + "]";
	}
}
