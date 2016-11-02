package org.anyframe.plugin.common.util;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.Key;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.IvParameterSpec;

import org.apache.commons.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * 암호화를 해주는 Utility class. 핵심 method는 encrypt와 decrypt이며, 암호화 된 내용은
 * 실행되는 컴퓨터에서만 valid함. 그 이유는 자동 생성되는 private key를 사용하여 암호화 해서임.
 * 물론 해당 key store을 다른 컴퓨터로 copy해도 됨.
 * @author uchung
 *
 */
abstract public class EncryptionUtil {
  private static final Logger log = LoggerFactory.getLogger(EncryptionUtil.class);
  /**
   * single login id
   */
  public static final String LOGIN_ID = "EP_LOGINID";
  /**
   * single locale
   */
  public static final String LOCALE = "EP_LOCALE";
  /**
   * single Time zone
   */
  public static final String TIMEZONE = "EP_TIMEZONE";
  /**
   * single return 값
   */
  public static final String RETURN_CODE = "EP_RETURNCODE";
  
  /**
   * 이름
   */
  public static final String NAME = "EP_USERNAME";
  /**
   * 영문 이름
   */
  public static final String NAME_EN = "EP_USERNAME_EN";
  /**
   * nick name
   */
  public static final String NICKNAME = "EP_NICKNAME";
  /**
   * 직급명
   */
  public static final String POSITION_NAME = "EP_GRDNAME";
  /**
   * 직급 code
   */
  public static final String POSITION_CODE= "EP_GRDID";
  /**
   * 법인명
   */
  public static final String COMPANY_NAME = "EP_COMPNAME";
  /**
   * 법인 코드
   */
  public static final String COMPANY_CODE = "EP_COMPID";
  /**
   * 부서명
   */
  public static final String DEPARTMENT_NAME = "EP_DEPTNAME";
  
  public static final String DEPARTMENT_NAME_EN = "EP_DEPTNAME_EN";
  /**
   * 부서 코드
   */
  public static final String DEPARTMENT_CODE = "EP_DEPTID";
  /**
   * 회사 전화번호
   */
  public static final String COMPANY_PHONE = "EP_COMPTEL";
  /**
   * 핸드폰 번호
   */
  public static final String CELL_PHONE = "EP_MOBILE";
  /**
   * 이메일 주소
   */
  public static final String MAIL = "EP_MAIL";
  /**
   * EPID (mySingle 의 PK)
   */
  public static final String EP_ID = "EP_USERID";
  /**
   * preferred 언어 코드
   */
  public static final String LANGUAGE = "EP_PREFERREDLANGUAGE";
  /**
   * 사번
   */
  public static final String EMPLOYEE_NUMBER = "EP_SABUN";
  /**
   * 주민번호
   */
  public static final String SOCIAL_NUMBER = "EP_SOCIALID";
  /**
   * 영문 법인 이름
   */
  public static final String COMPANY_NAME_EN = "EP_COMPNAME_EN";
  /**
   * 영문 직급명
   */
  public static final String POSITION_NAME_EN = "EP_GRDNAME_EN";
  /**
   * 회사명
   */
  public static final String COMPNAME = "EP_COMPNAME";
  /**
   * LOGIN IP
   */
  public static final String LOGIN_IP = "EP_LOGINIP";
  
  public static final String TIMEZONEID= "EP_TIMEZONEID";

  private static final String ENCRYPTED_SIG = "e1c";
  
  private static byte[] iv = new byte[]{(byte)0x10, (byte)0x11, (byte)0x12, (byte)0x13, (byte)0x14, (byte)0x15, (byte)0x16,(byte)0x17, (byte)0x18, (byte)0x19, (byte)0x1a, (byte)0x1b, (byte)0x1c, (byte)0x1d, (byte)0x1e, (byte)0x1f};
  private static Key key;
  private static final String xform = "AES/CBC/PKCS5Padding";
  private static final String KEY_ALIAS = "standardDevelopmentPlatform";
  private static final char[] KEY_PASSWORD = "sdp2015".toCharArray();
  private static final char[] KEYSTORE_KEY = "sdp2015".toCharArray();
  private static final String KEY_STORE_PATH = "/key.ks";
  static {
	    // Generate a secret key
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
	  }

  /**
   * str 이 암호화된 string 인지 여부를 구함
   * @param str 확인할 string
   * @return str 이 암호화된 string 인지 여부
   */
  public static final boolean isEncryptedText(String str) {
    if (str == null) return false;
    return str.startsWith(ENCRYPTED_SIG);
  }
  
  /**
   * str 을 암호화 함
   * @param str 암호화 할 string
   * @return 암호화된 string
   */
  public static String encrypt(String str) {
    try {
      Cipher cipher = Cipher.getInstance(xform);
      IvParameterSpec ips = new IvParameterSpec(iv);
      cipher.init(Cipher.ENCRYPT_MODE, key, ips);
      byte []data = cipher.doFinal(str.getBytes());
      
      String s = Base64.encodeBytes(data, Base64.URL_SAFE|Base64.DONT_BREAK_LINES);
      return ENCRYPTED_SIG + s.replace('=', '.');
//      return data;
    } catch (Exception ex) {
    	log.error(ex.getMessage(),ex);
      return null;
    }
  }

  /**
   * str 을 암호화 함
   * @param str 암호화 할 string
   * @return 암호화된 string
   */
  public static String xencrypt(String str) {
    return encrypt(str);
  }
  /**
   * str 을 암호화 해제
   * @param str 암호화된 string
   * @return 암호화 해제 된 string
   */
  public static String xdecrypt(String str) {
    return decrypt(str);
  }
  
  /**
   * 암호화 함
   */
  public static String decrypt(String inpBytes) {
    try {
      if (!inpBytes.startsWith(ENCRYPTED_SIG)) return inpBytes;
      inpBytes = inpBytes.substring(ENCRYPTED_SIG.length()).replace('.','=');
      Cipher cipher = Cipher.getInstance(xform);
      IvParameterSpec ips = new IvParameterSpec(iv);
      cipher.init(Cipher.DECRYPT_MODE, key, ips);
      
      byte []data = Base64.decode(inpBytes, Base64.URL_SAFE|Base64.DONT_BREAK_LINES);
      return new String(cipher.doFinal(data));
    } catch (BadPaddingException ex) {
    	log.error(ex.getMessage(),ex);
      return null;
    } catch (Exception ex) {
    	log.error(ex.getMessage(),ex);
      return null;
    }
  }  

  public static String encryptSHA256(String str){
	  String SHA = "";
	  try{
		  MessageDigest sh = MessageDigest.getInstance("SHA-256");
		  sh.update(str.getBytes());
		  byte byteData[] = sh.digest();
		  StringBuffer sb = new StringBuffer();
		  for(int i = 0 ; i < byteData.length ; i++){
			  sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));
		  }
		  SHA = sb.toString();
	  }catch(NoSuchAlgorithmException e){
		  e.printStackTrace();
		  SHA = null;
	  }
	  return SHA;
  }


}
