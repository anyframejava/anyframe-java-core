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

import javax.xml.ws.WebServiceException;

import org.anyframe.remoting.RemotingTestCase;
import org.anyframe.remoting.webservices.client.Client;
import org.anyframe.remoting.webservices.client.ClientInfo;
import org.anyframe.remoting.webservices.client.JaxWsClient;
import org.anyframe.remoting.webservices.server.JaxWsServer;
import org.anyframe.remoting.webservices.server.ServerInfo;
import org.anyframe.sample.remoting.movie.jaxws.MovieService;
import org.anyframe.sample.remoting.movie.jaxws.impl.MovieServiceImpl;
import org.apache.cxf.endpoint.Server;
import org.apache.cxf.test.TestUtilities;
import org.w3c.dom.Document;


/**
 * TestCase Name : JaxWsFrontendServerFactoryAnnotationTest <br>
 * <br>
 * [Description] : Apache CXF의 2가지 frontend model(Simple/JAX-WS) 중 JAX-WS frontend를 사용하여
 *                 JaxWsServerFactoryBean를 통해 구동된 Movie Web Service의 기능 중 Annotation 설정에 의해 다르게 동작하는
 *                 Web Service method들을 테스트할 수 있는 시나리오들을 정의한 TestCase이다.
 * <br>
 * [Characteristic]
 * <li>JAX-WS Frontend 사용 - Annotation 설정 필수, Web Services 표준 API인 JAX-WS 사용</li>
 * <li>Annotation 작성 - @WebService()만 필수 사항이며, 대부분 annotation의 경우 디폴트값이 제공되므로 작성 불필요하나,
 *                      이 TestCase에서는 @WebMethod, @Oneway, @WebParam 등의 Annotation 기능을 사용한다.</li>
 * <li>@WebMethod - Web Service 메소드로 공개되는 메소드를 설정할 때 사용한다. 
 *                  @WebService annotation 설정이 된 클래스에서만 지원된다.</li>
 * <li>@OneWay - 입력 값은 있으나 리턴 값이 없는 단방향 메소드를 정의할 때 사용한다.
 *               @WebMethod annotation과 함께 사용될 수 있으며 별도의 속성 정의가 필요없다.</li>      
 * <li>@WebParam - Web Service의 자바 메소드의 입력 파라미터와 WSDL 파일에서 파라미터를 표현하는 XML element 간의 매핑을 설정한다.</li>                    
 * <li>서버 구현: JAX-WS frontend 방식 이용 시 JaxWsServerFactoryBean API를 통해 Movie 서비스의 
 *               interface class, implementation class, URL address 정보 등을 설정하여 손쉽게 Movie 서비스를 
 *               Web Service로 노출시킨다.</li>
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
 * 
 * @author SooYeon Park
 */
public class JaxWsFrontendServerFactoryAnnotationTest extends RemotingTestCase {

    // ==============================================================
    // ====== TestCase 수행에 필요한 사전 작업 정의 ====================
    // ==============================================================
    
    public void setUp() throws Exception {
        this.setServer(new JaxWsServer());
        this.getServer().setServerInfo(
            new ServerInfo(MovieService.class, new MovieServiceImpl(),
                "http://localhost:9002/Movie", false));
        super.setUp();
    }

    // ==============================================================
    // ====== TestCase methods ======================================
    // ==============================================================
    
    /**
     * [Flow #-1] Positive Case : @WebMethod annotation을 이용하여
     *                            특정 method를 Web Service method로 노출되지 않도록 한다.
     *                            @WebMethod의 속성 값 중 exclude 값을 true로 설정한다.
     *                            (ex. @WebMethod(exclude=true) )
     */      
    public void testAnnotationMethodExclude() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        try {
            movieService.testAnnotationMethodExclude();
            fail();
        } catch (Exception e) {
            // Exception should be occurred.
            if (!(e instanceof WebServiceException))
                fail();
        }
    }

    /**
     * [Flow #-2] Positive Case : @WebMethod annotation을 이용하여
     *                            특정 method name을 다른 name으로 변경하여 호출가능하도록 한다.
     *                            @WebMethod의 속성 값 중 operationName 값을 다른 name으로 설정한다.
     *                            (ex. @WebMethod(operationName="testAnnotationMethodInclude") )
     *                            
     *                            실제 SEI에서 제공하는 method는 testAnnotationMethod 뿐이고, 
     *                            @WebMethod 속성 값 중 operationName값을 testAnnotationMethodInclude로 설정해놓았으므로,
     *                            Client에서 Web Service method를 호출할 때에는 testAnnotationMethodInclude method를 갖는
     *                            Service Interface class를 재정의해서 호출하여 사용하도록 한다.
     */      
    public void testAnnotationMethodInclude() {
        Client client = new JaxWsClient();
        org.anyframe.sample.remoting.movie.jaxws.extend.MovieService movieService =
            (org.anyframe.sample.remoting.movie.jaxws.extend.MovieService) client
                .getClient(new ClientInfo(
                    org.anyframe.sample.remoting.movie.jaxws.extend.MovieService.class,
                    "http://localhost:9002/Movie", false));

        try {
            movieService.testAnnotationMethodInclude();
        } catch (Exception e) {
            // It should not be failed.
            fail();
        }
    }
    
    /**
     * [Flow #-3] Positive Case : @OneWay annotation을 이용하여
     *                            특정 method의 입력값은 있을 수 있으나 리턴 값이 없는 단방향 method를 
     *                            정의하여 사용하도록 한다. 
     *                            @OneWay의 다른 속성값 설정은 필요 없다.
     *                            (ex. @OneWay )
     */          
    public void testAnnotationOneWay() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        try {
            movieService.testAnnotationOneWay().trim();
            fail();
        } catch (Exception e) {
            // Exception should be occurred.
            if (!(e instanceof NullPointerException)) {
                fail();
            }                
        }
    }

    /**
     * [Flow #-4] Positive Case : @WebParam annotation을 이용하여
     *                            WSDL 파일에서 입력 파라미터를 표현하는 XML element 명을 원하는 name으로 
     *                            변경시키도록 한다.
     *                            (ex. public String testAnnotationWebParam(@WebParam(name="movieAnnotationWebParam") String input); )
     *                            
     *                            @WebParam 속성 값 중 name을 원하는 name으로 변경시키지 않는다면, default로 arg0으로 parameter name이
     *                            설정된다.
     * @throws Exception
     *         throws exception which is from service
     */      
    public void testAnnotationWebParam() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        assertEquals("testAnnotationWebParam", movieService.testAnnotationWebParam("input"));
        TestUtilities testUtilities = new TestUtilities(getClass());
        testUtilities.addDefaultNamespaces();
        testUtilities.setBus(((JaxWsServer) this.getServer()).getSvrFactory()
            .getBus());
        Server s =
            testUtilities.getServerForAddress("http://localhost:9002/Movie");
        Document wsdl = testUtilities.getWSDLDocument(s);
        assertNotNull(wsdl);

        testUtilities.assertValid(
            "//xsd:complexType[@name='testAnnotationWebParam']"
                + "/xsd:sequence/xsd:element[@name='movieAnnotationWebParam']",
            wsdl);

    }
}
