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


import java.util.Locale;

import org.apache.struts.util.MessageResourcesFactory;
import org.apache.struts.util.PropertyMessageResources;

/**
 * Concrete subclass of <code>MessageResources</code> that reads message keys
 * and corresponding strings from named property resources in the same manner
 * that <code>java.util.PropertyResourceBundle</code> does.  The
 * <code>base</code> property defines the base property resource name, and
 * must be specified. <p> <strong>IMPLEMENTATION NOTE</strong> - This class
 * trades memory for speed by caching all messages located via generalizing
 * the Locale under the original locale as well. This results in specific
 * messages being stored in the message cache more than once, but improves
 * response time on subsequent requests for the same locale + key
 * combination.
 * 
 * @author Byunghun Woo
 * 
 */
public class DefaultPropertyMessageResources extends PropertyMessageResources {

	private static final long serialVersionUID = -5894367387957158761L;
	private String charset = null;

    /**
     * Construct a new PropertyMessageResources according to the specified
     * parameters.
     * 
     * @param factory
     *            The MessageResourcesFactory that created us
     * @param config
     *            The configuration parameter for this MessageResources
     * @param returnNull
     *            The returnNull property we should initialize with
     */
    public DefaultPropertyMessageResources(MessageResourcesFactory factory,
            String config, boolean returnNull) {
        super(factory, config, returnNull);
        log.info("Initializing, config='" + config + "', returnNull="
                + returnNull);

    }

    // --------------------------------------------------------- Public Methods

    /**
     * Returns a text message for the specified key, for the default Locale. A
     * null string result will be returned by this method if no relevant message
     * resource is found for this key or Locale, if the <code>returnNull</code>
     * property is set. Otherwise, an appropriate error message will be
     * returned.
     * <p>
     * This method must be implemented by a concrete subclass.
     * 
     * @param locale
     *            The requested message Locale, or <code>null</code> for the
     *            system default Locale
     * @param key
     *            The message key to look up
     * @return text message for the specified key and locale
     */
    public String getMessage(Locale locale, String key) {

        String message = super.getMessage(locale, key);
        // CharacterEnconding default charset = "euc-kr";
        if (charset == null)
            charset = "euc-kr";

        try {
            return new String(message.getBytes("8859_1"), charset);
        } catch (Exception e) {
            return message;
        }

    }

    /**
     * @return String Charset
     */
    public String getCharset() {
        return charset;
    }

    /**
     * @param string
     */
    public void setCharset(String string) {
        charset = string;
    }

}
