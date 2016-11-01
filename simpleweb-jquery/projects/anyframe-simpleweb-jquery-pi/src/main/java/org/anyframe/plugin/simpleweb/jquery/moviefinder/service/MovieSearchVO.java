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
