package org.anyframe.sample.lazyinit.dao;

import java.util.Date;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

@Repository
@Scope(value="prototype")
public class MoviePrototypeDao {
	
	private long time;

	public MoviePrototypeDao() {
		System.out.println("class MoviePrototypeDao initialized");
		time = new Date().getTime();
	}
	
	public void print()
	{
		System.out.println("--> print MoviePrototypeDao !!!  : " + time);
	}
}
