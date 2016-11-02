/*
 * Copyright 2008-2014 the original author or authors.
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
package org.anyframe.sample.javaconfig.moviefinder.service;

import static org.junit.Assert.*;

import org.anyframe.sample.javaconfig.moviefinder.config.MovieDaoConfig;
import org.anyframe.sample.javaconfig.moviefinder.config.MovieFinderConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

/**
 * This MovieConfigBeanDescriptionTest class is a test case for MovieFinderConfig and
 * MovieDaoConfig class that use java-based configuration.
 * 
 * @author Sujeong Lee
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { MovieFinderConfig.class, MovieDaoConfig.class }, loader = AnnotationConfigContextLoader.class)
public class MovieConfigBeanDescriptionTest {

	@Autowired
	GenericApplicationContext context;
	
	@Test
	public void getBeanDescWithBeanName() throws Exception{
		String beanDesc = context.getBeanDefinition("movieFinder").getDescription();
		assertEquals(beanDesc, "Provides a MovieFinder bean");
	}
	
	@Test
	public void getAllBeanDesc() throws Exception{
		for(String beanDefName : context.getBeanDefinitionNames()){
			String beanDesc = context.getBeanDefinition(beanDefName).getDescription();
			System.out.println("[Bean Name] " + beanDefName);
			System.out.println("[Bean Desc] " + beanDesc);
			System.out.println("");
		}
	}
}
