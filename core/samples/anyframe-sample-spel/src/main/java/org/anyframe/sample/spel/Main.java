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
package org.anyframe.sample.spel;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.anyframe.sample.domain.Genre;
import org.anyframe.sample.domain.Movie;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.util.StringUtils;

/**
 * Sample to test various Expression using Spring Expression Language
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=org.anyframe.sample.spel.Main
 * 
 * @author SoYon Lim
 */
public class Main {
	/**
	 * main
	 */
	public static void main(String[] args) throws Exception {
		Main main = new Main();

		// 1. test (literal expression)
		main.evaluateLiteralExpression();
		// 2. test (list expression)
		main.evaluateListExpression();
		// 3. test (assignment expression)
		main.evaluateAssignmentExpression();
		// 4. test (constructor expression)
		main.evaluateConstructorExpression();
		// 5. test (variables expression)
		main.evaluateVariablesExpression();
		// 6. test (function expression)
		main.evaluateFunctionExpression();
		// 7. test (ternary operator expression)
		main.evaluateTernaryOperatorExpression();
		// 8. test (elvis operator expression)
		main.evaluateElvisOperatorExpression();
		// 9. test (safe navigation operator expression)
		main.evaluateSafeNavigationOperatorExpression();
		// 10. test (collection selection expression)
		main.evaluateCollectionSelectionExpression();
		// 11. test (collection projection expression)
		main.evaluateCollectionProjectionExpression();
	}

	public void evaluateLiteralExpression() throws Exception {
		ExpressionParser parser = new SpelExpressionParser();

		String stringVal = (String) parser.parseExpression("'Hello Anyframe'")
				.getValue();
		System.out.println("[Literal Expression] Evaluate 'Hello Anyframe' : "
				+ stringVal);

		double doubleVal = (Double) parser.parseExpression("6.0221415E+23")
				.getValue();
		System.out.println("[Literal Expression] Evaluate '6.0221415E' : "
				+ doubleVal);

		Date dateVal = (Date) parser.parseExpression("'2010/07/05'").getValue(
				Date.class);
		System.out.println("[Literal Expression] Evaluate '2010/07/05' : "
				+ dateVal);

		boolean booleanVal = (Boolean) parser.parseExpression("true")
				.getValue();
		System.out.println("[Literal Expression] Evaluate 'true' : "
				+ booleanVal);

		Object nullVal = parser.parseExpression("null").getValue();
		System.out.println("[Literal Expression] Evaluate null : " + nullVal);
	}

	public void evaluateListExpression() throws Exception {
		Genre genre = getGenre();
		StandardEvaluationContext context = new StandardEvaluationContext(genre);

		ExpressionParser parser = new SpelExpressionParser();
		String title = parser.parseExpression("movies[0].Title").getValue(
				context, String.class);
		System.out.println("[List Expression] Movie title : " + title);
	}

	public void evaluateAssignmentExpression() throws Exception {
		Genre genre = getGenre();
		StandardEvaluationContext context = new StandardEvaluationContext(genre);

		ExpressionParser parser = new SpelExpressionParser();
		String genreName = parser.parseExpression("Name = 'Animation'")
				.getValue(context, String.class);
		System.out.println("[Assignment Expression] Genre Name : " + genreName);
	}

	public void evaluateConstructorExpression() throws Exception {
		ExpressionParser parser = new SpelExpressionParser();
		Genre genre = parser.parseExpression(
				"new org.anyframe.sample.domain.Genre('GR-01', 'Action')")
				.getValue(Genre.class);
		System.out.println("[Constructor Expression] Genre Id : "
				+ genre.getGenreId() + ", Genre Name : " + genre.getName());
	}

	public void evaluateVariablesExpression() throws Exception {
		Genre genre = getGenre();
		StandardEvaluationContext context = new StandardEvaluationContext(genre);
		context.setVariable("newName", "Animation");

		ExpressionParser parser = new SpelExpressionParser();
		parser.parseExpression("Name = #newName").getValue(context);
		System.out.println("[Variables Expression] Genre New Name : "
				+ genre.getName());
	}

