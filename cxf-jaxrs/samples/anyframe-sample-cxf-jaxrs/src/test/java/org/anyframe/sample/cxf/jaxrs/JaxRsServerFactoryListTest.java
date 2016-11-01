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

import java.io.StringReader;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.anyframe.sample.cxf.jaxrs.domain.Movies;
import org.anyframe.sample.cxf.jaxrs.moviefinder.service.MovieService;
import org.anyframe.sample.cxf.jaxrs.moviefinder.service.impl.MovieServiceImpl;
import org.anyframe.sample.cxf.jaxrs.server.JaxRsServer;
import org.anyframe.sample.cxf.jaxrs.server.ServerInfo;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.xml.sax.InputSource;


/**
 * TestCase Name : JaxRsServerFactoryListTest <br>
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
 * <li>#-1 Positive Case : By calling for function to search the whole list of Movie Service with Get method, 
 *                         XML data is returned and changed into Movie object with JAXB for usage.</li>
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class JaxRsServerFactoryListTest extends ServerRunner {

    // ==============================================================
    // ====== Pre-job Definition of TestCase Execution===============
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
     * [Flow #-1] Positive Case : By calling for function to search the whole list of Movie Service with Get method, 
     *                            XML data is returned and changed into Movie object with JAXB for usage.
     * 
     *                            By using  @GET and @Path annotation, Client is possible to call for 
     *                            by exposing findMovieListAll method as RESTful Web Service. 
     *                            (ex. @GET
     *                                 @Path("/movies/")
     *                                 public Movies findMovieListAll() throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */ 
	@Test
    public void testFindMovieListAll() throws Exception {
        // 1. find movie
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies");
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
        
        System.out.println("get list response="+response);
        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.cxf.jaxrs.domain");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movies movies =
            (Movies) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the movie information
        Assert.assertEquals(2, movies.getMovie().size());
    } 
}
