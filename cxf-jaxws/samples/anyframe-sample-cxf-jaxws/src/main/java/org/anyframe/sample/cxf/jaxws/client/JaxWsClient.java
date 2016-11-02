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
package org.anyframe.sample.cxf.jaxws.client;

import java.util.HashMap;
import java.util.Map;

import org.apache.cxf.aegis.databinding.AegisDatabinding;
import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.apache.cxf.message.Message;

/**
 * JaxWsClient makes client implementation simplified
 * using a JAX-WS frontend APIs which are supported by
 * Apache CXF framework. You can get a
 * JaxWsProxyFactory instance to invoke remote web
 * service methods using a getClient method
 * consistently.
 * 
 * @author SooYeon Park
 */
public class JaxWsClient implements Client {

    JaxWsProxyFactoryBean factory = null;

    public JaxWsClient() {
        factory = new JaxWsProxyFactoryBean();
    }

    public Object getClient(ClientInfo clientInfo) {
        factory.setServiceClass(clientInfo.getInterfaceClass());
        factory.setAddress(clientInfo.getAddress());
        if (clientInfo.isUseAegisBinding())
            factory.getServiceFactory().setDataBinding(new AegisDatabinding());
        if (clientInfo.isUseMTOMBinding()) {
            Map<String, Object> props = new HashMap<String, Object>();
            props.put(Message.MTOM_ENABLED, "true");
            factory.setProperties(props);
        }
        return factory.create();
    }
}
