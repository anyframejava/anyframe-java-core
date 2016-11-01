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

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

/**
 * This object contains factory methods for each Java content interface and Java
 * element interface generated in the
 * org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http package.
 * <p>
 * An ObjectFactory allows you to programmatically construct new instances of the
 * Java representation for XML content. The Java representation of XML content
 * can consist of schema derived interfaces and classes representing the binding
 * of schema type definitions, element declarations and model groups. Factory
 * methods for each of these are provided in this class.
 */
@XmlRegistry
public class ObjectFactory {

	/**
	 * This QNAME is for findMovieListAll method.
	 */
	private final QName findMovieListAllQNAME = new QName(
			"http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http",
			"findMovieListAll");
	/**
	 * This QNAME is for findMovieListAllResponse method.
	 */
	private final QName findMovieListAllResponseQNAME = new QName(
			"http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http",
			"findMovieListAllResponse");

	/**
	 * Create a new ObjectFactory that can be used to create new instances of
	 * schema derived classes for package:
	 * org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.
	 */
	public ObjectFactory() {
	}

	/**
	 * Create an instance of {@link Movie }.
	 * 
	 * @return Movie return Movie instance
	 */
	public Movie createMovie() {
		return new Movie();
	}

	/**
	 * Create an instance of {@link FindMovieListAllResponse }.
	 * 
	 * @return FindMovieListAllResponse return FindMovieListAllResponse instance
	 */
	public FindMovieListAllResponse createFindMovieListAllResponse() {
		return new FindMovieListAllResponse();
	}

	/**
	 * Create an instance of {@link FindMovieListAll }.
	 * 
	 * @return FindMovieListAll return FindMovieListAll instance
	 */
	public FindMovieListAll createFindMovieListAll() {
		return new FindMovieListAll();
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}
	 * {@link FindMovieListAll }{@code >} .
	 * 
	 * @param value
	 *            FindMovieListAll
	 * @return JAXBElement return JAXBElement instance which has
	 *         FindMovieListAll type.
	 */
	@XmlElementDecl(namespace = "http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http", name = "findMovieListAll")
	public JAXBElement<FindMovieListAll> createFindMovieListAll(
			FindMovieListAll value) {
		return new JAXBElement<FindMovieListAll>(findMovieListAllQNAME,
				FindMovieListAll.class, null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}
	 * {@link FindMovieListAllResponse }{@code >} .
	 * 
	 * @param value
	 *            FindMovieListAllResponse
	 * @return JAXBElement return JAXBElement instance which has
	 *         FindMovieListAllResponse type.
	 */
	@XmlElementDecl(namespace = "http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http", name = "findMovieListAllResponse")
	public JAXBElement<FindMovieListAllResponse> createFindMovieListAllResponse(
			FindMovieListAllResponse value) {
		return new JAXBElement<FindMovieListAllResponse>(
				findMovieListAllResponseQNAME, FindMovieListAllResponse.class,
				null, value);
	}

}
