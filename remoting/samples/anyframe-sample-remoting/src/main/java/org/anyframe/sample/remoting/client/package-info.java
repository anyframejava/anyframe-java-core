/*
 * Copyright 2002-2012 the original author or authors.
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
 * @since 3.1.0
 */
package org.anyframe.sample.remoting.client;

