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
package org.anyframe.sample.cxf.rest.dispatch;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import java.util.Map;
import java.util.Properties;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import javax.xml.namespace.QName;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.ws.Dispatch;
import javax.xml.ws.Endpoint;
import javax.xml.ws.Service;
import javax.xml.ws.handler.MessageContext;
import javax.xml.ws.http.HTTPBinding;

import org.anyframe.sample.cxf.rest.ServerRunner;
import org.anyframe.sample.cxf.rest.moviefinder.dispatch.Movie;
import org.anyframe.sample.cxf.rest.moviefinder.dispatch.MovieServicePayloadProvider;
import org.anyframe.sample.cxf.rest.moviefinder.dispatch.Movies;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.cxf.helpers.IOUtils;
import org.apache.cxf.io.CachedOutputStream;
import org.apache.cxf.staxutils.StaxUtils;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

/**
 * TestCase Name : ProviderDispatchTest <br>
 * <br>
 * [Description] : This TestCase test Movie Service function implemented as RESTful Web Service by using
 *                 JAX-WS Provider/Dispatch API.
 *                 
 * [Characteristic]
 * <li>REST(Representational state transfer)adopts software architecture style for distributed hypermedia system such as World Wide Web.</li>
 * <li>REST adopts architecture style for network-based application proclaimed by Roy Fielding.</li>
 * <li>Applied example - WWW(Web), Open API(ex. Google, Amazon, eBay, Yahoo)</li>
 * <li>Three way to implement RESTful service via CXF- JAX-RS (JSR-311), HTTP Binding, JAX-WS Provider/Dispatch API</li>
 * <li>Simple development of RESTful service, Though it uses standard API, it is not flexible structure compared to HTTP Binding</li>
 * <li>Server Implementation: Service to be exposed as Web Service is developed 
 *               as MovieServicePayloadProvider class implementing MovieServicePayloadProvider class
 *               and invoke method is implemented.          
 * </li>
 * <br>
 * [Assumption]
 * <li>-Server : Endpoint, Provider Use </li>
 * <li>- Client : HttpClient, Dispatch Use </li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : By using HttpClient, the whole Movie list is searched in the format of List. </li>
 * <li>#-2 Positive Case : By using URL, Movie whose I.D. is 001" is searched. </li>
 * <li>#-3 Positive Case : By using HttpClient, Movie whose I.D. is 001" is searched. </li>
 * <li>#-4 Positive Case : By using Dispatch, existing Movie information whose Movie I.D. is "002".</li>
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class ProviderDispatchTest extends ServerRunner {

	// ==============================================================
	// ====== Pre-job definition necessary for TestCase execution  ====================
	// ==============================================================

	@Before
	public void setUp() throws Exception {
		Endpoint e = Endpoint.create(HTTPBinding.HTTP_BINDING,
				new MovieServicePayloadProvider());
		String address = "http://localhost:9002/movieservice/movies";
		e.publish(address);
	}

	// ==============================================================
	// ====== TestCase methods ======================================
	// ==============================================================

	/**
	 * [Flow #-1] Positive Case : By using HttpClient, the whole Movie list is searched in the format of List.  
	 * 
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
			System.out.println("findMovieListAll : " + response);
			Assert.assertNotNull(response);
		} catch (Exception e) {
			Assert.fail();
		} finally {
			get.releaseConnection();
		}

		JAXBContext jaxbContext = JAXBContext
				.newInstance("org.anyframe.sample.cxf.rest.moviefinder.dispatch");
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		Movies movies = (Movies) unmarshaller.unmarshal(new InputSource(
				new StringReader(response)));

		// 2. check the movie information
		Assert.assertEquals(2, movies.getMovie().size());
	}

	/**
	 * [Flow #-2] Positive Case : By using URL, Movie whose I.D. is 001" is searched. 
	 * 
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testFindMovieUsingURL() throws Exception {
		// 1. find movie
		URL url = new URL(
				"http://localhost:9002/movieservice/movies?movieId=001");
		InputStream in = url.openStream();

		String response = getStringFromInputStream(in);
		Assert.assertNotNull(response);

		JAXBContext jaxbContext = JAXBContext
				.newInstance("org.anyframe.sample.cxf.rest.moviefinder.dispatch");
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		Movie movie = (Movie) unmarshaller.unmarshal(new InputSource(
				new StringReader(response)));

		// 2. check the movie information
		Assert.assertEquals("The Sound Of Music", movie.getTitle());
		Assert.assertEquals("Robert Wise", movie.getDirector());
	}

	/**
	 * [Flow #-3] Positive Case : By using HttpClient, Movie whose I.D. is 001" is searched. 
	 * 
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testFindMovie() throws Exception {
		// 1. find movie
		GetMethod get = new GetMethod(
				"http://localhost:9002/movieservice/movies?movieId=001");
		HttpClient httpclient = new HttpClient();
		String response = "";
		try {
			Assert.assertEquals(200, httpclient.executeMethod(get));
			response = get.getResponseBodyAsString();
			System.out.println("find: " + response);
			Assert.assertNotNull(response);
		} catch (Exception e) {
			Assert.fail();
		} finally {
			get.releaseConnection();
		}

		JAXBContext jaxbContext = JAXBContext
				.newInstance("org.anyframe.sample.cxf.rest.moviefinder.dispatch");
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		Movie movie = (Movie) unmarshaller.unmarshal(new InputSource(
				new StringReader(response)));

		// 2. check the movie information
		Assert.assertEquals("The Sound Of Music", movie.getTitle());
		Assert.assertEquals("Robert Wise", movie.getDirector());
	}

	/**
	 * [Flow #-4] Positive Case : By using Dispatch, existing Movie information 
	 * whose Movie I.D. is "002" is modified. 
	 * 
	 * @throws Exception
	 *             throws exception which is from service
	 */
	@Test
	public void testUpdateMovie() throws Exception {
		QName serviceName = new QName("movieservice");
		QName portName = new QName("MovieServicePayloadProviderPort");

		Service service = Service.create(serviceName);
		service.addPort(portName, HTTPBinding.HTTP_BINDING,
				"http://localhost:9002/movieservice/movies");
		Dispatch<DOMSource> dispatcher = service.createDispatch(portName,
				DOMSource.class, Service.Mode.PAYLOAD);
		Map<String, Object> requestContext = dispatcher.getRequestContext();

		InputStream is = getClass().getClassLoader().getResourceAsStream(
				"dispatch/client/Movie-movieId=002Req.xml");

		Document doc = StaxUtils.read(is);
		DOMSource reqMsg = new DOMSource(doc);

		requestContext.put(MessageContext.HTTP_REQUEST_METHOD, "POST");
		System.out
				.println("Invoking through HTTP POST to update movie using JAX-WS Dispatch");
		DOMSource result = dispatcher.invoke(reqMsg);
		printSource(result);

		JAXBContext jaxbContext = JAXBContext
				.newInstance("org.anyframe.sample.cxf.rest.moviefinder.dispatch");
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		Movie movie = (Movie) unmarshaller.unmarshal(result);

		// 3. check the new movie information
		Assert.assertEquals("Life Is Wonderful", movie.getTitle());
		Assert.assertEquals("Roberto", movie.getDirector());
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

	private static void printSource(Source source) {
		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			StreamResult sr = new StreamResult(bos);
			Transformer trans = TransformerFactory.newInstance()
					.newTransformer();
			Properties oprops = new Properties();
			oprops.put(OutputKeys.OMIT_XML_DECLARATION, "yes");
			trans.setOutputProperties(oprops);
			trans.transform(source, sr);
			System.out.println("**** Response ******");
			System.out.println(bos.toString());
			bos.close();
			System.out.println();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
