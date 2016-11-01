package org.anyframe.sample.di.provider.moviefinder.domain;

import java.io.Serializable;
import java.util.Date;

public class Movie implements Serializable {

	private static final long serialVersionUID = 1L;

	private String movieId;

	private String title = "";

	private String director;

	private String actors;

	private int runtime;

	private Date releaseDate;

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
