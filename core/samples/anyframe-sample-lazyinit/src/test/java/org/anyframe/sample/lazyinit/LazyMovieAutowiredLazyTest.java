package org.anyframe.sample.lazyinit;

import org.anyframe.sample.lazyinit.service.impl.LazyMovieAutowiredLazyServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class LazyMovieAutowiredLazyTest {

	@Autowired
	private LazyMovieAutowiredLazyServiceImpl lazyMovieAutowiredLazyService;
	
	@Test
	public void testAutowiredLazy() throws Exception {
		
		lazyMovieAutowiredLazyService.testAutowiredLazy();
	}
}
