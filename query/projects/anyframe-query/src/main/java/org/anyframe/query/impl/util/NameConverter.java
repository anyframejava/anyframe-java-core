/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.query.impl.util;

import java.lang.reflect.Field;
import java.util.Map;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class NameConverter extends AbstractNameMatcher {

	/**
	 * Prefix.
	 */
	private String prefix = "";

	/**
	 * Suffix.
	 */
	private String suffix = "";

	/**
	 * Capitalises the first character of a string.
	 * 
	 * @param name
	 *            The string to capitilised
	 * @return The name with the first character capitalised.
	 */
	public static String capitalise(String name) {
		if (name == null || name.length() == 0) {
			return name;
		}
		char[] chars = name.toCharArray();
		chars[0] = Character.toUpperCase(chars[0]);
		return new String(chars);
	}

	/**
	 * @see org.anyframe.query.impl.util.AbstractNameMatcher#isMatching(java.lang.String,
	 *      java.lang.String)
	 */
	// 2009.03.17 - start
	// NameMatcher API 변경 사항 적용
	public boolean isMatching(String fieldName, String columnName,
			String parentFieldName) {
		// 2009.03.17 - end
		if (columnName.equalsIgnoreCase(prefix.concat(
				NameConverter.convertToUnderScore(fieldName)).concat(suffix))) {
			return true;
		}
		return false;
	}
	
	public Field isMatching(Map attributeMap, String columnName,
			String parentFieldName) {
		
		String camelCasedColumnName = prefix.concat(
				NameConverter.convertToCamelCase(columnName)).concat(suffix);
		// TODO : ignore case
		if (attributeMap.containsKey(camelCasedColumnName)) {
			return (Field)attributeMap.get(camelCasedColumnName);
		}
		return null;
	}	

	/**
	 * Convert a camel case string to underscore representation.
	 * 
	 * @param camelCaseStr
	 *            Camel case string.
	 * @return Underscore representation of the camel case string.
	 */
	public static String convertToUnderScore(String camelCaseStr) {
		String result = "";
		for (int i = 0; i < camelCaseStr.length(); i++) {
			char currentChar = camelCaseStr.charAt(i);
			// This is starting at 1 so the result does
			// not end up with an
			// underscore at the begin of the value
			if (i > 0 && Character.isUpperCase(currentChar)) {
				result = result.concat("_");
			}
			result = result.concat(Character.toString(currentChar)
					.toLowerCase());
		}
		return result;
	}

	/**
	 * find searchChar in original string and convert to camel case
	 * 
	 * @param originalString
	 * @param searchChar
	 * @return
	 */
	public static String convertToCamelCase(String originalString,
			char searchChar) {
		String result = "";
		boolean nextUpper = false;

		for (int i = 0; i < originalString.length(); i++) {
			char currentChar = originalString.charAt(i);
			if (currentChar == searchChar) {
				nextUpper = true;
			} else {
				if (nextUpper) {
					currentChar = Character.toUpperCase(currentChar);
					nextUpper = false;
				}
				result = result.concat(Character.toString(currentChar));
			}
		}
		return result;
	}

	/**
	 * Convert a string that may contain underscores to camel case.
	 * 
	 * @param underScore
	 *            Underscore name.
	 * @return Camel case representation of the underscore string.
	 */
	public static String convertToCamelCase(String underScore) {
		String result = "";
		boolean nextUpper = false;
		String allLower = underScore.toLowerCase();
		for (int i = 0; i < allLower.length(); i++) {
			char currentChar = allLower.charAt(i);
			if (currentChar == '_') {
				nextUpper = true;
			} else {
				if (nextUpper) {
					currentChar = Character.toUpperCase(currentChar);
					nextUpper = false;
				}
				result = result.concat(Character.toString(currentChar));
			}
		}
		return result;
	}

	/**
	 * @see org.anyframe.query.impl.util.AbstractNameMatcher#setFieldPrefix(java.lang.String)
	 */
	public void setFieldPrefix(String prefix) {
		if (prefix == null) {
			this.prefix = "";
		} else {
			this.prefix = prefix;
		}
	}

	/**
	 * @see org.anyframe.query.impl.util.AbstractNameMatcher#setFieldSuffix(java.lang.String)
	 */
	public void setFieldSuffix(String suffix) {
		if (suffix == null) {
			this.suffix = "";
		} else {
			this.suffix = suffix;
		}
	}

	/**
	 * Decapitalises the first character of a string.
	 * 
	 * @param name
	 *            The string to decapitilised.
	 * @return The name with the first character converted to lower case.
	 */
	public static String deCapitalise(String name) {
		if (name == null || name.length() == 0) {
			return name;
		}
		char[] chars = name.toCharArray();
		chars[0] = Character.toLowerCase(chars[0]);
		return new String(chars);
	}
}
