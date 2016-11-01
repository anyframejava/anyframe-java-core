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
package org.anyframe.struts.action;

import org.apache.struts.action.ActionMapping;

/**
 * Class expending the org.apache.struts.action.ActionMapping.
 * Provides the method for using the syncronized token.
 * @author Byunghun Woo
 */
public class DefaultActionMapping extends ActionMapping {

	private static final long serialVersionUID = -5738255434044889667L;

	private String autho;

    /**
     * Get authorization list to invoke given URL.
     * @return authorization list to invoke given URL.
     */
    public String getAutho() {
        return this.autho;
    }

    /**
     * Set authorization list to invoke given URL.
     * @param autho authorization list to invoke given URL.
     */
    public void setAutho(String autho) {
        this.autho = autho;
    }

    boolean validateToken = false;

    boolean resetToken = false;

    boolean saveToken = false;

    /**
     * Constructor
     */
    public DefaultActionMapping() {

        super();
        setScope("request");

    }

    /**
     * Get "reset token" configuration
     * @return "reset token" configuration
     */
    public boolean isResetToken() {
        return resetToken;
    }

    /**
     * Get "validate token" configuration
     * @return "validate token" configuration
     */
    public boolean isValidateToken() {
        return validateToken;
    }

    /**
     * "reset token" configuration
     * @param b isResetToken
     */
    public void setResetToken(boolean b) {
        resetToken = b;
    }

    /**
     * "validate token" configuration
     * @param b isValidateToken
     */
    public void setValidateToken(boolean b) {
        validateToken = b;
    }

    /**
     * Get "save token" configuration
     * @return "save token" configuration
     */
    public boolean isSaveToken() {
        return saveToken;
    }

    /**
     * "save token" configuration
     * @param b isSaveToken
     */
    public void setSaveToken(boolean b) {
        saveToken = b;
    }

}