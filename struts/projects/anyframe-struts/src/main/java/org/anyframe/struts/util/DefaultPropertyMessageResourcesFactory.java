/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.struts.util;

import org.apache.struts.util.MessageResources;
import org.apache.struts.util.PropertyMessageResourcesFactory;

/**
 * 
 * Factory for <code>PropertyMessageResources</code> instances.  The
 * configuration paramter for such instances is the base Java package name of
 * the resources entries from which our keys and values will be loaded.
 * 
 * @author Byunghun Woo
 * 
 */
public class DefaultPropertyMessageResourcesFactory extends
        PropertyMessageResourcesFactory {
    // --------------------------------------------------------- Public Methods

    /**
	 * 
	 */
	private static final long serialVersionUID = 20074909678204911L;

	/**
     * Create and return a newly instansiated <code>MessageResources</code>.
     * This method must be implemented by concrete subclasses.
     * 
     * @param config
     *            Configuration parameter(s) for the requested bundle
     */
    public MessageResources createResources(String config) {
        return new DefaultPropertyMessageResources(this, config, this.returnNull);

    }
}
