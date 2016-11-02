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
package org.anyframe.plugin.jasypt.moviefinder.service;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This is a Jasypt Test
 * 
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@AnyframeTest
public class JasyptTest {

	@Test
	public void testJasyptEncrytion() {

		StandardPBEStringEncryptor spb = new StandardPBEStringEncryptor();
		spb.setAlgorithm("PBEWithMD5AndDES"); // password-based encryption
		spb.setPassword("BRACE_PASS"); // master key
		String encodedPass = spb
				.encrypt("jdbc:hsqldb:hsql://localhost/sampledb");
		System.out.println("Encrypted Password for admin is : " + encodedPass);
		String decodePass = spb.decrypt(encodedPass);
		System.out.println("Decrypted Password for admin is : " + decodePass);
	}
}
