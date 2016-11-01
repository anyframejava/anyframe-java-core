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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class DataSet extends ArrayList implements Externalizable {
	public String dataSetName = "";
	public String selectQueryId = "";
	public String insertQueryId = "";
	public String updateQueryId = "";
	public String deleteQueryId = "";
	public int currentPage;
	public int totalCount;
	public int pageunit = 10;
	public int pagesize = 10;
	public int maxPage;
	public int beginUnitPage;
	public int endUnitPage;

	public DataSet() {
	}

	public DataSet(List ar) {
		for (int i = 0; i < ar.size(); i++) {
			if (ar.get(i) instanceof Map) {
				DataRow dr = new DataRow((Map) ar.get(i));
				this.add(dr);
			}
		}
	}

	public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {

		this.dataSetName = (String) in.readObject();

		this.selectQueryId = (String) in.readObject();
		this.insertQueryId = (String) in.readObject();
		this.updateQueryId = (String) in.readObject();
		this.deleteQueryId = (String) in.readObject();
		this.currentPage = (Integer) in.readObject();
		this.totalCount = (Integer) in.readObject();
		this.pageunit = (Integer) in.readObject();
		this.pagesize = (Integer) in.readObject();
		this.maxPage = (Integer) in.readObject();
		this.beginUnitPage = (Integer) in.readObject();
		this.endUnitPage = (Integer) in.readObject();

		Object value = in.readObject();
		if (value instanceof List) {
			addAll((List) value);
		}
	}

	public void writeExternal(ObjectOutput out) throws IOException {

		out.writeObject(this.dataSetName);

		out.writeObject(this.selectQueryId);
		out.writeObject(this.insertQueryId);
		out.writeObject(this.updateQueryId);
		out.writeObject(this.deleteQueryId);
		out.writeObject(this.currentPage);
		out.writeObject(this.totalCount);
		out.writeObject(this.pageunit);
		out.writeObject(this.pagesize);
		out.writeObject(this.maxPage);
		out.writeObject(this.beginUnitPage);
		out.writeObject(this.endUnitPage);

		List value = new ArrayList();
		value.addAll(this.subList(0, this.size()));
		out.writeObject(value);
	}
}
