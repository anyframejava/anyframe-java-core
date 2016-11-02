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

import java.lang.reflect.Field;
import java.util.Map;

/**
 * @author Warren Mayocchi
 * 
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim
 */
public abstract class AbstractNameMatcher implements Cloneable {

	/**
	 * This field prefix and suffix will literally be appended to the fieldName
	 * for comparison to the column name.
	 * 
	 * @param attributeName
	 * @param columnName
	 * @param parentAttributeName
	 * @return Returns whether the two names are a match.
	 */
	public abstract boolean isMatching(String attributeName, String columnName,
			String parentAttributeName);

	public abstract Field isMatching(Map<String, Field> attributeMap,
			String columnName, String parentAttributeName, Field[] attributes);

	/**
	 * Set the prefix to use when matching a field name to column name. The
	 * prefix will be attached to the column name before matching.
	 * 
	 * @param fieldPrefix
	 *            Prefix.
	 */
	public abstract void setFieldPrefix(String fieldPrefix);

	/**
	 * Set the prefix to use when matching a field name to column name. The
	 * prefix will be attached to the column name before matching.
	 * 
	 * @param fieldSuffix
	 *            Suffix.
	 */
	public abstract void setFieldSuffix(String fieldSuffix);
}
