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
package org.anyframe.transaction.programmatic;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.domain.Genre;
import org.anyframe.sample.domain.Movie;
import org.anyframe.sample.transaction.moviefinder.service.MovieService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

/**
 * This class is test case class for programmatic Transaction Service.
 * 
 * @author Soyon Lim
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
		"classpath*:spring/integration/common/context-annotation.xml",
		"classpath*:spring/integration/common/context-message.xml",
		"classpath*:spring/integration/datasource/context-transaction.xml" })
public class ProgrammaticTransactionManagementTest {

	@Inject
	@Named("txMovieService")
	private MovieService movieService;

	@Inject
	private TransactionTemplate transactionTemplate;

	@Inject
	private PlatformTransactionManager transactionService;

	private String newMovieID = "";

	@Test
	public void testAddMovieUsingTransactionTemplate() throws Exception {

		transactionTemplate.execute(new TransactionCallbackWithoutResult() {
			public void doInTransactionWithoutResult(TransactionStatus status) {

				try {
					Movie newMovie = getMovie();
					newMovieID = newMovie.getMovieId();

					movieService.create(newMovie);
					movieService.create(newMovie);
				} catch (Exception e) {
					status.setRollbackOnly();
				}
			}
		});

		try {
			movieService.get(newMovieID);
			fail("fail to transaction management.");
		} catch (Exception e) {
			assertTrue("fail to rollback.", e instanceof Exception);
		}
	}

	public void testAddMovieUsingTransactionManager() throws Exception {
		DefaultTransactionDefinition txDefinition = new DefaultTransactionDefinition();
		txDefinition
				.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionService
				.getTransaction(txDefinition);

		String newMovidId = "";

		try {
			Movie newMovie = getMovie();
			newMovidId = newMovie.getMovieId();

			movieService.create(newMovie);
			movieService.create(newMovie);

			transactionService.commit(status);
		} catch (Exception e) {
			transactionService.rollback(status);
		}

		try {
			movieService.get(newMovidId);
			fail("fail to transaction management.");
		} catch (Exception e) {
			assertTrue("fail to rollback.", e instanceof Exception);
		}
	}

	private Movie getMovie() throws Exception {
		Genre genre = new Genre();
		genre.setGenreId("GR-03");

		Movie movie = new Movie();
		movie.setMovieId("MV-" + System.currentTimeMillis());
		movie.setTitle("Shrek (2001)");
		movie.setActors("Shrek");
		movie.setDirector("Andrew Adamson");
		movie.setGenre(genre);
		movie.setReleaseDate(new Date());
		movie.setRuntime(new Long(90));
		movie.setTicketPrice(new Float(8000));
		movie.setNowPlaying("N");

		return movie;
	}
}
