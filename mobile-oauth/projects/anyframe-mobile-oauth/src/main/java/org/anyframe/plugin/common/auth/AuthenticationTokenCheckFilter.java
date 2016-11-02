package org.anyframe.plugin.common.auth;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.plexus.util.Base64;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.filter.GenericFilterBean;

import com.fasterxml.jackson.databind.ObjectMapper;

public class AuthenticationTokenCheckFilter extends GenericFilterBean {
	
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
	
	private String auth2ServerUrl;

	private String auth2ClientId;

	private String auth2ClientSecret;
	
	public void setAuth2ServerUrl(String auth2ServerUrl) {
		this.auth2ServerUrl = auth2ServerUrl;
	}

	public void setAuth2ClientId(String auth2ClientId) {
		this.auth2ClientId = auth2ClientId;
	}

	public void setAuth2ClientSecret(String auth2ClientSecret) {
		this.auth2ClientSecret = auth2ClientSecret;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
	
		try {
			HttpServletRequest httpServletRequest = (HttpServletRequest)request;
			String token = httpServletRequest.getHeader("Authorization");
			HashMap<String, Object> responseMap = null;
			
			if((token != null) && (token.contains("bearer"))) {
				String[] bearerToken = token.trim().split(" ");
				token = bearerToken[bearerToken.length-1];
				
				URL obj = new URL(auth2ServerUrl + "/oauth/check_token");
				HttpURLConnection con = (HttpURLConnection)obj.openConnection();
				con.setRequestMethod("POST");
				con.setRequestProperty("Accept-Language", "en-US,en;q=0.8");
				con.setRequestProperty("Accept", "application/json");
				con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
				con.setDoInput(true);
				con.setDoOutput(true);
				con.setUseCaches(false);
				con.setDefaultUseCaches(false);
				
				String clientInfo = auth2ClientId + ":" + auth2ClientSecret;
				byte[] encoded = Base64.encodeBase64(clientInfo.getBytes());
				
				con.setRequestProperty("Authorization", "Basic " + new String(encoded));
				
				
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
				
				responseMap = new ObjectMapper().readValue(stringbuffer.toString(), HashMap.class);
				List<String> authoritiesStr = (ArrayList<String>)responseMap.get("authorities");
				List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
				
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(responseMap.get("user_name"), "PW", authorities);
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails((HttpServletRequest)request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
				
			} 
			
			
		} catch(HttpClientErrorException e) {
			logger.error("인증서버 연결 중 에러가 발생하였습니다.");
			throw e;
		} catch(ConnectException e) {
			logger.error("인증서버와 연결이 되지 않습니다.");
			throw e;
		} catch(Exception e) {
			logger.error("알 수 없는 에러가 발생했습니다.");
			throw e;
		}
		
		chain.doFilter(request, response);
	}
}
