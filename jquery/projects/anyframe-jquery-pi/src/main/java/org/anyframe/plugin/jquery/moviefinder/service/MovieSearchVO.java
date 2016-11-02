/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.plugin.jquery.moviefinder.service;

import org.anyframe.datatype.SearchVO;

/**
 * This MovieSearchVO class is a Value Object class for jqGrid.
 * And This class is also used for jsTree
 * 
 * @author Alex, Eum
 */

@SuppressWarnings("serial")
public class MovieSearchVO extends SearchVO{

    private String nowPlayingCondition = "Y"; 

    private String sord;
	
    private String sidx;
    
    private int page = 1;
	
    public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public String getNowPlayingCondition() {
		return nowPlayingCondition;
	}
	
	public void setNowPlayingCondition(String nowPlayingCondition) {
		this.nowPlayingCondition = nowPlayingCondition;
	}

	public String getSord() {
		return sord;
	}

	public void setSord(String sord) {
		this.sord = sord;
	}

	public String getSidx() {
		return sidx;
	}

	public void setSidx(String sidx) {
		this.sidx = sidx;
	}
}
