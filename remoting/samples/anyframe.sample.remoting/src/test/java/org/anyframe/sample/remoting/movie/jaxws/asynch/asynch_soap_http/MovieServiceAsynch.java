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
package org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http;

import java.util.concurrent.Future;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.AsyncHandler;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.Response;
import javax.xml.ws.ResponseWrapper;

@WebService(targetNamespace = "http://asynch.jaxws.movie.sample.anyframe/asynch_soap_http", name = "MovieServiceAsynchService")
@XmlSeeAlso( {ObjectFactory.class })
public interface MovieServiceAsynch {

    @ResponseWrapper(localName = "findMovieListAllResponse", targetNamespace = "http://asynch.jaxws.movie.sample.anyframe/asynch_soap_http", className = "org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.FindMovieListAllResponse")
    @RequestWrapper(localName = "findMovieListAll", targetNamespace = "http://asynch.jaxws.movie.sample.anyframe/asynch_soap_http", className = "org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.FindMovieListAll")
    @WebResult(name = "return", targetNamespace = "")
    @WebMethod
    public java.util.List<org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.Movie> findMovieListAll()
            throws Exception;

    @ResponseWrapper(localName = "findMovieListAllResponse", targetNamespace = "http://asynch.jaxws.movie.sample.anyframe/asynch_soap_http", className = "org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.FindMovieListAllResponse")
    @RequestWrapper(localName = "findMovieListAll", targetNamespace = "http://asynch.jaxws.movie.sample.anyframe/asynch_soap_http", className = "org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.FindMovieListAll")
    @WebMethod(operationName = "findMovieListAll")
    public Response<org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.FindMovieListAllResponse> findMovieListAllAsync();

    @ResponseWrapper(localName = "findMovieListAllResponse", targetNamespace = "http://asynch.jaxws.movie.sample.anyframe/asynch_soap_http", className = "org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.FindMovieListAllResponse")
    @RequestWrapper(localName = "findMovieListAll", targetNamespace = "http://asynch.jaxws.movie.sample.anyframe/asynch_soap_http", className = "org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.FindMovieListAll")
    @WebMethod(operationName = "findMovieListAll")
    public Future<?> findMovieListAllAsync(
            @WebParam(name = "asyncHandler", targetNamespace = "")
            AsyncHandler<org.anyframe.sample.remoting.movie.jaxws.asynch.asynch_soap_http.FindMovieListAllResponse> asyncHandler);
}
