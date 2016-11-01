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
package com.anyframe.sample.websocket.handler;

import java.io.StringWriter;

import org.anyframe.pagination.Page;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.anyframe.sample.core.domain.Movie;
import com.anyframe.sample.core.moviefinder.service.MovieFinder;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *  This MovieFinderWebSocketHandler class is a WebSocket Hander for Movie List
 *  
 * @author Seongjong Yoon
 */
public class MovieFinderWebSocketHandler extends TextWebSocketHandler {
	private static Logger log = LoggerFactory.getLogger(MovieFinderWebSocketHandler.class);
	
	@Autowired
	private MovieFinder movieFinder;
	
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String payloadMessage = (String) message.getPayload();
        
        log.debug("input message : {}", payloadMessage);
        
        try {
	        ObjectMapper mapper = new ObjectMapper();
	        Movie movie = mapper.readValue(payloadMessage, Movie.class);
        
	        int pageIndex = 1;
	        
	        Page page = movieFinder.getPagingList(movie, pageIndex);
	
	        StringWriter movieList = new StringWriter();
	        mapper.writeValue(movieList, page);
	        
	        log.info(movieList.toString());
	        session.sendMessage(new TextMessage(movieList.toString()));
        
        } catch (JsonParseException jpe) {
        	jpe.printStackTrace();
        } catch (JsonMappingException jme) {
        	jme.printStackTrace();
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        log.debug("after Connection Established");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        log.debug("after Connection Closed");
    }
}
