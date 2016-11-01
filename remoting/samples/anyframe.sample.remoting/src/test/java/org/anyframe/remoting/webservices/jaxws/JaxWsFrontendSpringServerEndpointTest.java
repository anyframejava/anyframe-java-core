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
package org.anyframe.remoting.webservices.jaxws;

import java.util.List;
import java.util.Map;

import org.anyframe.remoting.RemotingTestCase;
import org.anyframe.remoting.webservices.client.Client;
import org.anyframe.remoting.webservices.client.ClientInfo;
import org.anyframe.remoting.webservices.client.JaxWsClient;
import org.anyframe.remoting.webservices.server.JettyServer;
import org.anyframe.remoting.webservices.server.ServerInfo;
import org.anyframe.sample.remoting.movie.jaxws.Movie;
import org.anyframe.sample.remoting.movie.jaxws.MovieService;


/**
 * TestCase Name : JaxWsFrontendSpringTest <br>
 * <br>
 * [Description] : Apache CXF의 2가지 frontend model(Simple/JAX-WS) 중 JAX-WS frontend를 사용하여
 *                 Spring 기반으로 구현한 Movie Web Service의 기능을 테스트할 수 있는 시나리오들을 정의한 TestCase이다.
 * <br>
 * [Characteristic]
 * <li>JAX-WS Frontend 사용</li>
 * <li>서버 구현: JAX-WS frontend 방식 이용 시 Spring 설정 파일에 <jaxws:endpoint/> Tag를 이용하여  
 *               손쉽게 일반 Spring Bean으로 작성된 서비스를 Web Service로 노출한다.
 *               web.xml에 모든 request 요청 시 org.apache.cxf.transport.servlet.CXFServlet가 처리할 수 있도록 설정하고, 
 *               org.springframework.web.context.ContextLoaderListener를 등록하여 Web Container가 기동 시
 *               Spring Container가 start되도록 한다. </li>
 * <br>
 * [Assumption]
 * <li>-서버 : JettyServer 사용, Spring 설정 파일 이용</li>
 * <li>-클라이언트 : JaxWsClient 사용</li>
 * <br>
 * [Main Flow]
 * <li>#-1  Positive Case : List 형태로 전체 목록을 조회한다.</li>
 * <li>#-2  Positive Case : Map 형태로 전체 목록을 조회한다.</li>
 * <li>#-3  Positive Case : Movie를 조회한다.</li>
 * <li>#-4  Positive Case : 신규 Movie를 생성한다.</li>
 * <li>#-5  Positive Case : Movie 정보를 변경한다.</li>
 * <li>#-6  Positive Case : Movie를 삭제한다.</li> 
 * 
 * @author SooYeon Park
 */
public class JaxWsFrontendSpringServerEndpointTest extends RemotingTestCase {

    // ==============================================================
    // ====== TestCase 수행에 필요한 사전 작업 정의 ====================
    // ==============================================================
    
    public void setUp() throws Exception {
        this.setServer(new JettyServer());
        ServerInfo serverInfo = new ServerInfo();
        serverInfo.setPort(9002);
        serverInfo
            .setWarpath("src/test/resources/webservices/jaxws/server/endpoint/webapp");
        this.getServer().setServerInfo(serverInfo);
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
                "http://localhost:9002/Movie", false));

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
        movieService.updateMovie(new Movie("002", "Life Is Wonderful",
            "Roberto"));

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
}
