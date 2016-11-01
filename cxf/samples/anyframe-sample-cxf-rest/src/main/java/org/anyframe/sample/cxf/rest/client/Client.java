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
package org.anyframe.sample.cxf.rest.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * When you use Apache CXF framework to implement web
 * services, you can use two kinds of frontend
 * model(Simple frontend, JAX-WS frontend).
 * anyframe.core.remoting.webservices.client.SimpleClient
 * class is a simple frontend client and
 * anyframe.core.remoting.webservices.client.JaxWsClient
 * class is a JAX-WS frontend client. Those client
 * classes should implement this Client interface
 * class. You can get a ProxyFactory instance to invoke
 * remote web service methods using a getClient method
 * consistently.
 * 
 * @author SooYeon Park
 */
public interface Client {

    /**
     * Logger for Client
     */
    Logger LOGGER = LoggerFactory.getLogger(Client.class.getName());

    /**
     * get ProxyFactoryBean instance with Client
     * information and the return value should be
     * typecast as a service interface class(SEI)
     * @param clientInfo
     *        information to invoke remote web service
     *        methods, it has interface class, access
     *        address url, Aegis binding usage, MTOM
     *        binding usage information
     * @return Object a client instance which is
     *         created by ProxyFactoryBean, the type of
     *         inside object is SEI(Service Endpoint
     *         Interface)
     */
    public Object getClient(ClientInfo clientInfo);
}
