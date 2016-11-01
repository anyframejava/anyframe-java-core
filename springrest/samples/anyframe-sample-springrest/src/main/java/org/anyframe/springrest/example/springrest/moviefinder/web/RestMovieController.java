package org.anyframe.springrest.example.springrest.moviefinder.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.springrest.example.springrest.domain.Movie;
import org.anyframe.springrest.example.springrest.exception.NotFoundException;
import org.anyframe.springrest.example.springrest.moviefinder.service.MovieService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restmovies")
public class RestMovieController {

	@Inject
	@Named("springrestMovieService")
	private MovieService movieService;

	/**
	 * Generate response
	 * 
	 * @param movie
	 *            with @RequestBody
	 * @return return Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(value = "/{movieId}")
	public void update(@RequestBody Movie updateMovie) throws Exception {
		this.movieService.update(updateMovie);
	}

	/**
	 * Generate response
	 * 
	 * @param movie
	 *            with @RequestBody
	 * @return return Movie ID, Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(method = RequestMethod.POST)
	public String create(@RequestBody Movie movie) throws Exception {
		this.movieService.create(movie);

		return movie.getMovieId();
	}

	/**
	 * Generate response
	 * 
	 * @param movieId
	 * @return return Movie object, Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(value = "/{movieId}", method = RequestMethod.GET)
	public Movie get(@PathVariable String movieId) throws Exception {
		Movie movie = this.movieService.get(movieId);
		
		if (movie == null) {
			throw new NotFoundException("Resource Not Found with movieId "
					+ movieId);
		}
		
		return movie;
	}
	
	/**
	 * Generate response
	 * 
	 * @param movieId
	 * @return return Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(value="/{movieId}", method=RequestMethod.DELETE)
	public String remove(@PathVariable String movieId) throws Exception  {
		this.movieService.remove(movieId);
		
		return "removed";
	}
}
