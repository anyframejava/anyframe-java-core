package org.anyframe.sample.lazyinit.dao;

import java.util.Date;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository
@Lazy
public class MovieLazyDao {
	
	private long time;

	public MovieLazyDao() {
		System.out.println("class MovieLazyDao initialized");
		time = new Date().getTime();
	}
	
	public void print()
	{
		System.out.println("--> print MovieLazyDao !!!  : " + time);
	}
}
