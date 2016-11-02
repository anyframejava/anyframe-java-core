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
package org.anyframe.plugin.iam.director.service;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.iam.domain.Director;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import org.anyframe.datatype.SearchVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class DirectorServiceTest {

	@Inject
	@Named("directorService")
	private DirectorService directorService;
	
	@Inject
	private DaoAuthenticationProvider provider;
	
	public void setAuthenticatedUser(String id, String password) {

		SecurityContextHolder.setContext(new SecurityContextImpl());
		Authentication authentication = new UsernamePasswordAuthenticationToken(
				id, password);
		SecurityContextHolder.getContext().setAuthentication(
				provider.authenticate(authentication));
	}
	
	private Director makeDirector() throws Exception{
		Director director = new Director();
		director.setDirectorId("testDirector");
		director.setName("test director");
		director.setMovies("Movies that the test director made");
		
		return director;
	}
	
	@Test
	@Transactional(value = "txManager")
	@Rollback(value = true)
	public void testCreateDirector() throws Exception{
		
		// get authentication - ROLE_ADMIN
		setAuthenticatedUser("admin", "admin123");
		
		// create test director
		Director director = makeDirector();
		directorService.create(director);
		
		// test get
		Director selectedDirector = directorService.get(director.getDirectorId());

		Assert.assertNotNull("testing whether director was added or not", selectedDirector);
		Assert.assertEquals("checking director's name", director.getName(), selectedDirector.getName());

		// test remove
		directorService.remove(director.getDirectorId());
		
		Assert.assertNull(directorService.get(director.getDirectorId()));
	}
	
	@Test
	@Transactional(value = "txManager")
	@Rollback(value = true)
	public void testUpdateDirector() throws Exception{
		
		// get authentication - ROLE_ADMIN
		setAuthenticatedUser("admin", "admin123");
		
		// create
		Director director = makeDirector();
		directorService.create(director);
		
		// select
		Director selectedDirector = directorService.get(director.getDirectorId());
		
		String name = selectedDirector.getName() + " U";
		selectedDirector.setName(name);
		
		// update
		directorService.update(selectedDirector);
		
		Director modifiedDirector = directorService.get(selectedDirector.getDirectorId());
		
		Assert.assertNotNull("Fetching of director", modifiedDirector);
		Assert.assertEquals("checking director's name", name, modifiedDirector.getName());
		
		directorService.remove(director.getDirectorId());
		
		Assert.assertNull(directorService.get(director.getDirectorId()));
	}
	
	@Test
	@Transactional(value = "txManager")
	@Rollback(value = true)
	public void testFindUsersList() throws Exception {
		// create
		Director director = makeDirector();
		directorService.update(director);

		SearchVO search = new SearchVO();
		search.setSearchKeyword("test");
		search.setSearchCondition("name");

		List<Director> resultList = directorService.getList(search);

		Assert.assertNotNull("Result List is not null", resultList);

		search = new SearchVO();
		search.setSearchKeyword("T");
		resultList = directorService.getList(search);

		Assert.assertNotNull("Result List is not null", resultList);
		Assert.assertTrue(resultList.size() >= 1);
	}

	
}
