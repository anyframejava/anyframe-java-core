package org.anyframe.sample.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * This Movie class is a Value Object class for Movie domain.
 * 
 * @author Sooyeon Park
 */
public class Movie implements Serializable {

	private static final long serialVersionUID = 1L;

	private String movieId;

	private String title = "";

	private String director;

	private Genre genre;

	private String actors;

	private Long runtime;

	private Date releaseDate;

	private Float ticketPrice;

	private String posterFile;

	private String nowPlaying = "Y";

	public Movie() {
	}

	public Movie(String movieId, String title, String director, Genre genre,
			Date releaseDate, Float ticketPrice, String actors, Long runtime,
			String nowPlaying, String posterFile) {
		this.movieId = movieId;
		this.title = title;
		this.director = director;
		this.genre = genre;
		this.releaseDate = releaseDate;
		this.ticketPrice = ticketPrice;
		this.actors = actors;
		this.runtime = runtime;
		this.nowPlaying = nowPlaying;
		this.posterFile = posterFile;
	}

	public Movie(String movieId, String title, String director, Genre genre,
			Date releaseDate, Float ticketPrice, String actors, Long runtime,
			String nowPlaying) {
		this(movieId, title, director, genre, releaseDate, ticketPrice, actors,
				runtime, nowPlaying, "");
	}

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

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public Float getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(Float ticketPrice) {
		this.ticketPrice = ticketPrice;
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
		String genreId = "";
		if (genre != null) {
			genreId = genre.getGenreId();
		}
		return "[actors=" + actors + ", director=" + director + ", movieId="
				+ movieId + ", nowPlaying=" + nowPlaying + ", \nposterFile="
				+ posterFile + ", releaseDate=" + releaseDate + ", runtime="
				+ runtime + ", ticketPrice=" + ticketPrice + ", \ntitle="
				+ title + ", genreId=" + genreId + "]";
	}
}
