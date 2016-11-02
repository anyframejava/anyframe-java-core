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

import org.anyframe.sample.cxf.rest.client.ClientInfo;

/**
 * ServerInfo extends ClientInfo because server and
 * client side has duplication of information. There
 * are additional information to start Server and it
 * depends on which server you use.
 * 
 * @author SooYeon Park
 */
public class ServerInfo extends ClientInfo {

    private Object impleClass = null;

    private int port = -1;

    private String warpath = null;

    private String bindingId = null;

    private boolean isWrapped = true;

    // default constructor
    public ServerInfo() {
        super();
    }

    public ServerInfo(Class<?> interfaceClass, Object impleClass, String address) {
        super(interfaceClass, address);
        this.setImpleClass(impleClass);
    }

    public ServerInfo(Class<?> interfaceClass, Object impleClass, String address,
            boolean useAegisBinding) {
        super(interfaceClass, address, useAegisBinding);
        this.setImpleClass(impleClass);
    }

    public ServerInfo(Class<?> interfaceClass, Object impleClass, String address,
            boolean useAegisBinding, boolean useMTOMBinding) {
        super(interfaceClass, address, useAegisBinding, useMTOMBinding);
        this.setImpleClass(impleClass);
    }

    public Object getImpleClass() {
        return impleClass;
    }

    public void setImpleClass(Object impleClass) {
        this.impleClass = impleClass;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getWarpath() {
        return warpath;
    }

    public void setWarpath(String warpath) {
        this.warpath = warpath;
    }

    public String getBindingId() {
        return bindingId;
    }

    public void setBindingId(String bindingId) {
        this.bindingId = bindingId;
    }

    public boolean isWrapped() {
        return isWrapped;
    }

    public void setWrapped(boolean isWrapped) {
        this.isWrapped = isWrapped;
    }
}
