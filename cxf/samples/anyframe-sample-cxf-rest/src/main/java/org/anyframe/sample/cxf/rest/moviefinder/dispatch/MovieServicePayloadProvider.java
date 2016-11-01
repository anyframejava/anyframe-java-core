/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.sample.cxf.rest.moviefinder.dispatch;

import java.io.InputStream;

import javax.annotation.Resource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.ws.Provider;
import javax.xml.ws.Service;
import javax.xml.ws.ServiceMode;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.WebServiceProvider;
import javax.xml.ws.handler.MessageContext;

import org.w3c.dom.Document;

import org.apache.cxf.message.Message;

@WebServiceProvider()
@ServiceMode(value = Service.Mode.PAYLOAD)
public class MovieServicePayloadProvider implements Provider<DOMSource> {

	@Resource
	protected WebServiceContext wsContext;

	public MovieServicePayloadProvider() {
	}

	public DOMSource invoke(DOMSource request) {
		MessageContext mc = wsContext.getMessageContext();
		String path = (String) mc.get(Message.PATH_INFO);
		String query = (String) mc.get(Message.QUERY_STRING);
		String httpMethod = (String) mc.get(Message.HTTP_REQUEST_METHOD);

		System.out.println("--path--- " + path);
		System.out.println("--query--- " + query);
		System.out.println("--httpMethod--- " + httpMethod);

		if (httpMethod.equalsIgnoreCase("POST")) {
			// TBD: parse query info from DOMSource
			System.out.println("---Invoking updateMovie---");
			return updateMovie(request);
		} else if (httpMethod.equalsIgnoreCase("GET")) {
			if (path.equals("/movieservice/movies") && query == null) {
				System.out.println("---Invoking findMovieListAll---");
				return findMovieListAll();
			} else if (path.equals("/movieservice/movies") && query != null) {
				System.out.println("---Invoking findMovie---");
				return findMovie(query);
			}
		}

		return null;
	}

	private DOMSource findMovieListAll() {
		return createDOMSource("dispatch/server/MovieAllResp.xml");
	}

	private DOMSource findMovie(String movieId) {
		return createDOMSource("dispatch/server/Movie-" + movieId + "Resp.xml");
	}

	private DOMSource updateMovie(DOMSource request) {
		return createDOMSource("dispatch/server/Movie-movieId=002Resp-updated.xml");
	}

	private DOMSource createDOMSource(String fileName) {
		DocumentBuilderFactory factory;
		DocumentBuilder builder;
		Document document = null;
		DOMSource response = null;

		try {
			factory = DocumentBuilderFactory.newInstance();
			// factory.setValidating(true);
			builder = factory.newDocumentBuilder();
			InputStream result = getClass().getClassLoader()
					.getResourceAsStream(fileName);

			document = builder.parse(result);
			response = new DOMSource(document);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
}
