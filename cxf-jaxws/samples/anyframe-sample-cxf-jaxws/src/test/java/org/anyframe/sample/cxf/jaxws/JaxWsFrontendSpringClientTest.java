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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.cxf.jaxws.domain.Movie;
import org.anyframe.sample.cxf.jaxws.moviefinder.service.MovieService;
import org.anyframe.sample.cxf.jaxws.server.JettyServer;
import org.anyframe.sample.cxf.jaxws.server.ServerInfo;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


/**
 * TestCase Name : JaxWsFrontendSpringClientTest <br>
 * <br>
 * [Description] : This TestCase defines scenarios to test Movie Web Service function implemented based on Spring with Spring TestCase 
 *                 by using JAX-WS frontend out of two frontend models(Simple/JAX-WS) at Apache CXF. 
 * <br>
 * [Characteristic]
 * <li>JAX-WS Frontend Use</li>
 * <li>Server implementation: in the case of using JAZ-WS frontend way, by using Spring setup file <jaxws:endpoint/> tag 
 *     						  at Spring setup file, service developed with Spring Bean is easily exposed as Web Service. 
 *     						  In the case of asking for any kind of request from web.xml, setup should allow handling of 
 *     						  org.apache.cxf.transport.servlet.CXFServlet. 
 *     						  And by registering org.springframework.web.context.ContextLoaderListener, in the case of implementing 
 *     				          Web Container, Spring Container is set up to start. 
 </li>              
 * <br>
 * [Assumption]
 * <li>-Server : JettyServer Use, Spring setup file use</li>
 * <li>-Client : RemotingSpringTestCase use, Spring setup file use</li>
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
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/jaxws/client/context-cxf-jaxws-client.xml" })
public class JaxWsFrontendSpringClientTest extends ServerRunner {

    // ==============================================================
    // ====== Pre-job definition necessary for TestCase execution ===
    // ==============================================================
    
	@Inject
	@Named("movieService")
    private MovieService movieService; 

	@Before
    public void onSetUpServer() throws Exception {
        this.setServer(new JettyServer());
        ServerInfo serverInfo = new ServerInfo();
        serverInfo.setPort(9002);
        serverInfo
            .setWarpath("src/test/resources/jaxws/server/webapp");
        this.getServer().setServerInfo(serverInfo);
        super.setUp();
    }
	
    @After
    public void onTearDown() throws Exception {
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
        // 1. find movie list all
        List<Movie> movieList = movieService.findMovieListAll();

        // 2. check the movie list count
        assertEquals(2, movieList.size());
    }

    /**
     * [Flow #-2] Positive Case : The whole list is searched in the type of Map. 
     * @throws Exception
     *         throws exception which is from service
     */  
    @Test
    public void testFindMovieMapAll() throws Exception {
        // 1. find movie map all
        Map<String, Movie> movieMap = movieService.findMovieMapAll();

        // 2. check the movie map count
        assertEquals(2, movieMap.size());
    }

    /**
     * [Flow #-3] Positive Case : A New Movie whose I.D. is “001” is searched.  
     * @throws Exception
     *         throws exception which is from service
     */ 
    @Test
    public void testFindMovie() throws Exception {
        // 1. find movie
        Movie movie = movieService.findMovie("001");

        // 2. check the movie information
        assertEquals("The Sound Of Music", movie.getTitle());
        assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-4] Positive Case : A New Movie whose I.D. is “003” is created. 
     * @throws Exception
     *         throws exception which is from service
     */       
    @Test
    public void testCreateMovie() throws Exception {
        // 1. check the existing movie list count
        assertEquals(2, movieService.findMovieListAll().size());

        // 2. create new movie
        movieService.createMovie(new Movie("003", "Life Is Beautiful",
            "Roberto Benigni"));

        // 3. check the new movie list count
        assertEquals(3, movieService.findMovieListAll().size());

        // 4. check the new movie information
        Movie movie = movieService.findMovie("003");
        assertEquals("Life Is Beautiful", movie.getTitle());
        assertEquals("Roberto Benigni", movie.getDirector());
    }

    /**
     * [Flow #-5] Positive Case : The existing Movie whose I.D. is “002” is modified. 
     * @throws Exception
     *         throws exception which is from service
     */   
    @Test
    public void testUpdateMovie() throws Exception {
        // 1. update movie
        movieService.updateMovie(new Movie("002", "Life Is Wonderful",
            "Roberto"));

        // 2. find updated movie
        Movie movie = movieService.findMovie("002");

        // 3. check the movie information
        assertEquals("Life Is Wonderful", movie.getTitle());
        assertEquals("Roberto", movie.getDirector());
    }

    /**
     * [Flow #-6] Positive Case : The existing Movie whose I.D. is “002” is deleted. 
     * @throws Exception
     *         throws exception which is from service
     */    
    @Test
    public void testRemoveMovie() throws Exception {
        // 1. set movie id to remove
        Movie movie = new Movie();
        movie.setMovieId("002");

        // 2. remove the movie
        movieService.removeMovie(movie);

        // 3. check the removed movie info
        assertNull(movieService.findMovie("002"));
    }
}
