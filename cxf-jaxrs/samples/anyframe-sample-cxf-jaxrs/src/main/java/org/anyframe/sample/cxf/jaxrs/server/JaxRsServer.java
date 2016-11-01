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
package org.anyframe.sample.cxf.jaxrs.server;

import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
import org.apache.cxf.jaxrs.lifecycle.SingletonResourceProvider;

/**
 * JaxRsServer makes server implementation simplified
 * when you implement RESTful web services using a
 * JAX-RS APIs which are supported by Apache CXF
 * framework. You can set server information and
 * start/stop server consistently.
 * 
 * @author SooYeon Park
 */
public class JaxRsServer implements Server {

    private JAXRSServerFactoryBean svrFactory = null;

    public JaxRsServer() {
        svrFactory = new JAXRSServerFactoryBean();
    }

    public void setServerInfo(ServerInfo serverInfo) {
        svrFactory.setResourceClasses(serverInfo.getInterfaceClass());
        svrFactory.setResourceProvider(serverInfo.getInterfaceClass(),
            new SingletonResourceProvider(serverInfo.getImpleClass()));
        svrFactory.setAddress(serverInfo.getAddress());
    }

    public void start() throws Exception {
        svrFactory.create();
    }

    public void stop() throws Exception {
        svrFactory.getBus().shutdown(true);
    }
}
