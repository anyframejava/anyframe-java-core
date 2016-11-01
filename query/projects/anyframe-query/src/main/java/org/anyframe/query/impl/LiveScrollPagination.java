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
package org.anyframe.query.impl;

/**
 * This class is to expend Pagination to support Live Scrolling function.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class LiveScrollPagination extends Pagination {
	private int startIndex = 1;

	private boolean useStartIndex = false;

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.useStartIndex = true;
		this.startIndex = startIndex;
	}

	public boolean isUseStartIndex() {
		return useStartIndex;
	}
}
