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
import java.io.StringReader;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.anyframe.sample.cxf.jaxrs.domain.Movie;
import org.anyframe.sample.cxf.jaxrs.moviefinder.service.MovieService;
import org.anyframe.sample.cxf.jaxrs.moviefinder.service.impl.MovieServiceImpl;
import org.anyframe.sample.cxf.jaxrs.server.JaxRsServer;
import org.anyframe.sample.cxf.jaxrs.server.ServerInfo;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.FileRequestEntity;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.xml.sax.InputSource;


/**
 * TestCase Name : JaxRsServerFactoryCollectionTest <br>
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
 * <li>#-1 Positive Case : Functionality to create a new Movie whose I.D. is :005”, “006” is called for with Post Method.</li>
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class JaxRsServerFactoryCollectionTest extends ServerRunner {

    // ==============================================================
    // ====== Pre-job Definition necessary for TestCase =============
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
     * [Flow #-1] Positive Case : Functionality to create a new Movie whose I.D. is :005”, “006” is called for with Post Method. 
     *                            By using  @POST and @Path annotation, Client is possible to call for 
     *                            by exposing createMovies method as RESTful Web Service. 
     *                            (ex. @POST
     *                                 @Path("/movielist/")
     *                                 public Response createMovies(Movies movies) throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */       
	@Test
    public void testCreateMovies() throws Exception {
        // 1. create movies
        String inputFile =
            this.getClass().getClassLoader().getResource(
                "jaxrs/create_movies.txt").getFile();
        File input = new File(inputFile);
        PostMethod post =
            new PostMethod("http://localhost:9002/movieservice/movielist");
        RequestEntity entity =
            new FileRequestEntity(input, "text/xml; charset=ISO-8859-1");
        post.setRequestEntity(entity);
        HttpClient httpclient = new HttpClient();
        String response = "";

        try {
        	Assert.assertEquals(200, httpclient.executeMethod(post));
            response = post.getResponseBodyAsString();
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            post.releaseConnection();
        }

        
        // 2.1) get update movie info 005
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies/005");
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
        System.out.println("response="+response);
        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.cxf.jaxrs.domain");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        Assert.assertEquals("Life Is Beautiful", movie.getTitle());
        Assert.assertEquals("Roberto Benigni", movie.getDirector());        
        
        // 2.2) get update movie info 006
        GetMethod getMovie =
            new GetMethod("http://localhost:9002/movieservice/movies/006");
        httpclient = new HttpClient();
        response = "";
        try {
        	Assert.assertEquals(200, httpclient.executeMethod(getMovie));
            response = getMovie.getResponseBodyAsString();
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            get.releaseConnection();
        }
        System.out.println("response="+response);
        jaxbContext = JAXBContext.newInstance("org.anyframe.sample.cxf.jaxrs.domain");
        unmarshaller = jaxbContext.createUnmarshaller();
        movie = (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        Assert.assertEquals("Life Is sad", movie.getTitle());
        Assert.assertEquals("no director", movie.getDirector());                      
    }    
}
