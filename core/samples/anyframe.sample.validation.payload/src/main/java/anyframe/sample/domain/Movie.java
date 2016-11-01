package anyframe.sample.domain;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import anyframe.sample.validation.constraint.Severity;

public class Movie implements Serializable {

	private static final long serialVersionUID = 1L;

	private String movieId;

	@NotNull(payload = Severity.Error.class)
	@Size(min = 1, max = 50, payload = Severity.Warning.class)
	private String title = "";

	@NotNull(payload = Severity.Error.class)
	@Size(min = 1, max = 50, payload = Severity.Warning.class)
	private String director;

	@NotNull
	@Size(min = 5, max = 100)
	private String actors;

	@DecimalMax(value = "180")
	@Digits(integer = 3, fraction = 0)
	private int runtime;

	@Future
	private Date releaseDate;

	@Digits(integer = 5, fraction = 0)
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
