/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.sample.scheduling.unit;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(JUnit4.class)
public class SimpleConfigurationTETest {

	@Test 
	public void testJob() throws Exception {
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(
		"spring/context-scheduling-TaskExecutor-quartz.xml");
		
		TaskExecutorExample taskExecutorExample = (TaskExecutorExample) ctx
				.getBean("taskExecutorExample");
		System.out.println(taskExecutorExample);
		taskExecutorExample.getTaskExecutor();
		Assert.assertEquals(
				taskExecutorExample.getTaskExecutor().getClass().getName(),
				"org.springframework.scheduling.quartz.SimpleThreadPoolTaskExecutor");

	}

}
