package org.anyframe.plugin.mobile.domain;

import java.util.Date;

import javax.validation.constraints.Past;

import org.springframework.format.annotation.DateTimeFormat;

public class Movie {
	
	private String movieId = "";
	private String title = "";
	private String scoreAttendance = "";
	private String scoreNetizen = "";
	private String imageUrl = "";
	private String filmRate = "";
	private String genre = "";
	private String releaseDate = "";
	private int runningTime = 0;
	private String totalAttendance = "";
	private String synopsis = "";
	private String director = "";
	private String actors = "";
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Past
	private Date startDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Past
	private Date endDate;
	
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
	public String getScoreAttendance() {
		return scoreAttendance;
	}
	public void setScoreAttendance(String scoreAttendance) {
		this.scoreAttendance = scoreAttendance;
	}
	public String getScoreNetizen() {
		return scoreNetizen;
	}
	public void setScoreNetizen(String scoreNetizen) {
		this.scoreNetizen = scoreNetizen;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getFilmRate() {
		return filmRate;
	}
	public void setFilmRate(String filmRate) {
		this.filmRate = filmRate;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public String getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}
	public int getRunningTime() {
		return runningTime;
	}
	public void setRunningTime(int runningTime) {
		this.runningTime = runningTime;
	}
	public String getTotalAttendance() {
		return totalAttendance;
	}
	public void setTotalAttendance(String totalAttendance) {
		this.totalAttendance = totalAttendance;
	}
	public String getSynopsis() {
		return synopsis;
	}
	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}
	public String getDirector() {
		return director;
	}
	public void setDirector(String director) {
		this.director = director;
	}
	public String getActors() {
		return actors;
	}
	public void setActors(String actors) {
		this.actors = actors;
	}

	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	@Override
	public String toString() {
		return "MovieVO [movieId=" + movieId + ", title=" + title
				+ ", scoreAttendance=" + scoreAttendance + ", scoreNetizen="
				+ scoreNetizen + ", imageUrl=" + imageUrl + ", filmRate="
				+ filmRate + ", genre=" + genre + ", releaseDate="
				+ releaseDate + ", runningTime=" + runningTime
				+ ", totalAttendance=" + totalAttendance + ", synopsis="
				+ synopsis + ", director=" + director + ", actors=" + actors
				+ ", startDate=" + startDate + ", endDate=" + endDate + "]";
	}
	
}
