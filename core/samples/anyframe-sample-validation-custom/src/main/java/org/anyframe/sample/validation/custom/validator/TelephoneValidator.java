package org.anyframe.sample.validation.custom.validator;

import java.util.regex.Matcher;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.anyframe.sample.validation.custom.constraint.Telephone;

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
