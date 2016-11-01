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
package org.anyframe.remoting.burlap;

import java.util.List;
import java.util.Map;

import org.anyframe.remoting.RemotingSpringTestCase;
import org.anyframe.remoting.webservices.server.JettyServer;
import org.anyframe.remoting.webservices.server.ServerInfo;
import org.anyframe.sample.remoting.movie.Movie;
import org.anyframe.sample.remoting.movie.MovieService;


/**
 * TestCase Name : BurlapSpringSupportTest <br>
 * <br>
 * [Description] : Spring 설정을 이용한 Burlap 기반의 Movie 서비스를 구현하여 서비스의
 * 기능을 테스트할 수 있는 시나리오들을 정의한 TestCase이다. 
 * <br> 
 * [Characteristic]
 * <li>Caucho Technology에서 제공하는 HTTP 경량 원격 서비스</li>
 * <li>RMI의 방화벽 문제 해결</li>
 * <li>메모리와 저장 공간이 제한된 환경에서 사용 적합(애플릿/무선 단말기)</li>
 * <li>제약 사항 존재-자바 표준 직렬화 매커니즘이 아닌 자체 직렬화 매커니즘 사용으로 복합 데이터 모델 불충분</li>
 * <li>서버 구현: Spring에서 제공하는 org.springframework.remoting.caucho.BurlapServiceExporter 클래스를 이용하여 
 *               손쉽게 일반 Spring Bean으로 작성된 서비스를 Burlap Service로 노출,
 *               Spring MVC를 사용하여 HTTP 기반 Burlap 컨트롤러 설정</li>
 * <li>클라이언트 구현: Spring에서 제공하는 org.springframework.remoting.caucho.BurlapProxyFactoryBean 클래스 이용</li>
 * <br>
 * [Assumption]
 * <li>-서버 : JettyServer 사용, Spring 설정 파일 이용</li>
 * <li>-클라이언트 : RemotingSpringTestCase 사용, Spring 설정 파일 이용</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : List 형태로 전체 목록을 조회한다.</li>
 * <li>#-2 Positive Case : Map 형태로 전체 목록을 조회한다.</li>
 * <li>#-3 Positive Case : Movie를 조회한다.</li>
 * <li>#-4 Positive Case : 신규 Movie를 생성한다.</li>
 * <li>#-5 Positive Case : Movie 정보를 변경한다.</li>
 * <li>#-6 Positive Case : Movie를 삭제한다.</li>
 * 
 * @author SooYeon Park
 */
public class BurlapSpringSupportTest extends RemotingSpringTestCase {

    // ==============================================================
    // ====== TestCase 수행에 필요한 사전 작업 정의 ====================
    // ==============================================================
    
    private MovieService movieServiceClient = null;

    public void setMovieServiceClient(MovieService movieService) {
        this.movieServiceClient = movieService;
    }

    protected String[] getConfigLocations() {
        try {
            onSetUpServer();
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
        return new String[] {"classpath*:/burlap/client/context-movie-client.xml" };
    }

    public void onSetUpServer() throws Exception {
        this.setServer(new JettyServer());
        ServerInfo serverInfo = new ServerInfo();
        serverInfo.setPort(9002);
        serverInfo.setWarpath("src/test/resources/burlap/server");
        this.getServer().setServerInfo(serverInfo);
        super.onSetUp();
    }

    public void onSetUp() throws Exception {
        // do nothing because getConfigLocations()
        // method is invoked before onSetUp() method is
        // called
        // we have to start server before creating
        // client spring context
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
        // 1. find movie list all
        List<Movie> movieList = movieServiceClient.findMovieListAll();

        // 2. check the movie list count
        assertEquals(2, movieList.size());
    }

    /**
     * [Flow #-2] Positive Case : Map 형태로 전체 목록을 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */
    public void testFindMovieMapAll() throws Exception {
        // 1. find movie map all
        Map<String, Movie> movieMap = movieServiceClient.findMovieMapAll();

        // 2. check the movie map count
        assertEquals(2, movieMap.size());
    }

    /**
     * [Flow #-3] Positive Case : Movie Id가 "001"인 Movie를 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */    
    public void testFindMovie() throws Exception {
        // 1. find movie
        Movie movie = movieServiceClient.findMovie("001");

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
        // 1. check the existing movie list count
        assertEquals(2, movieServiceClient.findMovieListAll().size());

        // 2. create new movie
        movieServiceClient.createMovie(new Movie("003", "Life Is Beautiful",
            "Roberto Benigni"));

        // 3. check the new movie list count
        assertEquals(3, movieServiceClient.findMovieListAll().size());

        // 4. check the new movie information
        Movie movie = movieServiceClient.findMovie("003");
        assertEquals("Life Is Beautiful", movie.getTitle());
        assertEquals("Roberto Benigni", movie.getDirector());
    }

    /**
     * [Flow #-5] Positive Case : Movie Id가 "002"인 기존 Movie 정보를 변경한다.
     * @throws Exception
     *         throws exception which is from service
     */     
    public void testUpdateMovie() throws Exception {
        // 1. update movie
        movieServiceClient.updateMovie(new Movie("002", "Life Is Wonderful",
            "Roberto"));

        // 2. find updated movie
        Movie movie = movieServiceClient.findMovie("002");

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
        // 1. set movie id to remove
        Movie movie = new Movie();
        movie.setMovieId("002");

        // 2. remove the movie
        movieServiceClient.removeMovie(movie);

        // 3. check the removed movie info
        assertNull(movieServiceClient.findMovie("002"));
    }
}
