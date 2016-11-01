/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.sample.remoting.hessian;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.remoting.ServerRunner;
import org.anyframe.sample.remoting.domain.Movie;
import org.anyframe.sample.remoting.moviefinder.service.MovieService;
import org.anyframe.sample.remoting.server.JettyServer;
import org.anyframe.sample.remoting.server.ServerInfo;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : HessianSpringSupportTest <br>
 * <br>
 * [Description] : This TestCase defines scenarios to test service function by
 * implementing Hessian based Movie service with Spring setup. <br>
 * [Characteristic] <li>HTTP lightweight remote service provided by Caucho
 * Technology</li> <li>RMI's Firewall Issue resolution</li> <li>Suitable to use
 * in memory/storage limited environment (Applet/Wireless device)</li> <li>
 * Constraints Existing- Existing- A Complicated data model is not sufficient
 * with its own serialization mechanism rather than Java Standard Serialization
 * mechanism.</li> <li>Server implementation:
 * org.springframework.remoting.caucho.BurlapServiceExporter class provided by
 * Spring is used to easily expose ordinary service written in Spring Bean as
 * Burlap Service and set up HTTP based Burlap controller with Spring MVC</li>
 * <li>Client implementation: The use of
 * org.springframework.remoting.caucho.HessianProxyFactoryBean class provided by
 * Spring</li> <br>
 * [Assumption] <li>-Server : JettyServer Use, Spring Configuration file use</li>
 * <li>-Client : RemotingSpringTestCase USe, Spring Configuration file use</li> <br>
 * [Main Flow] <li>#-1 Positive Case : To search the whole list in the form of
 * List</li> <li>#-2 Positive Case : To search the whole list in the form of Map
 * </li> <li>#-3 Positive Case : To search Movie</li> <li>#-4 Positive Case : To
 * create a new Movie</li> <li>#-5 Positive Case : To change Movie information</li>
 * <li>#-6 Positive Case : To remove Movie</li>
 * 
 * @author SooYeon Park
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/hessian/client/context-*.xml" })
public class HessianSpringSupportTest extends ServerRunner {

	// ==============================================================
	// ====== Pre-job Definition necessary for TestCase Execution====
	// ==============================================================

	@Inject
	@Named("movieServiceClient")
	private MovieService movieServiceClient;

	@Before
	public void onSetUpServer() throws Exception{
		this.setServer(new JettyServer());
		ServerInfo serverInfo = new ServerInfo();
		serverInfo.setPort(9002);
		serverInfo.setWarpath("src/test/resources/hessian/server");
		this.getServer().setServerInfo(serverInfo);
		super.onSetUp();
	}

	@After
	public void onTearDownServer() throws Exception{
		super.onTearDown();
	}

	// ==============================================================
	// ====== TestCase methods ======================================
	// ==============================================================

	/**
	 * [Flow #-1] Positive Case : To search the whole list in the form of List
	 * 
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testFindMovieListAll() throws Exception {
		// 1. find movie list all
		List<Movie> movieList = movieServiceClient.findMovieListAll();

		// 2. check the movie list count
		assertEquals(2, movieList.size());
	}

	/**
	 * [Flow #-2] Positive Case : To search the whole list in the form of Map
	 * 
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testFindMovieMapAll() throws Exception {
		// 1. find movie map all
		Map<String, Movie> movieMap = movieServiceClient.findMovieMapAll();

		// 2. check the movie map count
		assertEquals(2, movieMap.size());
	}

	/**
	 * [Flow #-3] Positive Case : To search Movie whose I.D. is “001”
	 * 
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testFindMovie() throws Exception {
		// 1. find movie
		Movie movie = movieServiceClient.findMovie("001");

		// 2. check the movie information
		assertEquals("The Sound Of Music", movie.getTitle());
		assertEquals("Robert Wise", movie.getDirector());
	}

	/**
	 * [Flow #-4] Positive Case : To create a new Movie whose I.D. is “003”
	 * 
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testCreateMovie() throws Exception {
		// 1. check the existing movie list count
		assertEquals(2, movieServiceClient.findMovieListAll().size());

		// 2. create new movie
		movieServiceClient.createMovie(new Movie("003", "Life Is Beautiful",
				"Roberto Benigni"));

		// 3. check the new movie list count
		assertEquals(3, movieServiceClient.findMovieListAll().size());

		// 4. check the new movie information
		Movie movie = movieServiceClient.findMovie("003");
		assertEquals("Life Is Beautiful", movie.getTitle());
		assertEquals("Roberto Benigni", movie.getDirector());
	}

	/**
	 * [Flow #-5] Positive Case : To change existing Movie information whose
	 * I.D. is “002”
	 * 
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testUpdateMovie() throws Exception {
		// 1. update movie
		movieServiceClient.updateMovie(new Movie("002", "Life Is Wonderful",
				"Roberto"));

		// 2. find updated movie
		Movie movie = movieServiceClient.findMovie("002");

		// 3. check the movie information
		assertEquals("Life Is Wonderful", movie.getTitle());
		assertEquals("Roberto", movie.getDirector());
	}

	/**
	 * [Flow #-6] Positive Case : To remove existing Movie whose I.D. is “002”
	 * 
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testRemoveMovie() throws Exception {
		// 1. set movie id to remove
		Movie movie = new Movie();
		movie.setMovieId("002");

		// 2. remove the movie
		movieServiceClient.removeMovie(movie);

		// 3. check the removed movie info
		assertNull(movieServiceClient.findMovie("002"));
	}
}
