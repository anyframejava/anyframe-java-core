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
package org.anyframe.sample.cxf.jaxrs;

import org.anyframe.sample.cxf.jaxrs.server.Server;

/**
 * ServerRunner<br> 
 * <br>
 * [Description] : Setter/getter method on Server will determine the kind of Server, 
 *                 thereby deciding which function of Web Services will be provided. 
 *                 At the same time, when setup, teardown method is called for, 
 *                 another function which allows Server to start or stop is provided. 
 *                  
 * [tip.] After Server is stopped, it takes a little time term before starting for the next test. 
 *        Therefore, Thread.sleep(5 * 1000); statement was added. 
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
