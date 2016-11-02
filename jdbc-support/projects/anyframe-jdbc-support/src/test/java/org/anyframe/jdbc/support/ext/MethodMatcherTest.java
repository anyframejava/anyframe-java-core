package org.anyframe.jdbc.support.ext;

import java.lang.reflect.Method;
import java.sql.PreparedStatement;

import org.junit.Assert;
import org.junit.Test;

import com.p6spy.engine.proxy.MethodMatcher;
import com.p6spy.engine.proxy.MethodNameAndParameterLikeMatcher;

public class MethodMatcherTest {
	
	@Test
	public void testMethodMatcher() throws Exception{
		Method excuteVoid = PreparedStatement.class.getMethod("execute", null);
		
		MethodMatcher matcher = new MethodNameAndParameterLikeMatcher("execute");
		
		Assert.assertTrue(matcher.matches(excuteVoid));
	}

}
