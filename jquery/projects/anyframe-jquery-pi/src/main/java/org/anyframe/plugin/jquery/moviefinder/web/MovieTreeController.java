/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.plugin.jquery.moviefinder.web;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.moviefinder.domain.Genre;
import org.anyframe.plugin.jquery.moviefinder.domain.Movie;
import org.anyframe.plugin.jquery.jstree.Attributes;
import org.anyframe.plugin.jquery.jstree.JSTreeNode;
import org.anyframe.plugin.jquery.moviefinder.service.GenreService;
import org.anyframe.plugin.jquery.moviefinder.service.MovieFinder;
import org.anyframe.plugin.jquery.moviefinder.service.MovieSearchVO;
import org.anyframe.plugin.jquery.moviefinder.service.MovieService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This MovieFinderTreeController class is a Controller class to provide movie
 * list and genre list functionality.
 * 
 * @author Sunjoong Kim
 */

@Controller("jqueryMovieTreeController")
@RequestMapping("/jqueryMovieTree.do")
public class MovieTreeController {

	@Inject
	@Named("jqueryGenreService")
	private GenreService genreService;

	@Inject
	@Named("jqueryMovieFinder")
	private MovieFinder movieFinder;

	@Inject
	@Named("jqueryMovieService")
	private MovieService movieService;

	@ModelAttribute("genreList")
	public Collection<Genre> populateGenreList() throws Exception {
		return genreService.getDropDownGenreList();
	}

	@RequestMapping(params = "method=treeView")
	public String treeView(Movie movie, Model model) {
		model.addAttribute("movie", movie);
		return "jquery/moviefinder/movie/tree";
	}

	@RequestMapping(params = "method=tree")
	public String tree(@RequestParam("id") String id, MovieSearchVO search,
			Model model) throws Exception {
		List<JSTreeNode> nodeList = buildTree(id, search);
		model.addAttribute("JSTreeNodeList", nodeList);
		return "jsonView";
	}

	@RequestMapping(params = "method=getGenre")
	public String getGenre(@RequestParam("genreId") String genreId, Model model)
			throws Exception {
		Genre genre = genreService.getGenre(genreId);
		model.addAttribute("genre", genre);
		return "jsonView";
	}

	@RequestMapping(params = "method=get")
	public String getMovie(@RequestParam("movieId") String movieId, Model model)
			throws Exception {
		Movie movie = movieService.get(movieId);
		model.addAttribute("movie", movie);
		return "jsonView";
	}

	@RequestMapping(params = "method=remove")
	public String removeMovie(@RequestParam("movieId") String movieId)
			throws Exception {
		movieService.remove(movieId);
		return "jsonView";
	}

	@RequestMapping(params = "method=getGenreNameList")
	public String listGenreName(@RequestParam("term") String keyword,
			Model model) throws Exception {
		List<String> genres = genreService.getGenreNameList(keyword);
		model.addAttribute("autoData", genres);
		return "jsonView";
	}

	private List<JSTreeNode> buildTree(String id, MovieSearchVO search)
			throws Exception {
		JSTreeNode node = null;
		Attributes attribute = null;
		List<?> jsTreeList = null;
		List<JSTreeNode> nodeList = new ArrayList<JSTreeNode>();

		if (id.equals("0")) {
			// If id equals to "0", it means jsTree need a list of genre to
			// generate its root. (root is a genre in this sample)
			jsTreeList = genreService.getGenreList(search);
			for (int i = 0; i < jsTreeList.size(); i++) {
				Genre genre = (Genre) jsTreeList.get(i);
				node = new JSTreeNode();
				attribute = new Attributes();

				attribute.setId(genre.getGenreId());

				node.setAttr(attribute);
				node.setData(genre.getName());
				// if the value of state is "closed", jsTree generates an
				// expendable button on the left of its folder image.
				node.setState(genre.getState());
				if (genre.getState() == null || "".equals(genre.getState()))
					attribute.setRel("lockedroot");
				else
					attribute.setRel("root");
				nodeList.add(node);
			}
		} else {
			/*
			 * If id does not equal to "0", it means jsTree need a leaf data of
			 * the selected root. (In this case, id is one of genres id, not
			 * "0") The leaf data is a list of movie.
			 */
			jsTreeList = movieFinder.getListByCategory(search);
			if (jsTreeList.size() > 0) {
				for (int i = 0; i < jsTreeList.size(); i++) {
					Movie movie = (Movie) jsTreeList.get(i);

					node = new JSTreeNode();
					attribute = new Attributes();

					attribute.setId(movie.getMovieId());
					attribute.setRel("leaf");
					node.setAttr(attribute);
					node.setData(movie.getTitle());
					nodeList.add(node);
				}
			}
		}
		return nodeList;
	}
}
