package org.anyframe.logback.appender.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.joran.JoranConfigurator;
import ch.qos.logback.core.joran.spi.JoranException;

/**
 * This class is a util class to use sample project
 * @author Sunghoon Son
 */

public class LogbackUtil {
	
	static Logger logger = LoggerFactory.getLogger(LogbackUtil.class);

	public static void configureLC(LoggerContext lc, String configFile){
		try{
			JoranConfigurator configurator = new JoranConfigurator();
			lc.reset();
			configurator.setContext(lc);
			configurator.doConfigure(configFile);
		}catch(JoranException je){
			logger.error("configuration error" + je.getCause());
			throw new RuntimeException("config Error");
		}
	}
}
