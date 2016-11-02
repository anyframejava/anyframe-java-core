package org.anyframe.plugin.common.auth;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class MovieAuthenticationManager implements AuthenticationManager {
	
	@Override
	public Authentication authenticate(Authentication auth) throws AuthenticationException {
		return new UsernamePasswordAuthenticationToken(auth.getName(), auth.getCredentials());
	}

}
