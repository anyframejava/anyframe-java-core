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
package org.anyframe.util.file;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Utility helper class to link file.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public abstract class LinkFileHelper {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(LinkFileHelper.class);

	public static interface LinkLineItemHandler {
		public boolean processItem(String itemString);
	} 

	public static void processingLinkDirectory(File linkFile,
			LinkLineItemHandler handler) {
		BufferedReader reader = null;
		String path = null;
		try {
			if (!linkFile.exists())
				return;
			reader = new BufferedReader(new FileReader(linkFile));
			while ((path = reader.readLine()) != null) {
				if (handler.processItem(path))
					break;
			}
		} catch (Exception e) {
			LOGGER.error("I/O Error occurs. Error : {}", new Object[] { e
					.getMessage() });

			return;
		} finally {
			if (reader != null)
				try {
					reader.close();
				} catch (Exception e) {
					LOGGER.warn("I/O Error occurs. Error : {}", new Object[] { e
							.getMessage() });
				}
		}
	}
}
