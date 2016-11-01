package org.anyframe.sample.conditional.configuration;

import org.anyframe.sample.conditional.condition.DefaultCondition;
import org.anyframe.sample.conditional.condition.DevCondition;
import org.anyframe.sample.conditional.condition.ProdCondition;
import org.anyframe.sample.domain.Movie;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConditionalConfig {
	
	@Conditional(DevCondition.class)
	@Bean(name="movie")
	public Movie getDevMovie(){
		Movie movie = new Movie();
		movie.setTitle("Dev");
		return movie;
	}
	
	@Conditional(ProdCondition.class)
	@Bean(name="movie")
	public Movie getProdMovie(){
		Movie movie = new Movie();
		movie.setTitle("Prod");
		return movie;
	}
	
	@Conditional(DefaultCondition.class)
	@Bean(name="movie")
	public Movie getDefaultMovie(){
		Movie movie = new Movie();
		movie.setTitle("Default");
		return movie;
	}
		
}
