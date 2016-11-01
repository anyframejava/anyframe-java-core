package org.anyframe.sample.profile.configuration;

import org.anyframe.sample.domain.Movie;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

public class ProfileConfig {
	
	@Profile("Dev")
	@Bean(name="movie")
	public Movie getDevMovie(){
		Movie movie = new Movie();
		movie.setTitle("Dev");
		return movie;
	}
	
	@Profile("Prod")
	@Bean(name="movie")
	public Movie getProdMovie(){
		Movie movie = new Movie();
		movie.setTitle("Prod");
		return movie;
	}
	
	@Bean(name="movie")
	public Movie getDefaultMovie(){
		Movie movie = new Movie();
		movie.setTitle("Default");
		return movie;
	}
		
}
