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
package org.anyframe.plugin.jce.moviefinder.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.KeyStore;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;

import org.apache.commons.logging.LogFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.anyframe.plugin.common.util.Base64;
import org.anyframe.plugin.common.util.EncryptionUtil;

/**
 * This is a Encryption Test
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@AnyframeTest
public class EncrytionTest {

	private static byte[] iv = new byte[] { (byte) 0x10, (byte) 0x11,
			(byte) 0x12, (byte) 0x13, (byte) 0x14, (byte) 0x15, (byte) 0x16,
			(byte) 0x17, (byte) 0x18, (byte) 0x19, (byte) 0x1a, (byte) 0x1b,
			(byte) 0x1c, (byte) 0x1d, (byte) 0x1e, (byte) 0x1f };

	private static final String KEY_STORE_PATH = "/key.ks";
	private static final char[] KEYSTORE_KEY = "sdp2015".toCharArray();
	private static final String KEY_ALIAS = "standardDevelopmentPlatform";
	private static final char[] KEY_PASSWORD = "sdp2015".toCharArray();
	private static Key key;
	
	@Test
	public void testJasyptEncrytion() throws NoSuchAlgorithmException,
			NoSuchPaddingException, InvalidKeyException,
			InvalidAlgorithmParameterException, IllegalBlockSizeException,
			BadPaddingException {
		/* AES 알고리즘 테스트 */

		// 1. key 생성
	    try {
		      String keyFileHome = System.getProperty("user.home") + "/samsung";
		      String keyFileName = keyFileHome + KEY_STORE_PATH; 
		      File keyFile = new File(keyFileName);
		      if (keyFile.exists() && keyFile.canRead()) {
		        try {
		          FileInputStream in = new FileInputStream(keyFile);
		          try {
		            KeyStore ks = KeyStore.getInstance("JCEKS");
		            ks.load(in, KEYSTORE_KEY);
		            key = ks.getKey(KEY_ALIAS, KEY_PASSWORD);
		          } finally {
		            in.close();
		          }
		        } catch (Exception ex) {
		          LogFactory.getLog(EncryptionUtil.class).warn(ex.getMessage(), ex);
		        }
		      }
		      if (key == null) {
		        KeyGenerator kg = KeyGenerator.getInstance("AES");
		        kg.init(128); // 128 is the keysize. Fixed for DES
		        key = kg.generateKey();
		        if (!keyFile.getParentFile().exists()) keyFile.getParentFile().mkdirs();
		        if (!keyFile.exists()) {
		          FileOutputStream out = new FileOutputStream(keyFile);
		          try {
		            KeyStore ks = KeyStore.getInstance("JCEKS");
		            ks.load(null, null);
		            ks.setKeyEntry(KEY_ALIAS, key, KEY_PASSWORD, null);
		            ks.store(out, KEYSTORE_KEY);
		          } finally {
		            out.close();
		          }
		        }
		      }
		    } catch (Throwable e) {
		      LogFactory.getLog(EncryptionUtil.class).warn(e.getMessage(), e);
		    }

		// 2. 암호화
		String transformation = "AES/CBC/PKCS5Padding"; // 암호화알고리즘/운용모드/패딩, AES일
														// 경우
		Cipher cipher = Cipher.getInstance(transformation);
		IvParameterSpec ips = new IvParameterSpec(iv);
		cipher.init(Cipher.ENCRYPT_MODE, key, ips);

		String str = "jdbc:hsqldb:hsql://localhost/sampledb";
		byte[] plain = str.getBytes();
		byte[] encrypt = cipher.doFinal(plain);


		String s = Base64.encodeBytes(encrypt, Base64.URL_SAFE
				| Base64.DONT_BREAK_LINES);

		System.out.println(s);
	}

}
