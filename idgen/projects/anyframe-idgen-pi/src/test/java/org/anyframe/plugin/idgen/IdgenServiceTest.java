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
package org.anyframe.plugin.idgen;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import org.anyframe.idgen.IdGenService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what IDGeneration Service supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author SuJeong Lee
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class IdgenServiceTest {

	@Inject
	@Named("dataSource")
	DataSource dataSource;

	@Inject
	@Named("uuidGenService")
	IdGenService uuid;

	@Inject
	@Named("tableIdGenSimpleService")
	IdGenService tableidSimple;

	@Inject
	@Named("tableIdGenSimpleServiceWithKey")
	IdGenService tableidSimpleWithKey;

	@Inject
	@Named("tableIdGenWithMixPrefix")
	IdGenService tableidMixPrefix;

	@Inject
	@Named("tableIdGenWithTimestamp")
	IdGenService tableidTimestamp;

	@Inject
	@Named("sequenceIdGenService")
	IdGenService sequenceid;

	/**
	 * [Flow #-1] Positive : try to get next String id and BigDecimal id.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testUUIdGenService() throws Exception {
		// 1. get next String id
		for (int i = 0; i < 10; i++) {
			assertNotNull(uuid.getNextStringId());
		}
		// 2. get next BigDecimal id
		for (int i = 0; i < 10; i++) {
			assertNotNull(uuid.getNextBigDecimalId());
		}
	}

	/**
	 * [Flow #-2] Positive Case : try to get next String id from tableid
	 * generator with target table
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testSimpleTableId() throws Exception {
		// 1. get id twice to compare with each other
		String id1 = tableidSimple.getNextStringId("IDGEN_MOVIE");
		String id2 = tableidSimple.getNextStringId("IDGEN_MOVIE");
		assertEquals("fail to get differenct id", true, !id1.equals(id2));
	}

	/**
	 * [Flow #-3] Positive Case : try to get next String id from tableid
	 * generator with target table definition
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testSimpleTableIdWithKeyDef() throws Exception {
		// 1. get id twice to compare with each other
		String id1 = tableidSimpleWithKey.getNextStringId();
		String id2 = tableidSimpleWithKey.getNextStringId();
		assertEquals("fail to get differenct id", true, !id1.equals(id2));
	}

	/**
	 * [Flow #-4] Positive Case : when generate id, apply generation 'MixPrefix'
	 * strategy.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testWithMixPrefix() throws Exception {
		// 1. get id twice to compare with each other
		String id1 = tableidMixPrefix.getNextStringId("IDGEN_MOVIE");
		String id2 = tableidMixPrefix.getNextStringId("IDGEN_MOVIE");
		assertEquals("fail to get differenct id", true, !id1.equals(id2));
	}

	/**
	 * [Flow #-5] Positive Case : when generate id, apply generation 'Timestamp'
	 * strategy.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testWithTimestamp() throws Exception {
		// 1. get id twice to compare with each other
		String id1 = tableidTimestamp.getNextStringId("IDGEN_MOVIE");
		String id2 = tableidTimestamp.getNextStringId("IDGEN_MOVIE");
		assertEquals("fail to get differenct id", true, !id1.equals(id2));
	}

	/**
	 * [Flow #-6] Positive Case : try to get next String id from sequenceid
	 * generator
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testSequenceIdGenServiceTest() throws Exception {
		// 1. get id twice to compare with each other
		String id1 = sequenceid.getNextStringId();
		String id2 = sequenceid.getNextStringId();
		assertEquals("fail to get differenct id", true, !id1.equals(id2));
	}

}
