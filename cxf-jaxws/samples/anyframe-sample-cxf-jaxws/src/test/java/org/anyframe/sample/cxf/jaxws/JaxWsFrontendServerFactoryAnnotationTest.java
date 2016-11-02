/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.sample.cxf.jaxws;

import org.anyframe.sample.cxf.jaxws.client.Client;
import org.anyframe.sample.cxf.jaxws.client.ClientInfo;
import org.anyframe.sample.cxf.jaxws.client.JaxWsClient;
import org.anyframe.sample.cxf.jaxws.moviefinder.service.MovieService;
import org.anyframe.sample.cxf.jaxws.moviefinder.service.impl.MovieServiceImpl;
import org.anyframe.sample.cxf.jaxws.server.JaxWsServer;
import org.anyframe.sample.cxf.jaxws.server.ServerInfo;
import org.apache.cxf.endpoint.Server;
import org.apache.cxf.test.TestUtilities;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.w3c.dom.Document;


/**
 * TestCase Name : JaxWsFrontendServerFactoryAnnotationTest <br>
 * <br>
 * [Description] : This TestCase defines scenarios to test Web Service method operating differently 
 *                 according to Annotation setup, one of Movie Web Service functions implemented via JaxWsServerFactoryBean 
 *                 by using JAX-WS frontend, out of two frontend models(Simple/JAX-WS) at Apache CXF.
 * <br>
 * [Characteristic]
 * <li>JAX-WS Frontend Use - Annotation setup is a must and JAX-WS, Web Services standard API is used. </li>
 * <li>Annotation development - Only @WebService() is a must and most annotation provides default value. 
 *                              Therefore, there is no need to develop. However, This TestCase uses Annotation function 
 *                              such as @WebMethod, @Oneway and @WebParam. </li>
 * <li>@WebMethod - It is used to set up method disclosed as Web Service method. 
 *                  It is only supported at class setting up WebService annotation.</li>
 * <li>@OneWay - It is used to define one-way method which has input value but without return value.
 *               It can be used with @WebMethod annotation and there is no need for a separate definition of property.  </li>      
 * <li>@WebParam - Mapping between input parameter of Web Service Java method and XML element expresseing parameter in WSDL is setup. </li>                    
 * <li>Server implementation: In the case of using JAX-WS frontend way, Movie service is easily exposed 
 *               as Web Service by setting up interface class, implementation class, URL address information of Movie service 
 *               via JaxWsServerFactoryBean API. </li>
 * <br>
 * [Assumption]
 * <li>-Server : JaxWsServer Use</li>
 * <li>-Client : JaxWsClient Use</li>
 * <br>
 * [Main Flow]
 * <li>#-1  Positive Case : The whole list is searched in the type of List. </li>
 * <li>#-2  Positive Case : The whole list is searched in the type of Map. </li>
 * <li>#-3  Positive Case : Movie is searched. </li>
 * <li>#-4  Positive Case : A new Movie is created. </li>
 * <li>#-5  Positive Case : Movie information is modified. </li>
 * <li>#-6  Positive Case : Movie is deleted. </li> 
 * 
 * @author SooYeon Park
 */
@RunWith(JUnit4.class)
public class JaxWsFrontendServerFactoryAnnotationTest extends ServerRunner {

    // ==============================================================
    // ====== Pre-job definition necessary for TestCase execution ===
    // ==============================================================
    
	@Before
    public void setUp() throws Exception {
        this.setServer(new JaxWsServer());
        this.getServer().setServerInfo(
            new ServerInfo(MovieService.class, new MovieServiceImpl(),
                "http://localhost:9002/Movie", false));
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
     * [Flow #-2] Positive Case : @WebMethod annotation을 이용하여
     *                            특정 method name을 다른 name으로 변경하여 호출가능하도록 한다.
     *                            Using @WebMethod annotation, specific method's name can be changed another name and called.
     *                            One of the property operationName of @WebMethod's is set to another name.
     *                            (ex. @WebMethod(operationName="testAnnotationMethodInclude") )
     *                            
     *                            testAnnotationMethod is the only method provided by SEI and operationName 
     *                            is set up as testAnnotationMethodInclude out of @WebMethod property value, 
     */   
	@Test
    public void testAnnotationMethodInclude() {
        Client client = new JaxWsClient();
        org.anyframe.sample.cxf.jaxws.moviefinder.service.MovieServiceWebMethod movieService =
            (org.anyframe.sample.cxf.jaxws.moviefinder.service.MovieServiceWebMethod) client.getClient(
            		new ClientInfo(org.anyframe.sample.cxf.jaxws.moviefinder.service.MovieServiceWebMethod.class,
            		"http://localhost:9002/Movie", false));
        
        try {
            movieService.testAnnotationMethodInclude();
        } catch (Exception e) {
            // It should not be failed.
        	Assert.fail();
        }
    }
    
    /**
     * [Flow #-3] Positive Case : By using @OneWay annotation, there can be an input value of a specific method. 
     * 							  However, one-way method without return value is defined and used. 
     *                            There is no need to set another property value of @OneWay.
     *                            (ex. @OneWay )
     */     
	@Test
    public void testAnnotationOneWay() {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        try {
            movieService.testAnnotationOneWay().trim();
            Assert.fail();
        } catch (Exception e) {
            // Exception should be occurred.
            if (!(e instanceof NullPointerException)) {
            	Assert.fail();
            }                
        }
    }

    /**
     * [Flow #-4] Positive Case : By using @WebParam annotation, XML element name expressing entered parameter at WSDL file 
     *                            is modified with desired name. 
     *                            (ex. public String testAnnotationWebParam(@WebParam(name="movieAnnotationWebParam") String input); )
     *                            
     *                            Unless name is modified with desired name out of @WebParam property value, 
     *                            parameter name is set as arg0 for default. 
     * @throws Exception
     *         throws exception which is from service
     */  
	@Test
    public void testAnnotationWebParam() throws Exception {
        Client client = new JaxWsClient();
        MovieService movieService =
            (MovieService) client.getClient(new ClientInfo(MovieService.class,
                "http://localhost:9002/Movie", false));

        Assert.assertEquals("testAnnotationWebParam", movieService.testAnnotationWebParam("input"));
        TestUtilities testUtilities = new TestUtilities(getClass());
        testUtilities.addDefaultNamespaces();
        testUtilities.setBus(((JaxWsServer) this.getServer()).getSvrFactory()
            .getBus());
        Server s =
            testUtilities.getServerForAddress("http://localhost:9002/Movie");
        Document wsdl = testUtilities.getWSDLDocument(s);
        Assert.assertNotNull(wsdl);

        testUtilities.assertValid(
            "//xsd:complexType[@name='testAnnotationWebParam']"
                + "/xsd:sequence/xsd:element[@name='movieAnnotationWebParam']",
            wsdl);

    }
}
