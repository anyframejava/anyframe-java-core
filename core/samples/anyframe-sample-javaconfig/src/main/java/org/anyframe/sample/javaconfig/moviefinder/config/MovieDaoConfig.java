package org.anyframe.sample.javaconfig.moviefinder.config;

import org.anyframe.sample.javaconfig.moviefinder.service.impl.MovieDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
//@ImportResource("classpath:/spring/context-*.xml")
public class MovieDaoConfig {

	@Bean
	public MovieDao movieDao() {
		MovieDao movieDao = new MovieDao();
		return movieDao;
	}
}
