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
package org.anyframe.plugin.stomp.web;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.core.domain.Movie;
import org.anyframe.plugin.core.moviefinder.service.MovieFinder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * This MovieFinderStompController class is a Movie List Controller through Stomp over WebSocket
 * 
 * @author Seongjong Yoon
 */
@Controller
public class MovieFinderStompController {
	private static Logger log = LoggerFactory.getLogger(MovieFinderStompController.class);
	
	@Autowired
	private MovieFinder movieFinder;
	
	@MessageMapping(value="/list")
    @SendTo("/topic/movieList")
    public Page list(Movie movie) throws Exception {
		log.debug("title : {}, nowPlaying : {}", movie.getTitle(), movie.getNowPlaying());
		
        int pageIndex = 1;
        
        Page page = movieFinder.getPagingList(movie, pageIndex);
		
        log.debug("The result will display after three seconds.!!");
        Thread.sleep(3000);
        
        return page;
    }

}
