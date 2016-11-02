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
package org.anyframe.sample.cxf.jaxws.databinding.mtom;

import java.io.File;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.activation.DataHandler;

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
 * TestCase Name : JaxWsMTOMTest <br>
 * <br>
 * [Description] : This Testcase uses JAX-WS frontend out of two frontend models (Simple/JAX-WS) at Apche CXF. 
 * 					In the case of using both JAXB and MTOM Databinding methods simultaneously, it defines scenarios enable Movie service functionality. 
 * 					Added is Test Method which checks whether binary data is well sent and received when either using MOTM or not. 
 * <br>
 * [Characteristic]
 * <li>Frontend usuage- it is possible to use both Simple and JAX-WS frontend models along with MTOM. </li>
 * <li>MTOM or Message Transmission Optimization Mechanism is standard to enable binary data to be sent effectively and conveniently 
 * via SOAP message communication optimization mechanism. </li>
 * <li>MTOM creates and sends binary data in the form of Attachment rather than part of XML document. 
 * MTOM is used by setting annotation within Schema Type or Java code. </li>
 * <li>Constraints- attribute of object showing binary data is defined as javax.activation.DataHandler type and added is the setup of 
 * @XmlMimeType("application/octet-stream") annotation. 
 * </li>
 * <br>
 * [Assumption]
 * <li>-Server : JaxWsServer Use</li>
 * <li>-Client : JaxWsClient Use</li>
 * <br>
 * [Main Flow]
 * <li>#-1  Positive Case : To search the whole list in the form of List</li>
 * <li>#-2  Positive Case : To search the whole list in the form of Map </li>
 * <li>#-3  Positive Case : To search Movie</li>
 * <li>#-4  Positive Case : To create a new Movie</li>
 * <li>#-5  Positive Case : To change Movie information </li>
 * <li>#-6  Positive Case : To remove Movie </li>
 * <li>#-7  Positive Case : To change Poster Image of Movie without applying MTOM</li>
 * <li>#-8  Positive Case : To change Poster Image of Movie with applying MTOM</li>
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class JaxWsMTOMTest extends ServerRunner {

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
     * [Flow #-1] Positive Case : To search the whole list in the form of List 
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
     * [Flow #-2] Positive Case : To search the whole list in the form of Map 
     * @throws Exception
     *         throws exception which is from service
     */      
	@Test
    public void testFindMovieMapAll() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, true));

        // 1. find movie map all
        Map<String, Movie> movieMap = movieService.findMovieMapAll();

        // 2. check the movie map count
        Assert.assertEquals(2, movieMap.size());
    }

    /**
     * [Flow #-3] Positive Case : To search Movie whose id is “001” 
     * @throws Exception
     *         throws exception which is from service
     */        
	@Test
    public void testFindMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, true));

        // 1. find movie
        Movie movie = movieService.findMovie("001");

        // 2. check the movie information
        Assert.assertEquals("The Sound Of Music", movie.getTitle());
        Assert.assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-4] Positive Case : To create a new Movie whose id is “003” 
     * @throws Exception
     *         throws exception which is from service
     */     
	@Test
    public void testCreateMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, true));

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
     * [Flow #-5] Positive Case : To change the existing Movie information whose id is “002” 
     * @throws Exception
     *         throws exception which is from service
     */   
	@Test
    public void testUpdateMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, true));

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
     * [Flow #-6] Positive Case : To remove the existing Movie whose id is “002”
     * @throws Exception
     *         throws exception which is from service
     */    
	@Test
    public void testRemoveMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, true));

        // 1. set movie id to remove
        Movie movie = new Movie();
        movie.setMovieId("002");

        // 2. remove the movie
        movieService.removeMovie(movie);

        // 3. check the removed movie info
        Assert.assertNull(movieService.findMovie("002"));
    }

    /**
     * [Flow #-7] Positive Case : To change Poster Image of Movie without applying MTOM 
     * @throws Exception
     *         throws exception which is from service
     */ 
	@Test
    public void testMoviePosterImgByteArrayNotMTOM() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, false));

        // 1. update movie poster image
        Movie movie = movieService.findMovie("001");
        URL fileURL =
            this.getClass().getClassLoader().getResource(
                "jaxws/databinding/mtom/soundofmusic.jpg");
        File aFile = new File(new URI(fileURL.toString()));
        long imgSize = aFile.length();
        System.out.println("PosterImg Size using ByteArray is " + imgSize);
        byte[] posterImg = new byte[(int) imgSize];
        InputStream in = fileURL.openStream();
        in.read(posterImg);

        movie.setPosterImgByteArray(posterImg);
        movie.setPosterImgDataHandler(null);
        movieService.updateMovie(movie);

        // 2. find updated movie
        Movie updatedMovie = movieService.findMovie("001");

        // 3. check the movie information
        Assert.assertEquals("The Sound Of Music", updatedMovie.getTitle());
        Assert.assertEquals("Robert Wise", updatedMovie.getDirector());
        Assert.assertEquals((int) imgSize, updatedMovie.getPosterImgByteArray().length);
    }

    /**
     * [Flow #-8] Positive Case : To change Poster Image of Movie with applying MTOM 
     * @throws Exception
     *         throws exception which is from service
     */     
	@Test 
    public void testMoviePosterImgDataHandlerMTOM() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, true));

        // 1. update movie poster image
        Movie movie = movieService.findMovie("001");
        URL fileURL =
            this.getClass().getClassLoader().getResource(
                "jaxws/databinding/mtom/soundofmusic.jpg");
        DataHandler posterImg = new DataHandler(fileURL);
        int imgSize = posterImg.getInputStream().available();
        System.out.println("PosterImg Size using DataHandler is " + imgSize);

        movie.setPosterImgDataHandler(posterImg);
        movie.setPosterImgByteArray(null);
        movieService.updateMovie(movie);

        // 2. find updated movie
        Movie updatedMovie = movieService.findMovie("001");

        InputStream mtomIn = updatedMovie.getPosterImgMTOM().getInputStream();
        int fileSize = 0;
        for (int i = mtomIn.read(); i != -1; i = mtomIn.read()) {
            fileSize++;
        }
        
        // 3. check the movie information
        Assert.assertEquals("The Sound Of Music", updatedMovie.getTitle());
        Assert.assertEquals("Robert Wise", updatedMovie.getDirector());
        Assert.assertEquals(imgSize, fileSize);
    }
}
