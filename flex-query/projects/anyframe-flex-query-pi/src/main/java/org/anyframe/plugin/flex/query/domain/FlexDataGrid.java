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
package org.anyframe.plugin.flex.query.domain;


/**
 * 
 * @author Jonghoon, Kim 
 * 
 */
public class FlexDataGrid{

	final public static int NORMAL_ROW = 0;
	final public static int INSERT_ROW = 1;
	final public static int UPDATE_ROW = 2;
	final public static int DELETE_ROW = 3;
	
	protected int status = FlexDataGrid.NORMAL_ROW;

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
}
