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
package org.anyframe.hibernate.impl.config;

import java.io.IOException;

import org.anyframe.hibernate.DynamicHibernateService;
import org.springframework.core.io.ClassPathResource;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;

/**
 * DTD resolver for anyframe-dynamic-hibernate-mapping
 * 
 * @author SoYon Lim
 */
public class DynamicDtdResolver implements EntityResolver {

	private static final String DYNAMICHIBERNATE_MAPPING_DTD_NAME = "/dtd/anyframe-dynamic-hibernate-mapping-4.0.dtd";

	public InputSource resolveEntity(String publicId, String systemId) {
		if (systemId != null) {
			try {
				InputSource source = new InputSource(new ClassPathResource(
						DYNAMICHIBERNATE_MAPPING_DTD_NAME).getInputStream());
				source.setPublicId(publicId);

				return source;
			} catch (IOException ex) {
				DynamicHibernateService.LOGGER
						.warn(
								"Dynamic Hibernate Service : Fail to resolve mapping xml files.",
								ex);
			}
		}
		// use the default behaviour -> download from
		// website or wherever
		return null;
	}
}
