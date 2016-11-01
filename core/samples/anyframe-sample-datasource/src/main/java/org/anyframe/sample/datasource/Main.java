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
package org.anyframe.sample.datasource;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=org.anyframe.sample.datasource.Main
 * 
 * @author SoYon Lim
 */
public class Main {

	protected ClassPathXmlApplicationContext context;
	
	private Connection conn;

	/**
	 * initializing
	 */
	protected void setup() {
		String[] locations = new String[] { "classpath:spring/context-*.xml" };
		context = new ClassPathXmlApplicationContext(locations, false);
		context.refresh();
	}

	/**
	 * detroying
	 * @throws Exception 
	 */
	protected void teardown() throws Exception {
		context.close();
		conn.close();
	}

	/**
	 * main
	 */
	public static void main(String[] args) throws Exception {
		Main main = new Main();

		// 1. initialize context
		main.setup();
		// 2. test
		main.getConnection();
		// 3. close context
		main.teardown();
	}

	public void getConnection() throws Exception {
		// 1. lookup dataSource
		DataSource datasource = (DataSource) context.getBean("dataSource");
		// 2. try to get a connection from dbcp connection pool
		conn = datasource.getConnection();
		System.out.println("Connection is " + conn + "");
	}
}
