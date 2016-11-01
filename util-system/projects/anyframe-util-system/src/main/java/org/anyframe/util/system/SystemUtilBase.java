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
package org.anyframe.util.system;

import java.io.IOException;

import org.anyframe.exception.BaseRuntimeException;
import org.hyperic.sigar.SigarException;

/**
 * It is Base class of SystemUtil and executes IO processing type function
 * through IO Callback. When Exception occurs, it is re-processed as
 * RuntimeException.
 * 
 * @author ByungHun Woo
 *
 */
public class SystemUtilBase {

	/**
	 * Separate parameter returned as String Array with space (" ") to make form 
	 * it into one String, and return.
	 *
	 * @param arr array of string
	 * @return concatenated string
	 */
	public static String concatStrArray(String[] arr) {
		StringBuilder sb = new StringBuilder();
		for (String tmp : arr) {
			sb.append(tmp);
			sb.append(" ");
		}
		return sb.toString().trim();
	}

	/**
	 * It is template method which executes callback handling function that is IO type.
	 * @param <T>
	 * @param action IOCallback<T>
	 * @return <T>
	 */
	public static <T> T processIO(IOCallback<T> action) {
		try {
			return action.doInProcessIO();
		}
		catch (IOException e) {
			throw new BaseRuntimeException("processIO IOException occured : " + e.getMessage(), e);
		}
		catch (SigarException se) {
			throw new BaseRuntimeException("SigarException occured : " + se.getMessage(), se);
		}
		catch (Exception e) {
			throw new BaseRuntimeException("processIO Exception occured : " + e.getMessage(), e);
		}
	}

	/**
	 * IO callback interface
	 * @author woos41
	 *
	 * @param <T>
	 */
	public interface IOCallback<T> {
		public T doInProcessIO() throws IOException, SigarException, Exception;
	}

}
