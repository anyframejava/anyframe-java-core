/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.plugin.struts.moviefinder.web.form;

import org.anyframe.plugin.struts.domain.Genre;
import org.anyframe.struts.action.DefaultForm;
import org.apache.struts.upload.FormFile;

/**
 * This MovieForm class is a form class to provide movie functionality.
 * 
 * @author Hyunjung Jeong
 */
public class MovieForm extends DefaultForm {
	private static final long serialVersionUID = 1L;

	private String movieId;
	private String title = "";
	private String director;
	private Genre genre = new Genre();
	private String actors;
	private Long runtime;
	private String releaseDate;
	private Float ticketPrice;
	private String nowPlaying;
	private String posterFile;
	private FormFile realPosterFile;

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

	public Genre getGenre() {
		return genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}

	public String getActors() {
		return actors;
	}

	public void setActors(String actors) {
		this.actors = actors;
	}

	public Long getRuntime() {
		return runtime;
	}

	public void setRuntime(Long runtime) {
		this.runtime = runtime;
	}

	public String getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}

	public Float getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(Float ticketPrice) {
		this.ticketPrice = ticketPrice;
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

	public FormFile getRealPosterFile() {
		return realPosterFile;
	}

	public void setRealPosterFile(FormFile realPosterFile) {
		this.realPosterFile = realPosterFile;
	}

	public String toString() {
		StringBuilder sb = new StringBuilder(getClass().getSimpleName());

		sb.append(" [");
		sb.append("MovieId").append("='").append(getMovieId()).append("', ");
		sb.append("Title").append("='").append(getTitle()).append("', ");
		sb.append("Director").append("='").append(getDirector()).append("', ");
		sb.append("Actors").append("='").append(getActors()).append("', ");
		sb.append("GenreId").append("='").append(getGenre().getGenreId()).append(";, ");
		sb.append("ReleaseDate").append("='").append(getReleaseDate()).append("', ");
		sb.append("NowPlaying").append("='").append(getNowPlaying()).append("', ");
		sb.append("TicketPrice").append("='").append(getTicketPrice()).append("', ");
		sb.append("Runtime").append("='").append(getRuntime()).append("', ");
		sb.append("PosterFile").append("='").append(getPosterFile()).append("', ");
		sb.append("]");

		return sb.toString();
	}

}
