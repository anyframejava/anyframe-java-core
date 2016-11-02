/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.np.query.web.converter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.anyframe.np.query.web.handler.NPRequestHandler;
import org.anyframe.np.query.web.handler.NPResponseHandler;
import org.anyframe.np.query.web.converter.HttpNPMessageConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.util.Assert;

import com.nexacro.xapi.tx.PlatformType;

/**
 * Implementation class of {@link HttpMessageConverter} for sending/receiving to NEXACRO UI.
 * 
 * @author Youngmin Jo
 */
public class HttpNPMessageConverter implements HttpMessageConverter<Object> {

	protected Logger logger = LoggerFactory
			.getLogger(HttpNPMessageConverter.class);

	/**
	 * CONTENT_TYPE_BINARY "PlatformBinary" CONTENT_TYPE_CSV "PlatformCsv"
	 * CONTENT_TYPE_HTML "PlatformHtml" CONTENT_TYPE_MI_BINARY "MiBinary"
	 * CONTENT_TYPE_MI_XML "MiXml" CONTENT_TYPE_XML "PlatformXml"
	 */
	private String contentType = PlatformType.CONTENT_TYPE_XML; // Default - XML

	private String encoding = PlatformType.DEFAULT_CHAR_SET; // Default - utf-8

	private List<MediaType> supportedMediaTypes = Collections.emptyList();

	public HttpNPMessageConverter() {
		// TODO : CONTENT_TYPE_BINARY, CONTENT_TYPE_XML이 아닌 경우, MediaType을 추가하는 로직을 구현 해야 함
		// 하지만 실제 다른 TYPE에 대한 사용 사례가 없었음 
		List<MediaType> supportedMediaTypes = new ArrayList<MediaType>();
		if (PlatformType.CONTENT_TYPE_XML.equals(contentType)) {
			supportedMediaTypes.add(MediaType.APPLICATION_XML);
			supportedMediaTypes.add(MediaType.TEXT_XML);
			supportedMediaTypes.add(new MediaType("application", "*+xml"));
			setSupportedMediaTypes(supportedMediaTypes);
		} else if (PlatformType.CONTENT_TYPE_BINARY.equals(contentType)) {
			supportedMediaTypes.add(MediaType.APPLICATION_OCTET_STREAM);
			setSupportedMediaTypes(supportedMediaTypes);
		}
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public List<MediaType> getSupportedMediaTypes() {
		return Collections.unmodifiableList(this.supportedMediaTypes);
	}
	
	/**
	 * Set the list of {@link MediaType} objects supported by this converter.
	 */
	public void setSupportedMediaTypes(List<MediaType> supportedMediaTypes) {
		Assert.notEmpty(supportedMediaTypes,
				"'supportedMediaTypes' must not be empty");
		this.supportedMediaTypes = new ArrayList<MediaType>(supportedMediaTypes);
	}

	/**
	 * {@inheritDoc}
	 */
	public boolean canRead(Class<?> clazz, MediaType mediaType) {
		if (isReadable(mediaType) || NPRequestHandler.class.equals(clazz)) {
			return true;
		}
		return false;
	}

	private boolean isReadable(MediaType mediaType) {
		if (mediaType == null) {
			return true;
		}

		for (MediaType supportedMediaType : getSupportedMediaTypes()) {
			if (supportedMediaType.includes(mediaType)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * {@inheritDoc}
	 */
	public boolean canWrite(Class<?> clazz, MediaType mediaType) {
		if (isWritable(mediaType) || NPResponseHandler.class.equals(clazz)) {
			return true;
		}
		return false;
	}

	private boolean isWritable(MediaType mediaType) {
		if (mediaType == null) {
			return true;
		}

		for (MediaType supportedMediaType : getSupportedMediaTypes()) {
			if (supportedMediaType.isCompatibleWith(mediaType)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * {@inheritDoc}
	 */
	public Object read(Class<? extends Object> clazz,
			HttpInputMessage inputMessage) throws HttpMessageNotReadableException {
		try {
			HttpServletRequest request = ((ServletServerHttpRequest) inputMessage)
					.getServletRequest();
			return new NPRequestHandler(request, contentType, encoding);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new HttpMessageNotReadableException("Could not transform [" + clazz + "]", e);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	public void write(Object object, MediaType mediaType,
			HttpOutputMessage outputMessage) throws	HttpMessageNotWritableException {
		if (outputMessage instanceof ServletServerHttpResponse) {
			try {
				((NPResponseHandler) object).sendData(
						((ServletServerHttpResponse) outputMessage)
								.getServletResponse(), contentType, encoding);
			} catch (Exception e) {
				logger.error(e.getMessage());
				new HttpMessageNotWritableException("Could not write [" + object + "]", e);
			}
		}
	}
}
