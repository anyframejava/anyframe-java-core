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
package org.anyframe.sample.validation.payload;

import java.util.Date;
import java.util.Iterator;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Payload;
import javax.validation.Validator;

import org.anyframe.sample.validation.payload.domain.Movie;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Validation with payload
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=org.anyframe.sample.validation.payload.Main
 * 
 * @author Jeryeon Kim
 */
public class Main {
	protected ClassPathXmlApplicationContext context;

	/**
	 * initializing
	 */
	protected void setup() {
		String[] locations = new String[] { "classpath:spring/context-*.xml" };
		context = new ClassPathXmlApplicationContext(locations, false);
		context.refresh();
	}

	/**
	 * destroying
	 */
	protected void teardown() {
		context.close();
	}

	/**
	 * main
	 */
	public static void main(String[] args) throws Exception {
		Main main = new Main();

		// 1. initialize context
		main.setup();
		// 2. test
		main.validateMovie();
		// 3. close context
		main.teardown();
	}

	public void validateMovie() throws Exception {
		Validator validator = (Validator) context.getBean("validator");

		Movie movie = new Movie();
		movie.setMovieId("MV-000001");
		movie
				.setTitle("Can Hieronymus Merkin Ever Forget Mercy Humppe and Find True Happiness?");
		movie.setActors("Johnny Depp");
		movie.setRuntime(200);
		movie.setReleaseDate(new Date());
		movie.setTicketPrice(18000);
		movie.setNowPlaying("Y");

		Set<ConstraintViolation<Movie>> constraintViolations = validator
				.validate(movie);
		System.out.println("the number of constraint violation is "
				+ constraintViolations.size());

		Iterator<ConstraintViolation<Movie>> iterator = constraintViolations
				.iterator();

		while (iterator.hasNext()) {
			ConstraintViolation<Movie> constraintViolation = iterator.next();

			Set<Class<? extends Payload>> payloads = constraintViolation
					.getConstraintDescriptor().getPayload();
			if (!payloads.isEmpty()) {
				System.out
						.println("----------------------------------------------");
				System.out.println("invalid value : "
						+ constraintViolation.getInvalidValue());
				System.out.println("message : "
						+ constraintViolation.getPropertyPath() + " "
						+ constraintViolation.getMessage());
				System.out.println("payload : " + payloads.iterator().next());
			}
		}

	}

}
