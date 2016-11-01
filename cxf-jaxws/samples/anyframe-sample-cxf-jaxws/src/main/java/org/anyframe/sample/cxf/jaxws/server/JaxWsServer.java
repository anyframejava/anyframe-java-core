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
package org.anyframe.sample.cxf.jaxws.server;

import java.util.HashMap;
import java.util.Map;

import org.apache.cxf.aegis.databinding.AegisDatabinding;
import org.apache.cxf.jaxws.JaxWsServerFactoryBean;
import org.apache.cxf.message.Message;

/**
 * JaxWsServer makes server implementation simplified
 * using a JAX-WS frontend APIs which are supported by
 * Apache CXF framework. You can set server information
 * and start/stop server consistently.
 * 
 * @author SooYeon Park
 */
public class JaxWsServer implements Server {

    private JaxWsServerFactoryBean svrFactory = null;

    public JaxWsServer() {
        svrFactory = new JaxWsServerFactoryBean();
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
            props.put(Message.MTOM_ENABLED, "true");
            svrFactory.setProperties(props);
        }
        if (serverInfo.getBindingId() != null) {
            // Use the HTTP Binding which understands
            // the Java Rest Annotations
            svrFactory.setBindingId(serverInfo.getBindingId());
        }
        svrFactory.getServiceFactory().setWrapped(serverInfo.isWrapped());
    }

    public void start() throws Exception {
        svrFactory.create();
    }

    public void stop() throws Exception {
        svrFactory.getBus().shutdown(true);
    }

    public JaxWsServerFactoryBean getSvrFactory() {
        return svrFactory;
    }
}
