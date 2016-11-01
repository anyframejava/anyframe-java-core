/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.remoting.webservices.server;

import java.util.HashMap;
import java.util.Map;

import org.apache.cxf.aegis.databinding.AegisDatabinding;
import org.apache.cxf.frontend.ServerFactoryBean;

/**
 * SimpleServer makes server implementation simplified
 * using a Simple frontend APIs which are supported by
 * Apache CXF framework. You can set server information
 * and start/stop server consistently.
 * 
 * @author SooYeon Park
 */
public class SimpleServer implements Server {

    ServerFactoryBean svrFactory = null;

    public SimpleServer() {
        svrFactory = new ServerFactoryBean();
    }

    public void setServerInfo(ServerInfo serverInfo) {
        svrFactory.setServiceClass(serverInfo.getInterfaceClass());
        svrFactory.setAddress(serverInfo.getAddress());
        svrFactory.setServiceBean(serverInfo.getImpleClass());
        if (serverInfo.isUseAegisBinding())
            svrFactory.getServiceFactory().setDataBinding(
                new AegisDatabinding());
        if (serverInfo.isUseMTOMBinding()) {
            Map<String, Object> props = new HashMap<String, Object>();
            props.put("mtom-enabled", Boolean.TRUE); // Boolean.TRUE or "true" will work as the property value here
            svrFactory.setProperties(props);
        }        
    }

    public void start() throws Exception {
        svrFactory.create();
        Server.LOGGER.info("Server ready...");
    }

    public void stop() throws Exception {
        svrFactory.getBus().shutdown(true);
    }

}
