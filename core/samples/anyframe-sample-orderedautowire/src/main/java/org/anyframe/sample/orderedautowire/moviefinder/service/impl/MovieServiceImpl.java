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
package org.anyframe.sample.orderedautowire.moviefinder.service.impl;

import java.util.List;

import org.anyframe.sample.orderedautowire.moviefinder.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * This MovieServiceImpl class is an implementation class to get movie
 * information.
 * 
 * @author Sooyeon Park
 */
@Service("movieService")
public class MovieServiceImpl implements MovieService {

	@Autowired
	private MovieDao movieDao;

	// All Daos are injected with @Order value...
	@Autowired
	private List<AbstractDao> daos;

	public void showMyDaos() {
		for (AbstractDao dao : daos) {
			System.out.println(dao.getDaoName());
		}
	}

}
