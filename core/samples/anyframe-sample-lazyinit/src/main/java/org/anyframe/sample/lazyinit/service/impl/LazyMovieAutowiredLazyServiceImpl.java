package org.anyframe.sample.lazyinit.service.impl;

import org.anyframe.sample.lazyinit.dao.MovieLazyDao;
import org.anyframe.sample.lazyinit.service.LazyMovieAutowiredLazyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class LazyMovieAutowiredLazyServiceImpl implements LazyMovieAutowiredLazyService {
	
	@Autowired @Lazy
	private MovieLazyDao movieLazyDao;
	
	/**
	 * Lazy 로 선언된 Component 의 경우 inject 시점에 lazy-init 을 적용가능하다.
	 */
	@Override
	public void testAutowiredLazy() {
		System.out.println("==== Autowired Lazy Test ====");
		System.out.println("call movieLazyDao.print()");
		movieLazyDao.print();
	}
}
