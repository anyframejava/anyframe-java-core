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
package org.anyframe.sample.cxf.jaxrs;

import java.io.File;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.anyframe.sample.cxf.jaxrs.domain.Movie;
import org.anyframe.sample.cxf.jaxrs.moviefinder.service.MovieService;
import org.anyframe.sample.cxf.jaxrs.moviefinder.service.impl.MovieServiceImpl;
import org.anyframe.sample.cxf.jaxrs.server.JaxRsServer;
import org.anyframe.sample.cxf.jaxrs.server.ServerInfo;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.DeleteMethod;
import org.apache.commons.httpclient.methods.FileRequestEntity;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.PutMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.cxf.helpers.IOUtils;
import org.apache.cxf.io.CachedOutputStream;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.xml.sax.InputSource;


/**
 * TestCase Name : JaxRsServerFactoryTest <br>
 * <br>
 * [Description] : This TestCase tests Movie Service Function implemented as RESTful web Service with JAX-RS (JSR-311), standard way. 
 *                 It is applied only when data is sent in the form of collection object. <br>
 * [Characteristic]
 * <li>REST(Representational state transfer)adopts software architecture style for distributed hypermedia system such as World Wide Web.</li>
 * <li>REST adopts architecture style for network-based application proclaimed by Roy Fielding.</li>
 * <li>Applied example - WWW(Web), Open API(ex. Google, Amazon, eBay, Yahoo)</li>
 * <li>Three way to implement RESTful service via CXF- JAX-RS (JSR-311), HTTP Binding, JAX-WS Provider/Dispatch API</li>
 * <li>CXF provides implementation and develops RESTful service in standard way and use JAX-RS annotation setup. </li>
 * <li>Constraints- RESTful Web Service is implemented by setting up Annotation provided by 
 *                  JAX-RS per each method of service interface class exposed as Web Service.
 *                  - @Path and @ProduceMime annotation are set up as belows at interface class. 
 *                     @Path("/movieservice/")
 *                     @ProduceMime("application/xml")
 *                     public interface MovieService { ...
 *                  - @Path("/movieservice/"): Path property information becomes upper path information accessing RESTful Web Service.
 *                  - @ProduceMime("application/xml"): In the case of no ProduceMime setup at class, 
 *                                                     client should call for addRequestHeader("Accept" , "application/xml") method.
 * </li>                                                     
 * <br>
 * [Assumption]
 * <li>-Server : JaxRsServer Use</li>
 * <li>-Client : HttpClient Use</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : By calling for function to search Movie whose I.D. is “001” with URL, 
 *                         XML data is returned and changed into Movie object with JAXB for usage. </li>
 * <li>#-2 Positive Case : By calling for function to search Movie whose Movie I.D. is “001: with Get method, 
 *                         XML data is returned and changed into Movie object with JAXB for usage.</li>
 * <li>#-3 Positive Case : Function to create a new Movie whose Movie I.D. is “003” with Post method is called for. </li>
 * <li>#-4 Positive Case : Function to change an existing Movie information whose Movie I.D. is “002” 
 *                         with Put method is called for.</li>
 * <li>#-5 Positive Case : Function to delete an existing Movie whose Movie I.D. is “002” with Delete method is called for.</li>
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class JaxRsServerFactoryTest extends ServerRunner {

    // ==============================================================
    // ====Pre-job Definition necessary for TestCase execution ======
    // ==============================================================
    
	@Before
    public void setUp() throws Exception {
        this.setServer(new JaxRsServer());
        this.getServer().setServerInfo(
            new ServerInfo(MovieService.class, new MovieServiceImpl(),
                "http://localhost:9002/"));
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
     * [Flow #-1] Positive Case : By calling for function to search Movie whose I.D. is “001” with URL, 
     *                            XML data is returned and changed into Movie object with JAXB for usage.
     *                            
     *                            By using @GET and @Path annotation, Client is possible to call for 
     *                            by exposing findMovie method as RESTful Web Service. 
     *                            (ex. @GET
     *                                 @Path("/movies/{movieId}/")
     *                                 public Movie findMovie(@PathParam("movieId") String movieId) throws Exception;
     *                             )
     *                             In this case, "movieId" of {movieId} and @PathParam developed @Path should be matched.
     * @throws Exception
     *         throws exception which is from service                            
     */     
	@Test
    public void testFindMovieUsingURL() throws Exception {
        // 1. find movie
        URL url = new URL("http://localhost:9002/movieservice/movies/001");
        InputStream in = url.openStream();

        String response = getStringFromInputStream(in);
        Assert.assertNotNull(response);
        System.out.println("response="+response);
        
        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.cxf.jaxrs.domain");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the movie information
        Assert.assertEquals("The Sound Of Music", movie.getTitle());
        Assert.assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-2] Positive Case : By calling for function to search Movie whose I.D. is “001” with Get method, 
     *                            XML data is returned and changed into Movie object with JAXB for usage.
     *                            
     *                            By using  @GET and @Path annotation, Client is possible to call for 
     *                            by exposing findMovie method as RESTful Web Service. 
     *                            (ex. @GET
     *                                 @Path("/movies/{movieId}/")
     *                                 public Movie findMovie(@PathParam("movieId") String movieId) throws Exception;
     *                             )
     *                            In this case, ‘movieId” of {movieId} and @PathParam developed @Path should be matched.
     * @throws Exception
     *         throws exception which is from service                            
     */  
	@Test
    public void testFindMovie() throws Exception {
        // 1. find movie
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies/001");
        HttpClient httpclient = new HttpClient();
        String response = "";
        try {
        	Assert.assertEquals(200, httpclient.executeMethod(get));
            response = get.getResponseBodyAsString();
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.cxf.jaxrs.domain");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the movie information
        Assert.assertEquals("The Sound Of Music", movie.getTitle());
        Assert.assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-3] Positive Case : Function to create a new Movie whose Movie I.D. is “003” with Post method is called for.
     *                            By using  @POST and @Path annotation, Client is possible to call for 
     *                            by exposing createMovie method as RESTful Web Service. 
     *                            (ex. @POST
     *                                 @Path("/movies/")
     *                                 public Response createMovie(Movie movie) throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */   
	@Test
    public void testCreateMovie() throws Exception {
        // 1. create movie
        String inputFile =
            this.getClass().getClassLoader().getResource(
                "jaxrs/create_movie.txt").getFile();
        File input = new File(inputFile);
        PostMethod post =
            new PostMethod("http://localhost:9002/movieservice/movies");
        RequestEntity entity =
            new FileRequestEntity(input, "text/xml; charset=ISO-8859-1");
        post.setRequestEntity(entity);
        HttpClient httpclient = new HttpClient();
        String response = "";

        try {
        	Assert.assertEquals(200, httpclient.executeMethod(post));
            response = post.getResponseBodyAsString();
            System.out.println("create: " + response);
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            post.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.cxf.jaxrs.domain");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the new movie information
        Assert.assertEquals("Life Is Beautiful", movie.getTitle());
        Assert.assertEquals("Roberto Benigni", movie.getDirector());
    }

    /**
     * [Flow #-4] Positive Case : Function to change an existing Movie information whose Movie I.D. is “002” with Put method is called for.
     *                            By using @PUT and @Path annotation, Client is possible to call for 
     *                            by exposing updateMovie method as RESTful Web Service. 
     *                            (ex. @PUT
     *                                 @Path("/movies/")
     *                                 public Response updateMovie(Movie movie) throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */    
	@Test
    public void testUpdateMovie() throws Exception {
        // 1. update movie
        String inputFile =
            this.getClass().getClassLoader().getResource(
                "jaxrs/update_movie.txt").getFile();
        File input = new File(inputFile);
        PutMethod put =
            new PutMethod("http://localhost:9002/movieservice/movies");
        RequestEntity entity =
            new FileRequestEntity(input, "text/xml; charset=ISO-8859-1");
        put.setRequestEntity(entity);
        HttpClient httpclient = new HttpClient();
        String response = "";

        try {
        	Assert.assertEquals(200, httpclient.executeMethod(put));
            response = put.getResponseBodyAsString();
            System.out.println("update: " + response);
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            put.releaseConnection();
        }

        // 2. get update movie info
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies/002");
        httpclient = new HttpClient();
        response = "";
        try {
        	Assert.assertEquals(200, httpclient.executeMethod(get));
            response = get.getResponseBodyAsString();
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.cxf.jaxrs.domain");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 3. check the new movie information
        Assert.assertEquals("Life Is Wonderful", movie.getTitle());
        Assert.assertEquals("Roberto", movie.getDirector());
    }

    /**
     * [Flow #-5] Positive Case : Function to delete an existing Movie whose Movie I.D. is “002” with Delete method is called for.
     *                            By using @Delete and @HttpResource annotation, 
     *                            Client is possible to call for by exposing removeMovie method as RESTful Web Service. 
     *                            (ex. @DELETE
     *                                 @Path("/movies/{movieId}/")
     *                                 public Response removeMovie(@PathParam("movieId") String movieId) throws Exception;
     *                             )
     *                             In this case, ‘movieId” of {movieId} and @PathParam developed @Path should be matched.
     * @throws Exception
     *         throws exception which is from service                            
     */   
	@Test
    public void testRemoveMovie() throws Exception {
        // 1. remove movie
        DeleteMethod delete =
            new DeleteMethod("http://localhost:9002/movieservice/movies/002");
        HttpClient httpclient = new HttpClient();
        String response = "";
        try {
        	Assert.assertEquals(200, httpclient.executeMethod(delete));
            response = delete.getResponseBodyAsString();
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            delete.releaseConnection();
        }

        // 2. get movie and check if the movie is
        // removed
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies/002");
        httpclient = new HttpClient();
        response = "";
        try {
        	Assert.assertEquals(204, httpclient.executeMethod(get));
            response = get.getResponseBodyAsString();
            Assert.assertNull(response);
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            get.releaseConnection();
        }
    }   
        
    // ==============================================================
    // ====== private methods ======================================
    // ==============================================================
    
    private static String getStringFromInputStream(InputStream in)
            throws Exception {
        CachedOutputStream bos = new CachedOutputStream();
        IOUtils.copy(in, bos);
        in.close();
        bos.close();
        return bos.getOut().toString();
    }
}
