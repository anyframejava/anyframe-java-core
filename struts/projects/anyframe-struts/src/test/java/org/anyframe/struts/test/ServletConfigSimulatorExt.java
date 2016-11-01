package org.anyframe.struts.test;

import javax.servlet.ServletContext;

import servletunit.ServletConfigSimulator;

public class ServletConfigSimulatorExt extends ServletConfigSimulator {

    private ServletContext context;
    
	public ServletConfigSimulatorExt() {
		super();
		context = new ServletContextSimulatorExt();
	}
	
    /**
     * Returns a reference to the {@link ServletContext} in which the caller
     * is executing.
     *
     *
     * @return          a {@link ServletContext} object, used
     *                  by the caller to interact with its servlet
     *                  container
     *
     * @see             ServletContext
     *
     */
    public ServletContext getServletContext()
    {
        return context;
    }	
}
