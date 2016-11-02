package org.anyframe.plugin.d3js.web;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.d3js.domain.Genre;
import org.anyframe.plugin.d3js.domain.Movie;
import org.anyframe.plugin.d3js.service.GenreService;
import org.anyframe.plugin.d3js.service.MovieService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Collection;

@Controller("d3jsMovieController")
@RequestMapping("/d3jsMovie.do")
@SessionAttributes(types = Movie.class)
public class MovieController {

    @Inject
    @Named("d3jsMovieService")
    private MovieService movieService;

    @Inject
    @Named("d3jsGenreService")
    private GenreService genreService;

    @ModelAttribute("genreList")
    public Collection<Genre> populateGenreList() throws Exception {
        return genreService.getList();
    }

    @RequestMapping(params = "method=createView")
    public String createView(Model model) throws Exception {
        model.addAttribute(new Movie());
        return "d3js/moviefinder/form";
    }

    @RequestMapping(params = "method=create")
    public String create(@Valid Movie movie, BindingResult results,
                         SessionStatus status, HttpSession session) throws Exception {
        if (results.hasErrors()) {
            return "d3js/moviefinder/form";
        }

        movieService.create(movie);
        status.setComplete();

        return "redirect:/queryMovieFinder.do?method=list";
    }

    @RequestMapping(params = "method=get")
    public String get(@RequestParam("movieId") String movieId, Model model)
            throws Exception {
        Movie movie = movieService.get(movieId);
        if (movie == null) {
            throw new Exception("Resource not found " + movieId);
        }
        model.addAttribute(movie);

        return "d3js/moviefinder/form";
    }

    @RequestMapping(params = "method=update")
    public String update(@Valid Movie movie, BindingResult results,
                         SessionStatus status) throws Exception {
        if (results.hasErrors()) {
            return "d3js/moviefinder/form";
        }

        movieService.update(movie);
        status.setComplete();

        return "d3js/moviefinder/list";
    }

    @RequestMapping(params = "method=remove")
    public String remove(@RequestParam("movieId") String movieId)
            throws Exception {
        movieService.remove(movieId);
        return "d3js/moviefinder/list";
    }

    @RequestMapping(params = "method=list")
    public String list(
            @RequestParam(value = "pageIndex", defaultValue = "1") int pageIndex,
            Movie movie, BindingResult result, Model model) throws Exception {

        Page resultPage = movieService.getPagingList(movie, pageIndex);

        model.addAttribute("movie", movie);
        model.addAttribute("movies", resultPage.getList());
        model.addAttribute("resultPage", resultPage);

        //return  "jsonView";
        return "d3js/moviefinder/list";
    }
}

