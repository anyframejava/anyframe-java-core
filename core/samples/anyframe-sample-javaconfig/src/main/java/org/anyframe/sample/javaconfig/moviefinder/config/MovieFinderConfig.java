package org.anyframe.sample.javaconfig.moviefinder.config;

import org.anyframe.sample.javaconfig.moviefinder.service.MovieFinder;
import org.anyframe.sample.javaconfig.moviefinder.service.impl.MovieDao;
import org.anyframe.sample.javaconfig.moviefinder.service.impl.MovieFinderImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Lazy;

@Configuration
@Import(value = { MovieDaoConfig.class })
public class MovieFinderConfig {
	@Autowired
	private MovieDao movieDao;

	@Bean(initMethod = "initialize", destroyMethod = "destroy")
	@Lazy(value = false)
	public MovieFinder movieFinder() {
		return new MovieFinderImpl(movieDao);
	}
}
