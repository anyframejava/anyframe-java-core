/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.logmanager.log4mongo;

import java.util.Random;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @author Jaehyoung Eum
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/spring/context-common.xml" })
public class MongoLoggerTest {

	private static final long millis = 500;
	private static final long DATA_COUNT = 10;
	private static final int STRING_LENGTH = 100;
	
	@Test
	public void generateLogData4Test() throws Exception {

		Logger log = LoggerFactory.getLogger(MongoLoggerTest.class);
		MDC.put("clientIp", "127.0.0.1");
		MDC.put("serverIp", "127.0.0.1");
		MDC.put("userId", "junit_test");
		MDC.put("appName", "/anyframe-logmanager-pi");

		String s = null;
		for (int i = 0; i < DATA_COUNT; i++) {
			s = getRandomString(STRING_LENGTH);
			System.out.println("[" + i + "]=" + s);
			int n = getRandomNumber(5);
			
			if(n == 1) {
				log.info(s);
			}else if(n == 2) {
				log.warn(s);
			}else if(n == 3) {
				log.error(s, new Exception(s));
			}else{
				log.debug(s);
			}
			Thread.sleep(millis);
		}

		MDC.remove("clientIp");
		MDC.remove("serverIp");
		MDC.remove("userId");
		MDC.remove("appName");
	}

	/**
	 * @param l
	 * @return
	 */
	private static int getRandomNumber(int l){
		Random random = new Random();
		return (random.nextInt() % l);
	}
	
	/**
	 * 랜덤한 문자열을 원하는 길이만큼 반환합니다.
	 * 
	 * @param length
	 *            문자열 길이
	 * @return 랜덤문자열
	 */
	private static String getRandomString(int length) {
		StringBuffer buffer = new StringBuffer();
		Random random = new Random();

		String chars[] = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");

		for (int i = 0; i < length; i++) {
			buffer.append(chars[random.nextInt(chars.length)]);
		}
		return buffer.toString();
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
