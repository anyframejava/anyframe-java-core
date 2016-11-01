package org.anyframe.logback.logger;

import org.anyframe.plugin.logback.domain.Movie;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;

/**
 * Test case for Logback Logger.
 * 
 * @author Sunghoon Son
 * 
 */
public class LoggerTest {	
	
	static Logger logger = LoggerFactory.getLogger(LoggerTest.class);
	
	
	@Test
	public void testLogger(){
		//1. default logging sample 
		logger.info("the info message");
		logger.error("the error message");
		
		// 2. passing parameter on logging message
		Movie movie = new Movie();
		
		// one param 
		logger.error("Movie Information: movieId={}", movie.getMovieId());
		
		// two params 
		logger.debug("Movie Information: movieId={}, title={}" , movie.getMovieId(), movie.getTitle());
		
		// n parameters
		Object[] params =  new Object[]{movie.getMovieId(), movie.getTitle(), movie.getReleaseDate()};
		logger.info("Movie Information: movieId={}, title={}, releaseDate={}", params);
	
		//3. marker usage
		Marker marker = MarkerFactory.getMarker("MY_MARKER");
		logger.info(marker, "marker example");
		
		//4. throwable usage 
		try{
			
		}catch(Exception ex){
			logger.error("An Exception Occured", ex);
		}
	}
	
}



