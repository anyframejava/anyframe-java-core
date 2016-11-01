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
package org.anyframe.sample.cxf.jaxws.databinding.jaxb;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.anyframe.sample.cxf.jaxws.ServerRunner;
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
 * TestCase Name : JaxWsJAXBTest <br>
 * <br>
 * [Description] : In the case of using JAXB Databinding method, this TestCase defines scenarios witch enables Movie service to be tested. 
 *                 Also, added is Test Method which checks whether method call is possible by using various types of In/Out Parameter. 
 *                 Given that it is possible to cause issues when both JAXB Databing and Simple frontend are used, 
 *                 JAXB Databinding should be used with JAX-WS frontend. 
 * <br>
 * [Characteristic]
 * <li>JAX-WS Frontend Use </li>
 * <li>JAXB Databinding Way Use-JAXB is standard of Java Architecture for XML Binding. </li>
 * <li>Databinding is a mapping technology for XML document and Java object with XML Schema as standard. 
 * Apach CXF uses JAXB as default for Databinding. </li>
 * <li>Constraints- given that JAXB is used with default Databinding at Apach CXF, specific setup is not added.
 * 					JAXB Databinding is used by setting annotation at Java code. 
 * 					Given that List is supported yet Map is not, XmlAdapter should be written in addition in order for databinding with Map. 

 * </li>
 * <br>
 * [Assumption]
 * <li>-Server : JaxWsServer Use </li>
 * <li>-Client : JaxWsClient Use </li>
 * <br>
 * [Main Flow]
 * <li>#-1  Positive Case : To search the whole list in the form of List</li>
 * <li>#-2  Positive Case : To search the whole list in the form of Map </li>
 * <li>#-3  Positive Case : To search Movie</li>
 * <li>#-4  Positive Case : To create a new Movie</li>
 * <li>#-5  Positive Case : To change Movie information </li>
 * <li>#-6  Positive Case : To remove Movie </li>
 * <li>#-7  Positive Case : Type Test - Input, output parameters are called for by using int value.</li>
 * <li>#-8  Positive Case : Type Test - input, output parameters are called for by using long value.</li>
 * <li>#-9  Positive Case : Type Test - input, output parameters are called for by using short value.</li>
 * <li>#-10 Positive Case : Type Test - input, output parameters are called for by using float value.</li>
 * <li>#-11 Positive Case : Type Test - input, output parameters are called for by using double value.</li>
 * <li>#-12 Positive Case : Type Test - input, output parameters are called for by using BigDecimal value.</li>
 * <li>#-13 Positive Case : Type Test - input, output parameters are called for by using boolean value.</li>
 * <li>#-14 Positive Case : Type Test - input, output parameters are called for by using character value.</li> 
 * <li>#-15 Positive Case : Type Test - input, output parameters are called for by using char value.</li> 
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class JaxWsJAXBTest extends ServerRunner {

    // ==============================================================
    // ====== Pre-job Definition necessary for TestCase Execution ===
    // ==============================================================
    
	@Before
    public void setUp() throws Exception {
        this.setServer(new JaxWsServer());
        this.getServer().setServerInfo(
            new ServerInfo(MovieService.class, new MovieServiceImpl(),
                "http://localhost:9002/Movie", false, true));
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
     * [Flow #-1] Positive Case : The whole list is searched in the form of List. 
     * @throws Exception
     *         throws exception which is from service
     */   
	@Test
    public void testFindMovieListAll() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, true));

        // 1. find movie list all
        List<Movie> movieList = movieService.findMovieListAll();

        // 2. check the movie list count
        Assert.assertEquals(2, movieList.size());
    }

    /**
     * [Flow #-2] Positive Case : The whole list is searched in the form of Map.
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
     * [Flow #-3] Positive Case : Searched is a Movie whose I.D. is “001”. 
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
     * [Flow #-4] Positive Case : Created is a new Movie whose I.D. is “003”. 
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
     * [Flow #-5] Positive Case : Changed is the existing Movie whose I.D. is “002”
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
        movieService.updateMovie(new Movie("002", "Life Is Wonderful", "Roberto"));

        // 2. find updated movie
        Movie movie = movieService.findMovie("002");

        // 3. check the movie information
        Assert.assertEquals("Life Is Wonderful", movie.getTitle());
        Assert.assertEquals("Roberto", movie.getDirector());
    }

    /**
     * [Flow #-6] Positive Case : Removed is the existing Movie whose I.D. is “002”
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

    /**
     * [Flow #-7] Positive Case : Type Test - Input, output parameters are called for by using int value.
     */  
	@Test
    public void testMovieIntVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        Assert.assertEquals(1, movieService.testMovieIntVal(1));
    }

    /**
     * [Flow #-8] Positive Case : Type Test - Input, output parameters are called for by using long value.
     */   
	@Test
    public void testMovieLongVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        Assert.assertEquals(1, movieService.testMovieLongVal(1));
    }

    /**
     * [Flow #-9] Positive Case : Type Test - Input, output parameters are called for by using short value.
     */      
	@Test
    public void testMovieShortVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));
        short val = 1;
        Assert.assertEquals(1, movieService.testMovieShortVal(val));
    }

    /**
     * [Flow #-10] Positive Case : Type Test - Input, output parameters are called for by using float value.
     */      
	@Test
    public void testMovieFloatVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));
        float floatVal = 1;
        Assert.assertEquals(floatVal, movieService.testMovieFloatVal(floatVal), 0);
    }

    /**
     * [Flow #-11] Positive Case : Type Test - Input, output parameters are called for by using double value.
     */     
	@Test
    public void testMovieDoubleVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        Assert.assertEquals(1.0, movieService.testMovieDoubleVal(1.0), 0);
    }

    /**
     * [Flow #-12] Positive Case : Type Test - Input, output parameters are called for by using BigDecimal value.
     */     
	@Test
    public void testMovieBigDecimalVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        Assert.assertEquals(new BigDecimal(1), movieService
            .testMovieBigDecimalVal(new BigDecimal(1)));
    }

    /**
     * [Flow #-13] Positive Case : Type Test - Input, output parameters are called for by using boolean value.
     */     
	@Test
    public void testMovieBooleanVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        Assert.assertEquals(true, movieService.testMovieBooleanVal(true));
    }

    /**
     * [Flow #-14] Positive Case : Type Test - Input, output parameters are called for by using character value.
     */     
	@Test
    public void testMovieCharacterVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        Assert.assertEquals(new Character('M'), movieService
            .testMovieCharacterVal(new Character('M')));
    }

    /**
     * [Flow #-15] Positive Case : Type Test - Input, output parameters are called for by using char value.
     */      
	@Test 
    public void testMovieCharVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        Assert.assertEquals('M', movieService.testMovieCharVal('M'));
    }

}
