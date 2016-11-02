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
package org.anyframe.locator;

import javax.naming.Context;
import javax.sql.DataSource;
import javax.transaction.UserTransaction;

import org.anyframe.exception.BaseException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * This Interface provides JNDI naming contexts and takes an object through
 * approaching to the JNDI Server or Naming Server.
 * <p>
 * The object once looked up is saved in cache, and fetched when it is called
 * again. This Service searches objects like as UserTransaction, DataSource,
 * EJBHome Object at JNDI Server to offer them to the client.(Other objects use
 * look up method). Context information of WAS shoud be defined in xconf file of
 * Naming Service. 
 * Naming Service uses Cache Service internally, so they should be distributed together.
 * <p>
 * 
 * <h1>ServiceLocator</h1>
 * ServiceLocator service has subordinate elements in xml.
 * 
 * <ul>
 * <li>cache: define cache service is used or not. use 'true' or 'false' and
 * default is 'false'.</li>
 * <li>context: define separate properties using context. These properties are
 * used to create InitialContext.</li>
 * <li>usertx: User Transaction name registered in JNDI Tree is
 * javax.transaction.UserTransaction.</li>
 * </ul>
 * <p>
 * <TABLE BORDER="1" WIDTH="100%" CELLPADDING="3" CELLSPACING="0" SUMMARY="">
 * <TR BGCOLOR="#CCCCFF">
 * <TD>Attibute</TD>
 * <TD>Description</TD>
 * <TD>REQ/OPT (default value)</TD>
 * </TR>
 * <TR>
 * <TD>name</TD>
 * <TD>representative name used for finding appropriate context.</TD>
 * <TD>Requred</TD>
 * </TR>
 * <TR>
 * <TD>key</TD>
 * <TD>attribute name used for creating InitialContext.</TD>
 * <TD>Requred</TD>
 * </TR>
 * <TR>
 * <TD>value</TD>
 * <TD>attribute value corresponding a context. </TD>
 * <TD>Requred</TD>
 * </TR>
 * </TABLE>
 * <p>
 * 
 * <b>Configuration Example:</b>
 * <p>
 * for Weblogic
 * <p>
 * <pre> 
 *     &lt;bean name=&quot;locator&quot;
 *    	class=org.anyframe.locator.LocatorService&gt;
 *    	&lt;config:configuration&gt;
 *          	&lt;context name=&quot;default&quot; key=&quot;java.naming.provider.url&quot; 
 *                    value=&quot;t3://localhost:7001&quot;/&gt;
 *          	&lt;context name=&quot;default&quot; key=&quot;java.naming.factory.initial&quot; 
 *                    value=&quot;weblogic.jndi.WLInitialContextFactory&quot;/&gt;
 *          	&lt;usertx name=&quot;default&quot;  key=&quot;javax.transaction.UserTransaction&quot;/&gt;
 *    	&lt;/config:configuration&gt;
 *    &lt;/bean&gt;  
 * </pre> 
 * <p>
 * for Websphere
 * <p>
 * <pre>  
 *     &lt;bean name=&quot;locator&quot;
 *    	class=org.anyframe.locator.LocatorService&gt;
 *    	&lt;config:configuration&gt;
 *   		&lt;cache&gt;true&lt;/cache&gt;
 *         	&lt;context name=&quot;default&quot; key=&quot;java.naming.provider.url&quot; 
 *                   value=&quot; iiop://localhost:2809&quot;/&gt;
 *         	&lt;context name=&quot;default&quot; key=&quot;java.naming.factory.initial&quot; 
 *                   value=&quot;com.ibm.websphere.naming.WsnInitialContextFactory &quot;/&gt;
 *         	&lt;usertx name=&quot;default&quot;  key=&quot;javax.transaction.UserTransaction&quot;/&gt;
 *    	&lt;/config:configuration&gt;
 *    &lt;/bean&gt;  
 * </pre>
 * <p>
 * for Jeus
 * <p>
 * <pre>  
 *     &lt;bean name=&quot;locator&quot;
 *    	class=org.anyframe.locator.LocatorService&gt;
 *    	&lt;config:configuration&gt;
 *  		&lt;cache&gt;true&lt;/cache&gt;
 *        	&lt;context name=&quot;default&quot; key=&quot;java.naming.provider.url&quot; 
 *                  value=&quot;localhost:9736&quot;/&gt;
 *        	&lt;context name=&quot;default&quot; key=&quot;java.naming.factory.initial&quot; 
 *                  value=&quot; jeus.jndi.JEUSContextFactory &quot;/&gt;
 *        	&lt;usertx name=&quot;default&quot;  key=&quot; java:comp/UserTransaction &quot;/&gt;
 *    	&lt;/config:configuration&gt;
 *    &lt;/bean&gt;  
 * </pre>
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public interface LocatorService {
    String ROLE = LocatorService.class.getName();
    Log LOGGER = LogFactory.getLog(LocatorService.class);

    /**
     * Return the Context with the specified name.
     *
     * @param context The name of the context.
     * @return The context with the specified name, or null if no context
     * exists with that name.
     */
    Context getContext(String context);

    /**
     * Using a default context, get UserTransaction Object from JNDI Server.
     * <p>Using a default context in configuration files, 
     * get UserTransaction Object from JNDI Server to do Naming Service.
     * 
     * @return UserTransaction Object
     * @throws BaseException if an error occurs
     */
    UserTransaction getUserTransaction() throws BaseException;

    /**
     * Using a context, get UserTransaction Object from JNDI Server.
     * <p>Using a defined context in configuration files, 
     * get UserTransaction Object from JNDI Server to do Naming Service.
     *
     * @param context context name that exists in configuration files
     * @return UserTransaction Object
     * @throws BaseException if an error occurs.
     */
    UserTransaction getUserTransaction(String context)
        throws BaseException;

    /**
     * Using a default context, get DataSource Object from JNDI Server.
     * <p>Using a defined default context in configuration files, 
     * get DataSource Object from JNDI Server to do Naming Service.
     *
     * @param dsName context name that exists in configuration files
     * @return DataSource Object
     * @throws BaseException if an error occurs
     */
    DataSource getDataSource(String dsName) throws BaseException;

    /**
     * Using a context, get DataSource Object from JNDI Server.
     * <p>Using a defined context in configuration files, 
     * get DataSource Object from JNDI Server to do Naming Service.
     *
     * @param dsName assigned JNDI name in dsName JNDI Server
     * @param context context name that exists in configuration files
     * @return DataSource Object connected to dsName
     * @throws BaseException if an error occurs
     */
    DataSource getDataSource(String dsName, String context)
        throws BaseException;

    /**
     * Using a default context, get EJBHome Object from JNDI Server.
     * <p>Using a defined default context in configuration files, 
     * get EJBHome Object from JNDI Server to do Naming Service.
     *
     * @param ejbName assigned JNDI name in ejbName JNDI Server
     * @return EJBHome Object connected to ejbName
     * @throws BaseException if an error occurs
     */
    Object getEJBHome(String ejbName) throws BaseException;

    /**
     * Using a context, get EJB Home Object from JNDI Server.
     * <p>Using a defined context in configuration files, 
     * get EJBHome Object from JNDI Server to do Naming Service.
     *
     * @param ejbName assigned JNDI name in ejbName JNDI Server
     * @param context context name that exists in configuration files
     * @return EJBHome Object connected to ejbName
     * @throws BaseException if an error occurs      
     */
    Object getEJBHome(String ejbName, String context)
        throws BaseException;

    /**
     * Using a default context, get EJBHome Object narrow casting from JNDI Server.
     * <p>Using a defined default context in configuration files, 
     * narrow casting EJBHome Object which is get from JNDI Server to do Naming Service.
     * When EJBHome exists in remote, it make use
     *
     * @param ejbName assigned JNDI name in ejbName JNDI Server
     * @param classType classType narrow casting
     * @return EJBHome Object connected to ejbName
     * @throws BaseException if an error occurs    
     */
    Object getEJBHome(String ejbName, Class classType)
        throws BaseException;

    /**
     * Using a context, get EJBHome Object narrow casting from JNDI Server.
     * <p>Using a defined default context in configuration files, 
     * narrow casting EJBHome Object which is get from JNDI Server to do Naming Service.
     * When EJBHome exists in remote, it make use
     *
     * @param ejbName assigned JNDI name in ejbName JNDI Server
     * @param classType classType narrow casting
     * @param context context name that exists in configuration files
     * @return EJBHome Object connected to ejbName
     * @throws BaseException if an error occurs   
     */
    Object getEJBHome(String ejbName, Class classType, String context)
        throws BaseException;

    /**
     * Using a default context, get Object from JNDI Server.
     * <p>Using a defined default context in configuration files, 
     * get Object from JNDI Server to do Naming Service.
     *
     * @param name assigned JNDI name in name JNDI Server
     * @return Object connected to name
     * @throws BaseException if an error occurs 
     */
    Object lookup(String name) throws BaseException;

    /**
     * Using a context, get Object from JNDI Server.
     * <p>Using a defined default context in configuration files, 
     * get Object from JNDI Server to do Naming Service.
     *
     * @param name assigned JNDI name in name JNDI Server
     * @param context context name that exists in configuration files
     * @return Object connected to name
     * @throws BaseException if an error occurs
     */
    Object lookup(String name, String context) throws BaseException;
}
