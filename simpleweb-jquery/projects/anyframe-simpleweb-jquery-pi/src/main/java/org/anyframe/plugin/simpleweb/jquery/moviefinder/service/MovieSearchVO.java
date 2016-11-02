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
package org.anyframe.plugin.simpleweb.jquery.moviefinder.service;

import org.anyframe.datatype.SearchVO;

public class MovieSearchVO extends SearchVO {

    private static final long serialVersionUID = 1L;

    private String nowPlayingCondition = "Y"; 
    
    private String sidx;
    
    private String sord;
    
	public String getSidx() {
		return sidx;
	}

	public void setSidx(String sidx) {
		this.sidx = sidx;
	}

	public String getSord() {
		return sord;
	}

	public void setSord(String sord) {
		this.sord = sord;
	}

	public String getNowPlayingCondition() {
		return nowPlayingCondition;
	}
	
	public void setNowPlayingCondition(String nowPlayingCondition) {
		this.nowPlayingCondition = nowPlayingCondition;
	}

}
