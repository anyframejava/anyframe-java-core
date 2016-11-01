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
package org.anyframe.remoting.webservices.restful.jaxrs;

import java.io.StringReader;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.anyframe.remoting.RemotingTestCase;
import org.anyframe.remoting.webservices.server.JaxRsServer;
import org.anyframe.remoting.webservices.server.ServerInfo;
import org.anyframe.sample.remoting.movie.restful.jaxrs.MovieService;
import org.anyframe.sample.remoting.movie.restful.jaxrs.Movies;
import org.anyframe.sample.remoting.movie.restful.jaxrs.impl.MovieServiceImpl;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.xml.sax.InputSource;


/**
 * TestCase Name : JaxRsServerFactoryTest <br>
 * <br>
 * [Description] : 표준 방식인 JAX-RS (JSR-311)을 이용하여 RESTful Web Service로 구현한 
 *                 Movie Service의 기능을 테스트하는 TestCase이며 Movies를 조회해오는 경우에 한한다.<br>
 * [Characteristic]
 * <li>REST(Representational state transfer)는 World Wide Web처럼 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처 스타일</li>
 * <li>REST는 Roy Fielding이 제창한, 네트워크 기반 애플리케이션을 위한 아키텍쳐 스타일(2000년)</li>
 * <li>적용 예- WWW(웹), Open API(ex. Google, Amazone, eBay, Yahoo 등)</li>
 * <li>CXF을 통해 RESTful 서비스를 구현하는 3가지 방법 - JAX-RS (JSR-311), HTTP Binding, JAX-WS Provider/Dispatch API</li>
 * <li>JAX-RS (JSR-311) - CXF에서 구현체를 제공하며 표준 방식으로 RESTful 서비스 작성, JAX-RS annotation 설정 이용</li>
 * <li>제약 사항 존재- Web Service로 노출시킬 서비스 interface class의 각 method별로 JAX-RS에서 제공하는 Annotation을 설정하여 
 *                   RESTful Web Service를 구현한다.
 *                  - interface class에 @Path, @ProduceMime annotation을 아래와 같이 설정해준다. 
 *                     @Path("/movieservice/")
 *                     @ProduceMime("application/xml")
 *                     public interface MovieService { ...
 *                  - @Path("/movieservice/"): Path 속성 정보가 RESTful Web Service로 접근하는 상위 path 정보가 된다.
 *                  - @ProduceMime("application/xml"): class에 ProduceMime 설정을 안한 경우, client에서
 *                                                     addRequestHeader("Accept" , "application/xml") 메소드를 호출해야 한다.
 * </li>                                                     
 * <br>
 * [Assumption]
 * <li>-서버 : JaxRsServer 사용</li>
 * <li>-클라이언트 : HttpClient 사용</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : Get method로 Movie Service의 전체 목록 조회 기능을 호출하여 XML data를 리턴받고
 *                         JAXB를 사용하여 Movies 객체로 전환하여 사용한다.</li>
 * 
 * @author SooYeon Park
 */
public class JaxRsServerFactoryListTest extends RemotingTestCase {

    // ==============================================================
    // ====== TestCase 수행에 필요한 사전 작업 정의 ====================
    // ==============================================================
    
    public void setUp() throws Exception {
        this.setServer(new JaxRsServer());
        this.getServer().setServerInfo(
            new ServerInfo(MovieService.class, new MovieServiceImpl(),
                "http://localhost:9002/"));
        super.setUp();
    }

    // ==============================================================
    // ====== TestCase methods ======================================
    // ==============================================================    
    
    /**
     * [Flow #-1] Positive Case : Get method로 Movie Service의 전체 목록 조회 기능을 호출하여 XML data를 리턴받고
     *                            JAXB를 사용하여 Movies 객체로 전환하여 사용한다.  
     *                            
     *                            @GET, @Path annotation을 이용하여
     *                            findMovieListAll method를 RESTful한 Web Service로 노출하여 Client가 호출가능하도록 한다.
     *                            (ex. @GET
     *                                 @Path("/movies/")
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
        } catch (Exception e) {
            fail();
        } finally {
            get.releaseConnection();
        }
        
        System.out.println("get list response="+response);
        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.remoting.movie.restful.jaxrs");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movies movies =
            (Movies) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the movie information
        assertEquals(2, movies.getMovie().size());
    } 
}
