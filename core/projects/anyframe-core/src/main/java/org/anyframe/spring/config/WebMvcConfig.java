/* 
 * Copyright (C) 2002-2012 Robert Stewart (robert@wombatnation.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package org.anyframe.spring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportAware;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

/**
 * Anyframe Spring MVC configuration set extended configuration set of
 * EnableWebMvc
 * 
 * @author jaehyoung.eum
 * @since 1.0.4
 */
@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport implements
		ImportAware {

	private boolean synchronizeOnSession = false;

	@Override
	public RequestMappingHandlerAdapter requestMappingHandlerAdapter() {
		RequestMappingHandlerAdapter adapter = super
				.requestMappingHandlerAdapter();
		adapter.setSynchronizeOnSession(synchronizeOnSession);
		return adapter;
	}

	public void setImportMetadata(AnnotationMetadata importMetadata) {
		String bool = (String) importMetadata.getAnnotationAttributes(
				EnableWebMvcAnyframe.class.getName()).get(
				"synchronizeOnSession");
		synchronizeOnSession = Boolean.parseBoolean(bool);
	}
}
