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
package org.anyframe.sample.javaconfig.config.service;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

/**
 * configuration class for message resource bundle
 *
 * @author jaehyoung.eum
 *
 */
@Configuration
public class MessageConfig {
	
	/**
	 * 
	 * message resource bundle java configuration
	 * 
	 * @return
	 */
	@Bean 
	@Description("Provides messageSource bean")
	public MessageSource messageSource(){
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		
		messageSource.setBasenames("classpath:message/message-generation", "classpath:message/message-moviefinder", "classpath:message/message-converter");
		messageSource.setDefaultEncoding("UTF-8");
		
		return messageSource;
	}
	
}
