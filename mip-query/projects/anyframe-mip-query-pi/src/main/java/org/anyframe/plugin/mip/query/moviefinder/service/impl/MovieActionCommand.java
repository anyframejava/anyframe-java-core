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
package org.anyframe.plugin.mip.query.moviefinder.service.impl;

import org.anyframe.mip.query.MiPActionCommand;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.Variant;

/**
 * This MovieActionCommand class is to execute command before or after crud
 * functionality.
 * 
 * @author Jonghoon Kim
 */
public class MovieActionCommand implements MiPActionCommand {

	public void postDelete(Dataset arg0, int arg1) {

	}

	public void postInsert(Dataset arg0, int arg1) {

	}

	public void postUpdate(Dataset arg0, int arg1) {

	}

	public void preDelete(Dataset arg0, int arg1) {

	}

	public void preInsert(Dataset ds, int index) {
			String id = "MV-" + System.currentTimeMillis();
			Variant variant = new Variant();
			variant.setObject(id);
			ds.setColumn(index, "MOVIE_ID", variant);
	}

	public void preUpdate(Dataset arg0, int arg1) {

	}

}
