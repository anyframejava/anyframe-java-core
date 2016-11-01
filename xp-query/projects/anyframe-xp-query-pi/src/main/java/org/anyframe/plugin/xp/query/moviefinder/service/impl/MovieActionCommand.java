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
package org.anyframe.plugin.xp.query.moviefinder.service.impl;

import org.anyframe.xp.query.XPActionCommand;

import com.tobesoft.xplatform.data.DataSet;

/**
 * Example Action Command Class for Movie Service 
 * 
 * @author Youngmin Jo
 */
public class MovieActionCommand implements XPActionCommand {

	public void postDelete(DataSet dataSet, int currentRow) {

	}

	public void postInsert(DataSet dataSet, int currentRow) {

	}

	public void postUpdate(DataSet dataSet, int currentRow) {

	}

	public void preDelete(DataSet dataSet, int currentRow) {

	}

	public void preInsert(DataSet dataSet, int currentRow) {
		String id = "MV-" + System.currentTimeMillis();
		dataSet.set(currentRow, "MOVIE_ID", id);
	}

	public void preUpdate(DataSet dataSet, int currentRow) {

	}

}
