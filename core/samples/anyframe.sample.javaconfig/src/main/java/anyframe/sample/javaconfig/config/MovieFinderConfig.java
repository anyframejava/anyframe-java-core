package anyframe.sample.javaconfig.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.Lazy;

import anyframe.sample.javaconfig.service.MovieFinder;
import anyframe.sample.javaconfig.service.impl.MovieDao;
import anyframe.sample.javaconfig.service.impl.MovieFinderImpl;

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
