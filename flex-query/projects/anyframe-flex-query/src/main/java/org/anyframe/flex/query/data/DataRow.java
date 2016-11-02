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
package org.anyframe.flex.query.data;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.util.Map;

import flex.messaging.io.ObjectProxy;

public class DataRow extends ObjectProxy implements Externalizable {

	public String rowType;

	public DataRow() {
	}

	@SuppressWarnings("unchecked")
	public DataRow(Map map) {
		this.putAll(map);
	}

	public DataRow(int initialCapacity) {
		super(initialCapacity); 
	}

	public DataRow(int initialCapacity, float loadFactor) {
		super(initialCapacity, loadFactor);
	}

	public void readExternal(ObjectInput in) throws IOException,
			ClassNotFoundException {
		this.rowType = (String) in.readObject();
		super.readExternal(in);
	}

	public void writeExternal(ObjectOutput out) throws IOException {
		out.writeObject(this.rowType);
		super.writeExternal(out);
	}
}
