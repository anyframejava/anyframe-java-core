/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.remoting.webservices.restful.httpbinding;

import java.io.File;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import java.util.Collection;
import java.util.Iterator;

import javax.jws.WebParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;

import org.anyframe.remoting.RemotingTestCase;
import org.anyframe.remoting.webservices.server.JaxWsServer;
import org.anyframe.remoting.webservices.server.ServerInfo;
import org.anyframe.sample.remoting.movie.restful.httpbinding.jra.Movie;
import org.anyframe.sample.remoting.movie.restful.httpbinding.jra.MovieService;
import org.anyframe.sample.remoting.movie.restful.httpbinding.jra.Movies;
import org.anyframe.sample.remoting.movie.restful.httpbinding.jra.impl.MovieServiceImpl;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.DeleteMethod;
import org.apache.commons.httpclient.methods.FileRequestEntity;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.PutMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.cxf.binding.http.HttpBindingFactory;
import org.apache.cxf.helpers.IOUtils;
import org.apache.cxf.io.CachedOutputStream;
import org.codehaus.jra.HttpResource;
import org.codehaus.jra.Post;
import org.xml.sax.InputSource;


/**
 * TestCase Name : HttpBindingJRATest <br>
 * <br>
 * [Description] : HTTP Binding 방식 중에서도 JRA(Java REST Annotation) 설정을 이용하여 RESTful Web Service로 구현한 
 *                 Movie Service의 기능을 테스트하는 TestCase이다.<br>
 * [Characteristic]
 * <li>REST(Representational state transfer)는 World Wide Web처럼 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처 스타일</li>
 * <li>REST는 Roy Fielding이 제창한, 네트워크 기반 애플리케이션을 위한 아키텍쳐 스타일(2000년)</li>
 * <li>적용 예- WWW(웹), Open API(ex. Google, Amazone, eBay, Yahoo 등)</li>
 * <li>CXF을 통해 RESTful 서비스를 구현하는 3가지 방법 - JAX-RS (JSR-311), HTTP Binding, JAX-WS Provider/Dispatch API</li>
 * <li>HTTP Binding 방식으로 RESTful Web Service를 구현하는 방법에는 2가지(JRA 설정 방법, NamingConvention 방법)가 있다.
 *     - JRA(Java REST Annotation) 설정을 통해 쉽고 용이한 방법으로 RESTful 서비스 작성</li>
 * <li>제약 사항 존재- Web Service로 노출시킬 서비스 interface class의 각 method별로 JRA 설정을 하여 RESTful Web Service를 구현한다.</li>
 * <br>
 * [Assumption]
 * <li>-서버 : JaxWsServer 사용</li>
 * <li>-클라이언트 : HttpClient 사용</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : Get method로 Movie Service의 전체 목록 조회 기능을 호출하여 XML data를 리턴받고
 *                         JAXB를 사용하여 Movies 객체로 전환하여 사용한다.</li>
 * <li>#-2 Positive Case : URL을 사용하여 Movie Id가 "001"인 Movie를 조회하는 기능을 호출하여 XML data를 리턴받고
 *                         JAXB를 사용하여 Movie 객체로 전환하여 사용한다.</li>
 * <li>#-3 Positive Case : Get method로 Movie Id가 "001"인 Movie를 조회하는 기능을 호출하여 XML data를 리턴받고
 *                         JAXB를 사용하여 Movie 객체로 전환하여 사용한다.</li>
 * <li>#-4 Positive Case : Post method로 Movie Id가 "003"인 신규 Movie를 생성하는 기능을 호출한다.</li>
 * <li>#-5 Positive Case : Put method로 Movie Id가 "002"인 기존 Movie 정보를 변경하는 기능을 호출한다.</li>
 * <li>#-6 Positive Case : Delete method로 Movie Id가 "002"인 기존 Movie를 삭제하는 기능을 호출한다.</li>
 * <li>#-7 Positive Case : Post method로 Movie Id가 "005", "006"인 신규 Movie 목록을 생성하는 기능을 호출한다.</li>
 *
 * @author SooYeon Park
 */
