/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.monitoring.client;

import net.sf.infrared.agent.MonitorConfig;
import net.sf.infrared.agent.MonitorConfigImpl;
import net.sf.infrared.agent.MonitorFacade;
import net.sf.infrared.agent.MonitorFacadeImpl;
import net.sf.infrared.agent.MultipleEntryGuard;
import net.sf.infrared.agent.util.AgentHelper;
import net.sf.infrared.base.util.LoggingFactory;
import net.sf.infrared.org.apache.log4j.Logger;

import org.springframework.beans.factory.FactoryBean;

/**
 * Infrared monitor factory class that supports to modify the application name 
 *
 *@author ChangeJe Kim
 *@author modified by SooYeon Park
 */
public class InfraredMonitorFactory implements FactoryBean {
    private String applicationName;
    private String DEFAULT_CONFIG_LOCATION = "infrared-agent.properties";
    private final static Logger LOGGER = LoggingFactory.getLogger(InfraredMonitorFactory.class);

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public Object getObject() throws Exception {
        MonitorFacade defaultFacade = null;

        try {
            AgentHelper helper = new AgentHelper();
            String hostName = helper.getLocalHostName();
            MonitorConfig defaultConfig =
                new MonitorConfigImpl(DEFAULT_CONFIG_LOCATION);

            MonitorFacade facade =
                new MonitorFacadeImpl(applicationName, hostName, defaultConfig,
                    false);
            defaultFacade = new MultipleEntryGuard(facade);
        } catch (Exception e) {
            throw new Exception(
                "the InfraredMonitorFactory creation for Anyframe is failed.",
                e);
        }
        LOGGER.debug("the InfraredMonitorFactory for Anyframe is created.");
        
        return defaultFacade;
    }

    public Class getObjectType() {
        return MonitorFacade.class;
    }

    public boolean isSingleton() {
        return true;
    }

}
