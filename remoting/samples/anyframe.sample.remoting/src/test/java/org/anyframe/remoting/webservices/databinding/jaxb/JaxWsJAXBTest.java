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
package org.anyframe.remoting.webservices.databinding.jaxb;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.anyframe.remoting.RemotingTestCase;
import org.anyframe.remoting.webservices.client.Client;
import org.anyframe.remoting.webservices.client.ClientInfo;
import org.anyframe.remoting.webservices.client.JaxWsClient;
import org.anyframe.remoting.webservices.server.JaxWsServer;
import org.anyframe.remoting.webservices.server.ServerInfo;
import org.anyframe.sample.remoting.movie.jaxws.Movie;
import org.anyframe.sample.remoting.movie.jaxws.MovieService;
import org.anyframe.sample.remoting.movie.jaxws.impl.MovieServiceImpl;


/**
 * TestCase Name : JaxWsJAXBTest <br>
 * <br>
 * [Description] : Apache CXF의 2가지 frontend model(Simple/JAX-WS) 중 JAX-WS frontend를 사용하며,
 *                 JAXB Databinding 방식을 사용한 경우에, Movie 서비스의 기능을 테스트할 수 있는 시나리오들을 정의한 TestCase이다.
 *                 또한 In/Out Parameter로 다양한 type의 value을 이용하여 이상없이 메소드 호출이 되는지 알아보는 Test Method도 함께
 *                 추가되어있다.
 *                 JAXB Databinding와 Simple frontend를 사용 시 문제가 발생하는 경우가 있기 때문에,
 *                 JAXB Databinding은 JAX-WS frontend와 함께 사용하도록 한다.
 * <br>
 * [Characteristic]
 * <li>JAX-WS Frontend 사용</li>
 * <li>JAXB Databinding 방식 사용-JAXB는 Java Architecture for XML Binding 표준이다.</li>
 * <li>Databinding이란 XML Schema를 기준으로 XML 문서와 Java 객체를 매핑해주는 기술로 
 *     Apache CXF는 Databinding을 위해 JAXB를 default로 사용한다.</li>
 * <li>제약 사항 존재-Apache CXF는 JAXB가 default Databinding 방식으로 사용되므로 특별한 설정이 추가되지 않는다.
 *                  Java 코드에 annotation을 설정하여 JAXB Databinding을 사용한다.
 *                  List를 지원하나 Map은 지원하지 않으므로 Map을 이용하여 Databinding하기 위해서는 XmlAdapter을 추가로 작성해야 한다.
 * </li>
 * <br>
 * [Assumption]
 * <li>-서버 : JaxWsServer 사용</li>
 * <li>-클라이언트 : JaxWsClient 사용</li>
 * <br>
 * [Main Flow]
 * <li>#-1  Positive Case : List 형태로 전체 목록을 조회한다.</li>
 * <li>#-2  Positive Case : Map 형태로 전체 목록을 조회한다.</li>
 * <li>#-3  Positive Case : Movie를 조회한다.</li>
 * <li>#-4  Positive Case : 신규 Movie를 생성한다.</li>
 * <li>#-5  Positive Case : Movie 정보를 변경한다.</li>
 * <li>#-6  Positive Case : Movie를 삭제한다.</li>
 * <li>#-7  Positive Case : Type Test - input, output parameter로 int value를 사용하여 호출한다.</li>
 * <li>#-8  Positive Case : Type Test - input, output parameter로 long value를 사용하여 호출한다.</li>
 * <li>#-9  Positive Case : Type Test - input, output parameter로 short value를 사용하여 호출한다.</li>
 * <li>#-10 Positive Case : Type Test - input, output parameter로 float value를 사용하여 호출한다.</li>
 * <li>#-11 Positive Case : Type Test - input, output parameter로 double value를 사용하여 호출한다.</li>
 * <li>#-12 Positive Case : Type Test - input, output parameter로 BigDecimal value를 사용하여 호출한다.</li>
 * <li>#-13 Positive Case : Type Test - input, output parameter로 boolean value를 사용하여 호출한다.</li>
 * <li>#-14 Positive Case : Type Test - input, output parameter로 Character value를 사용하여 호출한다.</li> 
 * <li>#-15 Positive Case : Type Test - input, output parameter로 char value를 사용하여 호출한다.</li> 
 * 
 * @author SooYeon Park
 */
public class JaxWsJAXBTest extends RemotingTestCase {

    // ==============================================================
    // ====== TestCase 수행에 필요한 사전 작업 정의 ====================
    // ==============================================================
    
    public void setUp() throws Exception {
        this.setServer(new JaxWsServer());
        this.getServer().setServerInfo(
            new ServerInfo(MovieService.class, new MovieServiceImpl(),
                "http://localhost:9002/Movie", false, true));
        super.setUp();
    }

    // ==============================================================
    // ====== TestCase methods ======================================
    // ==============================================================
        
