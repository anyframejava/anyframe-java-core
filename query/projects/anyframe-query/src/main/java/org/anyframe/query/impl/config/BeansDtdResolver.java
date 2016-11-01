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
package org.anyframe.query.impl.config;

import java.io.IOException;

import org.anyframe.query.QueryService;
import org.springframework.core.io.ClassPathResource;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;


/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class BeansDtdResolver implements EntityResolver {

    private static final String QUERYSERVICE_MAPPING_DTD_NAME =
        "/dtd/anyframe-core-query-mapping-3.2.dtd";

    public InputSource resolveEntity(String publicId, String systemId)
            throws IOException {
        if (systemId != null) {
            try {
                InputSource source =
                    new InputSource(new ClassPathResource(
                        QUERYSERVICE_MAPPING_DTD_NAME).getInputStream());
                source.setPublicId(publicId);

                return source;
            } catch (Exception ex) {
                QueryService.LOGGER.warn(
                    "Query Service : Fail to resolve mapping xml files.", ex);
            }
        }
        // use the default behaviour -> download from
        // website or wherever
        return null;
    }
}
