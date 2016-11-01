package anyframe.sample.javaconfig.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

import anyframe.core.idgen.IIdGenerationService;
import anyframe.sample.javaconfig.service.impl.MovieDao;

@Configuration
@ImportResource("classpath:/spring/context-*.xml")
public class MovieDaoConfig {
	@Autowired
	private IIdGenerationService idGenService;

	@Bean
	public MovieDao movieDao() {
		MovieDao movieDao = new MovieDao();
		movieDao.setIIdGenerationService(idGenService);
		return movieDao;
	}
}
