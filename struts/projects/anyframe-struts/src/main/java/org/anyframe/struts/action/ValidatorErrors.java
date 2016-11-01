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

import java.util.ArrayList;
import java.util.Iterator;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionMessage;
/**
 * 
 * <p>The ValidatorError class which provides a method which gets validation Error Messages when execute initValidator method in org.apache.commons.validator.Validator class.</p>
 * 
 * @author Byunghun Woo
 */
public class ValidatorErrors extends ActionErrors {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5602567750898858524L;

	/**
	 * This method which returns a validation check value.
	 */
	public boolean isValid(){
		if (this.isEmpty()) {
			return (true);
		}
		return (false);
	}
	
	/**
	 * This method which returns validation error message which is error filed, input value etc.
	 * @return
	 * 		validation error message
	 */
	@SuppressWarnings("unchecked")
	public String getErrorMessage(){
		Iterator it = this.properties();
		ArrayList fileIdList = new ArrayList();
		
		while( it.hasNext() ){
			fileIdList.add(it.next());
		}
		
		StringBuilder sb = new StringBuilder();
		for( int i = 0 ; i < fileIdList.size() ; i ++ ){
			Iterator msgIt = this.get(fileIdList.get(i).toString());
			sb.append("fieldId : " + fileIdList.get(i) +"\n");
			while(msgIt.hasNext()){
				ActionMessage actionMessage = (ActionMessage) msgIt.next();
				String key = actionMessage.getKey();
				Object[] values = actionMessage.getValues();
				sb.append("message  : " + key + "\n");
				for(int j = 0 ; j < values.length ; j ++ ){
					sb.append("input value  : " + values[j] + "\n");
				}
			}
			sb.append("\n");
		}
		return sb.toString();
	}
	
	public void checkValidation() throws Exception{
		if ( this.isValid() == false ){
			throw new Exception(this.getErrorMessage());
		}
	}
	
}
