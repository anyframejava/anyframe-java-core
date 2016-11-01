package org.anyframe.sample.lazyinit.service.impl;

import org.anyframe.sample.lazyinit.dao.MoviePrototypeDao;
import org.anyframe.sample.lazyinit.service.PrototypeMovieAutowiredLazyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class PrototypeMovieAutowiredLazyServiceImpl implements PrototypeMovieAutowiredLazyService {
	
	@Autowired @Lazy
	private MoviePrototypeDao moviePrototypeDao;
	
	/**
	 * scope=prototype Component 의 경우 inject 시점에 lazy-init 을 적용가능하나
	 * 실행시마다 Bean 객체가 생성된다. 
	 */
	@Override
	public void testAutowiredLazy() {
		System.out.println("==== Prototype Movie in Autowired Lazy Test ====");
		System.out.println("call moviePrototypeDao.print()");
		moviePrototypeDao.print();
		System.out.println("call moviePrototypeDao.print()");
		moviePrototypeDao.print();
	}
}
