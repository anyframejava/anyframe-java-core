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
package org.anyframe.sample.cxf.jaxws.moviefinder.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.activation.DataHandler;
import javax.inject.Inject;
import javax.inject.Named;
import javax.mail.util.ByteArrayDataSource;

import org.anyframe.sample.cxf.jaxws.domain.Category;
import org.anyframe.sample.cxf.jaxws.domain.Country;
import org.anyframe.sample.cxf.jaxws.domain.Movie;
import org.anyframe.sample.cxf.jaxws.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;

@Service("cxfJaxWsMovieService")
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("cxfJaxWsMovieDao")
	private MovieDao movieDao;

	public MovieServiceImpl() {
		movieDao = new MovieDao();
	}

	public List<Movie> findMovieListAll() throws Exception {
		return this.movieDao.findMovieListAll();
	}

	public Map<String, Movie> findMovieMapAll() throws Exception {
		return this.movieDao.findMovieMapAll();
	}

	public List<Movie> findMovieList(Country country, Category category)
			throws Exception {
		return this.movieDao.findMovieList(country, category);
	}

	public Movie findMovie(String movieId) throws Exception {
		return this.movieDao.fineMovie(movieId);
	}

	public void createMovie(Movie movie) throws Exception {
		this.movieDao.createMovie(movie);
	}

	public void updateMovie(Movie movie) throws Exception {
		MovieService.LOGGER.debug("Received the poster image of this movie.");
		if (movie.getPosterImgByteArray() != null) {
			MovieService.LOGGER
					.debug("The poster image size (using ByteArray) is "
							+ movie.getPosterImgByteArray().length);
		}
		if (movie.getPosterImgMTOM() != null) {
			InputStream mtomIn = movie.getPosterImgMTOM().getInputStream();
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			copy(mtomIn, out);
			MovieService.LOGGER.debug("The poster image size (using MTOM) is "
					+ out.size());
			movie.setPosterImgDataHandler(new DataHandler(
					new ByteArrayDataSource(out.toByteArray(), movie
							.getPosterImgMTOM().getContentType())));
		}

		this.movieDao.updateMovie(movie);
	}

	public int copy(final InputStream input, final OutputStream output)
			throws IOException {
		final byte[] buffer = new byte[4096];
		int n = 0;
		n = input.read(buffer);
		int total = 0;
		while (-1 != n) {
			output.write(buffer, 0, n);
			total += n;
			n = input.read(buffer);
		}
		return total;
	}

	public void removeMovie(Movie movie) throws Exception {
		this.movieDao.removeMovie(movie);
	}

	// ================= method for Annotation tests
	public void testAnnotationMethodExclude() {
		MovieService.LOGGER
				.debug("testAnnotationMethodExclude method is called.");
	}

	public void testAnnotationMethod() {
		MovieService.LOGGER.info("testAnnotationMethod method is called.");
	}

	public String testAnnotationOneWay() {
		MovieService.LOGGER.debug("testAnnotationOneWay method is called.");
		return "testAnnotationOneWay";
	}

	public String testAnnotationWebParam(String input) {
		MovieService.LOGGER
				.debug("testAnnotationWebParam method is called with the input parameter="
						+ input);
		return "testAnnotationWebParam";
	}

	// ================= method for Type tests
	public int testMovieIntVal(int val) {
		Movie movie = new Movie();
		movie.setIntVal(val);
		return movie.getIntVal();
	}

	public long testMovieLongVal(long val) {
		Movie movie = new Movie();
		movie.setLongVal(val);
		return movie.getLongVal();
	}

	public short testMovieShortVal(short val) {
		Movie movie = new Movie();
		movie.setShortVal(val);
		return movie.getShortVal();
	}

	public float testMovieFloatVal(float val) {
		Movie movie = new Movie();
		movie.setFloatVal(val);
		return movie.getFloatVal();
	}

	public double testMovieDoubleVal(double val) {
		Movie movie = new Movie();
		movie.setDoubleVal(val);
		return movie.getDoubleVal();
	}

	public BigDecimal testMovieBigDecimalVal(BigDecimal val) {
		Movie movie = new Movie();
		movie.setBdVal(val);
		return movie.getBdVal();
	}

	public boolean testMovieBooleanVal(boolean val) {
		Movie movie = new Movie();
		movie.setBooleanVal(val);
		return movie.isBooleanVal();
	}

	public Character testMovieCharacterVal(Character val) {
		Movie movie = new Movie();
		movie.setCharacterVal(val);
		return movie.getCharacterVal();
	}

	public char testMovieCharVal(char val) {
		Movie movie = new Movie();
		movie.setCharVal(val);
		return movie.getCharVal();
	}

}
