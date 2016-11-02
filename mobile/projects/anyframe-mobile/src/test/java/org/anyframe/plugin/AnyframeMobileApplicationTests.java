package org.anyframe.plugin;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.plugin.mobile.domain.Genre;
import org.anyframe.plugin.mobile.domain.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AnyframeMobileApplication.class)
@WebAppConfiguration
public class AnyframeMobileApplicationTests {

	@Test
	public void testRest() throws SQLException {

		RestTemplate restTemplate = new RestTemplate();

		Movie movie = new Movie();
		
		// get
		movie = restTemplate.getForObject("http://localhost:1234/movies/{movieId}",
				Movie.class, "MV-00001");


		// getListWithDate
		List<Movie> list = restTemplate.getForObject("http://localhost:1234/movies?startDate=20100201&endDate=20100301", List.class);
		System.out.println(list.size());

		// update
		movie.setActors("test1115");
		restTemplate.put("http://localhost:1234/movies", movie);

		// insert
		movie.setMovieId("MV-00007");
		movie.setActors("test");
		movie.setDirector("test");
		Genre genre = new Genre();
		genre.setGenreId("GR-01");
		genre.setName("Action");
		movie.setGenre(genre);
		String id = restTemplate.postForObject("http://localhost:1234/movies/create", movie,
				String.class);
		System.out.println(id);

		// delete
		Map<String, String> params = new HashMap<String, String>();
		params.put("movieId", id);
		restTemplate.delete("http://localhost:1234/movies/{movieId}", params);

	}

}
