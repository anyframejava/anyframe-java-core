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
package org.anyframe.sample.cxf.rest;

import org.anyframe.sample.cxf.rest.server.Server;

/**
 * ServerRunner<br> 
 * <br>
 * [Description] : Through setter/getter method on Server, ServerRuner determines kinds of Web Services functions
 *                 and Server. At the same time, in the case of calling for setUp and tearDown, function to start or stop
 *                 Server is provided. 
 *                  
 * [tip.] After stopping Server, it needs time break to execute the next test. Therefore, Thread.sleep(5*1000) statements 
 *        are added. 
 *        
 * <br>
 * @author SooYeon Park
 */
public class ServerRunner {

    private Server server = null;

    public void setServer(Server server) {
        this.server = server;
    }

    public Server getServer() {
        return server;
    }

    public void setUp() throws Exception {
        server.start();
    }

    public void tearDown() throws Exception {
        server.stop();
        Thread.sleep(5 * 1000);
    }
}
