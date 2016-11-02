package org.anyframe.sample.cglib;

import static org.junit.Assert.assertNotNull;

import org.anyframe.sample.cglib.service.impl.NoInterfaceClass;
import org.junit.Test;
import org.springframework.context.support.GenericXmlApplicationContext;

public class ProxyWithoutDefaultConstructor {

	private GenericXmlApplicationContext getContext() {
		GenericXmlApplicationContext ctx = new GenericXmlApplicationContext();
		ctx.load("classpath:spring/context-cglib.xml");
		ctx.refresh();
		return ctx;
	}
	
	@Test
	public void getMovieService() {
		NoInterfaceClass noInterfaceProxy = (NoInterfaceClass) getContext().getBean("noInterface");
		
		assertNotNull(noInterfaceProxy);
		noInterfaceProxy.printHello();
	}
}
