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
package org.anyframe.remoting.webservices.databinding.mtom;

import java.io.File;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.activation.DataHandler;

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
 * TestCase Name : JaxWsMTOMTest <br>
 * <br>
 * [Description] : Apache CXF의 2가지 frontend model(Simple/JAX-WS) 중 JAX-WS frontend를 사용하며,
 *                 JAXB Databinding 방식과 동시에 MTOM Databinding을 사용하는 경우에, Movie 서비스의 기능을 테스트할 수 있는 시나리오들을 정의한 TestCase이다.
 *                 이때 MTOM을 사용하지 않은 경우와 사용하는 경우에 binary data 전송과 수신이 올바르게 동작하는지 알아보는 Test Method도 함께
 *                 추가되어있다.
 * <br>
 * [Characteristic]
 * <li>Frontend 사용-Simple/JAX-WS frontend 2가지 model과 MTOM은 함께 사용 가능하다.</li>
 * <li>MTOM(Message Transmission Optimization Mechanism)은 SOAP 메시지 통신 최적화 메커니즘으로
 *     서비스를 통해 binary data를 효과적으로 편리하게 전송할 수 있도록 하는 표준이다.</li>
 * <li>MTOM은 binary data를 XML 문서의 일부가 아닌 첨부파일(Attachment) 형태로 생성되어 전송하며, 
 *     Schema Type 혹은 자바 코드에 Annotation을 설정하여 사용한다.</li>
 * <li>제약 사항 존재-binary data를 나타내는 object의 attribute를 javax.activation.DataHandler type으로 정의하며,
 *                  @XmlMimeType("application/octet-stream") annotation 설정도 추가해주도록 한다.
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
 * <li>#-7  Positive Case : MTOM을 적용하지 않고 Movie의 Poster Image를 변경한다.</li>
 * <li>#-8  Positive Case : MTOM을 적용하여 Movie의 Poster Image를 변경한다.</li>
 * 
 * @author SooYeon Park
 */
public class JaxWsMTOMTest extends RemotingTestCase {

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
                "http://localhost:9002/Movie", false, true));

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
                "http://localhost:9002/Movie", false, true));

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
                "http://localhost:9002/Movie", false, true));

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
                "http://localhost:9002/Movie", false, true));

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
                "http://localhost:9002/Movie", false, true));

        // 1. set movie id to remove
        Movie movie = new Movie();
        movie.setMovieId("002");

        // 2. remove the movie
        movieService.removeMovie(movie);

        // 3. check the removed movie info
        assertNull(movieService.findMovie("002"));
    }

    /**
     * [Flow #-7] Positive Case : MTOM을 적용하지 않고 Movie의 Poster Image를 변경한다.
     * @throws Exception
     *         throws exception which is from service
     */ 
    public void testMoviePosterImgByteArrayNotMTOM() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, false));

        // 1. update movie poster image
        Movie movie = movieService.findMovie("001");
        URL fileURL =
            this.getClass().getClassLoader().getResource(
                "webservices/databinding/mtom/soundofmusic.jpg");
        File aFile = new File(new URI(fileURL.toString()));
        long imgSize = aFile.length();
        System.out.println("PosterImg Size using ByteArray is " + imgSize);
        byte[] posterImg = new byte[(int) imgSize];
        InputStream in = fileURL.openStream();
        in.read(posterImg);

        movie.setPosterImgByteArray(posterImg);
        movie.setPosterImgDataHandler(null);
        movieService.updateMovie(movie);

        // 2. find updated movie
        Movie updatedMovie = movieService.findMovie("001");

        // 3. check the movie information
        assertEquals("The Sound Of Music", updatedMovie.getTitle());
        assertEquals("Robert Wise", updatedMovie.getDirector());
        assertEquals((int) imgSize, updatedMovie.getPosterImgByteArray().length);
    }

    /**
     * [Flow #-8] Positive Case : MTOM을 적용하여 Movie의 Poster Image를 변경한다.
     * @throws Exception
     *         throws exception which is from service
     */     
    public void testMoviePosterImgDataHandlerMTOM() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false, true));

        // 1. update movie poster image
        Movie movie = movieService.findMovie("001");
        URL fileURL =
            this.getClass().getClassLoader().getResource(
                "webservices/databinding/mtom/soundofmusic.jpg");
        DataHandler posterImg = new DataHandler(fileURL);
        int imgSize = posterImg.getInputStream().available();
        System.out.println("PosterImg Size using DataHandler is " + imgSize);

        movie.setPosterImgDataHandler(posterImg);
        movie.setPosterImgByteArray(null);
        movieService.updateMovie(movie);

        // 2. find updated movie
        Movie updatedMovie = movieService.findMovie("001");

        // 3. check the movie information
        assertEquals("The Sound Of Music", updatedMovie.getTitle());
        assertEquals("Robert Wise", updatedMovie.getDirector());
        assertEquals(imgSize, updatedMovie.getPosterImgMTOM().getInputStream()
            .available());
    }
}
