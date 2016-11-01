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
package org.anyframe.jdbc.support.impl;

import org.anyframe.jdbc.support.CompleteQueryPostProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Default Implementation of CompleteQueryPostProcessor
 * 
 * @author Byunghun Woo
 * 
 */
public class DefaultCompleteQueryPostProcessor implements CompleteQueryPostProcessor {

	/**
	 * Logger with CompleteQueryPostProcessor.class
	 */
	protected static Logger log = LoggerFactory.getLogger(CompleteQueryPostProcessor.class);
	
	/**
	 * default implementation of processing function for Complete Query - just
	 * log Complete Query with commons logging INFO Level
	 */
	public void processCompleteQuery(String sql) {
		log.info(sql);
	}

}
