package org.anyframe.simpleweb.beans.support;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class ServiceELTest implements ApplicationContextAware {

	private ApplicationContext ctx;

	@Before
	public void initialize() throws Exception {
		ctx = new ClassPathXmlApplicationContext("classpath*:/**/anyframe-service.xml");
	}

	@Test
	public void serviceTypeTest() {

		String expressionStr = "#{serviceTest.getStringValue()}";

		ServiceEL serviceEL = new ServiceEL(expressionStr);
		HashMap<String, Object> bindMap = new HashMap<String, Object>();

		bindMap.put("beanFactory", ctx);
		// Object[] a = new Object[]{};
		Object result = serviceEL.execute(bindMap);
		System.out.println(serviceEL.getSerivceMethod() + ":" + serviceEL.getArgList() + ":" + result);

	}

	@Test
	public void serviceArrayListTypeTest() {

		String expressionStr = "#{serviceTest.getArrayListValue(array)}";

		ServiceEL serviceEL = new ServiceEL(expressionStr);
		HashMap<String, Object> bindMap = new HashMap<String, Object>();

		bindMap.put("beanFactory", ctx);

		ArrayList<String> param = new ArrayList<String>();
		if (serviceEL.getArgList().size() > 0) {
			List<String> argList = serviceEL.getArgList();
			for (int i = 0; i < argList.size(); i++) {
				if (i == 0)
					bindMap.put(serviceEL.getArgList().get(0), param);
				else
					bindMap.put(serviceEL.getArgList().get(i), param);
			}
		}
		// Object[] a = new Object[]{};
		Object result = serviceEL.execute(bindMap);
		System.out.println(serviceEL.getSerivceMethod() + ":" + serviceEL.getArgList() + ":" + result);
	}

	@Test
	public void serviceMapTypeTest() {

		String expressionStr = "#{serviceTest.getMapValue(map)}";

		ServiceEL serviceEL = new ServiceEL(expressionStr);
		HashMap<String, Object> bindMap = new HashMap<String, Object>();

		bindMap.put("beanFactory", ctx);
		Map<String, Object> param = new HashMap<String, Object>();
		if (serviceEL.getArgList().size() > 0) {
			List<String> argList = serviceEL.getArgList();
			for (int i = 0; i < argList.size(); i++) {
				if (i == 0)
					bindMap.put(serviceEL.getArgList().get(0), param);
				else
					bindMap.put(serviceEL.getArgList().get(i), param);
			}
		}
		Object result = serviceEL.execute(bindMap);
		System.out.println(serviceEL.getSerivceMethod() + ":" + serviceEL.getArgList() + ":" + result);
	}

	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.ctx = applicationContext;
	}

}
