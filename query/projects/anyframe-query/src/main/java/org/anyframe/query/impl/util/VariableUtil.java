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
package org.anyframe.query.impl.util;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public abstract class VariableUtil {

	private VariableUtil() {
		super();
	}

	/**
	 * In the case where defined query statement includes strings such as
	 * '%'||vo.searchKeyword||'%' Velocity fails to process. Therefore, if it is
	 * defined in the format of [%]vo.searchKeyword[%] Anyframe can extract
	 * searchKeyword value and change it into %...% format. However, it is
	 * defined in the format of '%' ||, Velocity alone can process without
	 * defining % within [].
	 * 
	 * vo.searchKeyword || '%'
	 * 
	 * @deprecated
	 * @param originalString
	 *            original paramname
	 * @param variableSelector
	 *            VariableSelector extracting value which is the same as
	 *            paramname extracted from Map or VO
	 * 
	 * @return Value which is the same as paramname extracted form Map or Vo
	 * 
	 * 
	 */
	public static String getValueString(String originalString,
			VariableSelector variableSelector) {
		StringBuilder newWord = new StringBuilder();

		StringBuilder beforeBrace = new StringBuilder();
		StringBuilder inBrace = new StringBuilder();

		char[] tempChars = originalString.toCharArray();

		boolean withinBrace = false;
		int i = 0;

		while (i < tempChars.length) {
			char c = tempChars[i];
			if (withinBrace) {
				if (c == ']') {
					if (beforeBrace.length() > 0
							&& variableSelector.containsKey(beforeBrace
									.toString()))
						newWord.append(variableSelector.get(beforeBrace
								.toString()));
					newWord.append(inBrace);
					beforeBrace = new StringBuilder();
					inBrace = new StringBuilder();
					withinBrace = false;
				} else {
					inBrace.append(c);
				}
			} else {
				if (c == '[') {
					withinBrace = true;
				} else {
					beforeBrace.append(c);
				}
				if (i == tempChars.length - 1) {
					if (beforeBrace.length() > 0
							&& variableSelector.containsKey(beforeBrace
									.toString()))
						newWord.append(variableSelector.get(beforeBrace
								.toString()));
					beforeBrace = new StringBuilder();
				}
			}
			i++;
		}

		StringBuilder keyWord = new StringBuilder();

		keyWord.append(beforeBrace);
		if (withinBrace)
			keyWord.append('[');
		keyWord.append(inBrace);
		if (keyWord.length() > 0)
			newWord.append(variableSelector.get(keyWord.toString()));

		return newWord.toString();
	}
}
