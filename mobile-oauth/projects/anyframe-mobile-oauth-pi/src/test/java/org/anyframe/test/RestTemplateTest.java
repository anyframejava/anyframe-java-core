package org.anyframe.test;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.plugin.mobile.domain.Genre;
import org.anyframe.plugin.mobile.domain.Movie;
import org.codehaus.plexus.util.Base64;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class RestTemplateTest {

	@Test
	@Transactional(value = "txManager")
	public void restTemplateTest() throws Exception {
		/*
		 * restTemplate.getForObject() : 기본 Http Header를 사용며 결과를 객체로 반환 받는다.
		 * restTemplate.getForEntity() : 기본 Http Header를 사용하며 결과를 Http ResponseEntity로 반환 받는다.
		 * restTemplate.exchange() : Http Header 를 수정할 수 있고 결과를 Http ResponseEntity로 반환 받는다.
		 * restTemplate.execute() : Request/Response 콜백을 수정할 수 있다.
		*/
		
		RestTemplate restTemplate  = new RestTemplate();
		
		Movie movie = new Movie();
		
		//get
		movie = restTemplate.getForObject("http://localhost:8080/anyframe-mobile-oauth-pi/service/movies/{movieId}", Movie.class,"MV-00001");
		
	
		//getListWithDate
		List<Movie> list = restTemplate.getForObject("http://localhost:8080/anyframe-mobile-oauth-pi/service/movies?startDate=20100201&endDate=20100301", List.class);
		System.out.println(list.size());
		
		//update
		movie.setActors("test111");
		restTemplate.put("http://localhost:8080/anyframe-mobile-oauth-pi/service/movies", movie);
		
		//insert
		movie.setMovieId("MV-00007");
		movie.setActors("test");
		movie.setDirector("test");
		Genre genre = new Genre();
		genre.setGenreId("GR-01");
		genre.setName("Action");
		String id = restTemplate.postForObject("http://localhost:8080/anyframe-mobile-oauth-pi/service/movies/create", movie, String.class);
		System.out.println(id);
				
		
		//delete
		Map<String, String> params = new HashMap<String, String>();
	    params.put("movieId",id);
		restTemplate.delete("http://localhost:8080/anyframe-mobile-oauth-pi/service/movies/{movieId}", params);
		
		//poster
		//http://localhost:8080/anyframe-mobile-oauth-pi/sample/images/sample_poster.jpg
		
		
	}
	
	@Test
	public void restOauthTest() throws Exception {
		RestTemplate restTemplate  = new RestTemplate();
		String text = "app1:app1-secret";
		byte[] encoded = Base64.encodeBase64(text.getBytes());
		Movie movie = new Movie();
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "bearer " + "524d3dcd-bf2e-4bf0-862f-eb30a3dcf203");
		Map params = new HashMap();
		
		HttpEntity<Map> entity = new HttpEntity<Map>(params, headers);
		
		//List<Movie> list = restTemplate.getForObject("http://localhost:8080/anyframe-mobile-oauth-pi/service/movies?startDate=20100201&endDate=20100301&title=&pageIndex=1", List.class);
		ResponseEntity<List> aa = restTemplate.exchange("http://localhost:8080/anyframe-mobile-oauth-pi/service/movies", HttpMethod.GET, entity, List.class);
		System.out.println(aa.toString());
		//System.out.println(list.size());
		
		//System.out.println(response.getBody().toString());
	}

}
