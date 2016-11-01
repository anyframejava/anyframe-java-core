/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.struts.action;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.UnavailableException;

import org.anyframe.struts.util.DefaultPropertyMessageResources;
import org.apache.struts.action.ActionServlet;
import org.apache.struts.action.RequestProcessor;
import org.apache.struts.config.MessageResourcesConfig;
import org.apache.struts.config.ModuleConfig;
import org.apache.struts.util.MessageResources;
import org.apache.struts.util.MessageResourcesFactory;


/**
 * <p><strong>ActionServlet</strong> provides the "controller" in the
 * Model-View-Controller (MVC) design pattern for web applications that is
 * commonly known as "Model 2".  This nomenclature originated with a
 * description in the JavaServerPages Specification, version 0.92, and has
 * persisted ever since (in the absence of a better name).</p>
 *
 * <p>Generally, a "Model 2" application is architected as follows:</p>
 *
 * <ul>
 *
 * <li>The user interface will generally be created with server pages, which
 * will not themselves contain any business logic. These pages represent the
 * "view" component of an MVC architecture.</li>
 *
 * <li>Forms and hyperlinks in the user interface that require business logic
 * to be executed will be submitted to a request URI that is mapped to this
 * servlet.</li>
 *
 * <li>There can be <b>one</b> instance of this servlet class, which receives
 * and processes all requests that change the state of a user's interaction
 * with the application. The servlet delegates the handling of a request to a
 * {@link RequestProcessor} object. This component represents the "controller"
 * component of an MVC architecture. </li>
 *
 * <li>The <code>RequestProcessor</code> selects and invokes an Action
 * class to perform the requested business logic, or delegates the response to
 * another resource.</li>
 *
 * <li>The <code>Action</code> classes can manipulate the state of the
 * application's interaction with the user, typically by creating or modifying
 * JavaBeans that are stored as request or session attributes (depending on
 * how long they need to be available). Such JavaBeans represent the "model"
 * component of an MVC architecture.</li>
 *
 * <li>Instead of producing the next page of the user interface directly,
 * <code>Action</code> classes generally return an ActionForward to
 * indicate which resource should handle the response. If the
 * <code>Action</code> does not return null, the <code>RequestProcessor</code>
 * forwards or redirects to the specified resource (by utilizing
 * <code>RequestDispatcher.forward</code> or <code>Response.sendRedirect</code>)
 * so as to produce the next page of the user interface.</li>
 *
 * </ul>
 *
 * <p>The standard version of <code>RequestsProcessor</code> implements the
 * following logic for each incoming HTTP request. You can override some or
 * all of this functionality by subclassing this object and implementing your
 * own version of the processing.</p>
 *
 * <ul>
 *
 * <li>Identify, from the incoming request URI, the substring that will be
 * used to select an action procedure.</li>
 *
 * <li>Use this substring to map to the Java class name of the corresponding
 * action class (an implementation of the <code>Action</code> interface).
 * </li>
 *
 * <li>If this is the first request for a particular <code>Action</code>
 * class, instantiate an instance of that class and cache it for future
 * use.</li>
 *
 * <li>Optionally populate the properties of an <code>ActionForm</code> bean
 * associated with this mapping.</li>
 *
 * <li>Call the <code>execute</code> method of this <code>Action</code> class,
 * passing on a reference to the mapping that was used, the relevant form-bean
 * (if any), and the request and the response that were passed to the
 * controller by the servlet container (thereby providing access to any
 * specialized properties of the mapping itself as well as to the
 * ServletContext). </li>
 *
 * </ul>
 *
 * <p>The standard version of <code>ActionServlet</code> is configured based
 * on the following servlet initialization parameters, which you will specify
 * in the web application deployment descriptor (<code>/WEB-INF/web.xml</code>)
 * for your application.  Subclasses that specialize this servlet are free to
 * define additional initialization parameters. </p>
 *
 * <ul>
 *
 * <li><strong>config</strong> - Comma-separated list of context-relative
 * path(s) to the XML resource(s) containing the configuration information for
 * the default module.  (Multiple files support since Struts 1.1)
 * [/WEB-INF/struts-config.xml].</li>
 *
 * <li><strong>config/${module}</strong> - Comma-separated list of
 * Context-relative path(s) to the XML resource(s) containing the
 * configuration information for the module that will use the specified prefix
 * (/${module}). This can be repeated as many times as required for multiple
 * modules. (Since Struts 1.1)</li>
 *
 * <li><strong>configFactory</strong> - The Java class name of the
 * <code>ModuleConfigFactory</code> used to create the implementation of the
 * ModuleConfig interface. </li>
 *
 * <li><strong>convertNull</strong> - Force simulation of the Struts 1.0
 * behavior when populating forms. If set to true, the numeric Java wrapper
 * class types (like <code>java.lang.Integer</code>) will default to null
 * (rather than 0). (Since Struts 1.1) [false] </li>
 *
 * <li><strong>rulesets </strong> - Comma-delimited list of fully qualified
 * classnames of additional <code>org.apache.commons.digester.RuleSet</code>
 * instances that should be added to the <code>Digester</code> that will be
 * processing <code>struts-config.xml</code> files.  By default, only the
 * <code>RuleSet</code> for the standard configuration elements is loaded.
 * (Since Struts 1.1)</li>
 *
 * <li><strong>validating</strong> - Should we use a validating XML parser to
 * process the configuration file (strongly recommended)? [true]</li>
 *
 * <li><strong>chainConfig</strong> - Comma-separated list of either
 * context-relative or classloader path(s) to load commons-chain catalog
 * definitions from.  If none specified, the default Struts catalog that is
 * provided with Struts will be used.</li>
 *
 * </ul>
 * 
 * We changed org.apache.struts.action.ActionServlet Class into org.anyframe.struts.action.DefaultActionServlet Class in Anyframe.
 * @author modified by Byunghun Woo
 * 
 */
