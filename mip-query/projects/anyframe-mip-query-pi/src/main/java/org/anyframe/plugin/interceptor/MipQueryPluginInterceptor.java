package org.anyframe.plugin.interceptor;

import java.io.File;

import org.anyframe.ide.command.common.CommandException;
import org.anyframe.ide.command.common.util.CommonConstants;
import org.anyframe.ide.command.common.util.PropertiesIO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class MipQueryPluginInterceptor {
	protected final Log log = LogFactory.getLog(getClass());

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

			pio.setProperty(CommonConstants.APP_TEMPLATE_TYPE, "default");
			pio.write();
		} catch (Exception e) {
			log
					.warn("Error occurred in postUninstall MiplatformPluginInterceptor. The reason is a '"
							+ e.getMessage() + "'.");
		}
	}
}
