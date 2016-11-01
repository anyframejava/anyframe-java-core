package org.anyframe.sample.lazyinit;

import org.anyframe.sample.lazyinit.service.impl.PrototypeMovieAutowiredLazyServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class PrototypeMovieAutowiredLazyTest {

	@Autowired
	private PrototypeMovieAutowiredLazyServiceImpl prototypeMovieAutowiredLazyService;
	
	@Test
	public void testAutowiredLazy() throws Exception {
		
		prototypeMovieAutowiredLazyService.testAutowiredLazy();
	}
}
