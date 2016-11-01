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

/**
 * ClientInfo has the information that can be used to
 * access web service methods.
 * 
 * @author SooYeon Park
 */
public class ClientInfo {

    /**
     * service interface class(SEI, Service Endpoint
     * Interface).
     */
    private Class<?> interfaceClass = null;
    /** access address url. */
    private String address = "";
    /** AegisBinding usage. */
    private boolean useAegisBinding = false;
    /** MTOMBinding usage. */
    private boolean useMTOMBinding = false;

    // default constructor
    public ClientInfo() {
    }

    public ClientInfo(Class<?> interfaceClass, String address) {
        this.setInterfaceClass(interfaceClass);
        this.setAddress(address);
    }

    public ClientInfo(Class<?> interfaceClass, String address,
            boolean useAegisBinding) {
        this.setInterfaceClass(interfaceClass);
        this.setAddress(address);
        this.setUseAegisBinding(useAegisBinding);
    }

    public ClientInfo(Class<?> interfaceClass, String address,
            boolean useAegisBinding, boolean useMTOMBinding) {
        this.setInterfaceClass(interfaceClass);
        this.setAddress(address);
        this.setUseAegisBinding(useAegisBinding);
        this.setUseMTOMBinding(useMTOMBinding);
    }

    public Class<?> getInterfaceClass() {
        return interfaceClass;
    }

    public void setInterfaceClass(Class<?> interfaceClass) {
        this.interfaceClass = interfaceClass;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isUseAegisBinding() {
        return useAegisBinding;
    }

    public void setUseAegisBinding(boolean useAegisBinding) {
        this.useAegisBinding = useAegisBinding;
    }

    public boolean isUseMTOMBinding() {
        return useMTOMBinding;
    }

    public void setUseMTOMBinding(boolean useMTOMBinding) {
        this.useMTOMBinding = useMTOMBinding;
    }

}
