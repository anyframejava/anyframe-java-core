/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.sample.cxf.rest.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * When you use Apache CXF framework to implement web services, you can use two 
 * kinds of frontend model(Simple frontend, JAX-WS frontend).
 * anyframe.core.remoting.webservices.server.SimpleServer class is a simple frontend server and
 * anyframe.core.remoting.webservices.server.JaxWsServer class is a JAX-WS frontend server.
 * 
 * In addition to above server classes, you can use JettyServer and JaxRsServer if you need.
 * Those server classes should implement this Server interface class.
 * 
 * You can start and stop servers consistently.  
 * 
 * @author SooYeon Park
 */
public interface Server {
	
	Logger LOGGER = LoggerFactory.getLogger(Server.class.getName());
	
	public void setServerInfo(ServerInfo serverInfo);
	
	public void start() throws Exception;
	
	public void stop() throws Exception;

}
