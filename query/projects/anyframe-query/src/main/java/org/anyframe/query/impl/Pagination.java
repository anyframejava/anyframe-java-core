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
package org.anyframe.query.impl;

import org.anyframe.query.QueryService;

/**
 * 입력된 쿼리문에 대해 페이징 처리하기 위해 필요한 Pagination 정보를 저장하는 클래스이다.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class Pagination {

	private long recordCount;

	private int pageSize = 20;

	private int pageIndex = 1;
	
	private boolean isPaging = true;

	public boolean isPaging() {
		return isPaging;
	}

	public void setPaging(boolean isPaging) {
		this.isPaging = isPaging;
	}

	private boolean countRecordSize = false;

	public boolean isCountRecordSize() {
		return countRecordSize;
	}

	public void setCountRecordSize(boolean countRecordSize) {
		this.countRecordSize = countRecordSize;
	}

	public Pagination() {
	}

	public Pagination(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * get page size.
	 * 
	 * @return page size
	 */
	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * get record count.
	 * 
	 * @return record count
	 */
	public long getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(long recordCount) {
		this.recordCount = recordCount;
	}

	/**
	 * get page index.
	 * 
	 * @return page index
	 */
	public int getPageIndex() {
		return pageIndex;
	}

	// 2009.05.12
	public void setPageIndex(int pageIndex) {
		if (isPaging && pageIndex < 1)
			QueryService.LOGGER
					.debug("Page number must have over 1. (current page number = "
							+ pageIndex + ")");
		this.pageIndex = pageIndex;
	}

	// 2009.05.12
	public void setPageIndexToLast() {
		if (isPaging && this.pageIndex > getPageCount())
			QueryService.LOGGER
					.warn("Current page number is bigger than last page number of result. (current page number = "
							+ pageIndex
							+ ", last page number = "
							+ getPageCount());
	}

	/**
	 * get total page count.
	 * 
	 * @return total page count
	 */
	public int getPageCount() {
		int iRecordCount = new Long(recordCount).intValue();
		if (pageSize == 0)
			return iRecordCount;
		if (recordCount % pageSize == 0)
			return iRecordCount / pageSize;
		else
			return iRecordCount / pageSize + 1;
	}
}
