package org.anyframe.test;


import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.codehaus.plexus.util.Base64;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class OauthTest {
	
	static {
	    //for localhost testing only
	    javax.net.ssl.HttpsURLConnection.setDefaultHostnameVerifier(
	    new javax.net.ssl.HostnameVerifier(){

	        public boolean verify(String hostname,
	                javax.net.ssl.SSLSession sslSession) {
	            if (hostname.equals("localhost")) {
	                return true;
	            }
	            return false;
	        }
	    });
	}
	
	@Test
	public void getToken() throws Exception {
		
		URL obj = new URL("https://localhost:8443/oauth/token");
		HttpURLConnection con = (HttpURLConnection)obj.openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.8");
		con.setRequestProperty("Accept", "application/json");
		con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		String text = "app1:app1-secret";
		byte[] encoded = Base64.encodeBase64(text.getBytes());
		
		con.setRequestProperty("Authorization", "Basic " + new String(encoded));
		con.setDoInput(true);
		con.setDoOutput(true);
		con.setUseCaches(false);
		con.setDefaultUseCaches(false);
		
		String urlParameters = "username=user&password=test&grant_type=password&scope=login&client_secret=app1-secret&client_id=app1";
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.write(urlParameters.getBytes());
		wr.flush();
		wr.close();
		
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer stringbuffer = new StringBuffer();
		while((inputLine = in.readLine()) != null) {
			stringbuffer.append(inputLine);
		}
		in.close();	
		System.out.println("###############################################");
		System.out.println(stringbuffer.toString());
		System.out.println("###############################################");
		
	}

	@Test
	public void getCode() throws Exception {
		
		URL obj = new URL("https://localhost:8443/oauth/authorize");
		HttpURLConnection con = (HttpURLConnection)obj.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("Accept-Language", "ko-KR");
		con.setRequestProperty("Accept", "text/html, application/xhtml+xml, */*");
		con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		String text = "user3:3";
		byte[] encoded = Base64.encodeBase64(text.getBytes());
		con.setRequestProperty("Authorization", "Basic " + new String(encoded));
		con.setDoInput(true);
		con.setDoOutput(true);
		con.setUseCaches(false);
		con.setDefaultUseCaches(false);
		
		String urlParameters = "response_type=code&client_id=app1&redirect_uri=http://localhost:8443/test/authorization-code&scope=login";
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.write(urlParameters.getBytes());
		wr.flush();
		wr.close();
		
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer stringbuffer = new StringBuffer();
		while((inputLine = in.readLine()) != null) {
			stringbuffer.append(inputLine);
		}
		in.close();	
		System.out.println("###############################################");
		System.out.println(stringbuffer.toString());
		System.out.println("###############################################");
		
	}
	
	@Test
	public void checkToken() throws Exception {
		URL obj = new URL("https://70.70.9.169:8443/oauth/check_token");
		HttpURLConnection con = (HttpURLConnection)obj.openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.8");
		con.setRequestProperty("Accept", "application/json");
		con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		String text = "app1:app1-secret";
		byte[] encoded = Base64.encodeBase64(text.getBytes());
		
		con.setRequestProperty("Authorization", "Basic " + new String(encoded));
		con.setDoInput(true);
		con.setDoOutput(true);
		con.setUseCaches(false);
		con.setDefaultUseCaches(false);
		
		//TO DO access_token 입력
		String token = "8d9d93b2-3ceb-40c7-921a-ce4958eda1a3";
		String urlParameters = "token=" + token;
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.write(urlParameters.getBytes());
		wr.flush();
		wr.close();
		
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer stringbuffer = new StringBuffer();
		while((inputLine = in.readLine()) != null) {
			stringbuffer.append(inputLine);
		}
		in.close();		
		System.out.println(stringbuffer.toString());
	}
	
}
