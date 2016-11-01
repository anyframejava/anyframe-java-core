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

import org.apache.struts.action.ActionForm;


/**
 * The class expanding the org.apache.struts.action.ActionForm.
 * <p>Provides the method for the basic validation check.</p>
 * <ul>
 * <li>checkInvalidChar : Checks whether it contains a special characters</li>
 * <li>checkMaxLength : Check for the length of the characters</li>
 * <li>checkRequired : Checks whether the required item is null.</li>
 * </ul>
 * 
 * @author Byunghun Woo
 */
public class DefaultForm extends ActionForm {

    /**
	 * 
	 */
	private static final long serialVersionUID = -792877494000323446L;

	/**
     * return false when string contains invalid characters return true when
     * string do not contains invalid characters
     * 
     * @param string
     * @param invalidCharactors
     * @return validation result
     */
    protected boolean checkInvalidChar(String string, String[] invalidCharactors) {
        if (invalidCharactors == null)
            return true;

        for (int i = 0; i < invalidCharactors.length; i++) {
            if (string.indexOf(invalidCharactors[i]) >= 0)
                return false;
        }
        return true;
    }

    /**
     * return false when string > max return true when string <= max
     * 
     * @param str
     * @param max
     * @return validation result
     */
    protected boolean checkMaxLength(String str, int max) {
        return !(str != null && str.getBytes().length > max);
    }

	/**
	 * return false when string <min or string>max return true when min <=
	 * string <= max
	 * 
	 * @param str
	 * @param max
	 * @return validation result
	 */
    protected boolean checkLength(String str, int min, int max) {
        if (min > 0 && str == null)
            return false;

        else if (str == null)
            str = "";

        if (str.trim().getBytes().length < min)
            return false;

        if (str.trim().getBytes().length > max)
            return false;

        return true;
    }

	/**
	 * return false when obj is null or obj.length=0
	 * 
	 * @param obj
	 * @return validation result
	 */
    protected boolean checkRequired(Object obj) {
        boolean ret = false;
        if (obj == null)
            return false;
        if (obj instanceof String)
            ret = ((String) obj).trim().length() == 0 ? false : true;
        return ret;
    }

}