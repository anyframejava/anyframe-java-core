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
package org.anyframe.remoting.webservices.client;

import java.util.HashMap;
import java.util.Map;

import org.apache.cxf.aegis.databinding.AegisDatabinding;
import org.apache.cxf.frontend.ClientProxyFactoryBean;
import org.apache.cxf.message.Message;

/**
 * SimpleClient makes client implementation simplified
 * using a Simple frontend APIs which are supported by
 * Apache CXF framework. You can get a
 * ClientProxyFactory instance to invoke remote web
 * service methods using a getClient method
 * consistently.
 * 
 * @author SooYeon Park
 */
public class SimpleClient implements Client {

    ClientProxyFactoryBean factory = null;

    public SimpleClient() {
        factory = new ClientProxyFactoryBean();
    }

    public Object getClient(ClientInfo clientInfo) {
        factory.setServiceClass(clientInfo.getInterfaceClass());
        factory.setAddress(clientInfo.getAddress());
        if (clientInfo.isUseAegisBinding())
            factory.getServiceFactory().setDataBinding(new AegisDatabinding());
        if (clientInfo.isUseMTOMBinding()) {
            Map<String, Object> props = new HashMap<String, Object>();
            props.put("mtom-enabled", Boolean.TRUE); // Boolean.TRUE or "true" will work as the property value here
            factory.setProperties(props);
        }
        return factory.create();
    }
}