public class HttpBindingJRATest extends RemotingTestCase {

    // ==============================================================
    // ====== TestCase 수행에 필요한 사전 작업 정의 ====================
    // ==============================================================
    
    public void setUp() throws Exception {
        this.setServer(new JaxWsServer());
        ServerInfo serverInfo =
            new ServerInfo(MovieService.class, new MovieServiceImpl(),
                "http://localhost:9002/movieservice/");
        // Use the HTTP Binding which understands the
        // Java Rest Annotations
        serverInfo.setBindingId(HttpBindingFactory.HTTP_BINDING_ID);
        serverInfo.setWrapped(false);
        this.getServer().setServerInfo(serverInfo);
        super.setUp();
    }
    
    // ==============================================================
    // ====== TestCase methods ======================================
    // ==============================================================    
     
    /**
     * [Flow #-1] Positive Case : Get method로 Movie Service의 전체 목록 조회 기능을 호출하여 XML data를 리턴받고
     *                            JAXB를 사용하여 Movies 객체로 전환하여 사용한다.  
     *                            @Get, @HttpResource, @WebResult annotation을 이용하여
     *                            findMovieListAll method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
     *                            (ex. @Get
     *                                 @HttpResource(location = "/movies")
     *                                 @WebResult(name = "Movies")
     *                                 public Movies findMovieListAll() throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */     
    public void testFindMovieListAll() throws Exception {
        // 1. find movie
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies");
        HttpClient httpclient = new HttpClient();
        String response = "";
        try {
            assertEquals(200, httpclient.executeMethod(get));
            response = get.getResponseBodyAsString();
            System.out.println(response);
        } catch (Exception e) {
            fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext
                .newInstance("org.anyframe.sample.remoting.movie.restful.httpbinding.jra");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

        
        JAXBElement<Movies> root = unmarshaller.unmarshal(new StreamSource(new StringReader(
            response)), Movies.class);
        Movies movies = root.getValue();
    
//        Movies movies =
//            (Movies) unmarshaller.unmarshal(new InputSource(new StringReader(
//                response)));

        // 2. check the movie information
        assertEquals(2, movies.getMovie().size());
    }
 
    /**
     * [Flow #-2] Positive Case : URL을 사용하여 Movie Id가 "001"인 Movie를 조회하는 기능을 호출하여 XML data를 리턴받고
     *                            JAXB를 사용하여 Movie 객체로 전환하여 사용한다.  
     *                            @Get, @HttpResource, @WebResult annotation을 이용하여
     *                            findMovie method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
     *                            (ex. @Get
     *                                 @HttpResource(location = "/movies/{movieId}")
     *                                 @WebResult(name = "Movie")
     *                                 public Movie findMovie(FindMovie findMovie) throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */     
    public void testFindMovieUsingURL() throws Exception {
        // 1. find movie
        URL url = new URL("http://localhost:9002/movieservice/movies/001");
        InputStream in = url.openStream();

        String response = getStringFromInputStream(in);
        assertNotNull(response);

        JAXBContext jaxbContext =
            JAXBContext
                .newInstance("org.anyframe.sample.remoting.movie.restful.httpbinding.jra");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the movie information
        assertEquals("The Sound Of Music", movie.getTitle());
        assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-3] Positive Case : Get method로 Movie Id가 "001"인 Movie를 조회하는 기능을 호출하여 XML data를 리턴받고
     *                            JAXB를 사용하여 Movie 객체로 전환하여 사용한다.  
     *                            @Get, @HttpResource, @WebResult annotation을 이용하여
     *                            findMovie method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
     *                            (ex. @Get
     *                                 @HttpResource(location = "/movies/{movieId}")
     *                                 @WebResult(name = "Movie")
     *                                 public Movie findMovie(FindMovie findMovie) throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */    
    public void testFindMovie() throws Exception {
        // 1. find movie
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies/001");
        HttpClient httpclient = new HttpClient();
        String response = "";
        try {
            assertEquals(200, httpclient.executeMethod(get));
            response = get.getResponseBodyAsString();
            System.out.println("find: " + response);
        } catch (Exception e) {
            fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext
                .newInstance("org.anyframe.sample.remoting.movie.restful.httpbinding.jra");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the movie information
        assertEquals("The Sound Of Music", movie.getTitle());
        assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-4] Positive Case : Post method로 Movie Id가 "003"인 신규 Movie를 생성하는 기능을 호출한다.
     *                            @Post, @HttpResource annotation을 이용하여
     *                            createMovie method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
     *                            (ex. @Post
     *                                 @HttpResource(location = "/movies")
     *                                 public void createMovie(@WebParam(name = "Movie") Movie movie) throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */     
    public void testCreateMovie() throws Exception {
        // 1. create movie
        String inputFile =
            this.getClass().getClassLoader().getResource(
                "webservices/restful/httpbinding/jra/create_movie.txt")
                .getFile();
        File input = new File(inputFile);
        PostMethod post =
            new PostMethod("http://localhost:9002/movieservice/movies");
        RequestEntity entity =
            new FileRequestEntity(input, "text/xml; charset=ISO-8859-1");
        post.setRequestEntity(entity);
        HttpClient httpclient = new HttpClient();
        String response = "";

        try {
            assertEquals(200, httpclient.executeMethod(post));
            response = post.getResponseBodyAsString();
            System.out.println("create: " + response);
        } catch (Exception e) {
            fail();
        } finally {
            post.releaseConnection();
        }

        // 2. get created movie info
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies/003");
        httpclient = new HttpClient();
        response = "";
        try {
            assertEquals(200, httpclient.executeMethod(get));
            response = get.getResponseBodyAsString();
            System.out.println("find after creation: " + response);
        } catch (Exception e) {
            fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext
            .newInstance("org.anyframe.sample.remoting.movie.restful.httpbinding.jra");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        JAXBElement<Movie> root = unmarshaller.unmarshal(new StreamSource(new StringReader(
                response)), Movie.class);
        Movie movie = root.getValue();
        
//        Movie movie =
//            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
//                response)));


        // 3. check the new movie information
        assertEquals("Life Is Beautiful", movie.getTitle());
        assertEquals("Roberto Benigni", movie.getDirector());
    }

    /**
     * [Flow #-5] Positive Case : Put method로 Movie Id가 "002"인 기존 Movie 정보를 변경하는 기능을 호출한다.
     *                            @Post, @HttpResource annotation을 이용하여
     *                            updateMovie method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
     *                            (ex. @Put
     *                                 @HttpResource(location = "/movies/{movieId}")
     *                                 public void updateMovie(@WebParam(name = "Movie") Movie movie) throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */       
    public void testUpdateMovie() throws Exception {
        // 1. update movie
        String inputFile =
            this.getClass().getClassLoader().getResource(
                "webservices/restful/httpbinding/jra/update_movie.txt")
                .getFile();
        File input = new File(inputFile);
        PutMethod put =
            new PutMethod("http://localhost:9002/movieservice/movies/002");
        RequestEntity entity =
            new FileRequestEntity(input, "text/xml; charset=ISO-8859-1");
        put.setRequestEntity(entity);
        HttpClient httpclient = new HttpClient();
        String response = "";

        try {
            assertEquals(200, httpclient.executeMethod(put));
            response = put.getResponseBodyAsString();
            System.out.println("update: " + response);
        } catch (Exception e) {
            fail();
        } finally {
            put.releaseConnection();
        }

        // 2. get update movie info
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies/002");
        httpclient = new HttpClient();
        response = "";
        try {
            assertEquals(200, httpclient.executeMethod(get));
            response = get.getResponseBodyAsString();
        } catch (Exception e) {
            fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext
                .newInstance("org.anyframe.sample.remoting.movie.restful.httpbinding.jra");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 3. check the new movie information
        assertEquals("Life Is Wonderful", movie.getTitle());
        assertEquals("Roberto", movie.getDirector());
    }

    /**
     * [Flow #-6] Positive Case : Delete method로 Movie Id가 "002"인 기존 Movie를 삭제하는 기능을 호출한다.
     *                            @Delete, @HttpResource annotation을 이용하여
     *                            removeMovie method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
     *                            (ex. @Delete
     *                                 @HttpResource(location = "/movies/{movieId}")
     *                                 public void removeMovie(RemoveMovie removeMovie) throws Exception;
     *                             )
     * @throws Exception
     *         throws exception which is from service                            
     */         
    public void testRemoveMovie() throws Exception {
        // 1. remove movie
        DeleteMethod delete =
            new DeleteMethod("http://localhost:9002/movieservice/movies/002");
        HttpClient httpclient = new HttpClient();
        try {
            assertEquals(200, httpclient.executeMethod(delete));
        } catch (Exception e) {
            fail();
        } finally {
            delete.releaseConnection();
        }

        // 2. get movie and check if the movie is
        // removed
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies/002");
        httpclient = new HttpClient();
        try {
            assertEquals(500, httpclient.executeMethod(get));
        } catch (Exception e) {
            fail();
        } finally {
            get.releaseConnection();
        }
    }

    /**
     * [Flow #-7] Positive Case : Post method로 Movie Id가 "005", "006"인 신규 Movie 목록을 생성하는 기능을 호출한다.
     *                            @Post, @HttpResource annotation을 이용하여
     *                            createMovies method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
     *                            (ex. @Post
     *                                 @HttpResource(location = "/movielist")
     *                                 public void createMovies(@WebParam(name = "Movies")
     *                                   Movies movies) throws Exception;
     *                            ) 
     * @throws Exception
     *         throws exception which is from service                            
     */     
    public void testCreateMovies() throws Exception {
        // 1. create movie
        String inputFile =
            this.getClass().getClassLoader().getResource(
                "webservices/restful/httpbinding/jra/create_movies.txt")
                .getFile();
        File input = new File(inputFile);
        PostMethod post =
            new PostMethod("http://localhost:9002/movieservice/movielist");
        RequestEntity entity =
            new FileRequestEntity(input, "text/xml; charset=ISO-8859-1");
        post.setRequestEntity(entity);
        HttpClient httpclient = new HttpClient();

        try {
            assertEquals(200, httpclient.executeMethod(post));
        } catch (Exception e) {
            fail();
        } finally {
            post.releaseConnection();
        }

        // 2. find movies
        GetMethod get =
            new GetMethod("http://localhost:9002/movieservice/movies");
        HttpClient httpclientforlist = new HttpClient();
        String response = "";
        try {
            assertEquals(200, httpclientforlist.executeMethod(get));
            response = get.getResponseBodyAsString();
            System.out.println("movies reponse:"+response);
        } catch (Exception e) {
            fail();
        } finally {
            get.releaseConnection();
        }
        
        JAXBContext jaxbContext =
            JAXBContext
                .newInstance("org.anyframe.sample.remoting.movie.restful.httpbinding.jra");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

        Movies movies =
            (Movies) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 3. check the new movie information
        Collection col = movies.getMovie();
        Iterator itr = col.iterator();
        while(itr.hasNext())
        {
            Movie movie = (Movie)itr.next();
            if(movie.getMovieId().equals("005"))
            {
                assertEquals("Life Is Beautiful", movie.getTitle());
                assertEquals("Roberto Benigni", movie.getDirector());                
            }
            else if(movie.getMovieId().equals("006"))
            {
                assertEquals("Life Is sad", movie.getTitle());
                assertEquals("no director", movie.getDirector());                
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
