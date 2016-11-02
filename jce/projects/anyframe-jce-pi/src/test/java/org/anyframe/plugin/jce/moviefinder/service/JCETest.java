/*
3 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.plugin.jce.moviefinder.service;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;

import org.anyframe.plugin.common.util.Base64;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This is a JCE Test
 * 
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@AnyframeTest
public class JCETest {

	private static Key key;
	
	@Test
	public void testJasyptEncrytion() throws NoSuchAlgorithmException,
			NoSuchPaddingException, InvalidKeyException,
			InvalidAlgorithmParameterException, IllegalBlockSizeException,
			BadPaddingException, InvalidKeySpecException {
		/* DES 알고리즘 테스트 */

		 // 1. key 생성
		 KeyGenerator kg = KeyGenerator.getInstance("DES");
		 kg.init(56); // 56 is the keysize. Fixed for DES
		 key = kg.generateKey();
		
		 // 2. 암호화
		 String transformation = "DES/ECB/PKCS5Padding"; //암호화알고리즘/운용모드/패딩, DES일 경우
		 Cipher cipher = Cipher.getInstance(transformation);
		 cipher.init(Cipher.ENCRYPT_MODE, key);
		
		 String str = "jdbc:hsqldb:hsql://localhost/sampledb";
		 byte[] plain = str.getBytes();
		 byte[] encrypt = cipher.doFinal(plain);
		
		 String e = Base64.encodeBytes(encrypt, Base64.URL_SAFE
		 | Base64.DONT_BREAK_LINES);
		
		 System.out.println("Encrypted Password for admin is : "+e);
		
		 cipher.init(Cipher.DECRYPT_MODE, key);
		 byte[] decrypt = cipher.doFinal(encrypt);
		
		 String d = new String(decrypt);
		
		 System.out.println("Decrypted Password for admin is : " + d);

	}

}
