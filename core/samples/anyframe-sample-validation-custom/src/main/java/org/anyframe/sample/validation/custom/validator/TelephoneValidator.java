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
package org.anyframe.sample.validation.custom.validator;

import java.util.regex.Matcher;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.anyframe.sample.validation.custom.constraint.Telephone;

/**
 * This TelephoneValidator class checks validation using pattern.
 * 
 * @author Jeryeon Kim
 */
public class TelephoneValidator implements
		ConstraintValidator<Telephone, String> {
	private java.util.regex.Pattern pattern = java.util.regex.Pattern
			.compile("^[0-9]\\d{2}-(\\d{3}|\\d{4})-\\d{4}$");

	public void initialize(Telephone annotation) {
	}

	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null || value.length() == 0) {
			return true;
		}
		Matcher m = pattern.matcher(value);
		return m.matches();
	}
}
