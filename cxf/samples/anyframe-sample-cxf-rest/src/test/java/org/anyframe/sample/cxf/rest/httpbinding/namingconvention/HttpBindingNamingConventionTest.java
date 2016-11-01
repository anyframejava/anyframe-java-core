/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.sample.cxf.rest.httpbinding.namingconvention;

import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.anyframe.sample.cxf.rest.ServerRunner;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.domain.GetMovieResponse;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.domain.GetMoviesResponse;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.domain.Movies;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.service.MovieService;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.service.impl.MovieServiceImpl;
import org.anyframe.sample.cxf.rest.server.JaxWsServer;
import org.anyframe.sample.cxf.rest.server.ServerInfo;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.DeleteMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.cxf.binding.http.HttpBindingFactory;
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
 * TestCase Name : HttpBindingNamingConventionTest <br>
 * <br>
 * [Description] : This TestCase tests Movie Service function implemented as RESTful Web Service 
 * by using JRA(Java REST Annotation)setup out of HTTP Binding way.<br>
 * [Characteristic]
 * <li>REST(Representational state transfer) adopts software architecture style for distributed hypermedia system such as World Wide Web.</li>
 * <li>REST adopts architecture style for network-based application proclaimed by Roy Fielding.(2000 Year)</li>
 * <li>Example- WWW(web), Open API(ex. Google, Amazon, eBay, Yahoo etc)</li>
 * <li>three ways to implement RESTful Web Service by CXF
       - JAX-RS (JSR-311), HTTP Binding, JAX-WS Provider/Dispatch API</li>
 * <li>There are two ways to implement RESTful Web Service(JRA setup way and NamingConvention way)with HTTP Binding. 
 *     - RESTful service is easily developed via JRA(Java REST Annotation) setup.</li>
 * <li>Constraints- there is no need to set up Annotation per each method of service interface class 
 * exposed as Web Service and method name should be developed according to naming convention. </li>
 * <br>
 * [Assumption]
 * <li>-Server : JaxWsServer Use</li>
 * <li>-Client : HttpClient Use</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : By calling for the whole list search function with Get method, 
 *                         XML data is returned and transformed into GetMoviesResponse object by using JAXB.  </li>
 * <li>#-2 Positive Case : By calling for Movie search function which I.D. is “001” with URL, 
 *                         XML data is returned and transformed into GetMovieResponse object by using JAXB.  </li>
 * <li>#-3 Positive Case : By calling for Movie search function which I.D. is “001” with Get method, 
 *                         XML data is returned and transformed into GetMovieResponse object by using JAXB.  </li>
 * <li>#-4 Positive Case : Function to delete an existing Movie which I.D. is “002” with Delete method is called for. </li>
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class HttpBindingNamingConventionTest extends ServerRunner {

    // ==============================================================
    // ====== Pre-job definition necessary for TestCase execution ===
    // ==============================================================
    
	@Before
    public void setUp() throws Exception {
        this.setServer(new JaxWsServer());
        ServerInfo serverInfo =
            new ServerInfo(MovieService.class, new MovieServiceImpl(),
                "http://localhost:9002/movieservice/");
        // Use the HTTP Binding which understands the
        // Java Rest Annotations
        serverInfo.setBindingId(HttpBindingFactory.HTTP_BINDING_ID);
        this.getServer().setServerInfo(serverInfo);
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
     * [Flow #-1] Positive Case : By calling for the whole list search function with Get method, 
     *                            XML data is returned and transformed into GetMoviesResponse object by using JAXB. 
     *                            Naming Convention Rule: Collection<"resource class name"> get+"The plural of resource class name"() 
     *                            
     *                            getMovies method is exposed as RESTful Web Service and then client can be called for. 
     *                            (ex. public Collection<Movie> getMovies() throws Exception; )
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
            System.out.println(response);
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext
                .newInstance("org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.domain");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

        Object obj = unmarshaller.unmarshal(new InputSource(
        		new StringReader(response)));
        if(obj instanceof Movies) {
        	Movies movies = (Movies) obj;
            // 2. check the movie information
            Assert.assertEquals(2, movies.getMovie().size());
        }
        else if(obj instanceof GetMoviesResponse) {
        	GetMoviesResponse movies = (GetMoviesResponse) obj;
            // 2. check the movie information
            Assert.assertEquals(2, movies.getMovie().size());
        }
    }

    /**
     * [Flow #-2] Positive Case : By calling for Movie search function which I.D. is “001” with URL, 
     * 	                          XML data is returned and transformed into GetMovieResponse object by using JAXB. 
     *                            Naming Convention Rule: "resource class name" get+"resource class name"(Object id) 
     *                            
     *                            getMovie method is exposed as RESTful Web Service and then client can be called for. 
     *                            (ex.  public Movie getMovie(String movieId) throws Exception;)
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
        System.out.println("find using URL: " + response);

        JAXBContext jaxbContext =
            JAXBContext
                .newInstance("org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.domain");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        GetMovieResponse movie =
            (GetMovieResponse) unmarshaller.unmarshal(new InputSource(
                new StringReader(response)));

        // 2. check the movie information
        Assert.assertEquals("The Sound Of Music", movie.getMovie().getTitle());
        Assert.assertEquals("Robert Wise", movie.getMovie().getDirector());
    }

    /**
     * [Flow #-3] Positive Case : By calling for function to search Movie which I.D. is “001” with Get method, 
     *                            XML data is returned and transformed into GetMovieResponse object by using JAXB. 
     *                            Naming Convention Rule: "resource class name" get+"resource class name"(Object id) 
     *                            
     *                            getMovie method is exposed as RESTful Web Service and then client can be called for. 
     *                            (ex. public Movie getMovie(String movieId) throws Exception;)
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
            System.out.println("find: " + response);
        } catch (Exception e) {
        	Assert.fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext
                .newInstance("org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.domain");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        GetMovieResponse movie =
            (GetMovieResponse) unmarshaller.unmarshal(new InputSource(
                new StringReader(response)));

        // 2. check the movie information
        Assert.assertEquals("The Sound Of Music", movie.getMovie().getTitle());
        Assert.assertEquals("Robert Wise", movie.getMovie().getDirector());
    }

    /**
     * [Flow #-4] Positive Case : Function to delete an existing Movie which I.D. is “002” with Delete method is called for. 
     *                            Naming Convention Rule: void delete or remove +"resource class name"(Object id) 
     *                            
     *                            deleteMovie method is exposed as RESTful Web Service and then client can be called for. 
     *                            (ex. public void deleteMovie(String movieId) throws Exception; )
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
            Assert.assertEquals(200, httpclient.executeMethod(get));
            response = get.getResponseBodyAsString();
            System.out.println("after delete: " + response);
            Assert.assertEquals(-1, response.indexOf("<movieId>001</movieId>"));
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
