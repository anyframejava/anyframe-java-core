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
package org.anyframe.remoting.webservices.restful.dispatch;

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

import org.anyframe.remoting.RemotingTestCase;
import org.anyframe.sample.remoting.movie.restful.dispatch.MovieServicePayloadProvider;
import org.anyframe.sample.remoting.movie.restful.jaxrs.Movie;
import org.anyframe.sample.remoting.movie.restful.jaxrs.Movies;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.cxf.helpers.IOUtils;
import org.apache.cxf.helpers.XMLUtils;
import org.apache.cxf.io.CachedOutputStream;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;


/**
 * TestCase Name : ProviderDispatchTest <br>
 * <br>
 * [Description] : JAX-WS Provider/Dispatch API를 이용하여 RESTful Web Service로 구현한 Movie Service의 
 *                 기능을 테스트하는 TestCase이다.<br>
 * [Characteristic]
 * <li>REST(Representational state transfer)는 World Wide Web처럼 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처 스타일</li>
 * <li>REST는 Roy Fielding이 제창한, 네트워크 기반 애플리케이션을 위한 아키텍쳐 스타일(2000년)</li>
 * <li>적용 예- WWW(웹), Open API(ex. Google, Amazone, eBay, Yahoo 등)</li>
 * <li>CXF을 통해 RESTful 서비스를 구현하는 3가지 방법 - JAX-RS (JSR-311), HTTP Binding, JAX-WS Provider/Dispatch API</li>
 * <li>JAX-WS Provider/Dispatch API - 간단한 RESTful 서비스 작성, 표준 API를 사용하나 HTTP Binding 방식에 비해 유연한 구조가 아님</li>
 * <li>서버 구현: Web Service로 노출시킬 서비스를 Provider interface class를 구현한 MovieServicePayloadProvider class로 
 *               작성하고 invoke method를 구현한다.
 * </li>
 * <br>
 * [Assumption]
 * <li>-서버 : Endpoint, Provider 사용</li>
 * <li>-클라이언트 : HttpClient, Dispatch 사용</li>
 * <br>
 * [Main Flow]
 * <li>#-1 Positive Case : HttpClient를 이용하여 List 형태의 Movie 전체 목록을 조회한다.</li>
 * <li>#-2 Positive Case : URL을 이용하여 Movie Id가 "001"인 Movie를 조회한다.</li>
 * <li>#-3 Positive Case : HttpClient를 이용하여 Movie Id가 "001"인 Movie를 조회한다.</li>
 * <li>#-4 Positive Case : Dispatch를 이용하여 Movie Id가 "002"인 기존 Movie 정보를 변경한다.</li>
 * 
 * @author SooYeon Park
 */
public class ProviderDispatchTest extends RemotingTestCase {

    // ==============================================================
    // ====== TestCase 수행에 필요한 사전 작업 정의 ====================
    // ==============================================================
    
    public void setUp() throws Exception {
        System.out.println("Starting Server");
        Endpoint e =
            Endpoint.create(HTTPBinding.HTTP_BINDING,
                new MovieServicePayloadProvider());
        String address = "http://localhost:9002/movieservice/movies";
        e.publish(address);
    }

    public void tearDown() throws Exception {
        // do nothing
    }

    // ==============================================================
    // ====== TestCase methods ======================================
    // ==============================================================
    
    /**
     * [Flow #-1] Positive Case : HttpClient를 이용하여 List 형태의 Movie 전체 목록을 조회한다.
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
            System.out.println("findMovieListAll : " + response);
            assertNotNull(response);
        } catch (Exception e) {
            fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.remoting.movie.restful.jaxrs");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movies movies =
            (Movies) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the movie information
        assertEquals(2, movies.getMovie().size());
    }

    /**
     * [Flow #-2] Positive Case : URL을 이용하여 Movie Id가 "001"인 Movie를 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */    
    public void testFindMovieUsingURL() throws Exception {
        // 1. find movie
        URL url =
            new URL("http://localhost:9002/movieservice/movies?movieId=001");
        InputStream in = url.openStream();

        String response = getStringFromInputStream(in);
        assertNotNull(response);

        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.remoting.movie.restful.jaxrs");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the movie information
        assertEquals("The Sound Of Music", movie.getTitle());
        assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-3] Positive Case : HttpClient를 이용하여 Movie Id가 "001"인 Movie를 조회한다.
     * @throws Exception
     *         throws exception which is from service
     */        
    public void testFindMovie() throws Exception {
        // 1. find movie
        GetMethod get =
            new GetMethod(
                "http://localhost:9002/movieservice/movies?movieId=001");
        HttpClient httpclient = new HttpClient();
        String response = "";
        try {
            assertEquals(200, httpclient.executeMethod(get));
            response = get.getResponseBodyAsString();
            System.out.println("find: " + response);
            assertNotNull(response);
        } catch (Exception e) {
            fail();
        } finally {
            get.releaseConnection();
        }

        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.remoting.movie.restful.jaxrs");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie =
            (Movie) unmarshaller.unmarshal(new InputSource(new StringReader(
                response)));

        // 2. check the movie information
        assertEquals("The Sound Of Music", movie.getTitle());
        assertEquals("Robert Wise", movie.getDirector());
    }

    /**
     * [Flow #-4] Positive Case : Dispatch를 이용하여 Movie Id가 "002"인 기존 Movie 정보를 변경한다.
     * @throws Exception
     *         throws exception which is from service
     */     
    public void testUpdateMovie() throws Exception {
        QName serviceName = new QName("movieservice");
        QName portName = new QName("MovieServicePayloadProviderPort");

        Service service = Service.create(serviceName);
        service.addPort(portName, HTTPBinding.HTTP_BINDING,
            "http://localhost:9002/movieservice/movies");
        Dispatch<DOMSource> dispatcher =
            service.createDispatch(portName, DOMSource.class,
                Service.Mode.PAYLOAD);
        Map<String, Object> requestContext = dispatcher.getRequestContext();

        InputStream is =
            getClass().getClassLoader().getResourceAsStream(
                "webservices/restful/dispatch/client/Movie-movieId=002Req.xml");

        Document doc = XMLUtils.parse(is);
        DOMSource reqMsg = new DOMSource(doc);

        requestContext.put(MessageContext.HTTP_REQUEST_METHOD, "POST");
        System.out
            .println("Invoking through HTTP POST to update movie using JAX-WS Dispatch");
        DOMSource result = dispatcher.invoke(reqMsg);
        printSource(result);

        JAXBContext jaxbContext =
            JAXBContext.newInstance("org.anyframe.sample.remoting.movie.restful.jaxrs");
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        Movie movie = (Movie) unmarshaller.unmarshal(result);

        // 3. check the new movie information
        assertEquals("Life Is Wonderful", movie.getTitle());
        assertEquals("Roberto", movie.getDirector());
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
            Transformer trans =
                TransformerFactory.newInstance().newTransformer();
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