    /**
     * [Flow #-1] Positive Case : List 형태로 전체 목록을 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */          
    public void testFindMovieListAll() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, true));

        // 1. find movie list all
        List<Movie> movieList = movieService.findMovieListAll();

        // 2. check the movie list count
        assertEquals(2, movieList.size());
    }

    /**
     * [Flow #-2] Positive Case : Map 형태로 전체 목록을 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */      
    public void testFindMovieMapAll() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. find movie map all
        Map<String, Movie> movieMap = movieService.findMovieMapAll();

        // 2. check the movie map count
        assertEquals(2, movieMap.size());
    }

    /**
     * [Flow #-3] Positive Case : Movie Id가 "001"인 Movie를 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */     
    public void testFindMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. find movie
        Movie movie = movieService.findMovie("001");

        // 2. check the movie information
        assertEquals("The Sound Of Music", movie.getTitle());
        assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-4] Positive Case : Movie Id가 "003"인 신규 Movie를 생성한다.
     * @throws Exception
     *         throws exception which is from service
     */      
    public void testCreateMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. check the existing movie list count
        assertEquals(2, movieService.findMovieListAll().size());

        // 2. create new movie
        movieService.createMovie(new Movie("003", "Life Is Beautiful",
            "Roberto Benigni"));

        // 3. check the new movie list count
        assertEquals(3, movieService.findMovieListAll().size());

        // 4. check the new movie information
        Movie movie = movieService.findMovie("003");
        assertEquals("Life Is Beautiful", movie.getTitle());
        assertEquals("Roberto Benigni", movie.getDirector());
    }

    /**
     * [Flow #-5] Positive Case : Movie Id가 "002"인 기존 Movie 정보를 변경한다.
     * @throws Exception
     *         throws exception which is from service
     */          
    public void testUpdateMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. update movie
        movieService.updateMovie(new Movie("002", "Life Is Wonderful", "Roberto"));

        // 2. find updated movie
        Movie movie = movieService.findMovie("002");

        // 3. check the movie information
        assertEquals("Life Is Wonderful", movie.getTitle());
        assertEquals("Roberto", movie.getDirector());
    }

    /**
     * [Flow #-6] Positive Case : Movie Id가 "002"인 기존 Movie를 삭제한다.
     * @throws Exception
     *         throws exception which is from service
     */      
    public void testRemoveMovie() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        // 1. set movie id to remove
        Movie movie = new Movie();
        movie.setMovieId("002");

        // 2. remove the movie
        movieService.removeMovie(movie);

        // 3. check the removed movie info
        assertNull(movieService.findMovie("002"));
    }

    /**
     * [Flow #-7] Positive Case : Type Test - input, output parameter로 int value를 사용하여 호출한다.
     */  
    public void testMovieIntVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        assertEquals(1, movieService.testMovieIntVal(1));
    }

    /**
     * [Flow #-8] Positive Case : Type Test - input, output parameter로 long value를 사용하여 호출한다.
     */      
    public void testMovieLongVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        assertEquals(1, movieService.testMovieLongVal(1));
    }

    /**
     * [Flow #-9] Positive Case : Type Test - input, output parameter로 short value를 사용하여 호출한다.
     */       
    public void testMovieShortVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));
        short val = 1;
        assertEquals(1, movieService.testMovieShortVal(val));
    }

    /**
     * [Flow #-10] Positive Case : Type Test - input, output parameter로 float value를 사용하여 호출한다.
     */      
    public void testMovieFloatVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));
        float floatVal = 1;
        assertEquals(floatVal, movieService.testMovieFloatVal(floatVal));
    }

    /**
     * [Flow #-11] Positive Case : Type Test - input, output parameter로 double value를 사용하여 호출한다.
     */     
    public void testMovieDoubleVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        assertEquals(1.0, movieService.testMovieDoubleVal(1.0));
    }

    /**
     * [Flow #-12] Positive Case : Type Test - input, output parameter로 BigDecimal value를 사용하여 호출한다.
     */     
    public void testMovieBigDecimalVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        assertEquals(new BigDecimal(1), movieService
            .testMovieBigDecimalVal(new BigDecimal(1)));
    }

    /**
     * [Flow #-13] Positive Case : Type Test - input, output parameter로 boolean value를 사용하여 호출한다.
     */     
    public void testMovieBooleanVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        assertEquals(true, movieService.testMovieBooleanVal(true));
    }

    /**
     * [Flow #-14] Positive Case : Type Test - input, output parameter로 Character value를 사용하여 호출한다.
     */     
    public void testMovieCharacterVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        assertEquals(new Character('M'), movieService
            .testMovieCharacterVal(new Character('M')));
    }

    /**
     * [Flow #-15] Positive Case : Type Test - input, output parameter로 char value를 사용하여 호출한다.
     */      
    public void testMovieCharVal() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        assertEquals('M', movieService.testMovieCharVal('M'));
    }

}
