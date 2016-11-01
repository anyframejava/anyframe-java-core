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
package org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http;

import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;

@WebServiceClient(name = "MovieServiceAsynchService", wsdlLocation = "file:src/test/resources/jaxws/asynch/wsdl/MovieServiceAsynchService.wsdl", targetNamespace = "http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http")
public class MovieServiceAsynchService extends Service {

    public final static URL WSDL_LOCATION;
    public final static QName SERVICE =
        new QName("http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http",
            "MovieServiceAsynchService");
    public final static QName MovieServiceAsynchPort =
        new QName("http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http",
            "MovieServiceAsynchPort");
    static {
        URL url = null;
        try {
            url =
                new URL(
                    "file:src/test/resources/jaxws/asynch/wsdl/MovieServiceAsynchService.wsdl");
        } catch (MalformedURLException e) {
            System.err
                .println("Can not initialize the default wsdl from file:src/test/resources/jaxws/asynch/wsdl/MovieServiceAsynchService.wsdl");
            // e.printStackTrace();
        }
        WSDL_LOCATION = url;
    }

    public MovieServiceAsynchService(URL wsdlLocation) {
        super(wsdlLocation, SERVICE);
    }

    public MovieServiceAsynchService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public MovieServiceAsynchService() {
        super(WSDL_LOCATION, SERVICE);
    }

    /**
     * @return returns MovieServiceAsynch
     */
    @WebEndpoint(name = "MovieServiceAsynchPort")
    public MovieServiceAsynch getMovieServiceAsynchPort() {
        return super.getPort(MovieServiceAsynchPort, MovieServiceAsynch.class);
    }

    /**
     * @param features
     *        A list of
     *        {@link javax.xml.ws.WebServiceFeature} to
     *        configure on the proxy. Supported
     *        features not in the <code>features</code>
     *        parameter will have their default values.
     * @return returns MovieServiceAsynch
     */
    @WebEndpoint(name = "MovieServiceAsynchPort")
    public MovieServiceAsynch getMovieServiceAsynchPort(
            WebServiceFeature... features) {
        return super.getPort(MovieServiceAsynchPort, MovieServiceAsynch.class,
            features);
    }

}
