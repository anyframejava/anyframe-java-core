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
package org.anyframe.query.impl.config;

import org.anyframe.query.QueryService;
import org.springframework.core.io.ClassPathResource;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;

/**
 * This is an entity resolver class for handling mapping xml files (based on
 * dtd, xsd).
 * 
 * @author SoYon Lim
 */
public class QuerySchemaResolver implements EntityResolver {
	private static final String[] XSD_NAMES = { "anyframe-query-mapping-1.0" };

	private static final String[] DTD_NAMES = { "anyframe-core-query-mapping",
			"anyframe-core-query-mapping-3.1",
			"anyframe-core-query-mapping-3.2", "anyframe-query-mapping-1.0" };

	private static final String DTD_EXTENSION = "dtd";

	public InputSource resolveEntity(String publicId, String systemId) {
		if (systemId != null) {
			try {
				int lastPathSeparator = systemId.lastIndexOf("/");

				if (!systemId.endsWith(DTD_EXTENSION)) {
					for (String xsdName : XSD_NAMES) {
						int xsdNameStart = systemId.indexOf(xsdName);
						if (xsdNameStart != -1
								&& xsdNameStart > lastPathSeparator) {
							InputSource source = new InputSource(
									new ClassPathResource(
											"/org/anyframe/query/config/"
													+ systemId
															.substring(xsdNameStart))
											.getInputStream());
							source.setPublicId(publicId);
							source.setSystemId(systemId);
							return source;
						}
					}
				} else {
					for (String dtdName : DTD_NAMES) {
						int dtdNameStart = systemId.indexOf(dtdName);
						if (dtdNameStart != -1
								&& dtdNameStart > lastPathSeparator) {
							InputSource source = new InputSource(
									new ClassPathResource("/dtd/"
											+ systemId.substring(dtdNameStart))
											.getInputStream());
							source.setPublicId(publicId);

							return source;
						}
					}
				}
			} catch (Exception ex) {
				QueryService.LOGGER.warn(
						"Query Service : Fail to resolve mapping xml files.",
						ex);
			}
		}
		return null;
	}
}