	public void evaluateFunctionExpression() throws Exception {
		StandardEvaluationContext context = new StandardEvaluationContext();
		context.registerFunction("capitalize", StringUtils.class
				.getDeclaredMethod("capitalize", new Class[] { String.class }));

		ExpressionParser parser = new SpelExpressionParser();
		String capitalizedString = parser.parseExpression(
				"#capitalize('hello anyframe')")
				.getValue(context, String.class);
		System.out.println("[Function Expression] Capitalized String : "
				+ capitalizedString);
	}

	public void evaluateTernaryOperatorExpression() throws Exception {
		Movie movie = getGenre().getMovies().get(0);
		StandardEvaluationContext context = new StandardEvaluationContext(movie);

		ExpressionParser parser = new SpelExpressionParser();
		String playing = parser.parseExpression(
				"getNowPlaying().equals('Y') ? 'playing' : 'not playing'")
				.getValue(context, String.class);
		System.out
				.println("[Ternary Operator Expression] Movie 'Shrek (2001)' is "
						+ playing);
	}

	public void evaluateElvisOperatorExpression() throws Exception {
		Movie movie = getGenre().getMovies().get(1);
		StandardEvaluationContext context = new StandardEvaluationContext(movie);

		ExpressionParser parser = new SpelExpressionParser();
		int ticketPrice = parser.parseExpression("getTicketPrice()?:'8000'")
				.getValue(context, Integer.class);
		System.out
				.println("[Elvis Operator Expression] The ticket-price of 'Shrek (2001)' is "
						+ ticketPrice);
	}

	public void evaluateSafeNavigationOperatorExpression() throws Exception {
		Movie movie = getGenre().getMovies().get(0);
		StandardEvaluationContext context = new StandardEvaluationContext(movie);

		ExpressionParser parser = new SpelExpressionParser();
		String name = parser.parseExpression("genre?.Name").getValue(context,
				String.class);
		System.out
				.println("[Save Navigation Operator Expression] The genre of 'Shrek (2001)' is "
						+ name);

		movie.setGenre(null);
		name = parser.parseExpression("genre?.Name").getValue(context,
				String.class);
		System.out
				.println("[Safe Navigation Operator Expression] The genre of 'Shrek (2001)' is "
						+ name);
	}

	@SuppressWarnings("unchecked")
	public void evaluateCollectionSelectionExpression() throws Exception {
		Genre genre = getGenre();
		StandardEvaluationContext context = new StandardEvaluationContext(genre);

		ExpressionParser parser = new SpelExpressionParser();
		List<Movie> movies = (List<Movie>) parser.parseExpression(
				"movies.?[Runtime > 90]").getValue(context);

		System.out.println("[Collection Selection Expression] Movie title is "
				+ movies.get(0).getTitle());
	}

	@SuppressWarnings("unchecked")
	public void evaluateCollectionProjectionExpression() throws Exception {
		Genre genre = getGenre();
		StandardEvaluationContext context = new StandardEvaluationContext(genre);

		ExpressionParser parser = new SpelExpressionParser();
		List<String> titleList = (List<String>) parser.parseExpression(
				"movies.![title]").getValue(context);

		System.out
				.println("[Collection Projection Expression] first movie title is "
						+ titleList.get(0)
						+ ", second movie title is "
						+ titleList.get(1));
	}

	private Genre getGenre() {
		Genre genre = new Genre();
		genre.setGenreId("GR-02");
		genre.setName("Adventure");

		ArrayList<Movie> movies = new ArrayList<Movie>();

		Movie movie = new Movie();
		movie.setGenre(genre);
		movie.setMovieId("MV-000001");
		movie.setTitle("Shrek (2001)");
		movie.setActors("Shrek");
		movie.setDirector("Andrew Adamson");
		movie.setReleaseDate(new Date());
		movie.setRuntime(90);
		movie.setTicketPrice(8000);
		movie.setNowPlaying("N");
		movies.add(movie);

		movie = new Movie();
		movie.setGenre(genre);
		movie.setMovieId("MV-000002");
		movie.setTitle("Avatar");
		movie.setActors("Sigourney Weaver");
		movie.setDirector("James Cameron");
		movie.setReleaseDate(new Date());
		movie.setRuntime(100);
		movie.setNowPlaying("Y");
		movies.add(movie);

		genre.setMovies(movies);

		return genre;
	}
}