public class DefaultActionServlet extends ActionServlet 
//	implements HotDeployServlet 
	{
	
//	/**
//	 * Reload Struts Module Configuration
//	 *
//	 */
//    public void doHotDeployModuleConfig() {
//        destroy();
//        destroyRequestProcessors();
//
//        try {
//            super.init();
//        } catch (ServletException se) {
//            se.printStackTrace();
//        }
//    }

	/**
	 * 
	 */
	private static final long serialVersionUID = 1185620210474123256L;

	/**
	 * <p>
	 * Remove RequestProcessors from this servlet context.
	 * </p>
	 */
    @SuppressWarnings("unchecked")
	protected void destroyRequestProcessors() {
        ArrayList<Object> values = new ArrayList<Object>();
        Enumeration<Object> names = (Enumeration<Object>)getServletContext().getAttributeNames();
        while (names.hasMoreElements()) {
            values.add(names.nextElement());
        }

        Iterator<Object> keys = values.iterator();
        while (keys.hasNext()) {
            String name = (String) keys.next();
            Object value = getServletContext().getAttribute(name);
            if (value instanceof RequestProcessor) {
                try {
                    getServletContext().removeAttribute(name);
                } catch (Throwable t) {
                    ;
                }
            }
        }
    }
    /**
     * <p>Initialize this servlet.  Most of the processing has been factored
     * into support methods so that you can override particular functionality
     * at a fairly granular level.</p>
     *
     * @throws ServletException if we cannot configure ourselves correctly
     */
    public void init() throws ServletException {
        this.internalName = "org.anyframe.struts.CommonResources";

        super.init();

//        // For HotDeployService
//        HotDeployService hotDeployService = HotDeployServiceImpl.getInstance();
//        hotDeployService.addItem(this.toString(), this);
//
//        // log.info("HotDeployServlet, " + this.toString() + ", is loaded.");
    }

    /**
     * <p>
     * Initialize the application MessageResources for the specified module.
     * </p>
     * 
     * @param config
     *            ModuleConfig information for this module
     * 
     * @exception ServletException
     *                if initialization cannot be performed
     * @since Struts 1.1
     */
    protected void initModuleMessageResources(ModuleConfig config)
            throws ServletException {
        MessageResourcesConfig mrcs[] = config.findMessageResourcesConfigs();
        for (int i = 0; i < mrcs.length; i++) {
            if ((mrcs[i].getFactory() == null)
                    || (mrcs[i].getParameter() == null)) {
                continue;
            }
            if (log.isDebugEnabled()) {
                log.debug("Initializing module path '" + config.getPrefix()
                        + "' message resources from '" + mrcs[i].getParameter()
                        + "'");
            }

            try {
                String factory = mrcs[i].getFactory();
                MessageResourcesFactory.setFactoryClass(factory);
                MessageResourcesFactory factoryObject = MessageResourcesFactory
                        .createFactory();
                MessageResources resources = factoryObject
                        .createResources(mrcs[i].getParameter());

                if (resources instanceof DefaultPropertyMessageResources) {
                    // value of character encoding
                    String charset = this
                            .getInitParameter("character-encoding");

                    ((DefaultPropertyMessageResources) resources)
                            .setCharset(charset);
                }

                resources.setReturnNull(mrcs[i].getNull());
                getServletContext().setAttribute(
                        mrcs[i].getKey() + config.getPrefix(), resources);
            } catch (Throwable t) {
                log.error(internal.getMessage("applicationResources", mrcs[i]
                        .getParameter()), t);
                throw new UnavailableException(internal.getMessage(
                        "applicationResources", mrcs[i].getParameter()));
            }
        }

    }
}
