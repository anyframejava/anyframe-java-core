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
package org.anyframe.idgen.impl;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import javax.inject.Inject;

import org.anyframe.idgen.IdGenService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what UUIDGeneration Service supports, there are some
 * test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class UUIdGenServiceTest {

	@Inject
	private ApplicationContext applicationContext;

	/**
	 * [Flow #-1] Positive Case : try to get next String id and BigDecimal id.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testUUIdGeneration() throws Exception {
		IdGenService id = (IdGenService) applicationContext
				.getBean("UUIdGenerationService");
		// 1. get next String id
		for (int i = 0; i < 10; i++) {
			assertNotNull(id.getNextStringId());
		}
		// 2. get next BigDecimal id
		for (int i = 0; i < 10; i++) {
			assertNotNull(id.getNextBigDecimalId());
		}
	}

	/**
	 * [Flow #-2] Positive Case : In case of not defining MAC address, try to
	 * get next String id and BigDecimal id.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testUUIdGenerationNoAddress() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("UUIdGenerationServiceWithoutAddress");
		// 1. get next String id
		for (int i = 0; i < 10; i++) {
			assertNotNull(idGenerator.getNextStringId());
		}
		// 2. get next BigDecimal id
		for (int i = 0; i < 10; i++) {
			assertNotNull(idGenerator.getNextBigDecimalId());
		}
	}

	/**
	 * [Flow #-2] Positive, Negative Case : In case of defining MAC address, try
	 * to get next String id and BigDecimal id.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testUUIdGenerationIP() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("UUIdGenerationServiceWithIP");
		// 1. get next String id
		for (int i = 0; i < 10; i++) {
			assertNotNull(idGenerator.getNextStringId());
		}
		// 2. get next BigDecimal id
		for (int i = 0; i < 10; i++) {
			assertNotNull(idGenerator.getNextBigDecimalId());
		}
	}

	/**
	 * [Flow #-3] Negative Case : execute UUIdGenerationService not supported
	 * functions
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testNotSupported() throws Exception {
		IdGenService id = (IdGenService) applicationContext
				.getBean("UUIdGenerationService");
		// 1. get next byte id
		try {
			id.getNextByteId();
		} catch (Exception e) {
			assertTrue(e instanceof UnsupportedOperationException);
		}

		// 2. get next integer id
		try {
			id.getNextIntegerId();
		} catch (Exception e) {
			assertTrue(e instanceof UnsupportedOperationException);
		}

		// 3. get next long id
		try {
			id.getNextLongId();
		} catch (Exception e) {
			assertTrue(e instanceof UnsupportedOperationException);
		}

		// 4. get next short id
		try {
			id.getNextShortId();
		} catch (Exception e) {
			assertTrue(e instanceof UnsupportedOperationException);
		}

		// 5. get next string id with a specific strategy
		try {
			id.getNextStringId("mixPrefix");
		} catch (Exception e) {
			assertTrue(e instanceof UnsupportedOperationException);
		}
	}
}
