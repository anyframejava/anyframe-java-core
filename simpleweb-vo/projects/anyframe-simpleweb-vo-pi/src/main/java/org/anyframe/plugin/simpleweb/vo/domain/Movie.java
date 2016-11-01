package org.anyframe.plugin.simpleweb.vo.domain;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

public class Movie implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String movieId;
	
	private String keyword = "";

	@Size(min = 1, max = 50)
	private String title = "";

	@Size(min = 1, max = 50)
	private String director;

	private Genre genre = new Genre();

	@Size(min = 5, max = 100)
	private String actors;

	@DecimalMax(value = "180")
	private Long runtime;

	@DateTimeFormat(iso = ISO.DATE)
	@Past
	private Date releaseDate;

	@NumberFormat(pattern = "#,###")
	@Digits(integer = 5, fraction = 0)
	private Float ticketPrice;
	
	private String state;

	private String nowPlaying = "Y";
	
	private String filePaths;
	
	public void setFilePaths(String filePaths){
		this.filePaths = filePaths;
	}
	
	public String getFilePaths() {
		return filePaths;
	}
 
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getKeywordh() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
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
         return this.nowPlaying;
    }

     public void setNowPlaying(String nowPlaying) {
         if(nowPlaying == null) {        
              nowPlaying = "N";          
         }                               
         this.nowPlaying = nowPlaying;
    }

}
