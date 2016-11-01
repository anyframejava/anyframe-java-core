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
package org.anyframe.sample.cxf.jaxws.asynch;

import java.io.File;
import java.util.List;
import java.util.concurrent.Future;

import javax.xml.namespace.QName;
import javax.xml.ws.Response;

import org.anyframe.sample.cxf.jaxws.ServerRunner;
import org.anyframe.sample.cxf.jaxws.client.Client;
import org.anyframe.sample.cxf.jaxws.client.ClientInfo;
import org.anyframe.sample.cxf.jaxws.client.JaxWsClient;
import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.FindMovieListAllResponse;
import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.Movie;
import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.MovieServiceAsynch;
import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.MovieServiceAsynchService;
import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.impl.MovieServiceImpl;
import org.anyframe.sample.cxf.jaxws.server.JaxWsServer;
import org.anyframe.sample.cxf.jaxws.server.ServerInfo;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;


/**
 * TestCase Name : JaxWsAsynchTest <br>
 * <br>
 * [Description] : This TestCase tests Asynchronous Method Invocation function defined at JAX-WS Spec.and 
 * 				   both Polling and Call ways are subject to test. <br>
 * [Characteristic]
 * <li>Along with synchronous calling way, Apache CXF supports two types of asynchronous calling ways. </li>
 * <li>Polling approach-In order to call for method remotely existing, a specific method to return javax.xml.ws.Response object 
 *                      is called for without output parameter. </li>
 * <li>Callback approach-In order to call for method remotely existing, a specific method which has a reference relation with 
 * 						 callback object whose parameter is javax.xml.ws.AsyncHandler type is called for. 
 *                       As soon as answering message arrives at Client, CXF runtime environment again calls for AsyncHandler object
 *                       in order to deliver it to contents of answering message. </li>
 * <li>Constraints- in the case of using Callback approach, AsyncHandler is needed to implement. 
 * 					And service interface additionally develop method (method name: method subject name + "Async")
 *                  Method whose return type is Response is developed.
 *                  Method whose return type is Future<?> and had additional AsyncHandler parameter is developed. 
 * </li>
 * <li>Server implementation: WSDL file is created with java2ws for Interface class exposed as Web Service. Wsdl2java Tool allows to create Java source code by using WSDL file and asynch.binding.xml file. 
 *               (org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http package subclasses 
 *               (SEI, WebServiceClient, complex type classes)
 * </li>
 * <br>
 * [Assumption]
 * <li>-Server : JaxWsServer Use</li>
 * <li>-Client : JaxWsClient Use, MovieServiceAsynchService class use automatically created by wsdl2java tool</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : The whole Movie list is searched in the type of List with Callback approach 
 *                         out of Synchronous method invocation ways. </li>
 * <li>#-2 Positive Case : The whole Movie list is searched in the type of List with Polling approach 
 *                         out of Asynchronous method invocation ways. </li>
 * <li>#-3 Positive Case : The whole Movie list is searched in the type of List with Callback approach out of Asynchronous method invocation ways. </li>
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class JaxWsAsynchTest extends ServerRunner {

    // ==============================================================
    // ====Pre-job definition necessary for TestCase execution=======
    // ==============================================================
    
    private static final QName SERVICE_NAME =
        new QName("http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http",
            "MovieServiceAsynchService");

    @Before 
    public void setUp() throws Exception {

        // 1. generate WSDL file
        //   command>java2ws -wsdl -cp target/classes
        //   org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.MovieServiceAsynch
        // 2. generate classes required in the asynchronous case
        //   command>wsdl2java -d src -b
        //   src/test/resources/jaxws/asynch/wsdl/asynch_binding.xml
        //   src/test/resources/jaxws/asynch/wsdl/MovieServiceAsynchService.wsdl

        this.setServer(new JaxWsServer());
        this.getServer().setServerInfo(
            new ServerInfo(MovieServiceAsynch.class, new MovieServiceImpl(),
                "http://localhost:9002/Movie", false, false));
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
     * [Flow #-1] Positive Case : The whole Movie list is searched in the type of List with Callback approach out of Synchronous method 
     *							invocation ways. 
     * @throws Exception
     *         throws exception which is from service
     */    
    @Test
    public void testFindMovieListAll() throws Exception {
        Client client = new JaxWsClient();
        MovieServiceAsynch movieService =
            (MovieServiceAsynch) client.getClient(new ClientInfo(
                MovieServiceAsynch.class, "http://localhost:9002/Movie", false,
                false));

        // 1. find movie list all
        List<Movie> movieList = movieService.findMovieListAll();

        // 2. check the movie list count
        Assert.assertEquals(2, movieList.size());
    }

    /**
     * [Flow #-2] Positive Case : The whole Movie list is searched in the type of List with Callback approach out of Asynchronous method 
     * 							invocation ways. 
     * @throws Exception
     *         throws exception which is from service
     */   
    @Test
    public void testFindMovieListAllPolling() throws Exception {

        File wsdl = new File("src/test/resources/jaxws/asynch/wsdl/MovieServiceAsynchService.wsdl");

        MovieServiceAsynchService client =
            new MovieServiceAsynchService(wsdl.toURL(), SERVICE_NAME);
        MovieServiceAsynch movieService = client.getMovieServiceAsynchPort();

        // 1. find movie list all
        Response<FindMovieListAllResponse> response =
            movieService.findMovieListAllAsync();

        // 2. wait for response after asynchronous method invocation
        while (!response.isDone()) {
            Thread.sleep(100);
        }

        // 3. check the movie list count
        FindMovieListAllResponse reply = response.get();
        Assert.assertEquals(2, reply.getReturn().size());
    }

    /**
     * [Flow #-3] Positive Case : The whole Movie list is searched in the type of List with Callback approach out of Asynchronous method 
     * 							invocation ways. 
     * @throws Exception
     *         throws exception which is from service
     */   
    @Test
    public void testFindMovieListAllCallback() throws Exception {

        File wsdl = new File("src/test/resources/jaxws/asynch/wsdl/MovieServiceAsynchService.wsdl");

        MovieServiceAsynchService client =
            new MovieServiceAsynchService(wsdl.toURL(), SERVICE_NAME);
        MovieServiceAsynch movieService = client.getMovieServiceAsynchPort();

        // 1. find movie list all
        MovieAsyncHandler asynchHandler = new MovieAsyncHandler();
        Future<?> response = movieService.findMovieListAllAsync(asynchHandler);

        // 2. wait for response after asynchronous method invocation
        while (!response.isDone()) {
            Thread.sleep(100);
        }

        // 3. check the movie list count
        List<Movie> reply = asynchHandler.getResponse();
        Assert.assertEquals(2, reply.size());
    }
}
