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
package org.anyframe.plugin.jce.moviefinder.service.impl;

import org.anyframe.plugin.jce.domain.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * a class for just testing CGLIB-Objenesis Proxing...
 * 
 * @author Joonbo Jang
 */
@Service("dummyImplWithNoInterfaceNoDefaultConstructor")
public class DummyImplWithNoInterfaceNoDefaultConstructor {

	private GenericDao<Movie> movieDao;

	@Autowired
	public DummyImplWithNoInterfaceNoDefaultConstructor(GenericDao<Movie> movieDao) {
		super();
		this.movieDao = movieDao;
	}

}
