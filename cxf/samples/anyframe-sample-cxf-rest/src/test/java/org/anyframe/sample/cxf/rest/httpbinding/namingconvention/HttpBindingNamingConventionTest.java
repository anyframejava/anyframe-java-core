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
 * [Description] : HTTP Binding 방식 중에서도 Naming Convention 매핑 방법을 이용하여 RESTful Web Service로 구현한 
 *                 Movie Service의 기능을 테스트하는 TestCase이다.<br>
 * [Characteristic]
 * <li>REST(Representational state transfer)는 World Wide Web처럼 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처 스타일</li>
 * <li>REST는 Roy Fielding이 제창한, 네트워크 기반 애플리케이션을 위한 아키텍쳐 스타일(2000년)</li>
 * <li>적용 예- WWW(웹), Open API(ex. Google, Amazone, eBay, Yahoo 등)</li>
 * <li>CXF을 통해 RESTful 서비스를 구현하는 3가지 방법 - JAX-RS (JSR-311), HTTP Binding, JAX-WS Provider/Dispatch API</li>
 * <li>HTTP Binding 방식으로 RESTful Web Service 구현하는 방법에는 2가지(JRA 설정 방법, NamingConvention 방법)가 있다.
 *     - Naming Convention 기반의 매핑을 통해 쉽고 용이한 방법으로 RESTful 서비스 작성</li>
 * <li>제약 사항 존재- Web Service로 노출시킬 서비스 interface class의 각 method별로 특정 Annotation 설정은 불필요하며
 *                   method name을 naming convention에 맞게 작성해줘야 한다.</li>
 * <br>
 * [Assumption]
 * <li>-서버 : JaxWsServer 사용</li>
 * <li>-클라이언트 : HttpClient 사용</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : Get method로 Movie Service의 전체 목록 조회 기능을 호출하여 XML data를 리턴받고
 *                         JAXB를 사용하여 GetMoviesResponse 객체로 전환하여 사용한다.</li>
 * <li>#-2 Positive Case : URL을 사용하여 Movie Id가 "001"인 Movie를 조회하는 기능을 호출하여 XML data를 리턴받고
 *                         JAXB를 사용하여 GetMovieResponse 객체로 전환하여 사용한다.</li>
 * <li>#-3 Positive Case : Get method로 Movie Id가 "001"인 Movie를 조회하는 기능을 호출하여 XML data를 리턴받고
 *                         JAXB를 사용하여 GetMovieResponse 객체로 전환하여 사용한다.</li>
 * <li>#-4 Positive Case : Delete method로 Movie Id가 "002"인 기존 Movie를 삭제하는 기능을 호출한다.</li>
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class HttpBindingNamingConventionTest extends ServerRunner {

    // ==============================================================
    // ====== TestCase 수행에 필요한 사전 작업 정의 ====================
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
     * [Flow #-1] Positive Case : Get method로 Movie Service의 전체 목록 조회 기능을 호출하여 XML data를 리턴받고
     *                            JAXB를 사용하여 GetMoviesResponse 객체로 전환하여 사용한다.  
     *                            Naming Convention 규칙: Collection<"resource class name"> get+"The plural of resource class name"() 
     *                            
     *                            getMovies method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
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
     * [Flow #-2] Positive Case : URL을 사용하여 Movie Id가 "001"인 Movie를 조회하는 기능을 호출하여 XML data를 리턴받고
     *                            JAXB를 사용하여 GetMovieResponse 객체로 전환하여 사용한다.  
     *                            Naming Convention 규칙: "resource class name" get+"resource class name"(Object id) 
     *                            
     *                            getMovie method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
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
     * [Flow #-3] Positive Case : Get method로 Movie Id가 "001"인 Movie를 조회하는 기능을 호출하여 XML data를 리턴받고
     *                            JAXB를 사용하여 GetMovieResponse 객체로 전환하여 사용한다.  
     *                            Naming Convention 규칙: "resource class name" get+"resource class name"(Object id) 
     *                            
     *                            getMovie method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
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
     * [Flow #-4] Positive Case : Delete method로 Movie Id가 "002"인 기존 Movie를 삭제하는 기능을 호출한다.
     *                            Naming Convention 규칙: void delete or remove +"resource class name"(Object id) 
     *                            
     *                            deleteMovie method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
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
