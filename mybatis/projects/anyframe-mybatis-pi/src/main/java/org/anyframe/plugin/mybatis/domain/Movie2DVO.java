package org.anyframe.plugin.mybatis.domain;

import java.math.BigDecimal;
import java.sql.Date;

/**
 * @author SDS
 * @voType
 */
public class Movie2DVO{


	private String movieId;

	private String genreId;

	private String title;

	private String director;

	private String actors;

	private BigDecimal runtime;

	private Date releaseDate;

	private BigDecimal ticketPrice;

	private String posterFile;

	private String nowPlaying;

	private String name;

	private BigDecimal c1;
    /**
     * This Genre class is a Value Object class for Genre domain.
     */

	private Genre genre;
	public String getMovieId() {
		return this.movieId;
	}

	public void setMovieId(String movieId) {
		this.movieId = movieId;
	}
	
	public String getGenreId() {
		return this.genreId;
	}

	public void setGenreId(String genreId) {
		this.genreId = genreId;
	}
	
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDirector() {
		return this.director;
	}

	public void setDirector(String director) {
		this.director = director;
	}
	
	public String getActors() {
		return this.actors;
	}

	public void setActors(String actors) {
		this.actors = actors;
	}
	
	public BigDecimal getRuntime() {
		return this.runtime;
	}

	public void setRuntime(BigDecimal runtime) {
		this.runtime = runtime;
	}
	
	public Date getReleaseDate() {
		return this.releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}
	
	public BigDecimal getTicketPrice() {
		return this.ticketPrice;
	}

	public void setTicketPrice(BigDecimal ticketPrice) {
		this.ticketPrice = ticketPrice;
	}
	
	public String getPosterFile() {
		return this.posterFile;
	}

	public void setPosterFile(String posterFile) {
		this.posterFile = posterFile;
	}
	
	public String getNowPlaying() {
		return this.nowPlaying;
	}

	public void setNowPlaying(String nowPlaying) {
		this.nowPlaying = nowPlaying;
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
	
	public Genre getGenre() {
		return this.genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}
	
}