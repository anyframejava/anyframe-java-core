/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.struts.util;

import java.util.ArrayList;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@SuppressWarnings("unchecked")
public abstract class AbstractValueObjectList extends ArrayList implements ValueObject {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1002136584589591782L;

	public abstract ValueObject getValueObject();

	public abstract String getKeyParamName();
}
