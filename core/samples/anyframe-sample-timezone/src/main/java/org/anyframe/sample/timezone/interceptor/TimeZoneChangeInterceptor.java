/*
 * Copyright 2008-2014 the original author or authors.
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
package org.anyframe.sample.timezone.interceptor;

import java.util.TimeZone;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * Interceptor that allows for changing the current timezone on every request,
 * via a configurable request parameter.
 * functionality.
 * 
 * @author Sujeong Lee
 * @see org.springframework.web.servlet.i18n.LocaleChangeInterceptor
 */
public class TimeZoneChangeInterceptor extends HandlerInterceptorAdapter {

	/**
	 * Default name of the locale specification parameter: "timeZone".
	 */
	public static final String DEFAULT_PARAM_NAME = "timeZone";

	private String paramName = DEFAULT_PARAM_NAME;
	
	/**
	 * Set the name of the parameter that contains a timeZone specification
	 * in a locale change request. Default is "timeZone".
	 */
	public void setParamName(String paramName) {
		this.paramName = paramName;
	}

	/**
	 * Return the name of the parameter that contains a timeZone specification
	 * in a timeZone change request.
	 */
	public String getParamName() {
		return this.paramName;
	}
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws ServletException {

		String newTimeZone = request.getParameter(this.paramName);
		if (newTimeZone != null) {
			TimeZone timeZone = TimeZone.getTimeZone(newTimeZone); 
			if (timeZone == null) {
				throw new IllegalStateException("No TimeZone found");
			}
			LocaleContextHolder.setTimeZone(timeZone);
		}
		// Proceed in any case.
		return true;
	}
	
}
