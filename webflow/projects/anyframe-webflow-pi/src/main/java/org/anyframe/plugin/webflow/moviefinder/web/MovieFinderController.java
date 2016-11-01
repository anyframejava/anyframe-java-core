package org.anyframe.plugin.webflow.moviefinder.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.webflow.domain.Movie;
import org.anyframe.plugin.webflow.moviefinder.service.MovieFinder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("webflowMovieFinderController")
@RequestMapping("/webflowMovieFinder.do")
public class MovieFinderController {

	@Inject
	@Named("webflowMovieFinder")
	private MovieFinder movieFinder;

	@RequestMapping(params = "method=list")
	public String list(
			@RequestParam(value = "pageIndex", defaultValue = "1") int pageIndex,
			Movie movie, BindingResult result, Model model) throws Exception {

		Page resultPage = movieFinder.getPagingList(movie, pageIndex);

		model.addAttribute("movie", movie);
		model.addAttribute("movies", resultPage.getList());
		model.addAttribute("resultPage", resultPage);

		return "webflow/moviefinder/movie/list";
	}
}
