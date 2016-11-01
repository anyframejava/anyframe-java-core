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
package org.anyframe.sample.cxf.rest.httpbinding.jra;

import java.io.File;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import java.util.Collection;
import java.util.Iterator;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;

import org.anyframe.sample.cxf.rest.ServerRunner;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.Movie;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.Movies;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.service.MovieService;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.service.impl.MovieServiceImpl;
import org.anyframe.sample.cxf.rest.server.JaxWsServer;
import org.anyframe.sample.cxf.rest.server.ServerInfo;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.DeleteMethod;
import org.apache.commons.httpclient.methods.FileRequestEntity;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
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
 * TestCase Name : HttpBindingJRATest <br>
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
 * <li>Constraints- RESTful Web Service is implemented by setting up JRA per each method of service interface class 
 * 	   exposed  as Web Service. </li>
 * <br>
 * [Assumption]
 * <li>-Server : JaxWsServer Use</li>
 * <li>-Client : HttpClient Use</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : By calling for the whole list search function with Get method, 
 * 						   XML data is returned and transferred into Movies object by using JAXB. </li>
 * <li>#-2 Positive Case : By calling for Movie search function whose I.D. is “001” with URL, 
 *                         XML data is returned and transferred into Movies object by using JAXB. </li>
 * <li>#-3 Positive Case : By calling for Movie search function whose I.D. is “001” with Get method, 
 *                         XML data is returned and transferred into Movies object by using JAXB. </li>
 * <li>#-4 Positive Case : Function to create new Movie whose I.D. is “003” with Post method is called for. </li>
 * <li>#-5 Positive Case : Function to delete existing Movie whose I.D. is “002” with Delete method is called for. </li>
 * <li>#-6 Positive Case : Function to create new Movie whose I.Ds are “005” and “006” with Post method is called for. </li>
 *
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class HttpBindingJRATest extends ServerRunner {

	// ==============================================================
	// ====== Pre-job definition necessary for TestCase execution ===
	// ==============================================================

	@Before
	public void setUp() throws Exception {
		this.setServer(new JaxWsServer());
		ServerInfo serverInfo = new ServerInfo(MovieService.class,
				new MovieServiceImpl(), "http://localhost:9002/movieservice/");
		// Use the HTTP Binding which understands the
		// Java Rest Annotations
		serverInfo.setBindingId(HttpBindingFactory.HTTP_BINDING_ID);
		serverInfo.setWrapped(false);
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
	 * XML data is returned and transferred into Movies object by using JAXB. 
	 * 
	 * findMovieListAll method is exposed as RESTful Web Service by using 
	 * @Get, @HttpResource and @WebResult annotation and then client can be called for. 
	 * 
	 * (ex. @Get
	 * 		@HttpResource(location = "/movies")
	 * 		@WebResult(name = "Movies") public Movies findMovieListAll() throws
	 *                 Exception; )
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testFindMovieListAll() throws Exception {
		// 1. find movie
		GetMethod get = new GetMethod(
				"http://localhost:9002/movieservice/movies");
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

		JAXBContext jaxbContext = JAXBContext
				.newInstance("org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain");
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

		JAXBElement<Movies> root = unmarshaller.unmarshal(new StreamSource(
				new StringReader(response)), Movies.class);
		Movies movies = root.getValue();

		// 2. check the movie information
		Assert.assertEquals(2, movies.getMovie().size());
	}

	/**
	 * [Flow #-2] Positive Case : By calling for Movie search function which I.D. is “001” with URL, 
	 * XML data is returned and transferred into Movies object by using JAXB. 
	 * 
	 * findMovie method is exposed as RESTful Web Service by using 
	 * @Get, @HttpResource and @WebResult annotation and then client can be called for. 
	 * 
	 * (ex. @Get
	 * 		@HttpResource(location = "/movies/{movieId}")
	 * 		@WebResult(name = "Movie") public Movie findMovie(FindMovie findMovie)
	 *                 throws Exception; )
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testFindMovieUsingURL() throws Exception {
		// 1. find movie
		URL url = new URL("http://localhost:9002/movieservice/movies/001");
		InputStream in = url.openStream();

		String response = getStringFromInputStream(in);
		Assert.assertNotNull(response);

		JAXBContext jaxbContext = JAXBContext
				.newInstance("org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain");
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		Movie movie = (Movie) unmarshaller.unmarshal(new InputSource(
				new StringReader(response)));

		// 2. check the movie information
		Assert.assertEquals("The Sound Of Music", movie.getTitle());
		Assert.assertEquals("Robert Wise", movie.getDirector());
	}

	/**
	 * [Flow #-3] Positive Case : By calling for function to search Movie which I.D. is “001” with Get method, 
	 * XML data is returned and transferred into Movies object by using JAXB. 
	 * 
	 * findMovie method is exposed as RESTful Web Service by using 
	 * @Get, @HttpResource and @WebResult annotation and then client can be called for. 
	 * 
	 * (ex. @Get
	 * 		@HttpResource(location = "/movies/{movieId}")
	 * 		@WebResult(name = "Movie") public Movie findMovie(FindMovie findMovie)
	 *                 throws Exception; )
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testFindMovie() throws Exception {
		// 1. find movie
		GetMethod get = new GetMethod(
				"http://localhost:9002/movieservice/movies/001");
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

		JAXBContext jaxbContext = JAXBContext
				.newInstance("org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain");
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		Movie movie = (Movie) unmarshaller.unmarshal(new InputSource(
				new StringReader(response)));

		// 2. check the movie information
		Assert.assertEquals("The Sound Of Music", movie.getTitle());
		Assert.assertEquals("Robert Wise", movie.getDirector());
	}

	/**
	 * [Flow #-4] Positive Case : Function to create new Movie whose I.D. is “003” with Post method is called for. 
	 * 
	 * createMovie method is exposed as RESTful Web Service by using 
	 * @Get, @HttpResource and @WebResult annotation and then client can be called for. 
	 * 
	 * (ex. @Post
	 * 		@HttpResource(location = "/movies") public void
	 *                        createMovie(@WebParam(name = "Movie") Movie movie)
	 *                        throws Exception; )
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testCreateMovie() throws Exception {
		// 1. create movie
		String inputFile = this.getClass().getClassLoader().getResource(
				"httpbinding/jra/create_movie.txt")
				.getFile();
		File input = new File(inputFile);
		PostMethod post = new PostMethod(
				"http://localhost:9002/movieservice/movies");
		RequestEntity entity = new FileRequestEntity(input,
				"text/xml; charset=ISO-8859-1");
		post.setRequestEntity(entity);
		HttpClient httpclient = new HttpClient();
		String response = "";

		try {
			Assert.assertEquals(200, httpclient.executeMethod(post));
			response = post.getResponseBodyAsString();
			System.out.println("create: " + response);
		} catch (Exception e) {
			e.printStackTrace();
			Assert.fail();
		} finally {
			post.releaseConnection();
		}

		// 2. get created movie info
		GetMethod get = new GetMethod(
				"http://localhost:9002/movieservice/movies/003");
		httpclient = new HttpClient();
		response = "";
		try {
			Assert.assertEquals(200, httpclient.executeMethod(get));
			response = get.getResponseBodyAsString();
			System.out.println("find after creation: " + response);
		} catch (Exception e) {
			e.printStackTrace();
			Assert.fail();
		} finally {
			get.releaseConnection();
		}

		JAXBContext jaxbContext = JAXBContext
				.newInstance("org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain");
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		JAXBElement<Movie> root = unmarshaller.unmarshal(new StreamSource(
				new StringReader(response)), Movie.class);
		Movie movie = root.getValue();

		// 3. check the new movie information
		Assert.assertEquals("Life Is Beautiful", movie.getTitle());
		Assert.assertEquals("Roberto Benigni", movie.getDirector());
	}

	/**
	 * [Flow #-5] Positive Case : Function to delete existing Movie whose I.D. is “002” with Delete method is called for. 
	 * 
	 * removeMovie method is exposed as RESTful Web Service by using 
	 * @Delete and @HttpResource annotation and then client can be called for. 
	 * 
	 * (ex. @Delete
	 * 		@HttpResource(location = "/movies/{movieId}") public void
	 *                        removeMovie(RemoveMovie removeMovie) throws
	 *                        Exception; )
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testRemoveMovie() throws Exception {
		// 1. remove movie
		DeleteMethod delete = new DeleteMethod(
				"http://localhost:9002/movieservice/movies/002");
		HttpClient httpclient = new HttpClient();
		try {
			Assert.assertEquals(200, httpclient.executeMethod(delete));
		} catch (Exception e) {
			Assert.fail();
		} finally {
			delete.releaseConnection();
		}

		// 2. get movie and check if the movie is
		// removed
		GetMethod get = new GetMethod(
				"http://localhost:9002/movieservice/movies/002");
		httpclient = new HttpClient();
		try {
			Assert.assertEquals(500, httpclient.executeMethod(get));
		} catch (Exception e) {
			Assert.fail();
		} finally {
			get.releaseConnection();
		}
	}

	/**
	 * [Flow #-6] Positive Case : Function to create new Movie list which I.D. is “005” with Post method is called for. 
	 * 
	 * createMovies method is exposed as RESTful Web Service by using 
	 * @Post and @HttpResource annotation and then client can be called for. 
	 * 
	 * (ex. @Post
	 * 		@HttpResource(location = "/movielist") public void
	 *                        createMovies(@WebParam(name = "Movies") Movies
	 *                        movies) throws Exception; )
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testCreateMovies() throws Exception {
		// 1. create movie
		String inputFile = this.getClass().getClassLoader().getResource(
				"httpbinding/jra/create_movies.txt")
				.getFile();
		File input = new File(inputFile);
		PostMethod post = new PostMethod(
				"http://localhost:9002/movieservice/movielist");
		RequestEntity entity = new FileRequestEntity(input,
				"text/xml; charset=ISO-8859-1");
		post.setRequestEntity(entity);
		HttpClient httpclient = new HttpClient();

		try {
			Assert.assertEquals(200, httpclient.executeMethod(post));
		} catch (Exception e) {
			Assert.fail();
		} finally {
			post.releaseConnection();
		}

		// 2. find movies
		GetMethod get = new GetMethod(
				"http://localhost:9002/movieservice/movies");
		HttpClient httpclientforlist = new HttpClient();
		String response = "";
		try {
			Assert.assertEquals(200, httpclientforlist.executeMethod(get));
			response = get.getResponseBodyAsString();
			System.out.println("movies reponse:" + response);
		} catch (Exception e) {
			Assert.fail();
		} finally {
			get.releaseConnection();
		}

		JAXBContext jaxbContext = JAXBContext
				.newInstance("org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain");
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

		Movies movies = (Movies) unmarshaller.unmarshal(new InputSource(
				new StringReader(response)));

		// 3. check the new movie information
		Collection<Movie> col = movies.getMovie();
		Iterator<Movie> itr = col.iterator();
		while (itr.hasNext()) {
			Movie movie = (Movie) itr.next();
			if (movie.getMovieId().equals("005")) {
				Assert.assertEquals("Life Is Beautiful", movie.getTitle());
				Assert.assertEquals("Roberto Benigni", movie.getDirector());
			} else if (movie.getMovieId().equals("006")) {
				Assert.assertEquals("Life Is sad", movie.getTitle());
				Assert.assertEquals("no director", movie.getDirector());
			}
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
