/*
 * Copyright 2002-2009 the original author or authors.
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
package anyframe.sample.javaconfig;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import anyframe.sample.domain.Movie;
import anyframe.sample.javaconfig.config.MovieFinderConfig;
import anyframe.sample.javaconfig.service.MovieFinder;

/**
 * Java based Configuration을 테스트하기 위한 샘플 코드
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=anyframe.sample.javaconfig.Main
 */
public class Main {
	private AnnotationConfigApplicationContext context;

	/**
	 * initializing
	 */
	protected void setup() {
		context = new AnnotationConfigApplicationContext(
				MovieFinderConfig.class);
		/*
		 * context = new AnnotationConfigApplicationContext();
		 * context.scan("anyframe.sample"); 
		 * context.refresh();
		 */
	}

	/**
	 * detroying
	 */
	protected void teardown() {
		context.close();
	}

	/**
	 * 테스트 수행을 위한 main
	 */
	public static void main(String[] args) throws Exception {
		Main main = new Main();

		// 1. initialize context
		main.setup();
		// 2. test
		main.getMovieList();
		// 3. close context
		main.teardown();
	}

	public void getMovieList() throws Exception {
		MovieFinder movieFinder = (MovieFinder) context
				.getBean(MovieFinder.class);

		movieFinder.getPagingList(new Movie(), 1);
	}
}
