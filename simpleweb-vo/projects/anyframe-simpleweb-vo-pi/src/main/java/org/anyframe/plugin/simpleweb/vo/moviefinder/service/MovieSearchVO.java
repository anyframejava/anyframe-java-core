package org.anyframe.plugin.simpleweb.vo.moviefinder.service;

import org.anyframe.datatype.SearchVO;

public class MovieSearchVO extends SearchVO {

    private static final long serialVersionUID = 1L;

    private String nowPlayingCondition = "Y";
    
    public String getNowPlayingCondition() {   
        return this.nowPlayingCondition;
   }

	public void setNowPlayingCondition(String nowPlaying) {
		this.nowPlayingCondition = nowPlaying;
	}

}
