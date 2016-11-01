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
package org.anyframe.sample.cxf.jaxws;

import java.util.List;
import java.util.Map;

import org.anyframe.sample.cxf.jaxws.client.Client;
import org.anyframe.sample.cxf.jaxws.client.ClientInfo;
import org.anyframe.sample.cxf.jaxws.client.JaxWsClient;
import org.anyframe.sample.cxf.jaxws.domain.Movie;
import org.anyframe.sample.cxf.jaxws.moviefinder.service.MovieService;
import org.anyframe.sample.cxf.jaxws.moviefinder.service.impl.MovieServiceImpl;
import org.anyframe.sample.cxf.jaxws.server.JaxWsServer;
import org.anyframe.sample.cxf.jaxws.server.ServerInfo;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;


/**
 * TestCase Name : JaxWsFrontendServerFactoryTest <br>
 * <br>
 * [Description] : This TestCase defines scenarios to test Movie Web Service function executed via JaxWsServerFactoryBean 
 *                 by using JAX-WS frontend out of two types of frntend models((Simple/JAX-WS) at Apache CXF. 
 * <br>
 * [Characteristic]
 * <li>JAX-WS Frontend Use - Annotation setup is a must and JAX-WS, Web Services standard API is used. </li>
 * <li>Annotation Development - only @WebService() is a must and given that most annotation provides default value, 
 *                              there is no need to develop.</li>
 * <li>Server implementation: in the case of using JAX-WS frontend way, Movie service is easily exposed as 
 *                            Web Service by setting up interface class, implementation class, 
 *                            URL address intypeation of Movie service via JaxWsServerFactoryBean API. </li>
 * <br>
 * [Assumption]
 * <li>-Server : JaxWsServer Use</li>
 * <li>-Client : JaxWsClient Use</li>
 * <br>
 * [Main Flow]
 * <li>#-1  Positive Case : The whole list is searched in the type of List. </li>
 * <li>#-2  Positive Case : The whole list is searched in the type of Map. </li>
 * <li>#-3  Positive Case : Movie is searched. </li>
 * <li>#-4  Positive Case : A new Movie is created. </li>
 * <li>#-5  Positive Case : Movie information is modified. </li>
 * <li>#-6  Positive Case : Movie is deleted. </li> 
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class JaxWsFrontendServerFactoryTest extends ServerRunner {

    // ==============================================================
    // ====== Pre-job definition necessary for TestCase execution ===
    // ==============================================================
    @Before
    public void setUp() throws Exception {
        this.setServer(new JaxWsServer());
        this.getServer().setServerInfo(
            new ServerInfo(MovieService.class, new MovieServiceImpl(),
                "http://localhost:9002/Movie", false));
        super.setUp();
    }

    @After
    public void tearDown() throws Exception {
    	super.tearDown();	
    }	
    
    // ==============================================================
    // ====== TestCase methods ======================================
    // ==============================================================
        
    /**
     * [Flow #-1] Positive Case : The whole list is searched in the type of List. 
     * @throws Exception
     *         throws exception which is from service
     */   
    @Test
    public void testFindMovieListAll() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. find movie list all
        List<Movie> movieList = movieService.findMovieListAll();

        // 2. check the movie list count
        Assert.assertEquals(2, movieList.size());
    }

    /**
     * [Flow #-2] Positive Case : The whole list is searched in the type of Map. 
     * @throws Exception
     *         throws exception which is from service
     */   
    @Test
    public void testFindMovieMapAll() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. find movie map all
        Map<String, Movie> movieMap = movieService.findMovieMapAll();

        // 2. check the movie map count
        Assert.assertEquals(2, movieMap.size());
    }

    /**
     * [Flow #-3] Positive Case : A New Movie whose I.D. is “003” is searched.  
     * @throws Exception
     *         throws exception which is from service
     */   
    @Test
    public void testFindMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. find movie
        Movie movie = movieService.findMovie("001");

        // 2. check the movie information
        Assert.assertEquals("The Sound Of Music", movie.getTitle());
        Assert.assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-4] Positive Case : A New Movie whose I.D. is “003” is created. 
     * @throws Exception
     *         throws exception which is from service
     */  
    @Test
    public void testCreateMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. check the existing movie list count
        Assert.assertEquals(2, movieService.findMovieListAll().size());

        // 2. create new movie
        movieService.createMovie(new Movie("003", "Life Is Beautiful",
            "Roberto Benigni"));

        // 3. check the new movie list count
        Assert.assertEquals(3, movieService.findMovieListAll().size());

        // 4. check the new movie information
        Movie movie = movieService.findMovie("003");
        Assert.assertEquals("Life Is Beautiful", movie.getTitle());
        Assert.assertEquals("Roberto Benigni", movie.getDirector());
    }

    /**
     * [Flow #-5] Positive Case : The existing Movie whose I.D. is “002” is modified. 
     * @throws Exception
     *         throws exception which is from service
     */     
    @Test
    public void testUpdateMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. update movie
        movieService.updateMovie(new Movie("002", "Life Is Wonderful",
            "Roberto"));

        // 2. find updated movie
        Movie movie = movieService.findMovie("002");

        // 3. check the movie information
        Assert.assertEquals("Life Is Wonderful", movie.getTitle());
        Assert.assertEquals("Roberto", movie.getDirector());
    }

    /**
     * [Flow #-6] Positive Case : The existing Movie whose I.D. is “002” is deleted. 
     * @throws Exception
     *         throws exception which is from service
     */  
    @Test 
    public void testRemoveMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. set movie id to remove
        Movie movie = new Movie();
        movie.setMovieId("002");

        // 2. remove the movie
        movieService.removeMovie(movie);

        // 3. check the removed movie info
        Assert.assertNull(movieService.findMovie("002"));
    }

}
