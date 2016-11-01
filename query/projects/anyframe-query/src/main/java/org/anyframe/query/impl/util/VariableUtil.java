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

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public abstract class VariableUtil {

	private VariableUtil() {
		super();
	}

	/**
	 * 정의된 쿼리문이 '%'||vo.searchKeyword||'%' 와 같은 문자열을 포함하고 있을 경우 Velocity에서 처리하지
	 * 못하는 현상이 발생한다. 따라서 [%]vo.searchKeyword[%]와 같은 문자열 형태로 정의해 주면 Anyframe에서
	 * searchKeyword의 값을 추출하여 %...%와 같은 형태로 변경할 수 있도록 해준다. 단, '%' ||
	 * vo.searchKeyword || '%' 와 같이 정의해주면 %를 [] 내에 정의하지 않고도 Velocity 만을 이용하여
	 * 처리가능하다.
	 * 
	 * @deprecated
	 * @param originalString
	 *            original paramname
	 * @param variableSelector
	 *            Map 또는 VO 로부터 추출된 paramname에 해당하는 값을 꺼내는 VariableSelector
	 * @return Map 또는 VO 로부터 추출된 paramname에 해당하는 값
	 */
	public static String getValueString(String originalString,
			VariableSelector variableSelector) {
		StringBuffer newWord = new StringBuffer();

		StringBuffer beforeBrace = new StringBuffer();
		StringBuffer inBrace = new StringBuffer();

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
					beforeBrace = new StringBuffer();
					inBrace = new StringBuffer();
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
					beforeBrace = new StringBuffer();
				}
			}
			i++;
		}

		StringBuffer keyWord = new StringBuffer();

		keyWord.append(beforeBrace);
		if (withinBrace)
			keyWord.append('[');
		keyWord.append(inBrace);
		if (keyWord.length() > 0)
			newWord.append(variableSelector.get(keyWord.toString()));

		return newWord.toString();
	}
}
