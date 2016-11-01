package anyframe.sample.javaconfig.service.impl;

import java.util.ArrayList;
import java.util.List;

import anyframe.core.idgen.IIdGenerationService;
import anyframe.sample.domain.Movie;

public class MovieDao {
	private IIdGenerationService idGenService;

	public MovieDao() {
		System.out.println("Calling constructor of MovieDao");
	}
	
	public void setIIdGenerationService(IIdGenerationService idGenService) {
		this.idGenService = idGenService;
	}

	public List<Movie> getPagingList(Movie movie, int pageIndex) throws Exception {
		Movie result = new Movie();
		
		result.setMovieId(idGenService.getNextStringId());
		result.setTitle("Alice in Wonderland");
		result.setDirector("Tim Burton");
		
		List<Movie> resultList = new ArrayList<Movie>();
		resultList.add(result);
		return resultList;
	}

}
