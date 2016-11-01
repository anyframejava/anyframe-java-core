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
package org.anyframe.plugin.interceptor;

import java.io.File;

import org.anyframe.ide.command.common.CommandException;
import org.anyframe.ide.command.common.util.CommonConstants;
import org.anyframe.ide.command.common.util.PropertiesIO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MybatisPluginInterceptor {
	protected final Logger log = LoggerFactory.getLogger(getClass());

	public void postUninstall(String baseDir, File pluginJarFile)
			throws Exception {
		try {
			File metadataFile = new File(new File(baseDir)
					+ CommonConstants.METAINF, CommonConstants.METADATA_FILE);

			if (!metadataFile.exists()) {
				throw new CommandException("Can not find a '"
						+ metadataFile.getAbsolutePath()
						+ "' file. Please check a location of your project.");
			}

			PropertiesIO pio = new PropertiesIO(metadataFile.getAbsolutePath());

			if (pio.readValue(CommonConstants.APP_DAOFRAMEWORK_TYPE).equals(
					CommonConstants.DAO_MYBATIS)) {
				pio.setProperty(CommonConstants.APP_DAOFRAMEWORK_TYPE,
						CommonConstants.DAO_SPRINGJDBC);
				pio.write();
			}
		} catch (Exception e) {
			log
					.warn(
							"Error occurred in postUninstall HibernatePluginInterceptor. The reason is a '{}.'",
							e.getMessage());
		}
	}
}
