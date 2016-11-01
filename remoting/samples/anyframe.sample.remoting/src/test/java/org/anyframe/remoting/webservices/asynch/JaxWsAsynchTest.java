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
package org.anyframe.remoting.webservices.asynch;

import java.io.File;
import java.util.List;
import java.util.concurrent.Future;

import javax.xml.namespace.QName;
import javax.xml.ws.Response;

import org.anyframe.remoting.RemotingTestCase;
import org.anyframe.remoting.webservices.client.Client;
import org.anyframe.remoting.webservices.client.ClientInfo;
import org.anyframe.remoting.webservices.client.JaxWsClient;
import org.anyframe.remoting.webservices.server.JaxWsServer;
import org.anyframe.remoting.webservices.server.ServerInfo;
import org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.FindMovieListAllResponse;
import org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.Movie;
import org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.MovieServiceAsynch;
import org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.MovieServiceAsynchService;
import org.anyframe.sample.remoting.movie.jaxws.asynch.impl.MovieServiceImpl;


/**
 * TestCase Name : JaxWsAsynchTest <br>
 * <br>
 * [Description] : JAX-WS Spec.에 정의된 Asynchronous Method Invocation 기능을 테스트하는 TestCase로, 
 *                 Polling 방식과 Callback 방식 2가지 모두를 테스트 대상으로 하고있다.<br>
 * [Characteristic]
 * <li>Apache CXF는 보통의 synchronous한 호출방식과 함께, 2가지 형태의 asynchronous 호출방식 지원</li>
 * <li>Polling approach-원격에 존재하는 메소드를 호출하기 위해, output 파라미터 없이 javax.xml.ws.Response 
 *                      객체를 리턴하는 특정 메소드를 호출함,
 *                      javax.util.concurrency.Future 인터페이스를 상속받은 Response 객체는 응답 메시지가 
 *                      도착했는지 여부를 확인하는 표를 받음</li>
 * <li>Callback approach-원격에 존재하는 메소드를 호출하기 위해, 파라미터 중 하나가 javax.xml.ws.AsyncHandler 타입인
 *                       callback 객체에 참조관계가 있는 특정 메소드를 호출함,
 *                       응답 메시지가 클라이언트에 도착하자마자, CXF 런타임 환경은 응답 메시지의 컨텐츠에 그것을 
 *                       전달해주기 위해 AsyncHandler 객체를 재호출함</li>
 * <li>제약 사항 존재-Callback approach 사용 시 AsyncHandler 클래스 구현 필요,
 *                   서비스 인터페이스에 메소드(메소드명: 대상 메소드 명 + "Async") 추가 작성
 *                   (Polling approach: 리턴타입이 Response인 메소드 작성,
 *                    Callback approach: 리턴타입이 Future<?>이며 AsyncHandler 파라미터를 추가로 갖는 메소드 작성)
 * </li>
 * <li>서버 구현: Web Service로 노출시킬 Interface 클래스를 대상으로 java2ws Tool을 사용하여 WSDL 파일을 생성해냄,
 *               wsdl2java Tool을 통해 WSDL 파일과 asynch_binding.xml 파일을 이용하여 Java 소스 코드들을 생성해냄
 *               (anyframe.sample.movie.jaxws.asynch.asynch_soap_http package 하위의 클래스들(SEI, WebServiceClient, complex type classes)
 * </li>
 * <br>
 * [Assumption]
 * <li>-서버 : JaxWsServer 사용</li>
 * <li>-클라이언트 : JaxWsClient 사용, wsdl2java tool에 의해 자동생성된 MovieServiceAsynchService 클래스 사용</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : Synchronous method invocation 방식으로 List 형태의 Movie 전체 목록을 조회한다.</li>
 * <li>#-2 Positive Case : Asynchronous method invocation 방식 중 Polling approach 방법으로 
 *                         List 형태의 Movie 전체 목록을 조회한다.</li>
 * <li>#-3 Positive Case : Asynchronous method invocation 방식 중 Callback approach 방법으로
 *                         List 형태의 Movie 전체 목록을 조회한다.</li>
 * 
 * @author SooYeon Park
 */
public class JaxWsAsynchTest extends RemotingTestCase {

    // ==============================================================
    // ====== TestCase 수행에 필요한 사전 작업 정의 ====================
    // ==============================================================
    
    private static final QName SERVICE_NAME =
        new QName("http://asynch.jaxws.movie.sample.anyframe/asynch_soap_http",
            "MovieServiceAsynchService");

    public void setUp() throws Exception {

        // 1. generate WSDL file
        //   command>java2ws -wsdl -cp target/classes
        //   anyframe.sample.movie.jaxws.asynch.MovieServiceAsynch
        // 2. generate classes required in the asynchronous case
        //   command>wsdl2java -d src -b
        //   src/test/resources/webservices/asynch/wsdl/asynch_binding.xml
        //   src/test/resources/webservices/asynch/wsdl/MovieServiceAsynchService.wsdl

        this.setServer(new JaxWsServer());
        this.getServer().setServerInfo(
            new ServerInfo(MovieServiceAsynch.class, new MovieServiceImpl(),
                "http://localhost:9002/Movie", false, false));
        super.setUp();
    }

    // ==============================================================
    // ====== TestCase methods ======================================
    // ==============================================================
    
    /**
     * [Flow #-1] Positive Case : Synchronous method invocation 방식으로 List 형태의 Movie 전체 목록을 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */          
    public void testFindMovieListAll() throws Exception {
        Client client = new JaxWsClient();
        MovieServiceAsynch movieService =
            (MovieServiceAsynch) client.getClient(new ClientInfo(
                MovieServiceAsynch.class, "http://localhost:9002/Movie", false,
                false));

        // 1. find movie list all
        List<Movie> movieList = movieService.findMovieListAll();

        // 2. check the movie list count
        assertEquals(2, movieList.size());
    }

    /**
     * [Flow #-2] Positive Case : Asynchronous method invocation 방식 중 Polling approach 방법으로
     *                            List 형태의 Movie 전체 목록을 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */      
    public void testFindMovieListAllPolling() throws Exception {

        File wsdl = new File("src/test/resources/webservices/asynch/wsdl/MovieServiceAsynchService.wsdl");

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
        assertEquals(2, reply.getReturn().size());
    }

    /**
     * [Flow #-3] Positive Case : Asynchronous method invocation 방식 중 Callback approach 방법으로
     *                            List 형태의 Movie 전체 목록을 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */      
    public void testFindMovieListAllCallback() throws Exception {

        File wsdl = new File("src/test/resources/webservices/asynch/wsdl/MovieServiceAsynchService.wsdl");

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
        assertEquals(2, reply.size());
    }
}
